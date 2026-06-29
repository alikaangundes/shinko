import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const maxCvSizeInBytes = 5 * 1024 * 1024;
const allowedExtensions = new Set([".pdf", ".doc", ".docx"]);
const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "",
]);
const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

type ApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  city: string;
  experience: string;
  shift: string;
  note: string;
  message: string;
  kvkkAccepted: boolean;
  cv: File | null;
  originalFileName: string;
  fileExtension: string;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeText(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

async function storeLocally(application: ApplicationPayload) {
  const applicationId = randomUUID();
  const baseDirectory = join(
    process.cwd(),
    "storage",
    "career-applications",
    applicationId,
  );

  await mkdir(baseDirectory, { recursive: true });

  const storedFileName = application.cv
    ? `cv${application.fileExtension || ".pdf"}`
    : "";

  if (application.cv) {
    const buffer = Buffer.from(await application.cv.arrayBuffer());
    await writeFile(join(baseDirectory, storedFileName), buffer);
  }

  await writeFile(
    join(baseDirectory, "application.json"),
    JSON.stringify(
      {
        id: applicationId,
        createdAt: new Date().toISOString(),
        fullName: application.fullName,
        email: application.email,
        phone: application.phone,
        position: application.position,
        city: application.city,
        experience: application.experience,
        shift: application.shift,
        note: application.note,
        message: application.message,
        kvkkAccepted: application.kvkkAccepted,
        cv: application.cv
          ? {
              originalFileName: application.originalFileName,
              storedFileName,
              mimeType: application.cv.type,
              size: application.cv.size,
            }
          : null,
      },
      null,
      2,
    ),
    "utf8",
  );
}

async function storeInStrapi(application: ApplicationPayload) {
  let fileId: number | undefined;

  if (application.cv) {
    const uploadFormData = new FormData();

    uploadFormData.append("files", application.cv, application.originalFileName);

    const uploadResponse = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      throw new Error("CV dosyası Strapi'ye yüklenemedi.");
    }

    const uploadPayload = (await uploadResponse.json()) as
      | { id?: number }
      | Array<{ id?: number }>;
    const uploadedFile = Array.isArray(uploadPayload)
      ? uploadPayload[0]
      : uploadPayload;
    fileId = uploadedFile?.id;

    if (!fileId) {
      throw new Error("CV dosyası Strapi'de işlenemedi.");
    }
  }

  const createResponse = await fetch(`${STRAPI_URL}/api/career-applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        fullName: application.fullName,
        phone: application.phone,
        position: application.position,
        coverLetter: application.message,
        notes: application.note,
        status: "new",
        ...(application.email ? { email: application.email } : {}),
        ...(fileId ? { cv: fileId } : {}),
      },
    }),
  });

  if (!createResponse.ok) {
    throw new Error("Başvuru Strapi'ye kaydedilemedi.");
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = sanitizeText(getStringValue(formData, "fullName"), 120);
    const email = sanitizeText(getStringValue(formData, "email"), 160);
    const phone = sanitizeText(getStringValue(formData, "phone"), 40);
    const position = sanitizeText(getStringValue(formData, "position"), 120);
    const city = sanitizeText(getStringValue(formData, "city"), 120);
    const experience = sanitizeText(getStringValue(formData, "experience"), 80);
    const shift = sanitizeText(getStringValue(formData, "shift"), 80);
    const note = sanitizeText(getStringValue(formData, "note"), 2000);
    const kvkkAccepted = getStringValue(formData, "kvkk") === "accepted";
    const cvValue = formData.get("cv");
    const cv = cvValue instanceof File && cvValue.size > 0 ? cvValue : null;
    const message = [
      `Başvurulan Pozisyon: ${position || "-"}`,
      `İl / İlçe: ${city || "-"}`,
      `Vardiya Uygunluğu: ${shift || "-"}`,
      `Deneyim: ${experience || "-"}`,
      `KVKK Onayı: ${kvkkAccepted ? "Kabul edildi" : "Kabul edilmedi"}`,
      "",
      "Kısa Not:",
      note || "-",
    ].join("\n");

    if (!fullName || !phone || !position || !kvkkAccepted) {
      return NextResponse.json(
        { message: "Lütfen zorunlu alanları doldurun." },
        { status: 400 },
      );
    }

    if (email && !email.includes("@")) {
      return NextResponse.json(
        { message: "Geçerli bir e-posta adresi girin." },
        { status: 400 },
      );
    }

    const originalFileName = cv ? sanitizeFileName(cv.name || "cv") : "";
    const fileExtension = cv ? extname(originalFileName).toLowerCase() : "";

    if (cv && (!allowedExtensions.has(fileExtension) || !allowedMimeTypes.has(cv.type))) {
      return NextResponse.json(
        { message: "Sadece PDF, DOC veya DOCX dosyaları yüklenebilir." },
        { status: 400 },
      );
    }

    if (cv && cv.size > maxCvSizeInBytes) {
      return NextResponse.json(
        { message: "CV dosyası 5 MB sınırını aşamaz." },
        { status: 400 },
      );
    }

    const application = {
      fullName,
      email,
      phone,
      position,
      city,
      experience,
      shift,
      note,
      message,
      kvkkAccepted,
      cv,
      originalFileName,
      fileExtension,
    };

    try {
      await storeInStrapi(application);
    } catch {
      await storeLocally(application);
    }

    return NextResponse.json(
      { message: "Başvurunuz başarıyla alındı." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Başvuru kaydedilirken bir hata oluştu." },
      { status: 500 },
    );
  }
}
