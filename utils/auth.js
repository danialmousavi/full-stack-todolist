import {hash,compare} from "bcryptjs"
import { sign,verify } from "jsonwebtoken";

const hashPassword=async(password)=>{
 const hashedPassword=await hash(password,12);
 return hashedPassword
}

export const generateToken=(data)=>{
const token=sign({...data},process.env.privateKey,{
    // algorithm:"RS256"
    expiresIn:"24h"
})
return token
}
export const verifyPassword=async(password,hashedpassWord)=>{
    const isValid=await compare(password,hashedpassWord);
    return isValid
}
export const verifyToken=(token)=>{
    try {
    const isValidToken=verify(token,process.env.privateKey);
    return isValidToken
    } catch (error) {
        console.log("token isnt valid=>",error)
    }
}

export default hashPassword