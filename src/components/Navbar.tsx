"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-20 flex items-center px-6 md:px-10 justify-between transition-colors duration-300">
      <Link href="/">
        <div className="font-bold text-primary text-xl tracking-tight">devapadmam</div>
      </Link>
      
      {/* Search Pill */}
      <div className="hidden md:flex items-center shadow-sm rounded-full border border-border pl-2 pr-2 py-2 bg-background hover:shadow-md transition-shadow cursor-pointer">
        <div className="font-semibold px-4 text-sm border-r border-border">Anywhere</div>
        <div className="font-semibold px-4 text-sm border-r border-border">Any week</div>
        <div className="text-muted-foreground px-4 text-sm">Add guests</div>
        <div className="bg-primary text-primary-foreground p-2 rounded-full ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>

      {/* User Menu */}
      <div className="flex items-center gap-2 border border-border rounded-full p-1 pl-3 hover:shadow-md transition-shadow cursor-pointer bg-background">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 selected 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
      </div>
    </header>
  );
}
