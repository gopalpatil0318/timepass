import express from "express";
import { createPractical, getAllPracticals, enrollInPractical } from "../controllers/practicalController.js";


const router = express.Router();

router.post("/practicals/create", createPractical); 
router.get("/practicals/get", getAllPracticals); 
router.post("/practicals/enroll",enrollInPractical); 

export default router;
