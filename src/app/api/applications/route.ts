import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const db = getDb();
    const body = await req.json();

    const { applicant_name, email, phone, job_id, job_title, resume_url, message } = body;

    if (!applicant_name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone number are required fields." },
        { status: 400 }
      );
    }

    const jobIdNum = job_id && !isNaN(Number(job_id)) ? Number(job_id) : null;

    const result = await db.execute({
      sql: `INSERT INTO job_applications (
        job_id, job_title, applicant_name, email, phone, resume_url, message, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'New')`,
      args: [
        jobIdNum,
        job_title || "General Application",
        applicant_name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        resume_url ? resume_url.trim() : null,
        message ? message.trim() : null,
      ],
    });

    return NextResponse.json({
      success: true,
      applicationId: Number(result.lastInsertRowid),
      message: "Application submitted successfully.",
    });
  } catch (error: unknown) {
    console.error("Job application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit job application. Please try again." },
      { status: 500 }
    );
  }
}
