import { FetchTeamOwnerId } from "../../teams/FetchTeamOwnerId.js";
import { EditTagDTO } from "../dto/EditTagDTO.js";
import { AppError } from "../errors/AppError.js";
import { AuthUser } from "../middlewares/AuthMiddleware.js";
import { EditTagById, EditTagByIdTeam, ListTagByIdTeam } from "../repository/TagsRepository.js";

export const EditTagByIdService = async (
  id: string,
  data: EditTagDTO,
  acessToken: string,
  user: AuthUser,
) => {
  if(user.role !== "ADMIN"){
    const userTeam = await FetchTeamOwnerId(acessToken);
    const tag = await ListTagByIdTeam(id,userTeam.teamId);
    if(!tag){
      throw new AppError(404,"Tag not found")
    }
    const tagEdited = await EditTagByIdTeam(id,data,userTeam.teamId);
    if(!tagEdited){
      throw new AppError(404,"Tag not found")
    }
    return tagEdited;
  }
  const tag = await EditTagById(id, data);
  if(!tag){
    throw new AppError(404,"Tag not found")
  }
};
