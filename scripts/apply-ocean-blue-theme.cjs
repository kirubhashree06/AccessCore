const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (/\.(jsx?|css)$/.test(file)) results.push(full);
  });
  return results;
}

const files = walk('src');

// Color mapping for Ocean Blue theme:
// Deep Navy: #102A43
// Primary Blue: #2563EB
// Secondary Blue: #60A5FA
// Soft Blue: #EFF6FF
// Main Background: #F8FAFC
// Card Background: #FFFFFF
// Main Text: #1E293B
// Secondary Text: #64748B
// Borders: #E2E8F0

files.forEach(filePath => {
  // We keep AccessCoreLogo.jsx specifically referencing Royal Purple logo
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (filePath.endsWith('index.css')) {
    // Handled separately or explicitly
    return;
  }

  // 1. Replace Old Lavender / Purple Theme colors in UI styling
  // Sidebar: #F3EEFF -> #FFFFFF (or #F8FAFC)
  content = content.replace(/#F3EEFF/g, '#FFFFFF');

  // Backgrounds: #F8F7FC -> #F8FAFC
  content = content.replace(/#F8F7FC/g, '#F8FAFC');

  // Soft lavender hover/chip backgrounds: #EDE9FE -> #EFF6FF
  content = content.replace(/#EDE9FE/g, '#EFF6FF');

  // Borders: #E5E1EF -> #E2E8F0
  content = content.replace(/#E5E1EF/g, '#E2E8F0');

  // Main text: #1E1B2E -> #1E293B
  content = content.replace(/#1E1B2E/g, '#1E293B');

  // Buttons, active links, primary icons:
  // Except inside AccessCoreLogo.jsx or where Royal Purple A is deliberately kept
  if (!filePath.endsWith('AccessCoreLogo.jsx')) {
    // Primary Purple: #7C3AED -> Primary Blue: #2563EB
    content = content.replace(/#7C3AED/g, '#2563EB');
    // Darker Purple hover: #6D28D9 -> #1D4ED8
    content = content.replace(/#6D28D9/g, '#1D4ED8');
    // Secondary Purple: #A78BFA -> Secondary Blue: #60A5FA
    content = content.replace(/#A78BFA/g, '#60A5FA');
  }

  // Old tailwind purple classes:
  // text-purple-700 -> text-blue-700
  // text-purple-600 -> text-blue-600
  // text-purple-500 -> text-blue-500
  // bg-purple-50 -> bg-[#EFF6FF]
  // bg-purple-100 -> bg-blue-100
  // border-purple-200 -> border-blue-200
  // border-purple-300 -> border-blue-300
  // hover:bg-purple-50 -> hover:bg-[#EFF6FF]
  // hover:border-purple-400 -> hover:border-[#60A5FA]
  // hover:border-purple-500 -> hover:border-[#2563EB]
  // ring-purple -> ring-blue
  if (!filePath.endsWith('AccessCoreLogo.jsx')) {
    content = content.replace(/text-purple-700/g, 'text-[#2563EB]');
    content = content.replace(/text-purple-600/g, 'text-[#2563EB]');
    content = content.replace(/text-purple-800/g, 'text-[#102A43]');
    content = content.replace(/bg-purple-50/g, 'bg-[#EFF6FF]');
    content = content.replace(/bg-purple-100/g, 'bg-blue-100');
    content = content.replace(/border-purple-200/g, 'border-blue-200');
    content = content.replace(/border-purple-300/g, 'border-blue-300');
    content = content.replace(/hover:border-purple-[0-9]+/g, 'hover:border-[#60A5FA]');
    content = content.replace(/hover:bg-purple-[0-9]+/g, 'hover:bg-[#EFF6FF]');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated theme in: ${filePath}`);
  }
});

console.log('Ocean Blue Theme pass completed.');
