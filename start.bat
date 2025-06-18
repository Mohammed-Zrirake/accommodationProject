@echo off
echo Starting all services...

start "API" cmd /c "cd api && dotnet watch run"
start "Client" cmd /c "cd client && npm run dev"
start "Owner" cmd /c "cd owner && npm run dev"
start "Booking" cmd /c "cd Booking && npm run dev"