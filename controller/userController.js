import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";


// CREATE USER
export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await userData.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Registration Successful",
        text: `Hello ${name}, your account has been created successfully.`,
      });
    } catch (emailError) {
      console.log("Email error:", emailError);
    }

    res.status(201).json({
      message: "User registered successfully.",
      savedUser,
    });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};


// FETCH USERS
export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};


// UPDATE USER
export const update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};


// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};