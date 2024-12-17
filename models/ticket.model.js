import mongoose, { Mongoose } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const ticketSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        enum:["Bug","Story","Feature"],
        required:true
    },
    Priority:{
        type:String,
        enum:["Low","Medium","High"],
        required:true
    },
    Image:{
        type:String,
        required:false
    },
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    AssignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    SprintId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sprint",
        required:true
    }
});
mongoose.plugin(mongooseAggregatePaginate);
export const Ticket=mongoose.model("Ticket",ticketSchema);