"use client";

import { useRef, useState, type FormEvent } from "react";

type ContactMessageFormProps = {
  labels: {
    namePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    buttonLabel: string;
  };
};

type FormStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 40 16" className="h-4 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M0 8h37" />
      <path d="m31 2 6 6-6 6" />
    </svg>
  );
}

const inputClass =
  "border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]";

export function ContactMessageForm({ labels }: ContactMessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.message || "Mesaj gönderilemedi.");
      }

      formRef.current?.reset();
      setStatus({
        type: "success",
        message: payload?.message || "Mesajınız başarıyla alındı.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Mesaj gönderilemedi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="border border-slate-200 bg-[#f7f9fb] p-6 shadow-[0_22px_60px_rgba(15,21,27,0.06)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <input
          type="text"
          name="fullName"
          placeholder={labels.namePlaceholder}
          required
          className={inputClass}
        />
        <input
          type="tel"
          name="phone"
          placeholder={labels.phonePlaceholder}
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          placeholder={labels.emailPlaceholder}
          required
          className={inputClass}
        />
        <input
          type="text"
          name="subject"
          placeholder={labels.subjectPlaceholder}
          className={inputClass}
        />
      </div>

      <textarea
        name="message"
        placeholder={labels.messagePlaceholder}
        rows={8}
        required
        className="mt-5 w-full border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]"
      />

      {status.type !== "idle" ? (
        <p
          className={`mt-5 text-sm font-semibold leading-7 ${
            status.type === "success" ? "text-green-700" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      ) : null}

      <div className="mt-6 text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-5 bg-[#ef783e] px-9 py-5 text-xs font-semibold uppercase text-white transition-colors hover:bg-[#11161b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Gönderiliyor" : labels.buttonLabel}
          <ArrowIcon />
        </button>
      </div>
    </form>
  );
}
