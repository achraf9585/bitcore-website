"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { ShoppingCart, Trash2, CreditCard } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area" // I need to check if ScrollArea exists. If not, I'll use a simple div.
import { Separator } from "@/components/ui/separator"
import { Link } from "@/i18n/routing"
import { useState } from "react"

export function CartSheet() {
  const { items, removeItem, total, isOpen, setIsOpen } = useCart()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
      try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
             name: item.name,
             price: item.price
          }))
        })
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Could not initiate checkout. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white/80 hover:text-white">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col bg-[#0f0518] text-white border-white/10 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-white">Your Cart ({items.length})</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-4">
                    <ShoppingCart size={48} />
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                             <div className="flex-1 space-y-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                {item.description && <p className="text-sm text-white/60 line-clamp-1">{item.description}</p>}
                                <p className="text-sm font-medium text-primary">{item.price}</p>
                             </div>
                             <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                onClick={() => removeItem(item.id)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {items.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-xl">${total.toFixed(2)}</span>
                </div>
                <Button 
                    className="w-full bg-primary text-white hover:bg-primary/90" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={loading}
                >
                    {loading ? "Processing..." : (
                        <>
                            Checkout <CreditCard className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
