# Frontend API Integration Details

This document outlines the current state of the frontend API integration connecting the Next.js 15 frontend to the Django backend for the Devapadmam Booking platform.

## 1. Overview
The frontend connects to a local Django backend running at `http://127.0.0.1:8000`. The integration relies completely on Next.js 15 Server Components and uses the native `fetch` API. This server-side rendering architecture ensures fast page loads and SEO-friendly responses.

## 2. Endpoints and Features Integrated

### A. Villas Listing (`src/app/page.tsx`)
*   **Endpoint / URL**: `http://127.0.0.1:8000/api/villas/`
*   **Method**: `GET`
*   **Caching Strategy**: `cache: "no-store"`. Next.js caching is completely bypassed here, ensuring that any availability or pricing updates on the backend show immediately on the homepage.
*   **Functionality**:
    *   Fetches the array of available villas from the backend.
    *   Maps the Django payload (`id`, `name`, `price_per_night`, `featured_image`) onto the `VillaCardProps` expected by the frontend UI.
    *   Renders the `VillaCard` elements dynamically in a responsive grid layout.

### B. Villa Detail Page (`src/app/villas/[id]/page.tsx`)
*   **Endpoint / URL**: `http://127.0.0.1:8000/api/villas/${id}/`
*   **Method**: `GET`
*   **Caching Strategy**: `cache: "no-store"`.
*   **Functionality**:
    *   Fetches detailed data regarding a specific property using the dynamic `[id]` parameter.
    *   It uses `featured_image` from the backend and complements it with high-quality fallback aesthetics for a full 5-image bento-grid gallery layout simulating Airbnb.
    *   Fills out components like "Max Guests", description, and passes the base price (`price_per_night`) to the `BookingWidget`.

### C. iCal Synchronization & Availability Parsing
*   **Function**: `fetchBookedDates(icalUrl: string)` (Located in `src/app/villas/[id]/page.tsx`)
*   **Caching Strategy**: `{ next: { revalidate: 3600 } }`. The iCal parsing results are cached for 1 hour (3600 seconds) to avoid stressing the external server while ensuring relatively real-time sync.
*   **Functionality**:
    *   When the backend returns an `ical_url` for a property, the server-component fetches the raw `.ics` file.
    *   Uses a custom parsing script relying on text splitting (`BEGIN:VEVENT`) and Regex matching (`DTSTART` / `DTEND`).
    *   Dates are extracted and parsed into proper boundary dates.
    *   Using the `date-fns` library (`eachDayOfInterval`, `subDays`), the script interpolates the dates between the exact start and end check-ins to generate a clean array of `bookedDateStrings` (ISO strings).
    *   These strings are seamlessly passed to the `BookingWidget` (client component) which then disables these specific dates on the UI calendar.

## 3. Libraries Used in the Data Flow
*   **Native `fetch`**: Standard Web API for asynchronous network requests.
*   **`date-fns`**: Specialized utility (`eachDayOfInterval`, `subDays`) to process and handle the exact interval arrays for blackout dates in JS.

## 4. Next Steps / Pending
*   Implement POST requests for capturing user checkout/booking flow details on the `BookingWidget` to save a booking into Django.
*   Implement authentication endpoints if users need to log in to manage their bookings.
*   Replace standard HTTP links with HTTPS endpoints when deploying for production environments across the `.env` context.
