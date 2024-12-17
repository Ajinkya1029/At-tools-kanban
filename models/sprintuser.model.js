import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const sprintUserSchema= new mongoose.Schema({
    SprintId:{
        type:mongoose.Types.ObjectId,
        ref:"sprints",
        required:true,
    },
    UserId:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    }
});
mongoose.plugin(mongooseAggregatePaginate);
export const SprintUser=mongoose.model("sprintusers",sprintUserSchema);