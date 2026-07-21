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

export default function EventList({ type }: { type: "upcoming" | "past" }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = new Date().toISOString();
        const query = supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: type === 'upcoming' });

        // Filter by upcoming (future) or past events
        const { data, error } = type === 'upcoming'
          ? await query.gte('start_date', now)
          : await query.lt('start_date', now);

        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        console.error('Error fetching events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [type]);

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading events...</div>;

  if (events.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", background: "#F9FAFB", borderRadius: "12px", color: "#6B7280" }}>
        No {type} events found at the moment.
      </div>
    );
  }

  return (
    <div className="gmfci-events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
      {events.map((event) => {
        const date = new Date(event.start_date);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
          <div key={event.id} className="gmfci-event-card" style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", transition: "transform 0.3s", display: "flex", flexDirection: "column" }}>
            <div className="gmfci-event-img relative h-[250px] bg-gray-900 overflow-hidden w-full">
              {event.image_url ? (
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div style={{ position: "absolute", bottom: 0, right: 0, background: "#F59E0B", color: "#111827", width: "60px", textAlign: "center", padding: "10px", borderTopLeftRadius: "12px", fontWeight: "bold", boxShadow: "-2px -2px 10px rgba(0,0,0,0.3)" }}>
                <div style={{ fontSize: "24px", lineHeight: 1 }}>{day}</div>
                <div style={{ fontSize: "12px", textTransform: "uppercase" }}>{month}</div>
              </div>
            </div>
            <div className="gmfci-event-content" style={{ padding: "25px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "20px", margin: "0 0 10px", color: "#111827", lineHeight: 1.3 }}>
                <Link href={`/events/${event.slug}`} style={{ color: "inherit", textDecoration: "none" }}>{event.title}</Link>
              </h3>
              <div style={{ color: "#6B7280", fontSize: "14px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>🕒 {time}</span>
              </div>
              <p style={{ color: "#4B5563", fontSize: "15px", marginBottom: "20px", lineHeight: 1.5, flexGrow: 1 }}>
                {event.excerpt}
              </p>
              <Link href={`/events/${event.slug}`} style={{ display: "inline-block", color: "#F59E0B", fontWeight: 600, textDecoration: "none", marginTop: "auto" }}>
                View Details →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
