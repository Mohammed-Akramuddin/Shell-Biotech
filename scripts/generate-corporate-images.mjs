import fs from 'fs';
import path from 'path';

// 1. Home Hero image (Full bleed corporate pharmaceutical sourcing & healthcare distribution visual)
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" fill="none">
  <defs>
    <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#071421"/>
      <stop offset="60%" stop-color="#0B1F33"/>
      <stop offset="100%" stop-color="#142B42"/>
    </linearGradient>
    <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#16324F" stroke-width="0.8" opacity="0.4"/>
    </pattern>
    <radialGradient id="subtle-light" cx="70%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#496B5A" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0B1F33" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Deep Corporate Architectural Backdrop -->
  <rect width="1920" height="1080" fill="url(#hero-grad)"/>
  <rect width="1920" height="1080" fill="url(#subtle-light)"/>
  <rect width="1920" height="1080" fill="url(#grid-pattern)"/>

  <!-- Architectural corporate glass & steel lines representing pharmaceutical distribution logistics -->
  <g opacity="0.25">
    <line x1="800" y1="0" x2="1400" y2="1080" stroke="#FFFFFF" stroke-width="1.5"/>
    <line x1="1100" y1="0" x2="1700" y2="1080" stroke="#FFFFFF" stroke-width="1"/>
    <line x1="600" y1="0" x2="1200" y2="1080" stroke="#496B5A" stroke-width="2"/>
    
    <!-- Clean geometric horizon -->
    <line x1="0" y1="720" x2="1920" y2="720" stroke="#FFFFFF" stroke-width="0.5"/>
    <line x1="0" y1="840" x2="1920" y2="840" stroke="#8E9B90" stroke-width="0.5"/>
  </g>

  <!-- Clean Corporate Warehouse / Logistics Silhouettes (Muted) -->
  <g opacity="0.18">
    <rect x="1200" y="420" width="600" height="300" fill="#244B6B"/>
    <rect x="1250" y="460" width="80" height="140" fill="#071421"/>
    <rect x="1360" y="460" width="80" height="140" fill="#071421"/>
    <rect x="1470" y="460" width="80" height="140" fill="#071421"/>
    <rect x="1580" y="460" width="80" height="140" fill="#071421"/>
  </g>

  <!-- Editorial watermark tag -->
  <g transform="translate(1600, 1000)">
    <text font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#5B8570" letter-spacing="0.16em">
      SHELL BIOTECH / TELANGANA
    </text>
  </g>
</svg>`;

// 2. About section image (Editorial corporate healthcare sourcing)
const aboutSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" width="1000" height="800" fill="none">
  <defs>
    <linearGradient id="about-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2F3F1"/>
      <stop offset="100%" stop-color="#E2E6E3"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="800" fill="url(#about-bg)"/>
  <rect x="40" y="40" width="920" height="720" stroke="#D9DDDA" stroke-width="1.5" fill="#FFFFFF"/>
  
  <!-- Architectural framing -->
  <rect x="80" y="80" width="840" height="480" fill="#0B1F33" opacity="0.04"/>
  
  <!-- Healthcare supply chain diagram / visual -->
  <g transform="translate(140, 160)">
    <!-- Node 1: Sourcing -->
    <rect x="0" y="0" width="200" height="140" rx="2" fill="#FFFFFF" stroke="#0B1F33" stroke-width="2"/>
    <text x="24" y="40" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#496B5A" letter-spacing="0.08em">PHASE 01</text>
    <text x="24" y="70" font-family="'Manrope', sans-serif" font-size="16" font-weight="700" fill="#0B1F33">Manufacturing</text>
    <text x="24" y="92" font-family="'Manrope', sans-serif" font-size="16" font-weight="700" fill="#0B1F33">Partners</text>
    <text x="24" y="118" font-family="'Inter', sans-serif" font-size="10" fill="#7E878C">Licensed Out-of-State Units</text>

    <!-- Connector -->
    <line x1="200" y1="70" x2="260" y2="70" stroke="#496B5A" stroke-width="2" stroke-dasharray="4 4"/>

    <!-- Node 2: Shell Biotech -->
    <rect x="260" y="-10" width="220" height="160" rx="2" fill="#0B1F33"/>
    <text x="284" y="35" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#8E9B90" letter-spacing="0.08em">PHASE 02</text>
    <text x="284" y="72" font-family="'Manrope', sans-serif" font-size="18" font-weight="800" fill="#FFFFFF">SHELL BIOTECH</text>
    <text x="284" y="98" font-family="'Inter', sans-serif" font-size="11" fill="#B8C4CC">Sourcing &amp; Quality QA</text>
    <text x="284" y="118" font-family="'Inter', sans-serif" font-size="11" fill="#B8C4CC">Marketing &amp; Allocation</text>

    <!-- Connector -->
    <line x1="480" y1="70" x2="540" y2="70" stroke="#496B5A" stroke-width="2" stroke-dasharray="4 4"/>

    <!-- Node 3: Network -->
    <rect x="540" y="0" width="200" height="140" rx="2" fill="#FFFFFF" stroke="#0B1F33" stroke-width="2"/>
    <text x="564" y="40" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#496B5A" letter-spacing="0.08em">PHASE 03</text>
    <text x="564" y="70" font-family="'Manrope', sans-serif" font-size="16" font-weight="700" fill="#0B1F33">Hospitals &amp;</text>
    <text x="564" y="92" font-family="'Manrope', sans-serif" font-size="16" font-weight="700" fill="#0B1F33">Institutions</text>
    <text x="564" y="118" font-family="'Inter', sans-serif" font-size="10" fill="#7E878C">Telangana Supply Network</text>
  </g>

  <!-- Editorial caption at bottom -->
  <g transform="translate(80, 620)">
    <text font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#496B5A" letter-spacing="0.12em">OPERATING PARADIGM</text>
    <text font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#0B1F33" y="30">
      Structured pharmaceutical distribution bridging manufacturing to point of care
    </text>
    <text font-family="'Inter', sans-serif" font-size="13" fill="#596166" y="58">
      Shell Biotech focuses on commercialization, compliance verification, and regional hospital network supply.
    </text>
  </g>
</svg>`;

