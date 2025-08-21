import connectDB from "@/configs/db";
import todoModel from "@/models/Todo";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";

const handler = async (req, res) => {
    connectDB();
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "you are not login" });
    }
    const tokenPayload = verifyToken(token);
    if (!tokenPayload) {
      return res.status(401).json({ message: "you are not login" });
    }
    const user = await userModel.findOne({ email: tokenPayload.email });
    console.log("USER FROM DB:", user);  
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    
  if (req.method == "GET") {
    const todos=await todoModel.find({user:user._id})
    return res.status(200).json({ todos });

  } else if (req.method == "POST") {
    connectDB();
    const { title, isCompleted } = req.body;
    
    if (!title.trim()) {
      return res.status(402).json({ message: "invalid property" });
    }
    const newTodo = {
      title,
      isCompleted,
      user: user._id,
    };
    await todoModel.create(newTodo);
    return res.status(201).json({ message: "todo created successfully" });
  } else {
    return false;
  }
};
export default handler;
