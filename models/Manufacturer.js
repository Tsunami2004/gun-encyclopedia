import mongoose, { Schema } from "mongoose";

const ManufacturerSchema = new Schema({
  name: String,
  country: { type: Schema.Types.ObjectId, ref: "Country" },
  foundedYear: Number,
});

export default mongoose.models.Manufacturer || mongoose.model("Manufacturer", ManufacturerSchema);
