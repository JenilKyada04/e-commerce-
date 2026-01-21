"use client"

import axios from "axios"
import { useEffect, useState } from "react"

type Product = {
    id: number
    title: string
    price: number
    image: string
    rating: {
        rate : number 
        count : number 
    }
}

export default function Page() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) return <p>Loading products...</p>

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-xl cursor-pointer">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-40 w-full object-contain mb-3"
                        />
                        <h3 className="text-sm font-semibold line-clamp-2">
                            {item.title}
                        </h3>
                        <div>

                            <p className="mt-2 font-bold text-green-600">
                                ₹{item.price}
                            </p>
                            <p className="">
                                {item.rating.rate}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
