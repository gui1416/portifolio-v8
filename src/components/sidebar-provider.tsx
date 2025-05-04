"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type SidebarContextType = {
  isOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  // Check if we're on a larger screen on initial load and on resize
  useEffect(() => {
    const checkScreenSize = () => {
      // Only auto-open on desktop screens
      setIsOpen(window.innerWidth >= 1024)
    }

    // Set initial state
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)
  const closeSidebar = () => {
    // Only close on mobile
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
  }

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
