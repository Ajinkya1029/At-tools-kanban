import { asyncHandler } from "../utils/asynchandler.js";
import { Sprint } from "../models/sprint.model.js";
import {Ticket} from '../models/ticket.model.js';
import mongoose from "mongoose";

const createTicket=asyncHandler(async(req,res,next)=>{
    const {Title,Type,Priority,Image,CreatedBy,AssignedTo,SprintId}=req.body;
    if([Title,Type,Priority,CreatedBy,AssignedTo,SprintId].some((field)=>field?.trim()===""))return res.status(400).json({success:false,message:"Send all the required fields"});
    if(!mongoose.Types.ObjectId.isValid(CreatedBy)||!mongoose.Types.ObjectId.isValid(AssignedTo)||!mongoose.Types.ObjectId.isValid(SprintId)){
            return res.status(400).json({success:false,message:"Please enter a valid uuid"});
        }
    let savedTicket=await Ticket.create({
        Title:Title,
        Type:Type,
        Priority:Priority,
        Image:Image?Image:null,
        CreatedBy:new mongoose.Types.ObjectId(CreatedBy),
        AssignedTo: new mongoose.Types.ObjectId(AssignedTo),
        SprintId:new mongoose.Types.ObjectId(SprintId)
        
    })
    return res.status(200).json({success:true,message:"Ticket saved"});
})

const deleteTicket=asyncHandler(async(req,res,next)=>{
    const {id}=req.query;
    if(id==="")return res.status(400).json({success:false,message:"Please enter valid id in query param"});
    await Ticket.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"Ticket deleted"});
})

const updateAssignee =asyncHandler(async(req,res,next)=>{
    const {id}=req.query;
    const {AssignedTo}=req.body;
    if(AssignedTo==="")return res.status(400).json({success:false,message:"Please Provide valid fields"});
    if(id==="")return res.status(400).json({success:false,message:"Please enter valid id in query param"});
    const updateTicket=await Ticket.findByIdAndUpdate(id,{AssignedTo:new mongoose.Types.ObjectId(AssignedTo)},{new:true});
    if(!updateTicket)return res.status(400).json({success:false,message:"Failed to update"});
    return res.status(200).json({success:true,message:"Updated the assignee"});
})

export {createTicket,deleteTicket,updateAssignee};