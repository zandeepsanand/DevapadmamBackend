"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Utensils, Compass, Sun, ShieldCheck, Heart } from "lucide-react";

interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  icon: any;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "devapadmam6bhk",
    title: "Devapadmam Heritage Stay 6BHK",
    subtitle: "Premium Heritage Experience",
    description:
      "Experience the grandeur of our expansive 6BHK heritage stay. Featuring beautifully designed interiors, spacious living areas, and a perfect blend of modern luxury with traditional Kerala aesthetics, ideal for large families and group gatherings.",
    image: "/images/devapadmam6bhk/dev2.jpeg",
    highlights: ["Spacious 6 Bedrooms", "Traditional Architecture", "Perfect for Large Groups"],
    icon: Compass,
  },
  {
    id: "devapadmam3bhk",
    title: "Devapadmam Heritage Stay 3BHK",
    subtitle: "Private First-Floor Sanctuary",
    description:
      "Enjoy the exclusive first floor of Devapadmam Heritage Stay as a private 3 BHK retreat. Featuring 3 spacious air-conditioned heritage bedrooms, private balcony views of the tropical gardens, traditional timber architecture, and seamless modern comforts.",
    image: "/images/devapadmam6bhk/dev28.jpeg",
    highlights: ["First-Floor Private Sanctuary", "Teakwood & Balcony Views", "Accommodates up to 10 Guests"],
    icon: Sun,
  },
  {
    id: "minnaram2bhk",
    title: "Devapadmam Minnaaram",
    subtitle: "Serene Heritage Cottage",
    description:
      "An intimate, serene retreat featuring classical Kerala woodwork and warm ambiance. Ideal for couples, small families, or digital nomads seeking peace, Devapadmam Minnaaram blends historic charm with plush modern comforts and high-speed internet.",
    image: "/images/minnaram2bhk/minnaram2.jpeg",
    highlights: ["Charming Wooden Patio", "Self Check-in Digital Access", "Dedicated Remote Work Desk"],
    icon: Heart,
  },
  {
    id: "naarayaneeyam2bhk",
    title: "Devapadmam Naarayaneeyam",
    subtitle: "Luxury 2BHK near Lulu Mall",
    description:
      "Luxury finished 2BHK in a prime Thiruvananthapuram location. Just 500m away from Lulu Mall, featuring modern amenities, high-speed Wi-Fi, a fully equipped modern kitchen, and convenient main roadside access.",
    image: "/images/naarayaneeyam2bhk/narayaneeyam02.avif",
    highlights: ["500m to Lulu Mall", "Modern Kitchen & Amenities", "Prime Location Access"],
    icon: ShieldCheck,
  },
];

export function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState<string>("architecture");
  const current = EXPERIENCES.find((e) => e.id === activeTab) || EXPERIENCES[0];

  return (
    <section className="py-24 bg-card border-y border-border/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow-top opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Heritage Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            The Devapadmam Sanctuary Standard
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
            More than just a luxurious vacation rental — immersion into authentic royal Kerala living, bespoke dining, and peaceful nature.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {EXPERIENCES.map((exp) => {
            const Icon = exp.icon;
            const isActive = exp.id === activeTab;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "gold-gradient-bg text-white shadow-gold scale-105"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{exp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-background rounded-3xl p-6 sm:p-10 border border-border/80 shadow-luxury"
          >
            {/* Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 w-fit">
                {current.subtitle}
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  {current.subtitle}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                  {current.title}
                </h3>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
                {current.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                {current.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-foreground">
                    <div className="w-5 h-5 rounded-full gold-gradient-bg flex items-center justify-center text-white text-[10px] shrink-0">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
