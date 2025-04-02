import { Router } from "express";
import { insertStudents } from "../controllers/insertController.js";
const router = Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post("/students", insertStudents);

export default router;