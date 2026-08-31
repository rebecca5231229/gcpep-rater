import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "gcpep_auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const expected = process.env.RATER_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "Server is not configured with a RATER_PASSWORD environment variable." },
      { status: 500 }
    );
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return response;
}
