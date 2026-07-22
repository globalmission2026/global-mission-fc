import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import VisionMissionCards from "@/components/about/VisionMissionCards";
import CoreValues from "@/components/about/CoreValues";
import DirectorMessage from "@/components/about/DirectorMessage";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import ContactBanner from "@/components/about/ContactBanner";

export const metadata: Metadata = {
  title: "About Us – Global Mission for Christ International",
  description: "Learn about our vision, mission, core values, and leadership team at Global Mission for Christ International. From Kenya to the ends of the earth — Christ for Every Nation.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero 
        eyebrow="Our Story & Purpose"
        title="Global Mission For<br><span>Christ International</span>"
        subtitle="Revive the Nations. Preach the Gospel. Win Souls.<br>From Kenya to the ends of the earth — Christ for Every Nation."
      />

      <div className="gmfci-about-wrap">
        <VisionMissionCards />
        <CoreValues />
        <DirectorMessage />
        <LeadershipTeam />
        <ContactBanner />
      </div>
    </main>
  );
}
