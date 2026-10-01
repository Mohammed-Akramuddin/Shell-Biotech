import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function convert() {
  const baseDir = path.join(process.cwd(), 'public', 'images');

  // 1. Hero image
  const heroSvg = path.join(baseDir, 'home', 'hero.svg');
  if (fs.existsSync(heroSvg)) {
    await sharp(heroSvg)
      .jpeg({ quality: 90 })
      .toFile(path.join(baseDir, 'home', 'hero.jpg'));
    console.log('Created: home/hero.jpg');
  }

  // 2. About image
  const aboutSvg = path.join(baseDir, 'home', 'about.svg');
  if (fs.existsSync(aboutSvg)) {
    await sharp(aboutSvg)
      .jpeg({ quality: 90 })
      .toFile(path.join(baseDir, 'home', 'about.jpg'));
    console.log('Created: home/about.jpg');
  }

  // 3. Office image
  const officeSvg = path.join(baseDir, 'company', 'office.svg');
  if (fs.existsSync(officeSvg)) {
    await sharp(officeSvg)
      .jpeg({ quality: 90 })
      .toFile(path.join(baseDir, 'company', 'office.jpg'));
    console.log('Created: company/office.jpg');
  }

  // 4. Logo PNG and JPG
  const logoSvg = path.join(baseDir, 'branding', 'logo.svg');
  if (fs.existsSync(logoSvg)) {
    await sharp(logoSvg)
      .png()
      .toFile(path.join(baseDir, 'branding', 'logo.png'));
    await sharp(logoSvg)
      .jpeg({ quality: 95 })
      .toFile(path.join(baseDir, 'branding', 'logo.jpg'));
    console.log('Created: branding/logo.png and branding/logo.jpg');
  }

  // 5. Telangana map PNG
  const mapSvg = path.join(baseDir, 'network', 'telangana-map.svg');
  if (fs.existsSync(mapSvg)) {
    await sharp(mapSvg)
      .png()
      .toFile(path.join(baseDir, 'network', 'telangana-map.png'));
    await sharp(mapSvg)
      .jpeg({ quality: 90 })
      .toFile(path.join(baseDir, 'network', 'telangana-map.jpg'));
    console.log('Created: network/telangana-map.png and telangana-map.jpg');
  }

  // 6. Products JPGs and PNGs
  const prodDir = path.join(baseDir, 'products');
  const files = fs.readdirSync(prodDir);
  for (const f of files) {
    if (f.endsWith('.svg')) {
      const name = path.basename(f, '.svg');
      const svgPath = path.join(prodDir, f);
      await sharp(svgPath)
        .jpeg({ quality: 90 })
        .toFile(path.join(prodDir, `${name}.jpg`));
      await sharp(svgPath)
        .png()
        .toFile(path.join(prodDir, `${name}.png`));
      console.log(`Created: products/${name}.jpg & .png`);
    }
  }

  console.log('All images converted to .jpg and .png successfully.');
}

convert().catch(console.error);
