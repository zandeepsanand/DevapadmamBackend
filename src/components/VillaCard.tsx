"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, Bed, Bath, Heart, ChevronLeft, ChevronRight, Tag, CheckCircle2, Sparkles } from "lucide-react";
import { BhkTier } from "@/lib/villasData";

export interface VillaCardProps {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
  galleryImages?: string[];
  maxGuests?: number;
  bedrooms?: number;
  baths?: number;
  tagline?: string;
  autoPlayInterval?: number;
  bhkTiers?: BhkTier[];
}

const FALLBACK_IMAGES: Record<string, string> = {
  "5": "/images/sreeramam5bhk/sree1.jpeg",
  "sreeramam": "/images/sreeramam5bhk/sree1.jpeg",
  "1": "/images/devapadmam6bhk/dev2.jpeg",
  "4": "/images/devapadmam6bhk/dev28.jpeg",
  "2": "/images/minnaram2bhk/minnaram2.jpeg",
  "3": "/images/naarayaneeyam2bhk/narayaneeyam02.avif",
};

export function VillaCard({
  id,
  title,
  location,
  pricePerNight,
  rating,
  imageUrl,
  galleryImages,
  maxGuests = 6,
  bedrooms = 3,
  baths = 3,
  tagline = "Heritage Vacation Rental",
  autoPlayInterval,
  bhkTiers,
}: VillaCardProps) {
  // Use galleryImages if provided, otherwise use fallback
  const images = (galleryImages && galleryImages.length > 0)
    ? galleryImages
    : [imageUrl || FALLBACK_IMAGES[id] || "/images/sreeramam5bhk/sree1.jpeg"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Active BHK tier state (for properties like Sreeramam with 5, 4, 3, 2 BHK options)
  const [selectedBhk, setSelectedBhk] = useState<number | null>(
    bhkTiers && bhkTiers.length > 0 ? bhkTiers[0].bhk : null
  );

  const currentTier = bhkTiers?.find((t) => t.bhk === selectedBhk);
  const activePrice = currentTier ? currentTier.pricePerNight : pricePerNight;
  const activeBedrooms = currentTier ? currentTier.bedrooms : bedrooms;
  const activeBaths = currentTier ? currentTier.baths : baths;
  const activeMaxGuests = currentTier ? currentTier.maxGuests : maxGuests;

  // Client mount: pick a randomized photo starting point so each visit shows different images
  // and multiple cards never display identical photos at the same time
  useEffect(() => {
    if (images.length > 1) {
      const randomStart = Math.floor(Math.random() * images.length);
      setCurrentIndex(randomStart);
    }
  }, [images.length]);

  // Auto-carousel works ONLY when the card is hovered
  useEffect(() => {
    if (images.length <= 1 || !isHovered) return;

    const intervalMs = autoPlayInterval || 1500; // Faster interval since it only plays on hover

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval, isHovered]);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Compute 15% discount for offer display
  const originalPrice = Math.round(activePrice * 1.18);
  const activeImage = images[currentIndex] || images[0];
  const targetHref = selectedBhk ? `/villas/${id}?bhk=${selectedBhk}` : `/villas/${id}`;

  return (
    <Link
      href={targetHref}
      className="block h-full cursor-pointer group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col skeuo-card overflow-hidden hover:-translate-y-2 transition-all duration-400 h-full"
      >
        {/* Photo Frame Container (Airbnb Style) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-neutral-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0.4, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeImage}
                alt={`${title} - Photo ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = FALLBACK_IMAGES[id] || "/images/devapadmam6bhk/dev2.jpeg";
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Top Dark Gradient */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

          {/* 15% OFF Direct Offer Pill */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full offer-banner-gradient text-white text-[11px] font-bold tracking-wider uppercase shadow-lg border border-white/20">
            <Tag className="w-3 h-3 text-amber-200" />
            <span>Save 15% Direct</span>
          </div>

          {/* Heart Favorite Button (Tactile Skeuomorphic) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 transition-colors ${isLiked ? "fill-amber-500 text-amber-500" : "text-white"}`} />
          </button>

          {/* Manual Carousel Prev/Next Arrows on Hover */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-md shadow-md flex items-center justify-center transition-all duration-300 ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                }`}
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-md shadow-md flex items-center justify-center transition-all duration-300 ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                }`}
                aria-label="Next Photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Carousel Pagination Dots Overlay (Airbnb Style) */}
          {images.length > 1 && (
            <div className="absolute bottom-11 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
              {images.slice(0, 7).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-5 bg-white shadow-sm"
                      : "w-1.5 bg-white/50 backdrop-blur-sm"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Bottom Floating Pill: Guest Rating & Live Sync */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating ? rating.toFixed(2) : "4.96"}</span>
              <span className="text-white/70 font-normal">(48 reviews)</span>
            </span>

            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> iCal Live
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gold">
              {location}
            </div>
            
            <h3 className="font-serif text-xl font-bold text-foreground leading-snug group-hover:text-gold transition-colors">
              {title}
            </h3>
            
            <p className="text-xs text-muted-foreground line-clamp-1">{tagline}</p>
          </div>

          {/* Interactive BHK Tier Switcher */}
          {bhkTiers && bhkTiers.length > 0 && (
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-3 h-3 text-amber-500" /> BHK Option:
                </span>
                <span className="text-foreground font-bold">
                  {currentTier?.label || `${selectedBhk} BHK`} • ₹{activePrice.toLocaleString("en-IN")}/day
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {bhkTiers.map((tier) => {
                  const isSelected = selectedBhk === tier.bhk;
                  return (
                    <button
                      key={tier.bhk}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedBhk(tier.bhk);
                      }}
                      className={`py-1 px-1 rounded-lg text-center transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? "gold-gradient-bg text-white border-amber-500 shadow-sm font-bold scale-[1.03]"
                          : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-amber-400 font-medium hover:bg-zinc-200/70"
                      }`}
                    >
                      <div className="text-[10px] leading-tight font-bold">{tier.label}</div>
                      <div
                        className={`text-[9px] leading-tight mt-0.5 ${
                          isSelected ? "text-amber-100 font-bold" : "text-emerald-600 dark:text-emerald-400 font-semibold"
                        }`}
                      >
                        ₹{(tier.pricePerNight / 1000).toFixed(tier.pricePerNight % 1000 === 0 ? 0 : 1)}k
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Specs Pills (Airbnb style) */}
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground border-y border-border/60 py-2.5">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gold" /> {activeMaxGuests} Guests
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-gold" /> {activeBedrooms} BR
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-gold" /> {activeBaths} Baths
            </span>
          </div>

          {/* Pricing with Offer Strike-through & Skeuomorphic Button */}
          <div className="flex items-center justify-between pt-1 gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                <span className="text-lg font-bold font-serif text-foreground">
                  ₹{activePrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-muted-foreground line-through font-normal whitespace-nowrap">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground whitespace-nowrap">/ night</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-emerald-600 font-bold leading-tight mt-0.5">Includes 15% Direct Discount</div>
            </div>

            <div className="px-3 py-1.5 sm:px-4 sm:py-2 shrink-0 rounded-xl skeuo-button text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md group-hover:scale-105 transition-all whitespace-nowrap">
              Reserve →
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

