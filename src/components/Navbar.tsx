import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Compass, Bookmark, Search, Menu, X, MapPin } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export const Navbar: React.FC = () => {
  const { tripCount } = useTrip();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    navigate('/');
    // Smooth scroll down to the search section
    setTimeout(() => {
      const searchInput = document.getElementById('hero-search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-subtle border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo & Icon */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-navy-900 flex items-center gap-1 font-sans">
                TripWise
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-600 hidden sm:block">
                Smart Travel Planner
              </span>
            </div>
          </Link>

          {/* Center/Desktop: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-white/50'
                }`
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/my-trip"
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-white/50'
                }`
              }
            >
              <span>My Trip</span>
              {tripCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-teal-600 text-white min-w-[20px]">
                  {tripCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Right: Search button & My Trip count badge */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleSearchClick}
              className="p-2.5 rounded-full text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              aria-label="Search destinations"
              title="Search destinations"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/my-trip"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200/80 font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Bookmark className="w-4 h-4 text-teal-600" />
              <span>Itinerary</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-teal-600 text-white min-w-[20px]">
                {tripCount}
              </span>
            </Link>
          </div>

          {/* Mobile Right: Menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/my-trip"
              className="relative p-2 text-slate-600 hover:text-navy-900"
              aria-label="Saved places"
            >
              <Bookmark className="w-5 h-5" />
              {tripCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-teal-600 text-white">
                  {tripCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-200/80 mt-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <Compass className="w-5 h-5 text-teal-600" />
                Explore Destinations
              </NavLink>

              <NavLink
                to="/my-trip"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="w-5 h-5 text-teal-600" />
                  My Trip Itinerary
                </div>
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-bold rounded-full bg-teal-600 text-white">
                  {tripCount}
                </span>
              </NavLink>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSearchClick();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-100 text-left"
              >
                <Search className="w-5 h-5 text-slate-400" />
                Search destinations...
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
