import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-1 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sun-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <span className="text-xl font-bold">EcoShield</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex-grow flex justify-center">
          <nav className="flex space-x-6">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-sun-200 transition-all duration-200 font-medium">Home</Link>
            <Link to="/map" className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-sky-200 transition-all duration-200 font-medium">Map View</Link>
            <Link to="/visualizations" className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-blue-200 transition-all duration-200 font-medium">Visualizations</Link>
            <Link to="/satellite" className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-sky-200 transition-all duration-200 font-medium">Satellite</Link>
            <Link to="/farming" className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-earth-200 transition-all duration-200 font-medium">Farming</Link>
            <Link to="/emergency" className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-red-200 transition-all duration-200 font-medium">Emergency</Link>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none ml-4 p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-green-800/90 backdrop-blur-sm px-4 py-3 border-t border-white/10">
          <Link to="/" className="block py-3 px-3 rounded-md hover:bg-white/10 hover:text-sun-200 transition-all duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/map" className="block py-3 px-3 rounded-md hover:bg-white/10 hover:text-sky-200 transition-all duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>Map View</Link>
          <Link to="/visualizations" className="block py-3 px-3 rounded-md hover:bg-white/10 hover:text-blue-200 transition-all duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>Visualizations</Link>
          <Link to="/satellite" className="block py-3 px-3 rounded-md hover:bg-white/10 hover:text-sky-200 transition-all duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>Satellite</Link>
          <Link to="/farming" className="block py-3 px-3 rounded-md hover:bg-white/10 hover:text-earth-200 transition-all duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>Farming</Link>
          <Link to="/emergency" className="block py-3 px-3 rounded-md hover:bg-white/10 hover:text-red-200 transition-all duration-200 font-medium" onClick={() => setIsMenuOpen(false)}>Emergency</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
