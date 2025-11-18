import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { Home,addStudent,getStudents,getStudentsById,updateStudent,deleteStudent } from "../controllers/studentController.js"

const router = express.Router();
router.get("/home",Home);
router.post("/add-student",authMiddleware,addStudent);
router.get("/list",getStudents);
router.get("/list/:id",authMiddleware,getStudentsById);
router.put("/update-student",authMiddleware,updateStudent);
router.delete("/delete/:id",deleteStudent);

export default router;