import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load destinations',
  message = "We couldn't fetch destination data right now. Please check your connection and try again.",
  onRetry,
  isRetrying = false,
}) => {
  return (
    <div className="py-16 px-4 text-center max-w-md mx-auto animate-in fade-in">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-6 shadow-sm">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold text-navy-900 mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-slate-600 mb-8 text-base leading-relaxed">
        {message}
      </p>
      <button
        onClick={onRetry}
        disabled={isRetrying}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02] disabled:opacity-70 cursor-pointer"
      >
        <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
        <span>{isRetrying ? 'Retrying...' : 'Try Again'}</span>
      </button>
    </div>
  );
};
