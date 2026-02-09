import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Gun Encyclopedia 🚀 LIVE TEST
      </h1>
    
      <p className="text-gray-400 max-w-xl text-center mb-8">
        Explore detailed information about firearms, including their origin,
        manufacturers, calibers, usage in wars, and countries of production.
      </p>

      <div className="flex gap-4">
        <Link
          href="/weapons"
          className="px-6 py-3 rounded bg-white text-black hover:bg-gray-200 transition font-medium"
        >
          Browse Weapons →
        </Link>

        <Link
          href="/weapons"
          className="px-6 py-3 rounded border border-white/30 hover:bg-white/10 transition font-medium"
        >
          Explore Database
        </Link>
      </div>

      <footer className="absolute bottom-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Gun Encyclopedia | Built with Next.js
      </footer>
    </main>
  );
}
