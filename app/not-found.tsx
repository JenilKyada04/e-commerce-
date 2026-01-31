"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-700 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </main>
  );
}
