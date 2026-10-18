import React from 'react';
import { Search, X, Sparkles, Landmark, UtensilsCrossed, Building2, Trees, Building, Compass } from 'lucide-react';
import { CategoryType } from '../types/destination';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  selectedCategory: CategoryType;
  onCategorySelect: (category: CategoryType) => void;
  isLoading: boolean;
}

const CATEGORY_PILLS: { label: string; value: CategoryType; icon: React.FC<{ className?: string }> }[] = [
  { label: 'Popular', value: 'All', icon: Sparkles },
  { label: 'Attractions', value: 'Attractions', icon: Landmark },
  { label: 'Restaurants', value: 'Restaurants', icon: UtensilsCrossed },
  { label: 'Hotels', value: 'Hotels', icon: Building2 },
  { label: 'Nature', value: 'Nature', icon: Trees },
  { label: 'Museums', value: 'Museums', icon: Building },
  { label: 'Activities', value: 'Activities', icon: Compass },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedCategory,
  onCategorySelect,
  isLoading,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 bg-gradient-to-b from-teal-50/50 via-slate-50 to-slate-50 border-b border-slate-200/60">
      {/* Decorative subtle ambient circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-sky-200/20 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          Plan less. Explore more.
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15] mb-4">
          Discover your next <span className="text-teal-600">adventure</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Find amazing places, build your itinerary, and make every trip unforgettable.
        </p>

        {/* Large Search Bar */}
        <form
          onSubmit={onSearchSubmit}
          className="max-w-2xl mx-auto relative mb-8"
        >
          <div className="relative flex items-center bg-white rounded-2xl shadow-card border border-slate-200/90 hover:border-teal-400 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all duration-200">
            <div className="pl-5 text-slate-600">
              <Search className="w-6 h-6" />
            </div>

            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search destinations, landmarks, cities (e.g. Paris, Tokyo, Kyoto)..."
              className="w-full py-4 pl-3.5 pr-24 text-base sm:text-lg text-slate-800 placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
              aria-label="Search destinations or places"
            />

            {/* Clear Button (shown when query is not empty) */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-24 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Search Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70 flex items-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {/* Quick Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 max-w-3xl mx-auto">
          {CATEGORY_PILLS.map((pill) => {
            const Icon = pill.icon;
            const isSelected = selectedCategory === pill.value;
            return (
              <button
                key={pill.label}
                type="button"
                onClick={() => onCategorySelect(pill.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
