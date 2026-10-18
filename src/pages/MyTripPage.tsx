import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Trash2,
  ArrowRight,
  MapPin,
  Star,
  Compass,
  Calendar,
  Share2,
  Printer,
  Sparkles,
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { EmptyState } from '../components/EmptyState';
import { useToast } from '../context/ToastContext';

export const MyTripPage: React.FC = () => {
  const { tripItems, tripCount, removeFromTrip, clearTrip } = useTrip();
  const { showToast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleShareItinerary = () => {
    if (tripItems.length === 0) return;
    const names = tripItems.map((item, i) => `${i + 1}. ${item.destination.name} (${item.destination.city})`).join('\n');
    const shareText = `Check out my TripWise Itinerary:\n\n${names}\n\nPlanned with TripWise - Plan less. Explore more.`;

    if (navigator.share) {
      navigator.share({
        title: 'My TripWise Itinerary',
        text: shareText,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      showToast('Itinerary copied to clipboard', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header section */}
      <section className="bg-white border-b border-slate-200/80 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Bookmark className="w-3.5 h-3.5 text-teal-600" />
                Personal Itinerary
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
                My Trip
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mt-1 font-normal">
                Your saved places, all in one itinerary.
              </p>
            </div>

            {tripCount > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {/* Total count badge */}
                <div className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-navy-900 text-sm font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>
                    {tripCount} {tripCount === 1 ? 'place saved' : 'places saved'}
                  </span>
                </div>

                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
                  title="Print Itinerary"
                  aria-label="Print Itinerary"
                >
                  <Printer className="w-4 h-4" />
                </button>

                {/* Share button */}
                <button
                  onClick={handleShareItinerary}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
                  title="Share Itinerary"
                  aria-label="Share Itinerary"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Clear all */}
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your entire itinerary?')) {
                      clearTrip();
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {tripCount === 0 ? (
          <EmptyState type="trip" />
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {tripItems.map((item, index) => {
              const dest = item.destination;
              return (
                <div
                  key={dest.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-start sm:items-center gap-4 min-w-0 w-full sm:w-auto">
                    {/* Index badge */}
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0 hidden sm:flex">
                      {index + 1}
                    </span>

                    {/* Thumbnail Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-navy-950/70 text-white backdrop-blur-xs">
                        {dest.category}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-teal-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {dest.city}{dest.country ? `, ${dest.country}` : ''}
                        </span>
                        {dest.rating > 0 && (
                          <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                            • <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {dest.rating.toFixed(1)}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-navy-900 group-hover:text-teal-700 transition-colors truncate">
                        {dest.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {dest.address}
                      </p>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-2">
                        <Calendar className="w-3 h-3" />
                        <span>Added {new Date(item.addedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center justify-end gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <Link
                      to={`/destination/${dest.id}`}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => removeFromTrip(dest.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                      title="Remove from itinerary"
                      aria-label={`Remove ${dest.name} from itinerary`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
