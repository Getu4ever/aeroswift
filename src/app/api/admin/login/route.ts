import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  isAdminPasswordConfigured,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    createSessionToken(),
    sessionCookieOptions(),
  );
  return response;
}
