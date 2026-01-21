"use client"

import axios from "axios"
import { useEffect, useState } from "react"

type Product = {
  id: number
  title: string
  price: number
  image: string
  description: string
  category: string
  rating: {
    rate: number
    count: number
  }
}

export default function Page({
  params,
}: {
  params: { productId: string }
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${params.productId}`)
      .then((res) => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.productId])

  if (loading) return <p className="p-6">Loading...</p>
  if (!product) return <p className="p-6">Product not found</p>

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <img src={product.image} className="h-72 object-contain" />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="mt-4">{product.description}</p>
        <p className="mt-4 text-green-600 text-2xl">₹{product.price}</p>
      </div>
    </div>
  )
}
