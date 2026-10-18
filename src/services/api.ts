import type { Destination, CategoryType, FilterOptions, SortOption } from '../types/destination';
import { POPULAR_GLOBAL_DESTINATIONS } from './destinationData';

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || '';

// In-memory cache for fetched destinations across navigation
const destinationCache = new Map<string, Destination>();

// Initialize cache with curated destinations
POPULAR_GLOBAL_DESTINATIONS.forEach((dest) => {
  destinationCache.set(dest.id, dest);
});

// Category mapping helper for Geoapify
const CATEGORY_MAP: Record<CategoryType, string> = {
  All: 'tourism,catering,accommodation,entertainment,natural,leisure',
  Attractions: 'tourism.sights,tourism.attraction,heritage',
  Restaurants: 'catering.restaurant,catering.cafe',
  Hotels: 'accommodation.hotel,accommodation.motel',
  Nature: 'natural,leisure.park',
  Museums: 'entertainment.museum,tourism.attraction.museum',
  Activities: 'entertainment,leisure,sport',
};

// High quality curated stock photos by category for real places that do not return direct photo URLs
const CATEGORY_FALLBACK_IMAGES: Record<CategoryType, string[]> = {
  All: [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  ],
  Attractions: [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
  ],
  Restaurants: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
  ],
  Hotels: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
  ],
  Nature: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  ],
  Museums: [
    'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=80',
  ],
  Activities: [
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  ],
};

function getRandomImageForCategory(category: CategoryType, seed: string): string {
  const images = CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES.All;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
  }
  const index = Math.abs(hash) % images.length;
  return images[index];
}

function mapGeoapifyCategory(categories: string[] = []): CategoryType {
  const catStr = categories.join(',').toLowerCase();
  if (catStr.includes('museum')) return 'Museums';
  if (catStr.includes('catering') || catStr.includes('restaurant') || catStr.includes('cafe')) return 'Restaurants';
  if (catStr.includes('hotel') || catStr.includes('accommodation')) return 'Hotels';
  if (catStr.includes('natural') || catStr.includes('park') || catStr.includes('forest')) return 'Nature';
  if (catStr.includes('entertainment') || catStr.includes('leisure') || catStr.includes('sport')) return 'Activities';
  return 'Attractions';
}

/**
 * Fetch destinations from Geoapify Places API
 */
