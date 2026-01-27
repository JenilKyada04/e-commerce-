"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { User, Product, Cart } from "../types/index";
import StatCard from "@/components/stat-card";
import ProductTable from "@/components/product-table";
import UserList from "@/components/user-list";

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  const apiurl = process.env.NEXT_PUBLIC_API_URL_USER!
  const apiproducts = process.env.NEXT_PUBLIC_API_URL_PRODUCT!
  const apicarts = process.env.NEXT_PUBLIC_API_URL_CART!

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, productsRes, cartsRes] = await Promise.all([
          axios.get(apiurl),
          axios.get(apiproducts),
          axios.get(apicarts),
        ]);

        setUsers(usersRes.data.users);
        setProducts(productsRes.data.products);
        setOrders(cartsRes.data.carts);
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded-full bg-black px-4 py-2 cursor-pointer text-white hover:opacity-90"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : (
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
            <UserList users={users.slice(0, 5)} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
