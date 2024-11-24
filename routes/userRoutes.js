import express from "express";
import { createUser, getAllUsers, getAllAdmins, getAllTeachers, getAllStudents} from "../controllers/userController.js";


const router = express.Router();

router.post("/users/create", createUser); 
router.get("/users/get", getAllUsers); 
router.get("/admins/get", getAllAdmins); 
router.get("/teachers/get", getAllTeachers); 
router.get("/students/get", getAllStudents); 


export default router;
