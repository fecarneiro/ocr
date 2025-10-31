import sharp from 'sharp';

async function sharpPNG(pngFile) {
  const ocrReadyImage = await sharp(pngFile)
    .greyscale()
    .normalise()
    .sharpen()
    .toBuffer();
  return ocrReadyImage;
}

export { sharpPNG };
