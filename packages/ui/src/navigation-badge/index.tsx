import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-",
  {
    variants: {
      variant: {
        icon: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        number:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        featured:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
      },
    },
    defaultVariants: {
      variant: "number",
    },
  }
);

export interface NavigationBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function NavigationBadge({
  className,
  variant,
  ...props
}: NavigationBadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { NavigationBadge, badgeVariants };
