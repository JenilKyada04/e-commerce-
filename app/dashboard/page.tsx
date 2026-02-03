"use client";

import { useRouter } from "next/navigation";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { User, Product, Cart } from "../types";
import StatCard from "@/components/stat-card";
import ProductTable from "@/components/product-table";
import UserList from "@/components/user-list";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Myintercepter from "@/lib/intercepter"

const apiurl = process.env.NEXT_PUBLIC_BASE_URL!;

const fetchUsers = async () => {
  const res = await Myintercepter.get(apiurl + "users");
  return res.data.users as User[];
};

const fetchProducts = async () => {
  const res = await Myintercepter.get(apiurl + "products");
  return res.data.products as Product[];
};

const fetchOrders = async () => {
  const res = await Myintercepter.get(apiurl + "carts");
  return res.data.carts as Cart[];
};

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  const { data: users = [],isLoading: usersLoading,isError: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const {data: products = [],isLoading: productsLoading,isError: productsError} = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const {data: orders = [],isLoading: ordersLoading, isError: ordersError} = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const loading = usersLoading || productsLoading || ordersLoading;
  const error = usersError || productsError || ordersError;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="gap-2 bg-black cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {loading && <p className="text-gray-500">Loading dashboard...</p>}

      {error && (
        <p className="text-red-500">Failed to load dashboard data</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Users" value={users.length} />
            <StatCard title="Products" value={products.length} />
            <StatCard title="Orders" value={orders.length} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProductTable products={products} />
            </div>
            <UserList users={users.slice(0, 9)} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
