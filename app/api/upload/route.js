import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { image } = await req.json();

    const result = await cloudinary.uploader.upload(image, {
      folder: "guns",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
