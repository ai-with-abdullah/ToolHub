import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Blog() {
  useEffect(() => {
    document.title = "Blog - ToolHub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the latest articles, tutorials, and tips about online calculators, converters, and useful tools.');
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="blog-title">
              ToolHub Blog
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto" data-testid="blog-subtitle">
              Tips, tutorials, and insights about calculators and useful tools
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-pen-alt text-slate-400 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4" data-testid="coming-soon-title">
              Blog Coming Soon!
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto" data-testid="coming-soon-content">
              We're working on creating valuable content about calculators, converters, and productivity tools. 
              Stay tuned for helpful tutorials, tips, and insights that will make your daily calculations easier.
            </p>
            
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-slate-800 mb-3" data-testid="upcoming-topics-title">Upcoming Topics:</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li data-testid="topic-1">• How to Calculate Your Ideal BMI Range</li>
                <li data-testid="topic-2">• Understanding Age Calculation Methods</li>
                <li data-testid="topic-3">• Essential Unit Conversions for Daily Life</li>
                <li data-testid="topic-4">• Tips for Accurate Percentage Calculations</li>
                <li data-testid="topic-5">• The Science Behind Our Calculator Algorithms</li>
              </ul>
            </div>

            <a 
              href="/" 
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-200 inline-block"
              data-testid="button-back-home"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Tools
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
