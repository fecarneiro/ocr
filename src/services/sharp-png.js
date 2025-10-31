import sharp from 'sharp';

async function sharpPNG(pngFile) {
  console.log('antes:', await sharp(pngFile).metadata());
  const ocrReadyImage = await sharp(pngFile)
    .greyscale()
    .sharpen()
    .withMetadata({ density: 300 })
    .toBuffer();

  console.log('depois:', await sharp(ocrReadyImage).metadata());
  return ocrReadyImage;
}

export { sharpPNG };
