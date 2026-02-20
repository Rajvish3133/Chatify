import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { connection } from './config/db.js';
import cookieParser from "cookie-parser";
import fs from 'fs';
import path from 'path';
import userRoute from "./routes/userRoute.js"
import messageRoute from "./routes/messageRoute.js"

const app = express();

config({path : "./.env"});

app.use(express.urlencoded({extended:true}))                           
app.use(express.json());
app.use(cookieParser());

app.use(cors({
     origin: ["http://localhost:5173", "http://localhost:5174"],
     methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);

// ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// make uploads folder public so clients can retrieve profile images
app.use('/uploads', express.static('uploads'));

connection();

app.use("/api/v1/user", userRoute)
app.use("/api/v1/message", messageRoute )


export default app;
