import type { Metadata } from "next";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaS Dashboard",
  description: "Modern SaaS Admin Dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
         <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
   
  );
}
