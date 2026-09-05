@echo off
echo ========================================================
echo Starting StayFinder Platform:
echo 1. .NET 9 Web API + ASP.NET Core Identity (Port 5073)
echo 2. Next.js 15 App Router Frontend (Port 3000)
echo ========================================================

start "StayFinder API (.NET 9)" cmd /c "cd api && dotnet watch run"
start "StayFinder Frontend (Next.js)" cmd /c "cd client && npm run dev"