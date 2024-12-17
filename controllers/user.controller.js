import {asyncHandler} from '../utils/asynchandler.js';
import {User} from '../models/user.model.js';

let registerUser=asyncHandler(async(req,res,next)=>{
    const{Name,Email,Password}=req.body;
    if([Name,Email,Password].some((field)=>field?.trim()==="")){
        return res.status(406).json({success:false,message:"Please fill all the fields"});
    }
    let existingUser=await User.findOne({Name:Name});
    if(existingUser!=null){
        return res.status(400).json({
            success:false,
            message:"User already Exists"
        })
    }
    let savedUser=await User.create({
        Name:Name,
        Email:Email,
        Password:Password
    });
    return res.status(200).json({
        success:true,
        message:"User Registered"
    })
});

let loginUser=asyncHandler(async(req,res,next)=>{
    let{Name,Password}=req.body;
    if([Name,Password].some((feild)=>feild?.trim()==="")){
        return res.status(406).json({success:false,message:"Please fill all the fields"});
    }
    let foundUser=await User.findOne({$and:[{Name:Name},{Password:Password}]}).select("-password");
    if(!foundUser){
        return res.status(400).json({
            success:false,
            message:"Username and password might be incorrect"
        });
    }
    const token=foundUser.generateToken();

    res.status(200).json({
        token:token,
        success:true,
        message:"User successfully logged in"
    });
})
export  {registerUser,loginUser}