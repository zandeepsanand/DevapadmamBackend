import { NextResponse } from "next/server";
import { eachDayOfInterval, subDays } from "date-fns";
import { getVillaById, LUXURY_VILLAS } from "@/lib/villasData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const villaId = searchParams.get("villaId");
  let icalUrl = searchParams.get("url");

  if (villaId) {
    const villa = getVillaById(villaId);
    if (villa?.icalUrl) {
      icalUrl = villa.icalUrl;
    }
  }

  if (!icalUrl) {
    // Default fallback to sample iCal URL
    icalUrl = LUXURY_VILLAS[0].icalUrl;
  }

  try {
    const res = await fetch(icalUrl, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ dates: [], status: "error", message: `HTTP ${res.status}` });
    }

    const text = await res.text();
    const events = text.split("BEGIN:VEVENT");
    const bookedDates: string[] = [];

    for (let i = 1; i < events.length; i++) {
      const ev = events[i];
      const startMatch = ev.match(/DTSTART(?:;.*?)?:(\d{8})/);
      const endMatch = ev.match(/DTEND(?:;.*?)?:(\d{8})/);

      if (startMatch && endMatch) {
        const startDate = new Date(
          `${startMatch[1].slice(0, 4)}-${startMatch[1].slice(4, 6)}-${startMatch[1].slice(6, 8)}T00:00:00`
        );
        const endDate = new Date(
          `${endMatch[1].slice(0, 4)}-${endMatch[1].slice(4, 6)}-${endMatch[1].slice(6, 8)}T00:00:00`
        );

        const bookingEnd = subDays(endDate, 1);
        if (startDate <= bookingEnd) {
          const intervalDates = eachDayOfInterval({
            start: startDate,
            end: bookingEnd,
          });
          bookedDates.push(
            ...intervalDates.map(
              (d) =>
                d.getFullYear() +
                "-" +
                String(d.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(d.getDate()).padStart(2, "0") +
                "T00:00:00"
            )
          );
        }
      }
    }

    return NextResponse.json({ dates: bookedDates, status: "success", count: bookedDates.length });
  } catch (err: any) {
    console.error("iCal API Error:", err);
    return NextResponse.json({ dates: [], status: "error", message: err.message || "Failed to fetch iCal" });
  }
}
