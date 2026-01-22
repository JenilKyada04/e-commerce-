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

  username: string
  phone: string
  email: string

  setusername: (v: string) => void
  setphone: (v: string) => void
  setemail: (v: string) => void

  editingId: number | null
  onUpdate: () => void
  onDelete: () => void
  onCancel: () => void
}

export default function UserDrawer({
  open,
  setOpen,
  username,
  phone,
  email,
  setusername,
  setphone,
  setemail,
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
            <DrawerTitle>Edit User</DrawerTitle>
            <DrawerDescription>
              Update or delete this User.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3">
              <label htmlFor="Name">Name:</label>
              <Input
                placeholder="username"
                value={username}
                onChange={e => setusername(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="Name">phone:</label>
              <Input
                placeholder="phone"
                type="phone"
                value={phone}
                onChange={e => setphone(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="Name">email:</label>
              <Input
                placeholder="email"
                value={email}
                onChange={e => setemail(e.target.value)}
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
