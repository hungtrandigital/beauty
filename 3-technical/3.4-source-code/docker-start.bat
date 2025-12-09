@echo off
REM Docker Start Script for Beauty Project (Windows)
REM This script helps you start the Docker environment

echo.
echo 🚀 Starting Beauty Docker Environment...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop.
    exit /b 1
)

REM Check if docker-compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ docker-compose is not installed. Please install Docker Compose.
    exit /b 1
)

REM Ask user which mode to run
echo Select Docker mode:
echo 1) Full stack (PostgreSQL, Redis, CouchDB, Backend, Frontend)
echo 2) Services only (PostgreSQL, Redis, CouchDB) - for local development
set /p choice="Enter choice [1-2]: "

if "%choice%"=="1" (
    echo.
    echo 📦 Starting full stack...
    docker-compose up -d
    echo.
    echo ✅ Services started!
    echo.
    echo 📍 Access points:
    echo    - Frontend: http://localhost:3001
    echo    - Backend API: http://localhost:3000/api/v1
    echo    - Swagger Docs: http://localhost:3000/api/docs
    echo    - PostgreSQL: localhost:5432
    echo    - Redis: localhost:6379
    echo    - CouchDB: http://localhost:5984
    echo.
    echo 📋 View logs: docker-compose logs -f
    echo 🛑 Stop services: docker-compose down
) else if "%choice%"=="2" (
    echo.
    echo 📦 Starting database services only...
    docker-compose -f docker-compose.dev.yml up -d
    echo.
    echo ✅ Services started!
    echo.
    echo 📍 Access points:
    echo    - PostgreSQL: localhost:5432
    echo    - Redis: localhost:6379
    echo    - CouchDB: http://localhost:5984
    echo.
    echo 💡 Now you can run backend and frontend locally:
    echo    Backend: cd backend ^&^& npm install ^&^& npm run start:dev
    echo    Frontend: cd frontend ^&^& npm install ^&^& npm run dev
    echo.
    echo 📋 View logs: docker-compose -f docker-compose.dev.yml logs -f
    echo 🛑 Stop services: docker-compose -f docker-compose.dev.yml down
) else (
    echo ❌ Invalid choice
    exit /b 1
)

