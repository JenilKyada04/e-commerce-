"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";



const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum(["user", "admin"]),
});


type LoginFormData = z.infer<typeof loginSchema>;


export default function LoginPage() {
  const router = useRouter();

  const {register, handleSubmit,setValue,formState: { errors }, } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: "user",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginFormData) =>
      axios.post("/api/auth/login", payload),
    onSuccess: (res) => {
      if (res.data.role === "admin") {
        router.replace("/dashboard");
      } else {
        router.replace("/products");
      }
    },
    onError: () => {
      alert("Invalid credentials");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-center text-2xl font-bold underline">
          Login
        </h2>

        <Tabs
        
          defaultValue="user"
          onValueChange={(value) =>
            setValue("role", value as "user" | "admin")
          }
        >
          <TabsList className="mb-4 grid grid-cols-2">
            <TabsTrigger value="user" className="cursor-pointer">User</TabsTrigger>
            <TabsTrigger value="admin" className="cursor-pointer" >Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <LoginForm
              register={register}
              errors={errors}
              loading={loginMutation.isPending}
              onSubmit={handleSubmit(onSubmit)}
            />
          </TabsContent>

          <TabsContent value="admin">
            <LoginForm
              register={register}
              errors={errors}
              loading={loginMutation.isPending}
              onSubmit={handleSubmit(onSubmit)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


function LoginForm({
  register,
  errors,
  loading,
  onSubmit,
}: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          className="w-full rounded border px-3 py-2"
        />
        {errors.username && (
          <p className="text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full rounded border px-3 py-2"
        />
        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        disabled={loading}
        className="w-full rounded bg-black py-2 text-white disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
