## Архитектура приложения

1. DB - PostgreSQL
2. Backend - .Net 9.0
   documentation - swagger
3. Frontend:
   framework - Next.js
   styles - Tailwind
   UI components - shadcn UI
   API client & types - openapi
4. Sensors emulation - Express.js (Node)

## Развертывание

### Containers

В корне выполнить консольную команду docker-compose up --build

### Dev-развертывание

#### DB

Поднять образ PostgreSQL

#### Backend

Собрать .env, пример в папке.
Выполнить dotnet run.

#### Frontend

Собрать .env, пример в папке.
Выполнить консольную команду yarn (установит зависимости).
Выполнить команду yarn dev

#### Sensor emulation

Собрать .env, пример в папке.
Выполнить консольную команду yarn (установит зависимости).
Выполнить команду yarn dev

## Тестирование через Postman

GET http://localhost:5000/api/data

GET http://localhost:5000/api/sensors/summary

POST http://localhost:5000/api/data
{
"sensorId": 101,
"timestamp": "2025-11-14T12:30:00Z",
"value": 25.7
}
