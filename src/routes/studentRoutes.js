import { Router } from "express";
import { Home,addStudent,getAllStudents,getStudentById,updateStudent,deleteStudent } from "../controllers/studentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();
router.get("/",Home);
router.post("/add-student",authMiddleware,addStudent);
router.get("/students",authMiddleware,getAllStudents);
router.get("/student/:id",authMiddleware,getStudentById);
router.put("/update-student/:id",authMiddleware,updateStudent);
router.delete("/delete-student/:id",authMiddleware,deleteStudent);
export default router;

