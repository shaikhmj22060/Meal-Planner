import UserModel from "../Models/User.Model.js";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";
import generateToken from "../Utils/generateToken.js";
/**
 * @desc register a new user
 * @route api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!email || !username || !name || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email Address" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
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
