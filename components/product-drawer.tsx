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

type ProductDrawerProps = {
  open: boolean
  setOpen: (open: boolean) => void

  title: string
  price: string
  category: string

  setTitle: (v: string) => void
  setPrice: (v: string) => void
  setCategory: (v: string) => void

  editingId: number | null
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
  setTitle,
  setPrice,
  setCategory,
  editingId,
  onUpdate,
  onDelete,
  onCancel,
}: ProductDrawerProps) {
  return (
    <>


      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="p-6 max-w-md ml-auto">
          <DrawerHeader>
            <DrawerTitle>Edit Product</DrawerTitle>
            <DrawerDescription>
              Update or delete this product.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3">
              <label htmlFor="Name">Name:</label>
              <Input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="Name">Price:</label>
              <Input
                placeholder="Price"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="Name">Category:</label>
              <Input
                placeholder="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </div>
          </div>

          <DrawerFooter className="mt-6 flex gap-3">
            <Button onClick={onUpdate} className="flex-1">
              Update
            </Button>

            {editingId && (
              <Button
                variant="destructive"
                className="flex-1"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}

            <DrawerClose asChild>
              <Button
                variant="outline"
                className="flex-1"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
