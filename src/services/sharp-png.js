import sharp from 'sharp';

async function sharpPNG(pngFile) {
  console.log(pngFile);
  const metadata = await sharp(input).metadata();
  console.log(metadata);

  const ocrReadyImage = await sharp(pngFile)
    .greyscale()
    .withMetadata({ density: 300 })
    .toBuffer();

  console.log(ocrReadyImage);
  return ocrReadyImage;
}

export { sharpPNG };
