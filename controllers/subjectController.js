import Subject from "../models/Subject.js";
import User from "../models/User.js";


export const createSubject = async (req, res) => {
  try {
    const { name, code, createdBy } = req.body;

    // Check for missing required fields
    if (!name || !code || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "Name, code, and createdBy (admin email) are required."
      });
    }

    
    const admin = await User.findOne({ email: createdBy });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can create subjects."
      });
    }

    // Create a new subject document
    const subject = new Subject({
      name,
      code,
      createdBy: admin._id, // Store admin's ObjectId in createdBy
    });

    // Try saving the new subject and handle duplicate code error
    try {
      const savedSubject = await subject.save();
      res.status(201).json({
        success: true,
        message: "Subject created successfully",
        data: savedSubject,
      });
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error
        return res.status(400).json({
          success: false,
          message: "Subject code already exists. Please use a unique code.",
        });
      }
      throw error; // Propagate other errors
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating subject",
      error: error.message,
    });
  }
};



export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("createdBy", "name email")  // Populating the createdBy field with admin's name and email

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subjects",
      error: error.message,
    });
  }
};


