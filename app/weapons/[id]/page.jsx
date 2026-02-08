import Link from "next/link";

export default async function WeaponDetailPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/weapons/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Weapon not found</h2>
        <Link href="/weapons" className="text-blue-600 underline">
          Back to weapons
        </Link>
      </div>
    );
  }

  const weapon = await res.json();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{weapon.name}</h1>
        <p className="text-gray-600">{weapon.type}</p>
      </div>

      {/* ✅ FIXED IMAGES SECTION (SERVER SAFE) */}
      {weapon.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {weapon.images.map((img, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden bg-gray-100"
            >
              <img
                src={img.url}
                alt={img.caption || weapon.name}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "contain",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Detail label="Designer" value={weapon.designer} />
        <Detail label="Manufacturer" value={weapon.manufacturer?.name} />
        <Detail label="Country" value={weapon.country?.name} />
        <Detail label="Year Introduced" value={weapon.yearIntroduced} />
        <Detail label="Year Retired" value={weapon.yearRetired} />
      </div>

      {/* Calibers */}
      {weapon.calibers?.length > 0 && (
        <Section title="Calibers">
          {weapon.calibers.map((c) => c.name).join(", ")}
        </Section>
      )}

      {/* Users */}
      {weapon.users?.length > 0 && (
        <Section title="Used By">
          {weapon.users.map((u) => u.name).join(", ")}
        </Section>
      )}

      {/* Wars */}
      {weapon.wars?.length > 0 && (
        <Section title="Wars">
          {weapon.wars.map((w) => w.name).join(", ")}
        </Section>
      )}

      {/* Description */}
      {weapon.description && (
        <Section title="Description">{weapon.description}</Section>
      )}

      <Link
        href="/weapons"
        className="inline-block mt-6 text-blue-600 underline"
      >
        ← Back to weapons
      </Link>
    </main>
  );
}

/* Reusable UI helpers */

function Section({ title, children }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-700">{children}</p>
    </div>
  );
}

function Detail({ label, value }) {
  if (!value) return null;
  return (
    <p>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
