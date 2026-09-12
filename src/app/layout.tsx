import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { SearchFilterProvider } from "@/context/SearchFilterContext";

export const metadata: Metadata = {
  title: "Devapadmam Heritage Stay | Luxury Villas in Trivandrum",
  description: "Experience the cinematic allure of a bygone era. A sanctuary of heritage and timeless luxury in Kerala.",
};

export const viewport = {
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-foreground antialiased selection:bg-gold selection:text-white">
        <SearchFilterProvider>
          {children}
        </SearchFilterProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-YOUR_MEASUREMENT_ID_HERE"} />
    </html>
  );
}

