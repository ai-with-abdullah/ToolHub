export default function Hero() {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="gradient-bg py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight" data-testid="hero-title">
            Free Online Calculators, <br className="hidden md:block" />
            <span className="text-primary">Converters & Fun Tools</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-8 font-medium" data-testid="hero-subtitle">
            100% Free & Secure – No Registration Required
          </p>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto" data-testid="hero-description">
            Discover our collection of carefully crafted online tools designed to make your daily calculations and conversions effortless. All tools work directly in your browser with complete privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToTools}
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
              data-testid="button-explore-tools"
            >
              <i className="fas fa-calculator mr-2"></i>
              Explore Tools
            </button>
            <button 
              onClick={scrollToTools}
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary hover:text-white transition-colors duration-200"
              data-testid="button-learn-more"
            >
              <i className="fas fa-info-circle mr-2"></i>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
