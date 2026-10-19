import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Star,
  MapPin,
  Check,
  RotateCcw,
  ArrowRight,
  Heart
} from 'lucide-react';
import { Place, UserFilter } from '../types';

interface SmartFilterViewProps {
  filter: UserFilter;
  onFilterChange: (newFilter: UserFilter) => void;
  rankedPlaces: Place[];
  onSelectPlace: (place: Place) => void;
  onResetFilter: () => void;
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
}

export const SmartFilterView: React.FC<SmartFilterViewProps> = ({
  filter,
  onFilterChange,
  rankedPlaces,
  onSelectPlace,
  onResetFilter,
  favorites,
  onToggleFavorite,
}) => {
  const [showTipBanner, setShowTipBanner] = useState(true);

  const activities = [
    'Semua',
    'Nugas / Kerja',
    'Nongkrong',
    'Makan Bersama',
    'Me-Time',
    'Rekreasi / Santai',
  ];
  const categories = [
    'Semua',
    'Cafe',
    'Resto',
    'Working Space',
    'Outdoor & Wisata',
  ];
  const atmospheres = [
    'Tenang',
    'Nyaman / Cozy',
    'Estetik',
    'Udara Terbuka / Asri',
    'Ramai / Hidup',
  ];
  const facilitiesList = [
    'AC Dingin',
    'WiFi Cepat',
    'Stopkontak Meja',
    'Area Outdoor',
    'Parkir Luas',
    'Musholla',
  ];

  const toggleAtmosphere = (item: string) => {
    const exists = filter.atmosphere.includes(item);
    const updated = exists
      ? filter.atmosphere.filter((a) => a !== item)
      : [...filter.atmosphere, item];
    onFilterChange({ ...filter, atmosphere: updated });
  };

  const toggleFacility = (item: string) => {
    const exists = filter.facilities.includes(item);
    const updated = exists
      ? filter.facilities.filter((f) => f !== item)
      : [...filter.facilities, item];
    onFilterChange({ ...filter, facilities: updated });
  };

  return (
    <div className="p-4 space-y-5 bg-[#FAF8F5] min-h-screen pb-28">
      {/* Dismissible Tip Banner */}
      {showTipBanner && (
        <div className="bg-[#DFD1BB]/55 border border-[#D7D6CE] rounded-2xl p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#4D433E] text-[#DFD1BB] flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-[#4D433E]">
                Simpan tempat yang cocok untukmu
              </h4>
              <p className="text-[11px] text-[#4D433E]/75">
                Tandai tempat favorit agar mudah dibandingkan sebelum berangkat.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTipBanner(false)}
            className="px-3 py-1.5 rounded-full bg-[#4D433E] text-[#FAF8F5] text-[11px] font-bold shrink-0 active:scale-95 transition-transform"
          >
            Mengerti
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-[#C65D52]" />
            <h2 className="text-[17px] font-bold text-[#4D433E] tracking-tight">
              Filter Preferensi & Rekomendasi
            </h2>
          </div>
          <p className="text-[11px] text-[#4D433E]/65 mt-0.5">
            Sesuaikan budget, jarak, suasana, dan fasilitas tempat
          </p>
        </div>

        <button
          onClick={onResetFilter}
          title="Reset Filter"
          className="px-3 py-1.5 rounded-full bg-[#EAE8E1] hover:bg-[#DFD1BB] text-[#4D433E] text-[11px] font-bold flex items-center gap-1 transition-colors border border-[#D7D6CE]"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Sliders Box (Matching Slide 15 Wireframe: Budget & Jarak) */}
      <div className="p-4 bg-white rounded-[22px] border border-[#D7D6CE] space-y-4 shadow-[0_2px_10px_rgba(77,67,62,0.03)]">
        {/* Budget Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] font-bold text-[#4D433E]">
              Budget Maksimal / Orang
            </span>
            <span className="text-[12px] font-bold text-[#C65D52] bg-[#C65D52]/10 px-2.5 py-0.5 rounded-full">
              Rp {filter.maxBudget.toLocaleString('id-ID')}
            </span>
          </div>
          <input
            type="range"
            min={15000}
            max={100000}
            step={5000}
            value={filter.maxBudget}
            onChange={(e) =>
              onFilterChange({ ...filter, maxBudget: Number(e.target.value) })
            }
            aria-label="Budget Maksimal"
            className="w-full cocok-slider"
          />
          <div className="flex justify-between text-[10px] text-[#4D433E]/60 mt-1">
            <span>Rp 15.000</span>
            <span>Rp 50.000</span>
            <span>Rp 100.000+</span>
          </div>
        </div>

        <div className="h-[1px] bg-[#D7D6CE]/70" />

        {/* Distance Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] font-bold text-[#4D433E]">
              Jarak Maksimum dari Lokasi
            </span>
            <span className="text-[12px] font-bold text-[#3E4D3B] bg-[#B2AC88]/30 px-2.5 py-0.5 rounded-full">
              {filter.maxDistance} km
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={0.5}
            value={filter.maxDistance}
            onChange={(e) =>
              onFilterChange({ ...filter, maxDistance: Number(e.target.value) })
            }
            aria-label="Jarak Maksimum"
            className="w-full cocok-slider"
          />
          <div className="flex justify-between text-[10px] text-[#4D433E]/60 mt-1">
            <span>1 km (Sekitar Kos)</span>
            <span>7 km</span>
            <span>15 km</span>
          </div>
        </div>
      </div>

      {/* Aktivitas & Kategori (Matching Slide 14 Flowchart) */}
      <div className="space-y-3">
        <div>
          <label className="text-[12px] font-bold text-[#4D433E] block mb-2">
            Jenis Aktivitas
          </label>
          <div className="flex flex-wrap gap-1.5">
            {activities.map((act) => {
              const isSelected = (filter.activity || 'Semua') === act;
              return (
                <button
                  key={act}
                  onClick={() => onFilterChange({ ...filter, activity: act })}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all active:scale-96 ${
                    isSelected
                      ? 'bg-[#4D433E] text-[#FAF8F5] shadow-2xs'
                      : 'bg-[#EAE8E1] text-[#4D433E]/80 hover:bg-[#DFD1BB]/70 border border-[#D7D6CE]'
                  }`}
                >
                  {act}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-[12px] font-bold text-[#4D433E] block mb-2">
            Kategori Tempat
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isSelected = (filter.category || 'Semua') === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onFilterChange({ ...filter, category: cat })}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all active:scale-96 ${
                    isSelected
                      ? 'bg-[#3E3B59] text-white shadow-2xs'
                      : 'bg-[#EAE8E1] text-[#4D433E]/80 hover:bg-[#DFD1BB]/70 border border-[#D7D6CE]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Suasana */}
      <div>
        <label className="text-[12px] font-bold text-[#4D433E] block mb-2">
          Suasana Tempat
        </label>
        <div className="flex flex-wrap gap-1.5">
          {atmospheres.map((atm) => {
            const isSelected = filter.atmosphere.includes(atm);
            return (
              <button
                key={atm}
                onClick={() => toggleAtmosphere(atm)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all active:scale-96 ${
                  isSelected
                    ? 'bg-[#C65D52] text-white'
                    : 'bg-[#EAE8E1] text-[#4D433E]/80 hover:bg-[#DFD1BB]/70 border border-[#D7D6CE]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                {atm}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fasilitas */}
      <div>
        <label className="text-[12px] font-bold text-[#4D433E] block mb-2">
          Fasilitas yang Dibutuhkan
        </label>
        <div className="grid grid-cols-2 gap-2">
          {facilitiesList.map((fac) => {
            const isSelected = filter.facilities.includes(fac);
            return (
              <button
                key={fac}
                onClick={() => toggleFacility(fac)}
                className={`p-2.5 rounded-2xl text-[12px] font-semibold text-left flex items-center justify-between border transition-all active:scale-98 ${
                  isSelected
                    ? 'border-[#3E4D3B] bg-[#B2AC88]/25 text-[#3E4D3B]'
                    : 'border-[#D7D6CE] bg-white text-[#4D433E] hover:bg-[#EAE8E1]/50'
                }`}
              >
                <span>{fac}</span>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#3E4D3B] text-white'
                      : 'border border-[#D7D6CE] bg-[#FAF8F5]'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hasil Rekomendasi (Matching Slide 15 Wireframe: Cards with "92% cocok") */}
      <div className="pt-3 border-t border-[#D7D6CE]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-bold text-[#4D433E]">
            Rekomendasi Tempat ({rankedPlaces.length})
          </h3>
          <span className="text-[11px] text-[#4D433E]/65 font-medium">
            Peringkat kecocokan tertinggi
          </span>
        </div>

        <div className="space-y-3">
          {rankedPlaces.map((place, idx) => {
            const isFav = favorites.includes(place.id);
            return (
              <div
                key={place.id}
                onClick={() => onSelectPlace(place)}
                className="p-3 rounded-[20px] border border-[#D7D6CE] bg-white hover:border-[#C65D52]/50 shadow-[0_4px_14px_rgba(77,67,62,0.04)] active:scale-[0.99] cursor-pointer transition-all flex gap-3.5"
              >
                <div className="relative w-[80px] aspect-[2/3] rounded-2xl overflow-hidden shrink-0 bg-[#EAE8E1] border border-[#D7D6CE]">
                  <img
                    src={place.posterImage}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-[#4D433E]/85 backdrop-blur-xs text-[#DFD1BB] font-bold text-[9px] px-1.5 py-0.5 rounded-md">
                    #{idx + 1}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-[#3E4D3B] uppercase tracking-wider">
                        {place.category} • {place.area}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#C65D52] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {place.suitabilityScore}% cocok
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(place.id);
                          }}
                          aria-label="Simpan favorit"
                          className="p-1 rounded-full hover:bg-[#FAF8F5]"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isFav
                                ? 'fill-[#C65D52] text-[#C65D52]'
                                : 'text-[#4D433E]/50'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-[14px] font-bold text-[#4D433E] mt-0.5 line-clamp-1">
                      {place.name}
                    </h4>

                    <p className="text-[11px] text-[#4D433E]/75 line-clamp-1 mt-1">
                      {place.matchReason}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-[11px] text-[#4D433E]/70">
                      <span className="flex items-center gap-1 font-bold text-[#4D433E]">
                        <Star className="w-3 h-3 fill-[#C65D52] text-[#C65D52]" />
                        {place.rating.toFixed(1)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 font-semibold text-[#3E4D3B]">
                        <MapPin className="w-3 h-3 text-[#C65D52]" /> {place.distanceKm} km
                      </span>
                      <span>•</span>
                      <span className="font-bold text-[#4D433E]">
                        Rp {place.avgBudget.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-end text-[11px] font-bold text-[#C65D52]">
                    Lihat Detail & Suasana <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
