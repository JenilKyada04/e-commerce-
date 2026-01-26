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

type Product = {
    id: number
    title: string
    price: number
    category: string
    rating?: {
        rate: number
        count: number
    }
    stock: number 

}

export default function Page() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [editingId, setEditingId] = useState<number | null>(null)
    const [stock, setStock] = useState("")

    const [drawerOpen, setDrawerOpen] = useState(false)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL!

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const res = await axios.get(apiUrl)
            setProducts(res.data.products)
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
        if (!title || !price || !category || !stock) return;
      
        try {
          const res = await axios.post(`${apiUrl}/add`, {
            title,
            price: Number(price),
            category,
            stock: Number(stock),
          });
      
          const newProduct: Product = {
            ...res.data,
          };
      
          setProducts(prev => [newProduct, ...prev]);
          resetForm();
        } catch (err) {
          console.error(err);
        }
      };
      
      
      

      const updateProduct = async () => {
        if (!editingId) return
      
        try {
          const res = await axios.put(`${apiUrl}/${editingId}`, {
            title,
            price: Number(price),
            category,
            stock: Number(stock), 
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
      

    if (loading) return <p className="p-6">Loading...</p>

    return (
        <>
            <div className="p-6 space-y-6">

                <div className="flex justify-between items-center">

                    <span className="font-semibold text-2xl">Product Details :-</span>
                    <Button onClick={() => {
                        resetForm()
                        setDrawerOpen(true)
                    }}>
                        + Add Product
                    </Button>
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
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {products.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                
                                <TableCell>{item.stock}</TableCell>
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
                    stock={stock} 
                    setStock={setStock} 
                    editingId={editingId}
                    onAdd={addProduct} 
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
