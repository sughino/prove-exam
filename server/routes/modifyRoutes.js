import { Router } from "express";
import { modifyStudents } from "../controllers/modifyController.js";
const router = Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.put("/students", modifyStudents);

export default router;