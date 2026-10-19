import { CategoryType } from '../types/destination';

// Verified landmark specific images (Keyed by lowercase substrings)
const LANDMARK_IMAGE_MAP: { pattern: RegExp; url: string }[] = [
  // New York
  {
    pattern: /central\s*park/i,
    url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80', // Bow Bridge & Lake Central Park NYC
  },
  {
    pattern: /statue\s*of\s*liberty/i,
    url: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /times\s*square/i,
    url: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /brooklyn\s*bridge/i,
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /plaza\s*hotel/i,
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  },

  // Paris
  {
    pattern: /eiffel|tour\s*eiffel|champ\s*de\s*mars/i,
    url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /louvre/i,
    url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /arc\s*de\s*triomphe/i,
    url: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /notre\s*dame/i,
    url: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /versailles/i,
    url: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /le\s*cinq|george\s*v/i,
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
  },

  // Rome / Italy
  {
    pattern: /colosseum|colosseo|roman\s*forum/i,
    url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /trevi/i,
    url: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /pantheon/i,
    url: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /positano|amalfi/i,
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /venice|gondola|grand\s*canal/i,
    url: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
  },

  // Japan
  {
    pattern: /fushimi|inari|torii/i,
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /skytree/i,
    url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /tokyo\s*tower/i,
    url: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /shibuya/i,
    url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /senso-?ji|asakusa/i,
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /kyubey|sushi/i,
    url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /fuji/i,
    url: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=80',
  },

  // Spain
  {
    pattern: /sagrada\s*fam/i,
    url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /park\s*g[uü]ell/i,
    url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80',
  },

  // London / UK
  {
    pattern: /british\s*museum/i,
    url: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /big\s*ben|westminster|tower\s*bridge/i,
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  },

  // Switzerland
  {
    pattern: /matterhorn|gornergrat|zermatt/i,
    url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
  },

  // South Africa
  {
    pattern: /table\s*mountain/i,
    url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
  },

  // Dubai
  {
    pattern: /burj\s*khalifa/i,
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  },

  // Bali / Indonesia
  {
    pattern: /monkey\s*forest|ubud/i,
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  },

  // Singapore
  {
    pattern: /gardens\s*by\s*the\s*bay|supertree/i,
    url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  },

  // Greece
  {
    pattern: /canaves|santorini|oia/i,
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
  },

  // Canada
  {
    pattern: /lake\s*louise|banff/i,
    url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
  },

  // India
  {
    pattern: /taj\s*mahal/i,
    url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
  },

  // Australia
  {
    pattern: /sydney\s*opera/i,
    url: 'https://images.unsplash.com/photo-1523428096881-5cb7994cae99?auto=format&fit=crop&w=1200&q=80',
  },

  // Brazil
  {
    pattern: /christ\s*the\s*redeemer|corcovado/i,
    url: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80',
  },

  // USA West
  {
    pattern: /golden\s*gate/i,
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /grand\s*canyon/i,
    url: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80',
  },
  {
    pattern: /niagara/i,
    url: 'https://images.unsplash.com/photo-1533094602577-199e35114237?auto=format&fit=crop&w=1200&q=80',
  },
];

// Verified, high-resolution authentic fallback images strictly aligned with each category
const STRICT_CATEGORY_IMAGES: Record<CategoryType, string[]> = {
  All: [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80', // Scenic world travel
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Coastal scenic
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80', // Mountain lake voyage
  ],
  Attractions: [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80', // Historic landmark clocktower & bridge
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', // Iconic coastal architecture
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', // Ancient monument
    'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80', // Classic landmark facade
  ],
  Nature: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', // Misty pine forest & mountains
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80', // Emerald valley & granite cliffs
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Crystal alpine lake & snow peak
    'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80', // Lush rainforest canopy & sunlight
  ],
  Museums: [
    'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80', // Grand classical museum hall & statues
    'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=80', // Museum glass atrium & rotunda
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80', // Art gallery framed paintings
  ],
  Restaurants: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', // Modern elegant dining room
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', // Fine dining table setting
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80', // Haute cuisine dining hall
  ],
  Hotels: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', // Grand luxury hotel facade
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Luxury resort suite & ocean view
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80', // Cliffside hotel with private plunge pool
  ],
  Activities: [
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80', // Kayaking in alpine waters
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80', // Wildlife & mountain hiking expedition
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80', // Coastal walking trail
  ],
};

/**
 * Deterministic hash function for consistent image mapping
 */
function getDeterministicHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Resolves an authentic, verified destination image.
 * 1. Checks direct valid image URL
 * 2. Checks known famous landmarks dictionary
 * 3. Falls back deterministically to strictly vetted, category-appropriate photos
 */
export function resolveDestinationImage(
  name: string,
  city: string,
  category: CategoryType,
  directImageUrl?: string
): string {
  // If a valid custom image URL is explicitly provided and not an empty string
  if (directImageUrl && directImageUrl.startsWith('http') && !directImageUrl.includes('placeholder')) {
    return directImageUrl;
  }

  const combinedSearch = `${name} ${city}`.toLowerCase();

  // Check landmark image dictionary
  for (const item of LANDMARK_IMAGE_MAP) {
    if (item.pattern.test(combinedSearch)) {
      return item.url;
    }
  }

  // Fallback to strictly verified category image list
  const categoryImages = STRICT_CATEGORY_IMAGES[category] || STRICT_CATEGORY_IMAGES.All;
  const hash = getDeterministicHash(`${name}-${city}-${category}`);
  const index = hash % categoryImages.length;

  return categoryImages[index];
}
