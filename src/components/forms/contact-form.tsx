"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const fieldClass =
  "border-pln-navy/20 text-pln-section-light-body placeholder:text-pln-section-light-muted focus-visible:border-pln-gold-on-light";

const labelClass =
  "font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-gold-on-light";

const inquiryTypes = [
  { value: "general", label: "General Contact" },
  { value: "speaking", label: "Speaking Invitation" },
  { value: "consultancy", label: "Consultancy Inquiry" },
  { value: "mentoring", label: "Life Mentoring" },
  { value: "event", label: "Event Registration" },
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    inquiryType: "general",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        inquiryType: "general",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className={cn("mb-2 block", labelClass)}>Name</label>
          <Input
            className={fieldClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={cn("mb-2 block", labelClass)}>Email</label>
          <Input
            className={fieldClass}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <label className={cn("mb-2 block", labelClass)}>Phone (optional)</label>
        <Input
          className={fieldClass}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div>
        <label className={cn("mb-2 block", labelClass)}>Inquiry Type</label>
        <select
          className={cn(
            "w-full border-b bg-transparent py-2 focus:outline-none",
            fieldClass,
          )}
          value={form.inquiryType}
          onChange={(e) =>
            setForm({ ...form, inquiryType: e.target.value })
          }
        >
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={cn("mb-2 block", labelClass)}>Message</label>
        <Textarea
          className={fieldClass}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={5}
        />
      </div>
      <Button type="submit" variant="gold" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Inquiry"}
      </Button>
      {status === "success" && (
        <p className="font-sans text-sm text-pln-gold-on-light">
          Your message has been received.
        </p>
      )}
      {status === "error" && (
        <p className="font-sans text-sm text-red-700">
          Failed to send. Please try again.
        </p>
      )}
    </form>
  );
}
