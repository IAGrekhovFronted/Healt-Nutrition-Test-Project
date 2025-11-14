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

## Screenshots
<img width="935" height="373" alt="Screenshot_308" src="https://github.com/user-attachments/assets/be30f074-8c26-49ff-8619-a64c1ffbbba3" />
<img width="900" height="391" alt="Screenshot_309" src="https://github.com/user-attachments/assets/611524cd-2016-428f-a680-28c9ced72458" />
