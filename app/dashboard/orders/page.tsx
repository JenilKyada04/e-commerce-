"use client"

import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


type CartProduct = {
  productId: number
  quantity: number
}

type OrderStatus = "Completed" | "Pending" | "Cancelled"

type Order = {
  id: number
  userId: number
  date: string
  products: CartProduct[]
  status?: OrderStatus
}


const API_URL = process.env.NEXT_PUBLIC_BASE_URL as string

const fetchOrders = async (): Promise<Order[]> => {
  const res = await axios.get(API_URL + "carts")

  return res.data.carts.map((order: any) => ({
    ...order,
    status: order.status ?? "Completed",
  }))
}


function StatusBadge({ status }: { status?: OrderStatus }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
        status === "Completed"
          ? "bg-green-100 text-green-700"
          : status === "Pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  )
}


export default function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  })

  return (
    <div className="space-y-6 rounded-lg bg-gray-50 p-4 sm:p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>

      <div className="hidden sm:block overflow-x-auto rounded-lg border bg-white shadow-sm">
        <Table>
          <TableCaption className="py-2 text-gray-500">
            {isLoading
              ? "Loading orders..."
              : isError
              ? "Failed to load orders"
              : "A list of recent orders"}
          </TableCaption>

          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center">
                  Loading orders...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    #{order.id}
                  </TableCell>
                  <TableCell>User {order.userId}</TableCell>
                  <TableCell>
                    {order.products.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={order.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3 sm:hidden">
        {isLoading ? (
          <p className="text-center text-gray-500">
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">
            No orders found
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <p className="font-semibold">Order #{order.id}</p>
                <StatusBadge status={order.status} />
              </div>

              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>User: {order.userId}</p>
                <p>
                  Items:{" "}
                  {order.products.reduce(
                    (t, i) => t + i.quantity,
                    0
                  )}
                </p>
                <p>
                  Date:{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
