import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GallerySlider from "../GallerySlider";
import type { GalleryImage } from "../GallerySlider";

// ---------------------------------------------------------------------------
// Swiper mocks (client component — no real DOM Swiper needed in tests)
// ---------------------------------------------------------------------------
vi.mock("swiper/react", () => ({
  Swiper: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div data-testid="swiper" style={style}>
      {children}
    </div>
  ),
  SwiperSlide: ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }) => (
    <div data-testid="swiper-slide" style={style}>
      {children}
    </div>
  ),
}));

vi.mock("swiper/modules", () => ({
  Autoplay: {},
  Pagination: {},
  EffectCoverflow: {},
}));

vi.mock("swiper/css", () => ({}));
vi.mock("swiper/css/effect-coverflow", () => ({}));
vi.mock("swiper/css/pagination", () => ({}));

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
const sampleImages: GalleryImage[] = [
  { src: "/images/images/photo-1.jpg", alt: "Photo 1" },
  { src: "/images/images/photo-2.jpg", alt: "Photo 2" },
  { src: "/images/images/photo-3.jpeg", alt: "Photo 3" },
];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("GallerySlider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all provided images", () => {
    render(<GallerySlider images={sampleImages} />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(sampleImages.length);
  });

  it("renders swiper wrapper", () => {
    const { container } = render(<GallerySlider images={sampleImages} />);
    expect(container.querySelector('[data-testid="swiper"]')).toBeInTheDocument();
  });

  it("renders nothing when images array is empty", () => {
    const { container } = render(<GallerySlider images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders correct number of swiper slides", () => {
    const { getAllByTestId } = render(<GallerySlider images={sampleImages} />);
    expect(getAllByTestId("swiper-slide")).toHaveLength(sampleImages.length);
  });

  it("uses image src and alt from props", () => {
    render(<GallerySlider images={sampleImages} />);
    // next/image renders an <img> with the src encoded — check alt text instead
    expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 3")).toBeInTheDocument();
  });
});
