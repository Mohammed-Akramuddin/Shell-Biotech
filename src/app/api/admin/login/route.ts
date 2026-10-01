import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import { verifyPassword, setAdminSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const db = getDb();
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const result = await db.execute({
      sql: "SELECT id, email, password_hash, name FROM admins WHERE email = ?",
      args: [email.trim().toLowerCase()],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    const admin = result.rows[0];
    const passwordValid = await verifyPassword(password, String(admin.password_hash));

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    await setAdminSessionCookie({
      id: Number(admin.id),
      email: String(admin.email),
      name: String(admin.name),
    });

    return NextResponse.json({
      success: true,
      admin: {
        id: Number(admin.id),
        email: String(admin.email),
        name: String(admin.name),
      },
      message: "Authentication successful.",
    });
  } catch (error: unknown) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Authentication system error. Please try again." },
      { status: 500 }
    );
  }
}
