"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CONTACT, SOCIAL } from "@/lib/config";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="gmfci-form-group">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", hp: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.length > 200) { setStatus("error"); return; }
    if (form.email.length > 200)  { setStatus("error"); return; }
    if (form.subject.length > 300) { setStatus("error"); return; }
    if (form.message.length > 5000) { setStatus("error"); return; }
    if (form.hp) { setStatus("success"); return; }
    setStatus("submitting");
    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([{
          name:    form.name,
          email:   form.email,
          subject: form.subject,
          message: form.message,
        }]);
      if (error) throw error;
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", hp: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="gmfci-contact-inner">
      {/* ── Left: Info Cards ── */}
      <div>
        <h2 className="gmfci-contact-heading">Reach Out to Us</h2>
        <p className="gmfci-contact-intro">
          Whether you have a question, prayer request, or want to partner with our mission —
          we are here for you.
        </p>

        <div className="gmfci-contact-cards">
          <div className="gmfci-contact-card">
            <div className="gmfci-contact-card-icon phone" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h4>Phone</h4>
              <p>
                <a href={`tel:${CONTACT.phones[0].replace(/\s+/g, '')}`}>{CONTACT.phones[0]}</a><br />
                <a href={`tel:${CONTACT.phones[1].replace(/\s+/g, '')}`}>{CONTACT.phones[1]}</a><br />
                <a href={`tel:${CONTACT.phones[2].replace(/\s+/g, '')}`}>{CONTACT.phones[2]}</a>
              </p>
            </div>
          </div>

          <div className="gmfci-contact-card">
            <div className="gmfci-contact-card-icon email" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <h4>Email</h4>
              <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            </div>
          </div>

          <div className="gmfci-contact-card">
            <div className="gmfci-contact-card-icon address" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <h4>Postal Address</h4>
              <p>{CONTACT.poBox}<br />Global Mission for Christ International</p>
            </div>
          </div>

          <div className="gmfci-contact-card">
            <div className="gmfci-contact-card-icon social" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </div>
            <div>
              <h4>Follow Us</h4>
              <div className="gmfci-contact-social">
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="fb" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href={`https://www.youtube.com/${SOCIAL.youtube}`} target="_blank" rel="noopener noreferrer" className="yt" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="ig" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href={`https://wa.me/${SOCIAL.whatsapp}`} target="_blank" rel="noopener noreferrer" className="wa" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="gmfci-form-wrap">
        <h3>Send Us a Message</h3>
        <p className="form-subtitle">We typically respond within 24–48 hours.</p>

        {status === "success" && (
          <div className="gmfci-form-message success">
            ✓ Thank you! Your message has been sent. We will get back to you soon.
          </div>
        )}
        {status === "error" && (
          <div className="gmfci-form-message error">
            Something went wrong. Please try again or email us directly.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="gmfci-form-row">
            <Field id="contact-name" label="Full Name">
              <input
                id="contact-name"
                type="text"
                required
                maxLength={200}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Rev. John Doe"
              />
            </Field>
            <Field id="contact-email" label="Email Address">
              <input
                id="contact-email"
                type="email"
                required
                maxLength={200}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </Field>
          </div>
          <Field id="contact-subject" label="Subject">
            <input
              id="contact-subject"
              type="text"
              maxLength={300}
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              placeholder="Prayer request / Partnership / General inquiry"
            />
          </Field>
          <Field id="contact-message" label="Your Message">
            <textarea
              id="contact-message"
              required
              maxLength={5000}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Write your message here..."
            />
          </Field>

          <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.hp}
              onChange={e => setForm({ ...form, hp: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="gmfci-form-submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send Message →"}
          </button>
        </form>
      </div>
    </div>
  );
}
