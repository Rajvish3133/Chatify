import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmpassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmpassword || !gender) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exit try different" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePhotoUrl;
    if (req.file) {
      profilePhotoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    } else {
      profilePhotoUrl = `https://api.dicebear.com/7.x/initials/png?seed=${fullName}`;
    }

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: profilePhotoUrl,
      gender,
    });

    const tokenData = {
      userId: newUser._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .json({
        success: true,
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          fullName: newUser.fullName,
          profilePhoto: newUser.profilePhoto,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
          profilePhoto: user.profilePhoto,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged Out Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUser = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const OtherUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password",
    );
    return res.status(200).json(OtherUser);
  } catch (error) {
    console.log(error);
  }
};

export const updatePhoto = async (req, res) => {
  try {
    console.log("updatePhoto called, req.id=", req.id, "file=", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.id,
      { profilePhoto: photoUrl },
      { new: true },
    ).select("-password");

    return res.status(200).json({ user, message: "Profile photo updated" });
  } catch (error) {
    console.error("error in updatePhoto", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
