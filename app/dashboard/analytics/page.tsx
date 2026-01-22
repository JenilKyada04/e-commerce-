"use client"

import React, { useEffect, useState } from "react"
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

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

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

    // Fetch products
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

    // Add product
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

    // Update product
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

    // Delete product
    const deleteProduct = async (id: number) => {
        try {
            await axios.delete(`${apiUrl}/${id}`)
            setProducts(products.filter(p => p.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    // Edit product → open drawer
    const editProduct = (product: Product) => {
        setEditingId(product.id)
        setTitle(product.title)
        setPrice(String(product.price))
        setCategory(product.category)
        setDrawerOpen(true)
    }

    // Reset form
    const resetForm = () => {
        setTitle("")
        setPrice("")
        setCategory("")
        setEditingId(null)
        setDrawerOpen(false)
    }

    if (loading) return <p className="p-6">Loading...</p>

    return (
        <div className="p-6 space-y-6">

            {/* Add Product Section */}
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

            {/* Table */}
            <Table>
                <TableCaption>Product List</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
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
                                <Button size="sm" onClick={() => editProduct(item)}>
                                    Edit
                                </Button>

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deleteProduct(item.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
                <DrawerContent className="p-6 max-w-md ml-auto">
                    <DrawerHeader>
                        <DrawerTitle>Edit Product</DrawerTitle>
                        <DrawerDescription>
                            Update or delete this product.
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="space-y-4 mt-4">
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
                    </div>

                    <DrawerFooter className="mt-6 flex gap-3">
                        <Button onClick={updateProduct} className="flex-1">
                            Update
                        </Button>

                        {editingId && (
                            <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={() => {
                                    deleteProduct(editingId)
                                    resetForm()
                                }}
                            >
                                Delete
                            </Button>
                        )}

                        <DrawerClose asChild>
                            <Button variant="outline" className="flex-1" onClick={resetForm}>
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </div>
    )
} 
