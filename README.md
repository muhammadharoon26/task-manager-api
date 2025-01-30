# Task Manager API

A robust REST API for managing tasks with real-time updates using Socket.IO, built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Register, Login, Delete Account)
- JWT-based Authorization
- CRUD operations for Tasks
- Real-time updates using Socket.IO
- Comprehensive test suite
- MongoDB integration
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Project Structure

```
task-manager-api/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── authController.js     # User authentication logic
│   └── taskController.js     # Task management logic
├── middlewares/
│   └── authMiddleware.js     # JWT authentication middleware
├── models/
│   ├── task.js              # Task database model
│   └── user.js              # User database model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── task.js              # Task management routes
├── tests/
│   ├── auth.test.js         # Authentication tests
│   └── task.test.js         # Task management tests
├── .env                      # Environment variables
├── package.json             # Project dependencies
└── server.js                # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd task-manager-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=your_frontend_url (optional)
PORT=5000 (optional)
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Run tests:
```bash
npm test
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `DELETE /api/auth/delete` - Delete user account (requires authentication)

### Tasks
All task endpoints require authentication (JWT token in Authorization header)

- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
  - Body: `{ title, completed? }`
- `PUT /api/tasks/:id` - Update a task
  - Body: `{ title?, completed? }`
- `DELETE /api/tasks/:id` - Delete a task

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Real-time Updates

The application uses Socket.IO for real-time updates. Connect to the WebSocket server at the same host and port as the REST API.

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 500: Server error

## Testing

The project includes comprehensive tests for both authentication and task management. Run tests using:
```bash
npm test
```

## Security Measures

- Password hashing using bcrypt
- JWT-based authentication
- CORS protection
- Environment variables for sensitive data
- Input validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.