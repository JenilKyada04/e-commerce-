"use client"

import { useCart } from "@/context/cart-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"

export default function CheckoutPage() {
  const { cart } = useCart()

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const placeOrder = () => {
    if (!name || !address || !phone) {
      alert("Please fill all details")
      return
    }
    alert("Order placed successfully 🎉")
  }

  if (!cart.length) {
    return <p className="p-6">Your cart is empty</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cart.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>₹{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                ₹{item.price * item.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="text-right font-bold text-lg">
        Grand Total: ₹{totalAmount}
      </div>

      <div className="space-y-3">
        <Input
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>

      <Button className="w-full" onClick={placeOrder}>
        Place Order
      </Button>
    </div>
  )
}
