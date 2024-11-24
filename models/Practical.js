import mongoose from "mongoose";

const practicalSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true, // Reference to the Subject schema
    },
    title: { type: String, required: true }, // Title of the practical
    description: { type: String, required: true }, // Description of the practical
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Reference to the User schema for the teacher who created it
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
    ],
  },
  { timestamps: true } 
);

const Practical = mongoose.model("Practical", practicalSchema);

export default Practical;
