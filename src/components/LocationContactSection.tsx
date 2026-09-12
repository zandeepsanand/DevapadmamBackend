"use client";

import { MapPin, Phone, MessageSquare, ExternalLink, Navigation } from "lucide-react";

export function LocationContactSection() {
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Devapadmam+Heritage+Stay+Thiruvananthapuram&query_place_id=ChIJDccHH9O9BTsRDegtr0lEZOw";
  const whatsappUrl =
    "https://wa.me/918606783324?text=Hello!%20I'd%20like%20to%20enquire%20about%20Devapadmam%20Heritage%20Stay.";

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* 1. Main Get In Touch Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-zinc-900/5 mb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-[11px] font-sans font-semibold tracking-[0.25em] text-amber-600 dark:text-amber-400 uppercase block">
              Get In Touch
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-zinc-900 dark:text-white font-normal leading-tight">
              Planning your visit to Thiruvananthapuram?
            </h2>
            <p className="text-sm sm:text-base font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We are here to help you select the ideal stay for your family. Get in touch with us on WhatsApp for bookings, custom requirements, or local travel guides.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0 justify-center">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-full text-sm font-medium hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs"
            >
              <Navigation className="w-4 h-4 text-amber-500" />
              <span>View on Google Maps</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full text-sm font-medium hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Interactive Google Maps & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Left: Location & Contact Cards */}
        <div className="lg:col-span-1 flex flex-col justify-between gap-6">
          
          {/* Address Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Our Location</h3>
                <span className="text-[11px] text-zinc-500">Near Lulu Mall, Trivandrum</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
              Devapadmam compound, Ammaveeduthoppu, Oruvathilkotta, Anayara P.O., Near Lulu Mall, Thiruvananthapuram, Kerala, India
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline pt-2"
            >
              <span>Get Driving Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Direct Phone Support Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Direct Line</h3>
                <span className="text-[11px] text-zinc-500">Available 24/7 for Guest Inquiries</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="tel:+918606783324"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-600 transition flex items-center justify-between"
              >
                <span>+91 86067 83324</span>
                <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">Call Now</span>
              </a>
              <a
                href="tel:+919744852522"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-600 transition flex items-center justify-between"
              >
                <span>+91 97448 52522</span>
                <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">Support</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right: Embedded Google Maps */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-md min-h-[360px] relative bg-zinc-100 dark:bg-zinc-800">
          <iframe
            title="Devapadmam Heritage Stay Google Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8943702598375!2d76.9082725!3d8.5096538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bd331f07470d%3A0xeb64446daf2de80d!2sDevapadmam%20Heritage%20Stay!5e0!3m2!1sen!2sin!4v1713280000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "360px" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
          <div className="absolute top-4 left-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-sm flex items-center gap-1.5 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Devapadmam Heritage Stay • Trivandrum</span>
          </div>
        </div>

      </div>

    </section>
  );
}
