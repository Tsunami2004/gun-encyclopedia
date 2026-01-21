import mongoose, { Schema } from "mongoose";

const CountrySchema = new Schema({
  name: String,
  producesFirearms: Boolean,
  producesAmmo: Boolean,
});

export default mongoose.models.Country || mongoose.model("Country", CountrySchema);
