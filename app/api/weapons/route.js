import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

// register models
import "@/models/Manufacturer";
import "@/models/Country";
import "@/models/Caliber";
import "@/models/Unit";
import "@/models/War";

import Weapon from "@/models/Weapon";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // filter by country
    if (searchParams.get("country")) {
      query.country = searchParams.get("country");
    }

    // filter by type
    if (searchParams.get("type")) {
      query.type = searchParams.get("type");
    }

    // search by name
    if (searchParams.get("q")) {
      query.name = {
        $regex: searchParams.get("q"),
        $options: "i",
      };
    }

    const total = await Weapon.countDocuments(query);

    const weapons = await Weapon.find(query)
      .populate("manufacturer country calibers users wars")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      data: weapons,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
