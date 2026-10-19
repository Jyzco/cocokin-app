import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Place, UserFilter, VisitPlan, CurationGuide } from './types';
import {
  INITIAL_PLACES,
  CURATION_GUIDES,
  INITIAL_VISIT_PLANS,
} from './data/mockData';
import { rankPlaces } from './utils/matchingEngine';

import { StickyHeader } from './components/StickyHeader';
import { LocationModal } from './components/LocationModal';
import { HeroPromoCarousel } from './components/HeroPromoCarousel';
import { CenterCarousel3D } from './components/CenterCarousel3D';
import { FeedSections } from './components/FeedSections';
import { DetailPlaceView } from './components/DetailPlaceView';
import { SmartFilterView } from './components/SmartFilterView';
import { ActivityView } from './components/ActivityView';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ArticleModal } from './components/ArticleModal';
import { StickyBottomNav } from './components/StickyBottomNav';

interface ToastData {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState('Semarang');
  const [activeTab, setActiveTab] = useState<'beranda' | 'filter' | 'aktivitas'>('beranda');
  const [searchQuery, setSearchQuery] = useState('');

  const [places] = useState<Place[]>(INITIAL_PLACES);
  const [guides] = useState<CurationGuide[]>(CURATION_GUIDES);

  const [visitPlans, setVisitPlans] = useState<VisitPlan[]>(() => {
    try {
      const saved = localStorage.getItem('cocokin_plans_v3');
      return saved ? JSON.parse(saved) : INITIAL_VISIT_PLANS;
    } catch {
      return INITIAL_VISIT_PLANS;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cocokin_favs_v3');
      return saved ? JSON.parse(saved) : ['p-1', 'p-2'];
    } catch {
      return ['p-1', 'p-2'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cocokin_plans_v3', JSON.stringify(visitPlans));
      localStorage.setItem('cocokin_favs_v3', JSON.stringify(favorites));
    } catch {
      // Ignore storage quota errors
    }
  }, [visitPlans, favorites]);

  // Default User Preferences
  const [filter, setFilter] = useState<UserFilter>({
    activity: 'Semua',
    category: 'Semua',
    maxBudget: 45000,
    maxDistance: 5,
    atmosphere: ['Tenang', 'Nyaman / Cozy'],
    facilities: ['AC Dingin', 'WiFi Cepat', 'Stopkontak Meja'],
  });

  const [selectedFilterChip, setSelectedFilterChip] = useState('Semua');

  // Active Views & Modals
  const [selectedPlaceForDetail, setSelectedPlaceForDetail] = useState<Place | null>(null);
  const [selectedPlaceForVideo, setSelectedPlaceForVideo] = useState<Place | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<CurationGuide | null>(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  // Subtle Floating Toast Notification
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback(
    (title: string, subtitle?: string, actionLabel?: string, onAction?: () => void) => {
      setToast({ title, subtitle, actionLabel, onAction });
      const timer = setTimeout(() => {
        setToast(null);
      }, 3600);
      return () => clearTimeout(timer);
    },
    []
  );

  // Ranked places for Beranda
  const berandaPlaces = useMemo(() => {
    let pool = [...places];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.atmosphere.some((a) => a.toLowerCase().includes(q)) ||
          p.facilities.some((f) => f.toLowerCase().includes(q))
      );
    }

    if (selectedFilterChip === 'Nugas & Kerja') {
      pool = pool.filter((p) => p.activities.includes('Nugas / Kerja'));
    } else if (selectedFilterChip === 'Tenang & AC') {
      pool = pool.filter(
        (p) => p.atmosphere.includes('Tenang') && p.facilities.includes('AC Dingin')
      );
    } else if (selectedFilterChip === 'Nongkrong Bareng') {
      pool = pool.filter((p) => p.activities.includes('Nongkrong'));
    } else if (selectedFilterChip === 'Udara Terbuka') {
      pool = pool.filter((p) => p.atmosphere.includes('Udara Terbuka / Asri'));
    } else if (selectedFilterChip === 'Favorit Saya') {
      pool = pool.filter((p) => favorites.includes(p.id));
    }

    return rankPlaces(pool, filter);
  }, [places, searchQuery, selectedFilterChip, favorites, filter]);

