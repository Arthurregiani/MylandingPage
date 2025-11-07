"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-[#073642]/60 px-4 py-3 text-sm text-[#eee8d5] placeholder:text-[#93a1a1]/70 shadow-inner shadow-black/20 transition focus:border-[#268bd2]/70 focus:outline-none focus:ring-2 focus:ring-[#268bd2]/40",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
