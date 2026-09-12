"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Minus, Plus, Calendar as CalendarIcon, MapPin, Sparkles, X } from "lucide-react";
import { useSearchFilter } from "@/context/SearchFilterContext";
import { DateRangePickerPopover } from "@/components/DateRangePickerPopover";

export function SearchToolBar() {
  const {
    guests,
    incrementGuests,
    decrementGuests,
    dateRange,
    clearDates,
    location,
    triggerCardsAnimation,
  } = useSearchFilter();

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionClick = (sectionName: string) => {
    setActiveSection(sectionName);
  };

  const handleSearch = () => {
    triggerCardsAnimation();
    const villasEl = document.getElementById("villas");
    if (villasEl) {
      villasEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 select-none">
      {/* Pill Search Container */}
      <div 
        className="w-full bg-white dark:bg-zinc-900/95 rounded-full border border-zinc-200/90 dark:border-zinc-800 shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_45px_rgba(0,0,0,0.12)] transition-all duration-300 backdrop-blur-md overflow-hidden"
      >
        {/* MOBILE VIEW: Single Pill (Airbnb Style) */}
        <div 
          className="flex sm:hidden items-center gap-3 px-4 py-3 cursor-pointer w-full"
          onClick={() => window.dispatchEvent(new CustomEvent('open-search-modal'))}
        >
          <Search className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
          <div className="flex flex-col text-left">
            <span className="text-[13px] font-bold text-zinc-900 dark:text-white leading-tight">Where to?</span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Anywhere • Any week • Add guests</span>
          </div>
        </div>

        {/* DESKTOP VIEW: Full Detailed Toolbar */}
        <div className="hidden sm:flex items-center justify-between p-1.5 sm:p-2.5 w-full">
          {/* Section 1: WHERE */}
          <button
            type="button"
            onClick={() => handleSectionClick("where")}
          className="flex-1 min-w-0 px-2 sm:px-4 py-1 sm:py-1.5 text-left rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer group"
          title="Search Thiruvananthapuram estates"
        >
          <span className="block text-[9px] sm:text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase font-sans">
            WHERE
          </span>
          <span className="block text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white truncate font-sans group-hover:text-amber-600 transition-colors">
            {location}
          </span>
        </button>

        {/* Vertical Divider */}
        <div className="h-7 sm:h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800 shrink-0 mx-0.5 sm:mx-1" />

        {/* Section 2: CHECK IN */}
        <button
          type="button"
          onClick={() => handleSectionClick("checkin")}
          className="flex-1 min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 text-left rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer group"
        >
          <span className="block text-[9px] sm:text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase font-sans">
            CHECK IN
          </span>
          <span className={`block text-[11px] sm:text-sm font-medium truncate font-sans transition-colors ${dateRange?.from ? 'text-zinc-900 dark:text-white font-semibold' : 'text-zinc-600 dark:text-zinc-300 group-hover:text-amber-600'}`}>
            {dateRange?.from ? format(dateRange.from, "MMM d") : "Add date"}
          </span>
        </button>

        {/* Vertical Divider */}
        <div className="h-7 sm:h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800 shrink-0 mx-0.5 sm:mx-1" />

        {/* Section 3: CHECK OUT */}
        <button
          type="button"
          onClick={() => handleSectionClick("checkout")}
          className="flex-1 min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer group"
        >
          <div className="text-left">
            <span className="block text-[9px] sm:text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase font-sans">
              CHECK OUT
            </span>
            <span className={`block text-[11px] sm:text-sm font-medium truncate font-sans transition-colors ${dateRange?.to ? 'text-zinc-900 dark:text-white font-semibold' : 'text-zinc-600 dark:text-zinc-300 group-hover:text-amber-600'}`}>
              {dateRange?.to ? format(dateRange.to, "MMM d") : "Add date"}
            </span>
          </div>
          {/* Clear button if dates exist */}
          {dateRange?.from && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                clearDates();
              }}
              className="w-5 h-5 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </div>
          )}
        </button>

        {/* Vertical Divider */}
        <div className="h-7 sm:h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800 shrink-0 mx-0.5 sm:mx-1" />

        {/* Section 4: GUESTS with Interactive Stepper */}
        <div className="flex-1 min-w-0 px-1.5 sm:px-3 py-1 sm:py-1.5 flex flex-col justify-center text-left">
          <span className="block text-[9px] sm:text-[10px] font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase font-sans">
            GUESTS
          </span>
          
          <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
            {/* Decrement Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                decrementGuests();
              }}
              disabled={guests <= 1}
              aria-label="Decrease guests"
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-amber-500 hover:text-amber-600 active:scale-90 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>

            {/* Guest Count */}
            <span className="w-4 sm:w-5 text-center text-xs sm:text-sm font-bold text-zinc-900 dark:text-white font-sans tabular-nums">
              {guests}
            </span>

            {/* Increment Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                incrementGuests();
              }}
              disabled={guests >= 16}
              aria-label="Increase guests"
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-amber-500 hover:text-amber-600 active:scale-90 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>
          </div>
        </div>

        {/* Section 5: Golden Circular Search Button (Exact #C58F38 from Reference) */}
        <button
          type="button"
          onClick={handleSearch}
          aria-label="Search available villas"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#c58f38] hover:bg-[#b27e2b] text-white flex items-center justify-center shadow-md shadow-amber-600/30 hover:shadow-lg hover:shadow-amber-600/40 active:scale-95 transition-all duration-200 shrink-0 ml-1 cursor-pointer"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
        </button>


          {/* Popover absolute container */}
          <DateRangePickerPopover 
            isOpen={activeSection === "checkin" || activeSection === "checkout"} 
            onClose={() => setActiveSection(null)} 
          />
        </div>
      </div>

      {/* Real-time Dynamic Capacity Notification Tooltip */}
      <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 text-[10px] sm:text-xs">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>
            {guests <= 4 && "Viewing all 4 Heritage Stays (1 to 4 Guests)"}
            {guests === 5 && "Viewing 3 Stays • Naarayaneeyam removed (> 4 Guests)"}
            {guests >= 6 && guests <= 10 && "Viewing Devapadmam 3 BHK & 6 BHK • 2 BHKs removed (6+ Guests)"}
            {guests > 10 && "Viewing Devapadmam 6 BHK Grand Estate (Accommodates up to 16 Guests)"}
          </span>
        </span>
      </div>
    </div>
  );
}
