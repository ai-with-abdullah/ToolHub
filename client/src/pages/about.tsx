import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function About() {
  useEffect(() => {
    document.title = "About Us - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about ToolHub and our mission to provide free, secure, and easy-to-use online calculators and converters.');
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="about-title">
              About ToolHub
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="about-subtitle">
              Your trusted destination for free online tools and calculators
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4" data-testid="mission-title">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-6" data-testid="mission-content">
              At ToolHub, we believe that useful tools should be accessible to everyone. Our mission is to provide 
              high-quality, free online calculators and converters that help people with their daily tasks, 
              calculations, and conversions.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-4" data-testid="values-title">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-shield-alt text-primary text-lg"></i>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Privacy First</h3>
                <p className="text-sm text-slate-600">All calculations happen locally in your browser</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-heart text-accent text-lg"></i>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Always Free</h3>
                <p className="text-sm text-slate-600">No hidden fees, subscriptions, or premium features</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-users text-purple-600 text-lg"></i>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">User-Centric</h3>
                <p className="text-sm text-slate-600">Designed with simplicity and usability in mind</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4" data-testid="contact-cta-title">Get in Touch</h2>
            <p className="mb-6" data-testid="contact-cta-content">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <a 
              href="/contact" 
              className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors duration-200 inline-block"
              data-testid="button-contact-us"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
