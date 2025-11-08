import UserModel from "../../Models/User.Model.js";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

export const create_admin = async (req, res) => {
  if (req.body.secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const { password, email, name, username } = req.body;
    const emailExists = await UserModel.findOne({ email });
    const usernameExists = await UserModel.findOne({ username });
    if (!email || !username || !name || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    
    if(emailExists && usernameExists){
        return res.status(400).json({msg:"Already registerd"})
    }

    if (!isEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email Address" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    if (usernameExists) {
      return res.status(400).json({ msg: "Username Already Taken" });
    }

    if (emailExists) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });
    return res.status(200).json({
      msg: "Registration sucessfull",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "someting went wrong" });
  }
};
