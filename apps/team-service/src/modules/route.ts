import { Router } from "express";
import teamsRouter from "./teams/teams.routes.js";

const router = Router();

router.use("/teams", teamsRouter);

export default router;
