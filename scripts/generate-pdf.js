const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

async function generatePDF() {
  // Read markdown file
  const markdownPath = path.join(__dirname, '../content-drafts/resources/beginner-strength-program.md');
  const markdown = fs.readFileSync(markdownPath, 'utf8');
  
  // Convert markdown to HTML
  const content = marked(markdown);
  
  // Read logo as base64
  const logoPath = path.join(__dirname, '../public/logo.jpg');
  const logoBase64 = fs.readFileSync(logoPath, 'base64');
  const logoDataUri = `data:image/jpeg;base64,${logoBase64}`;
  
  // Read hero image as base64 (using smaller image to avoid timeout)
  const heroPath = path.join(__dirname, '../public/images/ian-5.jpg');
  const heroBase64 = fs.readFileSync(heroPath, 'base64');
  const heroDataUri = `data:image/jpeg;base64,${heroBase64}`;
  
  // Read footer image as base64
  const footerImagePath = path.join(__dirname, '../public/images/power bar.jpg');
  const footerImageBase64 = fs.readFileSync(footerImagePath, 'base64');
  const footerImageDataUri = `data:image/jpeg;base64,${footerImageBase64}`;
  
  // Extract title from markdown (first # heading)
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Beginner Strength Program';
  
  // Remove the title and author line from content since we'll display it in hero
  let contentWithoutTitle = markdown.replace(/^#\s+.+$/m, '');
  contentWithoutTitle = contentWithoutTitle.replace(/^\*\*By Ian Ramirez.+$/m, '');
  const contentHtml = marked(contentWithoutTitle);
  
  // Create HTML template
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      margin: 0.75in;
      size: letter;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 100%;
      margin: 0;
      padding: 0;
    }
    
    .hero-section {
      position: relative;
      margin: -0.75in -0.75in 30px -0.75in;
      padding: 40px 0.75in;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;
    }
    
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.92) 0%, rgba(37, 99, 235, 0.85) 100%);
    }
    
    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      color: white;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
    }
    
    .logo {
      max-width: 180px;
      height: auto;
      margin-bottom: 15px;
      filter: brightness(0) invert(1);
    }
    
    .hero-title {
      color: white !important;
      font-size: 32pt;
      font-weight: 700;
      margin: 15px 0 10px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .hero-subtitle {
      color: rgba(255,255,255,0.95);
      font-size: 12pt;
      margin: 10px 0;
    }
    
    h1 {
      color: #1a1a1a;
      font-size: 28pt;
      font-weight: 700;
      margin: 20px 0 10px 0;
      page-break-after: avoid;
    }
    
    h2 {
      color: #2563eb;
      font-size: 18pt;
      font-weight: 600;
      margin: 30px 0 15px 0;
      border-bottom: 2px solid #f3f4f6;
      padding-bottom: 8px;
      page-break-after: avoid;
    }
    
    h3 {
      color: #374151;
      font-size: 14pt;
      font-weight: 600;
      margin: 20px 0 10px 0;
      page-break-after: avoid;
    }
    
    p {
      margin: 0 0 12px 0;
      orphans: 3;
      widows: 3;
    }
    
    strong {
      color: #1a1a1a;
      font-weight: 600;
    }
    
    ul, ol {
      margin: 10px 0;
      padding-left: 25px;
    }
    
    li {
      margin: 6px 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      page-break-inside: avoid;
    }
    
    th {
      background-color: #2563eb;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      font-size: 10pt;
    }
    
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 10pt;
    }
    
    tr:nth-child(even) {
      background-color: #f9fafb;
    }
    
    blockquote {
      border-left: 4px solid #2563eb;
      padding-left: 20px;
      margin: 20px 0;
      color: #4b5563;
      font-style: italic;
    }
    
    code {
      background-color: #f3f4f6;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 10pt;
    }
    
    .footer-image {
      margin: 40px -0.75in 20px -0.75in;
      height: 120px;
      background-size: cover;
      background-position: center;
      opacity: 0.3;
    }
    
    .footer {
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #f3f4f6;
      color: #6b7280;
      font-size: 10pt;
    }
    
    .program-note {
      background-color: #dbeafe;
      border-left: 4px solid #2563eb;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    
    a {
      color: #2563eb;
      text-decoration: none;
    }
    
    hr {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 30px 0;
    }
  </style>
</head>
<body>
  <div class="hero-section" style="background-image: url('${heroDataUri}');">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <img src="${logoDataUri}" alt="Cypress Training Center Logo" class="logo">
      <h1 class="hero-title">${title}</h1>
      <p class="hero-subtitle">By Ian Ramirez, Cypress Training Center</p>
    </div>
  </div>
  
  ${contentHtml}
  
  <div class="footer-image" style="background-image: url('${footerImageDataUri}');"></div>
  
  <div class="footer">
    <p><strong>Cypress Training Center</strong> | cypresstraining.com | ian@cypresstrainingcenter.com</p>
    <p>© ${new Date().getFullYear()} Cypress Training Center. All rights reserved.</p>
  </div>
</body>
</html>
  `;
  
  // Generate PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(html, { 
    waitUntil: 'networkidle0',
    timeout: 60000 // Increase timeout for large images
  });
  
  const outputPath = path.join(__dirname, '../public/downloads/beginner-strength-program.pdf');
  
  // Create downloads directory if it doesn't exist
  const downloadsDir = path.dirname(outputPath);
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }
  
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.75in',
      right: '0.75in',
      bottom: '0.75in',
      left: '0.75in'
    }
  });
  
  await browser.close();
  
  console.log(`✅ PDF generated: ${outputPath}`);
  return outputPath;
}

generatePDF().catch(console.error);
