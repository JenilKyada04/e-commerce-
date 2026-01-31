"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function LoginPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      router.replace("/products");
    } catch (error) {
      console.error(error);
      alert("User login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (adminUsername === "jenil" && adminPassword === "1234") {
        await axios.post(
          "/api/auth/login",
          { username: adminUsername, password: adminPassword },
          { headers: { "Content-Type": "application/json" } }
        );

        router.replace("/dashboard");
      } else {
        alert("Invalid admin credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-muted to-background px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {activeTab === "user" ? "Welcome" : "Welcome Back"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeTab === "user"
              ? "Login to continue shopping"
              : "Admin access only"}
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "user" | "admin")
          }
          className="w-full"
        >
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="user" className="cursor-pointer">
              User Login
            </TabsTrigger>
            <TabsTrigger value="admin" className="cursor-pointer">
              Admin Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <form onSubmit={handleUserLogin} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login as User"}
              </button>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Admin Username
                </label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) =>
                    setAdminUsername(e.target.value)
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) =>
                    setAdminPassword(e.target.value)
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login as Admin"}
              </button>
            </form>
          </TabsContent>
        </Tabs>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Secure Login
        </p>
      </div>
    </div>
  );
}
