import { UserModel } from "../models/login.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
// signup
dotenv.config();
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res
        .status(409)
        .json({ message: "user already exits go for login  ", success: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "SignUp Successfully ", success: true });
  } catch (err) {
    res.status(500).json({ message: "internal server error", success: false });
  }
};

//  for login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errMsg = "Auth failed: email or password is incorrect";

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: errMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err); // helpful for debugging
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
