import React from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import CareersManagerClient from "./CareersManagerClient";
import { getAdminSession } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await initDb();
  const db = getDb();

  const jobsResult = await db.execute("SELECT * FROM jobs ORDER BY id DESC");
  const jobs = jobsResult.rows.map((r) => ({
    id: Number(r.id),
    title: String(r.title),
    department: String(r.department),
    location: String(r.location),
    employment_type: String(r.employment_type),
    description: String(r.description),
    requirements: String(r.requirements),
    deadline: String(r.deadline || "Open"),
    status: String(r.status || "Active"),
  }));

  const appsResult = await db.execute("SELECT * FROM job_applications ORDER BY id DESC");
  const applications = appsResult.rows.map((r) => ({
    id: Number(r.id),
    job_id: r.job_id ? Number(r.job_id) : null,
    job_title: String(r.job_title || "General Application"),
    applicant_name: String(r.applicant_name),
    email: String(r.email),
    phone: String(r.phone),
    resume_url: r.resume_url ? String(r.resume_url) : null,
    message: r.message ? String(r.message) : null,
    status: String(r.status || "New"),
    created_at: String(r.created_at || ""),
  }));

  return (
    <>
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              Careers &amp; Job Applications
            </h1>
            <span style={{ fontSize: "0.825rem", color: "var(--color-text-muted)" }}>
              Post and manage employment openings and evaluate candidate applications.
            </span>
          </div>
        </div>

        <div className="admin-main">
          <CareersManagerClient initialJobs={jobs} initialApplications={applications} />
        </div>
      </div>
    </>
  );
}
