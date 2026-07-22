import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us – Global Mission for Christ International",
  description: "Get in touch with Global Mission for Christ International. Send us a message, prayer request, or inquiry. We would love to hear from you.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Connect With Us"
        title="Get in Touch"
        subtitle="We would love to hear from you. Send us a message, a prayer request, or an inquiry."
      />

      <section className="gmfci-contact-wrap">
        <ContactForm />
      </section>
    </main>
  );
}
