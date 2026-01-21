export default async function WeaponList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/weapons`, { cache: "no-store" });
  const weapons = await res.json();

  return (
    <main className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Weapons</h2>
      <div className="grid grid-cols-2 gap-4">
        {weapons.map(w => (
          <div key={w._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{w.name}</h3>
            <p className="text-sm">{w.type}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
