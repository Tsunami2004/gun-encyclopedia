import mongoose, { Schema } from "mongoose";

const WeaponSchema = new Schema({
  name: String,
  type: String,
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  designer: String,
  country: { type: Schema.Types.ObjectId, ref: "Country" },
  yearIntroduced: Number,
  yearRetired: Number,
  description: String,
  calibers: [{ type: Schema.Types.ObjectId, ref: "Caliber" }],
  users: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
  wars: [{ type: Schema.Types.ObjectId, ref: "War" }],
  images: [String],
});

export default mongoose.models.Weapon || mongoose.model("Weapon", WeaponSchema);
