import Link from "next/link";
import { Globe, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-muted/30 border-t border-border mt-auto pt-12 pb-6 px-4 md:px-10 lg:px-20 text-[15px]">
      <div className="max-w-[2520px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mb-12">
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground tracking-tight">Support</h4>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Help Centre</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Safety information</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Cancellation options</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Our COVID-19 Response</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Report a neighbourhood concern</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground tracking-tight">Devapadmam Heritage</h4>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">The Heritage Story</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Gallery</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Location & Surroundings</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Experiences</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground tracking-tight">Hosting</h4>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Devapadmam your sustainable stay</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Host responsibilities</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Explore hosting resources</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Visit our community forum</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground tracking-tight">Contact Us</h4>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition hover:underline">Trivandrum, Kerala, India</Link>
            <Link href="mailto:info@devapadmam.com" className="text-muted-foreground hover:text-foreground transition hover:underline">info@devapadmam.com</Link>
            <Link href="tel:+919999999999" className="text-muted-foreground hover:text-foreground transition hover:underline">+91 99999 99999</Link>
          </div>

        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-[14px] text-muted-foreground">
            <span>© {new Date().getFullYear()} Devapadmam Heritage Stay</span>
            <span className="hidden md:inline">·</span>
            <Link href="/" className="hover:text-foreground transition hover:underline">Privacy</Link>
            <span className="hidden md:inline">·</span>
            <Link href="/" className="hover:text-foreground transition hover:underline">Terms</Link>
            <span className="hidden md:inline">·</span>
            <Link href="/" className="hover:text-foreground transition hover:underline">Sitemap</Link>
          </div>

          <div className="flex items-center gap-4 text-foreground">
            <button className="flex items-center gap-2 text-[14px] font-semibold hover:opacity-80 transition">
              <Globe className="w-4 h-4" />
              <span>English (IN)</span>
            </button>
            <button className="flex items-center gap-2 text-[14px] font-semibold hover:opacity-80 transition">
              <span>₹</span>
              <span>INR</span>
            </button>
            
            <div className="flex items-center gap-3 ml-4">
              <Link href="#" className="hover:opacity-70 transition p-1 text-foreground">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
              <Link href="#" className="hover:opacity-70 transition p-1 text-foreground">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
              <Link href="#" className="hover:opacity-70 transition p-1 text-foreground">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
