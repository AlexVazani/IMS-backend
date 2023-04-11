import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    userName: { type: String },
    userPosition: { type: String },
    userPhone: { type: String },
    userEmail: { type: String },
    userAddress: { type: String },
    userPhoto: { type: String, default: "" },
    userRole: { type: String, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
