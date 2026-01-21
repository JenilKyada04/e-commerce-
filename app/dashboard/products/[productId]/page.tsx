"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import AddToCart from "@/components/addtocart"
import { useCart } from "@/context/cart-context"
import { Heart } from "lucide-react"

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

export default function ProductPage() {
  const params = useParams()
  const productId = params?.productId as string

  const { cart, addToCart, increaseQty, decreaseQty, removeItem } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!productId) return

    const controller = new AbortController()

    axios
      .get(`https://fakestoreapi.com/products/${productId}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))

    return () => controller.abort()
  }, [productId])

  if (loading) return <p className="p-6 text-center">Loading...</p>
  if (!product) return <p className="p-6 text-center">Product not found</p>

  return (
    <>
    <span className="font-semibold text-3xl p-6">Product Details  </span>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto ">
          <div className="bg-white rounded-3xl p-4 shadow-xl overflow-hidden border border-gray-100 grid md:grid-cols-2">

            {/* Image */}
            <div className="relative rounded-2xl  bg-[#f8f9fa] flex items-center justify-center p-12 group">
              <span className="absolute top-6 left-6 px-3 py-1 bg-white/80 border rounded-full text-xs font-semibold text-gray-600">
                {product.category}
              </span>

              <img
                src={product.image}
                alt={product.title}
                className="h-80 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-yellow-100 px-2 py-1 rounded text-sm font-semibold text-yellow-700">
                  ★ {product.rating.rate}
                </span>
                <span className="text-sm text-gray-400">
                  {product.rating.count} Reviews
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

              <p className="text-gray-500 mb-8 border-l-4 pl-4">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-extrabold">
                  ₹{product.price}
                </span>
                <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded">
                  Free Delivery
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 h-14 rounded-2xl bg-black hover:bg-gray-700"
                  onClick={() => {
                    addToCart(product)
                    setOpen(true)
                  }}
                >
                  Add to Cart
                </Button>

                
              </div>

              <p className="mt-6 text-center text-xs text-gray-400">
                Secure Checkout • 30-Day Returns
              </p>
            </div>
          </div>
        </div>
      </div>

      <AddToCart
        open={open}
        setOpen={setOpen}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeItem={removeItem}
      />
    </>
  )
}
