import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await initDb();
  const db = getDb();
  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section");

  let query = "SELECT section, content_key, content_value FROM site_content";
  const args: (string | number)[] = [];

  if (section) {
    query += " WHERE section = ?";
    args.push(section);
  }

  const result = await db.execute({ sql: query, args });
  const contentMap: Record<string, string> = {};
  for (const row of result.rows) {
    contentMap[`${row.section}_${row.content_key}`] = String(row.content_value);
  }

  return NextResponse.json({ content: contentMap, rows: result.rows });
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
    const { items } = body; // Array of { section, key, value }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid data format. Expected items array." }, { status: 400 });
    }

    for (const item of items) {
      if (item.section && item.key) {
        await db.execute({
          sql: `INSERT INTO site_content (section, content_key, content_value)
                VALUES (?, ?, ?)
                ON CONFLICT(section, content_key) DO UPDATE SET content_value = excluded.content_value`,
          args: [item.section, item.key, String(item.value || "")],
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Site content updated successfully.",
    });
  } catch (error: unknown) {
    console.error("Update site content error:", error);
    return NextResponse.json(
      { error: "Failed to update content." },
      { status: 500 }
    );
  }
}
