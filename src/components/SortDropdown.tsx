import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '../types/destination';

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Name A–Z', value: 'name_asc' },
  { label: 'Name Z–A', value: 'name_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-dropdown" className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:flex items-center gap-1.5">
        <ArrowUpDown className="w-3.5 h-3.5" />
        Sort:
      </label>
      <div className="relative">
        <select
          id="sort-dropdown"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-slate-200/90 text-navy-900 text-sm font-semibold rounded-xl pl-3.5 pr-9 py-2 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
          <ArrowUpDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
