"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-6 text-center ">
      <div className="shadow-2xl p-20 rounded-4xl ">

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          SaaS Admin Dashboard
        </h1>

        <div className="mt-8 flex items-center justify-center gap-4">

          <Link className="rounded-lg border px-6 py-3 text-sm font-medium hover:bg-muted bg-gray-300"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}

