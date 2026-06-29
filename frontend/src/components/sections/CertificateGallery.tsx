"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatedNumericText } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";

type Certificate = {
  title: string;
  image: string;
};

type CertificateGalleryProps = {
  certificates: Certificate[];
};

function isPdfCertificate(certificate: Certificate) {
  return certificate.image.toLowerCase().endsWith(".pdf");
}

function CertificateCardPreview({ certificate }: { certificate: Certificate }) {
  if (isPdfCertificate(certificate)) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-white p-8 text-center">
        <div className="flex h-28 w-24 flex-col justify-between border border-[#ef783e]/30 bg-[#f7f9fb] p-4 shadow-[0_12px_28px_rgba(15,21,27,0.08)]">
          <div className="h-2 w-10 bg-[#ef783e]" />
          <div className="grid gap-2">
            <span className="h-1.5 w-full bg-slate-200" />
            <span className="h-1.5 w-4/5 bg-slate-200" />
            <span className="h-1.5 w-3/5 bg-slate-200" />
          </div>
          <p className="text-sm font-semibold text-[#ef783e]">PDF</p>
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          PDF Sertifika
        </p>
      </div>
    );
  }

  return (
    <Image
      src={certificate.image}
      alt={certificate.title}
      fill
      sizes="(max-width: 1024px) 100vw, 33vw"
      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.025]"
    />
  );
}

function CertificateModalPreview({ certificate }: { certificate: Certificate }) {
  if (isPdfCertificate(certificate)) {
    return (
      <iframe
        src={certificate.image}
        title={certificate.title}
        className="h-full w-full bg-white"
      />
    );
  }

  return (
    <Image
      src={certificate.image}
      alt={certificate.title}
      fill
      sizes="94vw"
      className="object-contain p-2"
    />
  );
}

export function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedCertificate) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <Reveal key={certificate.title} delay={150 + index * 70}>
            <button
              type="button"
              onClick={() => setSelectedCertificate(certificate)}
              className="group w-full border border-slate-200 bg-[#f7f9fb] p-5 text-left transition-transform duration-500 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef783e] focus-visible:ring-offset-4"
              aria-label={`${certificate.title} sertifikasını büyüt`}
            >
              <div className="relative h-[500px] overflow-hidden bg-white">
                <CertificateCardPreview certificate={certificate} />
                <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center bg-[#ef783e] text-white shadow-[0_14px_30px_rgba(239,120,62,0.3)] transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H3v5" />
                    <path d="M3 3l7 7" />
                    <path d="M16 3h5v5" />
                    <path d="m21 3-7 7" />
                    <path d="M8 21H3v-5" />
                    <path d="m3 21 7-7" />
                    <path d="M16 21h5v-5" />
                    <path d="m21 21-7-7" />
                  </svg>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
                <div>
                  <h3 className="text-sm font-semibold uppercase text-slate-950">
                    <AnimatedNumericText text={certificate.title} />
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Büyütmek için tıklayın
                  </p>
                </div>
                <span className="h-px w-12 bg-[#ef783e]" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {selectedCertificate && isMounted ? createPortal(
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#11161b]/88 px-4 py-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCertificate.title} büyük görünüm`}
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative flex max-h-[calc(100vh-40px)] w-[min(94vw,980px)] flex-col bg-white p-4 shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">
                <AnimatedNumericText text={selectedCertificate.title} startOnView={false} />
              </h3>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#11161b] text-white transition-colors hover:bg-[#ef783e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef783e] focus-visible:ring-offset-2"
                onClick={() => setSelectedCertificate(null)}
                aria-label="Sertifika görünümünü kapat"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="relative mt-4 h-[calc(100vh-140px)] min-h-[360px] overflow-hidden bg-[#f7f9fb]">
              <CertificateModalPreview certificate={selectedCertificate} />
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
