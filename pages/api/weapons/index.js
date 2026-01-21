import dbConnect from "@/lib/db";
import Weapon from "@/models/Weapon";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const weapons = await Weapon.find({});
    return res.status(200).json(weapons);
  }

  if (req.method === "POST") {
    const weapon = await Weapon.create(req.body);
    return res.status(201).json(weapon);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
