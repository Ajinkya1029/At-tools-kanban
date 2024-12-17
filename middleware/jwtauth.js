import { asyncHandler} from '../utils/asynchandler.js';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';

const jwtAuth=asyncHandler(async(req,res,next)=>{
    try{
        let token=req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token Missing"
            })
        }
            const decode=jwt.decode(token);
            const userId=decode._id;
            const user=await User.findOne({_id:userId}).select("-password");
            if(!user){
                 return res.status(403).json({
                    success:false,
                    message:"Auth Failed"
                 })
            }
            req.User=user;
            next();        
    }catch(err){
        console.log(err)
        return res.status(403).json({
            success:false, 
            message:"auth failed"
        })
    }
})
export  {jwtAuth};