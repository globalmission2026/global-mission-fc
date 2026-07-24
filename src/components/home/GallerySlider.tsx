"use client";

import { useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySliderProps {
  images: GalleryImage[];
}

export default function GallerySlider({ images }: GallerySliderProps) {
  const handleSwiperInit = useCallback((swiper: SwiperClass) => {
    swiper.on("progress", (s: SwiperClass) => {
      for (let i = 0; i < s.slides.length; i++) {
        const slideProgress = s.slides[i].progress ?? 0;
        const absProgress = Math.abs(slideProgress);
        const opacity = 1 - 0.7 * Math.min(absProgress, 1);
        const blur = 5 * Math.min(absProgress, 1);
        const slide = s.slides[i] as HTMLElement;
        slide.style.opacity = String(opacity);
        slide.style.filter = `blur(${blur}px)`;
      }
    });
    swiper.on("setTransition", (s: SwiperClass, duration: number) => {
      for (let i = 0; i < s.slides.length; i++) {
        const slide = s.slides[i] as HTMLElement;
        slide.style.transitionDuration = `${duration}ms`;
      }
    });
  }, []);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="gmfci-gallery-wrap" style={{ background: "transparent", padding: "20px 0 0" }}>
      <div className="gmfci-gallery-content">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          watchSlidesProgress
          speed={1200}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, EffectCoverflow]}
          onSwiper={handleSwiperInit}
          style={{ paddingBottom: "50px" }}
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={img.src}
              /*
               * All slides share the same width. The height is the slide's
               * intrinsic height. We use a square-ish 460×520 box so both
               * portrait and landscape images have breathing room.
               * object-contain means NO cropping — the full image is always visible.
               */
              style={{ width: "460px", height: "520px", maxWidth: "88vw" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
                  /* Dark background shows behind letterboxed areas */
                  background: "#1a0b00",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  /*
                   * object-contain is the key — image scales to fit the box
                   * while keeping its natural aspect ratio intact.
                   * No stretching, no squashing, no centre-crop.
                   */
                  style={{ objectFit: "contain", padding: "8px" }}
                  className="transition-transform duration-1000"
                  sizes="(max-width: 768px) 88vw, 460px"
                  priority={index < 2}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
