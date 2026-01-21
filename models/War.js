import mongoose, { Schema } from "mongoose";

const WarSchema = new Schema({
  name: String,
  startYear: Number,
  endYear: Number,
});

export default mongoose.models.War || mongoose.model("War", WarSchema);
