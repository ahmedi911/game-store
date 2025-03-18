export default function Features() {
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
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Level Up Your Gaming Experience
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of gamers who've already discovered the ultimate gaming platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl group-hover:bg-purple-500/30 transition-all duration-300"></div>
              
              <div className="flex flex-col h-full z-10 relative">
                <div className="flex items-center mb-4">
                  <div className="flex justify-center items-center w-12 h-12 text-3xl bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl">{feature.title}</h3>
                </div>
                
                <p className="text-gray-300 mt-2 flex-grow">
                  {feature.description}
                </p>
                
                <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}