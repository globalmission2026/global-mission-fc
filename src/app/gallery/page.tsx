import Gallery from "@/components/home/Gallery";

export const metadata = {
  title: "Missions Gallery - Global Mission for Christ",
  description: "Explore the impact of our missions, conferences, and outreaches around the world through our interactive gallery.",
};

export default function GalleryPage() {
  return (
    <main className="bg-gray-900 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Our Missions Gallery
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Witness the transformative power of God across our various outreaches, medical camps, and revival meetings.
          </p>
        </div>
        
        {/* We reuse the Swiper gallery component here */}
        <Gallery />
      </div>
    </main>
  );
}
