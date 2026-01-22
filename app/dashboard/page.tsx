"use client";


export default function DashboardPage() {
  
  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
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
