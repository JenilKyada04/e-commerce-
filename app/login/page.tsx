"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

   

    // try {
    //    await axios.post("/api/auth/login", { username, password, },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   router.replace("/products")
    // } catch (error) {
    //   console.error(error)
    //   alert("Login Failed or something went wrong")
    //   setLoading(false)
    // }


    try {
      if (username === "jenil" && password === "1234") {
        await axios.post("/api/auth/login", { username, password, },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      router.replace("/dashboard")
      } else {
        router.replace("/products")
      }
    } catch (error) {
      console.error(error)
      alert("Login Failed or something went wrong")
      setLoading(false)
    }

  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-6   ">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-lg bg-white p-8 border-2 hover:shadow-2xl cursor-pointer "
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
          className="w-full  rounded bg-primary px-4 py-2 text-white hover:opacity-90"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
