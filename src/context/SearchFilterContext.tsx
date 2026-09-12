"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { DateRange } from "react-day-picker";

interface SearchFilterContextType {
  guests: number;
  setGuests: (n: number) => void;
  incrementGuests: () => void;
  decrementGuests: () => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  clearDates: () => void;
  location: string;
  setLocation: (loc: string) => void;
  animationTriggerCount: number;
  triggerCardsAnimation: () => void;
}

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

export function SearchFilterProvider({ children }: { children: ReactNode }) {
  const [guests, setGuestsState] = useState<number>(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [location, setLocation] = useState<string>("Thiruvananthapuram...");
  const [animationTriggerCount, setAnimationTriggerCount] = useState<number>(0);

  const setGuests = useCallback((n: number) => {
    setGuestsState(Math.max(1, Math.min(16, n)));
  }, []);

  const incrementGuests = useCallback(() => {
    setGuestsState((prev) => Math.min(16, prev + 1));
  }, []);

  const decrementGuests = useCallback(() => {
    setGuestsState((prev) => Math.max(1, prev - 1));
  }, []);

  const clearDates = useCallback(() => {
    setDateRange(undefined);
  }, []);

  const triggerCardsAnimation = useCallback(() => {
    setAnimationTriggerCount((prev) => prev + 1);
    const villasEl = document.getElementById("villas");
    if (villasEl) {
      villasEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <SearchFilterContext.Provider
      value={{
        guests,
        setGuests,
        incrementGuests,
        decrementGuests,
        dateRange,
        setDateRange,
        clearDates,
        location,
        setLocation,
        animationTriggerCount,
        triggerCardsAnimation,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  const context = useContext(SearchFilterContext);
  if (!context) {
    throw new Error("useSearchFilter must be used within a SearchFilterProvider");
  }
  return context;
}
