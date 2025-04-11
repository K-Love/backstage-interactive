import { optimizeImages } from './optimize-images';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { rmSync } from 'fs';
import { join } from 'path';

async function build() {
  console.log(chalk.blue('🚀 Starting build process...'));

  try {
    // Run image optimization
    console.log(chalk.blue('\n📸 Optimizing images...'));
    await optimizeImages();

    console.log(chalk.blue('\n⚙️ Generating Prisma client...'));
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log(chalk.blue('\n🧹 Cleaning build artifacts...'));
    execSync('npm run clean', { stdio: 'inherit' });

    console.log(chalk.blue('\n🚀 Running Next.js build...'));
    execSync('next build', { stdio: 'inherit' });

    console.log(chalk.green('\n✨ Build completed successfully!'));
  } catch (error) {
    console.error(chalk.red('\n❌ Build failed:'), error);
    process.exit(1);
  }
}

build();