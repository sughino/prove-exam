import { Router } from "express";
import { deleteStudents } from "../controllers/deleteController.js";
const router = Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.delete("/students", deleteStudents);

export default router;