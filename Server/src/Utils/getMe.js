import jwt from "jsonwebtoken";
import UserModel from "../Models/User.Model.js";

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(400).json({ msg: "Unauthorized Please login " });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && decoded.id) {
      const user = await UserModel.findOne({ _id: decoded.id });
      if (user) {
        return res.status(200).json({
          user: {
            name: user.name,
            username: user.username,
            email: user.email,
          },
        });
      }
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
