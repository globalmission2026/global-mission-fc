import { supabase } from "@/lib/supabase";
import { MessageSquare, Calendar } from "lucide-react";

export const metadata = {
  title: "Dashboard – Admin – Global Mission for Christ International",
};

async function getStats() {
  const now = new Date().toISOString();

  const [msgsRes, upcomingRes, totalEventsRes] = await Promise.all([
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }).gte("start_date", now),
    supabase.from("events").select("id", { count: "exact", head: true }),
  ]);

  return {
    messages: msgsRes.count ?? 0,
    upcomingEvents: upcomingRes.count ?? 0,
    totalEvents: totalEventsRes.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <>
      <div className="gmfci-admin-stats">
        <div className="gmfci-admin-stat-card">
          <div className="gmfci-admin-stat-icon blue">
            <MessageSquare size={28} />
          </div>
          <div className="gmfci-admin-stat-info">
            <h3>Messages</h3>
            <p>{stats.messages}</p>
          </div>
        </div>

        <div className="gmfci-admin-stat-card">
          <div className="gmfci-admin-stat-icon green">
            <Calendar size={28} />
          </div>
          <div className="gmfci-admin-stat-info">
            <h3>Total Events</h3>
            <p>{stats.totalEvents}</p>
          </div>
        </div>

        <div className="gmfci-admin-stat-card">
          <div className="gmfci-admin-stat-icon blue">
            <Calendar size={28} />
          </div>
          <div className="gmfci-admin-stat-info">
            <h3>Upcoming Events</h3>
            <p>{stats.upcomingEvents}</p>
          </div>
        </div>
      </div>
    </>
  );
}
