import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full border-b border-pln-charcoal/20 bg-transparent px-0 py-2 text-base transition-colors placeholder:text-pln-charcoal-muted focus-visible:border-pln-gold focus-visible:outline-none dark:border-pln-ivory/20",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
