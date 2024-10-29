import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const dirs = [
  'dist',
  'dist/css',
  'dist/assets',
  'dist/js'
];

dirs.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
}); 