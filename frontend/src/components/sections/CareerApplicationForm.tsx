"use client";

import { useRef, useState, type FormEvent } from "react";

const acceptedCvTypes = ".pdf,.doc,.docx";
const inputClass =
  "border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]";

const fallbackPositionOptions = ["Genel Başvuru"];

const experienceOptions = [
  "Deneyimsiz",
  "1-3 yıl",
  "3-5 yıl",
  "5 yıl ve üzeri",
];

const shiftOptions = [
  "3 vardiya çalışabilirim",
  "Sadece gündüz vardiyası",
  "Esnek değerlendirilebilir",
];

type FormStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

type CareerApplicationFormProps = {
  labels?: {
    fullNamePlaceholder?: string;
    phonePlaceholder?: string;
    emailPlaceholder?: string;
    positionPlaceholder?: string;
    cityPlaceholder?: string;
    shiftPlaceholder?: string;
    experiencePlaceholder?: string;
    notePlaceholder?: string;
    cvEyebrow?: string;
    cvDefaultLabel?: string;
    cvButtonLabel?: string;
    cvHelpText?: string;
    kvkkText?: string;
    submitLabel?: string;
    submittingLabel?: string;
    successMessage?: string;
  };
  positionOptions?: string[];
};

export function CareerApplicationForm({
  labels = {},
  positionOptions = fallbackPositionOptions,
}: CareerApplicationFormProps) {
  const resolvedLabels = {
    fullNamePlaceholder: labels.fullNamePlaceholder || "Ad Soyad",
    phonePlaceholder: labels.phonePlaceholder || "Telefon",
    emailPlaceholder: labels.emailPlaceholder || "E-Posta",
    positionPlaceholder: labels.positionPlaceholder || "Başvurulan Pozisyon",
    cityPlaceholder: labels.cityPlaceholder || "İl / İlçe",
    shiftPlaceholder: labels.shiftPlaceholder || "Vardiya Uygunluğu",
    experiencePlaceholder: labels.experiencePlaceholder || "Deneyim",
    notePlaceholder:
      labels.notePlaceholder ||
      "Kendinizden, çalışmak istediğiniz alandan veya deneyiminizden kısaca bahsedin.",
    cvEyebrow: labels.cvEyebrow || "İsteğe Bağlı CV",
    cvDefaultLabel: labels.cvDefaultLabel || "CV dosyanızı isteğe bağlı yükleyin",
    cvButtonLabel: labels.cvButtonLabel || "Dosya Seç",
    cvHelpText:
      labels.cvHelpText || "PDF, DOC veya DOCX formatında dosya ekleyebilirsiniz.",
    kvkkText:
      labels.kvkkText ||
      "Kişisel verilerimin işe alım süreci kapsamında değerlendirilmesini ve saklanmasını kabul ediyorum. *",
    submitLabel: labels.submitLabel || "Başvuruyu Gönder",
    submittingLabel: labels.submittingLabel || "Gönderiliyor",
    successMessage: labels.successMessage || "Başvurunuz başarıyla alındı.",
  };
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileLabel, setFileLabel] = useState(resolvedLabels.cvDefaultLabel);
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
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/career-applications", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.message || "Başvuru gönderilemedi.");
      }

      formRef.current?.reset();
      setFileLabel(resolvedLabels.cvDefaultLabel);
      setStatus({
        type: "success",
        message: payload?.message || resolvedLabels.successMessage,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Başvuru gönderilemedi.";

      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <input
          type="text"
          name="fullName"
          placeholder={resolvedLabels.fullNamePlaceholder}
          required
          className={inputClass}
        />
        <input
          type="tel"
          name="phone"
          placeholder={resolvedLabels.phonePlaceholder}
          required
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          placeholder={resolvedLabels.emailPlaceholder}
          className={inputClass}
        />
        <select name="position" defaultValue="" required className={inputClass}>
          <option value="" disabled>
            {resolvedLabels.positionPlaceholder}
          </option>
          {positionOptions.map((position) => (
            <option key={position}>{position}</option>
          ))}
        </select>
        <input
          type="text"
          name="city"
          placeholder={resolvedLabels.cityPlaceholder}
          className={inputClass}
        />
        <select name="shift" defaultValue="" className={inputClass}>
          <option value="" disabled>
            {resolvedLabels.shiftPlaceholder}
          </option>
          {shiftOptions.map((shift) => (
            <option key={shift}>{shift}</option>
          ))}
        </select>
        <select name="experience" defaultValue="" className={inputClass}>
          <option value="" disabled>
            {resolvedLabels.experiencePlaceholder}
          </option>
          {experienceOptions.map((experience) => (
            <option key={experience}>{experience}</option>
          ))}
        </select>
      </div>

      <textarea
        name="note"
        placeholder={resolvedLabels.notePlaceholder}
        rows={5}
        className="border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]"
      />

      <label className="group grid cursor-pointer gap-5 border border-dashed border-[#ef783e]/60 bg-[#f7f9fb] p-6 transition-colors hover:border-[#ef783e]">
        <span className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <span className="block text-xs font-semibold uppercase text-[#ef783e]">
              {resolvedLabels.cvEyebrow}
            </span>
            <span className="mt-3 block break-words text-xl font-semibold text-slate-950">
              {fileLabel}
            </span>
          </span>
          <span className="inline-flex w-fit items-center gap-4 bg-[#11161b] px-5 py-4 text-xs font-semibold uppercase text-white transition-colors group-hover:bg-[#ef783e]">
            {resolvedLabels.cvButtonLabel}
            <svg viewBox="0 0 32 18" className="h-4 w-8" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M0 9h28" />
              <path d="m21 2 7 7-7 7" />
            </svg>
          </span>
        </span>
        <span className="text-sm leading-7 text-slate-500">
          {resolvedLabels.cvHelpText}
        </span>
        <input
          type="file"
          name="cv"
          accept={acceptedCvTypes}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            setFileLabel(file?.name || resolvedLabels.cvDefaultLabel);
          }}
        />
      </label>

      <label className="flex cursor-pointer items-start gap-4 border border-slate-200 bg-[#f7f9fb] p-5">
        <input
          type="checkbox"
          name="kvkk"
          value="accepted"
          required
          className="mt-1 h-5 w-5 shrink-0 accent-[#ef783e]"
        />
        <span className="text-sm leading-7 text-slate-600">
          {resolvedLabels.kvkkText}
        </span>
      </label>

      {status.type !== "idle" ? (
        <p
          className={`text-sm leading-7 ${
            status.type === "success" ? "text-green-700" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      ) : null}

      <div className="flex items-center justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-48 justify-center bg-[#ef783e] px-8 py-5 text-xs font-semibold uppercase text-white transition-colors hover:bg-[#11161b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? resolvedLabels.submittingLabel : resolvedLabels.submitLabel}
        </button>
      </div>
    </form>
  );
}
