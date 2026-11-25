import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = 'public/screenshots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  { name: 'dashboard', url: 'http://localhost:5173/' },
  { name: 'requests', url: 'http://localhost:5173/requests' },
  { name: 'tasks', url: 'http://localhost:5173/tasks' },
  { name: 'login', url: 'http://localhost:5173/login' },
];

for (const r of routes) {
  const tempProfile = path.join(process.env.TEMP || 'C:\\Windows\\Temp', 'chrome-obsidian-profile-' + r.name + '-' + Date.now());
  const outFile = path.resolve(outDir, `${r.name}.png`);
  console.log(`Capturing ${r.name} to ${outFile}...`);
  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="${tempProfile}" --window-size=1440,900 --virtual-time-budget=5000 --screenshot="${outFile}" "${r.url}"`;
    execSync(cmd, { stdio: 'pipe', timeout: 25000 });
    if (fs.existsSync(outFile)) {
      const sz = fs.statSync(outFile).size;
      console.log(`Successfully captured ${r.name}: ${sz} bytes`);
    } else {
      console.log(`File not created for ${r.name}`);
    }
  } catch (err) {
    console.error(`Error capturing ${r.name}:`, err.message);
  } finally {
    try {
      fs.rmSync(tempProfile, { recursive: true, force: true });
    } catch (e) {}
  }
}

console.log('Capture process finished.');
