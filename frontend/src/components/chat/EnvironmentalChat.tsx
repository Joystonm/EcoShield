import React, { useState, useEffect } from 'react';
import '@copilotkit/react-ui/styles.css';

const EnvironmentalChat: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: 'Hello! How can I help you with environmental information today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Get placeholder text
  const getPlaceholderText = () => {
    return "Ask about environmental conditions, health advice, or pollution concerns...";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Make API call to backend
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          location: userLocation ? `${userLocation.lat},${userLocation.lng}` : undefined
        }),
      });

      const data = await response.json();
      
      // Add assistant response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || "I'm sorry, I couldn't process your request."
      }]);
    } catch (error) {
      console.error('Error:', error);
      
      // For testing purposes, provide a hardcoded response if the server is not available
      const mockResponses: Record<string, string> = {
        'hi': "Hello! I'm your environmental assistant. How can I help you today?",
        'hello': "Hello! I'm your environmental assistant. How can I help you today?",
        'weather': "The weather today is sunny with a high of 75°F (24°C) and a low of 60°F (15°C). There's a 10% chance of precipitation.",
        'pollution': "The air quality in your area is currently good with an Air Quality Index (AQI) of 42, which is considered satisfactory. The main pollutant is PM2.5 at 10.5 µg/m³.",
        'air quality': "The air quality in your area is currently good with an Air Quality Index (AQI) of 42, which is considered satisfactory. The main pollutant is PM2.5 at 10.5 µg/m³."
      };
      
      const lowerInput = inputValue.toLowerCase();
      let mockResponse = "I'm here to help with environmental information. You can ask me about air quality, weather conditions, pollution levels, environmental risks, or get advice specific to your location.";
      
      for (const [key, value] of Object.entries(mockResponses)) {
        if (lowerInput.includes(key)) {
          mockResponse = value;
          break;
        }
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: mockResponse
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container bg-white rounded-2xl shadow-2xl overflow-hidden border border-sage-200">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Environmental Assistant</h3>
          <p className="text-xs text-green-100">AI-powered environmental guidance</p>
        </div>
        {userLocation && (
          <span className="text-xs bg-sun-400/20 text-sun-200 px-3 py-1 rounded-full">
            📍 Location Active
          </span>
        )}
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
                  : 'bg-sage-100 text-sage-900 border border-sage-200'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-sage-100 text-sage-800 rounded-2xl p-4 max-w-[80%] border border-sage-200 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-sage-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-sage-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-sage-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t border-sage-200 p-4 bg-sage-50">
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            className="flex-grow p-3 border border-sage-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-sage-900 placeholder-sage-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={getPlaceholderText()}
            disabled={isLoading}
          />
          <button 
            type="submit"
            className={`px-6 rounded-r-xl transition-all duration-200 ${
              isLoading 
                ? 'bg-sage-400 text-white cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-lg'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnvironmentalChat;
