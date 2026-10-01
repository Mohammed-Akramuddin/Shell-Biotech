import fs from 'fs';
import path from 'path';

const products = [
  {
    filename: 'new-fit.svg',
    name: 'New-fit',
    generic: 'Multivitamin + Multimineral & Antioxidant',
    dosage: 'SOFTGELS / SYRUP / DROPS',
    badge: 'Daily Vitality Formulation',
    color: '#0B1F33',
    accentColor: '#C49A45',
    type: 'box',
    pack: 'Comprehensive Therapy',
  },
  {
    filename: 'newpod-100.svg',
    name: 'Newpod-100',
    generic: 'Cefpodoxime Oral Suspension',
    dosage: '100 mg / 5 ml',
    badge: 'Oral Suspension',
    color: '#1F5582',
    accentColor: '#E27D60',
    type: 'bottle-box',
    pack: 'With Sterile Measuring Cap',
  },
  {
    filename: 'newpod-200.svg',
    name: 'Newpod-200',
    generic: 'Cefpodoxime Proxetil Tablets IP',
    dosage: '200 mg',
    badge: 'Film-Coated Tablets',
    color: '#0B1F33',
    accentColor: '#1F5582',
    type: 'blister-box',
    pack: '10 x 10 Tablets Strip',
  },
  {
    filename: 'cold-rap.svg',
    name: 'Cold RAP',
    generic: 'Chlorpheniramine Maleate & Phenylephrine HCl',
    dosage: '2 mg & 5 mg / 5 ml',
    badge: 'Oral Syrup',
    color: '#496B5A',
    accentColor: '#3A8068',
    type: 'bottle',
    pack: '60 ml Bottle',
  },
  {
    filename: 'entro-win.svg',
    name: 'Entro-Win',
    generic: 'Bacillus clausii Oral Suspension',
    dosage: '2 Billion Spores / 5 ml',
    badge: 'Probiotic Suspension',
    color: '#2A5D4D',
    accentColor: '#6BBF8C',
    type: 'flacons',
    pack: 'Mini-flacons 5 ml Oral Use',
  },
  {
    filename: 'mefwin-ds.svg',
    name: 'MefWin-DS',
    generic: 'Mefenamic Acid & Paracetamol Suspension',
    dosage: '100 mg & 250 mg / 5 ml',
    badge: 'Double Strength Oral Suspension',
    color: '#7A2E2E',
    accentColor: '#D9534F',
    type: 'bottle-box',
    pack: '60 ml Bottle',
  },
  {
    filename: 'clav-win.svg',
    name: 'Clav-Win',
    generic: 'Amoxycillin & Potassium Clavulanate',
    dosage: '200 mg & 28.5 mg / 5 ml',
    badge: 'Oral Suspension with WFI',
    color: '#244B6B',
    accentColor: '#5BC0BE',
    type: 'bottle-box',
    pack: '60 ml Dry Syrup Pack',
  },
  {
    filename: 'daigiron.svg',
    name: 'Daigiron',
    generic: 'Fungal Diastase & Papain Syrup',
    dosage: '50 mg & 30 mg / 10 ml',
    badge: 'Digestive Enzyme Formulation',
    color: '#6E4823',
    accentColor: '#E09F3E',
    type: 'bottle',
    pack: '200 ml Amber Bottle',
  },
  {
    filename: 'calsiwin-d3.svg',
    name: 'Calsiwin-D3',
    generic: 'Calcium Carbonate, Magnesium, Zinc & Vit D3',
    dosage: '625 mg + 180 mg + 14 mg + 200 IU',
    badge: 'Mineral Suspension',
    color: '#345268',
    accentColor: '#78A1BB',
    type: 'bottle-box',
    pack: '200 ml Suspension',
  },
  {
    filename: 'winfer-xt-tablet.svg',
    name: 'Winfer-XT',
    generic: 'Ferrous Ascorbate, Folic Acid & Zinc Sulphate',
    dosage: 'Haematinic Tablets',
    badge: 'Film-Coated Tablets',
    color: '#8A252C',
    accentColor: '#C94C4C',
    type: 'blister-box',
    pack: '10 x 10 Blister Pack',
  },
  {
    filename: 'winfer-xt-syrup.svg',
    name: 'Winfer-XT Syrup',
    generic: 'Ferric Ammonium Citrate & Folic Acid',
    dosage: '150 mg & 0.5 mg / 15 ml',
    badge: 'Oral Haematinic Syrup',
    color: '#701D24',
    accentColor: '#D15858',
    type: 'bottle',
    pack: '200 ml Bottle',
  },
  {
    filename: 'win-cough.svg',
    name: 'Win-Cough',
    generic: 'Terbutaline, Guaiphenesin, Ambroxol & Menthol',
    dosage: '1.5 mg + 50 mg + 15 mg + 1 mg',
    badge: 'Expectorant Syrup',
    color: '#2B5366',
    accentColor: '#489FB5',
    type: 'bottle',
    pack: '100 ml Bottle',
  },
  {
    filename: 'win-cough-ls.svg',
    name: 'Win-Cough LS',
    generic: 'Levosalbutamol, Ambroxol HCl & Guaiphenesin',
    dosage: '1 mg + 30 mg + 50 mg / 5 ml',
    badge: 'Bronchodilator Syrup',
    color: '#385E42',
    accentColor: '#588B67',
    type: 'bottle',
    pack: '100 ml Bottle',
  },
];

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function generateSvg(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" fill="none">
  <defs>
    <radialGradient id="bg-grad-${p.filename}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#EDF0EE"/>
    </radialGradient>
    <linearGradient id="box-grad-${p.filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F7FAF8"/>
    </linearGradient>
    <linearGradient id="header-grad-${p.filename}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${p.color}"/>
      <stop offset="100%" stop-color="${p.accentColor}"/>
    </linearGradient>
    <filter id="shadow-${p.filename}" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0B1F33" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Clean Studio Background -->
  <rect width="600" height="600" fill="url(#bg-grad-${p.filename})"/>

  <!-- Pedestal Base Shadow -->
  <ellipse cx="300" cy="510" rx="190" ry="24" fill="#0B1F33" opacity="0.08"/>
  <ellipse cx="300" cy="508" rx="140" ry="14" fill="#0B1F33" opacity="0.12"/>

  <!-- Product Packaging Box -->
  <g filter="url(#shadow-${p.filename})">
    <!-- Main Carton Box -->
    <rect x="160" y="100" width="280" height="390" rx="4" fill="url(#box-grad-${p.filename})" stroke="#D9DDDA" stroke-width="1.5"/>

    <!-- Top Accent Bar -->
    <path d="M 161 101 L 439 101 L 439 116 L 161 116 Z" fill="url(#header-grad-${p.filename})"/>

    <!-- Pharma Rx Symbol -->
    <g transform="translate(184, 134)">
      <text font-family="'Manrope', sans-serif" font-size="20" font-weight="800" fill="${p.color}">Rx</text>
    </g>

    <!-- Top Badge / Category -->
    <rect x="230" y="132" width="186" height="22" rx="2" fill="#F0F4F2"/>
    <text x="238" y="147" font-family="'Inter', sans-serif" font-size="8.5" font-weight="700" letter-spacing="0.08em" fill="${p.color}">
      ${esc(p.badge).toUpperCase()}
    </text>

    <!-- Brand Name (Large Editorial Typography) -->
    <text x="184" y="200" font-family="'Manrope', sans-serif" font-size="28" font-weight="800" letter-spacing="-0.02em" fill="${p.color}">
      ${esc(p.name)}
    </text>

    <!-- Active Formula / Composition -->
    <foreignObject x="184" y="215" width="232" height="60">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Inter', sans-serif; font-size: 11px; line-height: 1.4; color: #496B5A; font-weight: 600;">
        ${esc(p.generic)}
      </div>
    </foreignObject>

    <!-- Dosage Strength Pill / Badge -->
    <g transform="translate(184, 285)">
      <rect x="0" y="0" width="232" height="32" rx="2" fill="${p.color}"/>
      <text x="12" y="20" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" letter-spacing="0.04em">
        ${esc(p.dosage)}
      </text>
    </g>

    <!-- Mid divider -->
    <line x1="184" y1="335" x2="416" y2="335" stroke="#E2E6E3" stroke-width="1"/>

    <!-- Packaging / Presentation info -->
    <text x="184" y="360" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#7E878C" letter-spacing="0.05em">
      PACKAGING SPECIFICATION
    </text>
    <text x="184" y="380" font-family="'Inter', sans-serif" font-size="11.5" font-weight="600" fill="#202426">
      ${esc(p.pack)}
    </text>

    <!-- Lower Brand Stamp -->
    <rect x="161" y="440" width="278" height="49" fill="#FAFAF7"/>
    <line x1="161" y1="440" x2="439" y2="440" stroke="#D9DDDA" stroke-width="1"/>
    
    <text x="184" y="462" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" letter-spacing="0.1em" fill="#0B1F33">
      SHELL BIOTECH
    </text>
    <text x="184" y="475" font-family="'Inter', sans-serif" font-size="8" font-weight="500" letter-spacing="0.08em" fill="#596166">
      Sourced via Partner Manufacturing
    </text>

    <!-- Holographic security strip simulation -->
    <rect x="390" y="448" width="26" height="32" rx="1" fill="#E8ECE9" stroke="#C8D4CE" stroke-width="0.75"/>
    <line x1="390" y1="454" x2="416" y2="454" stroke="#8E9B90" stroke-width="0.5"/>
    <line x1="390" y1="460" x2="416" y2="460" stroke="#8E9B90" stroke-width="0.5"/>
    <line x1="390" y1="466" x2="416" y2="466" stroke="#8E9B90" stroke-width="0.5"/>
    <line x1="390" y1="472" x2="416" y2="472" stroke="#8E9B90" stroke-width="0.5"/>
  </g>

  <!-- Clean corner metadata tag -->
  <g transform="translate(30, 40)">
    <text font-family="'Inter', sans-serif" font-size="9" font-weight="700" letter-spacing="0.12em" fill="#8E9B90">VERIFIED PHARMACEUTICAL PRESENTATION</text>
  </g>
</svg>`;
}

const targetDir = path.join(process.cwd(), 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

for (const prod of products) {
  const filePath = path.join(targetDir, prod.filename);
  fs.writeFileSync(filePath, generateSvg(prod), 'utf-8');
  console.log(`Generated: ${prod.filename}`);
}

console.log('All 13 product SVGs generated successfully.');
