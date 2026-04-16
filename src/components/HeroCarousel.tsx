"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselItem {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
}

interface HeroCarouselProps {
  villas: CarouselItem[];
}

const fallbacks: CarouselItem[] = [
  {
    id: "fallback-1",
    title: "The Heritage Suite",
    location: "Thiruvananthapuram, Kerala",
    imageUrl: "https://placehold.co/1920x1080/1a1a1a/e5e5e5/png?text=The+Heritage+Suite",
  },
  {
    id: "fallback-2",
    title: "Serene Villa Retreat",
    location: "Thiruvananthapuram, Kerala",
    imageUrl: "https://placehold.co/1920x1080/2a2a2a/f5f5f5/png?text=Serene+Villa+Retreat",
  }
];

export function HeroCarousel({ villas }: HeroCarouselProps) {
  // Use provided villas if enough are available, otherwise use fallbacks.
  const items = villas && villas.length > 0 ? (villas.length >= 2 ? villas.slice(0, 2) : [...villas, fallbacks[1]]) : fallbacks;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-full h-[35vh] min-h-[300px] max-h-[500px] overflow-hidden bg-background">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={items[currentIndex].imageUrl}
            alt={items[currentIndex].title}
            fill
            className="object-cover"
            priority
          />
          {/* Subtle gradient overlay for luxury feel and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end items-center text-center z-10 pb-12 px-4">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="space-y-3"
          >
            <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight drop-shadow-md">
              {items[currentIndex].title}
            </h1>
            <p className="text-white/90 text-sm md:text-base font-medium max-w-md mx-auto drop-shadow-md">
              {items[currentIndex].location}
            </p>
            <div className="pt-4">
              <Link 
                href={items[currentIndex].id.startsWith("fallback") ? "/" : `/villas/${items[currentIndex].id}`}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
