"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:rgb(var(--color-surface-rgb))/0.6] px-4 py-3 text-sm text-[var(--color-heading)] placeholder:text-[color:rgb(var(--color-muted-rgb))/0.7] shadow-inner shadow-black/20 transition focus:border-[#268bd2]/70 focus:outline-none focus:ring-2 focus:ring-[#268bd2]/40",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
