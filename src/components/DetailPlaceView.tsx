import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Play,
  Star,
  MapPin,
  CheckCircle2,
  Calendar,
  Navigation,
  Users,
  Minus,
  Plus,
  Clock
} from 'lucide-react';
import { Place } from '../types';

interface DetailPlaceViewProps {
  place: Place;
  onBack: () => void;
  onPlayVideo: (place: Place) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBookPlan: (date: string, timeSlot: string, partySize: number, notes: string) => void;
  onShowToast: (title: string, subtitle?: string) => void;
}

export const DetailPlaceView: React.FC<DetailPlaceViewProps> = ({
  place,
  onBack,
  onPlayVideo,
  isFavorite,
  onToggleFavorite,
  onBookPlan,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'info'>('schedule');
  const [selectedDate, setSelectedDate] = useState('Sabtu, 24 Okt');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
    place.timeSlots[0]?.time || '14:00'
  );
  const [partySize, setPartySize] = useState(2);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [place.id]);

  const dates = [
    { day: 'SAB', date: '24 Okt', full: 'Sabtu, 24 Okt' },
    { day: 'MIN', date: '25 Okt', full: 'Minggu, 25 Okt' },
    { day: 'SEN', date: '26 Okt', full: 'Senin, 26 Okt' },
    { day: 'SEL', date: '27 Okt', full: 'Selasa, 27 Okt' },
    { day: 'RAB', date: '28 Okt', full: 'Rabu, 28 Okt' },
  ];

  const activeSlotObj = place.timeSlots.find((s) => s.time === selectedTimeSlot);

  const handleBooking = () => {
    if (!selectedTimeSlot) return;
    onBookPlan(selectedDate, selectedTimeSlot, partySize, notes);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-28 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-2xl px-4 py-3 flex items-center justify-between border-b border-[#D7D6CE]/80">
        <button
          onClick={onBack}
          aria-label="Kembali"
          className="w-9 h-9 rounded-full bg-[#EAE8E1] hover:bg-[#DFD1BB] flex items-center justify-center text-[#4D433E] active:scale-92 transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </button>
        <h3 className="text-[14px] font-bold text-[#4D433E] line-clamp-1 max-w-[210px]">
          {place.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleFavorite}
            aria-label={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
            className="w-9 h-9 rounded-full bg-[#EAE8E1] hover:bg-[#DFD1BB] flex items-center justify-center text-[#4D433E] active:scale-92 transition-all"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-[#C65D52] text-[#C65D52]' : 'text-[#4D433E]'
              }`}
            />
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              onShowToast(
                'Tautan Disalin',
                `Informasi ${place.name} siap dibagikan.`
              );
            }}
            aria-label="Bagikan tempat"
            className="w-9 h-9 rounded-full bg-[#EAE8E1] hover:bg-[#DFD1BB] flex items-center justify-center text-[#4D433E] active:scale-92 transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Status Strip (Answering Karen & Evan's Field Insights) */}
      <div className="bg-[#DFD1BB]/55 px-4 py-2 flex items-center justify-between border-b border-[#D7D6CE]">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4D433E]">
          <Clock className="w-3.5 h-3.5 text-[#C65D52]" />
          <span>{place.lastUpdated}</span>
        </div>
        <span className="text-[10px] font-bold text-[#3E4D3B] bg-[#B2AC88]/35 px-2.5 py-0.5 rounded-full">
          {place.weather.temp} • {place.weather.condition}
        </span>
      </div>

      {/* Poster + Metadata Header */}
      <div className="p-4 bg-white border-b border-[#D7D6CE]/70">
        <div className="flex gap-4">
          {/* 2:3 Mini Poster */}
          <div className="relative w-[112px] aspect-[2/3] rounded-[18px] overflow-hidden shadow-[0_8px_20px_rgba(77,67,62,0.14)] shrink-0 bg-[#EAE8E1] border border-[#D7D6CE]">
            <img
              src={place.posterImage}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 bg-[#C65D52] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {place.suitabilityScore}% cocok
            </span>
          </div>

          {/* 2-Column Metadata */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-[#4D433E] text-[#DFD1BB] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {place.category}
                </span>
                <span className="bg-[#EAE8E1] text-[#4D433E] text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  {place.area}
                </span>
              </div>

              <h1 className="text-[17px] font-bold text-[#4D433E] leading-snug">
                {place.name}
              </h1>

              <div className="mt-2.5 grid grid-cols-[68px_1fr] gap-y-1 text-[11px]">
                <span className="text-[#4D433E]/60">Suasana</span>
                <span className="font-semibold text-[#4D433E] truncate">
                  {place.atmosphere.join(', ')}
                </span>

                <span className="text-[#4D433E]/60">Jarak</span>
                <span className="font-semibold text-[#3E4D3B]">
                  {place.distanceKm} km (~{place.travelTimeMin} mnt)
                </span>

                <span className="text-[#4D433E]/60">Budget</span>
                <span className="font-bold text-[#C65D52]">{place.budgetRange}</span>

                <span className="text-[#4D433E]/60">Rating</span>
                <span className="font-bold text-[#4D433E] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#C65D52] text-[#C65D52]" />
                  {place.rating.toFixed(1)} ({place.ratingCount} ulasan)
                </span>
              </div>
            </div>

            {/* Video Suasana Button */}
            <button
              onClick={() => onPlayVideo(place)}
              className="mt-3 py-2 px-3 rounded-xl border border-[#C65D52] bg-[#C65D52]/[0.06] hover:bg-[#C65D52]/12 text-[#C65D52] font-bold text-[12px] flex items-center justify-center gap-1.5 active:scale-97 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Putar Video Suasana ({place.videoDuration})
            </button>
          </div>
        </div>
      </div>

      {/* Segmented Control Switcher */}
      <div className="px-4 py-2.5 bg-[#FAF8F5] sticky top-[61px] z-20 border-b border-[#D7D6CE]/70">
        <div className="bg-[#EAE8E1] p-1 rounded-xl flex border border-[#D7D6CE]">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition-all ${
              activeTab === 'schedule'
                ? 'bg-white text-[#4D433E] shadow-2xs'
                : 'text-[#4D433E]/65 hover:text-[#4D433E]'
            }`}
          >
            RENCANA KUNJUNGAN
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition-all ${
              activeTab === 'info'
                ? 'bg-white text-[#4D433E] shadow-2xs'
                : 'text-[#4D433E]/65 hover:text-[#4D433E]'
            }`}
          >
            INFORMASI & MENU
          </button>
        </div>
      </div>

      {/* TAB 1: RENCANA KUNJUNGAN (VISIT PLAN) */}
      {activeTab === 'schedule' && (
        <div className="p-4 space-y-4">
          {/* Date Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] font-bold text-[#4D433E]">
                Pilih Tanggal Kunjungan
              </label>
              <span className="text-[11px] text-[#4D433E]/60">Oktober 2026</span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {dates.map((d) => {
                const isSelected = selectedDate === d.full;
                return (
                  <button
                    key={d.full}
                    onClick={() => setSelectedDate(d.full)}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex flex-col items-center min-w-[74px] active:scale-96 ${
                      isSelected
                        ? 'bg-[#4D433E] text-[#FAF8F5] shadow-sm'
                        : 'bg-white text-[#4D433E]/75 hover:bg-[#EAE8E1] border border-[#D7D6CE]'
                    }`}
                  >
                    <span className="text-[12px] font-bold">{d.date}</span>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        isSelected ? 'text-[#DFD1BB] font-bold' : 'text-[#4D433E]/55'
                      }`}
                    >
                      {d.day}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card Detail Kondisi & Jam Kunjungan */}
          <div className="rounded-[22px] border border-[#D7D6CE] p-4 bg-white space-y-3.5 shadow-[0_2px_12px_rgba(77,67,62,0.04)]">
            <div className="flex items-start justify-between pb-3 border-b border-[#D7D6CE]/70">
              <div>
                <span className="text-[10px] font-bold text-[#3E4D3B] uppercase tracking-wider">
                  LOKASI & SUASANA TEMPAT
                </span>
                <h4 className="text-[14px] font-bold text-[#4D433E] mt-0.5">
                  {place.name}
                </h4>
                <p className="text-[11px] text-[#4D433E]/70 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C65D52] shrink-0" />
                  <span>{place.address}</span>
                </p>
              </div>
            </div>

            {/* Live Crowd Condition */}
            <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#D7D6CE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3E4D3B]" />
                <span className="text-[11px] font-semibold text-[#4D433E]">
                  Kondisi Saat Ini:
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#3E4D3B] bg-[#B2AC88]/30 px-2.5 py-0.5 rounded-full">
                {place.crowdLabel}
              </span>
            </div>

            {/* Time Slots with Crowd Estimation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-[#4D433E]">
                  Pilih Jam Rencana Kunjungan:
                </label>
                {selectedTimeSlot && (
                  <button
                    onClick={() => setSelectedTimeSlot(null)}
                    className="text-[10px] text-[#C65D52] font-semibold"
                  >
                    Ubah / Kosongkan
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {place.timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      onClick={() =>
                        setSelectedTimeSlot(isSelected ? null : slot.time)
                      }
                      className={`py-2.5 px-2 rounded-xl text-center transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#C65D52] text-white shadow-xs'
                          : 'bg-[#FAF8F5] hover:bg-[#EAE8E1] text-[#4D433E] border border-[#D7D6CE]'
                      }`}
                    >
                      <span className="text-[13px] font-bold block">{slot.time}</span>
                      <span
                        className={`text-[9px] block uppercase font-bold mt-0.5 ${
                          isSelected
                            ? 'text-[#DFD1BB]'
                            : slot.crowd === 'sepi'
                            ? 'text-[#3E4D3B]'
                            : slot.crowd === 'sedang'
                            ? 'text-[#4D433E]/70'
                            : 'text-[#C65D52]'
                        }`}
                      >
                        {slot.crowd === 'sepi'
                          ? 'Lengang'
                          : slot.crowd === 'sedang'
                          ? 'Kondusif'
                          : 'Ramai'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {activeSlotObj && (
                <p className="text-[11px] text-[#4D433E]/75 mt-2 bg-[#DFD1BB]/40 px-3 py-1.5 rounded-xl">
                  Estimasi jam <b>{activeSlotObj.time}</b> ({activeSlotObj.label}):{' '}
                  {activeSlotObj.crowdNote}.
                </p>
              )}
            </div>

            {/* Party Size & Notes */}
            <div className="pt-3 border-t border-[#D7D6CE]/70 space-y-3">
              <div className="flex items-center justify-between bg-[#FAF8F5] p-3 rounded-2xl border border-[#D7D6CE]">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#4D433E]" />
                  <div>
                    <span className="text-[12px] font-bold text-[#4D433E] block">
                      Jumlah Orang
                    </span>
                    <span className="text-[10px] text-[#4D433E]/60">
                      Estimasi total: Rp {(place.avgBudget * partySize).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Kurangi orang"
                    onClick={() => setPartySize((p) => Math.max(1, p - 1))}
                    className="w-7 h-7 rounded-full bg-white border border-[#D7D6CE] flex items-center justify-center text-[#4D433E] active:scale-90"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[13px] font-bold text-[#4D433E] min-w-[54px] text-center">
                    {partySize} Orang
                  </span>
                  <button
                    type="button"
                    aria-label="Tambah orang"
                    onClick={() => setPartySize((p) => Math.min(12, p + 1))}
                    className="w-7 h-7 rounded-full bg-white border border-[#D7D6CE] flex items-center justify-center text-[#4D433E] active:scale-90"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#D7D6CE]">
                <label className="text-[11px] font-bold text-[#4D433E] block mb-1">
                  Catatan Kunjungan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Nugas kelompok, butuh meja dekat stopkontak..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white rounded-xl px-3 py-2 text-[12px] text-[#4D433E] border border-[#D7D6CE] outline-hidden placeholder-[#4D433E]/45 focus:border-[#C65D52]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INFORMASI, FASILITAS & MENU */}
      {activeTab === 'info' && (
        <div className="p-4 space-y-5">
          <div className="bg-white p-4 rounded-2xl border border-[#D7D6CE] space-y-2">
            <h4 className="text-[13px] font-bold text-[#4D433E]">
              Gambaran Kondisi & Suasana
            </h4>
            <p className="text-[12px] text-[#4D433E]/80 leading-relaxed">
              {place.description}
            </p>
            <div className="pt-1 flex flex-wrap gap-1.5">
              {place.atmosphere.map((atm) => (
                <span
                  key={atm}
                  className="text-[11px] font-semibold bg-[#DFD1BB]/60 text-[#4D433E] px-2.5 py-1 rounded-full"
                >
                  {atm}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-[#4D433E] mb-2">
              Fasilitas Tersedia
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {place.facilities.map((fac) => (
                <div
                  key={fac}
                  className="flex items-center gap-2 p-2.5 bg-white border border-[#D7D6CE] rounded-2xl text-[12px] font-medium text-[#4D433E]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#3E4D3B] shrink-0" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[13px] font-bold text-[#4D433E]">
                Daftar Menu & Harga
              </h4>
              <span className="text-[10px] font-semibold text-[#3E4D3B] bg-[#B2AC88]/30 px-2 py-0.5 rounded-full">
                Update: {place.menuUpdatedDate}
              </span>
            </div>
            <div className="space-y-2.5">
              {place.menuHighlights.map((menu, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-2xl border border-[#D7D6CE] bg-white"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-13 h-13 rounded-xl object-cover border border-[#D7D6CE]"
                    />
                    <div>
                      <span className="text-[9px] font-bold text-[#3E3B59] bg-[#C5AEB1]/35 px-2 py-0.5 rounded-full">
                        {menu.category}
                      </span>
                      <h5 className="text-[13px] font-bold text-[#4D433E] mt-0.5">
                        {menu.name}
                      </h5>
                    </div>
                  </div>
                  <span className="text-[12px] font-bold text-[#C65D52] pr-1">
                    Rp {menu.price.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Actions (Matching Slide 15 Wireframe: Navigasi + Simpan Rencana) */}
      <div className="fixed bottom-0 inset-x-0 max-w-[430px] mx-auto z-40 bg-[#FAF8F5]/95 backdrop-blur-2xl border-t border-[#D7D6CE] px-4 py-3 flex gap-2.5 shadow-[0_-6px_20px_rgba(77,67,62,0.08)]">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place.name + ' ' + place.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-2xl bg-[#3E4D3B] hover:opacity-95 text-[#FAF8F5] flex items-center justify-center font-bold text-[12px] gap-1.5 shrink-0 active:scale-96 transition-all"
        >
          <Navigation className="w-4 h-4 text-[#DFD1BB]" />
          Navigasi
        </a>

        <button
          onClick={handleBooking}
          disabled={!selectedTimeSlot}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            selectedTimeSlot
              ? 'bg-[#C65D52] hover:opacity-95 text-white shadow-sm active:scale-98 cursor-pointer'
              : 'bg-[#D7D6CE] text-[#4D433E]/50 cursor-not-allowed'
          }`}
        >
          <Calendar className="w-4 h-4" />
          {selectedTimeSlot
            ? `SIMPAN RENCANA (${selectedTimeSlot})`
            : 'PILIH JAM KUNJUNGAN'}
        </button>
      </div>
    </div>
  );
};
