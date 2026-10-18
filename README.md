# TripWise – Smart Travel Planner

> **"Plan less. Explore more."**  
> A complete, production-grade modern frontend travel planning web application built for the **AWS Student Builder Group – VIT Chennai Recruitment Task**.

---

## Overview

**TripWise** is a high-performance, responsive travel discovery and itinerary planning application designed to offer travelers a modern, fluid experience. Users can search for world destinations, filter by categories and ratings, sort results, explore rich destination profiles with interactive metadata and coordinates, and curate a personal travel itinerary persisted seamlessly in browser storage (`localStorage`).

---

## Features

- **Destination Discovery**: Real-time discovery of places and attractions across the globe.
- **Dynamic Search**: Instantly search by destination name, city, landmark, or region without full page reloads.
- **Smart Filtering**:
  - Filter by Category (*Attractions, Restaurants, Hotels, Nature, Museums, Activities*)
  - Minimum Rating Filter (*All, 4.0+, 4.5+, 4.8+ Stars*)
  - Location/City Filter
  - One-click *Clear Filters* action
  - Desktop toolbar and responsive mobile filter modal/drawer
- **Multi-criteria Sorting**:
  - *Recommended* (popularity and review weighted)
  - *Name A–Z*
  - *Name Z–A*
  - *Rating: High to Low*
- **Rich Destination Details (`/destination/:id`)**:
  - High-resolution visual gallery and category tagging
  - Breadcrumb navigation (`Explore / Category / Place`)
  - Address, visiting hours, and verified geographical coordinates
  - Quick action to open satellite view in Google Maps / OpenStreetMap
  - Graceful handling for missing or invalid IDs
- **Itinerary Management (`/my-trip`)**:
  - Save places to **My Trip** with one-click toggling
  - Duplicate prevention (notifies if place already exists)
  - Live item counter badge in the sticky Navbar
  - Delete individual items or clear the entire itinerary
  - Print and export itinerary sharing
  - Beautiful empty state when no places are saved
- **Browser Persistence**:
  - Automatic synchronization with `localStorage` under key `tripwise_itinerary`
  - Itinerary state persists across browser refreshes and tab closures
- **Production UI/UX**:
  - 6-card shimmer skeleton loaders during asynchronous data fetching
  - Accessible error states with "Try Again" retry action
  - Friendly search empty states with "Clear Search" CTA
  - Toast notification system with auto-dismiss
  - Fully responsive across desktop (1440px), laptop (1024px), tablet (768px), and mobile (375px/390px)

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, full type safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Navy & Teal design system)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Persistence**: Browser `localStorage` API
- **HTTP Client**: Native Fetch API with `AbortSignal.timeout`

---

## API Used

TripWise employs an enterprise-grade dual-tier API service layer (`src/services/api.ts`):

