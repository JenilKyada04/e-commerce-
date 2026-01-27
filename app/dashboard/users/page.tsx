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
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"

type User = {
  id: number
  firstName?: string
  lastName: string
  username: string
  email: string
  phone: string
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
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
      setUsers(res.data.users)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // const getpostdata = async () =>{
  //       try {
  //           const res = await axios.get(apiUrl);
  //           return res.status === 200 ? res.data : [];
  //       } catch (error) {
  //           console.log(error)
  //           return [];
  //       }
  //   }


  // useQuery<any>({
  //   queryKey : ["users"],
  //   queryFn : getpostdata
  // })





  const addUser = async () => {
    if (!lastName || !username || !email || !phone) return

    try {
      const res = await axios.post(`${apiUrl}/add`, {
        
        firstName,
        lastName,
        username,
        email,
        phone,
      })

      const newUser: User = {
        ...res.data,
      }

      setUsers(prev => [newUser, ...prev])
      resetForm()
    } catch (err) {
      console.error(err)
    }
  }

  const updateUser = async () => {
    if (!editingId) return

    try {
      const res = await axios.put(`${apiUrl}/${editingId}`, {
        firstName,
        lastName,
        username,
        email,
        phone,
      })

      setUsers(prev => [res.data, ...prev])
      resetForm()
    } catch (err) {
      console.error(err)
    }
  } 

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      setUsers(prev => prev.filter(user => user.id !== id))
    } catch (err) {
      console.error(err)
    }
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

  const TableSkeleton = ({ rows = 15 }: { rows?: number }) => (
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">User Details</h2>
        <Button onClick={() => {
          resetForm()
          setDrawerOpen(true)
        }}>
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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableSkeleton rows={10} />
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-right">
                  <button onClick={() => editUser(user)}>
                    <BsThreeDotsVertical className="cursor-pointer" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
        onDelete={() => editingId && deleteUser(editingId)}
        onCancel={resetForm}
      />
    </div>
  )
}
