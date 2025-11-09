#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  if (!fs.existsSync(svgPath)) {
    console.error('favicon.svg not found in public/');
    process.exit(1);
  }

  const sizes = [16, 32, 48, 180];
  const pngPaths = [];

  const svgBuffer = fs.readFileSync(svgPath);

  for (const size of sizes) {
    const out = path.join(publicDir, `favicon-${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain' })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log('Written', out);
    pngPaths.push(out);
  }

  // create apple-touch-icon from 180px PNG (already created)
  const apple = path.join(publicDir, 'apple-touch-icon.png');
  fs.copyFileSync(path.join(publicDir, 'favicon-180.png'), apple);
  console.log('Written', apple);

  // create favicon.ico from 16,32,48 using to-ico
  const icoOut = path.join(publicDir, 'favicon.ico');
  const buffers = [
    fs.readFileSync(path.join(publicDir, 'favicon-16.png')),
    fs.readFileSync(path.join(publicDir, 'favicon-32.png')),
    fs.readFileSync(path.join(publicDir, 'favicon-48.png')),
  ];
  const icoBuffer = await toIco(buffers);
  fs.writeFileSync(icoOut, icoBuffer);
  console.log('Written', icoOut);

  console.log('All favicons generated successfully.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
