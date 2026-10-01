import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  await initDb();
  const db = getDb();
  const result = await db.execute("SELECT * FROM quality_docs ORDER BY id ASC");
  return NextResponse.json({ documents: result.rows });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await initDb();
    const db = getDb();
    const body = await req.json();
    const { title, category, description, file_url, status } = body;

    if (!title || !category) {
      return NextResponse.json({ error: "Title and category are required." }, { status: 400 });
    }

    const result = await db.execute({
      sql: `INSERT INTO quality_docs (title, category, description, file_url, status)
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        title.trim(),
        category.trim(),
        description ? description.trim() : null,
        file_url || "#",
        status || "Verified Document",
      ],
    });

    return NextResponse.json({
      success: true,
      documentId: Number(result.lastInsertRowid),
      message: "Quality document added successfully.",
    });
  } catch (error: unknown) {
    console.error("Create quality doc error:", error);
    return NextResponse.json({ error: "Failed to create quality doc." }, { status: 500 });
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
      sql: "DELETE FROM quality_docs WHERE id = ?",
      args: [Number(id)],
    });

    return NextResponse.json({ success: true, message: "Document deleted." });
  } catch (error: unknown) {
    console.error("Delete quality doc error:", error);
    return NextResponse.json({ error: "Failed to delete document." }, { status: 500 });
  }
}
