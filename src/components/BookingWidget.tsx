"use client";

import { useMemo, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { differenceInDays, format } from "date-fns";
import { Calendar as CalendarIcon, ShieldCheck, Sparkles, AlertCircle, Users, PhoneCall } from "lucide-react";

interface BookingWidgetProps {
  pricePerNight: number;
  bookedDateStrings: string[];
  villaName?: string;
}

export function BookingWidget({ pricePerNight, bookedDateStrings, villaName = "Devapadmam Villa" }: BookingWidgetProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  const disabledDates = useMemo(() => {
    const dates = bookedDateStrings.map((str) => new Date(str));
    return [{ before: new Date() }, ...dates];
  }, [bookedDateStrings]);

  const diffDays = range?.from && range?.to ? differenceInDays(range.to, range.from) : undefined;
  const totalNights = diffDays && diffDays > 0 ? diffDays : range?.from ? 1 : 0;

  const handleReserve = () => {
    if (!range?.from) return alert("Please select your booking check-in date");

    const checkInDate = format(range.from, "MMM d, yyyy");
    const checkOutDate = range.to ? format(range.to, "MMM d, yyyy") : format(range.from, "MMM d, yyyy");
    
    const message = `Hi, I would like to reserve ${villaName} for ${totalNights} night(s).\nCheck-in: ${checkInDate}\nCheckout: ${checkOutDate}\nGuests: ${guests}`;
    const whatsappUrl = `https://wa.me/918606783324?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="sticky top-28 bg-card border border-border rounded-3xl p-6 shadow-luxury space-y-6">

      {/* Header Price */}
      <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
        <div>
          <span className="font-serif text-3xl font-bold text-foreground">₹{pricePerNight.toLocaleString('en-IN')}</span>
          <span className="text-muted-foreground text-xs font-medium ml-1">/ night</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Airbnb Synced</span>
        </div>
      </div>

      {/* Check-in / Checkout Selector Pills */}
      <div className="grid grid-cols-2 border border-border rounded-2xl overflow-hidden bg-background">
        <div className="p-3 border-r border-border hover:bg-muted/40 transition cursor-pointer">
          <div className="text-[10px] uppercase font-bold tracking-wider text-gold mb-1">Check-in</div>
          <div className="text-xs font-semibold text-foreground">
            {range?.from ? format(range.from, "EEE, MMM d, yyyy") : "Select date"}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5">2:00 PM</div>
        </div>
        <div className="p-3 hover:bg-muted/40 transition cursor-pointer">
          <div className="text-[10px] uppercase font-bold tracking-wider text-gold mb-1">Checkout</div>
          <div className="text-xs font-semibold text-foreground">
            {range?.to ? format(range.to, "EEE, MMM d, yyyy") : "Select date"}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5">11:00 AM</div>
        </div>
      </div>

      {/* Guests Selector */}
      <div className="flex items-center justify-between border border-border rounded-2xl p-3 bg-background">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gold" />
          <div className="text-[10px] uppercase font-bold tracking-wider text-gold">Guests</div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition text-lg leading-none pb-0.5"
          >
            -
          </button>
          <span className="text-sm font-bold text-foreground w-4 text-center">{guests}</span>
          <button 
            onClick={() => setGuests(guests + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition text-lg leading-none pb-0.5"
          >
            +
          </button>
        </div>
      </div>

      {/* DayPicker Calendar */}
      <div className="border border-border/80 rounded-2xl p-2 bg-background flex justify-center min-h-[300px]">
        <DayPicker 
          mode="range"
          selected={range}
          onSelect={setRange}
          className="font-medium p-0 m-0 text-xs"
          disabled={disabledDates}
        />
      </div>

      {/* Reserve Button */}
      <button 
        onClick={handleReserve} 
        disabled={!range?.from}
        className="w-full py-4 rounded-xl gold-gradient-bg text-white font-bold text-sm tracking-wide shadow-gold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {range?.from ? `Reserve ${villaName}` : "Select Check-in Date"}
      </button>

      {/* Call Button for Doubts */}
      <a 
        href="tel:+918606783324"
        className="w-full py-3.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
      >
        <PhoneCall className="w-4 h-4 text-emerald-600" />
        Have doubts? Call us
      </a>



      <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
        <span>Direct booking with instant confirmation</span>
      </div>
    </div>
  );
}
