import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-2xl font-bold tracking-wide">
        <FaRobot className="text-yellow-300" />
        AI App
      </div>
      <ul className="flex space-x-6 text-lg font-medium">
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
    </nav>
  );
};

export default Navbar;
