# EcoShield – AI for Environmental Monitoring

An AI-powered platform that acts as a protective shield for the environment by monitoring and analyzing real-time conditions.

## Overview
EcoShield provides real-time environmental monitoring, risk assessment, and personalized advice to help users understand and respond to environmental conditions in their area.

## Features
- Interactive map visualization of pollution and risk zones
- Environmental risk summaries
- Preventive advice based on local conditions
- AI-powered chat assistant for environmental queries
- Historical environmental data analysis

## Tech Stack
- Frontend: React.js with CopilotKit
- Backend: Python FastAPI
- Data Sources: Tavily, weather APIs
- Storage: Appwrite, Mem0
- Monitoring: Keywords AI

## Getting Started

### Prerequisites
- Node.js, Python 3.10+, Appwrite Cloud account
- Tavily API key (https://tavily.com)
- Mem0 account & key (https://mem0.ai)
- Keywords AI token (https://keywords.ai)
- CopilotKit setup (https://docs.copilotkit.ai)

### Frontend Setup
1. Install dependencies:
   ```
   npm install
   ```

2. Make sure the `.env` file has your API keys:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   NEXT_PUBLIC_COPILOT_API_KEY=local-development
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r ../requirements.txt
   ```

4. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```
