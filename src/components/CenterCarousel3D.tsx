import React, { useState } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  ArrowDown,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { Place } from '../types';

interface CenterCarousel3DProps {
  places: Place[];
  onSelectPlace: (place: Place) => void;
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
  selectedFilterChip: string;
  onSelectFilterChip: (chip: string) => void;
  onResetSearch: () => void;
}

export const CenterCarousel3D: React.FC<CenterCarousel3DProps> = ({
  places,
  onSelectPlace,
  favorites,
  onToggleFavorite,
  selectedFilterChip,
  onSelectFilterChip,
  onResetSearch,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const chips = [
    'Semua',
    'Nugas & Kerja',
    'Tenang & AC',
    'Nongkrong Bareng',
    'Udara Terbuka',
    'Favorit Saya',
  ];

  const safeIndex = places.length > 0 ? activeIndex % places.length : 0;
  const activePlace = places[safeIndex];

  const handlePrev = () => {
    if (places.length <= 1) return;
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : places.length - 1));
  };

  const handleNext = () => {
    if (places.length <= 1) return;
    setActiveIndex((prev) => (prev < places.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="pt-3 pb-5 bg-[#FAF8F5] border-b border-[#D7D6CE]/70">
      {/* Section Header */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-[17px] font-bold text-[#4D433E] tracking-tight">
              Rekomendasi Tempat Cocok
            </h2>
            <p className="text-[11px] text-[#4D433E]/65">
              Diurutkan berdasarkan kecocokan suasana, jarak & budget
            </p>
          </div>
          {selectedFilterChip !== 'Semua' && (
            <button
              onClick={() => {
                setActiveIndex(0);
                onSelectFilterChip('Semua');
              }}
              className="text-[11px] font-bold text-[#C65D52] hover:opacity-80 transition-opacity"
            >
              Reset
            </button>
          )}
        </div>

        {/* Filter Chips Bar in Pantone Palette */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {chips.map((chip) => {
            const isSelected = selectedFilterChip === chip;
            return (
              <button
                key={chip}
                onClick={() => {
                  setActiveIndex(0);
                  onSelectFilterChip(chip);
                }}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all active:scale-96 ${
                  isSelected
                    ? 'bg-[#4D433E] text-[#FAF8F5] shadow-2xs'
                    : 'bg-[#EAE8E1] text-[#4D433E]/80 hover:bg-[#DFD1BB]/70 border border-[#D7D6CE]/80'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty Search / Filter State */}
      {places.length === 0 ? (
        <div className="mx-4 my-5 p-8 rounded-3xl bg-white text-center space-y-3 border border-[#D7D6CE]">
          <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] border border-[#D7D6CE] flex items-center justify-center mx-auto text-[#4D433E]">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#4D433E]">
              Belum Ada Tempat yang Sesuai
            </h3>
            <p className="text-xs text-[#4D433E]/65 mt-1 max-w-[240px] mx-auto">
              Coba ubah kategori suasana atau hapus kata kunci pencarian.
            </p>
          </div>
          <button
            onClick={onResetSearch}
            className="px-4 py-2 rounded-full bg-[#4D433E] text-[#FAF8F5] text-xs font-semibold hover:opacity-90 active:scale-96 transition-all"
          >
            Tampilkan Semua Tempat
          </button>
        </div>
      ) : (
        <>
          {/* 3D Center-Snapping Carousel Stage */}
          <div
            className="relative mt-2 h-[330px] w-full flex items-center justify-center overflow-hidden select-none"
            style={{ perspective: '1000px' }}
          >
            {/* Left Arrow */}
            {places.length > 1 && (
              <button
                onClick={handlePrev}
                aria-label="Tempat sebelumnya"
                className="absolute left-3 z-30 w-9 h-9 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#D7D6CE] shadow-sm flex items-center justify-center text-[#4D433E] hover:bg-white active:scale-92 transition-all"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
            )}

            {/* Right Arrow */}
            {places.length > 1 && (
              <button
                onClick={handleNext}
                aria-label="Tempat berikutnya"
                className="absolute right-3 z-30 w-9 h-9 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#D7D6CE] shadow-sm flex items-center justify-center text-[#4D433E] hover:bg-white active:scale-92 transition-all"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>
            )}

            {/* 3D Cards */}
            {places.map((place, idx) => {
              const isCenter = idx === safeIndex;
              const isPrev =
                places.length > 1 &&
                idx === (safeIndex - 1 + places.length) % places.length;
              const isNext =
                places.length > 1 &&
                idx === (safeIndex + 1) % places.length;

              if (!isCenter && !isPrev && !isNext) return null;

              let transformStyle = 'translateX(0px) scale(1) rotateY(0deg)';
              let zIndex = 20;
              let opacity = 1;

              if (!isCenter) {
                if (isPrev) {
                  transformStyle = 'translateX(-116px) scale(0.85) rotateY(10deg)';
                  zIndex = 10;
                  opacity = 0.7;
                } else if (isNext) {
                  transformStyle = 'translateX(116px) scale(0.85) rotateY(-10deg)';
                  zIndex = 10;
                  opacity = 0.7;
                }
              }

              const isFav = favorites.includes(place.id);

              return (
                <div
                  key={place.id}
                  onClick={() => {
                    if (isCenter) {
                      onSelectPlace(place);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  style={{
                    transform: transformStyle,
                    zIndex,
                    opacity,
                  }}
                  className={`absolute w-[212px] aspect-[2/3] rounded-[20px] overflow-hidden cursor-pointer transition-all duration-400 ease-out bg-[#EAE8E1] ${
                    isCenter
                      ? 'shadow-[0_18px_36px_rgba(77,67,62,0.24)] ring-1 ring-[#4D433E]/15'
                      : 'shadow-md hover:opacity-90'
                  }`}
                >
                  <img
                    src={place.posterImage}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Warm Espresso Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/90 via-[#2A2421]/15 to-black/25" />

                  {/* Top Left: Suitability Score Badge (Match % as in Wireframe Hal. 15) */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#C65D52] text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-xs tracking-wide">
                      {place.suitabilityScore}% cocok
                    </span>
                  </div>

                  {/* Top Right: Rank Badge */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#4D433E]/80 backdrop-blur-md text-[#DFD1BB] font-bold text-[11px] flex items-center justify-center border border-white/15">
                    {idx + 1}
                  </div>

                  {/* Favorite Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(place.id);
                    }}
                    aria-label={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                    className="absolute top-11 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:scale-105 active:scale-92 transition-transform border border-white/15"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'fill-[#C65D52] text-[#C65D52]' : 'text-white'
                      }`}
                    />
                  </button>

                  {/* Poster Bottom Info */}
                  <div className="absolute bottom-11 inset-x-3 text-white">
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-[#DFD1BB] uppercase tracking-wider">
                      <span>{place.area}</span>
                      <span>•</span>
                      <span>{place.distanceKm} km</span>
                    </div>
                    <h4 className="text-[13px] font-bold line-clamp-1 leading-snug mt-0.5 text-white">
                      {place.name}
                    </h4>
                  </div>

                  {/* Integrated Coffee Bean CTA on Active Center Card */}
                  {isCenter ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlace(place);
                      }}
                      className="absolute bottom-0 inset-x-0 bg-[#4D433E] hover:bg-[#3d3531] text-[#FAF8F5] font-bold text-[11px] py-2.5 tracking-wider uppercase flex items-center justify-center transition-colors"
                    >
                      LIHAT DETAIL & SUASANA
                    </button>
                  ) : (
                    <div className="absolute bottom-0 inset-x-0 bg-[#2A2421]/75 text-[#DFD1BB] font-medium text-[10px] py-2 text-center">
                      Pilih tempat
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reactive Place Summary Below Carousel */}
          {activePlace && (
            <div className="px-5 mt-2 text-center">
              <h3 className="text-[17px] font-bold text-[#4D433E] tracking-tight">
                {activePlace.name}
              </h3>

              {/* Rating, Distance & Crowd Status in Pantone Earthy Tones */}
              <div className="flex items-center justify-center flex-wrap gap-2 mt-1.5 text-xs">
                <div className="flex items-center gap-1 bg-[#DFD1BB]/55 text-[#4D433E] px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                  <Star className="w-3 h-3 fill-[#C65D52] text-[#C65D52]" />
                  <span>{activePlace.rating.toFixed(1)}</span>
                  <span className="text-[#4D433E]/60 font-normal">
                    ({activePlace.ratingCount})
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#EAE8E1] text-[#4D433E] px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
                  <MapPin className="w-3 h-3 text-[#C65D52]" />
                  <span>
                    {activePlace.distanceKm} km (~{activePlace.travelTimeMin} mnt)
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    activePlace.crowdStatus === 'sepi'
                      ? 'bg-[#B2AC88]/30 text-[#3E4D3B]'
                      : activePlace.crowdStatus === 'sedang'
                      ? 'bg-[#DFD1BB]/70 text-[#4D433E]'
                      : 'bg-[#C65D52]/15 text-[#C65D52]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activePlace.crowdStatus === 'sepi'
                        ? 'bg-[#3E4D3B]'
                        : activePlace.crowdStatus === 'sedang'
                        ? 'bg-[#4D433E]'
                        : 'bg-[#C65D52]'
                    }`}
                  />
                  <span>
                    {activePlace.crowdStatus === 'sepi'
                      ? 'Lengang'
                      : activePlace.crowdStatus === 'sedang'
                      ? 'Cukup Nyaman'
                      : 'Ramai'}
                  </span>
                </div>
              </div>

              {/* Compatibility Reason Card */}
              <div className="mt-3 mx-auto bg-white border border-[#D7D6CE] rounded-2xl p-3 text-left flex items-start gap-2.5 shadow-[0_2px_10px_rgba(77,67,62,0.04)]">
                <div className="w-6 h-6 rounded-full bg-[#3E4D3B] text-[#DFD1BB] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-[#4D433E]">
                      Alasan Cocok ({activePlace.suitabilityScore}% Match)
                    </p>
                    <span className="text-[10px] font-semibold text-[#3E4D3B]">
                      Rp {activePlace.avgBudget.toLocaleString('id-ID')} / org
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4D433E]/75 line-clamp-2 mt-0.5 leading-relaxed">
                    {activePlace.matchReason}
                  </p>
                </div>
              </div>

              {/* Scroll Indicator Pill */}
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => {
                    const el = document.getElementById('feed-video-suasana');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAE8E1] hover:bg-[#DFD1BB]/70 text-[#4D433E] text-[11px] font-semibold border border-[#D7D6CE] active:scale-96 transition-all"
                >
                  <span>Lihat video suasana & tempat terdekat</span>
                  <ArrowDown className="w-3 h-3 text-[#C65D52]" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
