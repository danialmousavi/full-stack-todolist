import connectDB from "@/configs/db";
import userModel from "@/models/User";
import hashPassword, { generateToken } from "@/utils/auth";
import { serialize } from "cookie";

const handler=async(req,res)=>{
    if(req.method!="POST"){
        return res.status(405).json({ message: "Method not allowed" });
    }
    try {
        connectDB()
        const {firstname,lastname,username,email,password}=req.body;
        if(!firstname.trim()||!lastname.trim()||!username.trim()||!email.trim()||!password.trim()){
            return res.status(422).json({message:"invalid property"})
        }
        // check if user exists
        const isUserExist=await userModel.findOne({$or:[{username},{email}]})
        if(isUserExist){
            return res.status(422).json({message:"username or email already exist"})
        }
        //hash password
        const hashedPass=await hashPassword(password);
        //generate token
        const token =generateToken({email})
        
        //set token in cookei
        res.setHeader("Set-Cookie",serialize("token",token,{
            httpOnly:true,
            maxAge:60*60*24,
            path:"/"
        }))
        const user=await userModel.find({});
        await userModel.create({firstname,lastname,username,email,password:hashedPass,role:user.length?"USER":"ADMIN"})
        return res.status(201).json({message:"user registerd successfully"})
    } catch (error) {
        return res.status(500).json({message:"unknown Error internal server Error "})
    }
}
export default handler

        //is user exist ✔️
        //hash password
        //generate token
        //create✔️