
import { VillaCardsCatalog } from "@/components/VillaCardsCatalog";
import { HeroCarousel } from "@/components/HeroCarousel";
import { OfferShowcaseSection } from "@/components/OfferShowcaseSection";
import { CategoryFilterBar } from "@/components/CategoryFilterBar";
import { PropertyCalendarSection } from "@/components/PropertyCalendarSection";
import { ExperienceTabs } from "@/components/ExperienceTabs";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { AirbnbOfferModal } from "@/components/AirbnbOfferModal";
import { LocationContactSection } from "@/components/LocationContactSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Footer";
import { LUXURY_VILLAS, VillaData } from "@/lib/villasData";
import { Sparkles, ShieldCheck, Award, MapPin, Star, Calendar, RefreshCw, PhoneCall } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const dynamic = "force-dynamic";

export default async function Home() {
  let displayVillas: VillaData[] = [...LUXURY_VILLAS];

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${backendUrl}/api/villas/`, {
      cache: "no-store",
    });

    if (res.ok) {
      const backendData = await res.json();
      if (Array.isArray(backendData) && backendData.length > 0) {
        // Merge backend data with luxury fallback fields
        displayVillas = backendData.map((item: any, idx: number) => {
          const fallback = LUXURY_VILLAS.find((v) => v.id === String(item.id)) || LUXURY_VILLAS[idx] || LUXURY_VILLAS[0];
          return {
            id: item.id ? item.id.toString() : fallback.id,
            name: item.name || fallback.name,
            tagline: fallback.tagline,
            location: "Thiruvananthapuram, Kerala",
            pricePerNight: item.price_per_night ? parseFloat(item.price_per_night) : fallback.pricePerNight,
            rating: fallback.rating,
            reviewsCount: fallback.reviewsCount,
            maxGuests: item.max_guests || fallback.maxGuests,
            bedrooms: fallback.bedrooms,
            beds: fallback.beds,
            baths: fallback.baths,
            description: item.description || fallback.description,
            featuredImage: item.featured_image || fallback.featuredImage,
            galleryImages: fallback.galleryImages,
            icalUrl: item.ical_url || fallback.icalUrl,
            highlights: fallback.highlights,
            amenities: fallback.amenities,
          };
        });

        // Ensure 6 BHK (ID 1) and 3 BHK (ID 4) are displayed first side-by-side
        const idOrder = ["1", "4", "2", "3"];
        displayVillas.sort((a, b) => {
          const idxA = idOrder.indexOf(a.id);
          const idxB = idOrder.indexOf(b.id);
          return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
        });
      }
    }
  } catch (err) {
    console.log("Backend offline or unreachable, using luxury fallback catalog", err);
  }

  return (
      <div className="min-h-screen flex flex-col bg-background font-sans">
        <Navbar/>
        {/* 1. Airbnb Pop-up Discount Modal (3D House Header + Price Difference) */}
        <AirbnbOfferModal />

        {/* 2. Unified Fixed Background Wrapper for Hero & Cards */}
        <div 
          className="relative w-full bg-[#fbfaf8] dark:bg-zinc-950 border-b border-zinc-200/60 dark:border-zinc-800/60"
        >
          {/* Fixed Parallax Background */}
          <div 
            className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center opacity-[0.85] dark:opacity-30 mix-blend-multiply dark:mix-blend-screen bg-scroll sm:bg-fixed"
            style={{ 
              backgroundImage: "url('/images/hero-dappled-bg.jpg')"
            }}
          />
          {/* Wash Gradient */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#fbfaf8]/40 via-transparent to-[#fbfaf8]/80 dark:from-zinc-950/60 dark:via-zinc-950/40 dark:to-zinc-950/90 pointer-events-none" />
          
          {/* Content Layer */}
          <div className="relative z-10">
            <OfferShowcaseSection />
            <VillaCardsCatalog initialVillas={displayVillas} />
          </div>
        </div>
        
        <main className="flex-1 space-y-12">
          
          {/* Dynamic Animated Properties Catalog with Real-time Capacity Filtering */}
          
  <HeroCarousel villas={displayVillas} />
          {/* Curated Heritage Experiences Section */}
          <ExperienceTabs />

          {/* Live Airbnb Availability Calendar Section */}
          <PropertyCalendarSection />

          {/* Verified Guest Reviews Carousel */}
          <ReviewsCarousel />

          {/* Location, Google Map & WhatsApp Contact Section */}
          <LocationContactSection />

        </main>
        {/* 3. Hero Carousel */}
      

        {/* 4. Airbnb-Style Category Filter Bar */}
        <CategoryFilterBar />

        {/* 5. Main Content Container */}
    

        {/* Floating WhatsApp Quick-Action Button */}
        <WhatsAppFloat />

        <Footer />
      </div>
  );
}
