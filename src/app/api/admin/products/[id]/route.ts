import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await initDb();
    const db = getDb();
    const { id } = await params;
    const body = await req.json();

    const {
      name,
      slug,
      category_name,
      dosage_form,
      composition,
      strength,
      pack_size,
      description,
      image,
      status,
      is_featured,
    } = body;

    await db.execute({
      sql: `UPDATE products SET
        name = ?,
        slug = ?,
        category_name = ?,
        dosage_form = ?,
        composition = ?,
        strength = ?,
        pack_size = ?,
        description = ?,
        image = ?,
        status = ?,
        is_featured = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      args: [
        name,
        slug,
        category_name,
        dosage_form,
        composition,
        strength,
        pack_size,
        description,
        image,
        status,
        is_featured ? 1 : 0,
        Number(id),
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
    });
  } catch (error: unknown) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Failed to update product." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await initDb();
    const db = getDb();
    const { id } = await params;

    await db.execute({
      sql: "DELETE FROM products WHERE id = ?",
      args: [Number(id)],
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Failed to delete product." },
      { status: 500 }
    );
  }
}
