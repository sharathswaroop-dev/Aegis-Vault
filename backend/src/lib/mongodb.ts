import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/foodflow");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;