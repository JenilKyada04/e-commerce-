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
}

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)


  const API_URL = process.env.NEXT_PUBLIC_API_URL_CART as string

  const fetchOrders = async () => {
    try {
      setLoading(true)

      const res = await axios.get(API_URL)

      setOrders(res.data)
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
    <>
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      <Table>
        <TableCaption>
          {loading ? "Loading orders..." : "A list of recent orders"}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                #{order.id}
              </TableCell>

              <TableCell>
                User {order.userId}
              </TableCell>

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
                <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-sm">
                  Completed
                </span>
              </TableCell>
            </TableRow>
          ))}

          {!loading && orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
