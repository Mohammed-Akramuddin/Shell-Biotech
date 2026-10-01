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
  const result = await db.execute("SELECT * FROM enquiries ORDER BY id DESC");
  return NextResponse.json({ enquiries: result.rows });
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
      sql: "UPDATE enquiries SET status = ? WHERE id = ?",
      args: [status, Number(id)],
    });

    return NextResponse.json({ success: true, message: "Enquiry status updated." });
  } catch (error: unknown) {
    console.error("Update enquiry error:", error);
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
      sql: "DELETE FROM enquiries WHERE id = ?",
      args: [Number(id)],
    });

    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (error: unknown) {
    console.error("Delete enquiry error:", error);
    return NextResponse.json({ error: "Failed to delete enquiry." }, { status: 500 });
  }
}
