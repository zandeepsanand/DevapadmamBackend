"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";

export interface VillaCardProps {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
}

export function VillaCard({
  id,
  title,
  location,
  pricePerNight,
  rating,
  imageUrl,
}: VillaCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/villas/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group flex flex-col cursor-pointer h-full"
      >
        <div className="relative aspect-[20/19] w-full overflow-hidden rounded-[1.25rem] bg-secondary mb-3">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover w-full h-full transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0 scale-110"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Heart Icon Overlay */}
          <div className="absolute top-3 right-3 z-10 p-1.5 opacity-90 hover:scale-110 hover:opacity-100 transition-transform cursor-pointer">
             <Heart className="w-[1.4rem] h-[1.4rem] text-white drop-shadow-md stroke-[2px]" />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        <div className="flex justify-between items-start gap-x-4 w-full">
          <div className="flex flex-col flex-1 min-w-0 space-y-0.5">
            <h3 className="font-semibold text-foreground text-[16px] leading-tight truncate w-full">
              {location}
            </h3>
            <p className="text-muted-foreground text-[15px] truncate w-full">
              {title}
            </p>
            <div className="mt-1 pt-0.5 flex items-center gap-1 text-[15px]">
              <span className="font-semibold text-foreground">₹{pricePerNight.toLocaleString('en-IN')}</span>
              <span className="text-foreground">night</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[15px] font-medium shrink-0 pt-0.5">
            <Star className="w-3.5 h-3.5 fill-foreground stroke-foreground" />
            <span>{rating.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
