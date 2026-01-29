"use client"

import { useState } from "react"
import axios from "axios"
import { BsThreeDots } from "react-icons/bs"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useQueryState } from "nuqs"
import { Skeleton } from "@/components/ui/skeleton"

import ProductDrawer from "@/components/product-drawer"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

type Product = {
  id: number
  title: string
  price: number
  category: string
  stock: number
  rating?: {
    rate: number
    count: number
  }
}


const apiUrl = process.env.NEXT_PUBLIC_API_URL!

const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(apiUrl)
  return res.data.products
}


export default function Page() {

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useQueryState("q", {
    defaultValue: "",
  })

  const queryClient = useQueryClient()

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })


  const addProductMutation = useMutation({
    mutationFn: (newProduct: Omit<Product, "id">) =>
      axios.post(`${apiUrl}/add`, newProduct),

    onSuccess: (res) => {
      queryClient.setQueryData<Product[]>(["products"], old =>
        old ? [res.data, ...old] : [res.data]
      )
      resetForm()
    },
  })


  const updateProductMutation = useMutation({
    mutationFn: (p: Product) =>
      axios.patch(`${apiUrl}/${p.id}`, {
        title: p.title,
        price: p.price,
        category: p.category,
        stock: p.stock,
      }),

    onSuccess: ({ data }) => {
      queryClient.setQueryData<Product[]>(["products"], old =>
        old?.map(p => (p.id === data.id ? data : p)) ?? []
      )
      resetForm()
    },
  })



  const deleteProductMutation = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${apiUrl}/${id}`),

    onSuccess: (_, id) => {
      queryClient.setQueryData<Product[]>(["products"], old =>
        old?.filter(p => p.id !== id) ?? []
      )
      resetForm()
    },
  })


  const addProduct = () => {
    if (!title || !price || !category || !stock) return

    addProductMutation.mutate({
      title,
      price: Number(price),
      category,
      stock: Number(stock),
    })
  }

  const updateProduct = () => {
    if (!editingId) return

    updateProductMutation.mutate({
      id: editingId,
      title,
      price: Number(price),
      category,
      stock: Number(stock),
    })
  }

  const deleteProduct = () => {
    if (!editingId) return
    deleteProductMutation.mutate(editingId)
  }

  const editProduct = (product: Product) => {
    setEditingId(product.id)
    setTitle(product.title)
    setPrice(String(product.price))
    setCategory(product.category)
    setStock(String(product.stock))
    setDrawerOpen(true)
  }

  const resetForm = () => {
    setTitle("")
    setPrice("")
    setCategory("")
    setStock("")
    setEditingId(null)
    setDrawerOpen(false)
  }


  if (isLoading) return <p className="p-6">Loading...</p>
  if (isError) return <p className="p-6">Error: {(error as Error).message}</p>


const TableSkeleton = ({ rows = 10 }: { rows?: number }) => (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 6 }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Product Details</h2>

        <div className="flex gap-3">
          <input type="text" placeholder="search products"
           value={search || ''} onChange={e => setSearch(e.target.value)}
            className="hover:bg-gray-200 p-1 rounded-xl pl-6   ring-1  "
          />
          <Button
            onClick={() => {
              resetForm()
              setDrawerOpen(true)
            }}
            className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            + Add Product
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableCaption className="text-center text-gray-500 py-2">Product List</TableCaption>

          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-gray-600">ID</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Title</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Category</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Stock</TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-600">Price</TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-600">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              products.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <TableCell className="px-4 py-2">{item.id}.</TableCell>
                  <TableCell className="px-4 py-2 flex flex-col">
                    <span className="font-medium">{item.title}</span>
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <span className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium">
                      {item.category}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <span
                      className={`text-sm font-medium ${item.stock < 10 ? "text-red-500" : "text-green-600"
                        }`}
                    >
                      {item.stock} in stock
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right font-semibold">
                    ${item.price}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    <button
                      onClick={() => editProduct(item)}
                      className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer "
                    >
                      <BsThreeDots className="text-gray-600 " />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          
        </Table>
      </div>

      <ProductDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        title={title}
        price={price}
        category={category}
        stock={stock}
        setTitle={setTitle}
        setPrice={setPrice}
        setCategory={setCategory}
        setStock={setStock}
        editingId={editingId}
        onAdd={addProduct}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
        onCancel={resetForm}
      />
    </div>


  )
}
