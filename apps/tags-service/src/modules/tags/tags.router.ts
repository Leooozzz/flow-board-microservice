import { Router } from "express";
import { AuthMiddleware } from "./middlewares/AuthMiddleware.js";
import { CreateTagController } from "./controller/CreateTagController.js";
import { CreateTagByTeamIdController } from "./controller/CreateTagControllerByTeamId.js";
import { ListTagsControler } from "./controller/ListTagsControler.js";

const tagsRouter = Router();

tagsRouter.use(AuthMiddleware);

tagsRouter.post("/create-tag", CreateTagController);
tagsRouter.post("/create-tag/:teamId", CreateTagByTeamIdController);

tagsRouter.get("/list-tags",ListTagsControler);
//tagsRouter.get("/list-tags-by-team/:teamId",ListTagsByTeamIdController)
//tagsRouter.get("/list-tags/:id");
//tagsRouter.put("/edit-tag/:id");
//tagsRouter.delete("/remove-tags/:id");


export default tagsRouter;
