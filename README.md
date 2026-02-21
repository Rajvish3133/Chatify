# Chatify - Real-Time Chat Application

Chatify is a full-stack real-time chat application that I designed and developed using the MERN ecosystem. The application enables instant messaging, user authentication, real-time online status, and image sharing with a modern and responsive UI.

This project demonstrates my skills in full-stack development, real-time communication, authentication, cloud integration, and state management.

## Features

- **Real-Time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure login and signup with JWT tokens
- **User Profiles**: Profile management with avatar support via Cloudinary
- **Conversations**: Start and manage multiple conversations
- **Online Status**: See who's online in real-time
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS and DaisyUI
- **State Management**: Redux Toolkit for efficient state management
- **File Uploads**: Image upload support via Cloudinary

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Real-Time**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer + Cloudinary
- **Environment**: dotenv

### Frontend
- **UI Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Redux Toolkit with Redux Persist
- **HTTP Client**: Axios
- **Real-Time**: Socket.io-client
- **Routing**: React Router
- **Notifications**: React Hot Toast
- **Icons**: React Icons

## Project Structure

```
chatify/
├── backend/
│   ├── config/          # Configuration files (DB, Cloudinary)
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── socket/          # Socket.io handlers
│   ├── uploads/         # File uploads directory
│   ├── app.js          # Express app setup
│   ├── server.js       # Server entry point
│   └── package.json    # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── hooks/       # Custom React hooks
    │   ├── redux/       # Redux slices and store
    │   ├── assets/      # Static assets
    │   ├── App.jsx      # Main app component
    │   └── main.jsx     # React entry point
    ├── public/          # Public assets
    ├── vite.config.js   # Vite configuration
    └── package.json     # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

4. Start the server:
```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### User Routes
- `POST /api/users/signup` - Register a new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Message Routes
- `GET /api/messages/:conversationId` - Get messages in conversation
- `POST /api/messages` - Send a message
- `GET /api/conversations` - Get all conversations
- `POST /api/conversations` - Start a new conversation

## Socket.io Events

### Client to Server
- `send-message` - Send a message
- `disconnect` - User goes offline

### Server to Client
- `new-message` - Receive a message
- `user-online` - User comes online
- `user-offline` - User goes offline

## Available Scripts

### Backend
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## Features Explanation

### Authentication
- Users can sign up with email and password
- Passwords are hashed using bcryptjs
- JWT tokens are issued upon login and stored in cookies
- Protected routes require valid authentication

### Real-Time Messaging
- Socket.io enables instant message delivery
- Multiple users can chat in real-time
- Online/offline status is updated in real-time

### Cloudinary Integration
- User avatars are uploaded to Cloudinary
- Images are optimized and served through CDN
- Automatic image transformation and optimization

### State Management
- Redux Toolkit manages global state
- Redux Persist stores user and conversation data
- Efficient updates without unnecessary re-renders

## Environment Variables

### Backend `.env`
| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT signing |
| CLOUDINARY_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |
| CLIENT_URL | Frontend URL for CORS |

### Frontend `.env.local`
| Variable | Description |
| VITE_API_URL | Backend API URL |

## Development

### Running Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)
- Set environment variables in your hosting platform
- Deploy from GitHub or use git push
- Ensure MongoDB is accessible from your deployment platform

### Frontend Deployment (e.g., Vercel, Netlify)
- Build the project: `npm run build`
- Deploy the `dist` folder
- Set the production API URL in environment variables

## Troubleshooting

### Socket.io Connection Issues
- Ensure backend CORS is configured correctly
- Check that `CLIENT_URL` matches your frontend URL
- Verify socket.io version compatibility

### Database Connection Errors
- Check MongoDB connection string
- Ensure database is running (if local)
- Verify IP whitelist (if MongoDB Atlas)

### Image Upload Errors
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper file format

## Contributors

- **Author**: raj

## License

ISC

## Future Enhancements

- Group conversations
- Message search functionality
- Message reactions/emojis
- File sharing (documents, videos)
- Voice/video calling
- User presence indicators
- Message read receipts
- Typing indicators
- User blocking functionality

---

For any issues or questions, please create an issue in the repository.
