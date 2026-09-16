// build.js - Netlify Build Script for B8B Cloud Status
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const STATUS_PATH = path.join(__dirname, 'status.json');

const ENDPOINTS = [
  { name: 'B8B Group (Landing)', url: 'https://b8b.group', type: 'Frontend / Landing' },
  { name: 'Banii Bazi (Fortune)', url: 'https://b8b.homes', type: 'Cloudflare Pages' },
  { name: 'Banii Trip (Travel OS)', url: 'https://trip.b8b.homes', type: 'Cloudflare Pages' },
  { name: 'B8B Lands (Real Estate)', url: 'https://b8b.group/lands/', type: 'Web Platform' },
  { name: 'B8B Power Passive', url: 'https://b8b.group/pp/', type: 'Web Platform' },
  { name: 'Bwork LINE Bot API', url: 'https://bwork.b8b.group/healthz', type: 'API Backend' }
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 6000 }, (res) => {
      const latency = Date.now() - start;
      resolve({
        code: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 400,
        latency: `${latency}ms`
      });
    });
    req.on('error', () => {
      resolve({ code: 'ERR', ok: false, latency: '-' });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ code: 'TIMEOUT', ok: false, latency: '-' });
    });
  });
}

async function run() {
  console.log('⚡ Building B8B Status Dashboard for Netlify...');
  
  let currentData = {};
  if (fs.existsSync(STATUS_PATH)) {
    try {
      currentData = JSON.parse(fs.readFileSync(STATUS_PATH, 'utf8'));
    } catch (e) {
      console.warn('Failed to parse existing status.json, creating fresh');
    }
  }

  // Ping public endpoints during Netlify build
  console.log('🌐 Pinging production endpoints...');
  const endpointResults = [];
  for (const ep of ENDPOINTS) {
    const res = await checkUrl(ep.url);
    console.log(`  - ${ep.name}: ${res.code} (${res.latency})`);
    endpointResults.push({
      name: ep.name,
      url: ep.url,
      type: ep.type,
      code: res.code,
      latency: res.latency,
      ok: res.ok
    });
  }

  currentData.endpoints = endpointResults;
  currentData.lastBuild = new Date().toISOString();

  fs.writeFileSync(STATUS_PATH, JSON.stringify(currentData, null, 2), 'utf8');
  console.log('✅ Netlify build completed successfully. status.json updated.');
}

run();
