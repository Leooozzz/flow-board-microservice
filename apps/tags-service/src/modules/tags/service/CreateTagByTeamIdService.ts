import { FetchTeamExisting } from "../../teams/FetchTeamExisting.js";
import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";

export const CreateTagByTeamIdService =  async (teamId:string,user:AuthUser,accessToken:string) => {
  if(user.role !== "ADMIN"){
    throw new AppError(403,"Forbidden")
  }

  const existingTeam =  await FetchTeamExisting(teamId,accessToken)
}