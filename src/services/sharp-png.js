import sharp from 'sharp';

async function sharpPNG(pngFile) {
  const ocrReadyImage = await sharp(pngFile)
    .greyscale()
    .normalise()
    .sharpen()
    .withMetadata({ density: 300 })
    .toBuffer();
  return ocrReadyImage;
}

export { sharpPNG };
