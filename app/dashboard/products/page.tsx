import React from 'react'
import Link from 'next/link'

function page() {
  return (
   <Link href="/products" className='underline' >Go to Products website </Link>
  )
}

export default page
