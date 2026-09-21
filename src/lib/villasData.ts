export interface VillaData {
  id: string;
  name: string;
  tagline: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  description: string;
  featuredImage: string;
  galleryImages: string[];
  icalUrl: string;
  highlights: string[];
  amenities: { name: string; icon: string }[];
}

// 30 authentic photos of Devapadmam Heritage Stay
export const DEVAPADMAM_6BHK_ALL_IMAGES: string[] = [
  "/images/devapadmam6bhk/dev2.jpeg",
  "/images/devapadmam6bhk/dev1.jpeg",
  "/images/devapadmam6bhk/dev23.jpeg",
  "/images/devapadmam6bhk/dev22.jpeg",
  "/images/devapadmam6bhk/dev28.jpeg",
  "/images/devapadmam6bhk/dev14.jpeg",
  "/images/devapadmam6bhk/dev10.jpeg",
  "/images/devapadmam6bhk/dev20.jpeg",
  "/images/devapadmam6bhk/dev3.jpeg",
  "/images/devapadmam6bhk/dev4.jpeg",
  "/images/devapadmam6bhk/dev5.jpeg",
  "/images/devapadmam6bhk/dev6.jpeg",
  "/images/devapadmam6bhk/dev8.jpeg",
  "/images/devapadmam6bhk/dev9.jpeg",
  "/images/devapadmam6bhk/dev11.jpeg",
  "/images/devapadmam6bhk/dev13.jpeg",
  "/images/devapadmam6bhk/dev15.jpeg",
  "/images/devapadmam6bhk/dev16.jpeg",
  "/images/devapadmam6bhk/dev17.jpeg",
  "/images/devapadmam6bhk/dev18.jpeg",
  "/images/devapadmam6bhk/dev19.jpeg",
  "/images/devapadmam6bhk/dev21.jpeg",
  "/images/devapadmam6bhk/dev25.jpeg",
  "/images/devapadmam6bhk/dev26.jpeg",
  "/images/devapadmam6bhk/dev27.jpeg",
  "/images/devapadmam6bhk/dev29.jpeg",
  "/images/devapadmam6bhk/dev30.jpeg",
  "/images/devapadmam6bhk/dev00.avif",
  "/images/devapadmam6bhk/dev01.avif",
  "/images/devapadmam6bhk/dev02.avif",
];

// 3 BHK First Floor curated sequence (offset & focused on upper-floor living, bedrooms & details)
export const DEVAPADMAM_3BHK_ALL_IMAGES: string[] = [
  "/images/devapadmam6bhk/dev28.jpeg",
  "/images/devapadmam6bhk/dev22.jpeg",
  "/images/devapadmam6bhk/dev14.jpeg",
  "/images/devapadmam6bhk/dev23.jpeg",
  "/images/devapadmam6bhk/dev10.jpeg",
  "/images/devapadmam6bhk/dev20.jpeg",
  "/images/devapadmam6bhk/dev15.jpeg",
  "/images/devapadmam6bhk/dev16.jpeg",
  "/images/devapadmam6bhk/dev17.jpeg",
  "/images/devapadmam6bhk/dev18.jpeg",
  "/images/devapadmam6bhk/dev19.jpeg",
  "/images/devapadmam6bhk/dev21.jpeg",
  "/images/devapadmam6bhk/dev25.jpeg",
  "/images/devapadmam6bhk/dev26.jpeg",
  "/images/devapadmam6bhk/dev27.jpeg",
  "/images/devapadmam6bhk/dev29.jpeg",
  "/images/devapadmam6bhk/dev30.jpeg",
  "/images/devapadmam6bhk/dev1.jpeg",
  "/images/devapadmam6bhk/dev2.jpeg",
  "/images/devapadmam6bhk/dev3.jpeg",
  "/images/devapadmam6bhk/dev4.jpeg",
  "/images/devapadmam6bhk/dev5.jpeg",
  "/images/devapadmam6bhk/dev6.jpeg",
  "/images/devapadmam6bhk/dev8.jpeg",
  "/images/devapadmam6bhk/dev9.jpeg",
  "/images/devapadmam6bhk/dev11.jpeg",
  "/images/devapadmam6bhk/dev13.jpeg",
  "/images/devapadmam6bhk/dev00.avif",
  "/images/devapadmam6bhk/dev01.avif",
  "/images/devapadmam6bhk/dev02.avif",
];

