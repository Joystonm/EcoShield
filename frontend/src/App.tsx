import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import HistoricalData from './pages/HistoricalData';
import FarmingTools from './pages/FarmingTools';
import SatelliteAnalysis from './pages/SatelliteAnalysis';
import Visualizations from './pages/Visualizations';
import EmergencyResponse from './pages/EmergencyResponse';
import EnvironmentalChat from './components/chat/EnvironmentalChat';
import TestPage from './pages/TestPage';
import '@copilotkit/react-ui/styles.css';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/historical" element={<HistoricalData />} />
          <Route path="/farming" element={<FarmingTools />} />
          <Route path="/satellite" element={<SatelliteAnalysis />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/emergency" element={<EmergencyResponse />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Chat Icon Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-4 shadow-2xl hover:from-green-700 hover:to-green-800 hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
      
      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 z-50">
          <EnvironmentalChat />
        </div>
      )}
    </div>
  );
}

export default App;
