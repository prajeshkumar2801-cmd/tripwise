import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-card text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600">404 Error</span>
        <h2 className="text-2xl font-bold text-navy-900 mt-1 mb-2">Page Not Found</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          The page or route you are looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>
      </div>
    </div>
  );
};
