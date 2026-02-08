"use client";

import { useEffect, useState } from "react";

export default function WeaponFilters({ onChange }) {
  const [countries, setCountries] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch("/api/countries")
      .then(res => res.json())
      .then(setCountries);

    fetch("/api/weapon-types")
      .then(res => res.json())
      .then(setTypes);
  }, []);

  return (
    <div className="flex gap-4 mb-6">
      <select
        className="border p-2 rounded"
        onChange={(e) => onChange({ country: e.target.value })}
      >
        <option value="">All Countries</option>
        {countries.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        onChange={(e) => onChange({ type: e.target.value })}
      >
        <option value="">All Types</option>
        {types.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}
