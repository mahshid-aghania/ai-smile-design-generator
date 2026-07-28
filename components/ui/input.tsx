import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3.5 py-2 text-base text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground-muted)]/60 focus-visible:border-[var(--primary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--ring)]/25 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
