# Book Management System

A full-stack application for managing books with Spring Boot (backend), MongoDB Atlas (database), and React (frontend).
Features include adding, updating, deleting, and viewing books with support for authentication and external book information APIs.

## Tech Stack

Frontend: React, Bootstrap, Axios

Backend: Spring Boot (Java), Spring Web, Spring Data MongoDB

Database: MongoDB Atlas

Deployment: Vercel/Netlify (Frontend), Render/Railway (Backend)

## Setup Instructions
1. Clone Repository
git clone https://github.com/Rohithms2000/book-management-fullstack.git
cd book-management-fullstack

2. Install Dependencies
Backend (Spring Boot)

Open backend in IntelliJ / Eclipse / VS Code with Spring Boot plugin, then let Maven/Gradle resolve dependencies:

cd backend
./mvnw clean install   # if Maven wrapper is used

Frontend (React)
cd frontend
npm install

3. Setup Environment Variables
Backend → application.properties
spring.data.mongodb.uri=${MONGO_URI}


Frontend → .env
REACT_APP_API_URL=http://localhost:8080/api

4. Run Application
Start Backend (Spring Boot)
cd backend
./mvnw spring-boot:run

Start Frontend (React)
cd frontend
npm start


Frontend → http://localhost:3000 

Backend → http://localhost:8080

## Deployment

Frontend

Deploy easily on Vercel
 or Netlify
.

Backend

Deploy on Render
 or Railway
.

Update frontend .env to point to your deployed backend URL.


## API Documentation
Base URL
http://localhost:8080/api

Endpoints
>Add a Book

URL: /books

Method: POST

Input Payload:

{
  "title": "Atomic Habits",
  "author": "James Clear",
  "isbn": "1122334455667",
  "publicationDate": "2018-10-16",
  "genre": "FICTION",
  "rating": 4
}


Example Response (201 Created):

{
  "id": "B-001",
  "title": "Atomic Habits",
  "author": "James Clear",
  "isbn": "1122334455667",
  "publicationDate": "2018-10-16",
  "genre": "FICTION",
  "rating": 4
}

>Get All Books

URL: /books

Method: GET

Example Response (200 OK):

[
  {
    "id": "B-001",
    "title": "Atomic Habits",
    "author": "James Clear",
    "isbn": "1122334455667",
    "publicationDate": "2018-10-16",
    "genre": "FICTION",
    "rating": 4
  }
]

>Get Book by ID

URL: /books/{id}

Method: GET

Example Response (200 OK):

{
  "id": "B-001",
  "title": "Atomic Habits",
  "author": "James Clear",
  "isbn": "1122334455667",
  "publicationDate": "2018-10-16",
  "genre": "FICTION",
  "rating": 4
}

Delete Book by ID

URL: /books/{id}

Method: DELETE

Response (204 No Content):

Book successfully deleted (no body returned)

>Get More Book Details (Google Books API)

URL: /books/{id}/more-details

Method: GET

Example Response (200 OK)

## Database Schema
+---------------------------+
|       Books               |
+---------------------------+
| _id : String              |
| title : String            |
| author : String           |
| isbn : String             |
| publicationDate: Date     |
| genre : String            |
| Rating: Number            |
+---------------------------+


## Folder Structure
book-management-system/
│
├── backend/                         # Spring Boot backend
│   ├── src/main/java/com/example/book_management_system
|   |   |__ configuration/           # Web Configurations
│   │   ├── controller/              # REST controllers
│   │   ├── exception/               # error handling
│   │   ├── model/                   # MongoDB entities
│   │   ├── repository/              # Spring Data repositories
│   │   ├── service/                 # Business logic
│   │   └── BookManagementSystemApplication.java   # Main entry point
│   ├── src/main/resources/
│   │   └── application.properties   # Configurations
│   └── pom.xml                      # Maven dependencies
│
├── frontend/                        # React frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   └── App.js                   # Root component
│   └── package.json
│
├── README.md
└── .gitignore


## Author

Developed by Rohith Mohan