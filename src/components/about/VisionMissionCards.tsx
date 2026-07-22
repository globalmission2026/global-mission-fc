const cards = [
  {
    icon: "🌍",
    title: "Vision",
    body: "Propagate Revival to the nations of the world and draw men to Christ by the power of the gospel of our Lord Jesus Christ.",
    bg: "V",
  },
  {
    icon: "⛪",
    title: "Mission",
    body: "Global Mission for Christ International is dedicated to igniting the fire of revival and to the teachings of the word of God — raising men and women who will impact their generation through prayer, passion, and praise.",
    bg: "M",
  },
  {
    icon: "🌱",
    title: "Outreach",
    body: "We reach communities through the Gospel, prayer gatherings, revival meetings, and acts of compassion — supporting the needy through medical and community outreach programs.",
    bg: "O",
  },
]

export default function VisionMissionCards() {
  return (
    <div className="gmfci-vm-section">
      <p className="gmfci-section-label">What We Stand For</p>
      <h2 className="gmfci-section-title">Our Vision & Mission</h2>
      <div className="gmfci-vm-grid">
        {cards.map((c) => (
          <div key={c.title} className="gmfci-vm-card">
            <span className="gmfci-vm-icon">{c.icon}</span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            <div className="vmcard-bg-text">{c.bg}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
