const asyncHandler=(request)=>{
    return async(req,res,next)=>{
        Promise.resolve(request(req,res,next)).catch((err)=>next(err));
    }
}
export {asyncHandler};