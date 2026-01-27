"use client"

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import type { Metadata } from "next";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { CartProvider } from "@/context/cart-context"
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "SaaS Dashboard",
//   description: "Modern SaaS Admin Dashboard built with Next.js",
// };


export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <CartProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </CartProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}
