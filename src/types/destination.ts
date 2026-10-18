export type CategoryType =
  | 'All'
  | 'Attractions'
  | 'Restaurants'
  | 'Hotels'
  | 'Nature'
  | 'Museums'
  | 'Activities';

export type SortOption =
  | 'recommended'
  | 'name_asc'
  | 'name_desc'
  | 'rating_desc';

export interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: CategoryType;
  subCategory?: string;
  rating: number;
  reviewsCount?: number;
  description: string;
  image: string;
  galleryImages?: string[];
  address: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  features?: string[];
  openingHours?: string;
  source?: 'geoapify' | 'live-osm' | 'curated';
  websiteUrl?: string;
}

export interface FilterOptions {
  searchQuery: string;
  category: CategoryType;
  minRating: number;
  location: string;
  sortBy: SortOption;
}

export interface TripItem {
  destination: Destination;
  addedAt: string; // ISO date string
  notes?: string;
}

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}
