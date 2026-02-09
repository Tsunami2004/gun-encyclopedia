import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Weapon from "@/models/Weapon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // make sure this exists

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

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    await Weapon.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
