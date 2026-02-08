import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema({
  url: { type: String, required: true },
  caption: { type: String }
});

const WeaponSchema = new Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, index: true }, // ✅ keep this
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  designer: String,
  country: { type: Schema.Types.ObjectId, ref: "Country" },
  yearIntroduced: Number,
  yearRetired: Number,
  description: { type: String },
  calibers: [{ type: Schema.Types.ObjectId, ref: "Caliber" }],
  users: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
  wars: [{ type: Schema.Types.ObjectId, ref: "War" }],
  images: [ImageSchema],
}, { timestamps: true });

// ✅ keep these
WeaponSchema.index({ name: "text", description: "text" });
WeaponSchema.index({ yearIntroduced: 1 });

export default mongoose.models.Weapon || mongoose.model("Weapon", WeaponSchema);
