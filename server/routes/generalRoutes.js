import { Router } from "express";
import { getStudents, getCourses, getExams } from "../controllers/generalController.js";
const router = Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get("/students", getStudents);
router.get("/courses", getCourses);
router.get("/exams", getExams);

export default router;