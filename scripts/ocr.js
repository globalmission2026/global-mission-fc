const Tesseract = require("tesseract.js");
const fs = require("fs");

async function extractText() {
  const imgPath = "C:\\Users\\nissi\\Downloads\\WhatsApp Image 2026-07-01 at 16.09.47.jpeg";
  if (!fs.existsSync(imgPath)) {
    console.error("Image not found:", imgPath);
    return;
  }

  console.log("Starting OCR on", imgPath);
  Tesseract.recognize(imgPath, "eng", {
    logger: (m) => console.log(m.status, Math.round(m.progress * 100) + "%"),
  })
    .then(({ data: { text } }) => {
      console.log("\n--- EXTRACTED TEXT ---");
      console.log(text);
      console.log("----------------------\n");
    })
    .catch((err) => {
      console.error(err);
    });
}

extractText();
