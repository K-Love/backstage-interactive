// scripts/validate-images.ts
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

interface ValidationResult {
  path: string;
  issues: string[];
}

async function validateImages() {
  const results: ValidationResult[] = [];
  const imageDir = 'public/images';
  
  const files = await fs.readdir(imageDir, { recursive: true });
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
  );

  for (const file of imageFiles) {
    const filePath = path.join(imageDir, file);
    const issues: string[] = [];

    try {
      const metadata = await sharp(filePath).metadata();
      
      // Check image dimensions
      if (metadata.width! > 3840 || metadata.height! > 2160) {
        issues.push('Image resolution too high (max 4K)');
      }

      // Check file size
      const stats = await fs.stat(filePath);
      if (stats.size > 2 * 1024 * 1024) {
        issues.push('File size exceeds 2MB');
      }

      // Check aspect ratio
      const ratio = metadata.width! / metadata.height!;
      if (ratio < 0.5 || ratio > 2.5) {
        issues.push('Unusual aspect ratio detected');
      }

      if (issues.length > 0) {
        results.push({ path: file, issues });
      }
    } catch (error) {
      results.push({ 
        path: file, 
        issues: [`Error analyzing image: ${error.message}`] 
      });
    }
  }

  return results;
}

// Add to build script
export async function validateImagesBeforeBuild() {
  console.log(chalk.blue('🔍 Validating images...'));
  
  const results = await validateImages();
  if (results.length > 0) {
    console.log(chalk.yellow('\n⚠️ Image validation issues found:'));
    results.forEach(({ path, issues }) => {
      console.log(chalk.yellow(`\n${path}:`));
      issues.forEach(issue => console.log(chalk.gray(`  - ${issue}`)));
    });
  } else {
    console.log(chalk.green('✅ All images passed validation'));
  }
}