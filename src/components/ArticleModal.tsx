import React from 'react';
import { X, Clock, CheckCircle2 } from 'lucide-react';
import { CurationGuide } from '../types';

interface ArticleModalProps {
  guide: CurationGuide | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ guide, onClose }) => {
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A2421]/65 backdrop-blur-sm p-4">
      <div className="w-full max-w-[420px] bg-[#FAF8F5] rounded-[26px] shadow-2xl max-h-[85vh] flex flex-col overflow-hidden border border-[#D7D6CE] animate-in zoom-in-95 duration-200">
        <div className="relative aspect-[16/9] w-full bg-[#EAE8E1]">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            aria-label="Tutup panduan"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2A2421]/65 text-white flex items-center justify-center hover:bg-[#2A2421]"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="absolute bottom-3 left-3 bg-[#3E3B59]/90 backdrop-blur-md text-[#DFD1BB] text-[10px] font-bold px-2.5 py-1 rounded-full">
            {guide.category}
          </span>
        </div>

        <div className="p-5 overflow-y-auto space-y-3.5">
          <div className="flex items-center gap-2 text-[11px] text-[#4D433E]/65">
            <Clock className="w-3.5 h-3.5 text-[#C65D52]" />
            <span>{guide.readTime}</span>
          </div>

          <h3 className="text-[16px] font-bold text-[#4D433E] leading-snug">
            {guide.title}
          </h3>

          <p className="text-[12px] text-[#4D433E]/80 leading-relaxed">
            {guide.summary}
          </p>

          <div className="bg-white p-3.5 rounded-2xl border border-[#D7D6CE] space-y-2">
            <h5 className="text-[12px] font-bold text-[#4D433E]">
              Poin Utama Panduan:
            </h5>
            <div className="space-y-1.5">
              {guide.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-[#4D433E]/85">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E4D3B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#D7D6CE] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-[#4D433E] hover:opacity-95 text-[#FAF8F5] font-bold text-xs rounded-xl transition-opacity"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
