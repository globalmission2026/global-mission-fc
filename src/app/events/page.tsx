import PageHero from "@/components/shared/PageHero";
import EventList from "@/components/events/EventList";
import "@/styles/events-list.css";

export const metadata = {
  title: "Ministry Events - Global Mission for Christ International",
  description:
    "Explore upcoming and past ministry events, conferences, outreaches, and revival meetings hosted by GMFCI.",
};

export default function EventsPage() {
  return (
    <main className="gmfci-events-page">
      <PageHero
        eyebrow="What's happening"
        title="Ministry Events"
        subtitle="Join us as we gather for worship, prayer, medical outreaches, and Spirit-filled revival meetings across the nations."
        btn1Text="Contact Us"
        btn1Url="/contact"
      />

      <div className="gmfci-events-shell">

        {/* ── Upcoming ── */}
        <section className="gmfci-events-section-block">
          <header className="gmfci-events-section-header">
            <div>
              <p className="gmfci-events-section-eyebrow">Coming Up</p>
              <h2 className="gmfci-events-section-title">Upcoming Events</h2>
            </div>
          </header>
          <EventList type="upcoming" />
        </section>

        {/* ── Past ── */}
        <section className="gmfci-events-section-block">
          <header className="gmfci-events-section-header">
            <div>
              <p className="gmfci-events-section-eyebrow">Look Back</p>
              <h2 className="gmfci-events-section-title">Past Events & Highlights</h2>
            </div>
          </header>
          <EventList type="past" />
        </section>

      </div>
    </main>
  );
}