// 3. Founder placeholder image (Prompt: Name1, Founder / Partner, explicit placeholder)
const founderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700" fill="none">
  <rect width="600" height="700" fill="#F2F3F1"/>
  <rect x="20" y="20" width="560" height="660" fill="#FFFFFF" stroke="#D9DDDA" stroke-width="1"/>
  
  <!-- Silhouette / Corporate Portrait Placeholder -->
  <g transform="translate(180, 160)">
    <circle cx="120" cy="100" r="70" fill="#0B1F33" opacity="0.15"/>
    <path d="M 30 290 C 30 200, 210 200, 210 290 Z" fill="#0B1F33" opacity="0.15"/>
  </g>

  <g transform="translate(60, 520)">
    <rect x="0" y="0" width="480" height="110" rx="2" fill="#FAFAF7" stroke="#D9DDDA" stroke-width="1"/>
    <text x="24" y="32" font-family="'Inter', sans-serif" font-size="10" font-weight="700" letter-spacing="0.14em" fill="#496B5A">LEADERSHIP PLACEHOLDER</text>
    <text x="24" y="60" font-family="'Manrope', sans-serif" font-size="20" font-weight="800" fill="#0B1F33">Name1</text>
    <text x="24" y="82" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#596166">Founder / Partner — Shell Biotech</text>
    <text x="24" y="100" font-family="'Inter', sans-serif" font-size="10" font-style="italic" fill="#7E878C">Official photography to be updated upon verified provision</text>
  </g>
</svg>`;

// 4. Office placeholder image (Prompt: Registered Office Hyderabad)
const officeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" fill="none">
  <rect width="800" height="600" fill="#0B1F33"/>
  <rect x="20" y="20" width="760" height="560" stroke="#16324F" stroke-width="2"/>
  
  <!-- Office architectural drawing / graphic -->
  <g transform="translate(100, 100)" stroke="#496B5A" stroke-width="1.5">
    <rect x="0" y="40" width="600" height="280" fill="#0E2740"/>
    <line x1="0" y1="120" x2="600" y2="120"/>
    <line x1="0" y1="200" x2="600" y2="200"/>
    <line x1="150" y1="40" x2="150" y2="320"/>
    <line x1="300" y1="40" x2="300" y2="320"/>
    <line x1="450" y1="40" x2="450" y2="320"/>
  </g>

  <g transform="translate(100, 440)">
    <text font-family="'Inter', sans-serif" font-size="10" font-weight="700" letter-spacing="0.14em" fill="#8E9B90">REGISTERED ADMINISTRATIVE OFFICE</text>
    <text font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" y="28">Hyderabad, Telangana – 501505</text>
    <text font-family="'Inter', sans-serif" font-size="12" fill="#B8C4CC" y="52">180/5/P, Road No. 03, Ground Floor, Kuntloor, Sunrise Colony</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'images', 'home', 'hero.svg'), heroSvg, 'utf-8');
fs.writeFileSync(path.join(process.cwd(), 'public', 'images', 'home', 'about.svg'), aboutSvg, 'utf-8');
fs.writeFileSync(path.join(process.cwd(), 'public', 'images', 'company', 'founder.svg'), founderSvg, 'utf-8');
fs.writeFileSync(path.join(process.cwd(), 'public', 'images', 'company', 'office.svg'), officeSvg, 'utf-8');

console.log('Corporate SVGs generated successfully.');
