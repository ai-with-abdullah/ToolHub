import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Disclaimer() {
  useEffect(() => {
    document.title = "Disclaimer - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Important disclaimer about the use of ToolHub calculators and tools. Understand the limitations and proper use of our services.');
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="disclaimer-title">
              Disclaimer
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto" data-testid="disclaimer-subtitle">
              Important information about the use of our calculators and tools
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 prose prose-slate max-w-none">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-yellow-600"></i>
                </div>
                <h2 className="text-xl font-bold text-yellow-800 m-0">Important Notice</h2>
              </div>
              <p className="text-yellow-700 m-0">
                The information and calculations provided by ToolHub are for general informational and educational purposes only. 
                Always consult with qualified professionals for important decisions.
              </p>
            </div>

            <h2>General Information</h2>
            <p>
              The calculators, converters, and tools provided on ToolHub are intended for general informational and educational purposes only. 
              While we strive for accuracy, we make no representations or warranties of any kind, express or implied, about the completeness, 
              accuracy, reliability, suitability, or availability of the information contained in our tools.
            </p>

            <h2>No Professional Advice</h2>
            <p>
              The results from our tools should not be considered as:
            </p>
            <ul>
              <li><strong>Medical advice:</strong> BMI and health-related calculations are for informational purposes only</li>
              <li><strong>Financial advice:</strong> Any financial calculations should be verified with qualified professionals</li>
              <li><strong>Legal advice:</strong> Our tools do not provide legal guidance or recommendations</li>
              <li><strong>Professional consultation:</strong> Always seek advice from qualified professionals for important decisions</li>
            </ul>

            <h2>Accuracy and Reliability</h2>
            <p>
              While we make every effort to ensure our calculators provide accurate results:
            </p>
            <ul>
              <li>We cannot guarantee 100% accuracy of all calculations</li>
              <li>Results may vary due to rounding, input errors, or calculation methods</li>
              <li>Users should verify important calculations using alternative methods</li>
              <li>We are not responsible for decisions made based on our tool results</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              In no event will ToolHub be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, 
              or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of our tools.
            </p>

            <h2>External Links</h2>
            <p>
              Our website may contain links to external websites. We have no control over the content and nature of these sites and cannot be responsible for their content or availability.
            </p>

            <h2>Updates and Changes</h2>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Update calculation methods and formulas</li>
              <li>Modify or discontinue tools without notice</li>
              <li>Change this disclaimer at any time</li>
              <li>Improve accuracy and functionality of our tools</li>
            </ul>

            <h2>User Responsibility</h2>
            <p>
              Users of ToolHub are responsible for:
            </p>
            <ul>
              <li>Verifying the accuracy of input data</li>
              <li>Understanding the limitations of each tool</li>
              <li>Seeking professional advice when needed</li>
              <li>Using tools appropriately and legally</li>
            </ul>

            <h2>Reporting Issues</h2>
            <p>
              If you discover any calculation errors or have concerns about our tools, please <a href="/contact" className="text-primary hover:text-blue-600">contact us</a> immediately. 
              We take accuracy seriously and will investigate all reported issues.
            </p>

            <h2>Educational Purpose</h2>
            <p>
              Our tools are designed to help users understand calculations and conversions. They serve an educational purpose and should supplement, 
              not replace, proper learning and professional guidance.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-info-circle text-blue-600"></i>
                </div>
                <h3 className="text-lg font-bold text-blue-800 m-0">Questions?</h3>
              </div>
              <p className="text-blue-700 m-0">
                If you have any questions about this disclaimer or need clarification about our tools, 
                please don't hesitate to <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">contact us</a>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
