"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import ParticlesCanvas from "@/components/shared/ParticlesCanvas";

export default function Hero() {
  useEffect(() => {
    // Word rotator
    const words = document.querySelectorAll('.gmfci-word');
    if (words.length > 0) {
      let currentIndex = 0;
      const rotatorInterval = setInterval(() => {
        const current = words[currentIndex];
        const nextIndex = (currentIndex + 1) % words.length;
        const next = words[nextIndex];
        current.classList.remove('active');
        current.classList.add('exit');
        next.classList.remove('exit');
        next.classList.add('active');
        currentIndex = nextIndex;
      }, 3000);
      return () => clearInterval(rotatorInterval);
    }
  }, []);

  useEffect(() => {
    // Stats counter animation
    const statNums = document.querySelectorAll('.gmfci-stat-num');
    if (statNums.length > 0) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const finalValue = parseInt(target.getAttribute('data-target') || '0', 10);
            const suffix = target.getAttribute('data-suffix') || '';
            let startTimestamp: number | null = null;
            const animate = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              const currentVal = Math.floor(easeProgress * finalValue);
              target.innerHTML = currentVal.toLocaleString() + suffix;
              if (progress < 1) requestAnimationFrame(animate);
              else target.innerHTML = finalValue.toLocaleString() + suffix;
            };
            requestAnimationFrame(animate);
            obs.unobserve(target);
          }
        });
      }, { threshold: 0.5 });
      statNums.forEach(num => observer.observe(num));
    }
  }, []);

  useEffect(() => {
    // Scroll arrow
    const scrollArrow = document.querySelector('.gmfci-scroll-indicator');
    const handleClick = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    scrollArrow?.addEventListener('click', handleClick);
    return () => scrollArrow?.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    // Scroll progress bar
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = (scrollTop / scrollHeight) * 100;
      const bar = document.getElementById('gmfci-scroll-progress');
      if (bar) bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div id="gmfci-hero-wrap">
      <div id="gmfci-hero" style={{ marginLeft: 0 }}>
        <Image
          src="/images/hero-bg-optimized.jpg"
          alt="Global Mission for Christ International — Hero background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 0 }}
        />
        <ParticlesCanvas />
        <div className="gmfci-hero-overlay"></div>
        <div className="gmfci-hero-content">
          <div className="gmfci-hero-tag">✝ Global Mission for Christ International</div>
          <h1 className="gmfci-hero-title">
            PROPAGATING REVIVAL<br />
            <span className="gmfci-word-rotator gmfci-highlight">
              <span className="gmfci-word active">TO THE NATIONS</span>
              <span className="gmfci-word">TO THE COMMUNITIES</span>
              <span className="gmfci-word">TO THE WORLD</span>
            </span>
          </h1>
          <p className="gmfci-hero-sub">
            Revive the Nations. Preach the Gospel. Win Souls. —<br />
            Propagating Revival from Kenya to the ends of the earth.
          </p>
          <div className="gmfci-hero-ctas">
            <Link href="/sermons" className="gmfci-btn gmfci-btn-secondary">
              <span className="gmfci-btn-icon">▶</span> Watch Latest Sermon
            </Link>
            <Link href="/give" className="gmfci-btn gmfci-btn-primary">
              <span className="gmfci-btn-icon">♥</span> Give to the Mission
            </Link>
          </div>
        </div>
        <div className="gmfci-scroll-indicator">
          <span>Scroll</span>
          <div className="gmfci-scroll-arrow"></div>
        </div>
        <div className="gmfci-stats-bar">
          <div className="gmfci-stat">
            <span className="gmfci-stat-num" data-target="34200" data-suffix="+">0</span>
            <span className="gmfci-stat-label">Souls Reached</span>
          </div>
          <div className="gmfci-stat-divider"></div>
          <div className="gmfci-stat">
            <span className="gmfci-stat-num" data-target="5" data-suffix="">0</span>
            <span className="gmfci-stat-label">Annual Conferences</span>
          </div>
          <div className="gmfci-stat-divider"></div>
          <div className="gmfci-stat">
            <span className="gmfci-stat-num" data-target="6" data-suffix="+">0</span>
            <span className="gmfci-stat-label">Years of Ministry</span>
          </div>
          <div className="gmfci-stat-divider"></div>
          <div className="gmfci-stat">
            <span className="gmfci-stat-num" data-target="10" data-suffix="+">0</span>
            <span className="gmfci-stat-label">Nations Touched</span>
          </div>
        </div>
      </div>
    </div>
  );
}
