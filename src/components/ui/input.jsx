import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 rounded-md border border-white/10 focus:border-accent font-light bg-primary px-4 py-4 text-base placeholder:text-gray-400 outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
