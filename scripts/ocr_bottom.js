const { Jimp } = require("jimp");
const Tesseract = require("tesseract.js");
const fs = require("fs");

async function processImage() {
  const imgPath = "C:\\Users\\nissi\\Downloads\\WhatsApp Image 2026-07-01 at 16.09.47.jpeg";
  if (!fs.existsSync(imgPath)) {
    console.error("File not found");
    return;
  }

  console.log("Loading image with Jimp...");
  const image = await Jimp.read(imgPath);

  // Crop the bottom 35% of the image (usually where payment details are)
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  const cropHeight = Math.floor(height * 0.35);
  const cropY = height - cropHeight;

  console.log(`Cropping... W:${width}, H:${cropHeight}, Y:${cropY}`);
  image.crop({ x: 0, y: cropY, w: width, h: cropHeight });

  // Convert to grayscale and increase contrast to help Tesseract
  image.greyscale();
  image.contrast(0.5);

  const croppedPath = "C:\\Users\\nissi\\Downloads\\cropped_payment.jpg";
  await image.write(croppedPath);
  console.log("Saved cropped image to", croppedPath);

  console.log("Running Tesseract on cropped image...");
  Tesseract.recognize(
    croppedPath,
    "eng",
    { logger: (m) => {} }, // silent
  )
    .then(({ data: { text } }) => {
      console.log("\n--- EXTRACTED TEXT FROM BOTTOM ---");
      console.log(text);
      console.log("----------------------------------\n");
    })
    .catch((err) => {
      console.error(err);
    });
}

processImage().catch(console.error);
