"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase-client";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  start_date: string;
  slug: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from("events")
        .select("id, title, start_date, slug")
        .order("start_date", { ascending: false });
      setEvents(data ?? []);
      setLoading(false);
    };
    fetchEvents();
  }, [supabase]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Event deleted");
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="gmfci-admin-table-wrap">
      <div className="gmfci-admin-table-header">
        <h3>Events</h3>
        <Link
          href="/admin/events/new"
          className="gmfci-admin-btn-primary"
          style={{ width: "auto", padding: "10px 20px", textDecoration: "none", fontSize: 14 }}
        >
          <Plus size={18} style={{ marginRight: 6, verticalAlign: "middle" }} />
          New Event
        </Link>
      </div>

      {loading ? (
        <div style={{ padding: 24, color: "#6b7280" }}>Loading...</div>
      ) : events.length === 0 ? (
        <div style={{ padding: 24, color: "#6b7280" }}>No events yet.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="gmfci-admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Slug</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(event.start_date).toLocaleDateString()}
                  </td>
                  <td style={{ color: "#6b7280", fontSize: 13 }}>{event.slug}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="gmfci-admin-action-btn"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      className="gmfci-admin-action-btn delete"
                      onClick={() => handleDelete(event.id)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
