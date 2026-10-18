import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { TripProvider } from './context/TripContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ExplorePage } from './pages/ExplorePage';
import { DestinationDetailsPage } from './pages/DestinationDetailsPage';
import { MyTripPage } from './pages/MyTripPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <TripProvider>
          <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
            <ScrollToTop />
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<ExplorePage />} />
                <Route path="/destination/:id" element={<DestinationDetailsPage />} />
                <Route path="/my-trip" element={<MyTripPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </TripProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
