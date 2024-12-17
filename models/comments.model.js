import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema=new mongoose.Schema({
  Title:{
    type:String,
    required:true
  },
  UserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});
mongoose.plugin(mongooseAggregatePaginate);
export const Comment=mongoose.model("Comment",commentSchema);