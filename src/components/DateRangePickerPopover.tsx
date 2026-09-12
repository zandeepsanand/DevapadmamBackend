"use client";

import React, { useRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import { X, Calendar as CalendarIcon } from "lucide-react";
import "react-day-picker/style.css"; // Basic styles
import { useSearchFilter } from "@/context/SearchFilterContext";

interface DateRangePickerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DateRangePickerPopover({ isOpen, onClose }: DateRangePickerPopoverProps) {
  const { dateRange, setDateRange, clearDates } = useSearchFilter();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [months, setMonths] = useState(1);

  // Set number of months on client mount to avoid SSR hydration mismatch
  useEffect(() => {
    setMonths(window.innerWidth >= 640 ? 2 : 1);
    
    const handleResize = () => setMonths(window.innerWidth >= 640 ? 2 : 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={popoverRef}
      className="absolute top-full left-1/2 sm:left-auto sm:right-0 mt-3 sm:mt-5 -translate-x-1/2 sm:translate-x-0 w-[320px] sm:w-[600px] bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-zinc-200/80 dark:border-zinc-800/80 p-4 sm:p-6 z-[100] animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-4">
        <div>
          <h3 className="text-sm font-bold text-foreground">Select dates</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Minimum stay is 1 night</p>
        </div>
        {dateRange?.from && (
          <button 
            onClick={clearDates}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition underline underline-offset-2"
          >
            Clear dates
          </button>
        )}
      </div>

      {/* React Day Picker */}
      <div className="day-picker-container flex justify-center">
        <DayPicker
          mode="range"
          selected={dateRange}
          onSelect={(range) => {
            if (range?.from && range?.to && range.from.getTime() === range.to.getTime()) {
              setDateRange({ from: range.from, to: undefined });
            } else {
              setDateRange(range);
            }
          }}
          numberOfMonths={months}
          disabled={[{ before: new Date() }]} 
          className="bg-transparent"
        />
      </div>
      
      {/* Custom CSS overrides for React Day Picker */}
      <style dangerouslySetInnerHTML={{__html: `
        .day-picker-container {
          --rdp-cell-size: 40px;
          --rdp-accent-color: #c58f38; /* Gold/Amber */
          --rdp-background-color: #fef0db; /* Light amber for range */
          --rdp-accent-color-dark: #c58f38;
          --rdp-background-color-dark: #4d330c;
          --rdp-outline: 2px solid var(--rdp-accent-color);
          --rdp-outline-selected: 2px solid var(--rdp-accent-color);
        }
        .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
          color: white;
          background-color: var(--rdp-accent-color);
        }
        .rdp-day_range_middle {
          background-color: var(--rdp-background-color);
          color: inherit;
        }
        .dark .rdp-day_range_middle {
          background-color: var(--rdp-background-color-dark);
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: rgba(197, 143, 56, 0.1);
        }
        .dark .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: rgba(197, 143, 56, 0.2);
        }
        .rdp-day {
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.875rem;
        }
        .rdp-day_range_middle {
          border-radius: 0;
        }
        .rdp-day_range_start {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .rdp-day_range_end {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        /* Fix for overlapping months on desktop */
        .rdp-months {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .rdp-months {
            flex-direction: row;
            gap: 2.5rem;
          }
        }
        .rdp-month {
          width: 100%;
        }
        .rdp-table {
          width: 100%;
          border-collapse: collapse;
        }
        .rdp-caption_label {
          font-weight: 700;
          font-size: 1rem;
          padding-bottom: 0.5rem;
        }
      `}} />

      {/* Footer Close Button */}
      <div className="mt-4 pt-4 border-t border-border/50 flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
