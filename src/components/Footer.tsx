import Link from "next/link";
import { Globe, MapPin, Phone, Mail, Shield, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-black text-white/90 border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full gold-gradient-bg flex items-center justify-center text-white font-serif font-bold text-lg">
                D
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                DEVAPADMAM
              </span>
            </div>
            
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Restored luxury heritage stays in Trivandrum, Kerala. Experiential hospitality where royal traditional architecture meets modern luxury living.
            </p>

            <div className="flex items-center gap-3 pt-2 text-white/60">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:text-amber-300 hover:bg-white/20 transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:text-amber-300 hover:bg-white/20 transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>


          {/* Properties */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-amber-300">
              Our Heritage Stays
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <Link href="/villas/5" className="hover:text-white transition flex justify-between">
                  <span>Sreeramam Heritage Stay</span>
                  <span className="text-amber-300/80">From ₹6,500</span>
                </Link>
              </li>
              <li>
                <Link href="/villas/1" className="hover:text-white transition flex justify-between">
                  <span>Devapadmam 6 BHK Stay</span>
                  <span className="text-amber-300/80">₹25,000</span>
                </Link>
              </li>
              <li>
                <Link href="/villas/4" className="hover:text-white transition flex justify-between">
                  <span>Devapadmam 3 BHK (1st Floor)</span>
                  <span className="text-amber-300/80">₹8,500</span>
                </Link>
              </li>
              <li>
                <Link href="/villas/2" className="hover:text-white transition flex justify-between">
                  <span>Devapadmam Minnaaram</span>
                  <span className="text-amber-300/80">₹7,500</span>
                </Link>
              </li>
              <li>
                <Link href="/villas/3" className="hover:text-white transition flex justify-between">
                  <span>Naarayaneeyam 2 BHK</span>
                  <span className="text-amber-300/80">₹3,000</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Guest Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-amber-300">
              Guest Experience
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li><Link href="/#calendar" className="hover:text-white transition">Airbnb Live iCal Availability</Link></li>
              <li><Link href="/#villas" className="hover:text-white transition">Heritage Architecture Tour</Link></li>
              <li><Link href="/#villas" className="hover:text-white transition">Private Chef & Butler Services</Link></li>
              <li><Link href="/#villas" className="hover:text-white transition">Cancellation Policies & Refunds</Link></li>
            </ul>
          </div>

          {/* Concierge & Location */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-amber-300">
              Private Concierge
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>Devapadmam, Near Lulu Mall, Thiruvananthapuram, Kerala, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <a href="tel:+918606783324" className="hover:text-white transition">+91 86067 83324</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <a href="tel:+919744852522" className="hover:text-white transition">+91 97448 52522</a>
              </div>
              <div className="pt-1">
                <a
                  href="https://wa.me/918606783324?text=Hello!%20I'd%20like%20to%20enquire%20about%20Devapadmam%20Heritage%20Stay."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium transition text-xs"
                >
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Devapadmam Heritage Stay. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/" className="hover:text-white transition">Site Map</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
