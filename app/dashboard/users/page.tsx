"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type User = {
  id: number
  email: string
  username: string
  name: {
    firstname: string
    lastname: string
  }
  phone: string
}



export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL_CART

  useEffect(() => {

    if (!apiUrl) {
            console.error("API URL is missing")
            setLoading(false)
            return
    }
    axios.get(apiUrl)
      .then((res) => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="p-4">Loading users...</p>
  }

  return (
    <>
    <span className="font-semibold text-2xl hover:underline cursor-pointer">User Details :-</span>
      <Table className="mt-5">

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.name.firstname} {user.name.lastname}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
