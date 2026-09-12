"use client";

import { useState } from "react";
import { Sparkles, Home, Trees, Waves, Crown, ShieldCheck } from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon: any;
  badge?: string;
}

const CATEGORIES: Category[] = [
  { id: "all", label: "All Stays", icon: Home, badge: "Direct Rates" },
  { id: "6bhk", label: "6 BHK Mansion", icon: Crown, badge: "₹25,000" },
  { id: "3bhk", label: "3 BHK First Floor", icon: Sparkles, badge: "₹8,500" },
  { id: "minnaaram", label: "Minnaaram Cottage", icon: Trees, badge: "₹5,500" },
  { id: "naarayaneeyam", label: "Naarayaneeyam 2BHK", icon: Sparkles, badge: "₹3,000" },
];

interface CategoryFilterBarProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

export function CategoryFilterBar({ activeCategory = "all", onSelectCategory }: CategoryFilterBarProps) {
  const [selected, setSelected] = useState(activeCategory);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (onSelectCategory) onSelectCategory(id);
  };

  return (
    <div className="w-full py-4 border-b border-border/80 bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        
        {/* Category Pill Buttons */}
        <div className="flex items-center gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === selected;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "skeuo-button text-white shadow-md scale-105"
                    : "bg-secondary/70 text-foreground/80 hover:bg-secondary hover:text-foreground border border-border/60"
                }`}
              >
                <Icon className="w-4 h-4 text-gold" />
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${isActive ? "bg-black/30 text-amber-200" : "bg-gold/15 text-gold"}`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Sync Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          {/* <span>Airbnb iCal Calendar Live Synced</span> */}
        </div>

      </div>
    </div>
  );
}
