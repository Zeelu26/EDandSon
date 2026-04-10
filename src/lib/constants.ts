export const BUSINESS = {
  name: "Ed & Son Home Improvements",
  shortName: "Ed & Son",
  tagline: "Crafting Exceptional Living Spaces",
  phone: ["908-267-7613", "908-923-1113"],
  email: "ewcpereira@outlook.com",
  hours: "Monday – Friday: 8:00 AM – 4:30 PM",
  hoursShort: "8 AM – 4:30 PM",
  yearsInBusiness: "10+",
  serviceAreas: [
    "Livingston, NJ",
    "Lebanon, NJ",
    "Morris County",
    "Somerset County",
    "Union County",
    "Hunterdon County",
  ],
  serviceAreasShort: "Livingston, NJ & Lebanon, NJ and Surrounding Areas",
  address: "Serving Central & Northern New Jersey",
} as const;

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  features: string[];
  image: string;
}

export const SERVICES: Service[] = [
  {
    slug: "kitchens",
    title: "Kitchen Remodeling",
    shortTitle: "Kitchens",
    description:
      "Transform the heart of your home with custom cabinetry, premium countertops, and thoughtful layouts designed for how you live and entertain.",
    features: [
      "Custom cabinetry & islands",
      "Countertop installation",
      "Backsplash & tile work",
      "Lighting & electrical upgrades",
    ],
    image: "/images/projects/vanity-1.jpg",
  },
  {
    slug: "bathrooms",
    title: "Bathroom Remodeling",
    shortTitle: "Bathrooms",
    description:
      "Elevate your daily routine with spa-inspired bathrooms featuring modern fixtures, elegant tile, and meticulous craftsmanship throughout.",
    features: [
      "Walk-in showers & tub surrounds",
      "Custom tile & stonework",
      "Vanity & fixture installation",
      "Complete bathroom overhauls",
    ],
    image: "/images/projects/bathroom-1.jpg",
  },
  {
    slug: "additions",
    title: "Home Additions",
    shortTitle: "Additions",
    description:
      "Expand your living space with seamlessly integrated additions that match your home's architecture and exceed your expectations.",
    features: [
      "Room additions",
      "Second-story additions",
      "Sunrooms & enclosed porches",
      "In-law suites",
    ],
    image: "/images/projects/tile-1.jpg",
  },
  {
    slug: "tile",
    title: "Tile & Stonework",
    shortTitle: "Tile",
    description:
      "From intricate mosaics to large-format installations, our tile work brings lasting beauty and precision to every surface.",
    features: [
      "Floor & wall tile",
      "Natural stone installation",
      "Mosaic & pattern work",
      "Waterproofing & prep",
    ],
    image: "/images/projects/tile-1.jpg",
  },
  {
    slug: "painting",
    title: "Interior & Exterior Painting",
    shortTitle: "Painting",
    description:
      "Professional painting services with premium materials and expert preparation for flawless, long-lasting finishes inside and out.",
    features: [
      "Interior painting",
      "Exterior painting",
      "Cabinet refinishing",
      "Surface preparation & repair",
    ],
    image: "/images/projects/shower-1.jpg",
  },
  {
    slug: "patios",
    title: "Patios & Outdoor Living",
    shortTitle: "Patios",
    description:
      "Create inviting outdoor spaces with custom patios, walkways, and hardscaping that extend your living area beyond four walls.",
    features: [
      "Paver patios & walkways",
      "Outdoor living areas",
      "Retaining walls",
      "Landscape hardscaping",
    ],
    image: "/images/projects/tile-2.jpg",
  },
  {
    slug: "sheetrock",
    title: "Sheetrock & Drywall",
    shortTitle: "Sheetrock",
    description:
      "Clean, precise drywall installation and finishing for new construction, renovations, and repair work that creates the perfect canvas.",
    features: [
      "New installation",
      "Repair & patching",
      "Texture matching",
      "Finishing & taping",
    ],
    image: "/images/projects/bathroom-2.jpg",
  },
  {
    slug: "garages",
    title: "Garage Renovations",
    shortTitle: "Garages",
    description:
      "Maximize your garage space with functional upgrades, storage solutions, and complete renovations that add value to your home.",
    features: [
      "Garage conversions",
      "Storage systems",
      "Flooring & finishing",
      "Insulation & climate control",
    ],
    image: "/images/projects/tile-3.jpg",
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const PROJECTS: Project[] = [
  { id: "1", title: "Spa-Inspired Master Bath", category: "Bathrooms", image: "/images/projects/bathroom-1.jpg", description: "Luxury master bathroom with walk-in shower, hexagon tile floor, and freestanding soaking tub with matte black fixtures" },
  { id: "2", title: "Marble Tub Surround", category: "Tile", image: "/images/projects/bathroom-2.jpg", description: "Elegant marble-look tile tub surround with matte black rain shower head and modern fixtures" },
  { id: "3", title: "Freestanding Tub Suite", category: "Bathrooms", image: "/images/projects/bathroom-3.jpg", description: "Spacious bathroom featuring freestanding soaking tub on polished stone tile flooring" },
  { id: "4", title: "Double Vanity Remodel", category: "Bathrooms", image: "/images/projects/vanity-1.jpg", description: "Custom double vanity with quartz countertop, matte black faucets, and industrial globe lighting" },
  { id: "5", title: "Stacked Tile Walk-In Shower", category: "Tile", image: "/images/projects/tile-1.jpg", description: "Floor-to-ceiling vertical stacked tile with built-in bench and recessed niche" },
  { id: "6", title: "Modern Glass Enclosure Shower", category: "Bathrooms", image: "/images/projects/shower-1.jpg", description: "Marble tile shower with barn-door glass enclosure, rain head, and black accent niche" },
  { id: "7", title: "Dual-Tone Shower Suite", category: "Bathrooms", image: "/images/projects/shower-2.jpg", description: "Two-tone marble and linear tile shower with ceiling-mount rain head and glass sliding door" },
  { id: "8", title: "Brick Pattern Tub Tile", category: "Tile", image: "/images/projects/tile-2.jpg", description: "Wood-look brick pattern tile surround with recessed storage niche" },
  { id: "9", title: "Full Bathroom Tile Installation", category: "Tile", image: "/images/projects/tile-3.jpg", description: "Complete shower and floor tile installation with built-in bench seat and mosaic floor detail" },
];

export const TESTIMONIALS = [
  {
    name: "Maria S.",
    location: "Livingston, NJ",
    text: "Ed and his team completely transformed our kitchen. The attention to detail was incredible, and they finished on schedule. We couldn't be happier with the result.",
    rating: 5,
  },
  {
    name: "James R.",
    location: "Lebanon, NJ",
    text: "Professional from start to finish. Our bathroom remodel exceeded every expectation. The tile work is absolutely stunning—everyone who visits comments on it.",
    rating: 5,
  },
  {
    name: "The Hendersons",
    location: "Morris County, NJ",
    text: "We hired Ed & Son for a major addition and they delivered flawless work. Great communication throughout the project and exceptional craftsmanship.",
    rating: 5,
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/track", label: "Track Quote" },
] as const;

export const PROJECT_TYPES = [
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Home Addition",
  "Tile Work",
  "Painting",
  "Patio / Outdoor",
  "Sheetrock / Drywall",
  "Garage Renovation",
  "General Remodeling",
  "Other",
] as const;
