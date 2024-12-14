const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const PROJECTS_DIR = 'public/images/projects';
const OUTPUT_DIR = 'public/images/optimized';
const DIMENSIONS = { width: 1200, height: 675 };

async function optimizeImages() {
  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Get all images from projects directory
    const files = await fs.readdir(PROJECTS_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(chalk.blue('🔍 Found', imageFiles.length, 'images to optimize'));

    for (const file of imageFiles) {
      const inputPath = path.join(PROJECTS_DIR, file);
      const outputPath = path.join(
        OUTPUT_DIR, 
        `${path.parse(file).name}.webp`
      );

      console.log(chalk.yellow(`⚙️ Processing: ${file}`));

      await sharp(inputPath)
        .resize(DIMENSIONS.width, DIMENSIONS.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      // Generate thumbnail for lazy loading
      const thumbnailPath = path.join(
        OUTPUT_DIR, 
        `${path.parse(file).name}-thumb.webp`
      );
      
      await sharp(inputPath)
        .resize(Math.floor(DIMENSIONS.width / 10), Math.floor(DIMENSIONS.height / 10))
        .blur(2)
        .webp({ quality: 60 })
        .toFile(thumbnailPath);

      console.log(chalk.green(`✅ Optimized: ${file}`));
    }

    console.log(chalk.green('\n✨ All images optimized successfully!'));
  } catch (error) {
    console.error(chalk.red('Error optimizing images:'), error);
    process.exit(1);
  }
}

optimizeImages();