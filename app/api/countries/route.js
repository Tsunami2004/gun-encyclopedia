import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";

export async function GET() {
  await connectDB();
  const countries = await Country.find().sort({ name: 1 });
  return NextResponse.json(countries);
}
