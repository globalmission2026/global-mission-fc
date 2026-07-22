"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase-client";
import { Trash2 } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("contact_messages")
        .select("id, name, email, subject, message, created_at")
        .order("created_at", { ascending: false });
      setMessages(data ?? []);
      setLoading(false);
    };
    fetchMessages();
  }, [supabase]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Message deleted");
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="gmfci-admin-table-wrap">
      <div className="gmfci-admin-table-header">
        <h3>Contact Messages</h3>
      </div>

      {loading ? (
        <div style={{ padding: 24, color: "#6b7280" }}>Loading...</div>
      ) : messages.length === 0 ? (
        <div style={{ padding: 24, color: "#6b7280" }}>No messages yet.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="gmfci-admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject || "—"}</td>
                  <td
                    style={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {msg.message}
                  </td>
                  <td>
                    <button
                      className="gmfci-admin-action-btn delete"
                      onClick={() => handleDelete(msg.id)}
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
