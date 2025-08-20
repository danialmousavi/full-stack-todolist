import connectDB from "@/configs/db"
import userModel from "@/models/User";
import { generateToken, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";
const handler=async(req,res)=>{
    if(req.method!="POST"){
        return false
    }
    try {
        connectDB()
        const {identifier,password}=req.body;
        if(!identifier.trim()||!password.trim()){
            return res.status(402).json({messge:"data is not valid!"});
        }
        const user=await userModel.findOne({$or:[{username:identifier},{email:identifier}]});
        if(!user){
            return res.status(404).json({messge:"user not found"});
        }
        const ispasswordValid=await verifyPassword(password,user.password);
        if(!ispasswordValid){
            return res.status(402).json({messge:"username or pasword is not valid"});
        }
        const token=generateToken({email:user.email});
            res.setHeader(
            "Set-Cookie",
            serialize("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                path: "/",
            })
            );
        return res.status(200).json({message:"user logged in"})
    } catch (error) {
            return res.status(500).json({messge:"internal server Error"});
        
    }
//code
}
export default handler