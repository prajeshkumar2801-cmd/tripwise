import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Compass, BookmarkX } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'trip';
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction }) => {
  if (type === 'trip') {
    return (
      <div className="py-16 px-4 text-center max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-6 shadow-sm">
          <BookmarkX className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-2">
          Your itinerary is empty
        </h3>
        <p className="text-slate-600 mb-8 text-base leading-relaxed">
          Start exploring and add places you'd love to visit.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02]"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Destinations</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 text-center max-w-md mx-auto">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-6 shadow-sm">
        <SearchX className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold text-navy-900 mb-2">
        No destinations found
      </h3>
      <p className="text-slate-600 mb-8 text-base leading-relaxed">
        Try another search term or adjust your filters.
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-sm transition-all hover:scale-[1.02]"
        >
          <span>Clear Search & Filters</span>
        </button>
      )}
    </div>
  );
};
