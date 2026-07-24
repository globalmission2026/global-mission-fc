/**
 * Gallery — Server Component
 *
 * Automatically discovers every image inside `public/images/images/`
 * at build time (or on each request in dev mode) and passes the list
 * to the <GallerySlider> client component.
 *
 * No manual maintenance required: just add or delete image files and
 * the next build / dev reload will reflect the change automatically.
 */
import { readdirSync } from "fs";
import { join } from "path";
import GallerySlider, { type GalleryImage } from "./GallerySlider";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/** Supported image extensions (lowercase). */
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

/**
 * Files that live in the same folder but are NOT gallery photos
 * (portraits, hero backgrounds, config assets, etc.).
 * Add filenames here to keep them out of the slider.
 */
const NON_GALLERY_FILES = new Set([
  "hero-bg.png",
  "hero-bg-optimized.jpg",
  "anthony-githui.jpeg",
  "apostle-shadrach.jpeg",
  "dr-young.jpg",
  "pastor-betty.jpg",
  "pastor-kamwaga.jpeg",
  "rev-bishop.jpeg",
  "camp.png",
  "conference.png",
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Derive a human-readable alt text from a filename. */
function altFromFilename(filename: string): string {
  // Strip extension, decode URL-encoded chars, replace separators with spaces
  const base = filename.replace(/\.[^.]+$/, "");
  return (
    base
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      // Capitalise first letter
      .replace(/^./, (c) => c.toUpperCase()) || "Gallery photo"
  );
}

/** Read `public/images/images/` and return gallery-eligible images. */
function getGalleryImages(): GalleryImage[] {
  const dir = join(process.cwd(), "public", "images", "images");

  let files: string[];
  try {
    files = readdirSync(dir);
  } catch {
    // Directory missing in some CI / test environments — return empty list
    return [];
  }

  return files
    .filter((file) => {
      const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext) && !NON_GALLERY_FILES.has(file);
    })
    .sort() // Deterministic order
    .map((file) => ({
      src: `/images/images/${file}`,
      alt: altFromFilename(file),
    }));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Gallery() {
  const images = getGalleryImages();
  return <GallerySlider images={images} />;
}
