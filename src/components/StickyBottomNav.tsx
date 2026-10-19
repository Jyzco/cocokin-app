import React from 'react';
import { Home, SlidersHorizontal, Bookmark } from 'lucide-react';

interface StickyBottomNavProps {
  activeTab: 'beranda' | 'filter' | 'aktivitas';
  onTabChange: (tab: 'beranda' | 'filter' | 'aktivitas') => void;
  planCount: number;
  favoriteCount: number;
}

export const StickyBottomNav: React.FC<StickyBottomNavProps> = ({
  activeTab,
  onTabChange,
  planCount,
  favoriteCount,
}) => {
  const totalSavedCount = planCount + favoriteCount;

  return (
    <nav className="fixed bottom-0 inset-x-0 max-w-[430px] mx-auto z-40 bg-[#FAF8F5]/95 backdrop-blur-2xl border-t border-[#D7D6CE] py-2 px-4 shadow-[0_-4px_16px_rgba(77,67,62,0.06)]">
      <div className="flex items-center justify-around">
        {/* Tab 1: Beranda */}
        <button
          onClick={() => onTabChange('beranda')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
            activeTab === 'beranda'
              ? 'text-[#C65D52]'
              : 'text-[#4D433E]/55 hover:text-[#4D433E]'
          }`}
        >
          <Home
            className={`w-[20px] h-[20px] ${
              activeTab === 'beranda' ? 'stroke-[2.4]' : 'stroke-[1.9]'
            }`}
          />
          <span
            className={`text-[10px] mt-1 tracking-tight ${
              activeTab === 'beranda' ? 'font-bold text-[#4D433E]' : 'font-medium'
            }`}
          >
            Beranda
          </span>
        </button>

        {/* Tab 2: Filter & Rekomendasi */}
        <button
          onClick={() => onTabChange('filter')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
            activeTab === 'filter'
              ? 'text-[#C65D52]'
              : 'text-[#4D433E]/55 hover:text-[#4D433E]'
          }`}
        >
          <SlidersHorizontal
            className={`w-[20px] h-[20px] ${
              activeTab === 'filter' ? 'stroke-[2.4]' : 'stroke-[1.9]'
            }`}
          />
          <span
            className={`text-[10px] mt-1 tracking-tight ${
              activeTab === 'filter' ? 'font-bold text-[#4D433E]' : 'font-medium'
            }`}
          >
            Filter & Cocok
          </span>
        </button>

        {/* Tab 3: Rencana & Favorit */}
        <button
          onClick={() => onTabChange('aktivitas')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
            activeTab === 'aktivitas'
              ? 'text-[#C65D52]'
              : 'text-[#4D433E]/55 hover:text-[#4D433E]'
          }`}
        >
          <div className="relative">
            <Bookmark
              className={`w-[20px] h-[20px] ${
                activeTab === 'aktivitas' ? 'stroke-[2.4]' : 'stroke-[1.9]'
              }`}
            />
            {totalSavedCount > 0 && (
              <span className="absolute -top-1 -right-2.5 bg-[#4D433E] text-[#FAF8F5] text-[9px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center ring-2 ring-[#FAF8F5]">
                {totalSavedCount}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] mt-1 tracking-tight ${
              activeTab === 'aktivitas' ? 'font-bold text-[#4D433E]' : 'font-medium'
            }`}
          >
            Tersimpan
          </span>
        </button>
      </div>
    </nav>
  );
};
