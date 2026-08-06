import { RequestHandler } from "express";
import { ListTeamsService } from "../service/ListTeamsService.js";

export const ListTeamsController:RequestHandler = async (req,res, next) => {
  try{
    const teams = await ListTeamsService(req.user!)
    return res.status(200).json(teams)
  }catch(error){
    next(error)
  }
}