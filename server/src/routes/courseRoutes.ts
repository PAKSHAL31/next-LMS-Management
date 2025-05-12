import express from "express";
import multer from "multer";
import { listCourses, getCourse } from "../controllers/courseController";

const router = express.Router();

// Routes
router.get("/", listCourses);
router.get("/:courseId", getCourse);


export default router;
