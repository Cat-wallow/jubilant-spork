import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "src/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-bold font-dm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[rgba(103,80,164,0.08)] text-[#2B3674]",
        active:
          "bg-[rgba(207,247,211,1)] text-[#404040]",
        inactive:
          "bg-[rgba(255,241,194,1)] text-[#404040]",
        destructive:
          "bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
