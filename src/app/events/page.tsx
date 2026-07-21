import PageHero from "@/components/shared/PageHero";
import EventList from "@/components/events/EventList";

export default function EventsPage() {
  return (
    <main>
      <PageHero 
        title="Upcoming Ministry Events"
        subtitle="Join us as we gather for worship, prayer, and revival meetings."
      />
      <div className="gmfci-events-section" id="events" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <EventList type="upcoming" />
      </div>
    </main>
  );
}
