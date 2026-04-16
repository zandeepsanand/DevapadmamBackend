import Image from "next/image";
import Link from "next/link";
import { Star, Users, MapPin, ChevronLeft, Wifi, Car, Tv, Wind, Coffee, Key, Medal, CalendarCheck, Home } from "lucide-react";
import { eachDayOfInterval, subDays } from "date-fns";
import { BookingWidget } from "@/components/BookingWidget";

// Native fetch parser
async function fetchBookedDates(icalUrl: string): Promise<string[]> {
  try {
    // Bypass cache to reflect live Airbnb/iCal blocks instantly
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
                 // Format as strict local string avoiding UTC shift
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
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let villa: any = null;
  let bookedDateStrings: string[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/villas/${id}/`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed");
    villa = await res.json();
    
    if (villa.ical_url) {
        bookedDateStrings = await fetchBookedDates(villa.ical_url);
    }
  } catch (error) {
    console.error("Villa details error", error);
  }

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Villa not found</h2>
          <Link href="/" className="text-primary underline">Return home</Link>
        </div>
      </div>
    );
  }

  // Placeholder images for the bento grid since the backend only sends 1 featured_image
  const galleryImages = [
    villa.featured_image || "https://placehold.co/1920x1080/1a1a1a/e5e5e5/png?text=Devapadmam+Villa",
    "https://placehold.co/1920x1080/1a1a1a/e5e5e5/png?text=Villa+Gallery+1",
    "https://placehold.co/1920x1080/2a2a2a/f5f5f5/png?text=Villa+Gallery+2",
    "https://placehold.co/1920x1080/3a3a3a/e5e5e5/png?text=Villa+Gallery+3",
    "https://placehold.co/1920x1080/4a4a4a/f5f5f5/png?text=Villa+Gallery+4"
  ];

  const price = parseFloat(villa.price_per_night);

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border h-20 flex items-center px-6 md:px-10 justify-between">
        <Link href="/" className="font-bold text-primary text-xl tracking-tight">devapadmam</Link>
        <div className="flex items-center gap-2 border border-border rounded-full p-1 pl-3 hover:shadow-md transition-shadow cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 selected 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
      </header>

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 md:px-10 pt-8">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
            {villa.name}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground text-[15px] underline font-medium">
            <span className="flex items-center gap-1.5 no-underline"><Star className="w-4 h-4 fill-foreground stroke-foreground" />4.96</span>
            <span>Thiruvananthapuram, Kerala, India</span>
          </div>
        </div>

        {/* 5-Image Bento Grid Gallery */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[400px] lg:h-[500px] xl:h-[550px] rounded-2xl overflow-hidden mb-12">
          <div className="col-span-2 row-span-2 relative group cursor-pointer">
             <Image src={galleryImages[0]} alt="Featured" fill className="object-cover group-hover:brightness-90 transition" />
          </div>
          <div className="relative group cursor-pointer">
             <Image src={galleryImages[1]} alt="Gallery 1" fill className="object-cover group-hover:brightness-90 transition" />
          </div>
          <div className="relative group cursor-pointer" style={{ borderTopRightRadius: '1rem' }}>
             <Image src={galleryImages[2]} alt="Gallery 2" fill className="object-cover group-hover:brightness-90 transition" />
          </div>
          <div className="relative group cursor-pointer">
             <Image src={galleryImages[3]} alt="Gallery 3" fill className="object-cover group-hover:brightness-90 transition" />
          </div>
          <div className="relative group cursor-pointer" style={{ borderBottomRightRadius: '1rem' }}>
             <Image src={galleryImages[4]} alt="Gallery 4" fill className="object-cover group-hover:brightness-90 transition" />
          </div>
        </div>
        
        {/* Mobile Single Image */}
        <div className="md:hidden relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-8">
           <Image src={galleryImages[0]} alt="Featured" fill className="object-cover" />
        </div>

        {/* Info & Booking Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* Left Column (Info) */}
          <div className="flex-1 space-y-8 w-full">
            <div className="pb-6 border-b border-border space-y-2">
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                Entire villa hosted by Devapadmam Heritage
              </h2>
              <div className="flex items-center gap-2 text-foreground text-[16px]">
                <span>{villa.max_guests ? `${villa.max_guests} guests` : 'Private property'}</span>
                <span>·</span>
                <span>4 bedrooms</span>
                <span>·</span>
                <span>4 beds</span>
                <span>·</span>
                <span>4 baths</span>
              </div>
            </div>

            {/* Key Features Block */}
            <div className="pb-6 border-b border-border space-y-6">
               <div className="flex gap-4 items-start">
                  <Key className="w-6 h-6 shrink-0 mt-0.5 text-foreground" />
                  <div>
                     <h3 className="text-[17px] font-semibold text-foreground">Self check-in</h3>
                     <p className="text-muted-foreground text-[15px]">Check yourself in with the lockbox.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <Medal className="w-6 h-6 shrink-0 mt-0.5 text-foreground" />
                  <div>
                     <h3 className="text-[17px] font-semibold text-foreground">Devapadmam is a Superhost</h3>
                     <p className="text-muted-foreground text-[15px]">Superhosts are experienced, highly rated hosts.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <CalendarCheck className="w-6 h-6 shrink-0 mt-0.5 text-foreground" />
                  <div>
                     <h3 className="text-[17px] font-semibold text-foreground">Free cancellation before 48 hours</h3>
                     <p className="text-muted-foreground text-[15px]">Get a full refund if you change your mind.</p>
                  </div>
               </div>
            </div>

            {/* Description */}
            <div className="pb-8 border-b border-border space-y-4 pt-2">
               <p className="text-foreground leading-relaxed text-[16px] whitespace-pre-wrap">
                  {villa.description || "Experience the perfect blend of heritage and luxury in this exclusive stay. Equipped with premium amenities, stunning architecture, and serene surroundings to make your visit truly unforgettable. Located in the heart of Trivandrum, yet comfortably tucked away from the city bustle."}
               </p>
            </div>

            {/* Amenities Category */}
            <div className="pb-8 border-b border-border space-y-6 pt-2">
               <h2 className="text-xl font-semibold text-foreground tracking-tight">What this place offers</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-center gap-4 text-[16px] text-foreground"><Wifi className="w-6 h-6 opacity-80"/> Fast Wifi</div>
                  <div className="flex items-center gap-4 text-[16px] text-foreground"><Car className="w-6 h-6 opacity-80"/> Free parking on premises</div>
                  <div className="flex items-center gap-4 text-[16px] text-foreground"><Wind className="w-6 h-6 opacity-80"/> Air conditioning</div>
                  <div className="flex items-center gap-4 text-[16px] text-foreground"><Tv className="w-6 h-6 opacity-80"/> HD TV with streaming</div>
                  <div className="flex items-center gap-4 text-[16px] text-foreground"><Coffee className="w-6 h-6 opacity-80"/> Fully functional kitchen</div>
                  <div className="flex items-center gap-4 text-[16px] text-foreground"><Home className="w-6 h-6 opacity-80"/> Dedicated workspace</div>
               </div>
               <button className="px-6 py-3 border border-foreground text-foreground rounded-lg font-semibold text-[15px] hover:bg-muted transition">
                 Show all amenities
               </button>
            </div>
          </div>

          {/* Right Column (Widget) */}
          <div className="w-full lg:w-[380px] shrink-0">
             <BookingWidget pricePerNight={price} bookedDateStrings={bookedDateStrings} />
          </div>

        </div>
      </div>
    </main>
  );
}
