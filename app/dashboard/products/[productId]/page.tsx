"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import AddToCart from "@/components/addtocart"
import { useCart } from "@/context/cart-context"

type Product = {
  id: number
  title: string
  description: string
  price: number
  rating: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  stock: number
  discountPercentage: number
  availabilityStatus: string
  returnPolicy: string
}

export default function ProductPage() {
  const params = useParams()
  const productId = params?.productId as string

  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<string>("")

  const apiUrl = process.env.NEXT_PUBLIC_API_URL_PRODUCT

  useEffect(() => {
    if (!productId || !apiUrl) return

    const controller = new AbortController()

    axios
      .get(`${apiUrl}/${productId}`, { signal: controller.signal })
      .then((res) => {
        setProduct(res.data)
        setActiveImage(res.data.thumbnail)
      })
      .catch(console.error)
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [productId, apiUrl])

  if (loading) return <p className="p-6 text-center">Loading...</p>
  if (!product) return <p className="p-6 text-center">Product not found</p>

  return (
    <>
      <span className="font-semibold text-3xl p-6">Product Details</span>

      <div className="min-h-screen bg-gray-50 py-12 md:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-4 shadow-xl border grid md:grid-cols-2 gap-8">

            <div>
              <div className="relative rounded-2xl bg-[#f8f9fa] flex items-center justify-center p-10 mb-4">
                <span className="absolute top-3 left-4 px-3 py-1 bg-white/80 border rounded-full text-xs font-semibold">
                  {product.category}
                </span>

                <img
                  src={activeImage}
                  alt={product.title}
                  className="md:h-120 object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>

            </div>

            <div className="flex flex-col justify-center p-4 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-yellow-100 px-2 py-1 rounded text-sm font-semibold text-yellow-700">
                  ★ {product.rating}
                </span>
                <span className="text-sm text-gray-400">
                  {product.brand}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {product.title}
              </h1>

              <p className="text-gray-500 mb-6 text-sm border-l-4 pl-4">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-gray-400">Price</p>
                  <p className="font-bold text-2xl">₹{product.price}</p>
                </div>

                <div>
                  <p className="text-gray-400">Discount</p>
                  <p className="font-semibold text-green-600">
                    {product.discountPercentage}% OFF
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Stock</p>
                  <p
                    className={`font-semibold ${
                      product.stock > 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Availability</p>
                  <p className="font-semibold">
                    {product.availabilityStatus}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 mb-6 text-sm space-y-2">
                <p>✔ Free Delivery Available</p>
                <p>✔ Easy Returns</p>
                <p>✔ {product.returnPolicy}</p>
              </div>

              <Button
                className="h-14 rounded-2xl bg-black hover:bg-gray-700"
                onClick={() => {
                  addToCart(product)
                  setOpen(true)
                }}
              >
                Add to Cart
              </Button>

              <p className="mt-6 text-center text-xs text-gray-500">
                Secure Checkout • 30-Day Returns
              </p>
            </div>
          </div>
        </div>
      </div>

      <AddToCart open={open} setOpen={setOpen} />
    </>
  )
}
