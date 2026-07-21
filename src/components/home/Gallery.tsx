"use client";

import Image from "next/image";
import { useEffect } from "react";
import ParticlesCanvas from "@/components/shared/ParticlesCanvas";

export default function Gallery() {
  const images = [
    { src: "/images/gallery/mission1.jpg", alt: "Community Outreach & Friendship" },
    { src: "/images/gallery/mission2.jpg", alt: "Missions in the Harvest Fields" },
    { src: "/images/gallery/mission3.jpg", alt: "Youth Fellowship" },
    { src: "/images/gallery/mission4.jpg", alt: "United in Prayer" },
    { src: "/images/gallery/mission5.jpg", alt: "Community Outreach & Friendship 2" },
    { src: "/images/gallery/mission6.jpg", alt: "Fellowship" },
    { src: "/images/gallery/mission7.jpg", alt: "Ministry" },
  ];

  useEffect(() => {
    // If we have Swiper available globally, initialize it
    if (typeof window !== "undefined" && (window as any).Swiper) {
      const Swiper = (window as any).Swiper;
      // Small timeout to ensure DOM is ready and images are painted for calculations
      setTimeout(() => {
        const swiper = new Swiper(".swiper-container-coverflow", {
          effect: "coverflow",
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: "auto",
          loop: true,
          watchSlidesProgress: true,
          speed: 1200,
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: true,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          on: {
            progress: function(s: any) {
              for (let i = 0; i < s.slides.length; i++) {
                const slideProgress = s.slides[i].progress;
                const absProgress = Math.abs(slideProgress);
                
                const scale = 1.05 - (0.15 * Math.min(absProgress, 1));
                const opacity = 1 - (0.7 * Math.min(absProgress, 1));
                const blur = 5 * Math.min(absProgress, 1);
                
                s.slides[i].style.opacity = opacity;
                s.slides[i].style.filter = 'blur(' + blur + 'px)';
                
                const img = s.slides[i].querySelector('img');
                if (img) {
                  img.style.transform = 'scale(' + scale + ')';
                }
              }
            },
            setTransition: function(s: any, duration: number) {
              for (let i = 0; i < s.slides.length; i++) {
                s.slides[i].style.transitionDuration = duration + 'ms';
                const img = s.slides[i].querySelector('img');
                if (img) {
                  img.style.transitionDuration = duration + 'ms';
                }
              }
            }
          }
        });
      }, 100);
    }
  }, []);

  return (
    <div className="gmfci-gallery-wrap" style={{ minHeight: "500px", background: "transparent", position: "relative" }}>
      <ParticlesCanvas />
      
      <div className="gmfci-gallery-content">
        <div className="swiper swiper-container-coverflow" style={{ paddingBottom: "50px" }}>
          <div className="swiper-wrapper">
            {images.map((img, index) => (
              <div className="swiper-slide" key={index} style={{ width: "600px", height: "400px", maxWidth: "90vw" }}>
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className="object-cover transition-transform duration-1000"
                    sizes="(max-width: 768px) 90vw, 600px"
                    priority={index < 2} // Preload the first two images for LCP
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}
