import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Star,
  MapPin,
  Clock,
  Compass,
  ExternalLink,
  Share2,
  CheckCircle2,
  Tag,
  Globe2,
} from 'lucide-react';
import { fetchDestinationById } from '../services/api';
import { Destination } from '../types/destination';
import { useTrip } from '../context/TripContext';
import { useToast } from '../context/ToastContext';

export const DestinationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isInTrip, addToTrip, removeFromTrip } = useTrip();
  const { showToast } = useToast();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!id) {
        setError('No destination ID was specified.');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setIsLoading(true);
      setError(null);

      try {
        const item = await fetchDestinationById(id);
        if (isMounted) {
          setDestination(item);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || `Destination not found.`);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Skeleton details layout */}
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="h-[420px] bg-slate-200 rounded-3xl" />
          <div className="space-y-4 pt-4">
            <div className="h-8 w-2/3 bg-slate-200 rounded-lg" />
            <div className="h-5 w-1/3 bg-slate-200 rounded" />
            <div className="h-24 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Graceful Handling for Invalid or Missing ID
  if (error || !destination) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center bg-slate-50 py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-card text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Destination Not Found</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {error || "The destination you are looking for doesn't exist or could not be loaded."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore</span>
          </Link>
        </div>
      </main>
    );
  }

  const saved = isInTrip(destination.id);

  const handleTripAction = () => {
    if (saved) {
      removeFromTrip(destination.id);
    } else {
      addToTrip(destination);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: destination.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard', 'info');
    }
  };

  const allImages = [
    destination.image,
    ...(destination.galleryImages || []),
  ].filter(Boolean);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    destination.name + ', ' + destination.address
  )}`;

  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-slate-500 overflow-hidden text-xs sm:text-sm">
            <Link to="/" className="hover:text-teal-600 font-medium transition-colors shrink-0">
              Explore
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 font-medium shrink-0">{destination.category}</span>
            <span className="text-slate-300">/</span>
            <span className="text-navy-900 font-bold truncate">{destination.name}</span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Explore</span>
          </Link>
        </nav>

        {/* Hero Image & Gallery Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-200/80 bg-slate-900 mb-8 aspect-[16/9] max-h-[500px]">
          <img
            src={allImages[activeImageIndex] || destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent pointer-events-none" />

          {/* Floating Category & Share Badge */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-navy-900 shadow-md">
              {destination.category}
            </span>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-teal-600 hover:bg-white shadow-md transition-colors"
              title="Share destination"
              aria-label="Share destination"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Bottom Overlay: Title & Coordinates */}
          <div className="absolute bottom-6 inset-x-6 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-2 text-xs font-medium text-teal-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-teal-400" />
                {destination.city}{destination.country ? `, ${destination.country}` : ''}
              </span>
              {destination.rating > 0 && (
                <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {destination.rating.toFixed(1)}
                  {destination.reviewsCount && (
                    <span className="text-slate-200 text-[11px] font-normal">
                      ({destination.reviewsCount.toLocaleString()} reviews)
                    </span>
                  )}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              {destination.name}
            </h1>
          </div>
        </div>

        {/* Gallery Thumbnails if multiple images exist */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-teal-500 scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${destination.name} photo ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Two-Column Grid: Details & Sidebar CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Description & Highlights */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
              <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-600" />
                Overview
              </h2>
              <p className="text-slate-600 text-base leading-relaxed sm:text-lg mb-6">
                {destination.description}
              </p>

              {/* Tags / Features */}
              {destination.features && destination.features.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Key Highlights & Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.features.map((feat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Location & Coordinates Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
              <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                Location & Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-600 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Full Address</h3>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">{destination.address}</p>
                  </div>
                </div>

                {destination.coordinates && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-sky-50 text-sky-600 shrink-0 mt-0.5">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Geographic Coordinates</h3>
                      <p className="text-sm font-mono font-medium text-slate-800 mt-0.5">
                        {destination.coordinates.lat.toFixed(5)}° N, {destination.coordinates.lon.toFixed(5)}° E
                      </p>
                    </div>
                  </div>
                )}

                {destination.openingHours && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Visiting Hours</h3>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">{destination.openingHours}</p>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    <span>Open in Google Maps / Satellite</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: CTA Sticky Card */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card">
              <div className="pb-5 border-b border-slate-100 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Trip Planning</span>
                <h2 className="text-xl font-extrabold text-navy-900 mt-1">Ready to visit?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Save this place to your itinerary to organize your schedule and keep track of your journey.
                </p>
              </div>

              {/* Main CTA: Add to My Trip / Added to My Trip */}
              <button
                onClick={handleTripAction}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  saved
                    ? 'bg-teal-50 text-teal-800 border-2 border-teal-500 hover:bg-teal-100 shadow-teal-500/10'
                    : 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white shadow-teal-600/20 hover:scale-[1.02]'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5 text-teal-600 stroke-[3]" />
                    <span>Added to My Trip</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-5 h-5 text-white" />
                    <span>Add to My Trip</span>
                  </>
                )}
              </button>

              {saved && (
                <Link
                  to="/my-trip"
                  className="mt-3 block text-center text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                >
                  View your complete itinerary →
                </Link>
              )}

              {destination.websiteUrl && (
                <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                  <a
                    href={destination.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
