# Real-Time Chat Application

## Project Description

A real-time chat application built using Node.js, Express.js, MySQL, and Socket.IO. The application provides secure user authentication, friend management, real-time messaging, image sharing, and typing indicators.

---

## Features

- User Signup and Login
- JWT Authentication
- Password Hashing using bcrypt
- User Search
- Friend Request System
- Friends List
- Real-time Chat using Socket.IO
- Chat History
- Image Upload
- Typing Indicator
- Online/Offline Status
- Rate Limiting
- Input Validation
- MySQL Database

---

## Tech Stack

### Backend

- Node.js
- Express.js
- Socket.IO
- MySQL
- JWT
- bcrypt
- Multer
- Express Validator

### Frontend

- HTML
- CSS
- JavaScript

---

## Folder Structure

```
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   └── chat.html
├── routes/
├── sockets/
├── uploads/
├── server.js
└── package.json
```

---

## Installation

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=chat_app
JWT_SECRET=your_secret
```

### Import Database

Import:

```
chat_app.sql
```

using phpMyAdmin.

### Run the Project

```bash
npm run dev
```

Open:

```
http://localhost:5000
```

---

## Main Features Demonstrated

- Secure Authentication
- Friend Request System
- Real-time Messaging
- Image Sharing
- Chat History
- Typing Indicator
- Online Status
- Input Validation
- Rate Limiting

---

## API Documentation

### Authentication

POST /api/auth/signup

- Register a new user

POST /api/auth/login

- Login user and receive JWT token

### Users

GET /api/users/search/:username

- Search users by username

### Friends

POST /api/friends/request

- Send friend request

POST /api/friends/accept

- Accept friend request

GET /api/friends

- Get all friends

### Chat

POST /api/chat/send

- Send a message

GET /api/chat/history/:id

- Get chat history

POST /api/chat/upload

- Upload image in chat

---

## Deep Dive

### Database Design

The application uses MySQL as the database.

The database contains four main tables:

- users
- friends
- friend_requests
- messages

Each message stores sender ID, receiver ID, message text, image path, status, and timestamp.

JWT authentication protects all private APIs.

Socket.IO enables real-time communication between users.

Messages are stored permanently inside MySQL so they remain available after page refresh.

Rate limiting protects the backend against API abuse.

Input validation is applied before database operations.

Multer is used for image uploads.

The backend follows a modular MVC architecture with separate controllers, routes, middleware, sockets, and configuration files.

## Author

Jitesh Varshney
VIT Vellore
