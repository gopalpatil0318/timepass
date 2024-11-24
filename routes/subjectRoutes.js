import express from "express";
import { createSubject, getAllSubjects } from "../controllers/subjectController.js";


const router = express.Router();

router.post("/subject/create", createSubject); // Only admin can create subjects
router.get("/subjects/get", getAllSubjects); // All users can view subjects





export default router;
