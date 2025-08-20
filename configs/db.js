const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose.connect("mongodb://127.0.0.1:27017/next-todo-app");
    console.log("Connected!");
  } catch (error) {
    console.log("not conected ", error);
  }
};
export default connectDB;
