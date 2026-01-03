"use client"

import React, { createContext, useContext, useState, useEffect } from "react"


export interface CartItem {
  id: string
  name: string
  price: string
  description?: string
  serviceSlug?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration fix
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("cart-items")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse cart items", e)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart-items", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }])
    setIsOpen(true)
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const parsePrice = (priceStr: string) => {
    // Remove non-numeric characters except dot
    const clean = priceStr.toLowerCase().replace(/[^0-9.]/g, "")
    const val = parseFloat(clean)
    return isNaN(val) ? 0 : val
  }

  const total = items.reduce((acc, item) => acc + parsePrice(item.price), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isOpen, setIsOpen, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
