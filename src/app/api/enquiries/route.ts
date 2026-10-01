import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const db = getDb();
    const body = await req.json();

    const { name, email, phone, company, subject, message, product_name, product_slug } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone number, and message are required fields." },
        { status: 400 }
      );
    }

    const finalSubject = subject || (product_name ? `Product Enquiry: ${product_name}` : "General Business Enquiry");

    const result = await db.execute({
      sql: `INSERT INTO enquiries (
        name, email, phone, company, subject, message, product_slug, product_name, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New')`,
      args: [
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        company ? company.trim() : null,
        finalSubject.trim(),
        message.trim(),
        product_slug || null,
        product_name || null,
      ],
    });

    return NextResponse.json({
      success: true,
      enquiryId: Number(result.lastInsertRowid),
      message: "Enquiry submitted successfully.",
    });
  } catch (error: unknown) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
