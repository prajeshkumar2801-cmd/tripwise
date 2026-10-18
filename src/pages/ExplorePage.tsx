import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HeroSection } from '../components/HeroSection';
import { FilterBar } from '../components/FilterBar';
import { SortDropdown } from '../components/SortDropdown';
import { DestinationCard } from '../components/DestinationCard';
import { DestinationSkeleton } from '../components/DestinationSkeleton';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { fetchDestinations, getAvailableLocations } from '../services/api';
import { Destination, CategoryType, SortOption, FilterOptions } from '../types/destination';
import { Compass, Sparkles } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Data & Status State
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const availableLocations = useMemo(() => getAvailableLocations(), []);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'All' ||
    minRating > 0 ||
    selectedLocation !== '' ||
    sortBy !== 'recommended';

  // Load destinations
  const loadDestinations = useCallback(async (showSkeleton = true) => {
    if (showSkeleton) setIsLoading(true);
    setError(null);

    const filterOptions: FilterOptions = {
      searchQuery,
      category: selectedCategory,
      minRating,
      location: selectedLocation,
      sortBy,
    };

    try {
      const results = await fetchDestinations(filterOptions);
      setDestinations(results);
    } catch (err: any) {
      console.error('Failed to fetch destinations:', err);
      setError(err?.message || 'We could not fetch destination data right now. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory, minRating, selectedLocation, sortBy]);

  // Initial load and filter change trigger
  useEffect(() => {
    // Debounce search slightly to avoid excessive calls while typing
    const timer = setTimeout(() => {
      loadDestinations(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [loadDestinations]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadDestinations(true);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMinRating(0);
    setSelectedLocation('');
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full" id="explore-content">
        {/* Section Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-teal-50 text-teal-600">
                <Compass className="w-4 h-4" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Explore Destinations
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              {isLoading ? (
                'Finding places...'
              ) : (
                <>
                  Showing{' '}
                  <span className="font-semibold text-navy-900">{destinations.length}</span>{' '}
                  {destinations.length === 1 ? 'destination' : 'destinations'}
                  {selectedCategory !== 'All' && (
                    <span> in <strong className="text-teal-700">{selectedCategory}</strong></span>
                  )}
                  {searchQuery && (
                    <span> matching &ldquo;<strong className="text-teal-700">{searchQuery}</strong>&rdquo;</span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Filter Toolbar / Drawer */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          availableLocations={availableLocations}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Dynamic Display Grid / Loading / Empty / Error */}
        {isLoading ? (
          <DestinationSkeleton count={6} />
        ) : error ? (
          <ErrorState
            title="Unable to load destinations"
            message={error}
            onRetry={() => loadDestinations(true)}
          />
        ) : destinations.length === 0 ? (
          <EmptyState
            type="search"
            onAction={handleClearFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-300">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
