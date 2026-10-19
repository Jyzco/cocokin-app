export interface MenuItem {
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface TimeSlot {
  time: string;
  label: string; // Pagi, Siang, Sore, Malam
  crowd: 'sepi' | 'sedang' | 'ramai';
  crowdNote: string;
}

export interface Place {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Cafe' | 'Resto' | 'Working Space' | 'Outdoor & Wisata';
  city: string;
  area: string;
  address: string;
  distanceKm: number;
  travelTimeMin: number;
  avgBudget: number;
  budgetRange: string;
  rating: number;
  ratingCount: number;
  suitabilityScore: number; // 0 - 100
  matchReason: string;
  posterImage: string; // 2:3 ratio
  coverImage: string;  // 16:9 ratio
  videoUrl: string;
  videoThumbnail: string;
  videoDuration: string;
  vibeSummary: string; // e.g. "Cahaya hangat • Akustik tenang • Meja luas"
  crowdStatus: 'sepi' | 'sedang' | 'ramai';
  crowdLabel: string;
  lastUpdated: string; // e.g. "Diperbarui 12 menit lalu"
  weather: {
    temp: string;
    condition: string;
  };
  atmosphere: string[];
  facilities: string[];
  activities: string[];
  openingHours: string;
  menuUpdatedDate: string;
  menuHighlights: MenuItem[];
  timeSlots: TimeSlot[];
}

export interface UserFilter {
  activity: string;
  category: string;
  maxBudget: number;   // IDR
  maxDistance: number; // km
  atmosphere: string[];
  facilities: string[];
}

export interface VisitPlan {
  id: string;
  placeId: string;
  placeName: string;
  placeImage: string;
  placeArea: string;
  placeAddress: string;
  distanceKm: number;
  date: string;
  timeSlot: string;
  partySize: number;
  notes: string;
  createdAt: string;
}

export interface CurationGuide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  summary: string;
  PlaceIds?: string[];
  highlights: string[];
}
