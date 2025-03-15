export default function Footer() {
  return (
    <footer className="py-8 text-white bg-gray-900 border-t-4 border-purple-600">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-6 text-center sm:flex-row sm:items-start sm:text-left sm:space-y-0">
          
          {/* About Section */}
          <div className="sm:w-1/3">
            <h2 className="text-xl font-bold text-purple-400">GameVault</h2>
            <p className="mt-2 text-gray-400">
              Your ultimate destination for games across all platforms. Level up your gaming experience with our massive collection and exclusive deals.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="sm:w-1/3">
            <h2 className="text-xl font-bold text-purple-400">Game Categories</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-gray-400 transition-all duration-300 hover:text-green-400">
                  New Releases
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-all duration-300 hover:text-green-400">
                  Top Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-all duration-300 hover:text-green-400">
                  Upcoming Titles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-all duration-300 hover:text-green-400">
                  Game Deals
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div className="sm:w-1/3">
            <h2 className="text-xl font-bold text-purple-400">Join Our Guild</h2>
            <div className="flex justify-center mt-2 space-x-4 sm:justify-start">
              <a href="#" className="text-2xl text-gray-400 transition-all duration-300 hover:text-blue-500">
                🎮
              </a>
              <a href="#" className="text-2xl text-gray-400 transition-all duration-300 hover:text-red-500">
                🎲
              </a>
              <a href="#" className="text-2xl text-gray-400 transition-all duration-300 hover:text-purple-400">
                👾
              </a>
            </div>
            <p className="mt-3 text-sm text-gray-500">Join our Discord for exclusive drops!</p>
          </div>
        </div>
        
        {/* Extra Gaming Links */}
        <div className="grid grid-cols-2 gap-4 pt-4 mt-8 text-sm text-center border-t border-gray-800 md:grid-cols-4">
          <a href="#" className="text-gray-500 hover:text-green-400">Support</a>
          <a href="#" className="text-gray-500 hover:text-green-400">Game Reviews</a>
          <a href="#" className="text-gray-500 hover:text-green-400">Gift Cards</a>
          <a href="#" className="text-gray-500 hover:text-green-400">Tournaments</a>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 text-sm text-center text-gray-600">
          &copy; {new Date().getFullYear()} GameVault. Press Start to Continue.
        </div>
      </div>
    </footer>
  );
}
