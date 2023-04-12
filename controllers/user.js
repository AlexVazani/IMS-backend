import bcrypt from "bcrypt";
import User from "../models/User.js";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const saveUserDocument = async () => {
      const userDocument = {
        userId: "vazani",
        userPassword:
          "$2b$10$LKGaOphWlvDaVl/xZB4leOLqs2x796GgQlYaEvSUGmSqxvShLAe8W",
        userName: "청심환",
        userPosition: "CTO",
        userPhone: "780-719-8824",
        userAddress: "11116 36 ave NW Edmonton Alberta Canada",
        userRole: "Manager",
        createdAt: new Date("2023-04-07T17:30:07.386Z"),
        updatedAt: new Date("2023-04-11T19:47:19.186Z"),
        userEmail: "vazani@naver.com",
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMwNTMxZjQ5MDc1NmNmNDZiNTgzMTUiLCJpYXQiOjE2ODEyNDI0MzksImV4cCI6MTY4MTMyODgzOX0.Nm1zjaWwUJ_1UlZil_IB1mM11ipJs1baes4NsjiV1ds",
        userPhoto: "uploads\\1681110040210-Space Cowboy.png",
      };

      try {
        const newUser = new User(userDocument);
        await newUser.save();
        console.log("User document saved successfully");
      } catch (error) {
        console.error("Error saving user document:", error);
      }
    };

    saveUserDocument();

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
