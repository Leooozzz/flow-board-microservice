import { Router } from "express";
import columnsRouter from "./columns/columns.router.js";

const router = Router();

router.use("/columns", columnsRouter);

export default router;