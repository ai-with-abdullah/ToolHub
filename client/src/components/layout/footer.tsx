import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <i className="fas fa-tools text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-white">ToolHub</span>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Your go-to destination for free online calculators, converters, and useful tools. Fast, secure, and always free.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="social-twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="social-facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="social-linkedin">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          {/* Tools Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/age-calculator" data-testid="footer-age-calculator" className="hover:text-white transition-colors">
                  Age Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/bmi-calculator" data-testid="footer-bmi-calculator" className="hover:text-white transition-colors">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Percentage Calculator</span>
              </li>
              <li>
                <span className="text-slate-500">Unit Converter</span>
              </li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" data-testid="footer-about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" data-testid="footer-blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="footer-contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-careers">Careers</a>
              </li>
            </ul>
          </div>
          
          {/* Legal Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" data-testid="footer-privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" data-testid="footer-terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" data-testid="footer-disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" data-testid="footer-cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm" data-testid="copyright">
            © {currentYear} ToolHub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6 text-sm">
            <span className="text-slate-500">🔒 Secure & Private</span>
            <span className="text-slate-500">⚡ Lightning Fast</span>
            <span className="text-slate-500">📱 Mobile Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
