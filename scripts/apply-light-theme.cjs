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

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Remove tailwind dark: class names
  // e.g. dark:bg-[#1F1B36], dark:text-slate-100, dark:border-purple-900/40, dark:hover:bg-..., dark:divide-...
  content = content.replace(/\bdark:[^\s"'`}{]+/g, '');

  // 2. Clean up multiple spaces inside classNames that may have been left by removing dark: classes
  content = content.replace(/className=(["'`])([\s\S]*?)\1/g, (match, quote, classStr) => {
    const cleaned = classStr.replace(/\s+/g, ' ').trim();
    return `className=${quote}${cleaned}${quote}`;
  });
  // Also inside cn(...)
  content = content.replace(/cn\(([\s\S]*?)\)/g, (match, args) => {
    const cleaned = args.replace(/\s+/g, ' ');
    return `cn(${cleaned})`;
  });

  // 3. Replace color tokens to match exact user specifications
  // - Sidebar: #F3EEFF
  // - Main background: #F8F7FC
  // - Cards: #FFFFFF
  // - Primary purple: #7C3AED
  // - Secondary purple: #A78BFA
  // - Soft lavender: #EDE9FE
  // - Main text: #1E1B2E
  // - Secondary text: #64748B
  // - Borders: #E5E1EF

  // Old dark navy/purple backgrounds -> white or light backgrounds
  content = content.replace(/#1F1B36/g, '#FFFFFF');
  content = content.replace(/#17142B/g, '#1E1B2E');
  content = content.replace(/#0F0C1E/g, '#FFFFFF');
  content = content.replace(/#13111C/g, '#FFFFFF');
  content = content.replace(/#172338/g, '#FFFFFF');
  content = content.replace(/#2A244D/g, '#EDE9FE');
  content = content.replace(/#2A234B/g, '#EDE9FE');

  // Old borders
  content = content.replace(/#E9D5FF/g, '#E5E1EF');
  content = content.replace(/border-purple-900\/[0-9]+/g, 'border-[#E5E1EF]');
  content = content.replace(/border-slate-700\/[0-9]+/g, 'border-[#E5E1EF]');
  content = content.replace(/border-slate-800/g, 'border-[#E5E1EF]');
  content = content.replace(/border-slate-700/g, 'border-[#E5E1EF]');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
});

console.log('Migration completed successfully.');
