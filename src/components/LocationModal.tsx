import React, { useState } from 'react';
import { X, Search, Navigation, Check, ArrowLeft } from 'lucide-react';
import { POPULAR_CITIES } from '../data/mockData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  onSelectCity: (city: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredCities = POPULAR_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.areas.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2A2421]/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-[430px] bg-[#FAF8F5] rounded-t-[28px] sm:rounded-[28px] max-h-[86vh] flex flex-col shadow-2xl overflow-hidden border border-[#D7D6CE] animate-in slide-in-from-bottom duration-250">
        {/* Grabber */}
        <div className="pt-2.5 pb-1 flex justify-center">
          <div className="w-9 h-1.5 rounded-full bg-[#4D433E]/20" />
        </div>

        {/* Header & Search */}
        <div className="px-4 pt-2 pb-3 border-b border-[#D7D6CE] flex items-center gap-2.5">
          <button
            onClick={onClose}
            aria-label="Kembali"
            className="w-8 h-8 rounded-full bg-[#EAE8E1] hover:bg-[#DFD1BB] flex items-center justify-center text-[#4D433E] shrink-0 active:scale-92 transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          <div className="flex-1 flex items-center bg-[#EAE8E1] px-3.5 py-2 rounded-full border border-[#D7D6CE] focus-within:bg-white focus-within:border-[#C65D52] transition-all">
            <Search className="w-4 h-4 text-[#4D433E]/60 mr-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kota atau area (mis. Tembalang)..."
              className="w-full bg-transparent text-[13px] text-[#4D433E] placeholder-[#4D433E]/50 outline-hidden font-medium"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="p-0.5 rounded-full bg-[#4D433E]/20 text-[#4D433E]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* City List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-[#D7D6CE]/70">
          {filteredCities.map((cityObj) => {
            const isSelected =
              cityObj.name.toLowerCase() === currentCity.toLowerCase();
            return (
              <button
                key={cityObj.name}
                onClick={() => {
                  onSelectCity(cityObj.name);
                  onClose();
                }}
                className="w-full py-3.5 px-2 flex items-center justify-between text-left hover:bg-[#EAE8E1]/60 rounded-xl transition-colors"
              >
                <div>
                  <span
                    className={`text-[13px] uppercase tracking-wide block ${
                      isSelected
                        ? 'font-bold text-[#C65D52]'
                        : 'font-bold text-[#4D433E]'
                    }`}
                  >
                    {cityObj.name}
                  </span>
                  <span className="text-[11px] text-[#4D433E]/65 mt-0.5 block">
                    Area: {cityObj.areas}
                  </span>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#C65D52] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
          {filteredCities.length === 0 && (
            <div className="py-10 text-center text-xs text-[#4D433E]/60">
              Lokasi "{search}" tidak ditemukan.
            </div>
          )}
        </div>

        {/* Sticky Geolocation CTA */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#D7D6CE]">
          <button
            onClick={() => {
              onSelectCity('Semarang');
              onClose();
            }}
            className="w-full py-3.5 px-4 bg-[#4D433E] hover:opacity-95 text-[#FAF8F5] font-bold text-[12px] uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
          >
            <Navigation className="w-4 h-4 fill-current text-[#DFD1BB]" />
            Gunakan Lokasi Saya Saat Ini
          </button>
        </div>
      </div>
    </div>
  );
};
