import type { ReactNode } from "react";

/** Passthrough root — each route group supplies its own document shell (see Payload docs). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
