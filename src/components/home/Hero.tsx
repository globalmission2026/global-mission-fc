import Link from "next/link";
import ParticlesCanvas from "@/components/shared/ParticlesCanvas";

export default function Hero() {
  return (
    <div id="gmfci-hero-wrap">
      <div id="gmfci-hero" style={{ backgroundImage: "url('/images/hero-bg-optimized.jpg')", marginLeft: 0 }}>
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
