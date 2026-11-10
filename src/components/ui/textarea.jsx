import * as React from "react"
import { cn } from "cn"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full min-h-20 rounded-md border border-border bg-card px-4 py-5 text-base text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
