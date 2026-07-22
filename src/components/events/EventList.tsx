"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Event {
  id: string;
  title: string;
  start_date: string;
  excerpt: string;
  image_url: string;
  slug: string;
}

// Skeleton loader card
function SkeletonCard() {
  return (
    <div className="gmfci-el-skeleton">
      <div className="gmfci-el-skeleton-img" />
      <div className="gmfci-el-skeleton-body">
        <div className="gmfci-el-skeleton-line" />
        <div className="gmfci-el-skeleton-line" />
        <div className="gmfci-el-skeleton-line" />
        <div className="gmfci-el-skeleton-line" />
      </div>
    </div>
  );
}

// Image placeholder shown when no image_url is set
function ImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="gmfci-el-placeholder">
      <svg className="gmfci-el-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 18.75h16.5M3.75 4.5h16.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="gmfci-el-placeholder-label">{title}</span>
    </div>
  );
}

const PAGE_SIZE = 20;

export default function EventList({ type }: { type: "upcoming" | "past" }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = new Date().toISOString();
        const query = supabase
          .from("events")
          .select("id, title, start_date, excerpt, image_url, slug")
          .order("start_date", { ascending: type === "upcoming" });

        const { data, error } =
          type === "upcoming"
            ? await query.gte("start_date", now)
            : await query.lt("start_date", now);

        if (error) throw error;
        setEvents(data || []);
        setHasMore((data?.length || 0) === PAGE_SIZE);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [type]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const now = new Date().toISOString();
      const from = events.length;
      const to = from + PAGE_SIZE - 1;

      const query = supabase
        .from("events")
        .select("id, title, start_date, excerpt, image_url, slug")
        .order("start_date", { ascending: type === "upcoming" })
        .range(from, to);

      const { data, error } =
        type === "upcoming"
          ? await query.gte("start_date", now)
          : await query.lt("start_date", now);

      if (error) throw error;
      setEvents(prev => [...prev, ...(data || [])]);
      setHasMore((data?.length || 0) === PAGE_SIZE);
    } catch (err) {
      console.error("Error loading more events:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Skeleton loading state
  if (loading) {
    return (
      <div className="gmfci-el-skeleton-grid">
        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  // Empty state
  if (events.length === 0) {
    return (
      <div className="gmfci-el-empty">
        <svg className="gmfci-el-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="gmfci-el-empty-title">
          {type === "upcoming" ? "No upcoming events scheduled" : "No past events found"}
        </p>
        <p className="gmfci-el-empty-sub">
          {type === "upcoming"
            ? "Check back soon — new events are added regularly."
            : "Past events will appear here once they have concluded."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="gmfci-el-grid">
        {events.map((event) => {
          const date = new Date(event.start_date);
          const month = date.toLocaleString("default", { month: "short" });
          const day = date.getDate();
          const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

          return (
            <article
              key={event.id}
              className={`gmfci-el-card${type === "past" ? " gmfci-el-card--past" : ""}`}
            >
              <div className="gmfci-el-img-wrap">
                {event.image_url ? (
                  <>
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      className="gmfci-el-img object-cover"
                      sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="gmfci-el-img-overlay" />
                  </>
                ) : (
                  <ImagePlaceholder title={event.title} />
                )}

                <div className="gmfci-el-date-badge">
                  <span className="gmfci-el-date-day">{day}</span>
                  <span className="gmfci-el-date-month">{month}</span>
                </div>
              </div>

              <div className="gmfci-el-content">
                <div className="gmfci-el-meta">
                  <svg className="gmfci-el-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {time}
                </div>

                <h3 className="gmfci-el-title">
                  <Link href={`/events/${event.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {event.title}
                  </Link>
                </h3>

                {event.excerpt && (
                  <p className="gmfci-el-excerpt">{event.excerpt}</p>
                )}

                <Link href={`/events/${event.slug}`} className="gmfci-el-link">
                  {type === "upcoming" ? "Register / Learn More" : "View Recap"}
                  <svg className="gmfci-el-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="gmfci-el-load-more"
          >
            {loadingMore ? "Loading…" : "Load More Events"}
          </button>
        </div>
      )}
    </>
  );
}
