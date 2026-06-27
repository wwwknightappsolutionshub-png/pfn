"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type WhatsAppChatConfig = {
  number: string;
  defaultMessage: string;
};

type ChatMessage = {
  id: string;
  role: "agent" | "user";
  text: string;
  time: string;
};

type WhatsAppChatContextValue = {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
};

const WhatsAppChatContext = createContext<WhatsAppChatContextValue | null>(
  null,
);

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createMessage(role: ChatMessage["role"], text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    time: formatTime(),
  };
}

function WhatsAppChatPanel({
  config,
  open,
  onClose,
}: {
  config: WhatsAppChatConfig;
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage(
      "agent",
      "Hello! Send us a message here and our team will reply as soon as possible.",
    ),
  ]);
  const [draft, setDraft] = useState(config.defaultMessage);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function handleSend() {
    const text = draft.trim();
    if (!text || status === "sending") return;

    setDraft("");
    setStatus("sending");
    setMessages((prev) => [...prev, createMessage("user", text)]);

    try {
      const res = await fetch("/api/whatsapp-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, phone: config.number }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setMessages((prev) => [
        ...prev,
        createMessage(
          "agent",
          "Thank you — we've received your message and will respond shortly.",
        ),
      ]);
      setStatus("idle");
    } catch {
      setMessages((prev) => [
        ...prev,
        createMessage(
          "agent",
          "Sorry, we couldn't send that just now. Please try again in a moment.",
        ),
      ]);
      setStatus("error");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  if (!open) return null;

  return (
    <div
      className="pointer-events-auto fixed bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] right-4 z-50 flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#efeae2] shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:bottom-28 sm:right-8"
      role="dialog"
      aria-label="WhatsApp chat"
    >
      <header className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <WhatsAppIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-sm font-semibold">
            148Inspirations
          </p>
          <p className="font-sans text-xs text-white/80">
            Typically replies within a few hours
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
          aria-label="Close chat"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div
        ref={scrollRef}
        className="flex max-h-[min(52vh,420px)] min-h-[280px] flex-1 flex-col gap-3 overflow-y-auto px-3 py-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 shadow-sm",
                message.role === "user"
                  ? "rounded-br-none bg-[#DCF8C6] text-[#111B21]"
                  : "rounded-bl-none bg-white text-[#111B21]",
              )}
            >
              <p className="whitespace-pre-wrap font-body text-sm leading-relaxed">
                {message.text}
              </p>
              <p className="mt-1 text-right font-sans text-[10px] text-[#667781]">
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black/5 bg-[#f0f2f5] p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a message"
            className="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border border-black/5 bg-white px-4 py-3 font-body text-sm text-[#111B21] outline-none focus:ring-2 focus:ring-[#25D366]/40"
            aria-label="Message"
          />
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={!draft.trim() || status === "sending"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:bg-[#20bd5a] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center font-sans text-[10px] text-[#667781]">
          Chat stays on this site · {config.number}
        </p>
      </div>
    </div>
  );
}

export function WhatsAppChatProvider({
  config,
  children,
}: {
  config: WhatsAppChatConfig;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);
  const toggleChat = useCallback(() => setOpen((value) => !value), []);

  const value = useMemo(
    () => ({ open, openChat, closeChat, toggleChat }),
    [open, openChat, closeChat, toggleChat],
  );

  return (
    <WhatsAppChatContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-safe-6 right-4 z-50 sm:right-8">
        <WhatsAppChatPanel config={config} open={open} onClose={closeChat} />
        <button
          type="button"
          onClick={toggleChat}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={open}
          title={open ? "Close chat" : "Chat with us"}
          className={cn(
            "pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)] ring-2 ring-white/20 transition hover:scale-105 sm:h-16 sm:w-16",
            open
              ? "bg-[#128C7E] hover:bg-[#0f7a6e]"
              : "bg-[#25D366] hover:bg-[#20bd5a] hover:shadow-[0_16px_40px_rgba(37,211,102,0.5)]",
          )}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
          )}
        </button>
      </div>
    </WhatsAppChatContext.Provider>
  );
}

export function useWhatsAppChat() {
  const context = useContext(WhatsAppChatContext);
  if (!context) {
    throw new Error("useWhatsAppChat must be used within WhatsAppChatProvider");
  }
  return context;
}

export function useWhatsAppChatOptional() {
  return useContext(WhatsAppChatContext);
}
