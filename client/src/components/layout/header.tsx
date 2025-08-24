import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu} data-testid="logo-link">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <i className="fas fa-tools text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-slate-800">ToolHub</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" data-testid="nav-home" className={`transition-colors duration-200 font-medium ${
              isActiveLink('/') ? 'text-primary' : 'text-slate-600 hover:text-primary'
            }`}>
              Home
            </Link>
            <a href="#tools" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium" data-testid="nav-tools">
              Tools
            </a>
            <Link href="/about" data-testid="nav-about" className={`transition-colors duration-200 font-medium ${
              isActiveLink('/about') ? 'text-primary' : 'text-slate-600 hover:text-primary'
            }`}>
              About
            </Link>
            <Link href="/blog" data-testid="nav-blog" className={`transition-colors duration-200 font-medium ${
              isActiveLink('/blog') ? 'text-primary' : 'text-slate-600 hover:text-primary'
            }`}>
              Blog
            </Link>
            <Link href="/contact" data-testid="nav-contact" className={`transition-colors duration-200 font-medium ${
              isActiveLink('/contact') ? 'text-primary' : 'text-slate-600 hover:text-primary'
            }`}>
              Contact
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            data-testid="mobile-menu-button"
          >
            <i className={`text-slate-600 ${isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}`}></i>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4" data-testid="mobile-menu">
            <div className="flex flex-col space-y-3">
              <Link href="/" data-testid="mobile-nav-home" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium py-2" onClick={closeMobileMenu}>
                Home
              </Link>
              <a href="#tools" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium py-2" onClick={closeMobileMenu} data-testid="mobile-nav-tools">
                Tools
              </a>
              <Link href="/about" data-testid="mobile-nav-about" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium py-2" onClick={closeMobileMenu}>
                About
              </Link>
              <Link href="/blog" data-testid="mobile-nav-blog" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium py-2" onClick={closeMobileMenu}>
                Blog
              </Link>
              <Link href="/contact" data-testid="mobile-nav-contact" className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium py-2" onClick={closeMobileMenu}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
