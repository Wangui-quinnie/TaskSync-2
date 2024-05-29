TaskSync is a simple task management application built with Node.js, Express.js, MongoDB, and Socket.IO. This application allows users to create, read, update, and delete tasks with real-time updates.

## Project Description

TaskSync is a task management application designed to help users manage their tasks efficiently. It features user authentication, CRUD operations for tasks, and real-time updates using Socket.IO.

## Project Architecture

The project is structured as follows:

- **config/**: Configuration files for the application.
- **models/**: Mongoose models for MongoDB.
- **public/**: Frontend files (HTML, CSS, JavaScript).
- **routes/**: Express route handlers.
- **app.js**: Main entry point for the application.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing tasks.
- **Mongoose**: ODM for MongoDB.
- **Socket.IO**: Library for real-time web applications.
- **JSON Web Tokens (JWT)**: For user authentication.
- **HTML/CSS/JavaScript**: For the frontend.

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/TaskSync.git
   cd TaskSync
Install dependencies:

npm install
Set up environment variables:

Create a default.json file in the config directory with the following content:

{
  "mongoURI": "your-mongodb-uri",
  "jwtSecret": "your-jwt-secret",
  "port": 5000
}
Run the application:

npm start
Open your browser and navigate to:
http://localhost:5000
Usage Instructions
Interacting with the API
Use tools like Postman to interact with the API. Here are the available endpoints:

Register a new user:

URL: POST /api/auth/register
Body:
{
  "name": "Your Name",
  "email": "your-email@example.com",
  "password": "your-password"
}
Login:

URL: POST /api/auth/login
Body:
{
  "email": "your-email@example.com",
  "password": "your-password"
}
Get all tasks:

URL: GET /api/tasks
Headers: Authorization: Bearer your-jwt-token
Create a new task:

URL: POST /api/tasks
Headers: Authorization: Bearer your-jwt-token
Body:
{
  "title": "New Task",
  "description": "Task description"
}
Update a task:

URL: PUT /api/tasks/:id
Headers: Authorization: Bearer your-jwt-token
Body:
{
  "title": "Updated Task",
  "description": "Updated description"
}
Delete a task:

URL: DELETE /api/tasks/:id
Headers: Authorization: Bearer your-jwt-token
Frontend Usage
Open your browser and navigate to:

http://localhost:5000
Add Tasks: Use the form to add new tasks.

View Tasks: Tasks will be displayed below the form.

API Endpoints
Here's a summary of the available API endpoints:

POST /api/auth/register: Register a new user.
POST /api/auth/login: Login and obtain a JWT.
GET /api/tasks: Get all tasks (requires JWT).
POST /api/tasks: Create a new task (requires JWT).
PUT /api/tasks/
: Update an existing task (requires JWT).
DELETE /api/tasks/
: Delete a task (requires JWT).

Contributions to this project are welcome!
