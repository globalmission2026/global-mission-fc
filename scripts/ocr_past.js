const Tesseract = require("tesseract.js");
const fs = require("fs");

async function extractText(imgPath) {
  if (!fs.existsSync(imgPath)) {
    console.error("Image not found:", imgPath);
    return;
  }

  console.log("Starting OCR on", imgPath);
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imgPath, "eng", { logger: (m) => {} });
    console.log("\n--- EXTRACTED TEXT ---");
    console.log(text);
    console.log("----------------------\n");
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  await extractText("D:\\new-gmfc\\public\\images\\gallery\\IMG-20260515-WA0002.jpg");
  await extractText("D:\\new-gmfc\\public\\images\\gallery\\IMG-20260514-WA0009.jpg");
}

main();
