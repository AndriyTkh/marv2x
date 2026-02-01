import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = process.cwd();

const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'products');

const OUTPUT = path.join(PROJECT_ROOT, 'blur.json');

async function generate() {
  const files = fs.readdirSync(IMAGES_DIR);
  const result = {};

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);

    // Skip non-images
    if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;

    const buffer = await sharp(filePath).resize(20, 20).blur().toBuffer();

    result[`/products/${file}`] = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2));
}

generate();
