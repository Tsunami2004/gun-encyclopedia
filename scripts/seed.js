import mongoose from "mongoose";
import dotenv from "dotenv";

import Weapon from "../models/Weapon.js";
import Caliber from "../models/Caliber.js";
import Manufacturer from "../models/Manufacturer.js";
import Country from "../models/Country.js";
import War from "../models/War.js";
import Unit from "../models/Unit.js";

// Load ENV
dotenv.config();
console.log("Loaded MONGO_URI =", process.env.MONGO_URI);
const MONGODB_URI = process.env.MONGO_URI;


async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected!");

    // CLEAR EXISTING DATA
    await Promise.all([
      Weapon.deleteMany({}),
      Caliber.deleteMany({}),
      Manufacturer.deleteMany({}),
      Country.deleteMany({}),
      War.deleteMany({}),
      Unit.deleteMany({})
    ]);

    console.log("Old data cleared!");

    // COUNTRIES
    const russia = await Country.create({ name: "Russia", producesFirearms: true, producesAmmo: true });
    const usa = await Country.create({ name: "United States", producesFirearms: true, producesAmmo: true });
    const germany = await Country.create({ name: "Germany",producesFirearms: true,producesAmmo: true});

    // MANUFACTURERS
    const kalashnikov = await Manufacturer.create({ name: "Kalashnikov Concern", country: russia._id });
    const colt = await Manufacturer.create({ name: "Colt's Manufacturing", country: usa._id });
    const hk = await Manufacturer.create({ name: "Heckler & Koch", country: germany._id });

    // CALIBERS
    const c762 = await Caliber.create({ name: "7.62×39mm", bulletDiameter: 7.92, ammoType: "Intermediate" });
    const c556 = await Caliber.create({ name: "5.56×45mm NATO", bulletDiameter: 5.7, ammoType: "Intermediate" });
    const c9mm = await Caliber.create({ name: "9×19mm Parabellum", bulletDiameter: 9, ammoType: "Pistol / SMG" });

    // UNITS
    const spetsnaz = await Unit.create({ name: "Spetsnaz", country: russia._id, type: "Special Forces" });
    const usArmy = await Unit.create({ name: "US Army", country: usa._id, type: "Army" });
    const specialForces = await Unit.create({ name: "Special Forces", country: germany._id, type: "Special Forces" });

    // WARS
    const vietnam = await War.create({ name: "Vietnam War", startYear: 1955, endYear: 1975 });
    const iraqWar = await War.create({ name: "Iraq War", startYear: 2003, endYear: 2011 });
    const warOnTerror = await War.create({ name: "War on Terror", startYear: 2001, endYear: 2021 });

    // WEAPONS WITH IMAGES
    await Weapon.create({
      name: "AK-47",
      type: "Assault Rifle",
      manufacturer: kalashnikov._id,
      designer: "Mikhail Kalashnikov",
      country: russia._id,
      yearIntroduced: 1947,
      calibers: [c762._id],
      users: [spetsnaz._id],
      wars: [vietnam._id],
      images: [
        {
          url: "https://example.com/images/weapons/ak47-1.jpg",
          caption: "AK-47 side view"
        },
        {
          url: "https://example.com/images/weapons/ak47-2.jpg",
          caption: "AK-47 field use"
        }
      ],
      description: "Iconic assault rifle developed in the Soviet Union."
    });

    await Weapon.create({
      name: "M4 Carbine",
      type: "Carbine",
      manufacturer: colt._id,
      designer: "Colt",
      country: usa._id,
      yearIntroduced: 1994,
      calibers: [c556._id],
      users: [usArmy._id],
      wars: [iraqWar._id],
      images: [
        {
          url: "https://example.com/images/weapons/m4-1.jpg",
          caption: "M4 Carbine in service"
        }
      ],
      description: "US military carbine used since the 1990s."
    });
    await Weapon.create({
       name: "MP5",
       type: "Submachine Gun",
       manufacturer: hk._id,
       designer: "Heckler & Koch",
       country: germany._id,
       yearIntroduced: 1966,
       calibers: [c9mm._id],
       users: [specialForces._id],
       wars: [warOnTerror._id],
       images: [
         {
           url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/MP5A3_1.jpg",
           caption: "MP5 Submachine Gun"
         }
        ],
        description: "The MP5 is a 9mm submachine gun widely used by military and police forces around the world."
});

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

// Run Seeder
seed();
