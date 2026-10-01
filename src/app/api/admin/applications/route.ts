import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  await initDb();
  const db = getDb();
  const result = await db.execute("SELECT * FROM job_applications ORDER BY id DESC");
  return NextResponse.json({ applications: result.rows });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await initDb();
    const db = getDb();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required." }, { status: 400 });
    }

    await db.execute({
      sql: "UPDATE job_applications SET status = ? WHERE id = ?",
      args: [status, Number(id)],
    });

    return NextResponse.json({ success: true, message: "Application status updated." });
  } catch (error: unknown) {
    console.error("Update application error:", error);
    return NextResponse.json({ error: "Failed to update status." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await initDb();
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required." }, { status: 400 });
    }

    await db.execute({
      sql: "DELETE FROM job_applications WHERE id = ?",
      args: [Number(id)],
    });

    return NextResponse.json({ success: true, message: "Application deleted." });
  } catch (error: unknown) {
    console.error("Delete application error:", error);
    return NextResponse.json({ error: "Failed to delete application." }, { status: 500 });
  }
}
