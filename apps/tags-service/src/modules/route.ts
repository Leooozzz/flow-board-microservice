import { Router } from "express";
import tagsRouter from "./tags/tags.router.js";

const router = Router();

router.use("/tags", tagsRouter);

export default router;
