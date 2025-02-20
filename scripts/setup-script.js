const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

function safeCopy(source, destination, fileDescription) {
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
    console.log(`✅ Copied ${fileDescription} to your project.`);
  } else {
    console.warn(`⚠️ Warning: ${fileDescription} not found in package. Skipping.`);
  }
}

// Paths
const packageRoot = path.join(__dirname, '..');
const userRoot = process.cwd();

const paths = {
  tailwindConfig: {
    src: path.join(packageRoot, 'tailwind.config.js'),
    dest: path.join(userRoot, 'tailwind.config.js'),
    desc: 'Tailwind config',
  },
  postcssConfig: {
    src: path.join(packageRoot, 'postcss.config.mjs'),
    dest: path.join(userRoot, 'postcss.config.mjs'),
    desc: 'PostCSS config',
  },
  globalCss: {
    src: path.join(packageRoot, 'src', 'styles', 'global.css'),
    dest: path.join(userRoot, 'src', 'styles', 'global.css'),
    desc: 'Global CSS',
  },
  cnUtil: {
    src: path.join(packageRoot, 'src', 'utils', 'cn.tsx'),
    dest: path.join(userRoot, 'src', 'utils', 'cn.tsx'),
    desc: 'cn.tsx utility',
  },
};

// Ensure user project structure exists
const userCssDir = path.join(userRoot, 'src', 'styles');
const userUtilsDir = path.join(userRoot, 'src', 'utils');

if (!fs.existsSync(userCssDir)) fs.mkdirSync(userCssDir, { recursive: true });
if (!fs.existsSync(userUtilsDir)) fs.mkdirSync(userUtilsDir, { recursive: true });

// Copy files
Object.values(paths).forEach(({ src, dest, desc }) => safeCopy(src, dest, desc));

// Install dependencies if needed
try {
  console.log('Installing TailwindCSS and PostCSS dependencies...');
  execSync('npm install tailwindcss postcss autoprefixer', { stdio: 'inherit' });
  console.log('✅ TailwindCSS and PostCSS dependencies installed.');
} catch (error) {
  console.error('❌ Error installing dependencies:', error);
}
