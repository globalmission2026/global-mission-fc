import PageHero from "@/components/shared/PageHero";
import Image from "next/image";

export default function AboutPage() {
  const coreValues = [
    { title: "Prayers", icon: "🙏", desc: "We believe in the power of persistent, fervent prayer to transform lives, communities, and nations." },
    { title: "Word of God", icon: "📖", desc: "We are committed to the infallible truth of Scripture as the foundation for our faith and daily living." },
    { title: "Power of the Holy Spirit", icon: "🔥", desc: "We yield to the leading, gifts, and transformative power of the Holy Spirit in all we do." },
    { title: "Righteousness", icon: "✝️", desc: "We pursue a life of integrity, purity, and holiness that reflects the character of Christ." },
    { title: "Passion", icon: "❤️", desc: "We are passionately driven to reach the lost and serve our community with the love of Jesus." }
  ];

  const leadership = [
    { name: "Anthony Githui", role: "Director", img: "/images/anthony-githui.jpeg" },
    { name: "Apostle Shadrach", role: "National Chairman", img: "/images/apostle-shadrach.jpeg" },
    { name: "Dr. Young", role: "Organizing Secretary", img: "/images/dr-young.jpg" },
    { name: "Pastor Betty", role: "Secretary General", img: "/images/pastor-betty.jpg" },
    { name: "Pastor Kamwaga", role: "Treasurer", img: "/images/pastor-kamwaga.jpeg" },
    { name: "Rev. Nyaga", role: "Coordinator of Council of Bishops", img: "/images/rev-bishop.jpeg" }
  ];
  const directorImg = "/images/anthony-githui.jpeg";

  const phone1 = "+1 (512) 785 6994";
  const phone2 = "+254 715 493 666";
  const phone3 = "+254 710 642 232";
  const email  = "globalmissionfc@gmail.com";
  const twitter = "@globalmissionfc";
  const youtube = "@GlobalMissionfc";
  const po_box = "P.O. Box 444 – 10100, Kenya";

  return (
    <main>
      <PageHero 
        eyebrow="Our Story & Purpose"
        title="Global Mission For<br><span>Christ International</span>"
        subtitle="Revive the Nations. Preach the Gospel. Win Souls.<br>From Kenya to the ends of the earth — Christ for Every Nation."
      />

      <div className="gmfci-about-wrap">
        {/* VISION & MISSION CARDS */}
        <div className="gmfci-vm-section">
          <p className="gmfci-section-label">What We Stand For</p>
          <h2 className="gmfci-section-title">Our Vision & Mission</h2>
          <div className="gmfci-vm-grid">
            <div className="gmfci-vm-card">
              <span className="gmfci-vm-icon">🌍</span>
              <h3>Vision</h3>
              <p>Propagate Revival to the nations of the world and draw men to Christ by the power of the gospel of our Lord Jesus Christ.</p>
              <div className="vmcard-bg-text">V</div>
            </div>
            <div className="gmfci-vm-card">
              <span className="gmfci-vm-icon">⛪</span>
              <h3>Mission</h3>
              <p>Global Mission for Christ International is dedicated to igniting the fire of revival and to the teachings of the word of God — raising men and women who will impact their generation through prayer, passion, and praise.</p>
              <div className="vmcard-bg-text">M</div>
            </div>
            <div className="gmfci-vm-card">
              <span className="gmfci-vm-icon">🌱</span>
              <h3>Outreach</h3>
              <p>We reach communities through the Gospel, prayer gatherings, revival meetings, and acts of compassion — supporting the needy through medical and community outreach programs.</p>
              <div className="vmcard-bg-text">O</div>
            </div>
          </div>
        </div>

        {/* VALUES */}
        <div className="gmfci-values-section">
          <div className="gmfci-values-inner">
            <p className="gmfci-section-label">What We Believe</p>
            <h2 className="gmfci-section-title">Our Core Values</h2>
            <div className="gmfci-values-list">
              {coreValues.map((cv, idx) => (
                <div key={idx} className="gmfci-value-card">
                  <div className="icon">{cv.icon}</div>
                  <h3>{cv.title}</h3>
                  <p>{cv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIRECTOR'S MESSAGE */}
        <div className="gmfci-director-section">
          <div className="gmfci-director-grid">
            <div className="gmfci-director-photo-wrap">
              <div className="gmfci-director-photo-frame">
              <img src={directorImg} alt="Rev. Anthony Githui" />
            </div>
            </div>
            <div className="gmfci-director-content">
              <div className="role-badge">✝ Director's Message</div>
              <h2>Rev. Anthony Githui</h2>
              <p className="director-message">"At Global Mission for Christ International, our heartbeat is to see lives transformed by the power of Jesus Christ and revival spread to the nations of the world. We are committed to raising men and women grounded in prayer, rooted in the Word of God, empowered by the Holy Spirit, passionate for righteousness, and dedicated to impacting their generation for Christ. As a ministry, we continue to reach communities through the Gospel, prayer gatherings, revival meetings, and acts of compassion — supporting the needy through medical and community outreach programs. May this ministry continue to inspire faith, ignite passion for God, and draw many into a deeper relationship with Christ. Together, let us shine His light and carry the message of hope to the world."</p>
              <div className="director-sig">
                Grace and Peace,<br />
                Rev. Anthony Githui
                <span>Director, Global Mission for Christ International</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEADERSHIP TEAM */}
        <div className="gmfci-bishops-section">
          <div className="gmfci-bishops-inner">
            <p className="gmfci-section-label">Leadership</p>
            <h2 className="gmfci-section-title">Our Leadership Team</h2>
            <div className="gmfci-bishops-grid">
              {leadership.map((leader, idx) => (
                <div key={idx} className="gmfci-bishop-card">
                  <div className="gmfci-bishop-avatar" style={{ backgroundImage: `url(${leader.img})` }}></div>
                  <h4>{leader.name}</h4>
                  <p>{leader.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT BANNER */}
        <div className="gmfci-about-contact">
          <div className="gmfci-about-contact-inner">
            <div className="gmfci-contact-item">
              <div className="gmfci-contact-icon">📞</div>
              <div>
                <h4>Phone</h4>
                <p>
                  <a href={`tel:${phone1.replace(/\s+/g, '')}`}>{phone1}</a><br />
                  <a href={`tel:${phone2.replace(/\s+/g, '')}`}>{phone2}</a><br />
                  <a href={`tel:${phone3.replace(/\s+/g, '')}`}>{phone3}</a>
                </p>
              </div>
            </div>
            <div className="gmfci-contact-item">
              <div className="gmfci-contact-icon">📧</div>
              <div>
                <h4>Email</h4>
                <p><a href={`mailto:${email}`} style={{ color: "#D1D5DB", textDecoration: "none" }}>{email}</a></p>
              </div>
            </div>
            <div className="gmfci-contact-item">
              <div className="gmfci-contact-icon">📮</div>
              <div>
                <h4>Postal Address</h4>
                <p>{po_box}</p>
              </div>
            </div>
            <div className="gmfci-contact-item">
              <div className="gmfci-contact-icon">🐦</div>
              <div>
                <h4>Follow Us</h4>
                <p>
                  <a href={`https://x.com/${twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ color: "#D1D5DB", textDecoration: "none" }}>{twitter}</a><br />
                  <a href={`https://youtube.com/${youtube}`} target="_blank" rel="noopener noreferrer" style={{ color: "#D1D5DB", textDecoration: "none" }}>{youtube}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
