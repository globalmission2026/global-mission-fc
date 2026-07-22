const coreValues = [
  { title: "Prayers", icon: "🙏", desc: "We believe in the power of persistent, fervent prayer to transform lives, communities, and nations." },
  { title: "Word of God", icon: "📖", desc: "We are committed to the infallible truth of Scripture as the foundation for our faith and daily living." },
  { title: "Power of the Holy Spirit", icon: "🔥", desc: "We yield to the leading, gifts, and transformative power of the Holy Spirit in all we do." },
  { title: "Righteousness", icon: "✝️", desc: "We pursue a life of integrity, purity, and holiness that reflects the character of Christ." },
  { title: "Passion", icon: "❤️", desc: "We are passionately driven to reach the lost and serve our community with the love of Jesus." },
]

export default function CoreValues() {
  return (
    <div className="gmfci-values-section">
      <div className="gmfci-values-inner">
        <p className="gmfci-section-label">What We Believe</p>
        <h2 className="gmfci-section-title">Our Core Values</h2>
        <div className="gmfci-values-list">
          {coreValues.map((cv) => (
            <div key={cv.title} className="gmfci-value-card">
              <div className="icon">{cv.icon}</div>
              <h3>{cv.title}</h3>
              <p>{cv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
