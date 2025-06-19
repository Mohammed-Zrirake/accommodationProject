# 🏨 Accommodation Booking Platform

This is a full-stack web application for booking accommodations, built with React on the frontend and ASP.NET Web API on the backend.

## 📁 Project Structure
/client     → React app for end users  
/booking    → React app for the booking process  
/owner      → React app for property owners  
/api        → ASP.NET Core Web API backend  

## ⚙️ Setup Instructions

Clone the repository:
git clone https://github.com/your-username/booking-app.git  
cd booking-app

For each frontend folder (`client`, `booking`, `owner`), run:
cd folder-name  
npm install  
npm run dev  

Replace `folder-name` with the actual folder (`client`, `booking`, or `owner`). This is necessary because `node_modules/` is excluded in the .gitignore file and must be reinstalled.

For the backend, navigate to the `api` folder and run:
cd api  
dotnet restore  
dotnet watch run  

This starts the ASP.NET Web API and watches for code changes. The `bin/` and `obj/` folders are excluded in the .gitignore and will be generated automatically.

You must also create a `.env` file in each frontend folder and define your Clerk API key like this:  
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here  

These environment files are not included in the repository for security reasons.
