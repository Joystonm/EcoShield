import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import MapView from './pages/MapView';
import Satellite from './pages/Satellite';
import Farming from './pages/Farming';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/satellite" element={<Satellite />} />
        <Route path="/farming" element={<Farming />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
