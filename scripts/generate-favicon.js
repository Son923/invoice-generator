const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SVG_PATH = path.join(PUBLIC_DIR, 'favicon.svg');

// Ensure the public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Create favicon.ico (16x16, 32x32, 48x48)
async function generateFavicon() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(SVG_PATH);
    
    // Generate PNG files of different sizes
    const sizes = [16, 32, 48, 64, 128, 192, 512];
    
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .toFile(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`));
      
      console.log(`Generated favicon-${size}x${size}.png`);
    }
    
    // Generate favicon.ico (contains 16x16, 32x32, and 48x48)
    // For simplicity, we'll just use the 32x32 version as favicon.ico
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
    
    console.log('Generated favicon.ico');
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
    
    console.log('Generated apple-touch-icon.png');
    
    console.log('Favicon generation completed successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicon(); 