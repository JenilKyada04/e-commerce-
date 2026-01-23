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
import { Input } from "@/components/ui/input"
import UserDrawer from "@/components/user-drawer"

type User = {
  id: number
  name: {
    firstname: string
    lastname: string
  }
  username: string
  email: string
  phone: string
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL_USER


  useEffect(() => {
    if (!apiUrl) {
      console.error("API URL is missing")
      setLoading(false)
      return
    }

    axios.get(apiUrl)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  const addUser = () => {
    if (!username || !email || !phone) return

    const newUser: User = {
      id: Date.now(),
      username,
      email,
      phone,
      name: {
        firstname: "New",
        lastname: "User",
      },
    }

    setUsers([newUser, ...users])
    resetForm()
  }

  const updateUser = () => {
    if (!editingId) return

    setUsers(prev =>
      prev.map(user =>
        user.id === editingId
          ? { ...user, username, email, phone, }
          : user
      )
    )
    resetForm()
  }

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  const editUser = (user: User) => {
    setEditingId(user.id)
    setusername(user.username)
    setemail(user.email)
    setphone(user.phone)
    setDrawerOpen(true)
  }

  const resetForm = () => {
    setusername("")
    setemail("")
    setphone("")
    setEditingId(null)
    setDrawerOpen(false)

  }

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <>

      <div className="p-4 space-y-6">
        <span className="font-semibold text-2xl">User Details :-</span>
        <div className="flex gap-4 mt-5">
          <Input
            placeholder="Username"
            value={username}
            onChange={e => setusername(e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={e => setphone(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <Button onClick={addUser}>Add</Button>
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
                  {user.name.firstname} {user.name.lastname}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-right space-x-2">
                  <button onClick={() => editUser(user)} className="cursor-pointer px-4"  >
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
          setusername={setusername}
          setemail={setemail}
          setphone={setphone}
          editingId={editingId}
          onUpdate={updateUser}
          onDelete={() => {
            if (editingId) deleteUser(editingId)
            resetForm()
          }}
          onCancel={resetForm}
        />
      </div>
    </>
  )
}

