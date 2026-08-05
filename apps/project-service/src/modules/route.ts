import { Router } from "express";
import projectRouter from "./project/project.route.js";

const router = Router();

router.use("/project", projectRouter);

export default router;
