import React from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  Bookmark,
  X,
  CloudSun
} from 'lucide-react';

interface StickyHeaderProps {
  currentCity: string;
  onOpenCityModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenFilterTab: () => void;
  onOpenSavedTab: () => void;
  savedCount: number;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  currentCity,
  onOpenCityModal,
  searchQuery,
  onSearchChange,
  onOpenFilterTab,
  onOpenSavedTab,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#D7D6CE]/70 transition-all">
      {/* Top Search & User Actions */}
      <div className="px-4 pt-3 pb-2.5 flex items-center gap-2">
        {/* Brand Mark + Capsule Search Input */}
        <div className="flex-1 flex items-center bg-[#EAE8E1]/80 px-3.5 py-2 rounded-full border border-[#D7D6CE] focus-within:bg-white focus-within:border-[#C65D52] focus-within:ring-2 focus-within:ring-[#C65D52]/15 transition-all">
          <Search className="w-4 h-4 text-[#4D433E]/60 mr-2 shrink-0 stroke-[2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari tempat, suasana, area kos..."
            aria-label="Cari tempat di CocokIn"
            className="w-full bg-transparent text-[13px] text-[#4D433E] placeholder-[#4D433E]/50 outline-hidden font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Hapus pencarian"
              className="p-0.5 rounded-full bg-[#4D433E]/15 text-[#4D433E] hover:bg-[#4D433E]/25 transition-colors ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* User Quick Actions: Filter Preferensi & Tersimpan */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenFilterTab}
            aria-label="Atur Filter Preferensi"
            title="Atur Filter Preferensi"
            className="w-9 h-9 rounded-full bg-[#EAE8E1]/80 hover:bg-[#DFD1BB]/70 flex items-center justify-center text-[#4D433E] active:scale-94 transition-all border border-[#D7D6CE]/80"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
          </button>

          <button
            onClick={onOpenSavedTab}
            aria-label="Tempat Tersimpan & Rencana Kunjungan"
            title="Tersimpan & Rencana Kunjungan"
            className="w-9 h-9 rounded-full bg-[#EAE8E1]/80 hover:bg-[#DFD1BB]/70 flex items-center justify-center text-[#4D433E] active:scale-94 relative transition-all border border-[#D7D6CE]/80"
          >
            <Bookmark className="w-4 h-4 stroke-[2]" />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C65D52] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center ring-2 ring-[#FAF8F5]">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Location & Local Weather Bar */}
      <button
        onClick={onOpenCityModal}
        className="w-full px-4 py-2 bg-[#DFD1BB]/35 hover:bg-[#DFD1BB]/55 border-t border-[#D7D6CE]/60 flex items-center justify-between text-left transition-colors group"
      >
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#C65D52] stroke-[2.3] shrink-0" />
          <span className="text-[11px] font-bold text-[#4D433E] uppercase tracking-wider">
            {currentCity}
          </span>
          <span className="text-[11px] text-[#4D433E]/65">• Sekitar Lokasimu</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#4D433E]/60 group-hover:translate-y-0.5 transition-transform" />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#3E4D3B]">
          <CloudSun className="w-3.5 h-3.5 text-[#C65D52]" />
          <span>27°C Cerah</span>
        </div>
      </button>
    </header>
  );
};
