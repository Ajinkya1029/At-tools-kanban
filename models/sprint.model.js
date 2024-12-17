import mongoose, { Mongoose } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const sprintSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    StartDate:{
        type:Date,
        required:true,
    },
    EndDate:{
        type:Date,
        required:true,
    },
    
});
mongoose.plugin(mongooseAggregatePaginate);
export const Sprint=mongoose.model("Sprint",sprintSchema);