import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronRight, Compass, Users, Clock } from 'lucide-react';
import { UserFilter } from '../types';

interface HeroPromoCarouselProps {
  filter: UserFilter;
  onOpenFilterTab: () => void;
}

export const HeroPromoCarousel: React.FC<HeroPromoCarouselProps> = ({
  filter,
  onOpenFilterTab,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const highlights = [
    {
      id: 1,
      category: 'Pencarian Terintegrasi',
      title: 'Lihat Video Suasana, Cek Jarak & Budget di Satu Tempat',
      subtitle: 'Tidak perlu lagi berpindah-pindah antara media sosial dan aplikasi peta.',
      bgClass: 'bg-[#3E4D3B]',
      accentBadge: 'bg-[#B2AC88]/25 text-[#DFD1BB]',
      icon: Compass,
    },
    {
      id: 2,
      category: 'Kondisi Terkini',
      title: 'Cek Tingkat Keramaian Sebelum Kamu Berangkat',
      subtitle: 'Pastikan masih ada meja kosong yang tenang untuk nugas maupun bersantai.',
      bgClass: 'bg-[#4D433E]',
      accentBadge: 'bg-[#DFD1BB]/20 text-[#DFD1BB]',
      icon: Clock,
    },
    {
      id: 3,
      category: 'Rekomendasi Personal',
      title: 'Pergi Bareng Teman dengan Kebutuhan Berbeda?',
      subtitle: 'Cocokkan tempat yang punya ruang AC tenang sekaligus area terbuka.',
      bgClass: 'bg-[#3E3B59]',
      accentBadge: 'bg-[#C5AEB1]/25 text-[#DFD1BB]',
      icon: Users,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % highlights.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [highlights.length]);

  return (
    <div className="px-4 pt-3 pb-2 space-y-2.5 bg-[#FAF8F5]">
      {/* Active User Preference Bar (Replacing VIP Coin Bar with CocokIn Core Value) */}
      <div
        onClick={onOpenFilterTab}
        className="bg-white border border-[#D7D6CE] rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-[#C65D52]/50 active:scale-[0.99] transition-all shadow-[0_2px_10px_rgba(77,67,62,0.04)]"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-[#DFD1BB]/60 flex items-center justify-center text-[#4D433E] shrink-0">
            <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold text-[#4D433E]">
                Preferensi Pencarianmu
              </span>
              <span className="text-[10px] bg-[#C65D52]/12 text-[#C65D52] font-bold px-2 py-0.2 rounded-full">
                Aktif
              </span>
            </div>
            <p className="text-[11px] text-[#4D433E]/70 truncate mt-0.5">
              Maks Rp {filter.maxBudget.toLocaleString('id-ID')} • Radius {filter.maxDistance} km
              {filter.atmosphere.length > 0 ? ` • ${filter.atmosphere[0]}` : ''}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-[#C65D52] flex items-center shrink-0 ml-2">
          Sesuaikan <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </span>
      </div>

      {/* Editorial Hero Banner Slider */}
      <div
        onClick={onOpenFilterTab}
        className="relative rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(77,67,62,0.12)] aspect-[16/6.6] text-[#FAF8F5] cursor-pointer active:scale-[0.99] transition-transform"
      >
        {highlights.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 p-4 flex flex-col justify-between ${item.bgClass} transition-opacity duration-500 ${
                idx === currentSlide
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${item.accentBadge}`}
                >
                  <IconComponent className="w-3 h-3" />
                  {item.category}
                </span>
                <span className="text-[10px] font-medium text-[#DFD1BB]/80">
                  CocokIn Guide
                </span>
              </div>

              <div className="pr-10">
                <h4 className="text-[14px] font-bold leading-snug text-white">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#DFD1BB]/90 line-clamp-1 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}

        {/* Slide Indicators */}
        <div
          className="absolute bottom-3 right-3.5 z-20 flex gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          {highlights.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'w-4 bg-[#DFD1BB]'
                  : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
