import Gallery from "@/components/home/Gallery";
import PageHero from "@/components/shared/PageHero";

export const metadata = {
  title: "Missions Gallery - Global Mission for Christ",
  description: "Explore the impact of our missions, conferences, and outreaches around the world through our interactive gallery.",
};

export default function GalleryPage() {
  return (
    <main>
      <PageHero 
        eyebrow="Visual Journey"
        title="Our Missions Gallery"
        subtitle="Witness the transformative power of God across our various outreaches, medical camps, and revival meetings."
      />
      
      <div style={{ padding: "60px 0", background: "#f9fafb" }}>
        <Gallery />
      </div>
    </main>
  );
}
