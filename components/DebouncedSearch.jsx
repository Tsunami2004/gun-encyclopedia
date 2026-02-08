"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DebouncedSearch({ placeholder = "Search weapons..." }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = searchParams.get("q") || "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }

      params.delete("page");

      router.push(`?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(t);
  }, [value, router, searchParams]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="border p-2 rounded w-full"
    />
  );
}
