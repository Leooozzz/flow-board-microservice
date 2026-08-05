import { Router } from "express";
import { AuthMiddleware } from "../../shared/middleware/AuthMiddleware.js";
import { GetMeController } from "./controller/GetMeController.js";
import { LogoutController } from "./controller/LogoutController.js";
import { SingInController } from "./controller/SingInController.js";
import { SingUpController } from "./controller/SingUpController.js";
import { CreateUserController } from "./controller/CreateUserController.js";
import { ListUsersController } from "./controller/LIstUsersController.js";
import { ListUserByIdController } from "./controller/ListUserByIdController.js";
import { UpdateUserController } from "./controller/UpdateUserController.js";
import { DeleteUserController } from "./controller/DeleteUserController.js";

const usersRouter = Router();

usersRouter.post("/singIn", SingInController);
usersRouter.post("/singUp", SingUpController);

usersRouter.use(AuthMiddleware);

usersRouter.get("/me", GetMeController);
usersRouter.post("/logout", LogoutController);

usersRouter.post("/create-user", CreateUserController);
usersRouter.get("/list-users",ListUsersController);
usersRouter.get("/list-user-by-id/:userId",ListUserByIdController)
usersRouter.patch("/update-user/:userId", UpdateUserController);
usersRouter.delete("/delete-user/:userId", DeleteUserController);

export default usersRouter;