### 1. Primary: Geoapify Places & Geocoding API
- **Provider**: [Geoapify](https://www.geoapify.com/)
- **Endpoints Used**:
  - **Places API**: `https://api.geoapify.com/v2/places?categories={category}&filter=circle:{lon},{lat},{radius}&bias=proximity:{lon},{lat}&limit=20&apiKey={apiKey}`
  - **Geocoding API**: `https://api.geoapify.com/v1/geocode/search?text={query}&limit=15&apiKey={apiKey}`
  - **Place Details API**: `https://api.geoapify.com/v2/place-details?id={id}&apiKey={apiKey}`
- **Authentication**: Requires an API key via environment variable `VITE_GEOAPIFY_API_KEY`. Free tier offers 3,000 requests/day with no credit card required.

### 2. Live Public Fallback: OpenStreetMap Nominatim API
- **Provider**: OpenStreetMap Nominatim
- **Endpoint**: `https://nominatim.openstreetmap.org/search?format=json&q={query}&addressdetails=1&extratags=1&limit=15`
- **Authentication**: Free and open API (no API key required). Enables evaluators to run the application immediately out of the box with live geocoded data even before configuring their Geoapify credentials.

> [!NOTE]
> No API keys are hardcoded in the frontend source code. Git repositories are protected via `.gitignore`.

---

## Project Structure

```text
tripwise-app/
├── public/                 # Static assets and favicon
├── src/
│   ├── components/         # Reusable presentation components
│   │   ├── DestinationCard.tsx      # Interactive destination card
│   │   ├── DestinationSkeleton.tsx  # Shimmer skeleton loader
│   │   ├── EmptyState.tsx           # Search & trip empty states
│   │   ├── ErrorState.tsx           # API error boundary state
│   │   ├── FilterBar.tsx            # Desktop toolbar & mobile drawer
│   │   ├── Footer.tsx               # Branding & recruitment footer
│   │   ├── HeroSection.tsx          # Hero banner with search & category pills
│   │   ├── Navbar.tsx               # Sticky header with itinerary badge
│   │   ├── ScrollToTop.tsx          # Route transition scroll reset
│   │   ├── SearchBar.tsx            # Standalone search input
│   │   ├── SortDropdown.tsx         # Sorting controls
│   │   └── Toast.tsx                # Floating notifications
│   ├── context/            # React context state management
│   │   ├── ToastContext.tsx         # Notification alerts
│   │   └── TripContext.tsx          # Saved itinerary & localStorage sync
│   ├── pages/              # Route views
│   │   ├── DestinationDetailsPage.tsx  # /destination/:id
│   │   ├── ExplorePage.tsx             # /
│   │   ├── MyTripPage.tsx              # /my-trip
│   │   └── NotFoundPage.tsx            # 404 handler
│   ├── services/           # API and data layer
│   │   ├── api.ts                   # Geoapify & OSM integration
│   │   └── destinationData.ts       # Curated real-world destination dataset
│   ├── types/              # TypeScript declarations
│   │   └── destination.ts
│   ├── App.tsx             # Application root with router
│   ├── index.css           # Tailwind directives & custom utilities
│   ├── main.tsx            # React entrypoint
│   └── vite-env.d.ts       # Vite environment types
├── .env.example            # Environment template
├── .gitignore              # Protected credential rules
├── index.html              # HTML shell with Google Fonts & metadata
├── package.json            # Project dependencies & scripts
├── postcss.config.js       # PostCSS plugins
├── tailwind.config.js      # Tailwind theme configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler config
```

---

## Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Add your free Geoapify Places API key:

```env
VITE_GEOAPIFY_API_KEY=your_api_key_here
```

> **How to get a free Geoapify API key:**
> 1. Visit [https://myprojects.geoapify.com](https://myprojects.geoapify.com)
> 2. Sign up for a free account (no credit card required).
> 3. Create a project and copy your API key into `.env`.

---

## Installation

Ensure you have **Node.js** (v18+ recommended) and **npm** installed.

```bash
# Clone the repository
git clone <repository-url>
cd tripwise-app

# Install dependencies
npm install
```

---

## Running Locally

To start the Vite local development server:

```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173`

---

## Building & Verification

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

TripWise is configured for one-click static deployment to platforms such as **AWS Amplify**, **Vercel**, or **Netlify**:

### Deploying to AWS Amplify Hosting
1. Push your repository to GitHub / AWS CodeCommit.
2. In AWS Management Console, navigate to **AWS Amplify** > **Host web app**.
3. Select your repository and branch.
4. Set build settings:
   - **Base directory**: `dist`
   - **Build command**: `npm run build`
5. Under **Environment variables**, add `VITE_GEOAPIFY_API_KEY`.
6. Add the following redirect rule in Amplify Console (*Rewrites and redirects*) for client-side React routing:
   - Source: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`
   - Target: `/index.html`
   - Type: `200 (Rewrite)`
7. Click **Save and Deploy**.

### Deploying to Vercel
```bash
npm install -g vercel
vercel
```
Add `VITE_GEOAPIFY_API_KEY` in the Vercel dashboard under Project Settings > Environment Variables.

---

## Screenshots

| Desktop Explore & Hero | Destination Details View |
| :---: | :---: |
| *(Hero section with search bar, category pills, filter toolbar, and card grid)* | *(Large banner, coordinates, full address, highlights, and Add to Trip CTA)* |

| Saved Itinerary ("My Trip") | Mobile View & Filter Drawer |
| :---: | :---: |
| *(Saved places list, total count badge, print/share actions, remove buttons)* | *(Responsive hamburger menu, compact search, and mobile filter drawer)* |

---

## Acknowledgements

Built with passion for the **AWS Student Builder Group – VIT Chennai Recruitment Task**.
