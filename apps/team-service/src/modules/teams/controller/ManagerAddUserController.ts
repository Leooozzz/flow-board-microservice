import { RequestHandler } from "express";
import { ManagerAddUserService } from "../service/ManagerAddUserService.js";

export const ManagerAddUserController:RequestHandler = async (req,res,next) => {
  try{  
      const {userId,teamId} = req.params
      const accessToken =  req.accessToken!; 
      const team = await ManagerAddUserService(String(userId),String(teamId),accessToken,req.user!);
      return res.status(201).json(team)
  }catch(error){
    next(error)
  }
}