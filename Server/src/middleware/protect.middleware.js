import jwt from "jsonwebtoken";
import UserModel from "../Models/User.Model.js";

export const protect = async (req, res, next) => {
  try {
    const Loggedin = req.cookies.token;
    if (!Loggedin) {
      return res.status(401).json({ msg: "Unauthorized Please Login" });
    }
    const decode = jwt.verify(Loggedin, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ _id: decode.id });
    req.user = user
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: `Somthing went wrong ${error.message}` });
  }
};
