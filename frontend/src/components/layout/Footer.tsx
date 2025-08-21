import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-sage-800 to-earth-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1 bg-white/10 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sun-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="font-semibold text-lg">EcoShield</span>
            </div>
            <p className="text-sm text-sage-200">&copy; {new Date().getFullYear()} EcoShield - AI for Environmental Monitoring</p>
            <p className="text-xs text-sage-300 mt-1">Protecting our planet with intelligent monitoring</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-sm text-sage-200 hover:text-sun-200 transition-colors px-3 py-1 rounded hover:bg-white/5">Privacy Policy</a>
            <a href="#" className="text-sm text-sage-200 hover:text-sun-200 transition-colors px-3 py-1 rounded hover:bg-white/5">Terms of Service</a>
            <a href="#" className="text-sm text-sage-200 hover:text-sun-200 transition-colors px-3 py-1 rounded hover:bg-white/5">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
