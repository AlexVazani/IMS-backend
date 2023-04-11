import bcrypt from "bcrypt";
import User from "../models/User.js";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find().select("-userPassword -refreshToken");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};

export const showUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, {
      userPassword: 0, // Exclude userPassword
      refreshToken: 0, // Exclude refreshToken
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};

export const registerUser = async (req, res) => {
  const {
    userId,
    userPassword,
    userName,
    userPosition,
    userPhone,
    userEmail,
    userAddress,
    userRole,
    userPhoto,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const newUser = new User({
      userId,
      userPassword: hashedPassword,
      userName,
      userPosition,
      userPhone,
      userEmail,
      userAddress,
      userRole,
      userPhoto,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Find the current user
    const currentUser = await User.findById(id);

    // If there's a new user photo, delete the old one
    if (data.userPhoto && data.userPhoto !== currentUser.userPhoto) {
      const oldPhotoPath = `./${currentUser.userPhoto}`;
      fs.unlink(oldPhotoPath, (err) => {
        if (err) {
          console.error(`Failed to delete old photo: ${err}`);
        } else {
          console.log("Old photo deleted successfully");
        }
      });
    }

    const newUser = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({ message: "User updated successfully!!!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};

export const uploadUserPhoto = (req, res) => {
  try {
    res
      .status(200)
      .send({ filePath: req.file.path, message: "File uploaded successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
