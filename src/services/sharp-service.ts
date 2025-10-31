import sharp from 'sharp';

async function sharpPNG(pngFile: any) {
  const ocrReadyImage = await sharp(pngFile)
    .greyscale()
    .normalise()
    .sharpen()
    .toBuffer();
  return ocrReadyImage;
}

export { sharpPNG };
