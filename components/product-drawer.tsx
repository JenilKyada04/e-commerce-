"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Trash2, X } from "lucide-react"

type ProductDrawerProps = {
  open: boolean
  setOpen: (open: boolean) => void

  title: string
  price: string
  category: string
  stock: string

  setTitle: (v: string) => void
  setPrice: (v: string) => void
  setCategory: (v: string) => void
  setStock: (v: string) => void

  editingId: number | null
  onAdd: () => void
  onUpdate: () => void
  onDelete: () => void
  onCancel: () => void
}

export default function ProductDrawer({
  open,
  setOpen,
  title,
  price,
  category,
  stock,
  setTitle,
  setPrice,
  setCategory,
  setStock,
  editingId,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}: ProductDrawerProps) {
  const isEdit = Boolean(editingId)

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="ml-auto h-screen w-full max-w-md rounded-none border-l bg-background flex flex-col">

        <DrawerHeader className="border-b px-6 py-5">
          <DrawerTitle className="text-xl font-semibold">
            {isEdit ? "Edit Product" : "Add Product"}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground">
            {isEdit
              ? "Update product details or delete the product."
              : "Fill in the details to add a new product."}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 space-y-5 px-6 py-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Name</label>
            <Input
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Input
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Stock</label>
            <Input
              type="number"
              placeholder="Enter stock quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        <DrawerFooter className="border-t px-6 py-4">
          <div className="flex gap-3">
            <Button
              onClick={isEdit ? onUpdate : onAdd}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? "Save Changes" : "Add Product"}
            </Button>

            {isEdit && (
              <Button
                variant="destructive"
                onClick={onDelete}
                className="flex-1"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
          </div>

          <DrawerClose asChild>
            <Button
              variant="ghost"
              onClick={onCancel}
              className="mt-3 w-full bg-gray-200"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>

      </DrawerContent>
    </Drawer>
  )
}
