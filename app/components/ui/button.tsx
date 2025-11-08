"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold tracking-wide text-[var(--color-heading)] shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(120deg,#2aa198_0%,#268bd2_30%,#6c71c4_60%,#cb4b16_90%)] text-[#002b36] hover:brightness-110",
        vivid:
          "bg-[linear-gradient(130deg,var(--button-vivid-start)_0%,var(--button-vivid-mid)_50%,var(--button-vivid-end)_100%)] text-[var(--button-vivid-text)] hover:brightness-110",
        outline:
          "border-[#b58900]/50 bg-transparent text-[#b58900] hover:border-[#cb4b16] hover:bg-[#cb4b16]/10",
        ghost:
          "border-transparent bg-transparent text-[var(--color-muted)] hover:text-[var(--color-heading)]",
        secondary:
          "border-transparent bg-[var(--button-secondary-bg)] text-[var(--color-heading)] hover:bg-[var(--button-secondary-hover)]",
        cta:
          "bg-[linear-gradient(120deg,var(--button-cta-start)_0%,var(--button-cta-mid)_55%,var(--button-cta-end)_110%)] text-[var(--button-cta-text)] shadow-[0_20px_45px_rgba(0,0,0,0.25)] hover:opacity-95",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
