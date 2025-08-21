import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-br from-green-800 via-green-700 to-sage-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="inline-flex items-center px-4 py-2 bg-sun-400/20 text-sun-200 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  AI-Powered Environmental Intelligence
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                  Monitor Your Environment with 
                  <span className="text-sun-300"> Smart Insights</span>
                </h1>
                <p className="text-sage-100 text-xl mb-8 max-w-lg leading-relaxed">
                  EcoShield provides real-time environmental monitoring, risk assessment, and personalized advice to help you understand and respond to environmental conditions in your area.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/map" className="px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-sage-50 hover:shadow-lg transition-all duration-300 shadow-md">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Explore Map
                    </span>
                  </Link>
                  <Link to="/farming" className="px-8 py-4 bg-earth-600 text-white font-semibold rounded-xl hover:bg-earth-700 hover:shadow-lg transition-all duration-300 shadow-md border border-earth-500">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Farming Tools
                    </span>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Environmental landscape" 
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white p-4 rounded-xl shadow-xl">
                      <p className="font-bold">Real-time monitoring</p>
                      <p className="text-sm text-sky-100">Powered by AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sage-900 mb-4">Key Features</h2>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto">Discover powerful tools designed to help you monitor, analyze, and respond to environmental changes in your area.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-sage-100 hover:border-sky-200">
            <div className="bg-gradient-to-br from-sky-100 to-sky-50 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-sage-900 mb-3">Interactive Maps</h3>
            <p className="text-sage-600 mb-6 leading-relaxed">
              Visualize pollution zones, risk areas, and environmental conditions with our interactive heat maps and zone overlays.
            </p>
            <Link to="/map" className="inline-flex items-center text-sky-600 font-semibold hover:text-sky-700 transition-colors group">
              Explore Maps 
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-sage-100 hover:border-green-200">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-sage-900 mb-3">Historical Analysis</h3>
            <p className="text-sage-600 mb-6 leading-relaxed">
              Track environmental trends over time with comprehensive historical data analysis and visualizations.
            </p>
            <Link to="/historical" className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors group">
              View Trends 
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-sage-100 hover:border-earth-200">
            <div className="bg-gradient-to-br from-earth-100 to-earth-50 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-earth-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-sage-900 mb-3">Farming Tools</h3>
            <p className="text-sage-600 mb-6 leading-relaxed">
              Get crop recommendations, planting calendars, and analyze plant health with our AI-powered farming tools.
            </p>
            <Link to="/farming" className="inline-flex items-center text-earth-600 font-semibold hover:text-earth-700 transition-colors group">
              Access Tools 
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-sage-50 to-earth-50 py-16 rounded-2xl">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sage-900 mb-4">How It Works</h2>
            <p className="text-sage-600 text-lg max-w-2xl mx-auto">Get started with EcoShield in four simple steps and begin monitoring your environment today.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">1</div>
                <div className="absolute -inset-2 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-bold text-sage-900 mb-3 text-lg">Select Location</h3>
              <p className="text-sage-600 text-sm leading-relaxed">Choose your location from the map or search for a specific area to get started.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-sky-600 to-sky-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">2</div>
                <div className="absolute -inset-2 bg-gradient-to-br from-sky-200 to-sky-300 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-bold text-sage-900 mb-3 text-lg">Get Real-time Data</h3>
              <p className="text-sage-600 text-sm leading-relaxed">Our AI crawls the web for the latest environmental data for your area.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-earth-600 to-earth-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">3</div>
                <div className="absolute -inset-2 bg-gradient-to-br from-earth-200 to-earth-300 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-bold text-sage-900 mb-3 text-lg">View Analysis</h3>
              <p className="text-sage-600 text-sm leading-relaxed">See environmental risks, pollution zones, and detailed summaries.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-sun-600 to-sun-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">4</div>
                <div className="absolute -inset-2 bg-gradient-to-br from-sun-200 to-sun-300 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-bold text-sage-900 mb-3 text-lg">Get Recommendations</h3>
              <p className="text-sage-600 text-sm leading-relaxed">Receive personalized advice based on your location's environmental conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sage-900 mb-4">Who Uses EcoShield?</h2>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto">Discover how different professionals and communities benefit from our environmental monitoring platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-earth-500 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-earth-100 p-3 rounded-xl mr-4">
                <svg className="w-8 h-8 text-earth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-sage-900">Farmers</h3>
            </div>
            <p className="text-sage-600 mb-6 leading-relaxed">
              Make informed decisions about crop planting, irrigation, and pest management based on environmental data and AI recommendations.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-earth-500 rounded-full mr-3"></div>
                Crop planting calendars
              </li>
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-earth-500 rounded-full mr-3"></div>
                Plant health analysis
              </li>
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-earth-500 rounded-full mr-3"></div>
                Weather risk alerts
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-sky-500 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-sky-100 p-3 rounded-xl mr-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-sage-900">Urban Planners</h3>
            </div>
            <p className="text-sage-600 mb-6 leading-relaxed">
              Identify high-risk areas, monitor pollution trends, and plan green infrastructure based on environmental data.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                Pollution heat maps
              </li>
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                Risk zone analysis
              </li>
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                Historical trend data
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500 hover:shadow-2xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-xl mr-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-sage-900">Citizens</h3>
            </div>
            <p className="text-sage-600 mb-6 leading-relaxed">
              Understand local environmental conditions, receive health advisories, and make informed decisions about outdoor activities.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Air quality monitoring
              </li>
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Health risk advisories
              </li>
              <li className="flex items-center text-sm text-sage-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Personalized recommendations
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-br from-green-700 via-green-600 to-sage-600 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="container mx-auto px-6 py-16 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h2 className="text-4xl font-bold mb-4">Ready to monitor your environment?</h2>
                <p className="text-green-100 text-lg max-w-lg">Start exploring environmental data in your area today and make informed decisions for a sustainable future.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/map" className="px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-sage-50 hover:shadow-lg transition-all duration-300 shadow-md text-center">
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Explore Map
                  </span>
                </Link>
                <Link to="/farming" className="px-8 py-4 bg-earth-600 text-white font-semibold rounded-xl hover:bg-earth-700 hover:shadow-lg transition-all duration-300 shadow-md border border-earth-500 text-center">
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Try Farming Tools
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
