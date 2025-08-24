import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import ToolsDashboard from "@/components/home/tools-dashboard";
import Features from "@/components/home/features";

export default function Home() {
  useEffect(() => {
    document.title = "ToolHub - Free Online Calculators, Converters & Tools";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online calculators, converters, and fun tools. 100% free and secure. Age calculator, BMI calculator, and more useful tools.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free online calculators, converters, and fun tools. 100% free and secure. Age calculator, BMI calculator, and more useful tools.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-800">
      <Header />
      <Hero />
      <ToolsDashboard />
      <Features />
      <Footer />
    </div>
  );
}
