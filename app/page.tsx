import Link from "next/link";

export default function Home() {
  return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Project Store</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-700 text-xl"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                  href="/products"
                  className="text-blue-500 hover:text-blue-700 text-xl"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </main>
  );
}
