"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Search, Globe, Menu, User, X, CheckCircle2, ShieldCheck, Calendar, Users, ArrowRight, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { useSearchFilter } from "@/context/SearchFilterContext";
import { DateRangePickerPopover } from "@/components/DateRangePickerPopover";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [datePickerSection, setDatePickerSection] = useState<string | null>(null);

  // Search state
  const {
    dateRange,
    clearDates,
    guests,
    incrementGuests,
    decrementGuests,
    triggerCardsAnimation
  } = useSearchFilter();
  const [selectedProperty, setSelectedProperty] = useState("all");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchModalOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleOpenSearchModal = () => setSearchModalOpen(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search-modal", handleOpenSearchModal);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search-modal", handleOpenSearchModal);
    };
  }, []);

  // Prevent background body scroll when search modal is open
  useEffect(() => {
    if (searchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [searchModalOpen]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchModalOpen(false);
    triggerCardsAnimation();
  };

  return (
    <header className="fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* MAIN AIRBNB SKEUOMORPHIC HEADER */}
      <div 
        className={`transition-all duration-300 py-3.5 ${
          isScrolled 
            ? "backdrop-blur-xl bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200/80 dark:border-zinc-800 shadow-md" 
            : "bg-transparent border-transparent shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-serif font-bold text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                D
              </div>
              <span className="hidden sm:block font-sans text-xl sm:text-2xl font-black tracking-tight text-amber-500 uppercase transition-colors">
                DEVAPADMAM
              </span>
            </Link>

            {/* Center: Pill Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 max-w-lg mx-4">
              <div className="flex items-center bg-zinc-50 dark:bg-zinc-900/80 rounded-full px-2 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-zinc-200/50 dark:border-zinc-800/50 text-xs sm:text-sm font-medium gap-1 lg:gap-2">
                <Link href="#villas" className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm text-zinc-600 dark:text-zinc-300 hover:text-amber-600 transition-all">
                  <Search className="w-4 h-4 text-zinc-400" />
                  <span>Heritage Stays</span>
                </Link>
                <Link href="#experiences" className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm text-zinc-600 dark:text-zinc-300 hover:text-amber-600 transition-all">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  <span>Experiences</span>
                </Link>
                <Link href="#calendar" className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm text-zinc-600 dark:text-zinc-300 hover:text-amber-600 transition-all">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <span>Availability</span>
                </Link>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="relative flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                href="#contact"
                className="hidden sm:flex items-center justify-center px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                Contact
              </Link>
              
              <a
                href="https://wa.me/918606783324?text=Hello!%20I'd%20like%20to%20enquire%20about%20Devapadmam%20Heritage%20Stay."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center justify-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all"
              >
                WhatsApp
              </a>

              {/* Mobile Hamburger */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* FLOATING USER PROFILE DROPDOWN POPOVER */}
              {mobileMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setMobileMenuOpen(false)} 
                  />
                  <div className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95">
                    <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                      <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Devapadmam Concierge</div>
                      <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Direct Guest Services</div>
                    </div>
                    
                    <Link
                      href="/#villas"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition"
                    >
                      <span>Explore 3 Heritage Properties</span>
                    </Link>

                    <Link
                      href="/#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition"
                    >
                      <span>Google Map Location & Directions</span>
                    </Link>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSearchModalOpen(true);
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition cursor-pointer"
                    >
                      <span>Live Airbnb iCal Availability</span>
                    </button>

                    <a
                      href="https://wa.me/918606783324?text=Hello!%20I'd%20like%20to%20enquire%20about%20Devapadmam%20Heritage%20Stay."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition"
                    >
                      <span>Chat on WhatsApp (+91 86067 83324)</span>
                    </a>

                    <div className="mt-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 px-3 py-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl">
                      ✅ 0% Platform Fees • Guaranteed Direct Rates
                    </div>
                  </div>
                </>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* FULL-VIEWPORT SEARCH MODAL (Rendered at Body Root via React Portal) */}
      {mounted && searchModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchModalOpen(false);
          }}
        >
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative my-auto animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">Search Devapadmam Stays</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Direct rates with zero platform commissions</p>
              </div>
              
              <button 
                onClick={() => setSearchModalOpen(false)}
                className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Search Form */}
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              
              {/* Property Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-rose-500 block mb-1.5">
                  Select Heritage Property
                </label>
                <select 
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none transition cursor-pointer"
                >
                  <option value="all">All Heritage Properties (Explore Collection)</option>
                  <option value="6bhk">Devapadmam Grand Mansion (6 BHK • Up to 16 Guests) — ₹25,000/night</option>
                  <option value="3bhk">Devapadmam First Floor Stay (3 BHK • Up to 8 Guests) — ₹8,500/night</option>
                  <option value="minnaaram">Devapadmam Minnaaram Cottage (Heritage Suite • Up to 4 Guests) — ₹5,500/night</option>
                  <option value="naarayaneeyam">Devapadmam Naarayaneeyam (Luxury 2 BHK • Lulu Mall) — ₹3,000/night</option>
                </select>
              </div>

              {/* Dates Grid */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>Check-in Date</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => setDatePickerSection("checkin")}
                    className="w-full text-left p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white hover:border-amber-500 transition cursor-pointer"
                  >
                    {dateRange?.from ? format(dateRange.from, "MMM d, yyyy") : "Add date"}
                  </button>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5 flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" />
                      <span>Checkout Date</span>
                    </div>
                    {dateRange?.from && (
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDates();
                        }}
                        className="text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Clear
                      </span>
                    )}
                  </label>
                  <button 
                    type="button"
                    onClick={() => setDatePickerSection("checkout")}
                    className="w-full text-left p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-white hover:border-amber-500 transition cursor-pointer"
                  >
                    {dateRange?.to ? format(dateRange.to, "MMM d, yyyy") : "Add date"}
                  </button>
                </div>

                {/* Popover */}
                <DateRangePickerPopover 
                  isOpen={datePickerSection !== null} 
                  onClose={() => setDatePickerSection(null)} 
                />
              </div>

              {/* Guests Selector */}
              <div className="grid grid-cols-1 gap-3.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-white">Guests</div>
                    <div className="text-[10px] text-zinc-500">All ages</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={decrementGuests}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-amber-500 hover:text-amber-600 disabled:opacity-30 transition cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center tabular-nums">{guests}</span>
                    <button 
                      type="button" 
                      onClick={incrementGuests}
                      disabled={guests >= 16}
                      className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-amber-500 hover:text-amber-600 disabled:opacity-30 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Booking Benefit Notice */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guaranteed lowest direct rate with 0% extra Airbnb service markup.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-500/30 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Search Live Availability & Calendar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>,
        document.body
      )}

    </header>
  );
}
