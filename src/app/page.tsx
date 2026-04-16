import { VillaCard, VillaCardProps } from "@/components/VillaCard";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";

export default async function Home() {
  let sampleVillas: VillaCardProps[] = [];
  try {
    const res = await fetch("http://127.0.0.1:8000/api/villas/", {
      cache: "no-store", // Bypass cache to mirror active backend
    });
    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }
    const data = await res.json();
    sampleVillas = data.map((item: any) => ({
      id: item.id.toString(),
      title: item.name,
      location: "Thiruvananthapuram, Kerala",
      pricePerNight: parseFloat(item.price_per_night),
      rating: 4.96,
      imageUrl: item.featured_image || "https://placehold.co/1920x1080/1a1a1a/e5e5e5/png?text=Devapadmam+Villa",
    }));
  } catch (err) {
    console.error("Failed to fetch from backend", err);
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel villas={sampleVillas} />

      {/* Main Content */}
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {sampleVillas.map((villa) => (
            <VillaCard key={villa.id} {...villa} />
          ))}
        </div>
      </div>
    </main>
  );
}
