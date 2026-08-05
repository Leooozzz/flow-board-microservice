import { Router } from "express";
import { AuthMiddleware } from "../../shared/middleware/AuthMiddleware.js";
import { ListTeamMembersController } from "./controller/ListTeamMembersController.js";
import { EditTeamByIdController } from "./controller/EditTeamByIdController.js";
import { DeleteTeamByIdController } from "./controller/DeleteTeamByIdController.js";
import { ManagerAddUserController } from "./controller/ManagerAddUserController.js";
import { ManagerRemoveUserController } from "./controller/ManagerRemoveUserController.js";
import { ManagerByIdController } from "./controller/ManagerUserByIdController.js";

const teamsRouter = Router();

teamsRouter.use(AuthMiddleware);

teamsRouter.get("/members", ListTeamMembersController);
teamsRouter.get("/manager-user-by-id/:userId", ManagerByIdController);
teamsRouter.get("/list-teams", ListTeamsController);
teamsRouter.get("/list-team-by-teamId/:teamId", ListTeamByTeamIdController);
teamsRouter.put("/edit-team/:teamId", EditTeamByIdController);
teamsRouter.delete("/delete-team/:teamId", DeleteTeamByIdController);
teamsRouter.post("/manager-add-user/:userId/:teamId", ManagerAddUserController);
teamsRouter.delete(
  "/manager-remove-user-access/:userId/:teamId",
  ManagerRemoveUserController,
);

export default teamsRouter;
