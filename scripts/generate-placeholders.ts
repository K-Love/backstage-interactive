const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(process.cwd(), 'public/images/tools');

// SEO Analyzer SVG
const seoAnalyzerSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#F8FAFC"/>
  <circle cx="400" cy="300" r="150" fill="#2E3192" fillOpacity="0.1"/>
  <path d="M300 250L500 250" stroke="#2E3192" strokeWidth="4" strokeLinecap="round"/>
  <path d="M350 300L450 300" stroke="#2E3192" strokeWidth="4" strokeLinecap="round"/>
  <path d="M250 350L550 350" stroke="#2E3192" strokeWidth="4" strokeLinecap="round"/>
  <text x="400" y="200" textAnchor="middle" fill="#2E3192" fontSize="24" fontFamily="system-ui">SEO Analyzer</text>
</svg>`;

// Content Generator SVG
const contentGeneratorSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#F8FAFC"/>
  <rect x="250" y="200" width="300" height="40" rx="4" fill="#2E3192" fillOpacity="0.1"/>
  <rect x="250" y="260" width="200" height="40" rx="4" fill="#2E3192" fillOpacity="0.1"/>
  <rect x="250" y="320" width="250" height="40" rx="4" fill="#2E3192" fillOpacity="0.1"/>
  <text x="400" y="150" textAnchor="middle" fill="#2E3192" fontSize="24" fontFamily="system-ui">Content Generator</text>
</svg>`;

// Analytics Dashboard SVG
const analyticsDashboardSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#F8FAFC"/>
  <rect x="250" y="200" width="50" height="200" rx="4" fill="#2E3192" fillOpacity="0.1"/>
  <rect x="350" y="150" width="50" height="250" rx="4" fill="#2E3192" fillOpacity="0.2"/>
  <rect x="450" y="250" width="50" height="150" rx="4" fill="#2E3192" fillOpacity="0.1"/>
  <rect x="550" y="100" width="50" height="300" rx="4" fill="#2E3192" fillOpacity="0.2"/>
  <text x="400" y="150" textAnchor="middle" fill="#2E3192" fontSize="24" fontFamily="system-ui">Analytics Dashboard</text>
</svg>`;

// Ensure directory exists
if (!fs.existsSync(TOOLS_DIR)) {
  fs.mkdirSync(TOOLS_DIR, { recursive: true });
}

// Write SVGs to files
fs.writeFileSync(path.join(TOOLS_DIR, 'seo-analyzer.svg'), seoAnalyzerSvg);
fs.writeFileSync(path.join(TOOLS_DIR, 'content-generator.svg'), contentGeneratorSvg);
fs.writeFileSync(path.join(TOOLS_DIR, 'analytics-dashboard.svg'), analyticsDashboardSvg);

console.log('Placeholder images generated successfully!');