"use client";

import { useState } from "react";
import Image from "next/image";
import { Grid, Sparkles } from "lucide-react";
import { PhotoGalleryModal } from "@/components/PhotoGalleryModal";

export interface VillaGallerySectionProps {
  gallery: string[];
  title: string;
}

export function VillaGallerySection({ gallery, title }: VillaGallerySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleOpenPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* 5-Photo Bento Gallery Grid with "Show all photos" trigger */}
      <div className="relative group/gallery">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-luxury border border-border/60">
          
          {/* Big Featured Image (Col span 2, Row span 2) */}
          <div
            onClick={() => handleOpenPhoto(0)}
            className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden bg-muted"
          >
            <Image
              src={gallery[0]}
              alt={`${title} main view`}
              fill
              priority
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Grid Photo 2 */}
          <div
            onClick={() => handleOpenPhoto(1)}
            className="hidden md:block relative group cursor-pointer overflow-hidden bg-muted"
          >
            <Image
              src={gallery[1] || gallery[0]}
              alt={`${title} photo 2`}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="25vw"
            />
          </div>

          {/* Grid Photo 3 */}
          <div
            onClick={() => handleOpenPhoto(2)}
            className="hidden md:block relative group cursor-pointer overflow-hidden bg-muted"
          >
            <Image
              src={gallery[2] || gallery[0]}
              alt={`${title} photo 3`}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="25vw"
            />
          </div>

          {/* Grid Photo 4 */}
          <div
            onClick={() => handleOpenPhoto(3)}
            className="hidden md:block relative group cursor-pointer overflow-hidden bg-muted"
          >
            <Image
              src={gallery[3] || gallery[0]}
              alt={`${title} photo 4`}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="25vw"
            />
          </div>

          {/* Grid Photo 5 */}
          <div
            onClick={() => handleOpenPhoto(4)}
            className="hidden md:block relative group cursor-pointer overflow-hidden bg-muted"
          >
            <Image
              src={gallery[4] || gallery[0]}
              alt={`${title} photo 5`}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="25vw"
            />
          </div>

        </div>

        {/* Floating Skeuomorphic "Show all photos" Button (Airbnb Style) */}
        <button
          onClick={() => handleOpenPhoto(0)}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-neutral-900 border border-black/10 shadow-lg backdrop-blur-md text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all"
        >
          <Grid className="w-4 h-4 text-gold" />
          <span>Show all {gallery.length} photos</span>
        </button>
      </div>

      {/* Full Screen Lightbox Modal */}
      <PhotoGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={gallery}
        title={title}
        initialIndex={selectedPhotoIndex}
      />
    </>
  );
}
