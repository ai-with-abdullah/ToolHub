import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read our privacy policy to understand how ToolHub protects your data and privacy while using our free online calculators and tools.');
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="privacy-title">
              Privacy Policy
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto" data-testid="privacy-subtitle">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 prose prose-slate max-w-none">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-alt text-green-600"></i>
                </div>
                <h2 className="text-xl font-bold text-green-800 m-0">Privacy First</h2>
              </div>
              <p className="text-green-700 m-0">
                All calculations on ToolHub happen directly in your browser. We do not collect, store, or transmit your personal data or calculation inputs to our servers.
              </p>
            </div>

            <h2>Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <p>
              We do not collect any personal information when you use our calculators and tools. All calculations are performed locally in your browser without sending data to our servers.
            </p>

            <h3>Usage Data</h3>
            <p>
              We may collect anonymous usage statistics including:
            </p>
            <ul>
              <li>Pages visited on our website</li>
              <li>Time spent on our site</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring websites</li>
            </ul>

            <h2>How We Use Information</h2>
            <p>
              The limited anonymous data we collect is used solely to:
            </p>
            <ul>
              <li>Improve our website performance</li>
              <li>Understand which tools are most popular</li>
              <li>Identify technical issues</li>
              <li>Enhance user experience</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              We use essential cookies only to:
            </p>
            <ul>
              <li>Remember your preferences (dark mode, etc.)</li>
              <li>Analyze website traffic (Google Analytics)</li>
              <li>Ensure proper website functionality</li>
            </ul>
            <p>
              You can disable cookies in your browser settings, but this may affect some website functionality.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We may use the following third-party services:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> For anonymous website analytics</li>
              <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
              <li><strong>CDN Services:</strong> For faster content delivery</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              Since we don't collect personal data from calculations, there's minimal risk to your privacy. However, we implement standard security measures including:
            </p>
            <ul>
              <li>HTTPS encryption for all communications</li>
              <li>Regular security updates</li>
              <li>Secure hosting infrastructure</li>
            </ul>

            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Use our tools without providing personal information</li>
              <li>Disable cookies in your browser</li>
              <li>Contact us with privacy concerns</li>
              <li>Request information about any data we may have</li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify users of any significant changes by posting a notice on our website.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please <a href="/contact" className="text-primary hover:text-blue-600">contact us</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
