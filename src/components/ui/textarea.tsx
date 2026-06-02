import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[120px] w-full border-b border-pln-charcoal/20 bg-transparent px-0 py-2 text-base transition-colors placeholder:text-pln-charcoal-muted focus-visible:border-pln-gold focus-visible:outline-none dark:border-pln-ivory/20",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
