import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];

  if (host === "shinko.com.tr") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "www.shinko.com.tr";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
