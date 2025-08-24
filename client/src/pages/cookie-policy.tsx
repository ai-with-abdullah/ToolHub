import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function CookiePolicy() {
  useEffect(() => {
    document.title = "Cookie Policy - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about how ToolHub uses cookies to improve your experience with our online calculators and tools.');
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="cookie-title">
              Cookie Policy
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto" data-testid="cookie-subtitle">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 prose prose-slate max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-cookie-bite text-blue-600"></i>
                </div>
                <h2 className="text-xl font-bold text-blue-800 m-0">About Cookies</h2>
              </div>
              <p className="text-blue-700 m-0">
                This policy explains how ToolHub uses cookies and similar technologies to enhance your experience with our calculators and tools.
              </p>
            </div>

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
            </p>

            <h2>How We Use Cookies</h2>
            <p>
              ToolHub uses cookies for the following purposes:
            </p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for our website to function properly:
            </p>
            <ul>
              <li><strong>Session management:</strong> Keep you logged into any features that require it</li>
              <li><strong>Preferences:</strong> Remember your settings like dark mode or language preferences</li>
              <li><strong>Security:</strong> Protect against malicious attacks and ensure secure browsing</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              We use analytics cookies to understand how visitors interact with our website:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Tracks page views, session duration, and user behavior</li>
              <li><strong>Performance monitoring:</strong> Helps us identify and fix technical issues</li>
              <li><strong>Usage statistics:</strong> Shows us which tools are most popular</li>
            </ul>

            <h3>Advertising Cookies</h3>
            <p>
              We may use advertising cookies to show relevant ads:
            </p>
            <ul>
              <li><strong>Google AdSense:</strong> Displays relevant advertisements based on content</li>
              <li><strong>Frequency capping:</strong> Prevents showing the same ad too many times</li>
              <li><strong>Performance tracking:</strong> Measures ad effectiveness</li>
            </ul>

            <h2>Types of Cookies We Use</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 px-4 py-2 text-left">Cookie Type</th>
                    <th className="border border-slate-200 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-slate-200 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Session</td>
                    <td className="border border-slate-200 px-4 py-2">Essential site functionality</td>
                    <td className="border border-slate-200 px-4 py-2">Browser session</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Persistent</td>
                    <td className="border border-slate-200 px-4 py-2">Remember preferences</td>
                    <td className="border border-slate-200 px-4 py-2">30 days - 2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Analytics</td>
                    <td className="border border-slate-200 px-4 py-2">Track usage and performance</td>
                    <td className="border border-slate-200 px-4 py-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-4 py-2">Advertising</td>
                    <td className="border border-slate-200 px-4 py-2">Show relevant ads</td>
                    <td className="border border-slate-200 px-4 py-2">30 days - 1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Managing Cookies</h2>
            <p>
              You have several options for managing cookies:
            </p>

            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to:
            </p>
            <ul>
              <li>View and delete cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block third-party cookies</li>
              <li>Clear all cookies when closing the browser</li>
            </ul>

            <h3>Opt-out Links</h3>
            <ul>
              <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:text-blue-600" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
              <li><a href="https://support.google.com/ads/answer/2662922" className="text-primary hover:text-blue-600" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
            </ul>

            <h2>Impact of Disabling Cookies</h2>
            <p>
              If you disable cookies, some features of ToolHub may not work properly:
            </p>
            <ul>
              <li>Preferences won't be saved between visits</li>
              <li>Some tools may not function correctly</li>
              <li>You may see less relevant advertisements</li>
              <li>Analytics won't work, affecting our ability to improve the site</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              Some cookies are set by third-party services we use:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Web analytics service</li>
              <li><strong>Google AdSense:</strong> Advertising network</li>
              <li><strong>Font providers:</strong> Web fonts (Google Fonts)</li>
              <li><strong>CDN services:</strong> Content delivery networks</li>
            </ul>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this cookie policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. 
              Please revisit this policy regularly to stay informed about our use of cookies.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please <a href="/contact" className="text-primary hover:text-blue-600">contact us</a>.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-alt text-green-600"></i>
                </div>
                <h3 className="text-lg font-bold text-green-800 m-0">Your Privacy Matters</h3>
              </div>
              <p className="text-green-700 m-0">
                We are committed to being transparent about our use of cookies and respecting your privacy choices. 
                Our calculators work without storing personal data, ensuring your privacy is always protected.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
