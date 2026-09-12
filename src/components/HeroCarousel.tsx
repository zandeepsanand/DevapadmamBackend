"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { LUXURY_VILLAS, VillaData } from "@/lib/villasData";

interface HeroCarouselProps {
  villas?: any[];
}

export function HeroCarousel({ villas }: HeroCarouselProps) {
  // Use curated LUXURY_VILLAS catalog for reliable high-res slides
  const items: VillaData[] = LUXURY_VILLAS;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [items.length]);

  const activeItem = items[currentIndex];

  return (
    <div className="relative w-full h-[75vh] min-h-[550px] max-h-[800px] overflow-hidden bg-black text-white">
      {/* Background Image Carousel with Ken Burns Effect */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={activeItem.featuredImage}
            alt={activeItem.name}
            fill
            className="object-cover object-center brightness-90"
            priority
            sizes="100vw"
          />
          {/* Dual Overlay Gradients for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-12 pb-10 z-20">
        
        {/* Top Tagline Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Exquisite Kerala Vacation Rentals</span>
          </div>
        </div>

        {/* Main Headline & Active Property Summary */}
        <div className="max-w-2xl space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <span>{activeItem.tagline}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-300 stroke-amber-300" /> {activeItem.rating} ({activeItem.reviewsCount} Reviews)</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-lg">
                {activeItem.name}
              </h1>

              <p className="text-white/80 text-sm sm:text-base font-light line-clamp-2 max-w-xl leading-relaxed">
                {activeItem.description}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/villas/${activeItem.id}`}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full gold-gradient-bg text-white font-semibold text-sm tracking-wide shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-300"
                >
                  <span>Explore Property</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="px-5 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium text-sm">
                  Starting at <span className="font-bold text-amber-300 text-base">₹{activeItem.pricePerNight.toLocaleString("en-IN")}</span> / night
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Switcher Bar (Shows 3 Properties) */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Property Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {items.map((villa, idx) => (
              <button
                key={villa.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-300 shrink-0 ${
                  idx === currentIndex
                    ? "bg-white/25 backdrop-blur-md border border-amber-400/50 text-white shadow-lg"
                    : "bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 hover:bg-white/10"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-amber-400" style={{ opacity: idx === currentIndex ? 1 : 0.4 }} />
                <div>
                  <div className="text-xs font-semibold text-white leading-tight">{villa.name}</div>
                  <div className="text-[10px] text-amber-200/80">₹{villa.pricePerNight.toLocaleString("en-IN")}/night</div>
                </div>
              </button>
            ))}
          </div>

          {/* Trust Highlights */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-white/70 font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-amber-300" /> Direct Booking Guarantee</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-amber-300" /> Live Airbnb iCal Sync</span>
          </div>

        </div>

      </div>
    </div>
  );
}
