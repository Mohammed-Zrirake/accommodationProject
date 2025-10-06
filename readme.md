# Accommodation Project

## Overview

This project is a full-stack web application designed for managing accommodation listings, bookings, and related administrative tasks. It consists of two main parts:

1.  **Booking Frontend:** A React-based admin dashboard for managing hotels, rooms, reservations, clients, and payments.
2.  **API Backend:** A RESTful API built with .NET that provides data and services for accommodation management.

## Features and Functionality

*   **Admin Dashboard (Booking Frontend):**
    *   Displays key metrics such as occupied rooms, daily reservations, new clients, and daily revenue.
    *   Provides charts for monthly occupation rates and revenue.
    *   Manages room statuses (available, occupied, cleaning, maintenance).
    *   Lists the latest bookings with details on clients, rooms, check-in/out dates, and status.
    *   Offers CRUD (Create, Read, Update, Delete) functionality for clients, rooms, reservations and payments.
    *   Uses tabs for filtering reservations and payments by status (confirmed, pending, cancelled, completed, refunded).
*   **Accommodation Management (API Backend):**
    *   Supports multiple accommodation types: Hotels, Villas, Apartments, Cottages, Hostels, and Riads.
    *   Provides endpoints for listing, retrieving, creating, and deleting accommodations.
    *   Allows managing amenities, rooms, and dorms associated with accommodations.
    *   Includes image upload and storage functionality.
    *   Includes user account and role management
*   **Polymorphic Relationships**
    * WishListItems table can contain a AccommodationId, RoomId or DormId, but only one of them.
    * Booking table can contain a AccommodationId, RoomId or DormId, but only one of them.
*   **Code-First Database Migrations**
    * The migration is handled by Entity Framework Code-First, which means you can start the API without creating the database first.

## Technology Stack

*   **Frontend:**
    *   React
    *   TypeScript
    *   Vite
    *   react-router-dom
    *   Tailwind CSS (styling)
    *   lucide-react (icons)
    *   class-variance-authority, tailwind-merge (utility libraries)
    *   @radix-ui/react-slot, @radix-ui/react-checkbox, @radix-ui/react-label, @radix-ui/react-tabs (UI primitives)
    *   recharts (charts)
*   **Backend:**
    *   .NET 9
    *   C#
    *   ASP.NET Core Web API
    *   Entity Framework Core (EF Core)
    *   SQLite (database)
    *   Swashbuckle (Swagger)
    *   Newtonsoft.Json

## Prerequisites

Before setting up the project, ensure you have the following installed:

*   .NET 9 SDK
*   Node.js and npm (Node Package Manager)

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Mohammed-Zrirake/accommodationProject.git
    cd accommodationProject
    ```

2.  **Set up the API Backend:**

    ```bash
    cd api
    ```

    *  Build and run the API:

        ```bash
        dotnet build
        dotnet run
        ```

        This will start the API, typically on `https://localhost:5073`. The exact URL will be displayed in the console output.

    *   (Optional) To run the migrations you need to install the following tools:
        ```
        dotnet tool install --global dotnet-ef
        ```

3.  **Set up the Booking Frontend:**

    ```bash
    cd Booking
    ```

    *   Install dependencies:

        ```bash
        npm install
        ```

    *   Start the frontend development server:

        ```bash
        npm run dev
        ```

        This will start the frontend, typically on `http://localhost:5173`.

4.  **Set up the Owner Panel Frontend:**

    ```bash
    cd owner
    ```

    *   Install dependencies:

        ```bash
        npm install
        ```

    *   Start the frontend development server:

        ```bash
        npm run dev
        ```

        This will start the frontend, typically on `http://localhost:5173`.

## Usage Guide

*   **Accessing the Booking Frontend:**

    *   Open your web browser and navigate to `http://localhost:5173` (or the URL provided by the `npm run dev` command).
    *   Use the sidebar to navigate between different sections (Dashboard, Rooms, Reservations, Clients, Payments).
*    **Accessing the Owner Panel Frontend:**

    *   Open your web browser and navigate to `http://localhost:5173` (or the URL provided by the `npm run dev` command).
    *   Use the sidebar to navigate between different sections (List Properties, Add Properties).
*   **API Endpoints:**

    *   The API endpoints are defined in the `api/Controllers` directory.
    *   Use tools like Swagger or Postman to test the API endpoints.

## API Documentation

*   **Swagger UI:**

    *   The API includes Swagger UI for interactive documentation and testing.  Navigate to `https://localhost:5073/swagger` (or the appropriate URL based on where your API is running) in your browser.  You should see a UI detailing all available endpoints, their parameters, and example responses.

*   **Key Endpoints:**

    *   `GET /api/hotel`: Retrieves all hotels.
    *   `GET /api/hotel/{id}`: Retrieves a specific hotel by ID.
    *   `POST /api/hotel`: Creates a new hotel.  Requires a `multipart/form-data` request.
    *   `GET /api/room/{id}`: Retrieves a specific room by ID.
    *   `POST /api/room`: Creates a new room.  Requires a `multipart/form-data` request.
    *   `GET /api/amenities`: Retrieves all amenities.
    *   `POST /api/amenities`: Creates a new amenity.

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request.

## License Information

No license was specified in the repository. All rights are reserved by the author.

## Contact/Support Information

For questions or support, please contact:
mohammedzrirake@gmail.com
