Full-stack sensor data platform (Health & Nutrition case study)

This repository contains a full-stack test assignment implemented for Health & Nutrition.
The project demonstrates backend–frontend integration, containerized deployment, API-driven development, and real-time sensor data simulation.

## 🎯 What This Project Demonstrates
- Clean backend architecture on .NET
- API-first approach with OpenAPI
- Typed frontend integration
- Containerized multi-service setup
- Sensor data ingestion and aggregation
- Production-like project structure

## 🚀 Tech Stack & Architecture
Backend
  - .NET 9.0
  - PostgreSQL
  - REST API
  - Swagger / OpenAPI for documentation and client generation

Frontend
  - Next.js
  - Tailwind CSS
  - shadcn/ui
  - Typed API client generated from OpenAPI

Sensor Data Emulation
  - Node.js (Express)
  - Simulates incoming sensor measurements

Infrastructure
  - Docker & Docker Compose
  - Environment-based configuration

## 🧱 System Overview
[ Sensors Emulator (Node.js) ]
            ↓
        REST API
     (.NET 9 Backend)
            ↓
       PostgreSQL
            ↓
        Frontend
        (Next.js)

## 🐳 Deployment
From the project root: docker-compose up --build

This will start:
  - PostgreSQL
  - Backend API
  - Frontend
  - Sensor emulator

## 🛠 Local Development Setup
### Database
Run a PostgreSQL container or local instance

### Backend
cp .env.example .env
dotnet run

Swagger UI will be available at: http://localhost:5000/swagger

### Frontend
cp .env.example .env
yarn install
yarn dev

### Sensor Emulator
cp .env.example .env
yarn install
yarn dev

## 🔌 API Testing (Postman / curl)
Get sensor data: GET http://localhost:5000/api/data
Get sensors summary: GET http://localhost:5000/api/sensors/summary
Send sensor measurement: 
POST http://localhost:5000/api/data
Content-Type: application/json

{
  "sensorId": 101,
  "timestamp": "2025-11-14T12:30:00Z",
  "value": 25.7
}

## 📸 Screenshots
<img width="935" height="373" alt="Dashboard view" src="https://github.com/user-attachments/assets/be30f074-8c26-49ff-8619-a64c1ffbbba3" /> 
<img width="900" height="391" alt="Sensors summary" src="https://github.com/user-attachments/assets/611524cd-2016-428f-a680-28c9ced72458" />
