import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Destination, TripItem } from '../types/destination';
import { useToast } from './ToastContext';

interface TripContextType {
  tripItems: TripItem[];
  tripCount: number;
  addToTrip: (destination: Destination) => boolean;
  removeFromTrip: (destinationId: string) => void;
  isInTrip: (destinationId: string) => boolean;
  clearTrip: () => void;
}

const STORAGE_KEY = 'tripwise_itinerary';

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tripItems, setTripItems] = useState<TripItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load itinerary from localStorage:', err);
    }
    return [];
  });

  const { showToast } = useToast();

  // Keep localStorage synchronized whenever tripItems changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tripItems));
    } catch (err) {
      console.error('Failed to persist itinerary to localStorage:', err);
    }
  }, [tripItems]);

  const isInTrip = useCallback(
    (destinationId: string): boolean => {
      return tripItems.some((item) => item.destination.id === destinationId);
    },
    [tripItems]
  );

  const addToTrip = useCallback(
    (destination: Destination): boolean => {
      if (isInTrip(destination.id)) {
        showToast('Already in your trip', 'warning', `${destination.name} is already part of your itinerary.`);
        return false;
      }

      const newItem: TripItem = {
        destination,
        addedAt: new Date().toISOString(),
      };

      setTripItems((prev) => [newItem, ...prev]);
      showToast('Added to My Trip', 'success', `${destination.name} has been added to your itinerary.`);
      return true;
    },
    [isInTrip, showToast]
  );

  const removeFromTrip = useCallback(
    (destinationId: string) => {
      const target = tripItems.find((item) => item.destination.id === destinationId);
      const name = target?.destination.name || 'Destination';

      setTripItems((prev) => prev.filter((item) => item.destination.id !== destinationId));
      showToast('Removed from My Trip', 'info', `${name} was removed from your itinerary.`);
    },
    [tripItems, showToast]
  );

  const clearTrip = useCallback(() => {
    if (tripItems.length === 0) return;
    setTripItems([]);
    showToast('Itinerary cleared', 'info', 'All saved places have been removed from your itinerary.');
  }, [tripItems.length, showToast]);

  return (
    <TripContext.Provider
      value={{
        tripItems,
        tripCount: tripItems.length,
        addToTrip,
        removeFromTrip,
        isInTrip,
        clearTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
