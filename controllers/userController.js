import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully", data: savedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user", error: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required in the request body" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: "User is not an admin", 
        adminEmail: "adminEmail@example.com" 
      });
    }

    const users = await User.find();

    res.status(200).json({ success: true, message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
  }
};



export const getAllAdmins = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required in the request body" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: "User is not an admin", 
        adminEmail: "adminEmail@example.com" 
      });
    }

    const admins = await User.find({ role: "admin" });

    res.status(200).json({ success: true, message: "Admins fetched successfully", data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching admins", error: error.message });
  }
};




export const getAllTeachers = async (req, res) => {
  try {
      

    
      const teachers = await User.find({ role: "teacher" });

      res.status(200).json({
          success: true,
          message: "Teachers fetched successfully",
          data: teachers,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error fetching teachers",
          error: error.message,
      });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required in the request body" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!['admin', 'teacher'].includes(user.role)) {
      return res.status(403).json({ success: false, message: "Access denied. Only admins or teachers can access this data." });
    }

    const students = await User.find({ role: "student" });

    res.status(200).json({ success: true, message: "Students fetched successfully", data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching students", error: error.message });
  }
};








