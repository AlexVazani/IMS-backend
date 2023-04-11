import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: "Access Denied" });
  }

  try {
    const { userId } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findOne({ userId });

    if (!user || user.refreshToken !== refreshToken) {
      // Delete refreshToken of hacked user
      user.refreshToken = [];
      await user.save();
      return res.status(403).json({ error: "Hacked user!!!" });
    }

    const newAccessToken = jwt.sign(
      { userId: user.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: "Access Denied" });
  }
};
