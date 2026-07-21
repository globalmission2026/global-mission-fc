"use client";

import { useState } from "react";
import PageHero from "@/components/shared/PageHero";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <main>
      <PageHero
        eyebrow="Connect With Us"
        title="Get in Touch"
        subtitle="We would love to hear from you. Send us a message, a prayer request, or an inquiry."
      />

      <section className="gmfci-contact-wrap">
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
                <div className="gmfci-contact-card-icon phone">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>
                    <a href="tel:+15127856994">+1 (512) 785 6994</a><br />
                    <a href="tel:+254715493666">+254 715 493 666</a><br />
                    <a href="tel:+254710642232">+254 710 642 232</a>
                  </p>
                </div>
              </div>

              <div className="gmfci-contact-card">
                <div className="gmfci-contact-card-icon email">📧</div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:globalmissionfc@gmail.com">globalmissionfc@gmail.com</a></p>
                </div>
              </div>

              <div className="gmfci-contact-card">
                <div className="gmfci-contact-card-icon address">📮</div>
                <div>
                  <h4>Postal Address</h4>
                  <p>P.O. Box 444 – 10100, Kenya<br />Global Mission for Christ International</p>
                </div>
              </div>

              <div className="gmfci-contact-card">
                <div className="gmfci-contact-card-icon social">🌐</div>
                <div>
                  <h4>Follow Us</h4>
                  <div className="gmfci-contact-social">
                    <a href="https://www.facebook.com/profile.php?id=61591907680791" target="_blank" rel="noopener noreferrer" className="fb" aria-label="Facebook">f</a>
                    <a href="https://www.youtube.com/@GlobalMissionfc" target="_blank" rel="noopener noreferrer" className="yt" aria-label="YouTube">▶</a>
                    <a href="https://www.instagram.com/globalmissionfc/" target="_blank" rel="noopener noreferrer" className="ig" aria-label="Instagram">◎</a>
                    <a href="https://wa.me/254715493666" target="_blank" rel="noopener noreferrer" className="wa" aria-label="WhatsApp">✆</a>
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
                <div className="gmfci-form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Rev. John Doe"
                  />
                </div>
                <div className="gmfci-form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="gmfci-form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="Prayer request / Partnership / General inquiry"
                />
              </div>
              <div className="gmfci-form-group">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here..."
                ></textarea>
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
      </section>
    </main>
  );
}
