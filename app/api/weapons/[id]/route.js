import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Weapon from "@/models/Weapon";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const weapon = await Weapon.findById(id).populate(
      "manufacturer country calibers users wars"
    );

    if (!weapon) {
      return NextResponse.json(
        { error: "Weapon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(weapon);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