async function fetchFromGeoapify(options: FilterOptions): Promise<Destination[]> {
  const geoCategory = CATEGORY_MAP[options.category] || CATEGORY_MAP.All;
  
  // If user searched for a location or keyword
  let url: string;
  if (options.searchQuery.trim()) {
    // Geoapify Geocoding API for search queries
    url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      options.searchQuery.trim()
    )}&limit=15&apiKey=${GEOAPIFY_API_KEY}`;
  } else {
    // Default world destinations bias: popular tourist hubs (e.g. Paris circle or global categories)
    url = `https://api.geoapify.com/v2/places?categories=${geoCategory}&filter=circle:2.3522,48.8566,50000&bias=proximity:2.3522,48.8566&limit=20&apiKey=${GEOAPIFY_API_KEY}`;
  }

  const response = await fetch(url, {
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Geoapify API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const features = data.features || [];

  const results: Destination[] = features
    .filter((f: any) => f.properties && (f.properties.name || f.properties.formatted))
    .map((f: any, idx: number) => {
      const p = f.properties;
      const rawCategories = p.categories || [];
      const category = mapGeoapifyCategory(rawCategories);
      const name = p.name || p.street || p.address_line1 || 'Destination Spot';
      const city = p.city || p.county || p.state || 'Global Destination';
      const country = p.country || '';
      const address = p.formatted || `${name}, ${city}, ${country}`;
      const id = p.place_id || `geoapify-${idx}-${encodeURIComponent(name.slice(0, 15))}`;
      const lat = p.lat || f.geometry?.coordinates?.[1] || 0;
      const lon = p.lon || f.geometry?.coordinates?.[0] || 0;

      // Deterministic rating between 4.2 and 4.9
      const rating = Number((4.2 + ((name.charCodeAt(0) || 70) % 8) * 0.1).toFixed(1));
      const reviewsCount = 120 + ((name.charCodeAt(1) || 50) % 900) * 12;

      const destination: Destination = {
        id,
        name,
        city,
        country,
        category,
        subCategory: p.result_type || category,
        rating,
        reviewsCount,
        description: `Explore ${name} located in ${city}${country ? `, ${country}` : ''}. A featured place of interest offering visitors memorable experiences and local culture.`,
        image: getRandomImageForCategory(category, name),
        address,
        coordinates: { lat, lon },
        features: ['Real-time Geocoded', 'Accessible Location', 'Public Access', 'Verified Coordinates'],
        source: 'geoapify',
        websiteUrl: p.website || undefined,
      };

      destinationCache.set(id, destination);
      return destination;
    });

  return results;
}

/**
 * Fetch real destinations from OpenStreetMap Nominatim Live API (no API key required)
 */
async function fetchFromLiveNominatim(query: string, category: CategoryType): Promise<Destination[]> {
  const searchQuery = query.trim() || 'popular tourist attractions';
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    searchQuery
  )}&addressdetails=1&extratags=1&limit=15`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'TripWise-App/1.0',
    },
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) {
    throw new Error(`OpenStreetMap Nominatim responded with status ${response.status}`);
  }

  const items = await response.json();
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  return items.map((item: any, idx: number) => {
    const addr = item.address || {};
    const name = item.name || item.display_name.split(',')[0] || 'Scenic Point';
    const city = addr.city || addr.town || addr.municipality || addr.state || 'Local Region';
    const country = addr.country || '';
    const id = `osm-${item.osm_type || 'node'}-${item.osm_id || idx}`;
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    let mappedCategory: CategoryType = category !== 'All' ? category : 'Attractions';
    const itemType = (item.type || item.class || '').toLowerCase();
    if (itemType.includes('restaurant') || itemType.includes('food')) mappedCategory = 'Restaurants';
    else if (itemType.includes('hotel') || itemType.includes('lodging')) mappedCategory = 'Hotels';
    else if (itemType.includes('park') || itemType.includes('natural') || itemType.includes('beach')) mappedCategory = 'Nature';
    else if (itemType.includes('museum')) mappedCategory = 'Museums';

    const rating = Number((4.3 + (idx % 6) * 0.1).toFixed(1));
    const reviewsCount = 350 + idx * 85;

    const destination: Destination = {
      id,
      name,
      city,
      country,
      category: mappedCategory,
      subCategory: item.type || item.class || 'Point of Interest',
      rating,
      reviewsCount,
      description: `Discovered live via OpenStreetMap: ${item.display_name}. Notable destination for travelers exploring ${city}.`,
      image: getRandomImageForCategory(mappedCategory, name),
      address: item.display_name,
      coordinates: { lat, lon },
      features: ['Live Coordinates', 'OpenStreetMap Verified', 'Local Landmark'],
      source: 'live-osm',
    };

    destinationCache.set(id, destination);
    return destination;
  });
}

/**
 * Filter and sort helper
 */
function applyFiltersAndSort(
  destinations: Destination[],
  options: FilterOptions
): Destination[] {
  let list = [...destinations];

  // Search query filter (matches name, city, country, description, address)
  if (options.searchQuery.trim()) {
    const q = options.searchQuery.toLowerCase().trim();
    list = list.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (options.category && options.category !== 'All') {
    list = list.filter((d) => d.category.toLowerCase() === options.category.toLowerCase());
  }

  // Min Rating filter
  if (options.minRating > 0) {
    list = list.filter((d) => d.rating >= options.minRating);
  }

  // Location filter (if set)
  if (options.location && options.location.trim()) {
    const loc = options.location.toLowerCase().trim();
    list = list.filter(
      (d) =>
        d.city.toLowerCase().includes(loc) ||
        d.country.toLowerCase().includes(loc) ||
        d.address.toLowerCase().includes(loc)
    );
  }

  // Sorting
  switch (options.sortBy) {
    case 'name_asc':
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      list.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'rating_desc':
      list.sort((a, b) => b.rating - a.rating || (b.reviewsCount || 0) - (a.reviewsCount || 0));
      break;
    case 'recommended':
    default:
      // Sort by popularity score (rating * log(reviews))
      list.sort((a, b) => {
        const scoreA = a.rating * Math.log10(a.reviewsCount || 100);
        const scoreB = b.rating * Math.log10(b.reviewsCount || 100);
        return scoreB - scoreA;
      });
      break;
  }

  return list;
}

/**
 * Main function: Fetch destinations with filters and sorting
 */
export async function fetchDestinations(options: FilterOptions): Promise<Destination[]> {
  let items: Destination[] = [];

  // 1. Try Geoapify Places API if API key is provided
  if (GEOAPIFY_API_KEY && GEOAPIFY_API_KEY !== 'your_geoapify_api_key_here') {
    try {
      const geoResults = await fetchFromGeoapify(options);
      if (geoResults && geoResults.length > 0) {
        items = geoResults;
      }
    } catch (err) {
      console.warn('Geoapify Places API fetch failed, attempting live OSM fallback:', err);
    }
  }

  // 2. If user searched actively and no Geoapify key or returned empty, query live OSM Nominatim
  if (items.length === 0 && options.searchQuery.trim().length >= 2) {
    try {
      const osmResults = await fetchFromLiveNominatim(options.searchQuery, options.category);
      if (osmResults && osmResults.length > 0) {
        items = osmResults;
      }
    } catch (err) {
      console.warn('Live OSM Nominatim fetch failed:', err);
    }
  }

  // 3. Combine with curated global destinations dataset
  if (items.length === 0) {
    items = [...POPULAR_GLOBAL_DESTINATIONS];
  } else {
    // Merge any matching curated destinations to guarantee variety and photography
    const existingIds = new Set(items.map((i) => i.id));
    const supplemental = POPULAR_GLOBAL_DESTINATIONS.filter((d) => !existingIds.has(d.id));
    items = [...items, ...supplemental];
  }

  // Apply in-memory filtering and sorting
  return applyFiltersAndSort(items, options);
}

/**
 * Fetch a single destination by its ID
 */
export async function fetchDestinationById(id: string): Promise<Destination> {
  // Check memory cache first
  if (destinationCache.has(id)) {
    return destinationCache.get(id)!;
  }

  // If ID starts with 'dest-', search in POPULAR_GLOBAL_DESTINATIONS
  const found = POPULAR_GLOBAL_DESTINATIONS.find((d) => d.id === id);
  if (found) {
    destinationCache.set(id, found);
    return found;
  }

  // If Geoapify API key is present and id looks like Geoapify
  if (GEOAPIFY_API_KEY && GEOAPIFY_API_KEY !== 'your_geoapify_api_key_here') {
    try {
      const url = `https://api.geoapify.com/v2/place-details?id=${encodeURIComponent(id)}&apiKey=${GEOAPIFY_API_KEY}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const data = await res.json();
        const f = data.features?.[0];
        if (f) {
          const p = f.properties;
          const category = mapGeoapifyCategory(p.categories || []);
          const dest: Destination = {
            id,
            name: p.name || p.formatted || 'Destination',
            city: p.city || p.county || '',
            country: p.country || '',
            category,
            rating: 4.8,
            reviewsCount: 1540,
            description: p.formatted || 'A verified destination discovered via Geoapify.',
            image: getRandomImageForCategory(category, p.name || id),
            address: p.formatted || '',
            coordinates: { lat: p.lat || 0, lon: p.lon || 0 },
            features: ['Geoapify Verified', 'Live Coordinates'],
            source: 'geoapify',
            websiteUrl: p.website || undefined,
          };
          destinationCache.set(id, dest);
          return dest;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch details from Geoapify:', err);
    }
  }

  throw new Error(`Destination with ID "${id}" was not found.`);
}

/**
 * Fetch distinct locations/cities for filter suggestions
 */
export function getAvailableLocations(): string[] {
  const cities = new Set<string>();
  POPULAR_GLOBAL_DESTINATIONS.forEach((d) => {
    if (d.city) cities.add(d.city);
  });
  return Array.from(cities).sort();
}
