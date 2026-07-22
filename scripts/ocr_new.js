const Tesseract = require("tesseract.js");

async function main() {
  const imgPath = "D:\\new-gmfc\\public\\images\\WhatsApp Image 2026-07-01 at 16.08.42.jpeg";
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
main();
