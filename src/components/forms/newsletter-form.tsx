"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  source?: string;
  submitLabel?: string;
  compact?: boolean;
};

export function NewsletterForm({
  source = "website",
  submitLabel = "Subscribe",
  compact = false,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-6"}>
      <Input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={compact ? "text-pln-ivory placeholder:text-pln-ivory/40" : ""}
      />
      <Button
        type="submit"
        variant={compact ? "gold" : "default"}
        size={compact ? "sm" : "lg"}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Subscribing…" : submitLabel}
      </Button>
      {status === "success" && (
        <p className="text-sm text-pln-gold">Thank you for subscribing.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
