import Image from "next/image"

const directorImg = "/images/anthony-githui.jpg"

export default function DirectorMessage() {
  return (
    <div className="gmfci-director-section">
      <div className="gmfci-director-grid">
        <div className="gmfci-director-photo-wrap">
          <div className="gmfci-director-photo-frame">
            <Image src={directorImg} alt="Rev. Anthony Githui" width={300} height={400} style={{ objectFit: "cover", borderRadius: "12px" }} />
          </div>
        </div>
        <div className="gmfci-director-content">
          <div className="role-badge">✝ Director&apos;s Message</div>
          <h2>Rev. Anthony Githui</h2>
          <p className="director-message">&ldquo;At Global Mission for Christ International, our heartbeat is to see lives transformed by the power of Jesus Christ and revival spread to the nations of the world. We are committed to raising men and women grounded in prayer, rooted in the Word of God, empowered by the Holy Spirit, passionate for righteousness, and dedicated to impacting their generation for Christ. As a ministry, we continue to reach communities through the Gospel, prayer gatherings, revival meetings, and acts of compassion — supporting the needy through medical and community outreach programs. May this ministry continue to inspire faith, ignite passion for God, and draw many into a deeper relationship with Christ. Together, let us shine His light and carry the message of hope to the world.&rdquo;</p>
          <div className="director-sig">
            Grace and Peace,<br />
            Rev. Anthony Githui
            <span>Director, Global Mission for Christ International</span>
          </div>
        </div>
      </div>
    </div>
  )
}
