const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClient } = require('@libsql/client');

const brainDir = 'C:/Users/hrush/.gemini/antigravity-ide/brain/04115a22-2e66-4d2a-aaa8-144e092163b9';
const publicDir = path.join(__dirname, '../public/images/products');

const productMapping = [
  {
    slug: 'new-fit',
    source: 'new_fit_product_1790795705750.jpg',
    name: 'New-fit',
    category_name: 'Softgels',
    dosage_form: 'Softgels / Syrup / Drops',
    composition: 'Multivitamin + Multimineral & Antioxidant',
    strength: 'Therapeutic Nutritional Formula',
    pack_size: '200 ml Syrup / Softgels / 30 ml Drops',
    description: 'A comprehensive nutritional formula developed to address dietary gaps and support healthy development, vitality, and sustained wellness across paediatric and adult regimens.'
  },
  {
    slug: 'daigiron',
    source: 'daigiron_product_1790795864846.jpg',
    name: 'Daigiron',
    category_name: 'Syrups',
    dosage_form: 'Digestive Enzyme Syrup',
    composition: 'Fungal Diastase 50 mg & Papain 30 mg',
    strength: 'Per 10 ml: Fungal Diastase 50 mg, Papain 30 mg',
    pack_size: '200 ml Bottle',
    description: 'Delicious digestive enzyme syrup facilitating the digestion of carbohydrates, proteins, and fats, indicated for dyspepsia, flatulence, and appetite loss.'
  },
  {
    slug: 'calsiwin-d3',
    source: 'calsiwin_product_1790795915741.jpg',
    name: 'Calsiwin-D3',
    category_name: 'Suspensions',
    dosage_form: 'Suspension',
    composition: 'Calcium Carbonate 625 mg, Magnesium 180 mg, Zinc 14 mg & Vitamin D3 200 IU',
    strength: 'Oyster Shell Calcium, Vitamin D3 & Essential Minerals',
    pack_size: '200 ml Bottle',
    description: 'Rational mineral and vitamin combination designed for bone strengthening, cortical bone preservation, and nutritional support in elderly and fracture recovery regimens.'
  },
  {
    slug: 'mefwin-ds',
    source: 'mefwin_product_1790795961516.jpg',
    name: 'MefWin-DS',
    category_name: 'Suspensions',
    dosage_form: 'Suspension',
    composition: 'Mefenamic Acid IP 100 mg & Paracetamol IP 250 mg',
    strength: 'Per 5 ml: Paracetamol 250 mg, Mefenamic Acid 100 mg',
    pack_size: '60 ml Bottle',
    description: 'Fast-acting antipyretic and anti-inflammatory oral suspension engineered for the symptomatic relief of colics, smooth muscle spasms, and pediatric fever without anticholinergic side effects.'
  },
  {
    slug: 'cold-rap',
    source: 'cold_rap_product_1790796011476.jpg',
    name: 'Cold RAP',
    category_name: 'Syrups',
    dosage_form: 'Syrup',
    composition: 'Chlorpheniramine Maleate IP 2 mg & Phenylephrine Hydrochloride IP 5 mg',
    strength: 'Per 5 ml: Phenylephrine HCl 5 mg, Chlorpheniramine Maleate 2 mg',
    pack_size: '60 ml Bottle',
    description: 'Dual-action pediatric anti-cold formulation combining a powerful decongestant and anti-allergic agent for rapid symptom termination in dry cough, cold symptoms, and congestion.'
  },
  {
    slug: 'winfer-xt-syrup',
    source: 'winfer_syrup_product_1790796067546.jpg',
    name: 'Winfer-XT Syrup',
    category_name: 'Syrups',
    dosage_form: 'Syrup',
    composition: 'Ferric Ammonium Citrate 150 mg & Folic Acid 0.5 mg (with Cyanocobalamin)',
    strength: 'Ferrous Fumarate / Ferric Complex with Folic Acid & Vitamin B12',
    pack_size: '200 ml Bottle',
    description: 'Gentle and caring hematinic syrup developed to support healthy hemoglobin levels, nourish red blood cells, and combat anemia during convalescence and pregnancy.'
  },
  {
    slug: 'winfer-xt-tablet',
    source: 'winfer_tablet_product_1790796120792.jpg',
    name: 'Winfer-XT Tablet',
    category_name: 'Tablets',
    dosage_form: 'Tablets',
    composition: 'Ferrous Ascorbate 100 mg, Folic Acid 1.5 mg & Zinc Sulphate Tablets',
    strength: 'Ferrous Ascorbate 100 mg + Folic Acid 1.5 mg + Zinc 22.5 mg',
    pack_size: '10 x 1 x 10 Tablets',
    description: 'Therapeutic hematinic tablet formulation offering superior GI tolerability and 3-fold higher bioavailability for iron deficiency anemia, pregnancy, and lactation.'
  },
  {
    slug: 'newpod-200',
    source: 'newpod200_product_1790796176166.jpg',
    name: 'Newpod-200',
    category_name: 'Tablets',
    dosage_form: 'Dispersible Tablets',
    composition: 'Cefpodoxime Proxetil Dispersible Tablets IP',
    strength: '200 mg',
    pack_size: '10 x 10 Dispersible Tablets',
    description: 'Safe yet powerful broad-spectrum antibacterial with higher stability against beta-lactamases, offering proven efficacy across RTIs, sinusitis, bronchitis, pneumonia, and soft tissue infections.'
  },
  {
    slug: 'newpod-100',
    source: 'newpod100_product_1790796225734.jpg',
    name: 'Newpod-100',
    category_name: 'Suspensions',
    dosage_form: 'Oral Suspension / Dry Syrup',
    composition: 'Cefpodoxime Proxetil Oral Suspension IP',
    strength: '100 mg / 5 ml',
    pack_size: '30 ml Dry Syrup with Sterile Water',
    description: 'Third-generation cephalosporin oral suspension indicated for acute otitis media, upper and lower respiratory tract infections, genitourinary infections, and skin infections.'
  },
  {
    slug: 'clav-win',
    source: 'clav_win_product_1790796271403.jpg',
    name: 'Clav-Win',
    category_name: 'Suspensions',
    dosage_form: 'Suspension',
    composition: 'Amoxycillin 200 mg & Potassium Clavulanate 28.5 mg Suspension',
    strength: 'Per 5 ml: Amoxycillin 200 mg, Potassium Clavulanate 28.5 mg',
    pack_size: '60 ml Suspension with Sterile Water',
    description: 'Distinctly superior beta-lactamase inhibitor combination offering broad-spectrum efficacy for tonsillopharyngitis, sinusitis, bronchitis, dental, and soft tissue infections.'
  },
  {
    slug: 'entro-win',
    source: 'entro_win_product_1790796313107.jpg',
    name: 'Entro-Win',
    category_name: 'Suspensions',
    dosage_form: 'Suspension',
    composition: 'Bacillus clausii Spores Suspension',
    strength: '2 Billion Spores / 5 ml',
    pack_size: '5 ml Single-Dose Oral Mini-Flacons',
    description: 'Probiotic suspension of Bacillus clausii spores providing rapid control over diarrhea, restoring gut microbiota, and serving as a trusted adjunct to ORS and antibiotic therapy.'
  },
  {
    slug: 'win-cough',
    source: 'win_cough_product_1790796360204.jpg',
    name: 'Win-Cough',
    category_name: 'Syrups',
    dosage_form: 'Syrup',
    composition: 'Terbutaline 1.5 mg, Guaiphenesin 50 mg, Ambroxol 15 mg & Menthol 1 mg',
    strength: 'Per 5 ml Syrup (Mentholated Base)',
    pack_size: '100 ml Bottle',
    description: 'Trusted prescription bronchodilator, expectorant, and mucolytic syrup with mentholated base for the comprehensive management of productive cough and bronchitis.'
  },
  {
    slug: 'win-cough-ls',
    source: 'win_cough_ls_product_1790796429738.jpg',
    name: 'Win-Cough LS',
    category_name: 'Syrups',
    dosage_form: 'Syrup',
    composition: 'Levosalbutamol 1 mg, Ambroxol Hydrochloride 30 mg & Guaiphenesin 50 mg',
    strength: 'Per 5 ml Syrup (Sugar Free)',
    pack_size: '100 ml Bottle',
    description: 'Sugar-free respiratory formulation combining selective B2-agonist levosalbutamol with ambroxol and guaiphenesin to clear airways and relieve bronchospasms.'
  }
];

