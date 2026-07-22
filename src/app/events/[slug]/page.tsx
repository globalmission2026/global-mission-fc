import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PageHero from "@/components/shared/PageHero";

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

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", params.slug)
    .single<EventDetail | null>();

  if (!event) notFound();

  const startDate = new Date(event.start_date);
  const dateStr = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isPast = new Date() > startDate;

  return (
    <main>
      <PageHero
        eyebrow={isPast ? "Past Event" : "Upcoming Event"}
        title={event.title}
        subtitle={event.excerpt || undefined}
      />
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "60px 24px",
        }}
      >
        {event.image_url && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 400,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 32,
            }}
          >
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
              priority
            />
          </div>
        )}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#6b7280",
              fontSize: 14,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
            </svg>
            {dateStr} at {timeStr}
          </div>
          {event.location && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#6b7280",
                fontSize: 14,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              {event.location}
            </div>
          )}
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.8, color: "#374151" }}>
          {event.description || event.excerpt || "No additional details available."}
        </div>
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link
            href="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#4A1110",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            Back to All Events
          </Link>
        </div>
      </div>
    </main>
  );
}
