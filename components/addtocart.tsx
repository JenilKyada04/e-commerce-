"use client"

import React from "react"
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

type Product = {
  id: number
  title: string
  price: number
  image: string
}

type CartItem = Product & {
  quantity: number
}

type AddToCartProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cart: CartItem[]
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  removeItem: (id: number) => void
}

export default function AddToCart({
  open, setOpen,
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
}: AddToCartProps) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="right-0 top-0 h-full w-100 rounded-none">
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
        </DrawerHeader>

        {cart.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Your cart is empty
          </p>
        )}

        <div className="flex-1 overflow-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 flex gap-4 border-b items-center"
            >
              <img
                src={item.image}
                className="h-16 w-16 object-contain border rounded-lg"
                alt={item.title}
              />

              <div className="flex-1">
                <p className="font-medium line-clamp-2">{item.title}</p>
                <p className="text-green-600 font-semibold">
                  ₹{item.price}
                </p>

                <div className="flex items-center justify-between gap-2 mt-2">
                  <div>
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

          <Link href={"/dashboard/orders"} >
          <Button disabled={cart.length === 0} className="w-full">
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
