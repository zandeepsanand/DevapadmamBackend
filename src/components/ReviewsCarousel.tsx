"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";

interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  villaStayed: string;
  date: string;
  rating: number;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Dr. Ananya & Vikram Menon",
    location: "Bengaluru, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    villaStayed: "Devapadmam Heritage Stay (6 BHK Grand Mansion)",
    date: "February 2026",
    rating: 5,
    comment:
      "An ethereal heritage retreat! Booking the entire 6 BHK Grand Mansion for our family reunion felt like stepping into royal Kerala. The open-air Naalukettu courtyard during evening rain was magical. The direct booking saved us over ₹4,000 per night compared to Airbnb!",
  },
  {
    id: "4",
    name: "Rajeev & Meera Krishnan",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    villaStayed: "Devapadmam Heritage Stay (3 BHK First Floor)",
    date: "January 2026",
    rating: 5,
    comment:
      "We booked the private first floor 3 BHK for our group of 9 people. Getting three opulent air-conditioned suites with private balcony views for just ₹8,500/night was an unbeatable deal. Spotless cleanliness, traditional teak interiors, and wonderful care.",
  },
  {
    id: "2",
    name: "Marcus & Elena Vance",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    villaStayed: "Devapadmam Minnaaram (The Heritage Cottage)",
    date: "January 2026",
    rating: 5,
    comment:
      "Unbelievable hospitality and white-glove attention to detail. The private saddya lunch served on banana leaves was the highlight of our entire trip to South India. Peaceful, immaculate, and unforgettable.",
  },
  {
    id: "3",
    name: "Siddharth & Priya Nair",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    villaStayed: "Devapadmam Naarayaneeyam (Luxury 2 BHK)",
    date: "December 2025",
    rating: 5,
    comment:
      "Naarayaneeyam was the perfect base for our Trivandrum stay! Only 500 meters from Lulu Mall and a quick drive to Technopark. The first-floor space is so spacious, the balcony view is refreshing, and the Android TV, modern kitchen, and bar equipments made our trip effortless for just ₹3,000/night.",
  },
];

export function ReviewsCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));

  const current = REVIEWS[index];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Subtle gold grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Guest Reflections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Loved by Travelers Worldwide
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-white/20 hover:bg-white/10 text-white transition cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full gold-gradient-bg text-white shadow-md hover:brightness-110 transition cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Review Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative space-y-8">
          <Quote className="w-12 h-12 text-amber-400/30 absolute top-6 right-8" />

          {/* Stars & Stay Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-medium border border-white/15">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Stayed at {current.villaStayed}</span>
            </div>
          </div>

          {/* Review Text */}
          <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-white/95 font-light">
            "{current.comment}"
          </p>

          {/* Author info */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/60 shrink-0">
              <Image
                src={current.avatar}
                alt={current.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-white">{current.name}</div>
              <div className="text-xs text-white/70 font-medium">{current.location} • {current.date}</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
