import PageHero from "@/components/shared/PageHero";

export default function GivePage() {
  return (
    <main>
      <PageHero
        eyebrow="Partner With Us"
        title="Give to the Mission"
        subtitle="Help us propagate revival to the nations. Every gift makes an eternal difference."
      />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px" }}>

        {/* Main give box */}
        <div style={{
          background: "linear-gradient(135deg, #4A1110 0%, #6B1A18 50%, #E47A2B 100%)",
          borderRadius: "24px",
          padding: "60px 40px",
          textAlign: "center",
          color: "#fff",
          marginBottom: "40px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>♥</div>
            <h2 style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "16px" }}>
              Make a Donation
            </h2>
            <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: "500px", margin: "0 auto 36px", lineHeight: 1.7 }}>
              Your generous gift enables us to preach the gospel, plant churches, support outreach,
              and hold revival conferences across the nations.
            </p>

            {/* Bank Details Box */}
            <div style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "32px",
              border: "1px solid rgba(255,255,255,0.2)"
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "24px", textTransform: "uppercase", letterSpacing: "2px" }}>
                Bank Transfer Details
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", textAlign: "left" }}>
                <div>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.6, marginBottom: "4px" }}>Account Name</div>
                  <div style={{ fontWeight: 600 }}>Global Mission for Christ International</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.6, marginBottom: "4px" }}>Bank</div>
                  <div style={{ fontWeight: 600 }}>Contact us for details</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.6, marginBottom: "4px" }}>M-Pesa (Kenya)</div>
                  <div style={{ fontWeight: 600 }}>+254 715 493 666</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.6, marginBottom: "4px" }}>International</div>
                  <div style={{ fontWeight: 600 }}>+1 (512) 785 6994</div>
                </div>
              </div>
            </div>

            <p style={{ opacity: 0.75, fontSize: "0.9rem" }}>
              For questions about giving, contact us at{" "}
              <a href="mailto:globalmissionfc@gmail.com" style={{ color: "#F0A058", textDecoration: "underline" }}>
                globalmissionfc@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Scripture verse */}
        <div style={{
          background: "#FAF9F6",
          borderLeft: "4px solid #F59E0B",
          padding: "24px 32px",
          borderRadius: "0 12px 12px 0",
          textAlign: "center"
        }}>
          <p style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontSize: "1.2rem", color: "#4A1110", fontStyle: "italic", margin: "0 0 8px" }}>
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
          </p>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem", margin: 0 }}>— 2 Corinthians 9:7</p>
        </div>

      </div>
    </main>
  );
}
