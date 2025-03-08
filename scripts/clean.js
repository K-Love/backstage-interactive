const fs = require('fs');
const path = require('path');

const directoriesToRemove = [
  path.join(process.cwd(), '.next'),
  path.join(process.cwd(), 'node_modules/.cache')
];

try {
  directoriesToRemove.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✓ Removed: ${path.relative(process.cwd(), dir)}`);
    }
  });
} catch (error) {
  console.error('Error during cleanup:', error);
  process.exit(1);
}