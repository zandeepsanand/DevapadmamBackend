import Image from "next/image";
import Link from "next/link";
import { Star, Users, MapPin, ChevronLeft, Wifi, Car, Tv, Wind, Coffee, Key, Medal, CalendarCheck, Home, Sparkles, Utensils, Sun, Shirt, Waves } from "lucide-react";
import { eachDayOfInterval, subDays } from "date-fns";
import { BookingWidget } from "@/components/BookingWidget";
import { VillaGallerySection } from "@/components/VillaGallerySection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getVillaById, LUXURY_VILLAS } from "@/lib/villasData";

export const dynamic = "force-dynamic";

// Server-side iCal Parser
async function fetchBookedDates(icalUrl: string): Promise<string[]> {
  try {
    const res = await fetch(icalUrl, { cache: "no-store" });
    if (!res.ok) return [];
    const text = await res.text();
    
    const events = text.split("BEGIN:VEVENT");
    const bookedDates: string[] = [];

    for (let i = 1; i < events.length; i++) {
      const ev = events[i];
      const startMatch = ev.match(/DTSTART(?:;.*?)?:(\d{8})/);
      const endMatch = ev.match(/DTEND(?:;.*?)?:(\d{8})/);
      
      if (startMatch && endMatch) {
        const startDate = new Date(`${startMatch[1].slice(0,4)}-${startMatch[1].slice(4,6)}-${startMatch[1].slice(6,8)}T00:00:00`);
        const endDate = new Date(`${endMatch[1].slice(0,4)}-${endMatch[1].slice(4,6)}-${endMatch[1].slice(6,8)}T00:00:00`);
        
        const bookingEnd = subDays(endDate, 1);
        if (startDate <= bookingEnd) {
          const intervalDates = eachDayOfInterval({
            start: startDate,
            end: bookingEnd
          });
          bookedDates.push(...intervalDates.map(d => {
            return d.getFullYear() + "-" + 
                   String(d.getMonth() + 1).padStart(2, '0') + "-" + 
                   String(d.getDate()).padStart(2, '0') + "T00:00:00";
          }));
        }
      }
    }
    return bookedDates;
  } catch (error) {
    console.error("Failed to parse iCal for url", icalUrl, error);
    return [];
  }
}

