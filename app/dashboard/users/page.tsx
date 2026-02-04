"use client"

import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import interceptor from "@/lib/intercepter"

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
import { Skeleton } from "@/components/ui/skeleton"
import UserDrawer from "@/components/user-drawer"
import { useQueryState } from "nuqs"

type User = {
  id: number
  firstName?: string
  lastName: string
  username: string
  email: string
  phone: string
}

const fetchUsers = async (): Promise<User[]> => {
  const res = await interceptor.get("users")
  return res.data.users
}

export default function Page() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  
  const [editingId, setEditingId] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [search, setSearch] = useQueryState("q", { defaultValue: "" })

  const queryClient = useQueryClient()

  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes((search || "").toLowerCase())
  )

  const addUserMutation = useMutation({
    mutationFn: (newUser: Partial<User>) =>
      interceptor.post(`add`, newUser),
    onSuccess: res => {

      // queryClient.invalidateQueries(["users"])

      queryClient.setQueryData<User[]>(["users"], old =>
        old ? [res.data, ...old] : [res.data]
      )
      resetForm()
    },
  })

  const updateUserMutation = useMutation({
    mutationFn: (user: Partial<User> & { id: number }) =>
      interceptor.put(`${user.id}`, user),
    onSuccess: res => {
      queryClient.setQueryData<User[]>(["users"], old =>
        old?.map(u => (u.id === res.data.id ? res.data : u)) ?? []
      )
      resetForm()
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => interceptor.delete(`${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData<User[]>(["users"], old =>
        old?.filter(u => u.id !== id) ?? []
      )
      resetForm()
    },
  })

  const addUser = () => {
    if (!lastName || !username || !email || !phone) return
    addUserMutation.mutate({ firstName, lastName, username, email, phone })
  }

  const updateUser = () => {
    if (!editingId) return
    updateUserMutation.mutate({ id: editingId, firstName, lastName, username, email, phone })
  }

  const deleteUser = () => {
    if (!editingId) return
    deleteUserMutation.mutate(editingId)
  }

  const editUser = (user: User) => {
    setEditingId(user.id)
    setFirstName(user.firstName || "")
    setLastName(user.lastName)
    setUsername(user.username)
    setEmail(user.email)
    setPhone(user.phone)
    setDrawerOpen(true)
  }

  const resetForm = () => {
    setFirstName("")
    setLastName("")
    setUsername("")
    setEmail("")
    setPhone("")
    setEditingId(null)
    setDrawerOpen(false)
  }

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

  if (isError) {
    return <div className="p-6">Error: {(error as Error).message}</div>
  }

  return (
    <div className="space-y-6 bg-gray-50 rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">User Details</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by email"
            value={search || ""}
            onChange={e => setSearch(e.target.value)}
            className="hover:bg-gray-200 p-1 rounded-xl pl-6 ring-1"
          />
          <Button
            onClick={() => {
              resetForm()
              setDrawerOpen(true)
            }}
            className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            + Add User
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableCaption className="text-center text-gray-500 py-2">User List</TableCaption>

          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-gray-600">ID</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Name</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Username</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Email</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Phone</TableHead>
              <TableHead className="px-4 py-2 text-right text-gray-600">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <TableSkeleton />
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
                <TableRow key={user.id} className="hover:bg-gray-50 transition duration-150">
                  <TableCell className="px-4 py-2">{user.id}.</TableCell>
                  <TableCell className="px-4 py-2">{user.lastName}</TableCell>
                  <TableCell className="px-4 py-2">{user.username}</TableCell>
                  <TableCell className="px-4 py-2">{user.email}</TableCell>
                  <TableCell className="px-4 py-2">{user.phone}</TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    <button
                      onClick={() => editUser(user)}
                      className="p-2 rounded-full hover:bg-gray-200 transition"
                    >
                      <BsThreeDots className="text-gray-600" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <UserDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        lastName={lastName}
        username={username}
        email={email}
        phone={phone}
        setLastName={setLastName}
        setUsername={setUsername}
        setEmail={setEmail}
        setPhone={setPhone}
        editingId={editingId}
        onAdd={addUser}
        onUpdate={updateUser}
        onDelete={deleteUser}
        onCancel={resetForm}
      />
    </div>
  )
}
