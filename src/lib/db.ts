import { createClient, Client } from "@libsql/client";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";

let dbInstance: Client | null = null;

export function getDb(): Client {
  if (!dbInstance) {
    const remoteUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
    if (remoteUrl) {
      dbInstance = createClient({
        url: remoteUrl,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
    } else {
      const dbPath = path.join(process.cwd(), "data", "shellbiotech.db");
      const dataDir = path.dirname(dbPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      dbInstance = createClient({
        url: `file:${dbPath}`,
      });
    }
  }
  return dbInstance;
}

export async function initDb() {
  const db = getDb();

  // Create tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category_id INTEGER,
      category_name TEXT NOT NULL,
      dosage_form TEXT NOT NULL,
      composition TEXT,
      strength TEXT,
      pack_size TEXT,
      description TEXT,
      image TEXT NOT NULL,
      status TEXT DEFAULT 'Published',
      is_featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS site_content (
      section TEXT NOT NULL,
      content_key TEXT NOT NULL,
      content_value TEXT NOT NULL,
      PRIMARY KEY (section, content_key)
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS quality_docs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      file_url TEXT,
      status TEXT DEFAULT 'Placeholder',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      location TEXT NOT NULL,
      employment_type TEXT NOT NULL,
      description TEXT NOT NULL,
      requirements TEXT NOT NULL,
      deadline TEXT,
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER,
      job_title TEXT,
      applicant_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      resume_url TEXT,
      message TEXT,
      status TEXT DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      company TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      product_slug TEXT,
      product_name TEXT,
      status TEXT DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_type TEXT NOT NULL,
      size_bytes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default admin if none exists
  const adminCheck = await db.execute("SELECT COUNT(*) as count FROM admins");
  if (Number(adminCheck.rows[0].count) === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("Admin@ShellBiotech2026!", salt);
    await db.execute({
      sql: "INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)",
      args: ["admin@shellbiotech.in", hash, "Administrator"],
    });
  }

  // Seed Categories
  const catCheck = await db.execute("SELECT COUNT(*) as count FROM categories");
  if (Number(catCheck.rows[0].count) === 0) {
    const initialCategories = [
      { name: "Tablets", slug: "tablets" },
      { name: "Syrups", slug: "syrups" },
      { name: "Suspensions", slug: "suspensions" },
      { name: "Drops", slug: "drops" },
      { name: "Softgels", slug: "softgels" },
    ];
    for (const cat of initialCategories) {
      await db.execute({
        sql: "INSERT INTO categories (name, slug) VALUES (?, ?)",
        args: [cat.name, cat.slug],
      });
    }
  }

  // Seed Products (Verified 13 company formulations)
  const prodCheck = await db.execute("SELECT COUNT(*) as count FROM products");
  if (Number(prodCheck.rows[0].count) === 0) {
    const initialProducts = [
      {
        name: "New-fit",
        slug: "new-fit",
        category_name: "Softgels",
        dosage_form: "Softgels, Syrup & Drops",
        composition: "Multivitamin + Multimineral & Antioxidant",
        strength: "Therapeutic formula",
        pack_size: "Standard packaging",
        description: "Comprehensive multivitamin, multimineral and antioxidant formulation supplied in softgel capsule, oral syrup, and pediatric drop formats.",
        image: "/images/products/new-fit.svg",
        status: "Published",
        is_featured: 1,
      },
      {
        name: "Newpod-100",
        slug: "newpod-100",
        category_name: "Suspensions",
        dosage_form: "Oral Suspension",
        composition: "Cefpodoxime",
        strength: "100 mg / 5 ml",
        pack_size: "Bottle with measuring cap",
        description: "Cefpodoxime oral suspension formulation sourced from certified partner manufacturing facilities for institutional and pediatric healthcare supply.",
        image: "/images/products/newpod-100.svg",
        status: "Published",
        is_featured: 1,
      },
      {
        name: "Newpod-200",
        slug: "newpod-200",
        category_name: "Tablets",
        dosage_form: "Film-coated Tablets",
        composition: "Cefpodoxime Proxetil",
        strength: "200 mg",
        pack_size: "Blister strip packaging",
        description: "Cefpodoxime Proxetil 200 mg tablets formulated in compliance with pharmacopeial standards for healthcare distribution.",
        image: "/images/products/newpod-200.svg",
        status: "Published",
        is_featured: 1,
      },
      {
        name: "Cold RAP",
        slug: "cold-rap",
        category_name: "Syrups",
        dosage_form: "Oral Syrup",
        composition: "Chlorpheniramine Maleate 2 mg & Phenylephrine HCl 5 mg",
        strength: "Per 5 ml syrup",
        pack_size: "60 ml bottle",
        description: "Antihistamine and decongestant combination syrup supplied in 60 ml packaging through institutional hospital distribution channels.",
        image: "/images/products/cold-rap.svg",
        status: "Published",
        is_featured: 1,
      },
      {
        name: "Entro-Win",
        slug: "entro-win",
        category_name: "Suspensions",
        dosage_form: "Oral Suspension (Mini-bottles)",
        composition: "Bacillus clausii",
        strength: "2 Billion Spores / 5 ml",
        pack_size: "5 ml oral suspension mini-flacons",
        description: "Bacillus clausii probiotic oral suspension containing 2 billion spores per 5 ml, prepared under strict temperature and quality protocols.",
        image: "/images/products/entro-win.svg",
        status: "Published",
        is_featured: 1,
      },
      {
        name: "MefWin-DS",
        slug: "mefwin-ds",
        category_name: "Suspensions",
        dosage_form: "Oral Suspension",
        composition: "Mefenamic Acid 100 mg & Paracetamol 250 mg",
        strength: "Per 5 ml suspension",
        pack_size: "60 ml bottle",
        description: "Dual analgesic-antipyretic oral suspension formulation in double-strength concentration supplied in 60 ml bottles.",
        image: "/images/products/mefwin-ds.svg",
        status: "Published",
        is_featured: 1,
      },
      {
        name: "Clav-Win",
        slug: "clav-win",
        category_name: "Suspensions",
        dosage_form: "Dry Syrup / Oral Suspension",
        composition: "Amoxycillin 200 mg & Potassium Clavulanate 28.5 mg",
        strength: "Per 5 ml",
        pack_size: "60 ml bottle with sterile water",
        description: "Amoxycillin and Potassium Clavulanate oral suspension formulated for pediatric antimicrobial supply in 60 ml presentations.",
        image: "/images/products/clav-win.svg",
        status: "Published",
        is_featured: 0,
      },
      {
        name: "Daigiron",
        slug: "daigiron",
        category_name: "Syrups",
        dosage_form: "Digestive Enzyme Syrup",
        composition: "Fungal Diastase 50 mg & Papain 30 mg",
        strength: "Per 10 ml syrup",
        pack_size: "200 ml bottle",
        description: "Enzyme formulation combining Fungal Diastase and Papain in a pleasant syrup base, supplied in 200 ml amber bottles.",
        image: "/images/products/daigiron.svg",
        status: "Published",
        is_featured: 0,
      },
      {
        name: "Calsiwin-D3",
        slug: "calsiwin-d3",
        category_name: "Suspensions",
        dosage_form: "Oral Suspension",
        composition: "Calcium Carbonate 625 mg, Magnesium 180 mg, Zinc 14 mg & Vitamin D3 200 IU",
        strength: "Per 5 ml",
        pack_size: "200 ml bottle",
        description: "Comprehensive calcium and mineral supplement suspension with Vitamin D3, formulated for consistent suspension stability.",
        image: "/images/products/calsiwin-d3.svg",
        status: "Published",
        is_featured: 0,
      },
      {
        name: "Winfer-XT Tablet",
        slug: "winfer-xt-tablet",
        category_name: "Tablets",
        dosage_form: "Film-coated Tablets",
        composition: "Ferrous Ascorbate, Folic Acid & Zinc Sulphate",
        strength: "Standard therapeutic strength",
        pack_size: "Blister strip pack of 10x10",
        description: "Haematinic tablet formulation containing Ferrous Ascorbate with essential cofactors Folic Acid and Zinc Sulphate.",
        image: "/images/products/winfer-xt-tablet.svg",
        status: "Published",
        is_featured: 0,
      },
      {
        name: "Winfer-XT Syrup",
        slug: "winfer-xt-syrup",
        category_name: "Syrups",
        dosage_form: "Oral Syrup",
        composition: "Ferric Ammonium Citrate 150 mg & Folic Acid 0.5 mg",
        strength: "Per 15 ml",
        pack_size: "200 ml bottle",
        description: "Oral haematinic syrup presentation containing Ferric Ammonium Citrate and Folic Acid in 200 ml packaging.",
        image: "/images/products/winfer-xt-syrup.svg",
        status: "Published",
        is_featured: 0,
      },
      {
        name: "Win-Cough",
        slug: "win-cough",
        category_name: "Syrups",
        dosage_form: "Oral Syrup",
        composition: "Terbutaline 1.5 mg, Guaiphenesin 50 mg, Ambroxol 15 mg & Menthol 1 mg",
        strength: "Per 5 ml syrup",
        pack_size: "100 ml bottle",
        description: "Bronchodilator and expectorant combination syrup packaged in 100 ml bottles for hospital and healthcare supply.",
        image: "/images/products/win-cough.svg",
        status: "Published",
        is_featured: 0,
      },
      {
        name: "Win-Cough LS",
        slug: "win-cough-ls",
        category_name: "Syrups",
        dosage_form: "Oral Syrup",
        composition: "Levosalbutamol 1 mg, Ambroxol Hydrochloride 30 mg & Guaiphenesin 50 mg",
        strength: "Per 5 ml",
        pack_size: "100 ml bottle",
        description: "Triple active respiratory combination syrup with Levosalbutamol, Ambroxol and Guaiphenesin.",
        image: "/images/products/win-cough-ls.svg",
        status: "Published",
        is_featured: 0,
      },
    ];

    for (const prod of initialProducts) {
      await db.execute({
        sql: `INSERT INTO products (
          name, slug, category_name, dosage_form, composition, strength, pack_size, description, image, status, is_featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          prod.name,
          prod.slug,
          prod.category_name,
          prod.dosage_form,
          prod.composition,
          prod.strength,
          prod.pack_size,
          prod.description,
          prod.image,
          prod.status,
          prod.is_featured,
        ],
      });
    }
  }

  // Seed Site Content
  const contentCheck = await db.execute("SELECT COUNT(*) as count FROM site_content");
  if (Number(contentCheck.rows[0].count) === 0) {
    const defaultContent = [
      // Homepage
      { section: "home", key: "hero_title", value: "Pharmaceutical Products.\nHealthcare Connections." },
      { section: "home", key: "hero_subtitle", value: "Shell Biotech bridges verified pharmaceutical manufacturing partners with healthcare institutions, hospital networks, and medical professionals across Telangana." },
      { section: "home", key: "who_we_are_title", value: "A pharmaceutical partner focused on healthcare connections." },
      { section: "home", key: "who_we_are_text", value: "Established in 2013 and headquartered in Hyderabad, Shell Biotech operates as a pharmaceutical sourcing, marketing, and distribution organization. Working directly with licensed pharmaceutical manufacturers in other states, we bridge the gap between quality formulation supply and healthcare institutions across Telangana." },
      { section: "home", key: "cta_heading", value: "Looking for product information or institutional supply?" },
      { section: "home", key: "cta_text", value: "Connect with our sales and distribution team for catalogue availability, hospital procurement, and partnership inquiries." },
      
      // Company Info
      { section: "company", key: "name", value: "SHELL BIOTECH" },
      { section: "company", key: "established", value: "2013" },
      { section: "company", key: "structure", value: "Partnership" },
      { section: "company", key: "region", value: "Telangana, India" },
      { section: "company", key: "founder_placeholder", value: "Name1" },
      { section: "company", key: "founder_designation", value: "Founder / Partner" },
      { section: "company", key: "address", value: "180/5/P, Road No. 03, Ground Floor, Kuntloor, Sunrise Colony, Hyderabad – 501505" },
      { section: "company", key: "email", value: "info@shellbiotech.in" },
      { section: "company", key: "phone", value: "+91 8317684883" },
      { section: "company", key: "udyam", value: "UDYAM-TS-09-0239914" },
      { section: "company", key: "domain", value: "shellbiotech.in" },
      
      // Network
      { section: "network", key: "hero_title", value: "Distribution & Healthcare Supply Network Across Telangana" },
      { section: "network", key: "overview", value: "Shell Biotech coordinates a structured pharmaceutical distribution network throughout Telangana. Our field sales representatives engage directly with hospital pharmacies, healthcare institutions, and clinicians to ensure dependable availability of vital formulations." },
      
      // Quality
      { section: "quality", key: "philosophy", value: "Quality and regulatory compliance form the cornerstone of Shell Biotech's operating ethos. While Shell Biotech operates strictly as a sourcing, marketing, and supply partner rather than an in-house manufacturer, we maintain rigorous criteria for every partner pharmaceutical manufacturing facility." },
    ];

    for (const item of defaultContent) {
      await db.execute({
        sql: "INSERT OR REPLACE INTO site_content (section, content_key, content_value) VALUES (?, ?, ?)",
        args: [item.section, item.key, item.value],
      });
    }
  }

  // Seed sample quality docs placeholder notice
  const qDocCheck = await db.execute("SELECT COUNT(*) as count FROM quality_docs");
  if (Number(qDocCheck.rows[0].count) === 0) {
    const docs = [
      {
        title: "Third-Party Manufacturer Quality Qualification Protocol",
        category: "Partner Audit Standards",
        description: "Standard operating framework for validating partner manufacturing facility licenses and batch consistency.",
        file_url: "#",
        status: "Placeholder - Documentation will be published following official verification",
      },
      {
        title: "Batch Release & Certificate of Analysis Protocol",
        category: "Batch Verification",
        description: "Quality documentation protocol requiring verified Manufacturer COA with every batch supplied to healthcare institutions.",
        file_url: "#",
        status: "Placeholder - Documentation will be published following official verification",
      },
      {
        title: "Cold Chain & Storage Guidelines (Probiotic & Liquid Formulations)",
        category: "Storage Compliance",
        description: "Warehouse and distribution temperature maintenance standard operating procedure.",
        file_url: "#",
        status: "Placeholder - Documentation will be published following official verification",
      },
    ];
    for (const doc of docs) {
      await db.execute({
        sql: "INSERT INTO quality_docs (title, category, description, file_url, status) VALUES (?, ?, ?, ?, ?)",
        args: [doc.title, doc.category, doc.description, doc.file_url, doc.status],
      });
    }
  }

  // Seed initial career opportunities
  const jobCheck = await db.execute("SELECT COUNT(*) as count FROM jobs");
  if (Number(jobCheck.rows[0].count) === 0) {
    const sampleJobs = [
      {
        title: "Medical Sales Representative",
        department: "Sales & Field Representation",
        location: "Hyderabad & Telangana Districts",
        employment_type: "Full-Time",
        description: "Represent Shell Biotech's pharmaceutical portfolio to hospitals, clinics, and medical practitioners across assigned territories in Telangana.",
        requirements: "Science/Pharmacy graduate (B.Sc / B.Pharm) or equivalent experience. Strong interpersonal and territory management skills.",
        deadline: "Open until filled",
        status: "Active",
      },
      {
        title: "Hospital Institutional Sourcing Executive",
        department: "Supply & Logistics",
        location: "Hyderabad Head Office",
        employment_type: "Full-Time",
        description: "Coordinate with manufacturing partners in other states and manage inventory allocation for institutional healthcare supply.",
        requirements: "Knowledge of pharmaceutical distribution, inventory reconciliation, and institutional procurement standards.",
        deadline: "Open until filled",
        status: "Active",
      },
      {
        title: "Pharmaceutical Operations Intern",
        department: "Operations & Administration",
        location: "Hyderabad (Sunrise Colony, Kuntloor)",
        employment_type: "Internship (3-6 Months)",
        description: "Gain hands-on experience in pharmaceutical product management, regulatory compliance documentation, and healthcare distribution workflows.",
        requirements: "Undergraduate or postgraduate student in Pharmacy, Biotechnology, Healthcare Management, or Business Administration.",
        deadline: "Active intake",
        status: "Active",
      },
    ];
    for (const j of sampleJobs) {
      await db.execute({
        sql: `INSERT INTO jobs (title, department, location, employment_type, description, requirements, deadline, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [j.title, j.department, j.location, j.employment_type, j.description, j.requirements, j.deadline, j.status],
      });
    }
  }
}
