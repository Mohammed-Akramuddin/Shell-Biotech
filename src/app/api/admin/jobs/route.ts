import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  await initDb();
  const db = getDb();
  const result = await db.execute("SELECT * FROM jobs ORDER BY id DESC");
  return NextResponse.json({ jobs: result.rows });
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

    const { title, department, location, employment_type, description, requirements, deadline, status } = body;

    if (!title || !department || !description) {
      return NextResponse.json({ error: "Title, department, and description are required." }, { status: 400 });
    }

    const result = await db.execute({
      sql: `INSERT INTO jobs (title, department, location, employment_type, description, requirements, deadline, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        title.trim(),
        department.trim(),
        location ? location.trim() : "Hyderabad, Telangana",
        employment_type || "Full-Time",
        description.trim(),
        requirements ? requirements.trim() : "Relevant experience.",
        deadline ? deadline.trim() : "Open",
        status || "Active",
      ],
    });

    return NextResponse.json({
      success: true,
      jobId: Number(result.lastInsertRowid),
      message: "Job position created successfully.",
    });
  } catch (error: unknown) {
    console.error("Create job error:", error);
    return NextResponse.json({ error: "Failed to create job posting." }, { status: 500 });
  }
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
    const { id, title, department, location, employment_type, description, requirements, deadline, status } = body;

    if (!id) {
      return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    }

    await db.execute({
      sql: `UPDATE jobs SET
        title = ?,
        department = ?,
        location = ?,
        employment_type = ?,
        description = ?,
        requirements = ?,
        deadline = ?,
        status = ?
      WHERE id = ?`,
      args: [
        title,
        department,
        location,
        employment_type,
        description,
        requirements,
        deadline,
        status,
        Number(id),
      ],
    });

    return NextResponse.json({ success: true, message: "Job updated successfully." });
  } catch (error: unknown) {
    console.error("Update job error:", error);
    return NextResponse.json({ error: "Failed to update job." }, { status: 500 });
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
      sql: "DELETE FROM jobs WHERE id = ?",
      args: [Number(id)],
    });

    return NextResponse.json({ success: true, message: "Job deleted successfully." });
  } catch (error: unknown) {
    console.error("Delete job error:", error);
    return NextResponse.json({ error: "Failed to delete job." }, { status: 500 });
  }
}
