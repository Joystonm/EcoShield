import json
from typing import Dict, List, Any, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class AdviceAgent:
    """
    Agent that generates environmental advice and risk assessments
    """
    
    def __init__(self):
        """Initialize the advice agent"""
        # No OpenAI client initialization
        pass
    
    async def generate_risk_assessment(self, environmental_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate risk assessment based on environmental data
        
        Args:
            environmental_data: Dictionary containing environmental data
            
        Returns:
            Dictionary containing risk assessment
        """
        # Instead of using OpenAI, use a default risk assessment based on the environmental data
        try:
            # Extract relevant data for risk assessment
            air_quality = environmental_data.get('air_quality', {})
            weather = environmental_data.get('weather', {})
            
            # Determine overall risk level based on air quality and weather
            aqi = air_quality.get('aqi', 0)
            temperature = weather.get('temperature', 20)
            uv_index = weather.get('uv_index', 5)
            
            # Determine risk level based on AQI
            if aqi > 150:
                air_risk_level = "high"
                air_risk_desc = "Poor air quality may cause health issues for sensitive groups and the general population."
            elif aqi > 100:
                air_risk_level = "medium"
                air_risk_desc = "Moderate air pollution may affect sensitive groups."
            else:
                air_risk_level = "low"
                air_risk_desc = "Air quality is good with minimal health risks."
                
            # Determine risk level based on UV index
            if uv_index > 7:
                uv_risk_level = "high"
                uv_risk_desc = "High UV levels may cause skin damage with brief exposure."
            elif uv_index > 5:
                uv_risk_level = "medium"
                uv_risk_desc = "Moderate UV levels may cause skin damage with prolonged exposure."
            else:
                uv_risk_level = "low"
                uv_risk_desc = "Low UV levels with minimal risk of skin damage."
                
            # Determine risk level based on temperature
            if temperature > 35 or temperature < 0:
                temp_risk_level = "high"
                temp_risk_desc = "Extreme temperatures may pose health risks."
            elif temperature > 30 or temperature < 5:
                temp_risk_level = "medium"
                temp_risk_desc = "Temperature conditions may be uncomfortable for sensitive groups."
            else:
                temp_risk_level = "low"
                temp_risk_desc = "Temperature conditions are comfortable for most people."
                
            # Determine overall risk level
            risk_levels = [air_risk_level, uv_risk_level, temp_risk_level]
            if "high" in risk_levels:
                overall_risk_level = "high"
            elif "medium" in risk_levels:
                overall_risk_level = "medium"
            else:
                overall_risk_level = "low"
                
            # Create risk assessment
            risk_assessment = {
                "overall_risk": {
                    "level": overall_risk_level,
                    "description": f"Overall environmental risk is {overall_risk_level} based on air quality, UV exposure, and temperature conditions."
                },
                "specific_risks": [
                    {
                        "category": "Air Quality",
                        "level": air_risk_level,
                        "description": air_risk_desc,
                        "affected_groups": ["Children", "Elderly", "People with respiratory conditions"]
                    },
                    {
                        "category": "UV Exposure",
                        "level": uv_risk_level,
                        "description": uv_risk_desc,
                        "affected_groups": ["All outdoor workers", "Children", "Fair-skinned individuals"]
                    },
                    {
                        "category": "Temperature",
                        "level": temp_risk_level,
                        "description": temp_risk_desc,
                        "affected_groups": ["Elderly", "Children", "People with chronic conditions"]
                    }
                ],
                "trend": {
                    "direction": "stable",
                    "description": "Environmental conditions have remained relatively stable."
                }
            }
            
            return risk_assessment
        except Exception as e:
            print(f"Error generating risk assessment: {str(e)}")
            return self._create_default_risk_assessment()
    
    async def generate_advice(self, environmental_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate preventive advice based on environmental data
        
        Args:
            environmental_data: Dictionary containing environmental data
            
        Returns:
            Dictionary containing advice
        """
        # Instead of using OpenAI, use a default advice based on the environmental data
        try:
            # Extract relevant data for advice
            air_quality = environmental_data.get('air_quality', {})
            weather = environmental_data.get('weather', {})
            
            # Determine advice based on air quality and weather
            aqi = air_quality.get('aqi', 0)
            temperature = weather.get('temperature', 20)
            uv_index = weather.get('uv_index', 5)
            
            # Air quality advice
            if aqi > 150:
                air_advice = "Limit outdoor activities, especially for sensitive groups. Keep windows closed."
                air_urgency = "high"
            elif aqi > 100:
                air_advice = "Consider reducing prolonged outdoor activities for sensitive groups."
                air_urgency = "medium"
            else:
                air_advice = "Air quality is good. Enjoy outdoor activities."
                air_urgency = "low"
                
            # UV protection advice
            if uv_index > 7:
                uv_advice = "Use SPF 30+ sunscreen, wear protective clothing, and limit direct sun exposure between 10am-4pm."
                uv_urgency = "high"
            elif uv_index > 5:
                uv_advice = "Apply SPF 15+ sunscreen and wear a hat when outdoors for extended periods."
                uv_urgency = "medium"
            else:
                uv_advice = "Basic sun protection recommended for extended outdoor activities."
                uv_urgency = "low"
                
            # Temperature advice
            if temperature > 35:
                temp_advice = "Stay hydrated, seek shade, and use cooling measures. Check on vulnerable individuals."
                temp_urgency = "high"
            elif temperature > 30:
                temp_advice = "Stay hydrated and take regular breaks from heat."
                temp_urgency = "medium"
            elif temperature < 0:
                temp_advice = "Dress in layers, limit exposure to cold, and watch for signs of hypothermia."
                temp_urgency = "high"
            elif temperature < 5:
                temp_advice = "Dress warmly and be cautious of icy conditions."
                temp_urgency = "medium"
            else:
                temp_advice = "Temperature conditions are comfortable for most activities."
                temp_urgency = "low"
                
            # Create advice
            advice = {
                "general_advice": "Take appropriate precautions based on current environmental conditions.",
                "specific_recommendations": [
                    {
                        "category": "Air Quality",
                        "title": "Air Quality Precautions",
                        "description": air_advice,
                        "urgency": air_urgency,
                        "target_groups": ["All individuals", "Especially sensitive groups"]
                    },
                    {
                        "category": "UV Protection",
                        "title": "Sun Safety",
                        "description": uv_advice,
                        "urgency": uv_urgency,
                        "target_groups": ["All individuals"]
                    },
                    {
                        "category": "Temperature",
                        "title": "Temperature Adaptation",
                        "description": temp_advice,
                        "urgency": temp_urgency,
                        "target_groups": ["All individuals", "Especially vulnerable groups"]
                    }
                ],
                "preventive_measures": [
                    "Monitor local air quality reports",
                    "Stay hydrated throughout the day",
                    "Use appropriate sun protection",
                    "Adjust outdoor activities based on environmental conditions"
                ]
            }
            
            return advice
        except Exception as e:
            print(f"Error generating advice: {str(e)}")
            return self._create_default_advice()
    
    async def generate_chat_response(
        self, 
        messages: List[Dict[str, str]], 
        environmental_context: Optional[str] = None,
        previous_context: Optional[str] = None,
        user_type: Optional[str] = None
    ) -> str:
        """
        Generate a response to a user chat message
        
        Args:
            messages: List of chat messages
            environmental_context: Optional environmental data as context
            previous_context: Optional previous conversation context
            user_type: Optional user type for personalized responses
            
        Returns:
            Response string
        """
        # Extract the last user message
        last_message = None
        for message in reversed(messages):
            if message["role"] == "user":
                last_message = message["content"]
                break
                
        if not last_message:
            return "I don't see a question to respond to. How can I help you with environmental information?"
            
        # Check for simple greetings
        greetings = ['hi', 'hello', 'hey', 'greetings', 'howdy', 'hi there', 'hello there']
        if last_message.lower().strip() in greetings:
            return "Hello! I'm your environmental assistant. How can I help you today? You can ask me about air quality, weather conditions, environmental risks, or farming advice."
            
        # Generate a response based on the query topic
        query_lower = last_message.lower()
        
        if "weather" in query_lower or "temperature" in query_lower or "climate" in query_lower:
            return ("Weather refers to short-term atmospheric conditions like temperature, humidity, precipitation, wind speed, and air pressure "
                   "in a specific place and time. Climate refers to long-term weather patterns in a particular region. "
                   "Climate change is causing more extreme weather events, rising temperatures, and shifting precipitation patterns globally. "
                   "For accurate current weather information, I recommend checking a local weather service or app.")
        
        elif "pollution" in query_lower or "air quality" in query_lower:
            return ("Air pollution is a major environmental concern affecting human health and ecosystems. Common air pollutants include "
                   "particulate matter (PM2.5 and PM10), nitrogen dioxide (NO2), sulfur dioxide (SO2), carbon monoxide (CO), and ozone (O3). "
                   "These come from sources like vehicle emissions, industrial activities, and burning fossil fuels. Poor air quality can cause "
                   "respiratory issues, cardiovascular problems, and other health concerns, especially for vulnerable populations.")
        
        elif "water" in query_lower:
            return ("Water quality is essential for both human health and ecosystem functioning. Water pollution can come from various sources, "
                   "including industrial discharge, agricultural runoff, and urban waste. Key water quality parameters include pH, dissolved oxygen, "
                   "turbidity, and the presence of contaminants like heavy metals, pesticides, and bacteria. Clean water is necessary for drinking, "
                   "agriculture, and supporting aquatic life.")
        
        elif "plant" in query_lower or "garden" in query_lower or "farming" in query_lower or "agriculture" in query_lower:
            return ("Plants are affected by various environmental factors including temperature, precipitation, soil quality, and sunlight. "
                   "Climate change is altering growing seasons and creating new challenges for agriculture and gardening. Sustainable farming "
                   "practices like crop rotation, reduced tillage, and integrated pest management can help mitigate environmental impacts while "
                   "maintaining productivity.")
        
        elif "recycling" in query_lower or "waste" in query_lower or "plastic" in query_lower:
            return ("Waste management and recycling are important for reducing environmental impact. Recycling helps conserve resources, reduce "
                   "landfill waste, and lower greenhouse gas emissions. Materials commonly recycled include paper, glass, metals, and certain plastics. "
                   "Reducing consumption, reusing items, and properly disposing of waste are also key practices for environmental sustainability.")
        
        elif "energy" in query_lower or "power" in query_lower or "electricity" in query_lower:
            return ("Energy production and consumption have significant environmental impacts. Fossil fuels like coal, oil, and natural gas contribute "
                   "to air pollution and climate change. Renewable energy sources such as solar, wind, hydroelectric, and geothermal power offer cleaner "
                   "alternatives with lower environmental impacts. Energy efficiency and conservation measures can also help reduce environmental footprints.")
        
        else:
            return ("Environmental science covers many interconnected topics including air and water quality, climate patterns, biodiversity, ecosystem health, "
                   "and human impacts on natural systems. Environmental conditions affect human health, agriculture, infrastructure, and natural habitats. "
                   "Sustainable practices and policies aim to balance human needs with environmental protection for current and future generations.")
    
    def _create_default_risk_assessment(self) -> Dict[str, Any]:
        """
        Create default risk assessment when generation fails
        
        Returns:
            Default risk assessment structure
        """
        return {
            "overall_risk": {
                "level": "medium",
                "description": "Moderate environmental risks present in the area."
            },
            "specific_risks": [
                {
                    "category": "Air Quality",
                    "level": "medium",
                    "description": "Moderate levels of air pollution may affect sensitive groups.",
                    "affected_groups": ["Children", "Elderly", "People with respiratory conditions"]
                },
                {
                    "category": "UV Exposure",
                    "level": "medium",
                    "description": "Moderate UV levels may cause skin damage with prolonged exposure.",
                    "affected_groups": ["All outdoor workers", "Children", "Fair-skinned individuals"]
                }
            ],
            "trend": {
                "direction": "stable",
                "description": "Environmental conditions have remained relatively stable."
            }
        }
    
    def _create_default_advice(self) -> Dict[str, Any]:
        """
        Create default advice when generation fails
        
        Returns:
            Default advice structure
        """
        return {
            "general_advice": "Take basic precautions for moderate environmental conditions.",
            "specific_recommendations": [
                {
                    "category": "Air Quality",
                    "title": "Limit outdoor activities during peak pollution hours",
                    "description": "Consider indoor activities during late afternoon when pollution levels are typically highest.",
                    "urgency": "medium",
                    "target_groups": ["Children", "Elderly", "People with respiratory conditions"]
                },
                {
                    "category": "UV Protection",
                    "title": "Use sun protection",
                    "description": "Apply SPF 30+ sunscreen and wear protective clothing when outdoors.",
                    "urgency": "medium",
                    "target_groups": ["All individuals"]
                }
            ],
            "preventive_measures": [
                "Monitor local air quality reports",
                "Stay hydrated throughout the day",
                "Keep windows closed during high pollution events"
            ]
        }
