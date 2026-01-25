"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadProjectInfo } from "next/dist/build/webpack-config";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // if (username === "jenil" && password === "123") {
    //   localStorage.setItem("isAuth" , " true");
    //   router.push("/dashboard");
    // } else {
    //   alert("Please enter username and password");
    // }

    try {

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.replace("/dashboard");
      } else {
        alert("Login Failed");
      }
    } catch(error){
      console.error(error);
      alert("Somthing went wrong")
      setLoading(false)
    }

};


  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold">Admin Login</h2>

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
          disabled={loading}
          className="w-full cursor-pointer rounded bg-primary px-4 py-2 text-white hover:opacity-90"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
