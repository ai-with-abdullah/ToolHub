import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with the ToolHub team. Send us your questions, suggestions, or feedback about our free online calculators and tools.');
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="contact-title">
              Contact Us
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="contact-subtitle">
              We'd love to hear from you! Send us your questions, suggestions, or feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6" data-testid="form-title">Send us a Message</h2>
              
              <form className="space-y-6" data-testid="contact-form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your name"
                    data-testid="input-name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    data-testid="input-email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    data-testid="select-subject"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="tool-suggestion">Tool Suggestion</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                    data-testid="textarea-message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-200"
                  data-testid="button-send-message"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4" data-testid="response-title">Quick Response</h3>
                <p className="text-slate-600 mb-4" data-testid="response-content">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please mention it in your message subject.
                </p>
                
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-primary"></i>
                  </div>
                  <span className="text-sm text-slate-600">Response time: 24 hours</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check text-accent"></i>
                  </div>
                  <span className="text-sm text-slate-600">Available: Monday - Friday</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4" data-testid="suggest-title">Suggest a Tool</h3>
                <p className="mb-4" data-testid="suggest-content">
                  Have an idea for a calculator or converter that would be helpful? 
                  We're always looking to expand our collection based on user needs.
                </p>
                
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-sm font-medium mb-2">Popular Requests:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Mortgage Calculator</li>
                    <li>• Currency Converter</li>
                    <li>• Calorie Calculator</li>
                    <li>• GPA Calculator</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
