import React from 'react';

interface DestinationSkeletonProps {
  count?: number;
}

export const DestinationSkeleton: React.FC<DestinationSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-subtle flex flex-col h-[380px] animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative aspect-[16/10] bg-slate-200" />

          {/* Body skeleton */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Category pill skeleton */}
              <div className="h-4 w-24 bg-slate-200 rounded-full" />
              {/* Title skeleton */}
              <div className="h-6 w-3/4 bg-slate-200 rounded-md" />
              {/* Description skeleton lines */}
              <div className="space-y-2 pt-1">
                <div className="h-3.5 w-full bg-slate-200 rounded" />
                <div className="h-3.5 w-4/5 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Footer action buttons skeleton */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="h-5 w-24 bg-slate-200 rounded" />
              <div className="h-7 w-28 bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
