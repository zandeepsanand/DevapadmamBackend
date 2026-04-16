"use client";

import { useMemo, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { differenceInDays, format } from "date-fns";
import Script from "next/script";

interface BookingWidgetProps {
  pricePerNight: number;
  bookedDateStrings: string[];
}

export function BookingWidget({ pricePerNight, bookedDateStrings }: BookingWidgetProps) {
  const [range, setRange] = useState<DateRange | undefined>();

  const disabledDates = useMemo(() => {
    const dates = bookedDateStrings.map((str) => new Date(str));
    return [{ before: new Date() }, ...dates];
  }, [bookedDateStrings]);

  // If only 1 day selected (range.to is undefined), count as 1 night.
  // We use differenceInDays(range.to, range.from) if range.to is selected. 
  // Wait, if differenceInDays is 0 (same day check-in/check-out), we bill for 1 night.
  const diffDays = range?.from && range?.to ? differenceInDays(range.to, range.from) : undefined;
  const totalNights = diffDays && diffDays > 0 ? diffDays : (range?.from ? 1 : 0);
  const totalPrice = totalNights * pricePerNight;

  const handleReserve = () => {
    if (!range?.from) return alert("Please select your booking dates");
    
    // Check if razorpay is loaded
    if (!(window as any).Razorpay) return alert("Payment Gateway is loading, please try again.");

    const options = {
      key: "YOUR_RAZORPAY_KEY", 
      amount: totalPrice * 100, // Amount is in standard currency subunits (Paise for INR, etc.)
      currency: "INR",
      name: "Devapadmam Heritage",
      description: `Booking for ${totalNights} night(s) at Devapadmam`,
      image: "https://placehold.co/200x200/000000/ffffff/png?text=Devapadmam",
      handler: function (response: any) {
        alert("Payment Successful! Razorpay ID: " + response.razorpay_payment_id + "\n\n(Backend POST logic should fire here)");
        // e.g. await fetch('/api/bookings', { method: 'POST', body: ... })
      },
      prefill: {
        name: "Premium Guest",
        email: "guest@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#000000" // Premium black matching the UI
      }
    };
    
    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any){
        alert("Payment Failed - " + response.error.description);
    });
    rzp.open();
  };

  return (
    <div className="sticky top-28 bg-card border border-border rounded-3xl p-6 shadow-xl shadow-black/5">
      {/* Razorpay External Script Injection */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* CSS Block for exact matching Airbnb Calendar Aesthetics (Gray strikethough & Black Circles) */}
      <style dangerouslySetInnerHTML={{__html: `
        [aria-disabled="true"], button:disabled.rdp-day {
          text-decoration: line-through !important;
          color: #9CA3AF !important;
          opacity: 0.6;
        }
        [aria-selected="true"], .rdp-selected {
          background-color: #000 !important;
          color: #fff !important;
          font-weight: bold;
          border-radius: 50% !important; /* Perfect Black Circle */
        }
        .rdp-range_middle, .rdp-day_range_middle {
          background-color: #F3F4F6 !important;
          color: #000 !important;
          border-radius: 0 !important;
        }
        .rdp-range_start, .rdp-day_range_start {
          background-color: #000 !important;
          border-top-left-radius: 50% !important;
          border-bottom-left-radius: 50% !important;
        }
        .rdp-range_end, .rdp-day_range_end {
          background-color: #000 !important;
          border-top-right-radius: 50% !important;
          border-bottom-right-radius: 50% !important;
        }
      `}} />

      <div className="flex items-baseline gap-1 mb-6 px-2">
        <span className="text-2xl font-bold text-foreground">₹{pricePerNight.toLocaleString('en-IN')}</span>
        <span className="text-muted-foreground text-[15px] font-medium">night</span>
      </div>

      {/* Check-in / Checkout Component UI */}
      <div className="grid grid-cols-2 border border-border rounded-xl mb-4 overflow-hidden">
        <div className="p-3 border-r border-border hover:bg-muted/50 transition cursor-pointer">
          <div className="text-[10px] uppercase font-bold text-foreground/80 mb-1">Check-in</div>
          <div className="text-sm font-medium text-foreground">
            {range?.from ? format(range.from, "M/d/yyyy") : "Add date"}
          </div>
        </div>
        <div className="p-3 hover:bg-muted/50 transition cursor-pointer">
          <div className="text-[10px] uppercase font-bold text-foreground/80 mb-1">Checkout</div>
          <div className="text-sm font-medium text-foreground">
            {range?.to ? format(range.to, "M/d/yyyy") : "Add date"}
          </div>
        </div>
      </div>

      <div className="border border-border rounded-xl px-2 py-4 flex justify-center bg-card mb-4 min-h-[300px]">
        <DayPicker 
          mode="range"
          selected={range}
          onSelect={setRange}
          className="font-medium p-0 m-0"
          disabled={disabledDates}
        />
      </div>

      <button 
         onClick={handleReserve} 
         className="w-full bg-primary hover:opacity-90 text-primary-foreground py-4 rounded-xl font-semibold text-base transition-opacity shadow-sm disabled:opacity-50" 
         disabled={!range?.from}
      >
        Reserve
      </button>

      {/* Total calculation appearing when dates are selected */}
      {totalPrice > 0 && (
         <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[16px]">
           <span className="font-semibold text-foreground">Total <span className="font-normal text-muted-foreground">({totalNights} night{totalNights > 1 ? 's' : ''})</span></span>
           <span className="font-semibold text-foreground">₹{totalPrice.toLocaleString('en-IN')}</span>
         </div>
      )}
      <p className="text-center text-muted-foreground text-sm mt-4">You won't be charged yet</p>
    </div>
  );
}
