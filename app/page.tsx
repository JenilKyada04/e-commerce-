"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLoggedIn } from "@/utils/auth";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        SaaS Admin Dashboard
      </h1>

      <div className="mt-8 flex gap-4">
        <Link
          href={isLoggedIn() ? "/dashboard" : "/login"}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Go to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
       

        <Link  className="rounded-lg border px-6 py-3 text-sm font-medium hover:bg-muted"
          href="/login"
         > 
          Login
        </Link>
      </div>
    </main>
  );
}
