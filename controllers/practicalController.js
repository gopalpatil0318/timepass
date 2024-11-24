import Practical from "../models/Practical.js";
import Subject from "../models/Subject.js";
import User from "../models/User.js";

export const createPractical = async (req, res) => {
  try {
    const { subjectId, title, description, createdBy } = req.body;

    // Find the teacher by email
    const teacher = await User.findOne({ email: createdBy });
    if (!teacher || teacher.role !== "teacher") {
      return res.status(400).json({
        success: false,
        message: "Invalid creator. Only a teacher can create practicals.",
      });
    }

    // Find the subject by code
    const subject = await Subject.findOne({ code: subjectId });
    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject not found. Please provide a valid subject code.",
      });
    }

    // Create the practical, using the teacher's ObjectId in `createdBy`
    const practical = new Practical({
      subjectId: subject._id,  // Store the subject's ObjectId
      title,
      description,
      createdBy: teacher._id,  // Store the teacher's ObjectId
    });

    const savedPractical = await practical.save();

    res.status(201).json({
      success: true,
      message: "Practical created successfully",
      data: savedPractical,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating practical",
      error: error.message,
    });
  }
};






export const getAllPracticals = async (req, res) => {
  try {
   
    const practicals = await Practical.find()
      .populate("subjectId", "name code")  // Populating subjectId with name and code
      .populate("createdBy", "name email") // Populating createdBy with teacher's name and email
      .populate("enrolledStudents", "name email"); // Populating enrolledStudents with student names and emails

    // Send the fetched practicals as the response
    res.status(200).json({
      success: true,
      message: "Practicals fetched successfully",
      data: practicals,
    });
  } catch (error) {
    // Handle any errors that occur while fetching the data
    res.status(500).json({
      success: false,
      message: "Error fetching practicals",
      error: error.message,
    });
  }
};

export const enrollInPractical = async (req, res) => {
  try {
    const { practicalId, studentEmail } = req.body; // Get practicalId and studentEmail from request body

    // Find the practical by ID
    const practical = await Practical.findById(practicalId);
    if (!practical) {
      return res.status(400).json({
        success: false,
        message: "Practical not found. Please provide a valid practical ID.",
      });
    }

    // Find the student by email
    const student = await User.findOne({ email: studentEmail });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student not found. Please provide a valid student email.",
      });
    }

    // Check if the user is a student
    if (student.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "Invalid user role. Only students can be enrolled in practicals.",
      });
    }

    // Check if the student is already enrolled
    if (practical.enrolledStudents.includes(student._id)) {
      return res.status(400).json({
        success: false,
        message: "Student is already enrolled in this practical.",
      });
    }

    // Enroll the student by adding their ID to the enrolledStudents array
    practical.enrolledStudents.push(student._id);

    // Save the updated practical document
    await practical.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Student enrolled in practical successfully",
      data: practical,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "Error enrolling student in practical",
      error: error.message,
    });
  }
};