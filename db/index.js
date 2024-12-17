import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        
        const connectionInstance=await mongoose.connect(`${process.env.CONNECTION_STRING}/${process.env.DB_NAME}`);
        console.log(`Database connection to ${process.env.DB_NAME}`);
    }catch(ex){
        console.log("error"+ex);
        process.exit(1);
    }
}
export default connectDB;