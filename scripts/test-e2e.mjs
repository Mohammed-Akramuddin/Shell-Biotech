// Comprehensive End-to-End Automated Test Suite for Shell Biotech
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('====================================================');
  console.log('SHELL BIOTECH — AUTOMATED END-TO-END VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Public Pages Verification
  const pages = [
    { path: '/', title: 'Home Page' },
    { path: '/about', title: 'About Company' },
    { path: '/products', title: 'Product Catalogue' },
    { path: '/products/newpod-100', title: 'Product Detail: Newpod-100' },
    { path: '/products/new-fit', title: 'Product Detail: New-fit' },
    { path: '/quality', title: 'Quality & Compliance' },
    { path: '/network', title: 'Our Network (Telangana)' },
    { path: '/careers', title: 'Careers & Opportunities' },
    { path: '/contact', title: 'Contact & Enquiry' },
  ];

  for (const page of pages) {
    try {
      const res = await fetch(`${BASE_URL}${page.path}`);
      const text = await res.text();
      assert(res.status === 200, `${page.title} returned HTTP 200`);
      assert(text.includes('SHELL BIOTECH'), `${page.title} contains SHELL BIOTECH branding`);
    } catch (err) {
      assert(false, `${page.title} failed to fetch: ${err.message}`);
    }
  }

  // 2. Submit Public Enquiry
  let enquiryCookie = '';
  try {
    const enqRes = await fetch(`${BASE_URL}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Dr. Srinivas Rao',
        email: 'srinivas.rao@carehospitals.in',
        phone: '+91 98490 12345',
        company: 'Care Hospitals Banjara Hills',
        subject: 'Institutional Procurement: Newpod-100',
        message: 'Requesting monthly supply quotation and COA documentation for Newpod-100 suspension.',
        product_name: 'Newpod-100',
        product_slug: 'newpod-100',
      }),
    });
    const enqData = await enqRes.json();
    assert(enqRes.status === 200 && enqData.success, 'Public enquiry API saved successfully');
  } catch (err) {
    assert(false, `Public enquiry submission error: ${err.message}`);
  }

  // 3. Submit Career Application
  try {
    const appRes = await fetch(`${BASE_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        applicant_name: 'Ananya Reddy',
        email: 'ananya.reddy@gmail.com',
        phone: '+91 99887 66554',
        job_id: 1,
        job_title: 'Medical Sales Representative',
        resume_url: 'https://linkedin.com/in/ananya-reddy-pharma',
        message: 'B.Pharm graduate with 1 year field training in Hyderabad hospitals.',
      }),
    });
    const appData = await appRes.json();
    assert(appRes.status === 200 && appData.success, 'Career application API saved successfully');
  } catch (err) {
    assert(false, `Career application submission error: ${err.message}`);
  }

  // 4. Admin Authentication
  let adminCookie = '';
  try {
    const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@shellbiotech.in',
        password: 'Admin@ShellBiotech2026!',
      }),
    });
    const loginData = await loginRes.json();
    const setCookie = loginRes.headers.get('set-cookie');
    if (setCookie) {
      adminCookie = setCookie.split(';')[0];
    }
    assert(loginRes.status === 200 && loginData.success, 'Admin login succeeded with verified credentials');
    assert(adminCookie.startsWith('sb_admin_token='), 'Admin session cookie generated');
  } catch (err) {
    assert(false, `Admin login error: ${err.message}`);
  }

  // 5. Protected Admin Endpoints Verification
  if (adminCookie) {
    // Admin Products GET
    try {
      const prodRes = await fetch(`${BASE_URL}/api/admin/products`, {
        headers: { Cookie: adminCookie },
      });
      const prodData = await prodRes.json();
      assert(prodRes.status === 200 && Array.isArray(prodData.products), `Admin products API returned ${prodData.products?.length} items`);
    } catch (err) {
      assert(false, `Admin products fetch failed: ${err.message}`);
    }

    // Admin Add New Product
    try {
      const addRes = await fetch(`${BASE_URL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
        body: JSON.stringify({
          name: 'Win-Vit D3 Drops',
          slug: 'win-vit-d3-drops',
          category_name: 'Drops',
          dosage_form: 'Oral Drops',
          composition: 'Cholecalciferol 800 IU / ml',
          strength: '800 IU / ml',
          pack_size: '15 ml bottle with calibrated dropper',
          description: 'Pediatric Vitamin D3 formulation sourced via partner manufacturing for institutional pediatric care.',
          image: '/images/products/calsiwin-d3.svg',
          status: 'Published',
          is_featured: 0,
        }),
      });
      const addData = await addRes.json();
      assert(addRes.status === 200 && addData.success, 'Admin added new formulation "Win-Vit D3 Drops"');
    } catch (err) {
      assert(false, `Admin add product failed: ${err.message}`);
    }

    // Admin Verify Enquiries Received
    try {
      const enqListRes = await fetch(`${BASE_URL}/api/admin/enquiries`, {
        headers: { Cookie: adminCookie },
      });
      const enqListData = await enqListRes.json();
      const found = enqListData.enquiries?.some((e) => e.name === 'Dr. Srinivas Rao');
      assert(enqListRes.status === 200 && found, 'Admin verified reception of submitted enquiry from Dr. Srinivas Rao');
    } catch (err) {
      assert(false, `Admin verify enquiries failed: ${err.message}`);
    }

    // Admin Verify Applications Received
    try {
      const appListRes = await fetch(`${BASE_URL}/api/admin/applications`, {
        headers: { Cookie: adminCookie },
      });
      const appListData = await appListRes.json();
      const found = appListData.applications?.some((a) => a.applicant_name === 'Ananya Reddy');
      assert(appListRes.status === 200 && found, 'Admin verified reception of application from Ananya Reddy');
    } catch (err) {
      assert(false, `Admin verify applications failed: ${err.message}`);
    }

    // Admin CMS Update Verification
    try {
      const cmsRes = await fetch(`${BASE_URL}/api/admin/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
        body: JSON.stringify({
          items: [
            {
              section: 'home',
              key: 'cta_heading',
              value: 'Looking for verified product information or institutional hospital supply?',
            },
          ],
        }),
      });
      const cmsData = await cmsRes.json();
      assert(cmsRes.status === 200 && cmsData.success, 'Admin CMS content update persisted');
    } catch (err) {
      assert(false, `Admin CMS update failed: ${err.message}`);
    }
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
