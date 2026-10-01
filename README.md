# Shell Biotech — Pharmaceutical Sourcing & Healthcare Distribution Portal

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-libSQL%20%2F%20SQLite-008080?style=flat)](https://turso.tech/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#license)

A corporate web application and administrative content management system (CMS) built for **Shell Biotech** — a pharmaceutical sourcing, marketing, and institutional healthcare distribution enterprise established in 2013 and headquartered in Hyderabad, Telangana.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Getting Started Locally](#getting-started-locally)
- [Admin Portal & Credentials](#admin-portal--credentials)
- [Deploying to GitHub & Vercel](#deploying-to-github--vercel)
  - [Step 1: Initialize Git and Push to GitHub](#step-1-initialize-git-and-push-to-github)
  - [Step 2: Deploy to Vercel](#step-2-deploy-to-vercel)
  - [Step 3: Database & Environment Variables on Vercel](#step-3-database--environment-variables-on-vercel)
- [Scripts](#scripts)
- [License](#license)

---

## 🔬 Overview

Shell Biotech bridges the gap between licensed pharmaceutical manufacturers and hospital pharmacies, clinics, and medical institutions across Telangana. 

This platform serves as:
1. **Public Corporate Portal**: Showcases verified product formulations, operating geography, quality protocols, and career opportunities.
2. **Institutional Procurement Engine**: Allows hospital procurement officers, clinicians, and distributors to inquire about specific medicines with pre-filled product details.
3. **Full Admin CMS Dashboard**: Allows the Shell Biotech team to manage medicines, categories, website copy, career openings, and review client enquiries in real time.

---

## ✨ Key Features

### 🌐 Public Facing Experience
* **Modern Healthcare UI**: Premium medical aesthetic featuring customized typography (*Manrope* headers, *Inter* body), refined color palette, and fully responsive layout.
* **Interactive Telangana Distribution Map**: Custom-designed SVG vector map showcasing arterial supply corridors radiating from the Hyderabad Central HQ to 9 regional institutional healthcare clusters (*Siddipet, Warangal, Karimnagar, Nizamabad, Khammam, Nalgonda, Mahabubnagar, Ramagundam, and Adilabad*).
* **Comprehensive Product Catalogue**:
  * Filter by therapeutic category (Antibiotics, Analgesics & Anti-Inflammatory, Gastrointestinal, Respiratory, Nutritional Supplements, etc.).
  * Detailed medicine specs: composition, strength, dosage form, packaging, and descriptions.
  * Product-specific enquiry buttons that pre-fill contact forms.
* **Quality & Regulatory Showcase**: Detailed manufacturing verification standards, batch testing traceability, and storage protocols.
* **Institutional Enquiry Pipeline**: Secure contact form capturing institutional demand, facility name, and specific drug requirements.
* **Careers & Talent Portal**: Displays current job and internship openings with online resume/application submission.

### 🛡️ Administrative Portal (`/admin`)
* **Secure Authentication**: Built-in JWT-based session security with bcrypt password encryption.
* **Product Catalog CMS**: Add, edit, archive, or publish pharmaceutical products with images.
* **Category Management**: Create and manage therapeutic categories.
* **Enquiry Management**: Real-time tracking of institutional customer messages and quote requests with one-click email/phone contact.
* **Career Application Manager**: Review applicant details, cover letters, and application timestamps.
* **Site Content Editor**: Live editing of homepage narrative, company facts, and network details without touching code.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components & Server Actions, Turbopack)
* **UI Library**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: Vanilla CSS Design System with CSS Variables (zero external heavy CSS framework overhead)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Database & ORM**: [`@libsql/client`](https://github.com/tursodatabase/libsql-client-ts) (Zero-config local SQLite + 1-click cloud synchronization via [Turso](https://turso.tech/))
* **Authentication**: [`jose`](https://github.com/panva/jose) (JWT) and [`bcryptjs`](https://github.com/dcodeIO/bcrypt.js)
* **Image Optimization**: [`sharp`](https://sharp.pixelplumbing.com/) & `next/image`

---

## 📂 Directory Structure

```text
pharma/
├── data/                      # Local SQLite database storage
│   └── shellbiotech.db        # Pre-seeded database with products and CMS content
├── public/                    # Static assets
│   ├── images/
│   │   ├── branding/          # Official logos and corporate assets
│   │   ├── network/           # Telangana state distribution SVG map
│   │   ├── office/            # Facility & corporate photography
│   │   └── products/          # Pharmaceutical product packaging images
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── about/             # About Us corporate profile page
│   │   ├── admin/             # Admin CMS portal (dashboard, products, enquiries, etc.)
│   │   ├── api/               # Serverless API routes (enquiries, auth, products, jobs)
│   │   ├── careers/           # Careers and job openings
│   │   ├── contact/           # Contact and institutional enquiry form
│   │   ├── network/           # Telangana operating geography & interactive map
│   │   ├── products/          # Product catalogue & dynamic [slug] product detail
│   │   ├── quality/           # Quality compliance & regulatory standards
│   │   ├── globals.css        # Core design tokens, typography, and utility classes
│   │   ├── layout.tsx         # Root layout with metadata and fonts
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable UI components
│   │   ├── AdminSidebar.tsx   # Admin dashboard navigation sidebar
│   │   ├── Footer.tsx         # Corporate footer with credentials and navigation
│   │   ├── Navbar.tsx         # Responsive header with branding and action buttons
│   │   ├── OfficeCarousel.tsx # Homepage corporate photo carousel
│   │   └── TelanganaMap.tsx   # Interactive healthcare network map component
│   └── lib/                   # Utility libraries & database client
│       ├── auth.ts            # Admin JWT token generation and verification
│       └── db.ts              # libSQL database connection & auto-migration seeds
├── .env.example               # Template for environment variables
├── .gitignore                 # Optimized git ignore for Next.js & Vercel
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js**: v18.18 or higher (v20+ recommended)
* **npm**: v9+ (or `yarn` / `pnpm` / `bun`)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/shell-biotech.git
cd shell-biotech
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables (Optional for local development)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(By default, the app will run with secure local fallbacks and local SQLite database).*

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Portal & Credentials

The administrative control center is accessible at:
👉 **`http://localhost:3000/admin/login`**

### Default Administrator Credentials:
* **Email**: `admin@shellbiotech.in`
* **Password**: `Admin@ShellBiotech2026!`

*(You can change the credentials directly inside the database or via the admin settings).*

---

## ☁️ Deploying to GitHub & Vercel

Follow these simple steps to push your project to GitHub and deploy it live on Vercel:

### Step 1: Initialize Git and Push to GitHub

1. Open your terminal in the project directory (`d:\pharma`).
2. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete Shell Biotech web portal and Admin CMS"
   ```
3. Create a new repository on [GitHub](https://github.com/new) (e.g., `shell-biotech`).
4. Link your local repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/shell-biotech.git
   git push -u origin main
   ```

---

### Step 2: Deploy to Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository (`shell-biotech`) and click **"Import"**.
4. In the Project Configuration:
   * **Framework Preset**: `Next.js` (automatically detected)
   * **Root Directory**: `./`
   * **Build Command**: `npm run build`
   * **Output Directory**: `.next`
5. Click **"Deploy"**. Vercel will build and launch your website!

---

### Step 3: Database & Environment Variables on Vercel

Because Vercel runs on a serverless infrastructure, the file system is read-only after build:

#### Option A: Zero-Config Static & Catalog Sourcing (Default)
The pre-seeded SQLite database (`data/shellbiotech.db`) is included in your repository. All your products, categories, pages, and images will display immediately upon deployment.

#### Option B: Persistent Cloud Database with Turso (Recommended for Production CMS)
If you want administrative changes (adding new products, receiving new enquiries) to persist across Vercel serverless function instances:
1. Create a free database at [Turso](https://turso.tech) (100% compatible with `@libsql/client`).
2. Copy your database URL and Auth Token.
3. In your Vercel Dashboard, navigate to **Settings** → **Environment Variables** and add:
   * `ADMIN_JWT_SECRET`: A secure 32+ character secret string.
   * `TURSO_DATABASE_URL`: `libsql://your-db-name.turso.io`
   * `TURSO_AUTH_TOKEN`: Your Turso authorization token.
4. Redeploy. Your app will automatically connect to Turso with full real-time persistence!

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server with Turbopack |
| `npm run build` | Compiles an optimized production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |

---

## 📄 License & Rights

Copyright © 2013–2026 **Shell Biotech**. All rights reserved.  
180/5/P, Road No. 03, Ground Floor, Kuntloor, Sunrise Colony, Hyderabad – 501505, Telangana, India.
