"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VillaCard } from "@/components/VillaCard";
import { VillaData } from "@/lib/villasData";
import { useSearchFilter } from "@/context/SearchFilterContext";
import { Sparkles, Users, Filter, CheckCircle2 } from "lucide-react";

interface VillaCardsCatalogProps {
  initialVillas: VillaData[];
}

export function VillaCardsCatalog({ initialVillas }: VillaCardsCatalogProps) {
  const { guests, animationTriggerCount } = useSearchFilter();
  const sectionRef = useRef<HTMLElement>(null);

  // Dynamic guest capacity filtering rules as specified by the user:
  // 1. If guests > 4: automatically remove Naarayaneeyam (max 4).
  // 2. If guests >= 6: automatically remove Devapadmam Minnaaram (2 BHK, max 5), showing ONLY Devapadmam 3 BHK and 6 BHK.
  // 3. If guests > 10: show only Devapadmam 6 BHK (max 16).
  const filteredVillas = initialVillas.filter((villa) => {
    const isNaarayaneeyam = villa.id === "3" || villa.name.toLowerCase().includes("naarayaneeyam");
    const isMinnaaram = villa.id === "2" || villa.name.toLowerCase().includes("minnaaram");
    const is3BHK = villa.id === "4" || villa.name.toLowerCase().includes("3 bhk");
    const is6BHK = villa.id === "1" || villa.name.toLowerCase().includes("6 bhk");

    if (isNaarayaneeyam) {
      return guests <= 4;
    }
    if (isMinnaaram) {
      return guests <= 5;
    }
    if (is3BHK) {
      return guests <= 10;
    }
    if (is6BHK) {
      return guests <= 16;
    }
    return villa.maxGuests >= guests;
  });

  return (
    <section 
      id="villas" 
      ref={sectionRef} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 scroll-mt-10"
    >
      {/* Header with Dynamic Filter Status Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/80 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Airbnb-Inspired Heritage Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Curated Royal Stays. Unmatched Luxury.
          </h2>
        </div>

        {/* Dynamic Live Capacity Status Indicator */}
        <div className="flex flex-col sm:items-end gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-sm text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            <Users className="w-4 h-4 text-amber-500" />
            <span>
              <strong>{guests}</strong> {guests === 1 ? "Guest" : "Guests"} Selected
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {filteredVillas.length} {filteredVillas.length === 1 ? "Stay" : "Stays"} Available
            </span>
          </div>

          <p className="text-xs text-muted-foreground text-left sm:text-right max-w-sm">
            {guests <= 4 && "Showing all 4 Heritage Stays in Trivandrum."}
            {guests === 5 && "Naarayaneeyam automatically removed (max 4 capacity)."}
            {guests >= 6 && guests <= 10 && "Showing only 3 BHK and 6 BHK (2 BHKs removed for 6+ guests)."}
            {guests > 10 && "Showing 6 BHK Grand Estate (accommodates up to 16 guests)."}
          </p>
        </div>
      </div>

      {/* Villa Cards Grid with Framer Motion AnimatePresence & Spring Layout Animations */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredVillas.map((villa) => (
            <motion.div
              key={villa.id}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                y: -25, 
                transition: { duration: 0.28, ease: "easeOut" } 
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
                layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              className="w-full"
            >
              <VillaCard
                id={villa.id}
                title={villa.name}
                tagline={villa.tagline}
                location={villa.location}
                pricePerNight={villa.pricePerNight}
                rating={villa.rating}
                imageUrl={villa.featuredImage}
                galleryImages={villa.galleryImages}
                maxGuests={villa.maxGuests}
                bedrooms={villa.bedrooms}
                baths={villa.baths}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}
