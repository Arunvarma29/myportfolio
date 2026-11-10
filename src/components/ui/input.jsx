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
        "flex h-12 rounded-md border border-border focus:border-accent font-light bg-card px-4 py-4 text-base text-card-foreground placeholder:text-muted-foreground outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
