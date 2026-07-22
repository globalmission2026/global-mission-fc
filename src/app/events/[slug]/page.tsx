import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PageHero from "@/components/shared/PageHero";
import "@/styles/event-detail.css";

interface EventDetail {
  id: string;
  title: string;
  start_date: string;
  end_date?: string;
  excerpt?: string;
  description?: string;
  image_url?: string;
  slug: string;
  location?: string;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: event } = await supabase
    .from("events")
    .select("title, excerpt")
    .eq("slug", slug)
    .maybeSingle();

  return {
    title: event ? `${event.title} – Global Mission for Christ International` : "Event Not Found",
    description: event?.excerpt || "Event details for Global Mission for Christ International.",
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<EventDetail>();

  if (!event) notFound();

  const startDate = new Date(event.start_date);
  const endDate = event.end_date ? new Date(event.end_date) : null;
  const isPast = new Date() > startDate;

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <main className="gmfci-evd-main">
      <PageHero
        eyebrow={isPast ? "Past Event" : "Upcoming Event"}
        title={event.title}
        subtitle={event.excerpt || undefined}
      />

      <div className="gmfci-evd-container">
        <div className="gmfci-evd-layout">
          {/* Left: Image */}
          {event.image_url && (
            <div className="gmfci-evd-image-col">
              <div className="gmfci-evd-image-wrap">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  className="gmfci-evd-image"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
              </div>
            </div>
          )}

          {/* Right: Details */}
          <div
            className={`gmfci-evd-content-col${!event.image_url ? " gmfci-evd-content-col--full" : ""}`}
          >
            {/* Meta pills */}
            <div className="gmfci-evd-meta-row">
              <span className={`gmfci-evd-status-pill${isPast ? " past" : " upcoming"}`}>
                {isPast ? "Past Event" : "Upcoming"}
              </span>
            </div>

            <h1 className="gmfci-evd-title">{event.title}</h1>

            <div className="gmfci-evd-info-cards">
              {/* Date */}
              <div className="gmfci-evd-info-card">
                <div className="gmfci-evd-info-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <span className="gmfci-evd-info-label">Date</span>
                  <span className="gmfci-evd-info-value">{formatDate(startDate)}</span>
                  {endDate && endDate.toDateString() !== startDate.toDateString() && (
                    <span className="gmfci-evd-info-value">to {formatDate(endDate)}</span>
                  )}
                </div>
              </div>

              {/* Time */}
              <div className="gmfci-evd-info-card">
                <div className="gmfci-evd-info-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <span className="gmfci-evd-info-label">Time</span>
                  <span className="gmfci-evd-info-value">{formatTime(startDate)}</span>
                </div>
              </div>

              {/* Location */}
              {event.location && (
                <div className="gmfci-evd-info-card">
                  <div className="gmfci-evd-info-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="gmfci-evd-info-label">Location</span>
                    <span className="gmfci-evd-info-value">{event.location}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {event.description && (
              <div
                className="gmfci-evd-description"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            )}

            {/* Back link */}
            <Link href="/events" className="gmfci-evd-back-link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to All Events
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
