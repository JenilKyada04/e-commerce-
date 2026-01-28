"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"

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

type Order = {
  id: number
  userId: number
  date: string
  products: CartProduct[]
  status?: "Completed" | "Pending" | "Cancelled" // optional
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL_CART as string

  const fetchOrders = async () => {
    try {
      setLoading(true)

      const res = await axios.get(API_URL)

      // Map orders to include a default status (if API doesn't provide it)
      const ordersWithStatus: Order[] = res.data.carts.map((order: any) => ({
        ...order,
        status: order.status ?? "Completed", // default status
      }))

      setOrders(ordersWithStatus)
    } catch (error) {
      console.error("Error fetching orders", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableCaption className="text-left text-gray-500 py-2">
            {loading ? "Loading orders..." : "A list of recent orders"}
          </TableCaption>

          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-gray-600">Order ID</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">User ID</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Items</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Date</TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-600">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  Loading orders...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <TableCell className="px-4 py-2 font-medium">#{order.id}</TableCell>
                  <TableCell className="px-4 py-2">User {order.userId}</TableCell>
                  <TableCell className="px-4 py-2">
                    {order.products.reduce((total, item) => total + item.quantity, 0)}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status ?? "Unknown"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
