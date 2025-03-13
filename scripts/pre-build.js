const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Clean up directories that might cause issues
function cleanDirectories() {
  console.log('Cleaning up directories...');
  
  const dirsToClean = [
    '.next',
    '.vercel/output'
  ];
  
  dirsToClean.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(dirPath)) {
      console.log(`Removing ${dir}...`);
      try {
        fs.rmSync(dirPath, { recursive: true, force: true });
      } catch (error) {
        console.error(`Error removing ${dir}:`, error);
      }
    }
  });
}

// Clear node_modules cache if needed
function clearNodeModulesCache() {
  console.log('Clearing npm cache...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error clearing npm cache:', error);
  }
}

// Run pre-build tasks
function preBuild() {
  console.log('Running pre-build tasks...');
  
  // Clean up directories
  cleanDirectories();
  
  // Clear cache if needed
  // Uncomment if needed:
  // clearNodeModulesCache();
  
  console.log('Pre-build tasks completed.');
}

preBuild(); 