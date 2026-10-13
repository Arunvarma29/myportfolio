
"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva } from "class-variance-authority"
import { cn } from "cn"

function Tabs({
  className,
  orientation = "vertical",
  ...props
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex min-w-0 gap-6 px-7",
        "flex-col md:flex-row",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list flex w-full shrink-0 flex-col gap-3 ",
  {
    variants: {
      variant: {
        default: "bg-transparent p-0",
        line: "bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        tabsListVariants({ variant }),
        "md:w-60 lg:w-70 xl:w-2xl ",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-h-11 w-full xl:font-mono xl:text-lg items-center xl:h-15 justify-center",
        "rounded-md border border-transparent px-4 py-3",
        "bg-[#27272c] text-sm font-medium text-white",
        "transition-colors duration-200",
        " focus:hover:bg-[#87fd69]",
        "data-active:bg-[#00f85f] data-active:text-[#17171c]",
        "data-active:font-semibold",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#00f5a0]",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "min-w-0 flex-1 pt-1 text-sm ",
        "outline-none focus-visible:outline-none",
        className
      )}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
}
