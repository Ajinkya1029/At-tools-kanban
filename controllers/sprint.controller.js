import { asyncHandler } from "../utils/asynchandler.js";
import { Sprint } from "../models/sprint.model.js";
import {Ticket} from '../models/ticket.model.js';
import { SprintUser } from "../models/sprintuser.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const getAllSprints=asyncHandler(async(req,res,next)=>{
    let sprint=await Sprint.find();
        return res.status(200).json({
            success:true,
            data:sprint,
            message:'Sprint List'
        });
});

const getSprintById=asyncHandler(async(req,res,next)=>{
    let {id}=req.query;
    if(id==="")return res.status(400).json({success:false,message:"Please send id"});
    let foundSprint=await Sprint.findOne({_id:id.toString()});
    if(foundSprint===null)return res.status(400).json({success:false,message:"Sprint not found"});
    return res.status(200).json({success:true,data:foundSprint,message:"Sprint found"});
});

const createSprint=asyncHandler(async(req,res,next)=>{
    let{CreatedBy,Name,StartDate,EndDate}=req.body;
    if([CreatedBy,Name,StartDate,EndDate].some((field)=>field?.trim()==="")){
        return res.status(400).json({success:false,message:"Please enter all the fields"});
    }
    const start = new Date(StartDate);
    const end = new Date(EndDate);

    if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({
            success: false,
            message: "Invalid date format. Use ISO 8601 (e.g., YYYY-MM-DDTHH:mm:ss.sssZ)",
        });
    }
    if(!mongoose.Types.ObjectId.isValid(CreatedBy)){
        return res.status(400).json({success:false,message:"Please enter a valid uuid"});
    }
    const savedSprint = await Sprint.create({
        Name,
        CreatedBy: new mongoose.Types.ObjectId(CreatedBy),
        StartDate: start,
        EndDate: end,
    });
    const sprintUser=await SprintUser.create({
        SprintId:savedSprint._id,
        UserId:new mongoose.Types.ObjectId(CreatedBy)
    });
    return res.status(200).json({success:true,message:"Sprint Saved Succesfully"});
});

const deleteSprint =asyncHandler(async(req,res,next)=>{
    const {id}=req.query;
    if(id==="")return res.status(400).json({success:false,message:"Send id with query param"});
    await Sprint.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"Sprint deleted"});

});

const allTicketOfSprint = asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Send valid id with query param",
        });
    }

    const tickets = await Sprint.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) }, 
        },
        {
            $lookup: {
                from: "tickets", 
                localField: "_id",
                foreignField: "SprintId",
                as: "Tickets",
            },
        },
        {
            $unwind: "$Tickets", 
        },
        {
            $lookup: {
                from: "users", 
                localField: "Tickets.CreatedBy",
                foreignField: "_id",
                as: "CreatedByDetails",
            },
        },
        {
            $lookup: {
                from: "users", 
                localField: "Tickets.AssignedTo",
                foreignField: "_id",
                as: "AssignedToDetails",
            },
        },
        {
            $addFields: {
                "Tickets.CreatedBy": {
                    $arrayElemAt: ["$CreatedByDetails.Name", 0],
                },
                "Tickets.AssignedTo": {
                    $arrayElemAt: ["$AssignedToDetails.Name", 0], 
                },
            },
        },
        {
            $group: {
                _id: "$_id",
                Tickets: { $push: "$Tickets" }, 
            },
        },
    ]);

    if (tickets.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No tickets found for the provided sprint",
        });
    }

    return res.status(200).json({
        success: true,
        message: "All Tickets Listed",
        data: tickets[0].Tickets, 
    });
});

const addMemberToSprint= asyncHandler(async(req,res,next)=>{
    const {id}=req.query;
 const {Name}=req.body;
 if([id,Name].some((field)=>field?.trim()===""))return res.status(400).json({success:false,message:"Please enter all the fields"});
 const foundUser=await User.findOne({Name:Name});
 if(!foundUser)return res.status(400).json({success:false,message:"Not a valid user"});
 const foundSprint=await Sprint.findOne({_id:id});
// console.log(`${foundSprint.CreatedBy}" " ${foundUser._id}`)
//  if(foundSprint.CreatedBy!==mongoose.Types.ObjectId(_id))return res.status(400).json({success:false,message:"User is not authorized to add member"});
const sprintUser=await SprintUser.findOne({SprintId:foundSprint._id,UserId:foundUser._id});
if(sprintUser!=null)return res.status(400).json({success:false,message:"Person already exist in the sprint"});
 const SavedSprintUser=await SprintUser.create({
    SprintId:foundSprint._id,
    UserId:foundUser._id
 })
 return res.status(200).json({success:true,message:"Saved the member to sprint"});

})

const sprintMember =asyncHandler(async(req,res,next)=>{
    const {id}=req.query;
    const users= await SprintUser.aggregate([
        {
            $match:{SprintId:new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup:{
                from:'users',
                localField:"UserId",
                foreignField:"_id",
                as:"userDetails"
            }
        },
        {
            $unwind:'$userDetails'
        },
        
    ]);
    return res.status(200).json({success:true,message:"List of member",data:users.map((user=>user.userDetails.Name))});
})



//update

export {getAllSprints,getSprintById,createSprint,deleteSprint,allTicketOfSprint,addMemberToSprint,sprintMember};


