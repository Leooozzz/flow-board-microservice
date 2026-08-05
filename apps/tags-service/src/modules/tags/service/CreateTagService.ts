import { FetchTeamOwnerId } from "../../teams/FetchTeamOwnerId.js";
import { CreateTagDTO } from "../dto/CreateTagDTO.js";
import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";
import { createTag } from "../repository/TagsRepository.js";

export const CreateTagService = async (user:AuthUser,data:CreateTagDTO,accessToken:string) => {
  const existingUser = await FetchTeamOwnerId(user.id,accessToken)
  if(existingUser.role !== "OWNER" ){
    throw new AppError(403,"Forbidden")
  }
  const tag = await createTag(existingUser.teamId,data)
  if(!tag){
    throw new AppError(404,"Error to create tag")
  }
  return tag
}