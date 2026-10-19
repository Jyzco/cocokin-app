import React from 'react';
import {
  Play,
  ChevronRight,
  Clock,
  Star,
  Utensils,
  MapPin
} from 'lucide-react';
import { Place, CurationGuide } from '../types';

interface FeedSectionsProps {
  places: Place[];
  allPlaces: Place[];
  guides: CurationGuide[];
  onSelectPlace: (place: Place) => void;
  onPlayVideo: (place: Place) => void;
  onOpenGuide: (guide: CurationGuide) => void;
  onGoToSmartFilter: () => void;
}

export const FeedSections: React.FC<FeedSectionsProps> = ({
  places,
  allPlaces,
  guides,
  onSelectPlace,
  onPlayVideo,
  onOpenGuide,
  onGoToSmartFilter,
}) => {
  const displayPlaces = places.length > 0 ? places : allPlaces;

  return (
    <div id="feed-video-suasana" className="space-y-7 py-5 bg-[#FAF8F5]">
      {/* SEKSI 1: Video Suasana Tempat (Pola Card Video Lanskap 16:9) */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[16px] font-bold text-[#4D433E] tracking-tight">
              Gambaran Video Suasana
            </h3>
            <p className="text-[11px] text-[#4D433E]/65 mt-0.5">
              Lihat kondisi pencahayaan, meja & keramaian sebelum datang
            </p>
          </div>
          <span className="text-[10px] font-bold bg-[#C5AEB1]/35 text-[#3E3B59] px-2.5 py-1 rounded-full">
            Preview Suasana
          </span>
        </div>

        <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
          {displayPlaces.map((place) => (
            <div
              key={`video-${place.id}`}
              onClick={() => onPlayVideo(place)}
              className="shrink-0 w-[252px] group cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="relative aspect-[16/9] rounded-[18px] overflow-hidden bg-[#4D433E] shadow-[0_6px_18px_rgba(77,67,62,0.1)] border border-[#D7D6CE]">
                <img
                  src={place.videoThumbnail}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-92"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/80 via-[#2A2421]/15 to-transparent" />

                {/* Clean Tactile Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[#4D433E] flex items-center justify-center shadow-md group-hover:scale-108 transition-transform">
                    <Play className="w-4 h-4 fill-[#4D433E] ml-0.5" />
                  </div>
                </div>

                {/* Duration Pill */}
                <span className="absolute bottom-2.5 left-2.5 bg-[#2A2421]/75 backdrop-blur-md text-[#FAF8F5] text-[10px] px-2 py-0.5 rounded-full font-medium">
                  {place.videoDuration}
                </span>

                {/* Crowd Condition Badge */}
                <span
                  className={`absolute bottom-2.5 right-2.5 backdrop-blur-md text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    place.crowdStatus === 'sepi'
                      ? 'bg-[#3E4D3B]/90 text-[#DFD1BB]'
                      : place.crowdStatus === 'sedang'
                      ? 'bg-[#4D433E]/90 text-[#DFD1BB]'
                      : 'bg-[#C65D52]/90 text-white'
                  }`}
                >
                  {place.crowdStatus === 'sepi'
                    ? 'Lengang'
                    : place.crowdStatus === 'sedang'
                    ? 'Kondusif'
                    : 'Ramai'}
                </span>
              </div>

              <h4 className="mt-2 text-[13px] font-bold text-[#4D433E] line-clamp-1 group-hover:text-[#C65D52] transition-colors">
                {place.name} ({place.area})
              </h4>
              <p className="text-[11px] text-[#4D433E]/65 line-clamp-1 mt-0.5">
                {place.vibeSummary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI 2: Dekat dari Lokasimu & Sesuai Budget (Pola Poster Vertikal 2:3) */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[16px] font-bold text-[#4D433E] tracking-tight">
              Dekat & Sesuai Budgetmu
            </h3>
            <p className="text-[11px] text-[#4D433E]/65 mt-0.5">
              Jarak terukur dari lokasimu dengan kisaran harga transparan
            </p>
          </div>
          <button
            onClick={onGoToSmartFilter}
            className="text-[11px] font-bold text-[#4D433E] bg-[#DFD1BB] hover:bg-[#DFD1BB]/80 px-3 py-1 rounded-full flex items-center gap-0.5 transition-colors shrink-0"
          >
            Atur Filter <ChevronRight className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>

        <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
          {[...displayPlaces]
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .map((place) => (
              <div
                key={`near-${place.id}`}
                onClick={() => onSelectPlace(place)}
                className="shrink-0 w-[146px] group cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="relative aspect-[2/3] rounded-[18px] overflow-hidden bg-[#EAE8E1] shadow-[0_4px_14px_rgba(77,67,62,0.08)] border border-[#D7D6CE]">
                  <img
                    src={place.posterImage}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/70 via-transparent to-transparent" />

                  <span className="absolute top-2.5 left-2.5 bg-[#4D433E]/85 backdrop-blur-md text-[#DFD1BB] font-bold text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {place.category}
                  </span>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-bold">
                    <span className="flex items-center gap-0.5 bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded-md">
                      <MapPin className="w-2.5 h-2.5 text-[#DFD1BB]" /> {place.distanceKm} km
                    </span>
                    <span className="flex items-center gap-0.5 bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded-md">
                      <Star className="w-2.5 h-2.5 fill-[#DFD1BB] text-[#DFD1BB]" />{' '}
                      {place.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <h4 className="mt-2 text-[13px] font-bold text-[#4D433E] line-clamp-1 group-hover:text-[#C65D52] transition-colors">
                  {place.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-semibold text-[#3E4D3B] bg-[#B2AC88]/30 px-1.5 py-0.2 rounded">
                    {place.area}
                  </span>
                  <span className="text-[10px] text-[#4D433E]/60">
                    ~{place.travelTimeMin} mnt
                  </span>
                </div>
                <p className="text-[11px] font-bold text-[#C65D52] mt-1">
                  Rp {place.avgBudget.toLocaleString('id-ID')}{' '}
                  <span className="text-[10px] font-normal text-[#4D433E]/60">/ org</span>
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* SEKSI 3: Menu & Harga Ter-update (Menjawab Insight Ko Evan) */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DFD1BB] flex items-center justify-center text-[#4D433E]">
              <Utensils className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#4D433E] tracking-tight">
                Referensi Menu & Harga Terbaru
              </h3>
              <p className="text-[11px] text-[#4D433E]/65">
                Daftar menu yang telah diperbarui (Oktober 2026)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {displayPlaces
            .flatMap((p) =>
              p.menuHighlights.map((m) => ({ ...m, cafeName: p.name, place: p }))
            )
            .slice(0, 4)
            .map((menu, i) => (
              <div
                key={i}
                onClick={() => onSelectPlace(menu.place)}
                className="p-2.5 rounded-2xl border border-[#D7D6CE] bg-white hover:border-[#C65D52]/50 active:scale-[0.98] cursor-pointer flex gap-2.5 items-center transition-all shadow-[0_2px_8px_rgba(77,67,62,0.03)]"
              >
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-13 h-13 rounded-xl object-cover shrink-0 border border-[#D7D6CE]/60"
                  loading="lazy"
                />
                <div className="overflow-hidden flex-1">
                  <span className="text-[9px] font-bold text-[#3E3B59] bg-[#C5AEB1]/35 px-1.5 py-0.2 rounded-full">
                    {menu.category}
                  </span>
                  <h5 className="text-[12px] font-bold text-[#4D433E] truncate mt-0.5">
                    {menu.name}
                  </h5>
                  <p className="text-[10px] text-[#4D433E]/60 truncate">{menu.cafeName}</p>
                  <p className="text-[11px] font-bold text-[#C65D52] mt-0.5">
                    Rp {menu.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* SEKSI 4: Panduan & Koleksi Suasana (Pola Hero Card + Daftar Vertikal) */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[16px] font-bold text-[#4D433E] tracking-tight">
              Panduan & Koleksi Suasana
            </h3>
            <p className="text-[11px] text-[#4D433E]/65 mt-0.5">
              Rekomendasi kurasi berdasarkan situasi dan kebutuhanmu
            </p>
          </div>
        </div>

        {/* Hero Curation Card */}
        {guides[0] && (
          <div
            onClick={() => onOpenGuide(guides[0])}
            className="rounded-[20px] overflow-hidden border border-[#D7D6CE] bg-white shadow-[0_6px_18px_rgba(77,67,62,0.06)] hover:border-[#C65D52]/40 active:scale-[0.99] transition-all cursor-pointer mb-3.5"
          >
            <div className="relative aspect-[16/9] w-full bg-[#EAE8E1]">
              <img
                src={guides[0].image}
                alt={guides[0].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-[#3E3B59]/90 backdrop-blur-md text-[#DFD1BB] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                {guides[0].category}
              </span>
            </div>
            <div className="p-4">
              <h4 className="text-[14px] font-bold text-[#4D433E] leading-snug">
                {guides[0].title}
              </h4>
              <p className="text-[12px] text-[#4D433E]/75 line-clamp-2 mt-1 leading-relaxed">
                {guides[0].summary}
              </p>
              <div className="flex items-center justify-between mt-3 text-[11px] text-[#4D433E]/60">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {guides[0].readTime}
                </span>
                <span className="text-[#C65D52] font-bold">Lihat Panduan &gt;</span>
              </div>
            </div>
          </div>
        )}

        {/* Vertical Compact Guide List */}
        <div className="divide-y divide-[#D7D6CE]/70 bg-white rounded-2xl border border-[#D7D6CE] px-3">
          {guides.slice(1).map((guide) => (
            <div
              key={guide.id}
              onClick={() => onOpenGuide(guide)}
              className="py-3 flex gap-3.5 cursor-pointer hover:opacity-85 transition-opacity"
            >
              <img
                src={guide.image}
                alt={guide.title}
                className="w-[70px] h-[70px] rounded-2xl object-cover shrink-0 border border-[#D7D6CE]"
                loading="lazy"
              />
              <div className="flex flex-col justify-between flex-1 py-0.5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold text-[#3E4D3B] bg-[#B2AC88]/35 px-2 py-0.5 rounded-full">
                      {guide.category}
                    </span>
                    <span className="text-[10px] text-[#4D433E]/60">{guide.readTime}</span>
                  </div>
                  <h5 className="text-[12px] font-bold text-[#4D433E] line-clamp-2 leading-snug mt-1">
                    {guide.title}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
