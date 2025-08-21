import todoModel from "@/models/Todo";
import { isValidObjectId } from "mongoose";

const handler = async (req, res) => {
  if (req.method == "DELETE") {
    const { id } = req.query;
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
  }
};
export default handler;
