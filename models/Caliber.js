import mongoose, { Schema } from "mongoose";

const CaliberSchema = new Schema({
  name: String,
  bulletDiameter: Number,
  caseLength: Number,
  ammoType: String,
  weapons: [{ type: Schema.Types.ObjectId, ref: "Weapon" }],
});

export default mongoose.models.Caliber || mongoose.model("Caliber", CaliberSchema);
