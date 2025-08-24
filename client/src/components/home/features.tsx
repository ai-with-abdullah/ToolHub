export default function Features() {
  const features = [
    {
      icon: 'fas fa-shield-alt',
      iconColor: 'text-accent',
      iconBg: 'bg-green-100',
      title: '100% Secure',
      description: 'All calculations happen in your browser. No data is sent to our servers or stored anywhere.'
    },
    {
      icon: 'fas fa-bolt',
      iconColor: 'text-primary',
      iconBg: 'bg-blue-100',
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance. Get instant results without any delays or loading times.'
    },
    {
      icon: 'fas fa-mobile-alt',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      title: 'Mobile Friendly',
      description: 'Perfect responsive design that works seamlessly on all devices, from phones to desktops.'
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" data-testid="features-title">
            Why Choose Our Tools?
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto" data-testid="features-description">
            Built with privacy, accuracy, and user experience in mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6" data-testid={`feature-${index}`}>
              <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <i className={`${feature.icon} ${feature.iconColor} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3" data-testid={`feature-title-${index}`}>
                {feature.title}
              </h3>
              <p className="text-slate-600" data-testid={`feature-description-${index}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
