import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import SkeletonCard from '@/components/SkeletonCard';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PrayerPage = lazy(() => import('./pages/PrayerPage'));
const QuranPage = lazy(() => import('./pages/QuranPage'));
const TasbihPage = lazy(() => import('./pages/TasbihPage'));
const ZakatPage = lazy(() => import('./pages/ZakatPage'));
const DuasPage = lazy(() => import('./pages/DuasPage'));
const DhikrPage = lazy(() => import('./pages/DhikrPage'));
const QiblaPage = lazy(() => import('./pages/QiblaPage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const MorePage = lazy(() => import('./pages/MorePage'));
const NamesOfAllahPage = lazy(() => import('./pages/NamesOfAllahPage'));
const HowToPrayPage = lazy(() => import('./pages/HowToPrayPage'));
const HadithStoriesPage = lazy(() => import('./pages/HadithStoriesPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const NearbyPage = lazy(() => import('./pages/NearbyPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const Fallback = () => (
  <div className="min-h-screen px-5 pt-8 space-y-4 max-w-lg mx-auto">
    <SkeletonCard lines={2} />
    <SkeletonCard lines={3} />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<Fallback />}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/prayer" element={<PrayerPage />} />
              <Route path="/quran" element={<QuranPage />} />
              <Route path="/tasbih" element={<TasbihPage />} />
              <Route path="/zakat" element={<ZakatPage />} />
              <Route path="/duas" element={<DuasPage />} />
              <Route path="/dhikr" element={<DhikrPage />} />
              <Route path="/qibla" element={<QiblaPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/more" element={<MorePage />} />
              <Route path="/names-of-allah" element={<NamesOfAllahPage />} />
              <Route path="/how-to-pray" element={<HowToPrayPage />} />
              <Route path="/nearby" element={<NearbyPage />} />
              <Route path="/hadith-stories" element={<HadithStoriesPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          <BottomNav />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
