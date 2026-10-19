import type { Destination } from '../types/destination';

export const POPULAR_GLOBAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-paris-eiffel',
    name: 'Eiffel Tower & Champ de Mars',
    city: 'Paris',
    country: 'France',
    category: 'Attractions',
    subCategory: 'Monument / Viewpoint',
    rating: 4.8,
    reviewsCount: 32410,
    description: 'Iconic wrought-iron lattice tower on the Champ de Mars, offering breathtaking panoramic views across Paris from three observation levels.',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    coordinates: {
      lat: 48.8584,
      lon: 2.2945
    },
    features: ['Panoramic Deck', 'Elevator Access', 'Historic Monument', 'Night Illumination', 'Audio Guide Available'],
    openingHours: '09:00 - 23:45 Daily',
    source: 'curated',
    websiteUrl: 'https://www.toureiffel.paris/en'
  },
  {
    id: 'dest-kyoto-fushimi',
    name: 'Fushimi Inari-Taisha Shrine',
    city: 'Kyoto',
    country: 'Japan',
    category: 'Attractions',
    subCategory: 'Shinto Shrine / Cultural Heritage',
    rating: 4.9,
    reviewsCount: 28940,
    description: 'Famed Shinto shrine renowned for its scenic trail winding beneath thousands of vibrant vermilion torii gates up sacred Mount Inari.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478436127897-769e00d2c715?auto=format&fit=crop&w=1000&q=80'
    ],
    address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto 612-0882, Japan',
    coordinates: {
      lat: 34.9671,
      lon: 135.7727
    },
    features: ['Torii Gate Trails', 'Fox Statues', 'Mountain Hike', 'Free Admission', '24/7 Access'],
    openingHours: 'Open 24 Hours',
    source: 'curated'
  },
  {
    id: 'dest-rome-colosseum',
    name: 'The Colosseum & Roman Forum',
    city: 'Rome',
    country: 'Italy',
    category: 'Attractions',
    subCategory: 'Ancient Amphitheatre',
    rating: 4.9,
    reviewsCount: 41200,
    description: 'The monumental Flavian Amphitheatre in the heart of Rome, celebrated as one of the greatest architectural and engineering feats of antiquity.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
    coordinates: {
      lat: 41.8902,
      lon: 12.4922
    },
    features: ['Underground Arena Tour', 'UNESCO World Heritage', 'Ancient Roman Ruins', 'Guided Walkways'],
    openingHours: '08:30 - 19:15 Daily',
    source: 'curated',
    websiteUrl: 'https://colosseo.it/en/'
  },
  {
    id: 'dest-nyc-central-park',
    name: 'Central Park',
    city: 'New York',
    country: 'United States',
    category: 'Nature',
    subCategory: 'Urban Park / Botanical Haven',
    rating: 4.8,
    reviewsCount: 52180,
    description: 'An expansive 843-acre emerald sanctuary in Manhattan featuring tranquil lakes, winding walking paths, Bethesda Terrace, and lush meadows.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Central Park, New York, NY 10022, United States',
    coordinates: {
      lat: 40.7829,
      lon: -73.9654
    },
    features: ['Boating Lake', 'Bethesda Fountain', 'Bike Trails', 'Outdoor Concerts', 'Picnic Lawns'],
    openingHours: '06:00 - 01:00 Daily',
    source: 'curated',
    websiteUrl: 'https://www.centralparknyc.org/'
  },
  {
    id: 'dest-paris-louvre',
    name: 'Musée du Louvre',
    city: 'Paris',
    country: 'France',
    category: 'Museums',
    subCategory: 'Art Museum / Historic Palace',
    rating: 4.8,
    reviewsCount: 38700,
    description: 'The world’s most visited museum, housing masterpieces such as the Mona Lisa and the Venus de Milo within a storied former royal palace.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Rue de Rivoli, 75001 Paris, France',
    coordinates: {
      lat: 48.8606,
      lon: 2.3376
    },
    features: ['Mona Lisa Display', 'Glass Pyramid Entry', 'Sculpture Courtyards', 'Audio Guides'],
    openingHours: '09:00 - 18:00 (Wed/Fri until 21:45, Closed Tue)',
    source: 'curated',
    websiteUrl: 'https://www.louvre.fr/en'
  },
  {
    id: 'dest-tokyo-skytree',
    name: 'Tokyo Skytree & Observation Gallery',
    city: 'Tokyo',
    country: 'Japan',
    category: 'Attractions',
    subCategory: 'Observation Tower',
    rating: 4.7,
    reviewsCount: 22100,
    description: 'A soaring 634-meter broadcasting and observation landmark offering sweeping views over Metropolitan Tokyo all the way to Mount Fuji.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan',
    coordinates: {
      lat: 35.7101,
      lon: 139.8107
    },
    features: ['Tembo Deck 350m', 'Tembo Galleria 450m', 'Glass Floor', 'Sky Restaurant', 'Shopping Center'],
    openingHours: '10:00 - 21:00 Daily',
    source: 'curated'
  },
  {
    id: 'dest-barcelona-sagrada',
    name: 'Basílica de la Sagrada Família',
    city: 'Barcelona',
    country: 'Spain',
    category: 'Attractions',
    subCategory: 'Modernist Basilica',
    rating: 4.9,
    reviewsCount: 45300,
    description: 'Antoni Gaudí’s breathtaking modernist masterpiece, known for towering organic spires, magnificent stained glass, and nature-inspired architecture.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Carrer de Mallorca, 401, 08013 Barcelona, Spain',
    coordinates: {
      lat: 41.4036,
      lon: 2.1744
    },
    features: ['Tower Climb Access', 'Stained Glass Illumination', 'Museum Crypt', 'Audio Tour'],
    openingHours: '09:00 - 18:00 Daily',
    source: 'curated',
    websiteUrl: 'https://sagradafamilia.org/en/'
  },
  {
    id: 'dest-switzerland-zermatt',
    name: 'Matterhorn & Gornergrat Alpine Vista',
    city: 'Zermatt',
    country: 'Switzerland',
    category: 'Nature',
    subCategory: 'Alpine Peak & Glacier',
    rating: 4.9,
    reviewsCount: 18450,
    description: 'The dramatic pyramid peak of the Swiss Alps, accessible via historic cogwheel railway with vistas over 29 four-thousand-meter mountains.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    address: 'Gornergrat Railway, 3920 Zermatt, Switzerland',
    coordinates: {
      lat: 45.9763,
      lon: 7.7491
    },
    features: ['Cogwheel Alpine Train', 'Reflective Lake Riffelsee', 'Glacier Palace', 'Skiing & Hiking'],
    openingHours: '08:00 - 17:30 Daily',
    source: 'curated'
  },
  {
    id: 'dest-capetown-tablemountain',
    name: 'Table Mountain National Park',
    city: 'Cape Town',
    country: 'South Africa',
    category: 'Nature',
    subCategory: 'National Park / Plateau',
    rating: 4.8,
    reviewsCount: 26300,
    description: 'A flat-topped mountain forming a dramatic natural amphitheater over Cape Town, featuring rich biodiversity, hiking trails, and a rotating cable car.',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    address: 'Tafelberg Rd, Table Mountain, Cape Town, 8001, South Africa',
    coordinates: {
      lat: -33.9628,
      lon: 18.4098
    },
    features: ['Rotating Aerial Cableway', 'Flora & Fauna Trails', 'Sunset Over Atlantic', 'Summit Cafe'],
    openingHours: '08:30 - 18:00 Daily (weather permitting)',
    source: 'curated'
  },
  {
    id: 'dest-dubai-burjkhalifa',
    name: 'Burj Khalifa & Dubai Mall Fountain',
    city: 'Dubai',
    country: 'United Arab Emirates',
    category: 'Attractions',
    subCategory: 'Skyscraper & Urban Complex',
    rating: 4.8,
    reviewsCount: 39600,
    description: 'The tallest structure in the world, towering at 828 meters with luxury sky lounges and an outdoor observation deck looking across the Arabian Gulf.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    address: '1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE',
    coordinates: {
      lat: 25.1972,
      lon: 55.2744
    },
    features: ['At The Top Levels 124 & 148', 'Choreographed Fountains', 'High-Speed Elevators', 'Lounge Bar'],
    openingHours: '08:00 - 00:00 Daily',
    source: 'curated'
  },
  {
    id: 'dest-bali-ubud-monkeys',
    name: 'Sacred Monkey Forest Sanctuary',
    city: 'Ubud, Bali',
    country: 'Indonesia',
    category: 'Nature',
    subCategory: 'Nature Reserve & Temple',
    rating: 4.6,
    reviewsCount: 19800,
    description: 'Lush green sanctuary in Ubud home to hundreds of Balinese long-tailed macaques, ancient banyan trees, and sacred moss-covered stone temples.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    address: 'Jl. Monkey Forest, Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571',
    coordinates: {
      lat: -8.5188,
      lon: 115.2585
    },
    features: ['Ancient Temples', 'Macaque Habitat', 'Shaded Rainforest Trails', 'Cultural Conservation'],
    openingHours: '09:00 - 18:00 Daily',
    source: 'curated'
  },
  {
    id: 'dest-london-britishmuseum',
    name: 'The British Museum',
    city: 'London',
    country: 'United Kingdom',
    category: 'Museums',
    subCategory: 'World History & Artifacts',
    rating: 4.8,
    reviewsCount: 34500,
    description: 'World-renowned museum dedicated to human history, art, and culture, housing the Rosetta Stone, Parthenon Sculptures, and an iconic glass Great Court.',
    image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=80',
    address: 'Great Russell St, Bloomsbury, London WC1B 3DG, United Kingdom',
    coordinates: {
      lat: 51.5194,
      lon: -0.1270
    },
    features: ['Free General Admission', 'Norman Foster Glass Dome', 'Rosetta Stone', 'Egyptian Antiquities'],
    openingHours: '10:00 - 17:00 Daily (Fri until 20:30)',
    source: 'curated',
    websiteUrl: 'https://www.britishmuseum.org/'
  },
  {
    id: 'dest-amalfi-positano',
    name: 'Positano Coastal Village & Cliffside Dining',
    city: 'Amalfi Coast',
    country: 'Italy',
    category: 'Activities',
    subCategory: 'Coastal Walk & Cliffside Experience',
    rating: 4.9,
    reviewsCount: 16700,
    description: 'Pastel-colored Mediterranean haven cascading down sheer sea cliffs into the Tyrrhenian Sea, famous for coastal hikes, fresh seafood, and artisan boutiques.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    address: 'Via Cristoforo Colombo, 84017 Positano SA, Italy',
    coordinates: {
      lat: 40.6281,
      lon: 14.4850
    },
    features: ['Ferry Port Access', 'Spiaggia Grande Beach', 'Path of the Gods Trail', 'Limoncello Tastings'],
    openingHours: 'Open Year-Round',
    source: 'curated'
  },
  {
    id: 'dest-singapore-gardens',
    name: 'Gardens by the Bay & Supertree Grove',
    city: 'Singapore',
    country: 'Singapore',
    category: 'Nature',
    subCategory: 'Futuristic Botanical Park',
    rating: 4.8,
    reviewsCount: 31200,
    description: 'Visionary horticultural attraction featuring 18 towering Supertrees draped in epiphytes, the Cloud Forest indoor waterfall, and the Flower Dome.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    address: '18 Marina Gardens Dr, Singapore 018953',
    coordinates: {
      lat: 1.2816,
      lon: 103.8636
    },
    features: ['OCBC Skyway Aerial Walk', 'Supertree Light & Sound Show', 'Cloud Forest Waterfall', 'Flower Dome'],
    openingHours: '05:00 - 02:00 (Conservatories 09:00 - 21:00)',
    source: 'curated',
    websiteUrl: 'https://www.gardensbythebay.com.sg/'
  },
  {
    id: 'dest-paris-le-cinq',
    name: 'Le Cinq – Four Seasons George V',
    city: 'Paris',
    country: 'France',
    category: 'Restaurants',
    subCategory: 'Fine Dining / French Haute Cuisine',
    rating: 4.9,
    reviewsCount: 2890,
    description: 'Renowned 3-Michelin-star palace restaurant offering quintessential haute French culinary artistry in a grand regency-style dining room.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    address: '31 Avenue George V, 75008 Paris, France',
    coordinates: {
      lat: 48.8687,
      lon: 2.3006
    },
    features: ['3 Michelin Stars', 'Master Sommelier Pairings', 'Dress Code Required', 'Historic Golden Hall'],
    openingHours: '19:00 - 22:30 (Tue-Sat)',
    source: 'curated'
  },
  {
    id: 'dest-tokyo-sukiyabashi',
    name: 'Ginza Kyubey & Artisanal Edomae Sushi',
    city: 'Tokyo',
    country: 'Japan',
    category: 'Restaurants',
    subCategory: 'Edomae Sushi Counter',
    rating: 4.8,
    reviewsCount: 3400,
    description: 'Historic institution in Ginza serving the highest caliber traditional Edomae sushi prepared freshly before your eyes by generational master chefs.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    address: '7 Chome-5-23 Ginza, Chuo City, Tokyo 104-0061, Japan',
    coordinates: {
      lat: 35.6698,
      lon: 139.7618
    },
    features: ['Chef Counter Seating', 'Daily Toyosu Market Catch', 'Omakase Experience', 'Reservation Recommended'],
    openingHours: '11:30 - 14:00, 17:00 - 22:00 (Closed Sun)',
    source: 'curated'
  },
  {
    id: 'dest-nyc-plaza-hotel',
    name: 'The Plaza Hotel & Palm Court',
    city: 'New York',
    country: 'United States',
    category: 'Hotels',
    subCategory: 'Luxury Heritage Hotel',
    rating: 4.7,
    reviewsCount: 8900,
    description: 'Legendary Fifth Avenue luxury hotel beside Central Park, synonymous with Gilded Age glamour, afternoon tea at Palm Court, and world-class hospitality.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    address: '768 5th Ave, New York, NY 10019, United States',
    coordinates: {
      lat: 40.7645,
      lon: -73.9745
    },
    features: ['Central Park Views', 'Palm Court Afternoon Tea', 'Guerlain Spa', 'Historic Landmark'],
    openingHours: '24/7 Concierge Service',
    source: 'curated'
  },
  {
    id: 'dest-santorini-canaves',
    name: 'Canaves Oia Suites & Infinity Pools',
    city: 'Santorini',
    country: 'Greece',
    category: 'Hotels',
    subCategory: 'Luxury Caldera Cliffside Hotel',
    rating: 4.9,
    reviewsCount: 3120,
    description: 'Carved directly into the cliffside of Oia overlooking the sapphire Aegean caldera, offering private plunge pools and world-famous Aegean sunset views.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    address: 'Main Street, Oia 847 02, Santorini, Greece',
    coordinates: {
      lat: 36.4618,
      lon: 25.3753
    },
    features: ['Infinity Plunge Pools', 'Caldera Sunset Vistas', 'Yacht Excursions', 'Wine Cellar'],
    openingHours: 'Seasonal Open April - November',
    source: 'curated'
  },
  {
    id: 'dest-canada-banff',
    name: 'Lake Louise & Banff Wilderness Kayaking',
    city: 'Banff National Park',
    country: 'Canada',
    category: 'Activities',
    subCategory: 'Alpine Kayaking & Glacial Trails',
    rating: 4.9,
    reviewsCount: 21500,
    description: 'Glacier-fed turquoise waters framed by soaring Canadian Rockies peaks and Victoria Glacier, offering canoe rentals and scenic tea house hikes.',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    address: '111 Lake Louise Dr, Lake Louise, AB T0L 1E0, Canada',
    coordinates: {
      lat: 51.4254,
      lon: -116.1773
    },
    features: ['Canoe Rentals', 'Tea House Alpine Trail', 'Glacier Views', 'Wildlife Spotting'],
    openingHours: 'National Park Open 24/7 (Boat House 08:30 - 19:00)',
    source: 'curated'
  },
  {
    id: 'dest-agra-tajmahal',
    name: 'Taj Mahal Monument & Gardens',
    city: 'Agra',
    country: 'India',
    category: 'Attractions',
    subCategory: 'Mughal Architectural Masterpiece',
    rating: 4.9,
    reviewsCount: 61800,
    description: 'An ivory-white marble mausoleum on the south bank of the Yamuna River, universally admired as one of the Wonders of the World and pinnacle of Mughal art.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
    coordinates: {
      lat: 27.1751,
      lon: 78.0421
    },
    features: ['UNESCO World Heritage', 'Marble Inlay Art', 'Charbagh Garden Layout', 'Sunrise Entry'],
    openingHours: '06:00 - 18:30 (Closed Fridays)',
    source: 'curated'
  },
  {
    id: 'dest-sydney-operahouse',
    name: 'Sydney Opera House & Harbor Walks',
    city: 'Sydney',
    country: 'Australia',
    category: 'Activities',
    subCategory: 'Performing Arts Landmark',
    rating: 4.8,
    reviewsCount: 37400,
    description: 'World-renowned architectural marvel situated on Bennelong Point in Sydney Harbour, featuring distinctive shell-like roof sails and harborfront dining.',
    image: 'https://images.unsplash.com/photo-1523428096881-5cb7994cae99?auto=format&fit=crop&w=1200&q=80',
    address: 'Bennelong Point, Sydney NSW 2000, Australia',
    coordinates: {
      lat: -33.8568,
      lon: 151.2153
    },
    features: ['Guided Architectural Tours', 'Harbourfront Promenade', 'Live Performances', 'Opera Bar'],
    openingHours: '09:00 - 20:30 Daily',
    source: 'curated',
    websiteUrl: 'https://www.sydneyoperahouse.com/'
  },
  {
    id: 'dest-rio-christ',
    name: 'Christ the Redeemer & Corcovado Peak',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    category: 'Attractions',
    subCategory: 'Art Deco Colossus',
    rating: 4.8,
    reviewsCount: 29800,
    description: 'Towering 30-meter Art Deco statue of Jesus Christ crowning the 700-meter Corcovado mountain, with panoramic vistas over Rio, Sugarloaf, and Copacabana.',
    image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80',
    address: 'Parque Nacional da Tijuca, Rio de Janeiro - RJ, Brazil',
    coordinates: {
      lat: -22.9519,
      lon: -43.2105
    },
    features: ['Cogwheel Corcovado Train', 'Panoramic City Views', 'New Seven Wonders', 'Tijuca Rainforest'],
    openingHours: '08:00 - 19:00 Daily',
    source: 'curated'
  }
];
