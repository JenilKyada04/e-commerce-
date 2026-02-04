

"use client"

import { useCart } from "@/context/cart-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import Navrightside from "@/components/navrightside"
import { useState } from "react"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const checkoutSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    address: z.string().min(10, "Address must be at least 10 characters"),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutClient() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const { cart } = useCart()

    const { register, handleSubmit, formState: { errors }, } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    })

    const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    const placeOrder = (data: CheckoutFormData) => {
        console.log("Order Data:", data)
        alert("Order placed successfully 🎉")
    }

    if (!cart.length) {
        return (
            <div>
                <div className="flex items-center justify-between m-3 border-b-2">
                    <span className="font-semibold text-3xl p-4 hidden md:block">
                        Checkout Page
                    </span>
                    <Navrightside />
                </div>

                <p className="p-6 text-center text-4xl font-bold underline mt-40">
                    Your cart is Empty
                </p>
            </div>
        )
    }

    return (
        <div className="p-3">
            <div className="flex items-center justify-between m-3 border-b-2">
                <span className="font-semibold text-3xl p-4 ">
                    Checkout Page
                </span>
                <span className="hidden md:block">

                    <Navrightside />
                </span>
            </div>

            <div className="max-w-xl mx-auto p-5 space-y-6 border-2 rounded-3xl hover:shadow-xl cursor-pointer">

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

                <form onSubmit={handleSubmit(placeOrder)} className="space-y-4">
                    <div>
                        <Input
                            placeholder="Full name" {...register("name")}
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            placeholder="Address" {...register("address")}
                            value={address}
                            onChange={e => setAddress(e.target.value)} />
                        {errors.address && (
                            <p className="text-red-500 text-sm">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            placeholder="Phone Number"{...register("phone")}
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Place Order
                    </Button>
                </form>
            </div>
            <div className="md:mt-0 mt-40 ">

                <Footer />
            </div>
        </div>
    )
}

