import express from "express"
import multer from "multer";
import { login , register, logout, getOtherUser, updatePhoto} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

// configure multer storage for profile images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const router = express.Router();

// when registering we optionally accept a file field named `profilePhoto`
router.post("/register", upload.single("profilePhoto"), register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/", isAuthenticated ,getOtherUser)

// authenticated user can update their profile picture
// router.get("/current", isAuthenticated, getCurrentUser);
router.put("/photo", isAuthenticated, upload.single("profilePhoto"), updatePhoto);

export default router;