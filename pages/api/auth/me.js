import connectDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";

const handler=async(req,res)=>{
    connectDB()
    if(req.method!=="GET"){
        return res.status(405).json({ message: "Method not allowed" });
    }
    try {
            const {token}=req.cookies;
    if(!token){
       return res.status(401).json({message:"you are not login"})
    }
    const tokenPayload=verifyToken(token);
    if(!tokenPayload){
       return res.status(401).json({message:"you are not login"})
    }
    const user=await userModel.findOne({email:tokenPayload.email},"-password -__v");
    console.log(user);
    
    return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:"internal server Error 500"})
    }


}
export default handler