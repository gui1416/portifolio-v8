import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { Sidebar } from "@/components/sidebar"
import { SonnerProvider } from "@/components/sonner-provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Guilherme | Portfolio",
  description: "Professional portfolio for Guilherme",
  icons: {
    icon: "/app/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-6 md:p-10 ml-0 lg:ml-20 pt-safe transition-all duration-300 w-full">
                {children}
              </main>
            </div>
          </SidebarProvider>
          <SonnerProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
