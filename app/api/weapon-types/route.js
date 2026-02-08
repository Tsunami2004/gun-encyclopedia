import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Weapon from "@/models/Weapon";

export async function GET() {
  await connectDB();
  const types = await Weapon.distinct("type");
  return NextResponse.json(types.filter(Boolean));
}
