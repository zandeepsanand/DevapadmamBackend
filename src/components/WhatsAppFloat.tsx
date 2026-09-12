"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const whatsappUrl =
    "https://wa.me/918606783324?text=Hello!%20I'd%20like%20to%20enquire%20about%20Devapadmam%20Heritage%20Stay.";

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-50 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Devapadmam on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 relative"
      >
        {/* Soft pulse glow */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.897-.799-1.503-1.787-1.68-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.678-1.633-.929-2.236-.244-.588-.493-.508-.678-.517-.175-.009-.376-.009-.577-.009-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.513c0 1.483 1.079 2.915 1.23 3.116.15.2 2.124 3.243 5.145 4.549.719.311 1.281.497 1.719.636.723.23 1.38.198 1.9.12.58-.088 1.782-.728 2.033-1.432.251-.703.251-1.306.176-1.432-.076-.125-.276-.2-.577-.35zM12.04 21.785h-.002a9.78 9.78 0 0 1-4.99-1.365l-.358-.213-3.71.973.99-3.616-.233-.371a9.774 9.774 0 0 1-1.503-5.215C2.234 6.58 6.63 2.185 12.043 2.185c2.62 0 5.083 1.021 6.937 2.875a9.753 9.753 0 0 1 2.872 6.934c-.002 5.397-4.4 9.791-9.812 9.791zm0-18.002C7.387 3.783 3.597 7.573 3.597 12.227c0 1.628.463 3.22 1.341 4.606l.208.327-.589 2.152 2.202-.577.316.188a8.418 8.418 0 0 0 4.417 1.246c4.654 0 8.444-3.79 8.446-8.446a8.39 8.39 0 0 0-2.477-5.968 8.396 8.396 0 0 0-5.961-2.47z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-zinc-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
