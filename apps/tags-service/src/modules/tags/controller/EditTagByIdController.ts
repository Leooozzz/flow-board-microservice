import { RequestHandler } from "express";
import { EditTagByIdService } from "../service/EditTagByIdService.js";
import { EditTagByIdSchema } from "../schema/EditTagByIdSchema.js";

export const EditTagByIdController:RequestHandler = async (req,res,next) => { 
  try{
      const { id } = req.params;
      const accessToken = req.accessToken
      const data = EditTagByIdSchema.parse(req.body)
      const tag = await EditTagByIdService(String(id),data,accessToken!,req.user!)
      return res.status(201).json(tag)
    }catch(error){
    next(error)
  }
} 