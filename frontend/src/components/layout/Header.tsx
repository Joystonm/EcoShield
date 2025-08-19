import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="text-xl font-bold">EcoShield</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex-grow flex justify-center">
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition-colors">Home</Link>
            <Link to="/map" className="hover:text-green-200 transition-colors">Map View</Link>
            <Link to="/satellite" className="hover:text-green-200 transition-colors">Satellite</Link>
            <Link to="/farming" className="hover:text-green-200 transition-colors">Farming</Link>

            <Link to="/emergency" className="hover:text-green-200 transition-colors">Emergency</Link>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none ml-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-green-800 px-4 py-2">
          <Link to="/" className="block py-2 hover:text-green-200 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/map" className="block py-2 hover:text-green-200 transition-colors" onClick={() => setIsMenuOpen(false)}>Map View</Link>
          <Link to="/satellite" className="block py-2 hover:text-green-200 transition-colors" onClick={() => setIsMenuOpen(false)}>Satellite</Link>
          <Link to="/farming" className="block py-2 hover:text-green-200 transition-colors" onClick={() => setIsMenuOpen(false)}>Farming</Link>

          <Link to="/emergency" className="block py-2 hover:text-green-200 transition-colors" onClick={() => setIsMenuOpen(false)}>Emergency</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
