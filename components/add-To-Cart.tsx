"use client"

import Link from "next/link"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash } from "lucide-react"
import { useCart } from "../context/cart-context"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AddToCart({ open, setOpen }: Props) {
  
  const { cart, increaseQty, decreaseQty, removeItem } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="right-0 top-0 h-full w-95 rounded-none">
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
        </DrawerHeader>

        {cart.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            Your cart is empty
          </p>
        )}

        <div className="flex-1 overflow-auto">
          {cart.map(item => (
            <div
              key={item.id}
              className="p-4 flex gap-4 border-b items-center"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-16 w-16 object-contain border rounded"
              />

              <div className="flex-1">
                <p className="font-medium line-clamp-2">
                  {item.title}
                </p>
                <p className="text-green-600 font-semibold">
                  ₹{item.price}
                </p>

                <div className="flex justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => decreaseQty(item.id)}
                    >
                      <Minus size={14} />
                    </Button>

                    <span>{item.quantity}</span>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => increaseQty(item.id)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DrawerFooter>
          <div className="flex justify-between font-semibold mb-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <Link href="/products/checkout">
            <Button className="w-full" disabled={!cart.length}>
              Proceed to Checkout
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Continue Shopping
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
