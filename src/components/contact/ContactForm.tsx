"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // In a real app with Supabase connected:
      // await supabase.from('contact_messages').insert([formData]);
      
      // Mock network request:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
      <h3 style={{ fontSize: "1.5rem", marginBottom: "24px", color: "#111827" }}>Send us a Message</h3>
      
      {status === "success" && (
        <div style={{ background: "#DEF7EC", color: "#03543F", padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      {status === "error" && (
        <div style={{ background: "#FDE8E8", color: "#9B1C1C", padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
          Something went wrong. Please try again later.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>Your Name</label>
          <input 
            type="text" 
            required 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>Email Address</label>
          <input 
            type="email" 
            required 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none" }}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>Subject</label>
        <input 
          type="text" 
          value={formData.subject}
          onChange={e => setFormData({...formData, subject: e.target.value})}
          style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none" }}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>Message</label>
        <textarea 
          required 
          rows={5}
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none", resize: "vertical" }}
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === "submitting"}
        style={{ background: "#F59E0B", color: "#111827", fontWeight: 700, padding: "14px 28px", border: "none", borderRadius: "50px", cursor: "pointer", transition: "background 0.2s" }}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
