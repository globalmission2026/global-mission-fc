import { CONTACT, SOCIAL } from "@/lib/config"

export default function ContactBanner() {
  return (
    <div className="gmfci-about-contact">
      <div className="gmfci-about-contact-inner">
        <div className="gmfci-contact-item">
          <div className="gmfci-contact-icon">📞</div>
          <div>
            <h4>Phone</h4>
            <p>
              <a href={`tel:${CONTACT.phones[0].replace(/\s+/g, '')}`}>{CONTACT.phones[0]}</a><br />
              <a href={`tel:${CONTACT.phones[1].replace(/\s+/g, '')}`}>{CONTACT.phones[1]}</a><br />
              <a href={`tel:${CONTACT.phones[2].replace(/\s+/g, '')}`}>{CONTACT.phones[2]}</a>
            </p>
          </div>
        </div>
        <div className="gmfci-contact-item">
          <div className="gmfci-contact-icon">📧</div>
          <div>
            <h4>Email</h4>
            <p><a href={`mailto:${CONTACT.email}`} className="gmfci-contact-link">{CONTACT.email}</a></p>
          </div>
        </div>
        <div className="gmfci-contact-item">
          <div className="gmfci-contact-icon">📮</div>
          <div>
            <h4>Postal Address</h4>
            <p>{CONTACT.poBox}</p>
          </div>
        </div>
        <div className="gmfci-contact-item">
          <div className="gmfci-contact-icon">🐦</div>
          <div>
            <h4>Follow Us</h4>
            <p>
              <a href={`https://x.com/${SOCIAL.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="gmfci-contact-link">{SOCIAL.twitter}</a><br />
              <a href={`https://youtube.com/${SOCIAL.youtube}`} target="_blank" rel="noopener noreferrer" className="gmfci-contact-link">{SOCIAL.youtube}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
