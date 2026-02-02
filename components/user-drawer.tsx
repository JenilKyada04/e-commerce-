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

  lastName: string
  username: string
  email: string
  phone: string

  setLastName: (v: string) => void
  setUsername: (v: string) => void
  setEmail: (v: string) => void
  setPhone: (v: string) => void

  editingId: number | null
  onAdd: () => void
  onUpdate: () => void
  onDelete: () => void
  onCancel: () => void
}


export default function UserDrawer({
  open,
  setOpen,
  lastName,
  username,
  email,
  phone,
  setLastName,
  setUsername,
  setEmail,
  setPhone,
  editingId,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}: UserDrawerProps) {
  const isEdit = Boolean(editingId)

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="ml-auto h-screen w-full max-w-md rounded-none border-l bg-background flex flex-col">

        <DrawerHeader className="border-b px-6 py-5">
          <DrawerTitle className="text-xl font-semibold">
            {isEdit ? "Edit User" : "Add User"}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground">
            {isEdit
              ? "Update user details or delete the user."
              : "Fill in the details to add a new user."}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 space-y-5 px-6 py-6">
          <form action="">


            <label className="text-sm font-medium">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Enter username"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPhone(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

          </form>
        </div>

        <DrawerFooter className="border-t px-6 py-4">
          <div className="flex gap-3">
            <Button
              onClick={isEdit ? onUpdate : onAdd}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? "Save Changes" : "Add User"}
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
