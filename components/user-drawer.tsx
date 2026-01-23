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
import { Save, Trash2, X, User, Phone, Mail } from "lucide-react"

type UserDrawerProps = {
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
}: UserDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="ml-auto h-screen w-full max-w-md rounded-none border-l bg-background">
        <DrawerHeader className="border-b px-6 py-5">
          <DrawerTitle className="text-xl font-semibold">
            Edit User
          </DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground">
            Update user details or remove the user permanently.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 space-y-5 px-6 py-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t px-6 py-4">
          <div className="flex gap-3">
            <Button onClick={onUpdate} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>

            {editingId && (
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
              className="mt-3 w-full"
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
