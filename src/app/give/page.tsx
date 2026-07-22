import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import { CONTACT } from "@/lib/config";
import "../../styles/give-page.css";

export const metadata: Metadata = {
  title: "Give – Global Mission for Christ International",
  description:
    "Partner with Global Mission for Christ International. Your generous gift enables us to preach the gospel, plant churches, and hold revival conferences across the nations.",
};

export default function GivePage() {
  return (
    <main className="gmfci-give-main">
      <PageHero
        eyebrow="Partner With Us"
        title="Give to the Mission"
        subtitle="Help us propagate revival to the nations. Every gift makes an eternal difference."
      />

      <section className="gmfci-give-section">
        {/* Hero Give Card */}
        <div className="gmfci-give-hero-card">
          <div className="gmfci-give-hero-left">
            <div className="gmfci-give-badge">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              M-Pesa · Equity Paybill
            </div>
            <h2>Give via Mobile Money</h2>
            <p>
              Fast, secure and instant. Use your M-Pesa to support the ministry directly through
              Equity Bank Paybill.
            </p>

            <div className="gmfci-give-amounts">
              <span>Common amounts:</span>
              <div className="gmfci-give-amount-chips">
                <span>KES 500</span>
                <span>KES 1,000</span>
                <span>KES 2,500</span>
                <span>KES 5,000</span>
              </div>
            </div>
          </div>

          <div className="gmfci-give-hero-right">
            <div className="gmfci-give-phone-card">
              <div className="gmfci-give-phone-header">
                <div className="gmfci-give-equity-logo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <path
                      d="M8 12l3 3 5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <span>Lipa na M-Pesa · Paybill</span>
              </div>

              <div className="gmfci-give-detail-block">
                <div className="gmfci-give-detail-item">
                  <span className="gmfci-give-detail-label">Business No.</span>
                  <span className="gmfci-give-detail-number">247 247</span>
                </div>
                <div className="gmfci-give-divider" />
                <div className="gmfci-give-detail-item">
                  <span className="gmfci-give-detail-label">Account No.</span>
                  <span className="gmfci-give-detail-number">262518</span>
                </div>
                <div className="gmfci-give-divider" />
                <div className="gmfci-give-detail-item">
                  <span className="gmfci-give-detail-label">Account Name</span>
                  <span className="gmfci-give-detail-name">GLOBAL · YINV</span>
                </div>
              </div>

              <div className="gmfci-give-steps-compact">
                <p className="gmfci-give-steps-title">How to pay</p>
                <ol>
                  <li>M-Pesa → Lipa na M-Pesa → Paybill</li>
                  <li>
                    Business No: <strong>247 247</strong>
                  </li>
                  <li>
                    Account No: <strong>262518</strong>
                  </li>
                  <li>Enter amount & confirm with PIN</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for other giving options */}
        <div className="gmfci-give-contact-bar">
          <p>For other giving methods, international transfers, or cheques, please contact us:</p>
          <div className="gmfci-give-contact-links">
            <a href={`mailto:${CONTACT.email}`} className="gmfci-give-contact-link">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {CONTACT.email}
            </a>
            <a
              href={`https://wa.me/${CONTACT.phones[1].replace(/[^0-9]/g, "")}`}
              className="gmfci-give-contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              {CONTACT.phones[1]}
            </a>
          </div>
        </div>

        {/* Scripture */}
        <div className="gmfci-give-quote-wrap">
          <div className="gmfci-give-quote-mark">&ldquo;</div>
          <blockquote className="gmfci-give-quote">
            Each of you should give what you have decided in your heart to give, not reluctantly or
            under compulsion, for God loves a cheerful giver.
          </blockquote>
          <cite>— 2 Corinthians 9:7</cite>
        </div>
      </section>
    </main>
  );
}
