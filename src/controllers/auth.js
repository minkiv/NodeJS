import User from "../models/user.js";
import { signupSchema, signinShema } from "../schema/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User is already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ _id: user.id }, "banThayDat", { expiresIn: "1h" });
    user.password = undefined;
    return res.status(201).json({
      message: "User created successfully!",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinShema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }
    const token = jwt.sign({ _id: user._id }, "banThayDat", {
      expiresIn: "1h",
    });
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