export const NAARAYANEEYAM_ALL_IMAGES: string[] = [
  "/images/naarayaneeyam2bhk/narayaneeyam02.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam04.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam01.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam03.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam05.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam06.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam07.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam08.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam09.avif",
  "/images/naarayaneeyam2bhk/narayaneeyam10.avif",
];

export const LUXURY_VILLAS: VillaData[] = [
  {
    id: "1",
    name: "Devapadmam Heritage Stay (6 BHK)",
    tagline: "The Grand Royal Mansion (Entire Estate)",
    location: "Thiruvananthapuram, Kerala",
    pricePerNight: 25000,
    rating: 5.0,
    reviewsCount: 88,
    maxGuests: 16,
    bedrooms: 6,
    beds: 8,
    baths: 6,
    description: "Experience authentic royal heritage in this magnificent 6 BHK restored estate. Set amid lush private gardens, Devapadmam Heritage Stay offers sprawling teakwood verandas, a traditional inner courtyard (Naalukettu), private lotus pond view, swimming pool access, and world-class bespoke luxury service.",
    featuredImage: "/images/devapadmam6bhk/dev2.jpeg",
    galleryImages: DEVAPADMAM_6BHK_ALL_IMAGES,
    icalUrl: "https://www.airbnb.co.in/calendar/ical/1281872170914882245.ics?t=c5f706c5884249be9311bb50c1beef53",
    highlights: [
      "Full 6 BHK grand estate with private entrance & Naalukettu courtyard",
      "Accommodates up to 16 guests with 6 air-conditioned suites",
      "Private swimming pool & sprawling manicured heritage lawn",
      "Dedicated personal butler, chef service & traditional breakfast"
    ],
    amenities: [
      { name: "Private Pool", icon: "Waves" },
      { name: "Fast Wi-Fi (300Mbps)", icon: "Wifi" },
      { name: "Air Conditioning (All 6 BR)", icon: "Wind" },
      { name: "Full Gourmet Kitchen", icon: "Utensils" },
      { name: "Free On-Site Parking", icon: "Car" },
      { name: "Heritage Spa Service", icon: "Sparkles" },
      { name: "HD Smart TV", icon: "Tv" },
      { name: "Daily Breakfast Included", icon: "Coffee" }
    ]
  },
  {
    id: "4",
    name: "Devapadmam Heritage Stay (3 BHK)",
    tagline: "First Floor Heritage Haven (Up to 10 Guests)",
    location: "Thiruvananthapuram, Kerala",
    pricePerNight: 8500,
    rating: 5.0,
    reviewsCount: 88,
    maxGuests: 10,
    bedrooms: 3,
    beds: 5,
    baths: 3,
    description: "Enjoy the exclusive first floor of Devapadmam Heritage Stay as a private 3 BHK retreat accommodating up to 10 guests. Featuring 3 spacious air-conditioned heritage bedrooms, private balcony views of the tropical gardens, traditional timber architecture, and seamless modern comforts at an exceptional direct rate.",
    featuredImage: "/images/devapadmam6bhk/dev28.jpeg",
    galleryImages: DEVAPADMAM_3BHK_ALL_IMAGES,
    icalUrl: "https://www.airbnb.co.in/calendar/ical/1281872170914882245.ics?t=c5f706c5884249be9311bb50c1beef53",
    highlights: [
      "Private first-floor sanctuary with dedicated staircase access",
      "Spacious accommodation for up to 10 guests across 3 bedrooms",
      "Rich Kerala teakwood interiors and balcony with garden views",
      "Complimentary high-speed Wi-Fi & daily housekeeping"
    ],
    amenities: [
      { name: "Fast Wi-Fi", icon: "Wifi" },
      { name: "Air Conditioning (All 3 BR)", icon: "Wind" },
      { name: "Private Balcony & Lounge", icon: "Sun" },
      { name: "Tea & Coffee Maker", icon: "Coffee" },
      { name: "Free On-Site Parking", icon: "Car" },
      { name: "HD Smart TV", icon: "Tv" }
    ]
  },
  {
    id: "2",
    name: "Devapadmam Minnaaram (2 BHK)",
    tagline: "Serene Heritage Cottage",
    location: "Thiruvananthapuram, Kerala",
    pricePerNight: 5500,
    rating: 5.0,
    reviewsCount: 88,
    maxGuests: 6,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    description: "An intimate, serene retreat featuring classical Kerala woodwork and warm ambiance. Ideal for couples, small families, or digital nomads seeking peace, Devapadmam Minnaaram blends historic charm with plush modern mattresses and high-speed internet.",
    featuredImage: "/images/minnaram2bhk/minnaram2.jpeg",
    galleryImages: [
      "/images/minnaram2bhk/minnaram2.jpeg",
      "/images/minnaram2bhk/minnaram.avif",
      "/images/minnaram2bhk/minnaram10.avif",
      "/images/minnaram2bhk/minnaram11.avif",
      "/images/minnaram2bhk/minnaram12.avif",
      "/images/minnaram2bhk/minnaram13.avif",
      "/images/minnaram2bhk/minnaram14.avif",
      "/images/minnaram2bhk/minnaram17.avif",
      "/images/minnaram2bhk/minnaram19.avif",
      "/images/minnaram2bhk/minnaram22.avif",
      "/images/minnaram2bhk/minnaram24.avif",
      "/images/minnaram2bhk/minnaram26.avif"
    ],
    icalUrl: "https://www.airbnb.co.in/calendar/ical/1281872170914882245.ics?t=c5f706c5884249be9311bb50c1beef53",
    highlights: [
      "Charming wooden patio overlooking lush greenery",
      "Self check-in with digital keycode access",
      "Dedicated high-speed remote work desk",
      "Quiet residential neighborhood near Trivandrum landmarks"
    ],
    amenities: [
      { name: "Fast Wi-Fi", icon: "Wifi" },
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Private Patio", icon: "Sun" },
      { name: "Equipped Kitchenette", icon: "Utensils" },
      { name: "Free Parking", icon: "Car" },
      { name: "Washing Machine", icon: "Shirt" }
    ]
  },
  {
    id: "3",
    name: "Devapadmam Naarayaneeyam (2 BHK)",
    tagline: "Luxury Finished 2BHK • First Floor (500m to Lulu Mall)",
    location: "Near Lulu Mall, Thiruvananthapuram",
    pricePerNight: 3500,
    rating: 5.0,
    reviewsCount: 88,
    maxGuests: 6,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    description: `Luxury finished 2BHK in a prime Thiruvananthapuram location.

• PLEASE NOTE THAT THE LISTED AIRBNB IS AT THE FIRST FLOOR.
• 500m away from Lulu Mall
• 5 km from Padmanabhaswamy Temple
• Easy access to Technopark, KIMS Hospital, and Lulu Mall
• Shedded parking is not available as the property is situated at the main roadside; you can park conveniently right in front of the main gate of the property.
• Modern amenities include high-speed Wi-Fi, Android Smart TV, bar equipments, modern kitchen, power backup, and balcony view.`,
    featuredImage: "/images/naarayaneeyam2bhk/narayaneeyam02.avif",
    galleryImages: NAARAYANEEYAM_ALL_IMAGES,
    icalUrl: "https://www.airbnb.co.in/calendar/ical/1281872170914882245.ics?t=c5f706c5884249be9311bb50c1beef53",
    highlights: [
      "Prime location: 500m to Lulu Mall & 5km to Padmanabhaswamy Temple",
      "Easy connectivity to Technopark and KIMS Hospital",
      "Private first-floor layout with relaxing balcony view",
      "Android Smart TV, high-speed Wi-Fi, bar equipments & power backup",
      "Modern kitchen & convenient parking right in front of main gate"
    ],
    amenities: [
      { name: "Fast Wi-Fi", icon: "Wifi" },
      { name: "Android Smart TV", icon: "Tv" },
      { name: "Air Conditioning", icon: "Wind" },
      { name: "Modern Kitchen", icon: "Utensils" },
      { name: "Bar Equipments", icon: "Sparkles" },
      { name: "Power Backup", icon: "Sparkles" },
      { name: "Balcony View", icon: "Sun" },
      { name: "Front Gate Parking", icon: "Car" }
    ]
  }
];

export function getVillaById(id: string): VillaData | undefined {
  return LUXURY_VILLAS.find((v) => v.id === id || v.id === String(id));
}
