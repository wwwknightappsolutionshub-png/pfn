"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function BookConsultationModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", date: "", time: "" });
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gold" size="lg" className="mt-12">
          Book Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="text-pln-section-light-body">
        <DialogHeader>
          <DialogTitle>Book a consultation</DialogTitle>
          <DialogDescription>
            Share your details and preferred slot. We will confirm by email or
            phone.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div>
            <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-section-light-heading">
              Name
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="border-pln-navy/20 text-pln-section-light-heading"
            />
          </div>
          <div>
            <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-section-light-heading">
              Phone
            </label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="border-pln-navy/20 text-pln-section-light-heading"
            />
          </div>
          <div>
            <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-section-light-heading">
              Email
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="border-pln-navy/20 text-pln-section-light-heading"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-section-light-heading">
                Preferred date
              </label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                min={new Date().toISOString().split("T")[0]}
                className="border-pln-navy/20 text-pln-section-light-heading"
              />
            </div>
            <div>
              <label className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pln-section-light-heading">
                Preferred time
              </label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                className="border-pln-navy/20 text-pln-section-light-heading"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting…" : "Submit"}
          </Button>
          {status === "success" && (
            <p className="text-center text-sm font-medium text-pln-gold-on-light">
              Thank you — your consultation request was received.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
