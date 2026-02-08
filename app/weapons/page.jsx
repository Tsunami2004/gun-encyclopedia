export const dynamic = "force-dynamic";

import Link from "next/link";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";
import Weapon from "@/models/Weapon";
import DebouncedSearch from "@/components/DebouncedSearch";

export default async function WeaponList({ searchParams }) {
  const q = searchParams.q || "";
  const type = searchParams.type || "";
  const country = searchParams.country || "";
  const page = Number(searchParams.page) || 1;

  await connectDB();

  const countries = await Country.find().sort({ name: 1 }).lean();
  const types = await Weapon.distinct("type");

  const query = new URLSearchParams({
    q,
    type,
    country,
    page,
    limit: 6,
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/weapons?${query}`,
    { cache: "no-store" }
  );

  const { data: weapons, pagination } = await res.json();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Weapons Encyclopedia
        </h1>
        <p className="text-gray-600 mt-1">
          Browse firearms by type, country, and name
        </p>
      </div>

      {/* Filters */}
      <form className="bg-white border rounded-lg p-4 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Debounced Search */}
          <DebouncedSearch placeholder="Search weapons..." />

          {/* Type */}
          <select
            name="type"
            defaultValue={type}
            className="border p-2 rounded w-full"
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Country */}
          <select
            name="country"
            defaultValue={country}
            className="border p-2 rounded w-full"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c._id.toString()} value={c._id.toString()}>
                {c.name}
              </option>
            ))}
          </select>

          <button className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition">
            Apply Filters
          </button>
        </div>
      </form>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weapons.map((w) => (
          <Link
            key={w._id}
            href={`/weapons/${w._id}`}
            className="group border rounded-lg p-4 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold group-hover:text-blue-600">
              {w.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {w.type}
            </p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-10">
        {page > 1 && (
          <Link
            href={`?q=${q}&type=${type}&country=${country}&page=${page - 1}`}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            ← Previous
          </Link>
        )}

        <span className="text-sm text-gray-600">
          Page {page} of {pagination.pages}
        </span>

        {page < pagination.pages && (
          <Link
            href={`?q=${q}&type=${type}&country=${country}&page=${page + 1}`}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Next →
          </Link>
        )}
      </div>
    </main>
  );
}
