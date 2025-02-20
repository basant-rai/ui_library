// scripts/setup-tailwind.js
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

// Copy configuration files
const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.js');
const postcssConfigPath = path.join(__dirname, '..', 'postcss.config.mjs');
const userTailwindConfig = path.join(process.cwd(), 'tailwind.config.js');
const userPostcssConfig = path.join(process.cwd(), 'postcss.config.mjs');

// Copy the config files if they don't exist
if (!fs.existsSync(userTailwindConfig)) {
  fs.copyFileSync(tailwindConfigPath, userTailwindConfig);
  console.log('Copied tailwind.config.js to your project.');
}

if (!fs.existsSync(userPostcssConfig)) {
  fs.copyFileSync(postcssConfigPath, userPostcssConfig);
  console.log('Copied postcss.config.js to your project.');
}

// Copy the pre-built CSS files
const userCssDir = path.join(process.cwd(), 'src', 'styles');
if (!fs.existsSync(userCssDir)) {
  fs.mkdirSync(userCssDir, { recursive: true });
}

const tailwindCssPath = path.join(__dirname, '..', 'src', 'styles', 'global.css');
const cnTsPath = path.join(__dirname, '..', 'src', 'utils', 'cn.tsx');

// 
fs.copyFileSync(tailwindCssPath, path.join(userCssDir, 'global.css'));
fs.copyFileSync(cnTsPath, path.join(process.cwd(), 'src', 'utils', 'cn.tsx'));
console.log('Copied tailwind.css to your project.');

// Install dependencies if needed
try {
  execSync('npm install tailwindcss postcss autoprefixer', { stdio: 'inherit' });
  console.log('TailwindCSS and PostCSS dependencies installed.');
} catch (error) {
  console.error('Error installing dependencies:', error);
}
