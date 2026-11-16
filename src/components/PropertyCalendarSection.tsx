"use client";

import { useState, useEffect, useMemo } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, RefreshCw, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { LUXURY_VILLAS, VillaData } from "@/lib/villasData";

export function PropertyCalendarSection() {
  const [selectedVillaId, setSelectedVillaId] = useState<string>("5");
  const [bookedDateStrings, setBookedDateStrings] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [range, setRange] = useState<DateRange | undefined>();

  const activeVilla: VillaData = useMemo(() => {
    return LUXURY_VILLAS.find((v) => v.id === selectedVillaId) || LUXURY_VILLAS[0];
  }, [selectedVillaId]);

  // Fetch Airbnb iCal calendar dates when selected villa changes
  useEffect(() => {
    let isMounted = true;
    async function loadCalendar() {
      setLoading(true);
      try {
        const res = await fetch(`/api/ical?villaId=${selectedVillaId}`);
        const data = await res.json();
        if (isMounted && data.dates) {
          setBookedDateStrings(data.dates);
        }
      } catch (err) {
        console.error("Failed to load iCal calendar:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCalendar();
    return () => {
      isMounted = false;
    };
  }, [selectedVillaId]);

  const disabledDates = useMemo(() => {
    const dates = bookedDateStrings.map((str) => new Date(str));
    return [{ before: new Date() }, ...dates];
  }, [bookedDateStrings]);

  const diffDays = range?.from && range?.to ? differenceInDays(range.to, range.from) : undefined;
  const totalNights = diffDays && diffDays > 0 ? diffDays : range?.from ? 1 : 0;
  const totalPrice = totalNights * activeVilla.pricePerNight;

  return (
    <section id="calendar" className="py-20 bg-secondary/40 border-y border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold font-bold text-xs uppercase tracking-widest">
            <CalendarIcon className="w-3.5 h-3.5 text-gold" />
            <span>Live Availability & Airbnb Calendar</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Check Real-Time Openings
          </h2>
          
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Our calendars are automatically synchronized in real-time with Airbnb iCal feeds. Select any property below to view live open dates, blocked reservations, and instant nightly rates.
          </p>
        </div>

        {/* Property Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {LUXURY_VILLAS.map((villa) => (
            <button
              key={villa.id}
              onClick={() => {
                setSelectedVillaId(villa.id);
                setRange(undefined);
              }}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-serif text-sm sm:text-base font-bold transition-all duration-300 shadow-sm cursor-pointer ${
                selectedVillaId === villa.id
                  ? "gold-gradient-bg text-white shadow-gold scale-105"
                  : "bg-card text-foreground border border-border/80 hover:border-gold/50 hover:bg-muted"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white/90" style={{ opacity: selectedVillaId === villa.id ? 1 : 0.4 }} />
              <span>{villa.name}</span>
              <span className="text-xs font-sans opacity-90 px-2.5 py-0.5 rounded-full bg-black/20">
                ₹{villa.pricePerNight.toLocaleString("en-IN")}/night
              </span>
            </button>
          ))}
        </div>

        {/* Calendar & Details Card */}
        <div className="bg-card rounded-3xl border border-border p-6 sm:p-10 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Interactive DayPicker Calendar */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Airbnb Live Sync Active</span>
              </div>

              {loading && (
                <div className="flex items-center gap-2 text-xs text-gold animate-pulse font-medium">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Syncing calendar dates...
                </div>
              )}
            </div>

            {/* DayPicker Calendar Component */}
            <div className="p-4 bg-background rounded-2xl border border-border/60 flex justify-center min-h-[350px]">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={disabledDates}
                numberOfMonths={1}
                className="p-0 m-0"
              />
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-border bg-card" />
                <span>Available Date</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-muted border border-border flex items-center justify-center text-[10px] text-muted-foreground line-through">
                  15
                </div>
                <span>Airbnb Booked / Blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span>Selected Dates</span>
              </div>
            </div>

          </div>

          {/* Right Side: Active Property Summary & Quick Reserve Box */}
          <div className="lg:col-span-5 bg-secondary/60 rounded-2xl p-6 border border-border space-y-6 flex flex-col justify-between h-full">
            
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-gold">
                {activeVilla.tagline}
              </div>

              <h3 className="font-serif text-2xl font-bold text-foreground">
                {activeVilla.name}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-foreground">
                  ₹{activeVilla.pricePerNight.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-medium text-muted-foreground">/ night</span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {activeVilla.description}
              </p>

              {/* Property Specs summary */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-foreground pt-2">
                <div className="p-2.5 rounded-xl bg-card border border-border/60">
                  <span className="text-muted-foreground block text-[10px] uppercase">Capacity</span>
                  Up to {activeVilla.maxGuests} Guests
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-border/60">
                  <span className="text-muted-foreground block text-[10px] uppercase">Bedrooms</span>
                  {activeVilla.bedrooms} BR / {activeVilla.baths} Bath
                </div>
              </div>

              {/* Selected Booking Summary */}
              {range?.from && (
                <div className="p-4 rounded-xl bg-card border border-gold/40 space-y-2 animate-in fade-in">
                  <div className="text-xs font-bold text-gold uppercase tracking-wider">Your Selection</div>
                  <div className="flex justify-between text-sm font-semibold text-foreground">
                    <span>Check-in:</span>
                    <span>{format(range.from, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-foreground">
                    <span>Checkout:</span>
                    <span>{range.to ? format(range.to, "MMM d, yyyy") : "Same day check-in"}</span>
                  </div>
                  <div className="pt-2 border-t border-border flex justify-between items-baseline font-serif text-lg font-bold text-foreground">
                    <span>Total ({totalNights} night{totalNights > 1 ? "s" : ""}):</span>
                    <span className="text-gold font-sans font-bold">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action CTA */}
            <div className="space-y-3 pt-4 border-t border-border">
              <Link
                href={`/villas/${activeVilla.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl gold-gradient-bg text-white font-semibold text-sm tracking-wide shadow-md hover:brightness-110 transition-all text-center"
              >
                <span>Book {activeVilla.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Zero hidden fees • Free cancellation 48h prior</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
