import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pln-gold disabled:pointer-events-none disabled:opacity-50 max-sm:whitespace-normal max-sm:text-center sm:whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-pln-navy text-pln-ivory hover:bg-pln-navy-light dark:bg-pln-gold dark:text-pln-navy dark:hover:bg-pln-gold-muted",
        outline:
          "border border-pln-navy/30 bg-transparent hover:border-pln-gold hover:text-pln-gold dark:border-pln-ivory/30",
        ghost: "hover:text-pln-gold",
        gold: "bg-pln-gold text-pln-navy hover:bg-pln-gold-muted",
      },
      size: {
        default: "h-11 px-5 py-2 sm:px-6",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base tracking-wide sm:px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
