import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import apiRoutes from "./routes/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/", apiRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server started on Cloudtype:${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

const saveUserDocument = async () => {
  const userDocument = {
    userId: "vazani",
    userPassword:
      "$2b$10$LKGaOphWlvDaVl/xZB4leOLqs2x796GgQlYaEvSUGmSqxvShLAe8W",
    userName: "하성백",
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
