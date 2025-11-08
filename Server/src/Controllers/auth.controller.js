import UserModel from "../Models/User.Model.js";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../Utils/generateToken.js";
/**
 * @desc register a new user
 * @route api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!email || !username || !name || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email Address" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    const usernameExists = await UserModel.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ msg: "Username Already Taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = generateToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      msg: "Registration Successful",
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ msg: `${field} already exists` });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ msg: messages });
    }

    return res.status(500).json({ msg: error.message });
  }
};

export const Login = async (req, res, next) => {
  try {
    const Loggedin = req.cookies.token;

    if (Loggedin) {
      const decode = jwt.verify(Loggedin, process.env.JWT_SECRET);

      if (decode && decode.id) {
        return res.status(200).json({
          msg: "Alreday logged in",
          alreadyLoggedIn: true,
        });
      }
    }
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    let user;
    if (isEmail(emailOrUsername)) {
      user = await UserModel.findOne({ email: emailOrUsername });
    } else {
      user = await UserModel.findOne({ username: emailOrUsername });
    }
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid email / username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid email / username or password" });
    }
    const token = generateToken({ id: user._id });
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      msg: "Login Sucess",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal Server error" });
  }
};

export const Logout = async (req, res) => {
  try {
    const Loggedin = req.cookies.token;
    if (Loggedin) {
      const decoded = await jwt.verify(Loggedin, process.env.JWT_SECRET);
      const id = UserModel.findById(decoded.id);
      if (!id) {
        return res.status(404).json({ msg: "User not found" });
      }
      if (decoded && id) {
        res.clearCookie("token");
        return res.status(200).json({
          msg: "Logout Successfull",
        });
      }
    } else {
      return res.status(400).json({ msg: "Login first" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};
