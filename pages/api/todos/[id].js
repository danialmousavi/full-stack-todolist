import todoModel from "@/models/Todo";
import { isValidObjectId } from "mongoose";

const handler = async (req, res) => {
    const { id } = req.query;
  if (req.method == "DELETE") {
    if (isValidObjectId(id)) {
      const data = await todoModel.findOneAndDelete({ _id: id });
      if (data) {
        return res.status(200).json({ message: "todo deleted" });
      } else {
        return res.status(402).json({ message: "todo not found" });
      }
    } else {
      return res.status(404).json({ message: "todo   id not found" });
    }
  } else if (req.method =="PUT") {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "invalid id" });
    }

    try {
      const todo = await todoModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!todo) return res.status(404).json({ message: "todo not found" });

      return res.status(200).json(todo);
    } catch (err) {
      return res.status(500).json({ message: "server error" });
    }
  }

  return res.status(405).json({ message: "method not allowed" });
};
export default handler;
