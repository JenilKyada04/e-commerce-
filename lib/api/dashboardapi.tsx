import interceptor from "@/lib/intercepter"

import { User, Product, Cart } from "@/app/types/index";


export const fetchUsers = async () => {
  const res = await interceptor.get("users");
  return res.data.users as User[];
};

export const fetchProducts = async () => {
  const res = await interceptor.get("products");
  return res.data.products as Product[];
};

export const fetchOrders = async () => {
  const res = await interceptor.get("carts");
  return res.data.carts as Cart[];
};