export default async function VillaDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ bhk?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialBhk = resolvedSearchParams.bhk ? parseInt(resolvedSearchParams.bhk, 10) : undefined;
  
  let villa: any = getVillaById(id) || LUXURY_VILLAS[0];
  let bookedDateStrings: string[] = [];

  // Try fetching dynamic backend data if available
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${backendUrl}/api/villas/${id}/`, {
      cache: "no-store",
    });
    if (res.ok) {
      const backendVilla = await res.json();
      const fallback = getVillaById(id) || LUXURY_VILLAS[0];
      villa = {
        id: backendVilla.id ? backendVilla.id.toString() : fallback.id,
        name: backendVilla.name || fallback.name,
        tagline: fallback.tagline,
        location: "Thiruvananthapuram, Kerala",
        pricePerNight: backendVilla.price_per_night ? parseFloat(backendVilla.price_per_night) : fallback.pricePerNight,
        rating: fallback.rating,
        reviewsCount: fallback.reviewsCount,
        maxGuests: backendVilla.max_guests || fallback.maxGuests,
        bedrooms: fallback.bedrooms,
        beds: fallback.beds,
        baths: fallback.baths,
        description: backendVilla.description || fallback.description,
        featuredImage: backendVilla.featured_image || fallback.featuredImage,
        galleryImages: [
          backendVilla.featured_image || fallback.galleryImages[0],
          ...fallback.galleryImages.slice(1)
        ],
        icalUrl: backendVilla.ical_url || fallback.icalUrl,
        highlights: fallback.highlights,
        amenities: fallback.amenities,
        bhkTiers: fallback.bhkTiers,
      };
    }
  } catch (error) {
    console.log("Backend detail fetch fallback to local villa catalog");
  }

  if (villa.icalUrl) {
    bookedDateStrings = await fetchBookedDates(villa.icalUrl);
  }

  const gallery: string[] = villa.galleryImages && villa.galleryImages.length >= 5
    ? villa.galleryImages
    : LUXURY_VILLAS[0].galleryImages;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-20 w-full space-y-8">
        
        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link
            href="/#villas"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to All Stays
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{villa.tagline || "Luxury Kerala Vacation Rental"}</span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {villa.name}
              </h1>

              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pt-1">
                <span className="flex items-center gap-1 text-foreground font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {villa.rating || 4.96} ({villa.reviewsCount || 32} Reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold" /> {villa.location}
                </span>
              </div>
            </div>

            <div className="text-right hidden md:block">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Starting from</div>
              <div className="font-serif text-3xl font-bold text-foreground">₹{villa.pricePerNight.toLocaleString('en-IN')} <span className="text-xs font-sans text-muted-foreground font-normal">/ night</span></div>
            </div>
          </div>
        </div>

        {/* 5-Photo Bento Gallery Grid with Show All Photos Button & Full-Screen Modal */}
        <VillaGallerySection gallery={gallery} title={villa.name} />

        {/* Content Section: Specs, Story, Amenities & Booking Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-start">
          
          {/* Left Column (Details & Story) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Host Banner & Specs */}
            <div className="pb-8 border-b border-border/80 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Hosted by Devapadmam Heritage Stay
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-medium pt-1">
                  <span>Up to {villa.maxGuests} Guests</span>
                  <span>•</span>
                  <span>{villa.bedrooms} Bedrooms</span>
                  <span>•</span>
                  <span>{villa.beds} Beds</span>
                  <span>•</span>
                  <span>{villa.baths} Baths</span>
                </div>
              </div>
              
              <div className="w-14 h-14 rounded-full gold-gradient-bg flex items-center justify-center text-white font-serif font-bold text-xl shadow-md shrink-0">
                D
              </div>
            </div>

            {/* Highlights */}
            <div className="pb-8 border-b border-border/80 space-y-6">
              <div className="flex items-start gap-4">
                <Key className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-foreground">Seamless Check-In Experience</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Smart keyless access and personal greeting by our concierge team upon arrival.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Medal className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-foreground">Verified Heritage Superhost</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Consistently top-rated host offering extraordinary Kerala hospitality and cultural stays.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CalendarCheck className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-foreground">Free Cancellation up to 48 Hours</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Flexible travel plans with 100% full refund guarantee prior to check-in.</p>
                </div>
              </div>
            </div>

            {/* Property Story Description */}
            <div className="pb-8 border-b border-border/80 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">About this stay</h2>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line font-light">
                {villa.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">What this property offers</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border/60 flex items-center gap-3 text-sm font-medium text-foreground">
                  <Wifi className="w-5 h-5 text-gold shrink-0" />
                  <span>High-Speed Wi-Fi (300 Mbps)</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 flex items-center gap-3 text-sm font-medium text-foreground">
                  <Wind className="w-5 h-5 text-gold shrink-0" />
                  <span>Climate Controlled Air Conditioning</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 flex items-center gap-3 text-sm font-medium text-foreground">
                  <Car className="w-5 h-5 text-gold shrink-0" />
                  <span>Free Private On-Site Parking</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 flex items-center gap-3 text-sm font-medium text-foreground">
                  <Coffee className="w-5 h-5 text-gold shrink-0" />
                  <span>Gourmet Breakfast & Espresso Bar</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 flex items-center gap-3 text-sm font-medium text-foreground">
                  <Tv className="w-5 h-5 text-gold shrink-0" />
                  <span>55" 4K Smart TV with Streaming</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 flex items-center gap-3 text-sm font-medium text-foreground">
                  <Sparkles className="w-5 h-5 text-gold shrink-0" />
                  <span>Heritage Lotus Pond & Gardens</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sticky Booking Widget) */}
          <div className="lg:col-span-4">
            <BookingWidget
              pricePerNight={villa.pricePerNight}
              bookedDateStrings={bookedDateStrings}
              villaName={villa.name}
              bhkTiers={villa.bhkTiers}
              initialBhk={initialBhk}
            />
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
