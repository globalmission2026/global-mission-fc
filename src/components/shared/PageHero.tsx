import Link from "next/link";
import ParticlesCanvas from "@/components/shared/ParticlesCanvas";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  btn1Text?: string;
  btn1Url?: string;
  btn2Text?: string;
  btn2Url?: string;
  backgroundImage?: string;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  btn1Text,
  btn1Url,
  btn2Text,
  btn2Url,
  backgroundImage = "/images/default-hero.jpg"
}: PageHeroProps) {
  return (
    <section 
      className="gmfci-page-hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="gmfci-overlay"></div>
      
      {/* Particles Canvas */}
      <ParticlesCanvas />
      <div className="shell">
        {eyebrow && <div className="gmfci-page-eyebrow">{eyebrow}</div>}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && <p className="gmfci-page-lead" dangerouslySetInnerHTML={{ __html: subtitle }} />}
        
        {(btn1Text || btn2Text) && (
          <div className="gmfci-hero-btn-row">
            {btn1Text && btn1Url && (
              <Link href={btn1Url} className="gmfci-hero-btn gmfci-hero-btn-primary">
                {btn1Text}
              </Link>
            )}
            {btn2Text && btn2Url && (
              <Link href={btn2Url} className="gmfci-hero-btn gmfci-hero-btn-ghost">
                {btn2Text}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
