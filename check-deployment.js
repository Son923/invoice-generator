#!/usr/bin/env node

/**
 * Deployment Readiness Check Script
 * 
 * This script checks if your environment is ready for deployment to Vercel.
 * It verifies environment variables, dependencies, and build process.
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// Helper functions
const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}=== ${msg} ===${colors.reset}`),
};

// Check if a command exists
function commandExists(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Check environment variables
function checkEnvVars() {
  log.section('Checking Environment Variables');
  
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fileExists(envPath)) {
    log.error('.env.local file not found');
    log.info('Create a .env.local file with your Appwrite credentials');
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'NEXT_PUBLIC_APPWRITE_ENDPOINT',
    'NEXT_PUBLIC_APPWRITE_PROJECT_ID',
    'NEXT_PUBLIC_APPWRITE_DATABASE_ID',
    'NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID',
  ];
  
  let allVarsPresent = true;
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName)) {
      log.error(`Missing environment variable: ${varName}`);
      allVarsPresent = false;
    } else if (envContent.includes(`${varName}=`) && !envContent.match(new RegExp(`${varName}=.+`))) {
      log.warning(`Environment variable ${varName} is empty`);
    } else {
      log.success(`Found environment variable: ${varName}`);
    }
  });
  
  // Check for AdSense ID
  if (!envContent.includes('NEXT_PUBLIC_ADSENSE_ID')) {
    log.warning('Google AdSense ID not found. If you plan to use AdSense, add NEXT_PUBLIC_ADSENSE_ID to your .env.local file');
  }
  
  return allVarsPresent;
}

// Check dependencies
function checkDependencies() {
  log.section('Checking Dependencies');
  
  // Check if package.json exists
  if (!fileExists('package.json')) {
    log.error('package.json not found');
    return false;
  }
  
  // Check if node_modules exists
  if (!fileExists('node_modules')) {
    log.warning('node_modules not found. Run npm install first');
    return false;
  }
  
  // Check for required dependencies in package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['next', 'react', 'react-dom', 'appwrite', 'jspdf'];
  
  let allDepsPresent = true;
  
  requiredDeps.forEach(dep => {
    if (!packageJson.dependencies[dep]) {
      log.error(`Missing dependency: ${dep}`);
      allDepsPresent = false;
    } else {
      log.success(`Found dependency: ${dep}`);
    }
  });
  
  return allDepsPresent;
}

// Check Vercel CLI
function checkVercelCLI() {
  log.section('Checking Vercel CLI');
  
  if (!commandExists('vercel')) {
    log.error('Vercel CLI not found. Install it with: npm install -g vercel');
    return false;
  }
  
  log.success('Vercel CLI is installed');
  return true;
}

// Check build process
function checkBuild() {
  log.section('Checking Build Process');
  
  // Check if next.config.js exists
  if (!fileExists('next.config.js')) {
    log.error('next.config.js not found');
    return false;
  }
  
  log.success('next.config.js found');
  
  // Check if vercel.json exists
  if (!fileExists('vercel.json')) {
    log.warning('vercel.json not found. This is not required but recommended for optimal configuration');
  } else {
    log.success('vercel.json found');
  }
  
  return true;
}

// Main function
function main() {
  console.log(`${colors.magenta}=== Invoice Generator Deployment Readiness Check ===${colors.reset}\n`);
  
  const envCheck = checkEnvVars();
  const depsCheck = checkDependencies();
  const vercelCheck = checkVercelCLI();
  const buildCheck = checkBuild();
  
  console.log('\n');
  log.section('Summary');
  
  if (envCheck && depsCheck && vercelCheck && buildCheck) {
    log.success('Your environment is ready for deployment to Vercel!');
    log.info('Run the following command to deploy:');
    log.info('  npm run deploy');
  } else {
    log.error('Your environment is not ready for deployment. Please fix the issues above.');
  }
}

// Run the main function
main(); 