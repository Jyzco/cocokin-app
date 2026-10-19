import React, { useState } from 'react';
import {
  Calendar,
  Heart,
  Clock,
  Users,
  Navigation,
  Trash2,
  MapPin,
  Bookmark
} from 'lucide-react';
import { VisitPlan, Place } from '../types';

interface ActivityViewProps {
  plans: VisitPlan[];
  favorites: string[];
  places: Place[];
  onRemovePlan: (planId: string) => void;
  onRemoveFavorite: (placeId: string) => void;
  onSelectPlace: (place: Place) => void;
  onGoToHome: () => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({
  plans,
  favorites,
  places,
  onRemovePlan,
  onRemoveFavorite,
  onSelectPlace,
  onGoToHome,
}) => {
  const [subTab, setSubTab] = useState<'plans' | 'favorites'>('plans');
  const [activeCategoryChip, setActiveCategoryChip] = useState('Semua');

  const categoryChips = ['Semua', 'Cafe', 'Working Space', 'Resto', 'Outdoor & Wisata'];

  const favoritePlaces = places.filter((p) => {
    const isFav = favorites.includes(p.id);
    if (!isFav) return false;
    if (activeCategoryChip === 'Semua') return true;
    return p.category === activeCategoryChip;
  });

  return (
    <div className="p-4 bg-[#FAF8F5] min-h-screen pb-28 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-[17px] font-bold text-[#4D433E] tracking-tight">
          Rencana Kunjungan & Favorit
        </h2>
        <p className="text-[11px] text-[#4D433E]/65 mt-0.5">
          Tempat yang kamu simpan dan jadwal rencana kunjunganmu
        </p>
      </div>

      {/* Segmented Sub-Tab Switcher */}
      <div className="bg-[#EAE8E1] p-1 rounded-xl flex border border-[#D7D6CE]">
        <button
          onClick={() => setSubTab('plans')}
          className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition-all ${
            subTab === 'plans'
              ? 'bg-white text-[#4D433E] shadow-2xs'
              : 'text-[#4D433E]/65 hover:text-[#4D433E]'
          }`}
        >
          RENCANA KUNJUNGAN ({plans.length})
        </button>
        <button
          onClick={() => setSubTab('favorites')}
          className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition-all ${
            subTab === 'favorites'
              ? 'bg-white text-[#4D433E] shadow-2xs'
              : 'text-[#4D433E]/65 hover:text-[#4D433E]'
          }`}
        >
          TEMPAT FAVORIT ({favorites.length})
        </button>
      </div>

      {/* Category Filter Chips when on Favorites */}
      {subTab === 'favorites' && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categoryChips.map((chip) => {
            const isSelected = activeCategoryChip === chip;
            return (
              <button
                key={chip}
                onClick={() => setActiveCategoryChip(chip)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#4D433E] text-[#FAF8F5]'
                    : 'bg-[#EAE8E1] text-[#4D433E]/80 hover:bg-[#DFD1BB]/70 border border-[#D7D6CE]'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      )}

      {/* TAB 1: RENCANA KUNJUNGAN */}
      {subTab === 'plans' && (
        <div className="space-y-3.5 pt-1">
          {plans.length > 0 ? (
            plans.map((plan) => {
              const matchedPlace = places.find((p) => p.id === plan.placeId);
              return (
                <div
                  key={plan.id}
                  className="rounded-[22px] border border-[#D7D6CE] bg-white overflow-hidden shadow-[0_4px_16px_rgba(77,67,62,0.05)]"
                >
                  {/* Top Bar */}
                  <div className="bg-[#4D433E] text-[#FAF8F5] px-4 py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-[#DFD1BB]" />
                      <span>{plan.date}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5 text-[#DFD1BB]" />
                      <span>{plan.timeSlot} WIB</span>
                    </div>
                    <span className="bg-[#B2AC88]/30 text-[#DFD1BB] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                      Terjadwal
                    </span>
                  </div>

                  <div className="p-4 flex gap-3.5">
                    <img
                      src={plan.placeImage}
                      alt={plan.placeName}
                      onClick={() => matchedPlace && onSelectPlace(matchedPlace)}
                      className="w-[74px] aspect-[2/3] rounded-2xl object-cover shrink-0 border border-[#D7D6CE] cursor-pointer"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4
                          onClick={() => matchedPlace && onSelectPlace(matchedPlace)}
                          className="text-[15px] font-bold text-[#4D433E] line-clamp-1 cursor-pointer hover:text-[#C65D52]"
                        >
                          {plan.placeName}
                        </h4>
                        <p className="text-[11px] text-[#4D433E]/65 line-clamp-1 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C65D52] shrink-0" />
                          <span>
                            {plan.placeArea} ({plan.distanceKm} km)
                          </span>
                        </p>

                        <div className="mt-2.5 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#D7D6CE]/80 text-[11px] text-[#4D433E] space-y-1">
                          <div className="flex items-center gap-1.5 font-semibold">
                            <Users className="w-3.5 h-3.5 text-[#3E4D3B]" />
                            <span>{plan.partySize} Orang</span>
                          </div>
                          {plan.notes && (
                            <p className="text-[11px] text-[#4D433E]/75 line-clamp-1">
                              Catatan: {plan.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-3 pt-2.5 border-t border-[#D7D6CE]/70 flex items-center justify-between gap-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            plan.placeName + ' ' + plan.placeAddress
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3.5 rounded-full bg-[#3E4D3B] hover:opacity-95 text-[#FAF8F5] font-bold text-[11px] flex items-center gap-1.5 active:scale-96 transition-all"
                        >
                          <Navigation className="w-3 h-3 fill-current" />
                          Rute Navigasi
                        </a>
                        <button
                          onClick={() => onRemovePlan(plan.id)}
                          aria-label="Hapus rencana kunjungan"
                          className="p-1.5 rounded-full text-[#4D433E]/50 hover:text-[#C65D52] hover:bg-[#C65D52]/10 transition-colors"
                          title="Hapus Rencana"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-14 text-center px-6 bg-white rounded-[24px] border border-[#D7D6CE]">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#DFD1BB]/50 flex items-center justify-center text-[#4D433E] mb-3.5">
                <Calendar className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h4 className="text-[16px] font-bold text-[#4D433E]">
                Belum Ada Rencana Kunjungan
              </h4>
              <p className="text-[12px] text-[#4D433E]/65 max-w-[250px] mx-auto mt-1 leading-relaxed">
                Pilih tempat yang cocok, cek jam lengang, dan simpan jadwal kunjunganmu di sini.
              </p>
              <button
                onClick={onGoToHome}
                className="mt-5 py-2.5 px-6 rounded-full bg-[#4D433E] hover:opacity-95 text-[#FAF8F5] font-bold text-[12px] shadow-xs active:scale-96 transition-all"
              >
                Cari Tempat Sekarang
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TEMPAT FAVORIT */}
      {subTab === 'favorites' && (
        <div className="space-y-3 pt-1">
          {favoritePlaces.length > 0 ? (
            favoritePlaces.map((place) => (
              <div
                key={place.id}
                onClick={() => onSelectPlace(place)}
                className="p-3 rounded-[20px] border border-[#D7D6CE] bg-white hover:border-[#C65D52]/50 shadow-[0_4px_14px_rgba(77,67,62,0.04)] active:scale-[0.99] cursor-pointer flex gap-3.5 transition-all"
              >
                <img
                  src={place.posterImage}
                  alt={place.name}
                  className="w-[70px] aspect-[2/3] rounded-2xl object-cover shrink-0 border border-[#D7D6CE]"
                />
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#3E4D3B] uppercase tracking-wider">
                        {place.category} • {place.suitabilityScore}% cocok
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(place.id);
                        }}
                        aria-label="Hapus dari favorit"
                        className="text-[#C65D52] hover:bg-[#C65D52]/10 p-1 rounded-full transition-colors"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    <h4 className="text-[14px] font-bold text-[#4D433E] mt-0.5 line-clamp-1">
                      {place.name}
                    </h4>
                    <p className="text-[11px] text-[#4D433E]/65 line-clamp-1 mt-0.5">
                      {place.area} • {place.distanceKm} km dari lokasimu
                    </p>
                    <p className="text-[11px] font-bold text-[#C65D52] mt-1.5">
                      Rp {place.avgBudget.toLocaleString('id-ID')} / orang
                    </p>
                  </div>
                  <div className="flex justify-end text-[11px] font-bold text-[#4D433E]">
                    Lihat Detail &gt;
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-14 text-center px-6 bg-white rounded-[24px] border border-[#D7D6CE]">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#C5AEB1]/35 flex items-center justify-center text-[#3E3B59] mb-3.5">
                <Bookmark className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h4 className="text-[16px] font-bold text-[#4D433E]">
                Belum Ada Tempat Favorit
              </h4>
              <p className="text-[12px] text-[#4D433E]/65 max-w-[250px] mx-auto mt-1 leading-relaxed">
                Simpan tempat yang menarik perhatianmu agar mudah diakses kembali kapan saja.
              </p>
              <button
                onClick={onGoToHome}
                className="mt-5 py-2.5 px-6 rounded-full bg-[#4D433E] hover:opacity-95 text-[#FAF8F5] font-bold text-[12px] shadow-xs active:scale-96 transition-all"
              >
                Eksplor Tempat
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
