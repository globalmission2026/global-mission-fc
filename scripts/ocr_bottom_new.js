const { Jimp } = require("jimp");
const Tesseract = require("tesseract.js");
const fs = require("fs");

async function processImage() {
  const imgPath = "D:\\new-gmfc\\public\\images\\WhatsApp Image 2026-07-01 at 16.08.42.jpeg";

  console.log("Loading image with Jimp...");
  const image = await Jimp.read(imgPath);

  const width = image.bitmap.width;
  const height = image.bitmap.height;

  // Try bottom 40%
  const cropHeight = Math.floor(height * 0.4);
  const cropY = height - cropHeight;

  console.log(`Dimensions: ${width}x${height}`);
  console.log(`Cropping bottom 40%: y=${cropY}, h=${cropHeight}`);

  image.crop({ x: 0, y: cropY, w: width, h: cropHeight });
  image.greyscale();
  image.contrast(0.5);

  const croppedPath = "C:\\Users\\nissi\\Downloads\\cropped_new_event.jpg";
  await image.write(croppedPath);

  console.log("Running OCR on cropped image...");
  const {
    data: { text },
  } = await Tesseract.recognize(croppedPath, "eng", { logger: (m) => {} });
  console.log("\n--- BOTTOM TEXT ---");
  console.log(text);
  console.log("-------------------\n");
}

processImage().catch(console.error);
