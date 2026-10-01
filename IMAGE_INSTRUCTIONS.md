# SHELL BIOTECH — IMAGE ASSET & REPLACEMENT GUIDE

This guide explains how to add, replace, or customize all images across the website.

---

## 1. Where the Images Folder Is Located

You can access images directly in either of these two locations (they are automatically linked):

- **Direct Folder**: `D:\pharma\images\`
- **Web Public Folder**: `D:\pharma\public\images\`

Any image you paste into `D:\pharma\images\` is immediately available to the website at `/images/...`.

---

## 2. Default Image Files & Locations

We have created ready-to-use default `.jpg` and `.png` images for each section. When you have your official photos, simply replace them with the exact same filenames:

### A. Company Logo (Navbar & Footer)
- **File path**: `D:\pharma\images\branding\logo.png`
- **Supported formats**: `.png`, `.svg`, `.jpg`
- **Location on website**: Top navigation bar (left side) and footer branding.
- **Tip**: A transparent PNG or clean SVG logo looks best against the navy header.

### B. Homepage Hero Background
- **File path**: `D:\pharma\images\home\hero.jpg`
- **Supported formats**: `.jpg`, `.png`, `.webp`
- **Location on website**: Full-bleed background of the main hero section at `/`.
- **Recommended resolution**: 1920x1080px or higher.

### C. Homepage & About Section Image
- **File path**: `D:\pharma\images\home\about.jpg`
- **Location on website**: "Who We Are" section on homepage and About page.

### D. Registered Office Image
- **File path**: `D:\pharma\images\company\office.jpg`
- **Location on website**: About Company office section (`/about`).

### E. Telangana Network Map
- **File path**: `D:\pharma\images\network\telangana-map.png` (or `telangana-map.svg` / `telangana-map.jpg`)
- **Location on website**: "Our Presence" section on homepage and Our Network page (`/network`).
- **How to update**: Simply paste your custom map image file named `telangana-map.png` or `telangana-map.svg` into this folder.

### F. Product Packaging Photography
- **Folder**: `D:\pharma\images\products\`
- **Filenames**:
  - `new-fit.jpg`
  - `newpod-100.jpg`
  - `newpod-200.jpg`
  - `cold-rap.jpg`
  - `entro-win.jpg`
  - `mefwin-ds.jpg`
  - `clav-win.jpg`
  - `daigiron.jpg`
  - `calsiwin-d3.jpg`
  - `winfer-xt-tablet.jpg`
  - `winfer-xt-syrup.jpg`
  - `win-cough.jpg`
  - `win-cough-ls.jpg`

---

## 3. Uploading Images via Admin Dashboard

You can also upload images directly from your browser without opening folders:
1. Log in to the Admin Dashboard at: `http://localhost:3000/admin/login`
2. Navigate to **Media Library** (`/admin/media`)
3. Click **Select File to Upload** (supports JPG, PNG, WEBP, SVG, PDF up to 10MB)
4. Click **Copy URL** on the uploaded file
5. Paste that URL into any product or page in the Admin Dashboard!
