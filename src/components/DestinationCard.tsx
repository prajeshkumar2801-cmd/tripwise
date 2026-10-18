import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Bookmark, Check, ArrowRight } from 'lucide-react';
import { Destination } from '../types/destination';
import { useTrip } from '../context/TripContext';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { isInTrip, addToTrip, removeFromTrip } = useTrip();
  const saved = isInTrip(destination.id);

  const handleTripToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeFromTrip(destination.id);
    } else {
      addToTrip(destination);
    }
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient overlay on bottom of image for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="pointer-events-auto px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-navy-900 shadow-sm border border-white/50">
            {destination.category}
          </span>

          <button
            onClick={handleTripToggle}
            aria-label={saved ? 'Remove from My Trip' : 'Add to My Trip'}
            title={saved ? 'In your itinerary (click to remove)' : 'Add to itinerary'}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm ${
              saved
                ? 'bg-teal-600 text-white hover:bg-teal-700 ring-2 ring-white/80'
                : 'bg-white/90 text-slate-700 hover:text-teal-600 hover:bg-white'
            }`}
          >
            {saved ? <Check className="w-4 h-4 stroke-[3]" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-medium pointer-events-none">
          <div className="flex items-center gap-1 drop-shadow-md truncate pr-2">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate">
              {destination.city}
              {destination.country ? `, ${destination.country}` : ''}
            </span>
          </div>

          {destination.rating > 0 && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shrink-0 drop-shadow-md">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white text-xs">{destination.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-navy-900 group-hover:text-teal-700 transition-colors line-clamp-1 mb-1.5 leading-snug">
            {destination.name}
          </h3>

          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4">
            {destination.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <Link
            to={`/destination/${destination.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 hover:text-teal-600 transition-colors py-1 group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={handleTripToggle}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              saved
                ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-600 stroke-[2.5]" />
                <span>Added to Trip</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                <span>Add to Trip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
