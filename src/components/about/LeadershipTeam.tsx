const leadership = [
  { name: "Anthony Githui", role: "Director", img: "/images/anthony-githui.jpg" },
  { name: "Apostle Shadrach", role: "National Chairman", img: "/images/apostle-shadrach.jpg" },
  { name: "Dr. Young", role: "Organizing Secretary", img: "/images/dr-young.jpg" },
  { name: "Pastor Betty", role: "Secretary General", img: "/images/pastor-betty.jpg" },
  { name: "Pastor Kamwaga", role: "Treasurer", img: "/images/pastor-kamwaga.jpg" },
  { name: "Rev. Nyaga", role: "Coordinator of Council of Bishops", img: "/images/rev-bishop.jpg" },
]

export default function LeadershipTeam() {
  return (
    <div className="gmfci-bishops-section">
      <div className="gmfci-bishops-inner">
        <p className="gmfci-section-label">Leadership</p>
        <h2 className="gmfci-section-title">Our Leadership Team</h2>
        <div className="gmfci-bishops-grid">
          {leadership.map((leader) => (
            <div key={leader.name} className="gmfci-bishop-card">
              <div className="gmfci-bishop-avatar" style={{ backgroundImage: `url(${leader.img})` }} />
              <h4>{leader.name}</h4>
              <p>{leader.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
