"use client"

import React, { useEffect, useState } from "react"
import ProductDrawer from "@/components/product-drawer"
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios"

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
import { Input } from "@/components/ui/input"

type Product = {
    id: number
    title: string
    price: number
    category: string
    rating?: {
        rate: number
        count: number
    }
}

export default function Page() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [editingId, setEditingId] = useState<number | null>(null)

    const [drawerOpen, setDrawerOpen] = useState(false)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL!

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const res = await axios.get(apiUrl)
            setProducts(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const addProduct = async () => {
        if (!title || !price || !category) return

        try {
            const res = await axios.post(apiUrl, {
                title,
                price: Number(price),
                category,
                description: "New product",
                image: "https://i.pravatar.cc",
            })

            setProducts([res.data, ...products])
            resetForm()
        } catch (err) {
            console.error(err)
        }
    }

    const updateProduct = async () => {
        if (!editingId) return

        try {
            const res = await axios.put(`${apiUrl}/${editingId}`, {
                title,
                price: Number(price),
                category,
            })

            setProducts(products.map(p => (p.id === editingId ? res.data : p)))
            resetForm()
        } catch (err) {
            console.error(err)
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            await axios.delete(`${apiUrl}/${id}`)
            setProducts(products.filter(p => p.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    const editProduct = (product: Product) => {
        setEditingId(product.id)
        setTitle(product.title)
        setPrice(String(product.price))
        setCategory(product.category)
        setDrawerOpen(true)
    }

    const resetForm = () => {
        setTitle("")
        setPrice("")
        setCategory("")
        setEditingId(null)
        setDrawerOpen(false)
    }

    if (loading) return <p className="p-6">Loading...</p>

    return (
        <>
        <span className="font-semibold text-2xl hover:underline cursor-pointer pl-6.5">Products Details :-</span>
            <div className="p-6 space-y-6">

                <div className="flex gap-4">
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Input
                        placeholder="Price"
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Input
                        placeholder="Category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />

                    <Button onClick={addProduct}>Add</Button>
                </div>

                <Table className="">
                    <TableCaption>Product List</TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">(Edit/Delete)</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {products.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.rating?.count ?? "-"}</TableCell>
                                <TableCell className="text-right">${item.price}</TableCell>

                                <TableCell className="text-right space-x-2">

                                    <button>

                                        <BsThreeDotsVertical onClick={() => editProduct(item)} className="cursor-pointer" />
                                    </button>


                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <ProductDrawer
                    open={drawerOpen}
                    setOpen={setDrawerOpen}
                    title={title}
                    price={price}
                    category={category}
                    setTitle={setTitle}
                    setPrice={setPrice}
                    setCategory={setCategory}
                    editingId={editingId}
                    onUpdate={updateProduct}
                    onDelete={() => {
                        if (editingId) deleteProduct(editingId)
                        resetForm()
                    }}
                    onCancel={resetForm}
                />


            </div>
        </>
    )
} 
