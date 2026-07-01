import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-white shadow-[0_4px_16px_-4px_rgba(29,78,216,0.40)] hover:bg-[var(--primary-hover)] hover:shadow-[0_6px_20px_-4px_rgba(29,78,216,0.55)] active:bg-[var(--primary-active)]",
        secondary:
          "border border-[var(--border-subtle)] bg-white text-[var(--foreground)] shadow-sm hover:border-blue-300 hover:bg-blue-50",
        ghost:
          "text-[var(--foreground-muted)] hover:bg-black/[0.04] hover:text-[var(--foreground)]",
        gold:
          "bg-amber-500 text-white shadow-[0_4px_16px_-4px_rgba(217,119,6,0.40)] hover:bg-amber-600 active:bg-amber-700",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
