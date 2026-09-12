"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Grid, LayoutGrid, Maximize2 } from "lucide-react";

export interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  initialIndex?: number;
}

export function PhotoGalleryModal({
  isOpen,
  onClose,
  images,
  title,
  initialIndex = 0,
}: PhotoGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [viewMode, setViewMode] = useState<"slideshow" | "grid">("slideshow");

  // Keep currentIndex updated if initialIndex changes when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation (Left, Right, Escape)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    },
    [isOpen, onClose, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const currentPhoto = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex flex-col text-white select-none"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/60 backdrop-blur-md">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
              {title}
            </h2>
            <p className="text-xs text-neutral-400 font-medium">
              Photo {currentIndex + 1} of {images.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/15">
              <button
                onClick={() => setViewMode("slideshow")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "slideshow"
                    ? "bg-white text-neutral-900 shadow-md"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Slideshow</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-neutral-900 shadow-md"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All Photos</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all"
              aria-label="Close Gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {viewMode === "slideshow" ? (
          <div className="flex-1 flex flex-col justify-between overflow-hidden relative p-4 sm:p-8">
            
            {/* Main Center Image Display */}
            <div className="flex-1 relative flex items-center justify-center w-full max-w-6xl mx-auto my-auto">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Active Image */}
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentPhoto}
                      alt={`${title} - photo ${currentIndex + 1}`}
                      fill
                      priority
                      className="object-contain w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Scrollable Thumbnail Selector Bar */}
            <div className="h-24 pt-4 border-t border-white/10 flex items-center justify-center overflow-x-auto gap-3 px-4 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    idx === currentIndex
                      ? "border-amber-400 scale-105 shadow-lg ring-2 ring-amber-400/50 opacity-100"
                      : "border-transparent opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* Grid View Mode */
          <div className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setViewMode("slideshow");
                  }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 cursor-pointer group bg-neutral-900 shadow-md"
                >
                  <Image
                    src={img}
                    alt={`${title} - Photo ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                    {idx + 1} / {images.length}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
