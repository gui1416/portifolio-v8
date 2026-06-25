"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

type SidebarContextType = {
  isOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

const DESKTOP_OPEN_STORAGE_KEY = "sidebar:desktop-open"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const getDesktopPreference = () => {
      const stored = window.localStorage.getItem(DESKTOP_OPEN_STORAGE_KEY)
      return stored === null ? true : stored === "true"
    }

    const applyForWidth = (width: number) => {
      setIsOpen(width >= 1024 ? getDesktopPreference() : false)
    }

    applyForWidth(window.innerWidth)

    const handleResize = () => applyForWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev
      if (window.innerWidth >= 1024) {
        window.localStorage.setItem(DESKTOP_OPEN_STORAGE_KEY, String(next))
      }
      return next
    })
  }, [])

  const closeSidebar = useCallback(() => setIsOpen(false), [])

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
