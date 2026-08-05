import { Router } from "express";
import { CreateTagController } from "./controller/CreateTagController.js";
import { CreateTagByTeamIdController } from "./controller/CreateTagControllerByTeamId.js";

const tagsRouter = Router();

tagsRouter.post("/create-tag", CreateTagController);
tagsRouter.post("/create-tag/:teamId", CreateTagByTeamIdController);

//tagsRouter.get("/list-tags");
//tagsRouter.get("/list-tags/:id");
//tagsRouter.put("/edit-tag/:id");
//tagsRouter.delete("/remove-tags/:id");


export default tagsRouter;
