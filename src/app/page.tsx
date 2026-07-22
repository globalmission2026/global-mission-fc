import Hero from "@/components/home/Hero";
import EventBanner from "@/components/home/EventBanner";
import EventHighlights from "@/components/home/EventHighlights";

export default function Home() {
  return (
    <main>
      <EventBanner />
      <Hero />
      <EventHighlights />
    </main>
  );
}
