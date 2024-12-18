// scripts/optimize-images.ts
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { createProgressBar } from './utils/progress';

interface ImageVariant {
  width: number;
  height: number;
  suffix: string;
}

const VARIANTS: ImageVariant[] = [
  { width: 1920, height: 1080, suffix: 'xl' },
  { width: 1200, height: 675, suffix: 'lg' },
  { width: 800, height: 450, suffix: 'md' },
  { width: 400, height: 225, suffix: 'sm' },
];

const PROJECTS_DIR = 'public/images/projects';
const OUTPUT_DIR = 'public/images/optimized';
const PLACEHOLDER_SIZE = 20;

interface OptimizationResult {
  originalPath: string;
  variants: string[];
  placeholder: string;
  error?: Error;
}

async function generateBlurPlaceholder(
  inputPath: string,
  outputPath: string
): Promise<string> {
  await sharp(inputPath)
    .resize(PLACEHOLDER_SIZE, PLACEHOLDER_SIZE, {
      fit: 'cover',
      position: 'center',
    })
    .blur(10)
    .webp({ quality: 30 })
    .toFile(outputPath);

  const buffer = await fs.readFile(outputPath);
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

async function optimizeImage(
  file: string,
  progressBar: any
): Promise<OptimizationResult> {
  const result: OptimizationResult = {
    originalPath: file,
    variants: [],
    placeholder: '',
  };

  try {
    const inputPath = path.join(PROJECTS_DIR, file);
    const fileName = path.parse(file).name;

    // Generate variants
    for (const variant of VARIANTS) {
      const outputPath = path.join(
        OUTPUT_DIR,
        `${fileName}-${variant.suffix}.webp`
      );

      await sharp(inputPath)
        .resize(variant.width, variant.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      result.variants.push(outputPath);
    }

    // Generate blur placeholder
    const placeholderPath = path.join(OUTPUT_DIR, `${fileName}-placeholder.webp`);
    result.placeholder = await generateBlurPlaceholder(inputPath, placeholderPath);

    progressBar.increment();
  } catch (error) {
    result.error = error as Error;
  }

  return result;
}

async function optimizeImages(): Promise<void> {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    const files = await fs.readdir(PROJECTS_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(chalk.blue('🔍 Found', imageFiles.length, 'images to optimize'));

    const progressBar = createProgressBar(imageFiles.length);
    const results: OptimizationResult[] = [];

    for (const file of imageFiles) {
      const result = await optimizeImage(file, progressBar);
      results.push(result);
    }

    // Log results
    console.log('\n📊 Optimization Results:');
    results.forEach(result => {
      if (result.error) {
        console.log(chalk.red(`❌ Error processing ${result.originalPath}:`));
        console.log(chalk.red(result.error.message));
      } else {
        console.log(chalk.green(`✅ Successfully processed ${result.originalPath}`));
        console.log(chalk.gray(`   Generated ${result.variants.length} variants`));
      }
    });

    console.log(chalk.green('\n✨ Image optimization complete!'));
  } catch (error) {
    console.error(chalk.red('Fatal error during optimization:'), error);
    process.exit(1);
  }
}

export { optimizeImages, type OptimizationResult };