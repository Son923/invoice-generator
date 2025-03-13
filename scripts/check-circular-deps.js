const madge = require('madge');
const path = require('path');

async function checkCircularDependencies() {
  console.log('Checking for circular dependencies...');
  
  try {
    const result = await madge(path.join(__dirname, '..'), {
      fileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      excludeRegExp: [
        /node_modules/,
        /\.next/,
        /\.vercel/,
        /\.git/,
      ]
    });
    
    const circular = result.circular();
    
    if (circular.length) {
      console.error('Circular dependencies detected:');
      circular.forEach((path, i) => {
        console.error(`${i + 1}. ${path.join(' -> ')}`);
      });
      process.exit(1);
    } else {
      console.log('No circular dependencies found.');
    }
  } catch (error) {
    console.error('Error checking for circular dependencies:', error);
    process.exit(1);
  }
}

checkCircularDependencies(); 