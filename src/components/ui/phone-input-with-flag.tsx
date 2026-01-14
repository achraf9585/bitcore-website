"use client"

import * as React from "react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { cn } from "@/lib/utils"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  placeholder?: string
}

export function PhoneInputWithFlag({ value, onChange, disabled, className, placeholder }: PhoneInputProps) {
  return (
    <div className={cn("relative", className)}>
      <PhoneInput
        international
        defaultCountry="US"
        value={value}
        onChange={(val) => onChange(val || "")}
        disabled={disabled}
        placeholder={placeholder || "Enter phone number"}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>.PhoneInputCountry]:mr-2 [&>.PhoneInputCountry]:flex [&>.PhoneInputCountry]:items-center [&>.PhoneInputInput]:flex-1 [&>.PhoneInputInput]:bg-transparent [&>.PhoneInputInput]:outline-none [&>.PhoneInputInput]:text-sm"
      />
    </div>
  )
}
