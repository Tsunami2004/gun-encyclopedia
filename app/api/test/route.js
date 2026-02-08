import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();

  return NextResponse.json({ 
    mongo: "connected", 
    cloudinary: cloudinary.config().cloud_name 
  });
}
