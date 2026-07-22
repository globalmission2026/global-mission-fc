import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Sermons & Messages – Global Mission for Christ International",
  description: "Watch our latest sermons, worship sessions, and ministry updates on the Global Mission for Christ International YouTube channel.",
};

export default function SermonsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Online Ministry"
        title="Sermons & Messages"
        subtitle="Watch our latest sermons, worship sessions, and ministry updates."
        btn1Text="Watch on YouTube"
        btn1Url="https://www.youtube.com/@GlobalMissionfc"
      />

      <div className="gmfci-videos-container">
        <div className="gmfci-videos-hub">
          <div className="gmfci-yt-tag">Online Ministry</div>
          <div className="gmfci-yt-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </div>
          <h2>Experience Global Mission Online</h2>
          <p>
            Join our online community and watch our latest sermons, worship sessions,
            and ministry updates directly on our official YouTube channel.
          </p>
          <a
            href="https://www.youtube.com/@GlobalMissionfc"
            target="_blank"
            rel="noopener noreferrer"
            className="gmfci-btn-yt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch on YouTube
          </a>
        </div>
      </div>
    </main>
  );
}
