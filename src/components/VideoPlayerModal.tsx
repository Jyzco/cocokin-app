import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Volume2,
  VolumeX,
  Clock
} from 'lucide-react';
import { Place } from '../types';

interface VideoPlayerModalProps {
  place: Place | null;
  onClose: () => void;
  onOpenDetail: (place: Place) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  place,
  onClose,
  onOpenDetail,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  if (!place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A2421]/85 backdrop-blur-xl p-3">
      <div className="relative w-full max-w-[400px] bg-[#2A2421] rounded-[30px] overflow-hidden shadow-2xl flex flex-col border border-[#D7D6CE]/20 animate-in zoom-in-95 duration-200">
        {/* Top Floating Controls */}
        <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="bg-[#C65D52] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Video Suasana
            </span>
            <span className="bg-[#2A2421]/75 backdrop-blur-md text-[#DFD1BB] text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B2AC88]" />
              {place.crowdStatus === 'sepi'
                ? 'Lengang'
                : place.crowdStatus === 'sedang'
                ? 'Kondusif'
                : 'Ramai'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!videoError && (
              <button
                onClick={() => setIsMuted((m) => !m)}
                aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
                className="w-8 h-8 rounded-full bg-[#2A2421]/70 backdrop-blur-md flex items-center justify-center text-[#FAF8F5] hover:bg-black/80 border border-white/15 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Tutup video"
              className="w-8 h-8 rounded-full bg-[#2A2421]/70 backdrop-blur-md flex items-center justify-center text-[#FAF8F5] hover:bg-black/80 border border-white/15 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative w-full aspect-[9/15] bg-[#2A2421] flex items-center justify-center overflow-hidden">
          {!videoError ? (
            <video
              src={place.videoUrl}
              poster={place.coverImage}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={place.coverImage}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          )}

          {/* Warm Espresso Scrim */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#2A2421] via-[#2A2421]/75 to-transparent pointer-events-none" />

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-5 inset-x-4 z-20 text-[#FAF8F5] space-y-3">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#DFD1BB]/20 border border-[#DFD1BB]/30 text-[#DFD1BB] text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1.5">
                <span>{place.suitabilityScore}% cocok • {place.category}</span>
              </div>
              <h3 className="text-[18px] font-bold leading-tight text-white">
                {place.name}
              </h3>
              <p className="text-[12px] text-[#DFD1BB] mt-1">
                {place.vibeSummary}
              </p>
            </div>

            <div className="flex items-center gap-3.5 text-[11px] text-[#D7D6CE]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C65D52]" /> {place.area} ({place.distanceKm} km)
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B2AC88]" /> {place.lastUpdated}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenDetail(place);
              }}
              className="w-full py-3 bg-[#C65D52] hover:opacity-95 text-white font-bold text-[12px] rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Lihat Detail & Buat Rencana Kunjungan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
