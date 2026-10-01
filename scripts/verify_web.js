const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- Verifying /products ---');
  const prodPage = await get('/products');
  console.log('Status:', prodPage.status);
  
  const imgMatches = [...prodPage.body.matchAll(/src="([^"]*\/images\/products\/[^"]*)"/g)].map(m => decodeURIComponent(m[1]));
  console.log('Product images found on /products:', imgMatches.length);
  const uniqueImgs = [...new Set(imgMatches.map(s => {
    const m = s.match(/url=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : s;
  }))];
  console.log('Unique product image paths:', uniqueImgs);

  console.log('\n--- Verifying / (Homepage) ---');
  const homePage = await get('/');
  console.log('Homepage status:', homePage.status);
  const hasViewFull = homePage.body.includes('View Full Product Catalogue');
  console.log('Has "View Full Product Catalogue":', hasViewFull);

  console.log('\n--- Verifying /products/new-fit ---');
  const newFitPage = await get('/products/new-fit');
  console.log('New-fit detail status:', newFitPage.status);
  console.log('Contains new-fit.jpg:', newFitPage.body.includes('new-fit.jpg'));
  console.log('Contains Multivitamin + Multimineral:', newFitPage.body.includes('Multivitamin + Multimineral'));

  console.log('\n--- Verifying /products/newpod-200 ---');
  const newpodPage = await get('/products/newpod-200');
  console.log('Newpod-200 detail status:', newpodPage.status);
  console.log('Contains newpod-200.jpg:', newpodPage.body.includes('newpod-200.jpg'));
  console.log('Contains Cefpodoxime Proxetil:', newpodPage.body.includes('Cefpodoxime Proxetil'));

  console.log('\n--- Verifying /products/winfer-xt-tablet ---');
  const winferPage = await get('/products/winfer-xt-tablet');
  console.log('Winfer-XT Tablet detail status:', winferPage.status);
  console.log('Contains winfer-xt-tablet.jpg:', winferPage.body.includes('winfer-xt-tablet.jpg'));

  console.log('\n--- Verifying all 13 product images HTTP 200 ---');
  const allImages = [
    '/images/products/new-fit.jpg',
    '/images/products/daigiron.jpg',
    '/images/products/calsiwin-d3.jpg',
    '/images/products/mefwin-ds.jpg',
    '/images/products/cold-rap.jpg',
    '/images/products/winfer-xt-syrup.jpg',
    '/images/products/winfer-xt-tablet.jpg',
    '/images/products/newpod-200.jpg',
    '/images/products/newpod-100.jpg',
    '/images/products/clav-win.jpg',
    '/images/products/entro-win.jpg',
    '/images/products/win-cough.jpg',
    '/images/products/win-cough-ls.jpg',
  ];

  for (const img of allImages) {
    const res = await get(img);
    console.log(img.padEnd(40), 'Status:', res.status, 'Type:', res.headers['content-type']);
  }
}

verify().catch(console.error);
