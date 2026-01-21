import { connectDB } from "@/lib/db";
import Weapon from "@/models/Weapon";

export async function GET(req, { params }) {
  await connectDB();
  const weapon = await Weapon.findById(params.id).populate("manufacturer country calibers wars users");
  return Response.json(weapon);
}
const res = await fetch("/api/weapons");
const weapons = await res.json();
