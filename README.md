Chatify – Real-Time Chat Application

Chatify is a full-stack real-time chat application that I designed and developed using the MERN ecosystem. The application enables instant messaging, user authentication, real-time online status, and image sharing with a modern and responsive UI.

This project demonstrates my skills in full-stack development, real-time communication, authentication, cloud integration, and state management.

🚀 Project Overview

Built a scalable real-time chat system using Socket.io

Implemented secure JWT-based authentication

Integrated Cloudinary for image uploads and optimization

Designed a responsive UI using React, Tailwind CSS, and DaisyUI

Managed global state using Redux Toolkit

Developed REST APIs using Node.js and Express

Used MongoDB for data storage

✨ Key Features

Real-time one-to-one messaging

User signup, login, and logout

Profile management with avatar upload

Online/offline user status

Conversation management

Image sharing via Cloudinary

Responsive mobile-friendly interface

Persistent login using cookies and Redux Persist

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS + DaisyUI

Redux Toolkit + Redux Persist

Axios

Socket.io-client

React Router

React Hot Toast

Backend

Node.js

Express.js

MongoDB + Mongoose

Socket.io

JWT Authentication

bcryptjs

Multer + Cloudinary

dotenv

📂 Project Structure
chatify/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── uploads/
│   ├── app.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── redux/
    │   ├── assets/
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    └── vite.config.js
🔐 Authentication & Security

Passwords hashed using bcrypt

JWT tokens stored securely in cookies

Protected routes with authentication middleware

CORS configured for secure frontend-backend communication

⚡ Real-Time Functionality

Implemented Socket.io for:

Instant message delivery

Real-time online/offline status

Live updates without page refresh

Socket Events

send-message

new-message

user-online

user-offline

☁️ Cloudinary Integration

Avatar and image upload support

CDN-based fast delivery

Automatic optimization and transformation

🧠 State Management

Redux Toolkit for global state

Redux Persist for session persistence

Optimized rendering and API handling

⚙️ Environment Variables
Backend
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=your_frontend_url
Frontend
VITE_API_URL=your_backend_url
🖥️ Local Setup
Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev
🌐 Deployment

Backend deployed on Render

Frontend deployed on Vercel / Netlify

MongoDB Atlas for cloud database

Environment variables configured for production

📌 What I Learned

Building real-time applications with Socket.io

Implementing secure authentication

Managing complex state with Redux

Integrating third-party cloud services

Handling production deployment and environment configuration

👨‍💻 Author

Rajvish
MERN Stack Developer

React | Node.js | MongoDB | Express

JavaScript | REST APIs | Socket.io

Cloudinary | Redux | Tailwind CSS

🚧 Future Improvements

Group chats

Typing indicators

Message read receipts

Emoji reactions

File sharing (documents/videos)

Voice & video calling

User blocking system
