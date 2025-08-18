import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MapView from '../components/MapView';
import RiskSummary from '../components/RiskSummary';
import AdvicePanel from '../components/AdvicePanel';
import ChatButton from '../components/ChatButton';
import UserProfileSelector from '../components/UserProfileSelector';

export default function Home() {
  const [userProfile, setUserProfile] = useState('citizen');
  const [location, setLocation] = useState('');

  const handleProfileChange = (profile: string) => {
    setUserProfile(profile);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <Layout title="EcoShield - Environmental Monitoring">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">EcoShield</h1>
        <p className="text-gray-600">AI-powered environmental monitoring for your local area</p>
      </header>

      <UserProfileSelector onProfileChange={handleProfileChange} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapView onLocationSelect={handleLocationChange} />
        </div>
        <div>
          <RiskSummary userProfile={userProfile} location={location} />
          <div className="mt-6">
            <AdvicePanel userProfile={userProfile} location={location} />
          </div>
        </div>
      </div>

      {/* Only the chat button, no other chat components */}
      <ChatButton userProfile={userProfile} location={location} />
    </Layout>
  );
}
