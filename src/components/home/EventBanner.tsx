import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import "@/styles/event-banner.css";

interface UpcomingEvent {
  id: string;
  title: string;
  slug: string;
  start_date: string;
  end_date?: string;
  location?: string;
  excerpt?: string;
  image_url?: string;
}

export default async function EventBanner() {
  const now = new Date().toISOString();
  const { data: event } = await supabase
    .from("events")
    .select("id, title, slug, start_date, end_date, location, excerpt, image_url")
    .gte("start_date", now)
    .order("start_date", { ascending: true })
    .limit(1)
    .maybeSingle<UpcomingEvent>();

  if (!event) return null;

  const startDate = new Date(event.start_date);
  const endDate = event.end_date ? new Date(event.end_date) : null;

  const day = startDate.getDate();
  const month = startDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = startDate.getFullYear();

  // Countdown data
  const now2 = new Date();
  const msLeft = startDate.getTime() - now2.getTime();
  const daysLeft = Math.max(0, Math.floor(msLeft / (1000 * 60 * 60 * 24)));

  const dateRange = endDate
    ? `${day}–${endDate.getDate()} ${month} ${year}`
    : `${day} ${month} ${year}`;

  return (
    <section className="gmfci-eb-section" aria-label="Upcoming Event">
      <div className="gmfci-eb-inner">
        {/* Left accent bar */}
        <div className="gmfci-eb-accent" aria-hidden="true" />

        {/* Date block */}
        <div className="gmfci-eb-date-block">
          <span className="gmfci-eb-date-day">{day}</span>
          <span className="gmfci-eb-date-month">{month}</span>
          <span className="gmfci-eb-date-year">{year}</span>
        </div>

        <div className="gmfci-eb-divider" aria-hidden="true" />

        {/* Text content */}
        <div className="gmfci-eb-text">
          <div className="gmfci-eb-eyebrow">
            <span className="gmfci-eb-live-dot" aria-hidden="true" />
            Upcoming Event
          </div>
          <h2 className="gmfci-eb-title">{event.title}</h2>
          <div className="gmfci-eb-meta">
            {event.location && (
              <span className="gmfci-eb-meta-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {event.location}
              </span>
            )}
            <span className="gmfci-eb-meta-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {dateRange}
            </span>
          </div>
        </div>

        {/* Countdown chip */}
        <div className="gmfci-eb-countdown">
          <span className="gmfci-eb-countdown-num">{daysLeft}</span>
          <span className="gmfci-eb-countdown-label">days away</span>
        </div>

        {/* Image thumbnail */}
        {event.image_url && (
          <div className="gmfci-eb-thumbnail" aria-hidden="true">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="gmfci-eb-thumbnail-img"
              sizes="120px"
            />
          </div>
        )}

        {/* CTA */}
        <Link href={`/events/${event.slug}`} className="gmfci-eb-cta">
          View Details
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
