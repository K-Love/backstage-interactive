// scripts/build.ts
import { optimizeImages } from './optimize-images';
import chalk from 'chalk';

async function build() {
  console.log(chalk.blue('🚀 Starting build process...'));

  try {
    // Run image optimization
    console.log(chalk.blue('\n📸 Optimizing images...'));
    await optimizeImages();

    // Add other build steps here
    console.log(chalk.green('\n✨ Build completed successfully!'));
  } catch (error) {
    console.error(chalk.red('\n❌ Build failed:'), error);
    process.exit(1);
  }
}

build();