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
  const result = await db.execute(`
    SELECT id, name, slug, category_name, dosage_form, composition, strength, pack_size, description, image, status, is_featured, created_at, updated_at
    FROM products
    ORDER BY id DESC
  `);

  return NextResponse.json({ products: result.rows });
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

    if (!name || !dosage_form || !category_name) {
      return NextResponse.json(
        { error: "Product name, dosage form, and category are required." },
        { status: 400 }
      );
    }

    const finalSlug = slug
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const result = await db.execute({
      sql: `INSERT INTO products (
        name, slug, category_name, dosage_form, composition, strength, pack_size, description, image, status, is_featured, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      args: [
        name.trim(),
        finalSlug,
        category_name.trim(),
        dosage_form.trim(),
        composition ? composition.trim() : null,
        strength ? strength.trim() : null,
        pack_size ? pack_size.trim() : null,
        description ? description.trim() : null,
        image || "/images/products/newpod-100.svg",
        status || "Published",
        is_featured ? 1 : 0,
      ],
    });

    return NextResponse.json({
      success: true,
      productId: Number(result.lastInsertRowid),
      message: "Product created successfully.",
    });
  } catch (error: unknown) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product. Ensure slug is unique." },
      { status: 500 }
    );
  }
}
