#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Enhanced logging with colors
console.log('\x1b[36m=== simple_ui_elements postinstall script ===\x1b[0m');

// 1. Path resolution with error handling
let packageRoot;
try {
  packageRoot = path.dirname(require.resolve('simple_ui_elements/package.json'));
  console.log('\x1b[32m✓\x1b[0m Package root:', packageRoot);
} catch (err) {
  console.error('\x1b[31m✗\x1b[0m Failed to locate package root:', err);
  process.exit(1);
}

const userRoot = process.cwd();
console.log('\x1b[34m→\x1b[0m User project root:', userRoot);

// 2. Enhanced file operations
const ensureDir = dir => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
};

const copyFile = async (source, destination, description) => {
  try {
    if (!existsSync(source)) {
      console.warn(`\x1b[33m⚠\x1b[0m ${description} not found at: ${source}`);
      return false;
    }

    ensureDir(path.dirname(destination));

    const stat = fs.lstatSync(source);
    if (stat.isDirectory()) {
      // Copy entire directory recursively
      cpSync(source, destination, { recursive: true });
    } else {
      fs.copyFileSync(source, destination);
    }

    console.log(`\x1b[32m✓\x1b[0m Copied ${description} to:\n   ${destination}`);
    return true;
  } catch (err) {
    console.error(`\x1b[31m✗\x1b[0m Failed to copy ${description}:`, err);
    return false;
  }
};

// 3. File copy configuration
const filesToCopy = [
  {
    src: path.join(packageRoot, 'postcss.config.mjs'),
    dest: path.join(userRoot, 'postcss.config.mjs'),
    desc: 'PostCSS config'
  },
  {
    src: path.join(packageRoot, 'dist', 'styles', 'global.css'),
    dest: path.join(userRoot, 'src', 'styles', 'global.css'),
    desc: 'Global CSS'
  },
  {
    src: path.join(packageRoot, 'dist', 'utils', 'cn.js'),
    dest: path.join(userRoot, 'src', 'utils', 'cn.tsx'),
    desc: 'CN utility'
  },
  {
    src: path.join(packageRoot, 'dist', 'components'),
    dest: path.join(userRoot, 'src', 'components'),
    desc: 'Components'
  }
];

// 4. Execute file copies
console.log('\x1b[36m\nCopying project files:\x1b[0m');
for (const file of filesToCopy) {
  await copyFile(file.src, file.dest, file.desc);
}
// 5. Dependency verification
console.log('\x1b[36m\nChecking dependencies:\x1b[0m');
const requiredDeps = ['tailwindcss', 'postcss', 'autoprefixer'];
const missingDeps = requiredDeps.filter(dep => {
  try {
    require.resolve(dep);
    return false;
  } catch {
    return true;
  }
});

if (missingDeps.length > 0) {
  console.warn(`\x1b[33m⚠\x1b[0m Missing dependencies: ${missingDeps.join(', ')}`);
  console.log('\x1b[36mAttempting to install...\x1b[0m');

  try {
    const packageManager = fs.existsSync(path.join(userRoot, 'pnpm-lock.yaml')) ? 'pnpm' : 'npm';
    execSync(`${packageManager} add ${missingDeps.join(' ')}`, {
      stdio: 'inherit',
      cwd: userRoot
    });
    console.log('\x1b[32m✓\x1b[0m Dependencies installed successfully');
  } catch (err) {
    console.error('\x1b[31m✗\x1b[0m Failed to install dependencies:', err);
    console.warn('\x1b[33mPlease install these manually:\x1b[0m', missingDeps.join(' '));
  }
} else {
  console.log('\x1b[32m✓\x1b[0m All dependencies already installed');
}

console.log('\x1b[36m\n=== Setup complete ===\x1b[0m\n');