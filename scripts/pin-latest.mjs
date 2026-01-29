import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const pkgPath = './package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

function pin(obj, sectionName) {
  if (!obj) return [];
  const changed = [];
  for (const [name, ver] of Object.entries(obj)) {
    if (typeof ver === 'string' && ver.trim() === 'latest') {
      try {
        const out = execSync(`npm view ${name} version`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
        if (out) {
          obj[name] = `^${out}`;
          changed.push({ name, version: out, section: sectionName });
          console.log(`Pinned ${name} -> ^${out}`);
        }
      } catch (e) {
        console.error(`Failed to resolve ${name}: ${e.message}`);
      }
    }
  }
  return changed;
}

const changes = [];
changes.push(...pin(pkg.dependencies, 'dependencies'));
changes.push(...pin(pkg.devDependencies, 'devDependencies'));

if (changes.length > 0) {
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('\nUpdated package.json with pinned versions for the above packages.');
} else {
  console.log('No `latest` entries found.');
}

process.exit(0);
