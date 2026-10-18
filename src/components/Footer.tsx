import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-400 py-12 border-t border-navy-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-navy-800/80">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">TripWise</span>
            </Link>
            <p className="text-sm text-slate-400 font-medium">Plan less. Explore more.</p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-sm font-semibold">
            <Link to="/" className="text-slate-300 hover:text-teal-400 transition-colors">
              Explore
            </Link>
            <Link to="/my-trip" className="text-slate-300 hover:text-teal-400 transition-colors">
              My Trip
            </Link>
          </div>
        </div>

        {/* Recruitment Note & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} TripWise. All rights reserved.</p>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900/80 border border-navy-800 text-slate-300">
            <span>Built for</span>
            <span className="font-semibold text-teal-400">AWS Student Builder Group – VIT Chennai Recruitment Task</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
