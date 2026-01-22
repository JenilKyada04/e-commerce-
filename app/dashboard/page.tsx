"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, logout } from "@/utils/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded-full bg-black cursor-pointer  px-4 py-2 text-white hover:opacity-90"
        >
          Logout
        </button>
      </div>

      <p className="mt-4 text-gray-700">
        Welcome to the admin dashboard! You are successfully logged in.
      </p>
    </div>
  );
}
