import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermsConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read our terms and conditions for using ToolHub online calculators and tools. Understand your rights and responsibilities.');
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="terms-title">
              Terms & Conditions
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto" data-testid="terms-subtitle">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 prose prose-slate max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using ToolHub, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily use ToolHub for personal, non-commercial transitory viewing only. This includes:
            </p>
            <ul>
              <li>Using our calculators and tools for personal calculations</li>
              <li>Sharing results from our tools</li>
              <li>Linking to our tools from other websites</li>
            </ul>

            <p>This license does not include:</p>
            <ul>
              <li>Modifying or copying the materials</li>
              <li>Using the materials for commercial purposes</li>
              <li>Attempting to reverse engineer our tools</li>
              <li>Removing any copyright or proprietary notations</li>
            </ul>

            <h2>Service Availability</h2>
            <p>
              We strive to maintain ToolHub with 99.9% uptime, but we cannot guarantee uninterrupted service. The service is provided "as is" without warranties of any kind.
            </p>

            <h2>Accuracy of Tools</h2>
            <p>
              While we make every effort to ensure our calculators and tools provide accurate results, we cannot guarantee 100% accuracy. Users should:
            </p>
            <ul>
              <li>Verify important calculations with alternative methods</li>
              <li>Use professional advice for critical decisions</li>
              <li>Report any calculation errors to us</li>
            </ul>

            <h2>User Conduct</h2>
            <p>
              When using ToolHub, you agree not to:
            </p>
            <ul>
              <li>Use our service for illegal activities</li>
              <li>Attempt to disrupt or damage our website</li>
              <li>Use automated tools to access our service excessively</li>
              <li>Impersonate others or provide false information</li>
            </ul>

            <h2>Privacy</h2>
            <p>
              Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-primary hover:text-blue-600">Privacy Policy</a>, 
              which also governs your use of the service.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive property of ToolHub and its licensors. 
              The service is protected by copyright, trademark, and other laws.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall ToolHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please <a href="/contact" className="text-primary hover:text-blue-600">contact us</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
