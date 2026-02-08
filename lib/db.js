import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
