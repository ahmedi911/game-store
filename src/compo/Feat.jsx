export default function Feat() {
  const features = [
    {
      title: "Massive Game Library",
      description: "Access thousands of titles across all platforms and genres.",
      icon: "🎮"
    },
    {
      title: "Instant Downloads",
      description: "Start playing immediately with our lightning-fast servers.",
      icon: "⚡"
    },
    {
      title: "Exclusive Deals",
      description: "Get member-only discounts and early access to new releases.",
      icon: "💰"
    },
    {
      title: "Cross-Platform Support",
      description: "Play your games on PC, console, or mobile seamlessly.",
      icon: "📱"
    },
    {
      title: "Gaming Community",
      description: "Connect with other gamers, join tournaments and events.",
      icon: "👥"
    },
    {
      title: "24/7 Support",
      description: "Our gaming experts are always available to help you.",
      icon: "🔧"
    },
  ];

  return (
    <section className="py-4 bg-gray-50">
      <div className="container px-6 mx-auto">
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">Why Choose Our Blog Platform?</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 text-center transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
