"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "jenil" && password === "123") {
      router.push("/dashboard");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          className="mb-4 w-full rounded border px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2"
        />

        <button
          type="submit"
          className="w-full cursor-pointer rounded bg-primary px-4 py-2 text-white hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
}
