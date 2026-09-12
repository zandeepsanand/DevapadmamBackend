"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, Tag, Sparkles, ArrowRight } from "lucide-react";

interface AirbnbOfferModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AirbnbOfferModal({ isOpen: externalIsOpen, onClose: externalOnClose }: AirbnbOfferModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  useEffect(() => {
    // Show automatically after 1.5s on first visit if not explicitly dismissed
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("devapadmam_modal_dismissed");
      if (!dismissed && externalIsOpen === undefined) {
        setInternalIsOpen(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [externalIsOpen]);

  const show = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    sessionStorage.setItem("devapadmam_modal_dismissed", "true");
    setInternalIsOpen(false);
    if (externalOnClose) externalOnClose();
  };

  const handleClaim = () => {
    handleClose();
    const villasEl = document.getElementById("villas");
    if (villasEl) {
      villasEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
          
          {/* Modal Container (Exact Airbnb Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-3xl max-w-[390px] w-full p-5 sm:p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-3.5 overflow-hidden"
          >
            {/* Top Close Button (Exact Airbnb Circle X) */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* 3D Isometric Kerala Villa Header Illustration */}
            <div className="relative w-full h-28 sm:h-32 flex items-center justify-center -mt-1">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/3d-villa-modal.png"
                  alt="3D Kerala Heritage Villa"
                  fill
                  sizes="128px"
                  className="object-contain mix-blend-multiply dark:mix-blend-normal"
                  priority
                />
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <Tag className="w-3 h-3 text-emerald-600" />
                <span>Zero Platform Fee Guarantee</span>
              </div>
              
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                Save ₹4,500+ on Direct Booking
              </h2>
            </div>

            {/* Price Comparison Explanation Box */}
            <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-xl p-3 sm:p-3.5 border border-zinc-200 dark:border-zinc-700/60 space-y-1.5 text-left">
              <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                <span>Airbnb Listed Price:</span>
                <span className="line-through text-red-500 font-semibold">₹29,500 / night</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Direct Devapadmam Rate:
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-serif text-base sm:text-lg">₹25,000 <span className="text-[10px] font-sans font-normal text-zinc-500">/ night</span></span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1 border-t border-zinc-200 dark:border-zinc-700/50">
                Airbnb adds extra fees & commissions. Booking direct guarantees our true direct rate of <strong>₹25,000/night</strong> with <strong>0% extra platform markups</strong>.
              </p>
            </div>

            {/* Primary Airbnb Magenta/Gold Action Button */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleClaim}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-semibold text-sm tracking-wide shadow-md shadow-rose-500/25 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Claim ₹25,000 Direct Rate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Free cancellation up to 48 hours • Instant confirmation</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
