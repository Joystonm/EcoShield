import React, { useState, useEffect } from 'react';
import Globe3D from '../components/visualizations/Globe3D';
import DataStories from '../components/visualizations/DataStories';
import '../styles/Visualizations.css';

const Visualizations: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'globe' | 'stories'>('globe');
  const [isLoading, setIsLoading] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebGLSupported(!!gl);
    
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigationItems = [
    { id: 'globe' as const, label: '3D Visualization', icon: '🌍' },
    { id: 'stories' as const, label: 'Data Stories', icon: '📊' }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          🌍
        </div>
        <p>Loading Environmental Visualizations...</p>
      </div>
    );
  }

  return (
    <div className="visualizations-container">
      {/* Navigation Header */}
      <header className="visualizations-header">
        <div className="header-content">
          <h1 className="visualizations-title">Environmental Visualizations</h1>
          <p className="visualizations-subtitle">Explore our planet's environmental data through immersive 3D experiences</p>
        </div>
        
        <nav className="visualizations-navigation">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="visualizations-main">
        <div className="section-container">
          {activeSection === 'globe' && (
            <div className="globe-section">
              {webGLSupported ? (
                <Globe3D />
              ) : (
                <div className="webgl-fallback">
                  <h3>WebGL Not Supported</h3>
                  <p>Your browser doesn't support WebGL. Please use a modern browser to view 3D visualizations.</p>
                  <div className="fallback-chart">
                    <div className="fallback-content">
                      <h4>Environmental Data Overview</h4>
                      <div className="data-grid">
                        <div className="data-item">
                          <span className="data-label">Global Temperature Rise</span>
                          <span className="data-value">+1.1°C</span>
                        </div>
                        <div className="data-item">
                          <span className="data-label">CO₂ Levels</span>
                          <span className="data-value">425 ppm</span>
                        </div>
                        <div className="data-item">
                          <span className="data-label">Forest Loss (Annual)</span>
                          <span className="data-value">10M hectares</span>
                        </div>
                        <div className="data-item">
                          <span className="data-label">Renewable Energy Growth</span>
                          <span className="data-value">+15% YoY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'stories' && (
            <div className="stories-section">
              <DataStories />
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="visualizations-footer">
        <p>Data sources: NASA, EPA, NOAA | Updated in real-time</p>
      </footer>
    </div>
  );
};

export default Visualizations;
