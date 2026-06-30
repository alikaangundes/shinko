import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const STRAPI_URL =
  process.env.STRAPI_API_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

type ContactMessagePayload = {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeText(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

async function storeLocally(message: ContactMessagePayload) {
  const messageId = randomUUID();
  const baseDirectory = join(process.cwd(), "storage", "contact-messages");

  await mkdir(baseDirectory, { recursive: true });
  await writeFile(
    join(baseDirectory, `${messageId}.json`),
    JSON.stringify(
      {
        id: messageId,
        createdAt: new Date().toISOString(),
        ...message,
      },
      null,
      2,
    ),
    "utf8",
  );
}

async function storeInStrapi(message: ContactMessagePayload) {
  const response = await fetch(`${STRAPI_URL}/api/contact-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        fullName: message.fullName,
        phone: message.phone,
        email: message.email,
        subject: message.subject,
        message: message.message,
        status: "new",
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Mesaj Strapi'ye kaydedilemedi.");
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = sanitizeText(getStringValue(formData, "fullName"), 120);
    const phone = sanitizeText(getStringValue(formData, "phone"), 40);
    const email = sanitizeText(getStringValue(formData, "email"), 160);
    const subject = sanitizeText(getStringValue(formData, "subject"), 160);
    const message = sanitizeText(getStringValue(formData, "message"), 3000);

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { message: "Lütfen ad soyad, e-posta ve mesaj alanlarını doldurun." },
        { status: 400 },
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Geçerli bir e-posta adresi girin." },
        { status: 400 },
      );
    }

    const payload = {
      fullName,
      phone,
      email,
      subject,
      message,
    };

    try {
      await storeInStrapi(payload);
    } catch {
      await storeLocally(payload);
    }

    return NextResponse.json(
      { message: "Mesajınız başarıyla alındı." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Mesaj gönderilirken bir hata oluştu." },
      { status: 500 },
    );
  }
}
