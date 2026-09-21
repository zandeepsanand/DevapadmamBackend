"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion, AnimatePresence } from "framer-motion";
import { SearchToolBar } from "@/components/SearchToolBar";
import { 
  ShieldCheck, Search, ArrowRight, Star, 
  CheckCircle2, Sparkles, Check, Copy, Crown, ChevronDown 
} from "lucide-react";

export function OfferShowcaseSection() {
  const [copied, setCopied] = useState(false);
  const [nameIndex, setNameIndex] = useState(0);
  const [emblemIndex, setEmblemIndex] = useState(0);

  const EMBLEM_IMAGES = [
    "/images/123.png",
    "/images/1234.png",
    "/images/12345.png",
    "/images/123456.png",
    "/images/1234567.png"
  ];

  const VILLA_NAMES = [
    "Devapadmam 6bhk",
    "Devapadmam 3bhk",
    "Minnaram 2bhk",
    "Naarayaneeyam 2bhk"
  ];
  const VILLA_PRICES = ["25,000", "8,500", "6,500", "3,500"];

  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % VILLA_NAMES.length);
    }, 4000);
    
    const emblemInterval = setInterval(() => {
      setEmblemIndex((prev) => (prev + 1) % EMBLEM_IMAGES.length);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearInterval(emblemInterval);
    };
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("ROYALHERITAGE");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-full pt-10 sm:pt-14 lg:pt-35 pb-12 sm:pb-16 lg:pb-0">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Top Hero Block */}
        <div className="w-full flex flex-col items-center justify-center pt-2 sm:pt-4 lg:pt-0">
          
          {/* 2. Top Social Proof: Overlapping Guest Avatars + Review Count (Shown on both Mobile & Desktop) */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
           
            
            <div className="text-left leading-tight">
              <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1">
                <span>88</span>
                <span className="text-[11px] font-normal text-zinc-500">Reviews</span>
              </div>
              <div className="flex items-center text-[11px] sm:text-xs text-amber-500 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" /> 5.0 Rating
              </div>
            </div>
          </div>

          {/* DESKTOP MAIN TITLE: "Travel 🌴 freely, stay in heritage" (Hidden on Mobile) */}
          <div className="hidden lg:block space-y-4 max-w-3xl mx-auto">
         
          </div>
 <div 
          className="hidden lg:flex relative w-full max-w-6xl mx-auto items-center justify-between min-h-[300px] pt-0 pb-0"
        >
          
          {/* LEFT: 5 Stacked "100% safe and secured" Pills (Exact visual replication) */}
          <div className="flex flex-col gap-2 items-start select-none w-56 z-20">
            {/* Pill 1 - Top Faint */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/30 dark:bg-zinc-900/30 border border-zinc-200/30 dark:border-zinc-800/30 text-[10px] font-medium text-zinc-400 dark:text-zinc-600 opacity-30">
              <div className="w-4 h-4 rounded-full bg-zinc-300/40 dark:bg-zinc-700/40 flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5" />
              </div>
              <span>100% safe and secured</span>
            </div>

            {/* Pill 2 - Semi Faint */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 opacity-60">
              <div className="w-4 h-4 rounded-full bg-zinc-400/40 dark:bg-zinc-600/40 flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5" />
              </div>
              <span>100% safe and secured</span>
            </div>

            {/* Pill 3 - ACTIVE / HIGHLIGHTED (Solid white, deep shadow, dark navy badge icon) */}
            <div 
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/80 shadow-[0_12px_30px_rgba(0,0,0,0.12)] text-xs font-bold text-zinc-900 dark:text-white hero-animate-pill"
            >
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span>100% safe and secured</span>
            </div>

            {/* Pill 4 - Semi Faint */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 opacity-60">
              <div className="w-4 h-4 rounded-full bg-zinc-400/40 dark:bg-zinc-600/40 flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5" />
              </div>
              <span>100% safe and secured</span>
            </div>

            {/* Pill 5 - Bottom Faint */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/30 dark:bg-zinc-900/30 border border-zinc-200/30 dark:border-zinc-800/30 text-[10px] font-medium text-zinc-400 dark:text-zinc-600 opacity-30">
              <div className="w-4 h-4 rounded-full bg-zinc-300/40 dark:bg-zinc-700/40 flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5" />
              </div>
              <span>100% safe and secured</span>
            </div>
          </div>

          {/* CENTER: DEVAPADMAM Display Typography Centerpiece (Replaces the Dog) */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2 sm:px-4 z-10 select-none w-full max-w-full">
            
            {/* Heritage Emblem */}
            <div className="relative w-28 h-28 sm:w-48 sm:h-48 mb-0 sm:mb-1">
              <AnimatePresence mode="popLayout">
                <motion.img 
                  key={emblemIndex}
                  src={EMBLEM_IMAGES[emblemIndex]} 
                  alt="Devapadmam Emblem"
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] dark:mix-blend-lighten dark:invert"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)", position: "absolute", top: 0, left: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            {/* Commanding DEVAPADMAM Animated Brand Display Text */}
            <div className="relative w-full max-w-full overflow-hidden flex justify-center items-center min-h-[48px] sm:min-h-[64px] lg:min-h-[72px]">
              <TextAnimate
                key={nameIndex}
                animation="blurInUp"
                by="word"
                as="h2"
                delay={0.2}
                startOnView={false}
                duration={0.5}
                className="font-serif text-2xl sm:text-4xl lg:text-[40px] xl:text-[48px] 2xl:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-none drop-shadow-sm whitespace-nowrap"
              >
                {VILLA_NAMES[nameIndex]}
              </TextAnimate>
            </div>

            {/* Heritage Sub-Title */}
            <div className="mt-2 sm:mt-2.5 flex items-center justify-center gap-2 sm:gap-3 text-[10px] xs:text-[11px] sm:text-sm font-semibold tracking-[0.16em] sm:tracking-[0.35em] uppercase text-rose-600 dark:text-rose-400 whitespace-nowrap">
              <span className="w-5 sm:w-12 h-[1px] bg-rose-500/40 shrink-0" />
              <TextAnimate animation="fadeIn" by="word" as="span" delay={0.4} startOnView={false} duration={0.4}>
                Heritage Stay • Trivandrum
              </TextAnimate>
              <span className="w-5 sm:w-12 h-[1px] bg-rose-500/40 shrink-0" />
            </div>

            {/* Direct Booking Guarantee Tag */}
            <div className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm text-[10px] sm:text-xs font-semibold text-zinc-700 dark:text-zinc-300 max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">Direct Rate: ₹{VILLA_PRICES[nameIndex]}/night</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">0% Added Markups</span>
            </div>

            {/* Soft Ambient Bottom Fade */}
            <div className="w-48 sm:w-64 h-4 sm:h-6 bg-gradient-to-b from-transparent to-[#fbfaf8]/80 dark:to-zinc-950/80 blur-sm pointer-events-none -mt-1 sm:-mt-2" />
          </div>

          {/* RIGHT: Two Stacked / Tilted Cards with Golden Thread Loop */}
          <div className="flex relative w-56 justify-end items-center select-none z-20">
            
            {/* Decorative Organic Golden Thread Loop (Exact from reference) */}
            <svg 
              className="absolute -top-10 -left-6 w-52 h-44 pointer-events-none opacity-80" 
              viewBox="0 0 200 180" 
              fill="none"
            >
              <path 
                d="M 40,30 C 130,-20 210,50 180,110 C 150,170 80,160 100,100 C 120,40 180,80 190,140" 
                stroke="#e2a84b" 
                strokeWidth="1.6" 
                strokeLinecap="round" 
                fill="none"
              />
            </svg>

            <div className="flex flex-col gap-2 relative z-10">
              
              {/* Card 1: Tilted Top Card (rotate-6) */}
              <div 
                className="w-40 p-3.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800 shadow-[0_10px_25px_rgba(0,0,0,0.08)] text-left rotate-6 hero-animate-card-1"
              >
                <div className="text-[10px] text-zinc-400 font-medium">We have</div>
                <div className="text-base font-bold text-zinc-900 dark:text-white leading-tight mt-0.5">
                  10 years of
                </div>
                <div className="text-[10px] text-zinc-400 font-medium">experience in hospitality</div>
                
                <div className="my-2 w-6 h-5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>

                {/* Calendar strip (7 8 9 10 11 12 1) */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  <span>7</span><span>8</span><span className="font-bold text-zinc-900 dark:text-white">9</span><span>10</span><span>11</span><span>12</span><span>1</span>
                </div>
              </div>

              {/* Card 2: Tilted Bottom Card (-rotate-6) */}
              <div 
                className="w-40 p-3.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800 shadow-[0_10px_25px_rgba(0,0,0,0.08)] text-left -mt-3 ml-4 -rotate-6 hero-animate-card-2"
              >
                <div className="text-[10px] text-zinc-400 font-medium">We have</div>
                <div className="text-base font-bold text-zinc-900 dark:text-white leading-tight mt-0.5">
                  10 years of
                </div>
                <div className="text-[10px] text-zinc-400 font-medium">experience</div>
                
                <div className="my-2 w-6 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center">
                  <Crown className="w-3 h-3" />
                </div>

                {/* Calendar strip */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  <span>7</span><span>8</span><span>9</span><span className="font-bold text-amber-600">10</span><span>11</span><span>12</span><span>1</span>
                </div>
              </div>

            </div>

          </div>

        </div>
          {/* MOBILE MAIN TITLE: "DEVAPADMAM" Brand Hero (Shown ONLY on Mobile/Tablet < lg) */}
          <div className="lg:hidden flex flex-col items-center justify-center text-center px-2 select-none w-full max-w-full mb-3">
            {/* Heritage Emblem */}
            <div className="relative w-full h-[240px] max-w-[320px] mb-3 mx-auto flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.img 
                  key={emblemIndex}
                  src={EMBLEM_IMAGES[emblemIndex]} 
                  alt="Devapadmam Emblem"
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:mix-blend-lighten dark:invert"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)", position: "absolute", top: 0, left: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            {/* Commanding DEVAPADMAM Animated Brand Display Text */}
            <div className="relative w-full max-w-full overflow-hidden">
              <TextAnimate
                animation="blurInUp"
                by="character"
                as="h1"
                delay={0.15}
                startOnView={false}
                duration={0.5}
                className="font-serif text-[30px] min-[380px]:text-[34px] sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white uppercase leading-none drop-shadow-sm whitespace-nowrap"
              >
                DEVAPADMAM
              </TextAnimate>
            </div>

            {/* Heritage Sub-Title */}
            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] min-[380px]:text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-rose-600 dark:text-rose-400 whitespace-nowrap">
              <span className="w-5 sm:w-10 h-[1px] bg-rose-500/40 shrink-0" />
              <TextAnimate animation="fadeIn" by="word" as="span" delay={0.3} startOnView={false} duration={0.4}>
                Heritage Stay • Trivandrum
              </TextAnimate>
              <span className="w-5 sm:w-10 h-[1px] bg-rose-500/40 shrink-0" />
            </div>

            {/* Direct Booking Guarantee Tag */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 shadow-sm text-[10px] min-[380px]:text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">Direct Rate: ₹25,000/night</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">0% Added Markups</span>
            </div>
          </div>

          {/* 4. Airbnb Search Tool (Useful Interactive Tool with Real-time Guests Stepper) */}
          <div className="w-full pt-4 sm:pt-6 pb-2 sm:pb-4 lg:pb-8 flex justify-center">
            <SearchToolBar />
          </div>

        </div>

        {/* 5. Center Composition: Shown ONLY on Desktop (>= lg) */}
       

      </div>

    </section>
  );
}
