import fs from 'fs/promises';
import path from 'path';

interface ImageMetadata {
  originalHash: string;
  variants: {
    [key: string]: {
      path: string;
      width: number;
      height: number;
      size: number;
    };
  };
  blurDataUrl: string;
  lastProcessed: number;
}

const CACHE_FILE = 'public/images/optimized/.cache.json';

export async function getImageCache(): Promise<Record<string, ImageMetadata>> {
  try {
    const cache = await fs.readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(cache);
  } catch {
    return {};
  }
}

export async function updateImageCache(
  imagePath: string, 
  metadata: ImageMetadata
): Promise<void> {
  const cache = await getImageCache();
  cache[imagePath] = metadata;
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}