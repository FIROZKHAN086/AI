import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);  // State to toggle the mobile menu

  // Toggle menu for mobile view
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className=" z-10 relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-bold tracking-wide">
        <Mic className="inline-block text-white mr-2" />
        🤖 AI App
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            AI-ChatBot
          </Link>
        </li>
        <li>
          <Link to="/ai2" className="hover:text-yellow-300 transition duration-300">
            Voice-Chatbot
          </Link>
        </li>
      </ul>
      
      {/* Mobile Menu Icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white"
      >
        {/* Display a simple hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } absolute top-16 left-0 right-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-4 space-y-4 md:hidden`}
      >
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="block text-xl text-white hover:text-yellow-300 transition duration-300"
              onClick={toggleMenu} // Close menu when link is clicked
            >
              AI-ChatBot
            </Link>
          </li>
          <li>
            <Link
              to="/ai2"
              className="block text-xl text-white hover:text-yellow-300 transition duration-300"
              onClick={toggleMenu} // Close menu when link is clicked
            >
              Voice-Chatbot
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
