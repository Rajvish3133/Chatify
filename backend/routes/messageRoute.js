import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { sendMessage, getmessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send/:id",isAuthenticated, sendMessage)
router.get("/:id",isAuthenticated, getmessage)

export default router