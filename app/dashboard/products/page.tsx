"use client"
import Link from "next/link"
import axios from "axios"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

type Product = {
    id: number
    title: string
    price: number
    image: string
    rating: {
        rate: number
        count: number
    }
    category: string
}



export default function Page() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)


    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        if (!apiUrl) {
            console.error("API URL is missing")
            setLoading(false)
            return
        }

        axios.get(apiUrl)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => setLoading(false))
    }, [apiUrl])



    if (loading)
        return (
          <>
            <span className="font-semibold text-3xl">Products</span>
      
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-white p-2 md:p-3 shadow-sm"
                >
                  <Skeleton className="mb-4 h-44 w-full rounded-lg" />
      
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mb-3 h-4 w-3/4" />
      
                  <Skeleton className="mb-3 h-4 w-24" />
      
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-9 w-20 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      

    return (
        <>
            <span className="font-semibold  text-3xl" >Products</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-5 ">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-xl border bg-white p-2 md:p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                        <div className="relative mb-4 flex h-44 items-center justify-center rounded-lg bg-gray-100">

                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-36 object-contain transition-transform duration-300 group-hover:scale-110"
                            />

                            <span className="text-xs hidden md:block absolute left-1.5  top-2 rounded-full bg-black/80 px-3 py-1  text-white">
                                {item.category}
                            </span>


                        </div>

                        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800">
                            {item.title}
                        </h3>

                        <div className="mb-3 flex items-center gap-1 text-sm">
                            <span className="text-yellow-500">★</span>
                            <span className="font-medium text-gray-700">
                                {item.rating.rate}
                            </span>
                            <span className="text-gray-400">
                                ({item.rating.count})
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-green-600">
                                ₹{item.price}
                            </p>

                            <Link href={`/dashboard/products/${item.id}`}>
                                <button className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-800 cursor-pointer">
                                    View
                                </button>
                            </Link>

                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}



