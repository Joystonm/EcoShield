import json
from typing import Dict, Any, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class PollutionAgent:
    """
    Agent that uses Tavily to search for pollution data
    """
    
    def __init__(self, tavily_service):
        """
        Initialize the pollution agent with Tavily service
        
        Args:
            tavily_service: Initialized Tavily service
        """
        self.tavily_service = tavily_service
        
    async def get_pollution_data(self, location: str, radius_km: float = 5.0) -> Dict[str, Any]:
        """
        Get pollution data for a specific location
        
        Args:
            location: Location string (city, address, coordinates)
            radius_km: Radius in kilometers to search within
            
        Returns:
            Dictionary containing processed pollution data
        """
        # Construct search query
        search_query = f"current air pollution data in {location} PM2.5 AQI air quality index"
        
        try:
            # Get search results from Tavily
            search_results = await self.tavily_service.search(
                query=search_query,
                search_depth="advanced",
                include_domains=["airnow.gov", "iqair.com", "epa.gov", "who.int", "purpleair.com"]
            )
            
            # Extract relevant information from search results
            pollution_data = self._extract_pollution_data_simple(search_results, location)
            
            return pollution_data
            
        except Exception as e:
            print(f"Error getting pollution data: {str(e)}")
            return self._create_default_pollution_data(location)
    
    def _extract_pollution_data_simple(self, search_results: Dict[str, Any], location: str) -> Dict[str, Any]:
        """
        Extract structured pollution data from search results using simple parsing
        
        Args:
            search_results: Raw search results from Tavily
            location: Original location query
            
        Returns:
            Structured pollution data
        """
        # Initialize default data
        pollution_data = self._create_default_pollution_data(location)
        
        # Extract information from search results
        results = search_results.get("results", [])
        
        # Look for AQI and pollution data in the results
        for result in results:
            content = result.get("content", "").lower()
            
            # Try to extract AQI value
            if "aqi" in content or "air quality index" in content:
                # Simple regex-like extraction for AQI values
                words = content.split()
                for i, word in enumerate(words):
                    if word in ["aqi", "index"] and i > 0:
                        try:
                            # Look for numbers before or after AQI mention
                            for j in range(max(0, i-3), min(len(words), i+4)):
                                if words[j].isdigit():
                                    aqi_value = int(words[j])
                                    if 0 <= aqi_value <= 500:  # Valid AQI range
                                        pollution_data["air_quality"]["aqi"] = aqi_value
                                        pollution_data["air_quality"]["category"] = self._get_aqi_category(aqi_value)
                                        break
                        except (ValueError, IndexError):
                            continue
            
            # Try to extract PM2.5 values
            if "pm2.5" in content or "pm 2.5" in content:
                words = content.replace("pm2.5", " pm2.5 ").replace("pm 2.5", " pm2.5 ").split()
                for i, word in enumerate(words):
                    if "pm2.5" in word:
                        try:
                            # Look for numbers near PM2.5 mention
                            for j in range(max(0, i-2), min(len(words), i+3)):
                                if words[j].replace(".", "").isdigit():
                                    pm25_value = float(words[j])
                                    if 0 <= pm25_value <= 500:  # Reasonable PM2.5 range
                                        pollution_data["air_quality"]["pm25"] = pm25_value
                                        break
                        except (ValueError, IndexError):
                            continue
            
            # Extract health implications
            if any(word in content for word in ["unhealthy", "hazardous", "moderate", "good"]):
                if "unhealthy" in content:
                    pollution_data["health_implications"] = "Air quality is unhealthy for sensitive groups or all people."
                elif "hazardous" in content:
                    pollution_data["health_implications"] = "Air quality is hazardous. Everyone should avoid outdoor activities."
                elif "moderate" in content:
                    pollution_data["health_implications"] = "Air quality is moderate. Sensitive people should consider limiting outdoor activities."
                elif "good" in content:
                    pollution_data["health_implications"] = "Air quality is good. No health concerns."
        
        # Set data confidence based on how much data we found
        if pollution_data["air_quality"]["aqi"] != 50 or pollution_data["air_quality"]["pm25"] != 12.0:
            pollution_data["data_confidence"] = "Medium"
        
        return pollution_data
    
    def _get_aqi_category(self, aqi: int) -> str:
        """
        Get AQI category based on AQI value
        
        Args:
            aqi: AQI value
            
        Returns:
            AQI category string
        """
        if aqi <= 50:
            return "Good"
        elif aqi <= 100:
            return "Moderate"
        elif aqi <= 150:
            return "Unhealthy for Sensitive Groups"
        elif aqi <= 200:
            return "Unhealthy"
        elif aqi <= 300:
            return "Very Unhealthy"
        else:
            return "Hazardous"
    
    def _create_default_pollution_data(self, location: str) -> Dict[str, Any]:
        """
        Create default pollution data structure when extraction fails
        
        Args:
            location: Location string
            
        Returns:
            Default pollution data structure
        """
        return {
            "location": location,
            "air_quality": {
                "aqi": 50,
                "pm25": 12.0,
                "pm10": 20.0,
                "ozone": 30.0,
                "category": "Moderate"
            },
            "water_quality": {
                "status": "Unknown",
                "contaminants": []
            },
            "primary_pollutants": ["PM2.5", "Ozone"],
            "health_implications": "Moderate air quality may cause health effects for sensitive groups.",
            "sources": ["Traffic", "Industrial activities"],
            "data_confidence": "Low"
        }
