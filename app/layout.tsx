// src/app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AnnouncementBar } from "@/app/components/layout/AnnouncementBar"
import  Header  from "@/app/components/layout/Header"
import  Footer  from "@/app/components/layout/Footer/Footer"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StyleHub - Modern E-commerce",
  description: "Discover premium fashion and accessories",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
