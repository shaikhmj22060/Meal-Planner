import jwt from "jsonwebtoken";
import UserModel from "../Models/User.Model.js";

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized Please login " }); // ✅ Added return
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Removed await (jwt.verify is sync)
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: "Invalid token" }); // ✅ Handle invalid token
    }
    
    const user = await UserModel.findOne({ _id: decoded.id });
    
    if (!user) {
      return res.status(401).json({ msg: "User not found" }); // ✅ Handle user not found
    }
    
    return res.status(200).json({
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
    
  } catch (error) {
    console.error("getMe error:", error.message);
    return res.status(401).json({ msg: "Invalid or expired token" }); // ✅ Changed to 401
  }
};