  // Ranked places for Smart Filter Tab
  const smartFilteredPlaces = useMemo(() => {
    let pool = [...places];

    if (filter.category && filter.category !== 'Semua') {
      pool = pool.filter((p) => p.category === filter.category);
    }
    if (filter.activity && filter.activity !== 'Semua') {
      pool = pool.filter((p) => p.activities.includes(filter.activity));
    }

    return rankPlaces(pool, filter);
  }, [places, filter]);

  // Handlers
  const handleToggleFavorite = (placeId: string) => {
    const isAlreadyFav = favorites.includes(placeId);
    const targetPlace = places.find((p) => p.id === placeId);
    setFavorites((prev) =>
      isAlreadyFav ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
    if (targetPlace) {
      showToast(
        isAlreadyFav ? 'Dihapus dari Favorit' : 'Disimpan ke Favorit',
        targetPlace.name
      );
    }
  };

  const handleBookPlan = (
    date: string,
    timeSlot: string,
    partySize: number,
    notes: string
  ) => {
    if (!selectedPlaceForDetail) return;
    const newPlan: VisitPlan = {
      id: `plan-${Date.now()}`,
      placeId: selectedPlaceForDetail.id,
      placeName: selectedPlaceForDetail.name,
      placeImage: selectedPlaceForDetail.posterImage,
      placeArea: `${selectedPlaceForDetail.area}, ${selectedPlaceForDetail.city}`,
      placeAddress: selectedPlaceForDetail.address,
      distanceKm: selectedPlaceForDetail.distanceKm,
      date,
      timeSlot,
      partySize,
      notes,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setVisitPlans((prev) => [newPlan, ...prev]);
    showToast(
      'Rencana Kunjungan Tersimpan',
      `${selectedPlaceForDetail.name} • ${date} (${timeSlot})`,
      'Lihat Rencana',
      () => {
        setSelectedPlaceForDetail(null);
        setActiveTab('aktivitas');
      }
    );
  };

  const handleRemovePlan = (planId: string) => {
    setVisitPlans((prev) => prev.filter((p) => p.id !== planId));
    showToast('Rencana Kunjungan Dihapus', 'Jadwal kunjungan telah dihapus.');
  };

  const handleResetFilter = () => {
    setFilter({
      activity: 'Semua',
      category: 'Semua',
      maxBudget: 45000,
      maxDistance: 5,
      atmosphere: ['Tenang', 'Nyaman / Cozy'],
      facilities: ['AC Dingin', 'WiFi Cepat', 'Stopkontak Meja'],
    });
    setSelectedFilterChip('Semua');
    setSearchQuery('');
    showToast('Preferensi Direset', 'Menampilkan kembali pengaturan awal.');
  };

  return (
    <div className="w-full max-w-[430px] min-h-screen bg-[#FAF8F5] shadow-[0_0_70px_rgba(0,0,0,0.45)] relative flex flex-col overflow-x-hidden">
      {/* Subtle Notification Toast */}
      {toast && (
        <div className="fixed top-4 inset-x-4 max-w-[398px] mx-auto z-50 bg-[#4D433E] text-[#FAF8F5] px-4 py-3 rounded-2xl shadow-xl border border-[#DFD1BB]/20 flex items-center justify-between gap-3 animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-6 h-6 rounded-full bg-[#B2AC88]/25 text-[#DFD1BB] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
            </div>
            <div className="overflow-hidden">
              <h5 className="text-[12px] font-bold truncate">{toast.title}</h5>
              {toast.subtitle && (
                <p className="text-[10px] text-[#DFD1BB]/85 truncate">{toast.subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {toast.actionLabel && toast.onAction && (
              <button
                onClick={() => {
                  toast.onAction?.();
                  setToast(null);
                }}
                className="px-2.5 py-1 rounded-full bg-[#C65D52] text-white text-[10px] font-bold hover:opacity-90 transition-opacity"
              >
                {toast.actionLabel}
              </button>
            )}
            <button
              onClick={() => setToast(null)}
              aria-label="Tutup notifikasi"
              className="p-1 rounded-full text-[#DFD1BB]/70 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content vs Detail Place View */}
      {selectedPlaceForDetail ? (
        <DetailPlaceView
          place={selectedPlaceForDetail}
          onBack={() => setSelectedPlaceForDetail(null)}
          onPlayVideo={(p) => setSelectedPlaceForVideo(p)}
          isFavorite={favorites.includes(selectedPlaceForDetail.id)}
          onToggleFavorite={() => handleToggleFavorite(selectedPlaceForDetail.id)}
          onBookPlan={handleBookPlan}
          onShowToast={showToast}
        />
      ) : (
        <>
          <StickyHeader
            currentCity={currentCity}
            onOpenCityModal={() => setIsCityModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenFilterTab={() => {
              setActiveTab('filter');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSavedTab={() => {
              setActiveTab('aktivitas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            savedCount={visitPlans.length + favorites.length}
          />

          <main className="flex-1 pb-20">
            {activeTab === 'beranda' && (
              <div>
                <HeroPromoCarousel
                  filter={filter}
                  onOpenFilterTab={() => {
                    setActiveTab('filter');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <CenterCarousel3D
                  places={berandaPlaces}
                  onSelectPlace={(place) => setSelectedPlaceForDetail(place)}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  selectedFilterChip={selectedFilterChip}
                  onSelectFilterChip={setSelectedFilterChip}
                  onResetSearch={() => {
                    setSearchQuery('');
                    setSelectedFilterChip('Semua');
                  }}
                />

                <FeedSections
                  places={berandaPlaces}
                  allPlaces={places}
                  guides={guides}
                  onSelectPlace={(place) => setSelectedPlaceForDetail(place)}
                  onPlayVideo={(place) => setSelectedPlaceForVideo(place)}
                  onOpenGuide={(guide) => setSelectedGuide(guide)}
                  onGoToSmartFilter={() => {
                    setActiveTab('filter');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'filter' && (
              <SmartFilterView
                filter={filter}
                onFilterChange={setFilter}
                rankedPlaces={smartFilteredPlaces}
                onSelectPlace={(place) => setSelectedPlaceForDetail(place)}
                onResetFilter={handleResetFilter}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {activeTab === 'aktivitas' && (
              <ActivityView
                plans={visitPlans}
                favorites={favorites}
                places={places}
                onRemovePlan={handleRemovePlan}
                onRemoveFavorite={handleToggleFavorite}
                onSelectPlace={(place) => setSelectedPlaceForDetail(place)}
                onGoToHome={() => {
                  setActiveTab('beranda');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </main>

          <StickyBottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            planCount={visitPlans.length}
            favoriteCount={favorites.length}
          />
        </>
      )}

      {/* Modals */}
      <LocationModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        currentCity={currentCity}
        onSelectCity={(city) => {
          setCurrentCity(city);
          setSelectedPlaceForDetail(null);
          showToast(`Lokasi: ${city}`, `Menampilkan rekomendasi tempat untuk wilayah ${city}.`);
        }}
      />

      <VideoPlayerModal
        place={selectedPlaceForVideo}
        onClose={() => setSelectedPlaceForVideo(null)}
        onOpenDetail={(place) => {
          setSelectedPlaceForVideo(null);
          setSelectedPlaceForDetail(place);
        }}
      />

      <ArticleModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
      />
    </div>
  );
};
export default App;
