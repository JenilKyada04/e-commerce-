"use client"

import Link from "next/link"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Suspense } from "react"
import Navrightside from "@/components/navrightside"

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
  category: string
}

// const apiUrl = process.env.NEXT_PUBLIC_API_URL!
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL!


// const [products, setProducts] = useState<Product[]>([])
// const [isLoading, setisLoading] = useState(true)

// useEffect(() => {
//   axios
//     .get(apiUrl)
//     .then((res) => {
//       setProducts(res.data.products) 
//     })
//     .catch(console.error)
//     .finally(() => setisLoading(false))
// }, [])



const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(apiUrl+"products")
  return res.data.products
}

export default function Page() {

  const { data: products, isLoading, isError, error, } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })




  if (isLoading) {
    return (
      <>
        <span className="font-semibold text-3xl">Products</span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white p-3 shadow-sm">
              <Skeleton className="mb-4 h-44 w-full rounded-lg" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-3 h-4 w-3/4" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </>
    )
  }

  if (isError) {
    return <p className="text-red-500">Error: {(error as Error).message}</p>
  }

  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <div className="bg-gray-100" >

          <div className=" flex items-center justify-between  m-3 border-b-4 max-w-360 mx-auto pl-10 md:pl-0 " >
            <span className="font-semibold text-3xl p-4 md:block hidden ">Products</span>
            <Navrightside />
          </div>

          <div className="mt-5 ">



            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-5 md:p-4 p-2 max-w-360 mx-auto ">
              {products?.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-xl border bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative mb-4 flex h-44 items-center justify-center rounded-lg bg-gray-100">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-36 object-contain transition group-hover:scale-110"
                    />

                    <span className="absolute left-2 top-2 rounded-full bg-black/80 px-3 py-1 text-xs text-white">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="mb-2 line-clamp-2 text-sm font-semibold">
                    {item.title}
                  </h3>

                  <div className="mb-3 flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{item.rating}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-green-600">
                      ₹{item.price}
                    </p>

                    <Link href={`/products/${item.id}`}>
                      <button className="rounded-lg bg-black px-4 py-2 text-xs text-white hover:bg-gray-800">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Footer />
          </div>
        </div>
      </Suspense>
    </>
  )
}
