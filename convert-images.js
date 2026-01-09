#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './images/blanche';

// Configuration for image sizes
const config = {
  // Large images (17-25 MB each)
  large: {
    files: ['004.png', '019.png', '023.png', '032.png', '037.png', '069.png', '075.png'],
    sizes: [
      { suffix: 'small', width: 640, quality: 75 },
      { suffix: 'medium', width: 1024, quality: 75 },
      { suffix: 'large', width: 1920, quality: 80 },
      { suffix: 'thumbnail', width: 400, quality: 70 }
    ]
  },
  // Product images (2.8-3.6 MB)
  product: {
    files: ['2.png', '3.png', '5.png'],
    sizes: [
      { suffix: 'small', width: 640, quality: 75 },
      { suffix: 'medium', width: 1024, quality: 75 },
      { suffix: 'large', width: 1920, quality: 80 }
    ]
  },
  // Review images (1.1-2 MB)
  review: {
    files: ['Review-0.png', 'Review-1.png', 'Review-2.png', 'Review-3.png'],
    sizes: [
      { suffix: 'small', width: 640, quality: 75 },
      { suffix: 'medium', width: 1024, quality: 75 }
    ]
  }
};

async function convertImage(inputPath, outputPath, width, quality) {
  try {
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: quality })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return false;
  }
}

async function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    return `${sizeMB} MB`;
  } catch {
    return 'N/A';
  }
}

async function processImages() {
  console.log('🖼️  Starting image conversion to WebP...\n');

  let totalConverted = 0;
  let totalFailed = 0;

  // Process large images
  console.log('📸 Converting large images (17-25 MB each)...');
  for (const filename of config.large.files) {
    const inputPath = path.join(inputDir, filename);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${filename} not found, skipping...`);
      continue;
    }

    const originalSize = await getFileSize(inputPath);
    console.log(`  ${filename} (${originalSize})`);

    for (const size of config.large.sizes) {
      const baseName = filename.replace('.png', '');
      const outputName = `${baseName}-${size.suffix}.webp`;
      const outputPath = path.join(inputDir, outputName);

      const success = await convertImage(inputPath, outputPath, size.width, size.quality);
      if (success) {
        const newSize = await getFileSize(outputPath);
        console.log(`    ✓ ${outputName} (${newSize})`);
        totalConverted++;
      } else {
        console.log(`    ✗ Failed: ${outputName}`);
        totalFailed++;
      }
    }
  }

  console.log('\n📸 Converting product images (2.8-3.6 MB)...');
  for (const filename of config.product.files) {
    const inputPath = path.join(inputDir, filename);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${filename} not found, skipping...`);
      continue;
    }

    const originalSize = await getFileSize(inputPath);
    console.log(`  ${filename} (${originalSize})`);

    for (const size of config.product.sizes) {
      const baseName = filename.replace('.png', '');
      const outputName = `${baseName}-${size.suffix}.webp`;
      const outputPath = path.join(inputDir, outputName);

      const success = await convertImage(inputPath, outputPath, size.width, size.quality);
      if (success) {
        const newSize = await getFileSize(outputPath);
        console.log(`    ✓ ${outputName} (${newSize})`);
        totalConverted++;
      } else {
        console.log(`    ✗ Failed: ${outputName}`);
        totalFailed++;
      }
    }
  }

  console.log('\n📸 Converting review images (1.1-2 MB)...');
  for (const filename of config.review.files) {
    const inputPath = path.join(inputDir, filename);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${filename} not found, skipping...`);
      continue;
    }

    const originalSize = await getFileSize(inputPath);
    console.log(`  ${filename} (${originalSize})`);

    for (const size of config.review.sizes) {
      const baseName = filename.replace('.png', '');
      const outputName = `${baseName}-${size.suffix}.webp`;
      const outputPath = path.join(inputDir, outputName);

      const success = await convertImage(inputPath, outputPath, size.width, size.quality);
      if (success) {
        const newSize = await getFileSize(outputPath);
        console.log(`    ✓ ${outputName} (${newSize})`);
        totalConverted++;
      } else {
        console.log(`    ✗ Failed: ${outputName}`);
        totalFailed++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Image conversion complete!`);
  console.log(`   Successfully converted: ${totalConverted} images`);
  console.log(`   Failed: ${totalFailed} images`);
  console.log(`   Output directory: ${inputDir}`);
  console.log('='.repeat(60) + '\n');

  // Show total size comparison
  const webpFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.webp'));
  let totalWebpSize = 0;
  for (const file of webpFiles) {
    const stats = fs.statSync(path.join(inputDir, file));
    totalWebpSize += stats.size;
  }

  console.log(`📊 Total WebP files size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Original PNG files size: ~153 MB`);
  console.log(`📊 Savings: ~${((1 - totalWebpSize / (153 * 1024 * 1024)) * 100).toFixed(1)}%\n`);
}

// Run the conversion
processImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
