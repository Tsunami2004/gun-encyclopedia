import mongoose, { Schema } from "mongoose";

const UnitSchema = new Schema({
  name: String,
  country: { type: Schema.Types.ObjectId, ref: "Country" },
  type: String,
});

export default mongoose.models.Unit || mongoose.model("Unit", UnitSchema);
