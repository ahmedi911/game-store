import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { logoutApi } from "../apis/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside clicks to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("#sidebar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      const [response, error] = await logoutApi(cookies.jwt);
      if (error) {
        console.error("Logout failed:", error);
      }
      removeCookie("jwt");
      navigate("/login");
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg py-2" : "bg-transparent py-4"
      }`}>
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                GameVault
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="items-center hidden space-x-8 md:flex">
              <li>
                <a href="/" className="font-medium text-gray-500 transition-colors duration-300 hover:text-purple-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/store" className="font-medium text-gray-500 transition-colors duration-300 hover:text-purple-400">
                  Store
                </a>
              </li>
              <li>
                <a href="/library" className="font-medium text-gray-500 transition-colors duration-300 hover:text-purple-400">
                  Library
                </a>
              </li>
              <li>
                <a href="/community" className="font-medium text-gray-500 transition-colors duration-300 hover:text-purple-400">
                  Community
                </a>
              </li>
            </ul>

            {/* Desktop Buttons */}
            <div className="items-center hidden space-x-4 md:flex">
              {!cookies.jwt ? (
                <>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-blue-400 transition-colors duration-300 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleRegister}
                    className="px-4 py-2 text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
                  >
                    Join Now
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <a href="/cart" className="relative text-white transition-colors hover:text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">2</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white transition-colors duration-300 bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="text-white md:hidden focus:outline-none"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dark overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" />
        )}

        {/* Mobile Sidebar */}
        <div
          id="sidebar"
          className={`fixed top-0 right-0 w-64 h-full bg-gray-900 border-l border-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute text-gray-400 transition-colors hover:text-white top-4 right-4 focus:outline-none"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo in sidebar */}
          <div className="px-6 mt-8 mb-8">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              GameVault
            </span>
          </div>

          {/* Sidebar Links */}
          <ul className="px-6 space-y-4">
            <li>
              <a
                href="/"
                className="block py-2 text-gray-300 transition-colors duration-300 border-b border-gray-800 hover:text-purple-400"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/store"
                className="block py-2 text-gray-300 transition-colors duration-300 border-b border-gray-800 hover:text-purple-400"
                onClick={() => setIsOpen(false)}
              >
                Store
              </a>
            </li>
            <li>
              <a
                href="/library"
                className="block py-2 text-gray-300 transition-colors duration-300 border-b border-gray-800 hover:text-purple-400"
                onClick={() => setIsOpen(false)}
              >
                Library
              </a>
            </li>
            <li>
              <a
                href="/community"
                className="block py-2 text-gray-300 transition-colors duration-300 border-b border-gray-800 hover:text-purple-400"
                onClick={() => setIsOpen(false)}
              >
                Community
              </a>
            </li>
            
            {/* Mobile Buttons */}
            <div className="mt-6 space-y-4">
              {!cookies.jwt ? (
                <>
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-center text-blue-400 transition-colors duration-300 border border-blue-500 rounded-lg hover:bg-blue-600 hover:text-white"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      handleRegister();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-center text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Join Now
                  </button>
                </>
              ) : (
                <>
                  <a 
                    href="/cart"
                    className="flex items-center space-x-2 text-gray-300 transition-colors duration-300 hover:text-purple-400"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Cart (2)</span>
                  </a>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-white transition-colors duration-300 bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>
      
      {/* Spacer to prevent content from being hidden under navbar */}
      <div className="h-16"></div>
    </>
  );
}