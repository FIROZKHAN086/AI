import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 text-center  text-sm opacity-80">
      <hr className="my-6 border-gray-900" />
      <p>🤖 Made with <span className="text-red-400">❤️</span> by <strong>Firoz Khan</strong></p>
      <p className="mt-1">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
