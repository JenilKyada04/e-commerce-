"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BsThreeDotsVertical } from "react-icons/bs"

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
import UserDrawer from "@/components/user-drawer"

type User = {
  id: number
  name: {
    firstname: string
    lastname: string
  } | null
  username: string
  email: string
  phone: string
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL_USER!

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get(apiUrl)
      setUsers(res.data)
  } catch (err) {
      console.error(err)
  } finally {
      setLoading(false)
  }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = async () => {
    if (!username || !email || !phone) return
  
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
  
    const newUser = {
      id: newId,
      username,
      email,
      
      phone,
      name: { firstname: "New", lastname: "User" },
    }
  
    setUsers([newUser, ...users])
    resetForm()
  }

// const addUser = async () => {
//   if (!username || !email || !phone) return;

//   try {
//     const res = await axios.post(apiUrl, {
//       username,
//       email,
//       phone,
//       password: "pass123",
//     });

//     const newUser = { ...res.data, tempId: Date.now() }; 
//     setUsers([newUser, ...users]);
//     resetForm();
//   } catch (err) {
//     console.error(err);
//     return;
//   }
// };

  

  const updateUser = async () => {
    if (!editingId) return

    const updatedUser = {
      username,
      email,
      password: "pass123",
      phone,
    }

    try {
      const response = await axios.put(`${apiUrl}/${editingId}`, updatedUser)

      setUsers(users.map(u => (u.id === editingId ? { ...response.data, name: response.data.name || { firstname: "", lastname: "" } } : u)))
      resetForm()
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const deleteUser = async (id: number) => {
    if (!id) return

    try {
      await axios.delete(`${apiUrl}/${id}`)
      setUsers(users.filter(u => u.id !== id))
      resetForm()
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const editUser = (user: User) => {
    setEditingId(user.id)
    setUsername(user.username)
    setEmail(user.email)
    setPhone(user.phone)
    setDrawerOpen(true)
  }

  const resetForm = () => {
    setUsername("")
    setEmail("")
    setPhone("")
    setEditingId(null)
    setDrawerOpen(false)
  }

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-2xl">User Details :-</span>
        <Button
          onClick={() => {
            resetForm()
            setDrawerOpen(true)
          }}
        >
          + Add User
        </Button>
      </div>

      <Table>
        <TableCaption>User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.name?.firstname} {user.name?.lastname}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell className="text-right space-x-2">
                <button
                  onClick={() => editUser(user)}
                  className="cursor-pointer px-4"
                >
                  <BsThreeDotsVertical />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        username={username}
        email={email}
        phone={phone}
        setusername={setUsername}
        setemail={setEmail}
        setphone={setPhone}
        editingId={editingId}
        onAdd={addUser}
        onUpdate={updateUser}
        onDelete={() => {
          if (editingId) deleteUser(editingId)
        }}
        onCancel={resetForm}
      />
    </div>
  )
}
