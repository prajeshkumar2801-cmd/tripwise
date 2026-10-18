import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, X, Star, MapPin, Tag } from 'lucide-react';
import { CategoryType } from '../types/destination';

interface FilterBarProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  availableLocations: string[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Attractions',
  'Restaurants',
  'Hotels',
  'Nature',
  'Museums',
  'Activities',
];

const RATING_OPTIONS = [
  { label: 'All Ratings', value: 0 },
  { label: '4.0+ Stars', value: 4.0 },
  { label: '4.5+ Stars', value: 4.5 },
  { label: '4.8+ Stars', value: 4.8 },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  minRating,
  onMinRatingChange,
  selectedLocation,
  onLocationChange,
  availableLocations,
  onClearFilters,
  hasActiveFilters,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop Filter Toolbar */}
      <div className="hidden lg:flex items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-subtle mb-6">
        <div className="flex items-center flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value as CategoryType)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-3 py-1.5 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Rating:
            </span>
            <select
              value={minRating}
              onChange={(e) => onMinRatingChange(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-3 py-1.5 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
            >
              {RATING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location / Region Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              Location:
            </span>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-3 py-1.5 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer max-w-[180px] truncate"
            >
              <option value="">All Locations</option>
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-colors shrink-0"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {/* Mobile / Tablet Filter Button */}
      <div className="lg:hidden flex items-center gap-2 mb-4">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
            hasActiveFilters
              ? 'bg-teal-50 border-teal-300 text-teal-800'
              : 'bg-white border-slate-200 text-slate-700 shadow-xs'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-teal-600" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Reset filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mobile Filter Drawer / Modal */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-950/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-navy-900">Filter Destinations</h3>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-5">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => onCategoryChange(cat)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                        selectedCategory === cat
                          ? 'bg-navy-900 text-white border-navy-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Min Rating */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Minimum Rating
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {RATING_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onMinRatingChange(opt.value)}
                      className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        minRating === opt.value
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${minRating === opt.value ? 'text-white' : 'text-amber-500'}`} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Specific Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5"
                >
                  <option value="">All Locations</option>
                  {availableLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClearFilters();
                  setMobileDrawerOpen(false);
                }}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
