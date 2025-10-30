import sharp from 'sharp';

async function sharpPNG(pngFile) {
  const ocrReadyImage = await sharp(pngFile)
    .greyscale()
    .withMetadata({ density: 300 })
    .toBuffer();

  return ocrReadyImage;
}

export { sharpPNG };
