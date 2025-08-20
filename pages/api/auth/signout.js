import { serialize } from "cookie"

const handler=async(req,res)=>{
if(req.method!="GET"){
    return false
};
res.setHeader("Set-Cookie",serialize("token","",{
    path:"/",
    maxAge:0
}))
return res.status(200).json({message:"you have logOut Successfully"})
}
export default handler