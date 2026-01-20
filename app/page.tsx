import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          SaaS Admin Dashboard
        </h1>

        <p className="mt-4 max-w-xl text-muted-foreground">
          A modern admin dashboard built with Next.js, Tailwind CSS, and Fake Store API.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/login"
            className="rounded-lg border px-6 py-3 text-sm font-medium hover:bg-muted"
          >
            Login
          </Link>
        </div>
      </main>
    </>
  );
}
