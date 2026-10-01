import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  await initDb();
  const db = getDb();
  const result = await db.execute("SELECT id, name, slug FROM categories ORDER BY name ASC");
  return NextResponse.json({ categories: result.rows });
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
    const { name, slug } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }

    const finalSlug = slug || name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const result = await db.execute({
      sql: "INSERT INTO categories (name, slug) VALUES (?, ?)",
      args: [name.trim(), finalSlug],
    });

    return NextResponse.json({
      success: true,
      categoryId: Number(result.lastInsertRowid),
      message: "Category added successfully.",
    });
  } catch (error: unknown) {
    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Failed to create category. It may already exist." },
      { status: 500 }
    );
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
      return NextResponse.json({ error: "Category ID required." }, { status: 400 });
    }

    await db.execute({
      sql: "DELETE FROM categories WHERE id = ?",
      args: [Number(id)],
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: "Failed to delete category." },
      { status: 500 }
    );
  }
}
