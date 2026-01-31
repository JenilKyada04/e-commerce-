"use client"

import { useCart } from "@/context/cart-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import Navrightside from "@/components/navrightside"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function CheckoutClient() {
    const { cart } = useCart()

    const { register } = useForm()

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
                <span className="font-semibold text-3xl p-4 hidden md:block">
                    Checkout Page
                </span>
                <Navrightside />
            </div>

            <div className="max-w-xl mx-auto p-3  space-y-6 border-2 rounded-3xl hover:shadow-xl md:mt-30 cursor-pointer">

                <Table className="">
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
                        required
                    />
                    <Input
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                    {/* <Input
                        placeholder="Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required

                    /> */}
                    <Input
                        placeholder="Phone number "
                        type="number"
                        {...register("number", {
                            required: "Age is required",
                            min: {
                            value: 10,
                            message: "You must be at least 10 digits"
                            },
                            max: {
                            value: 11,
                            message: "You must be at least 10 digits"
                            },
                            valueAsNumber: true,
                        })}
                    />
                </div>
                {/* <Link href="/products/submit" > */}
                <Button className="w-full cursor-pointer" onClick={placeOrder}>
                    Place Order
                </Button>
                {/* </Link> */}
            </div>

            <Footer />
        </div>
    )
}