async function run() {
  const client = createClient({ url: 'file:data/shellbiotech.db' });

  for (const item of productMapping) {
    const srcFile = path.join(brainDir, item.source);
    const destJpg = path.join(publicDir, item.slug + '.jpg');
    const destPng = path.join(publicDir, item.slug + '.png');

    console.log('Processing:', item.slug, 'from', item.source);

    // Save as high-quality JPEG (95%)
    await sharp(srcFile)
      .resize(1024, 1024, { fit: 'inside' })
      .jpeg({ quality: 95 })
      .toFile(destJpg);

    // Also save as PNG
    await sharp(srcFile)
      .resize(1024, 1024, { fit: 'inside' })
      .png({ quality: 95 })
      .toFile(destPng);

    // Update database record
    await client.execute({
      sql: `UPDATE products 
            SET name = ?,
                category_name = ?,
                dosage_form = ?,
                composition = ?,
                strength = ?,
                pack_size = ?,
                description = ?,
                image = ?,
                updated_at = datetime('now')
            WHERE slug = ?`,
      args: [
        item.name,
        item.category_name,
        item.dosage_form,
        item.composition,
        item.strength,
        item.pack_size,
        item.description,
        '/images/products/' + item.slug + '.jpg',
        item.slug
      ]
    });
    console.log('Updated db for:', item.slug);
  }

  const check = await client.execute('SELECT slug, name, image, pack_size FROM products');
  console.log('Verification:');
  console.table(check.rows);
}

run().catch(console.error);
