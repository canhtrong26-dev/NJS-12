import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <Link href="/" className="inline-block">
          <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            Blog Platform
          </h1>
        </Link>
      </div>
    </header>
  );
}