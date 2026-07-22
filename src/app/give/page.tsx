import PageHero from "@/components/shared/PageHero";
import { CONTACT } from "@/lib/config";
import "../../styles/give-page.css";

export default function GivePage() {
  return (
    <main>
      <PageHero
        eyebrow="Partner With Us"
        title="Give to the Mission"
        subtitle="Help us propagate revival to the nations. Every gift makes an eternal difference."
      />

      <div className="gmfci-give-container">
        <div className="gmfci-give-hero">
          <div className="gmfci-give-hero-inner">
            <div className="gmfci-give-heart">♥</div>
            <h2 className="gmfci-give-title">Make a Donation</h2>
            <p className="gmfci-give-description">
              Your generous gift enables us to preach the gospel, plant churches, support outreach,
              and hold revival conferences across the nations.
            </p>

            <div className="gmfci-give-bank-box">
              <h3>Bank Transfer Details</h3>
              <div className="gmfci-give-bank-grid">
                <div>
                  <div className="gmfci-give-bank-label">Account Name</div>
                  <div className="gmfci-give-bank-value">Global Mission for Christ International</div>
                </div>
                <div>
                  <div className="gmfci-give-bank-label">Bank</div>
                  <div className="gmfci-give-bank-value">Contact us for details</div>
                </div>
                <div>
                  <div className="gmfci-give-bank-label">M-Pesa (Kenya)</div>
                  <div className="gmfci-give-bank-value">{CONTACT.phones[1]}</div>
                </div>
                <div>
                  <div className="gmfci-give-bank-label">International</div>
                  <div className="gmfci-give-bank-value">{CONTACT.phones[0]}</div>
                </div>
              </div>
            </div>

            <p className="gmfci-give-contact">
              For questions about giving, contact us at{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>
        </div>

        <div className="gmfci-give-verse">
          <p className="gmfci-give-verse-text">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
          </p>
          <p className="gmfci-give-verse-ref">— 2 Corinthians 9:7</p>
        </div>
      </div>
    </main>
  );
}
