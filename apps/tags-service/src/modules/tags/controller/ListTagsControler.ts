import { RequestHandler } from "express";
import { ListTagsService } from "../service/ListTagsService.js";

export const ListTagsControler: RequestHandler = async (req,res,next) => {
  try{
    const tags = await ListTagsService(req.user!)
    return res.status(200).json(tags)
  }catch(error){
    next(error)
  }
} 