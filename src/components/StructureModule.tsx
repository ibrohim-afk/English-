import React, { useState } from 'react';
import { STRUCTURE_QUIZ } from '../data/curriculumData';
import { MiniQuiz } from './MiniQuiz';
import { speechService } from '../utils/speech';
import {
  Layers,
  ArrowRight,
  Eye,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info,
  Calendar,
  MapPin,
  Users,
} from 'lucide-react';

interface StructureModuleProps {
  onBackToMenu: () => void;
  onNextModule: () => void;
}

export const StructureModule: React.FC<StructureModuleProps> = ({
  onBackToMenu,
  onNextModule,
}) => {
  // State for the interactive Story Dissector
  const [activeHighlight, setActiveHighlight] = useState<
    'all' | 'orientation' | 'events' | 'reorientation'
  >('all');

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Navigation breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToMenu}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          ← Kembali ke Menu Belajar
        </button>
        <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
          Modul 2 dari 7
        </div>
      </div>

      {/* Module Title */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>Materi 2: Generic Structure</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Struktur Teks Recount (Generic Structure)
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          Teks Recount memiliki susunan paragraf yang teratur secara kronologis agar pembaca dapat mengikuti alur cerita dari awal sampai akhir dengan mudah. Secara umum terdapat <strong>3 bagian utama</strong>:
        </p>

        {/* 3 Pillars of Recount Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Pillar 1: Orientation */}
          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-black text-xs flex items-center justify-center mb-3">
                01
              </div>
              <h2 className="text-lg font-bold text-sky-950 mb-1">
                Orientation
              </h2>
              <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-3">
                (Pengenalan / Latar Belakang)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                Paragraf pembuka yang memberikan informasi latar belakang kejadian kepada pembaca.
              </p>

              <div className="space-y-1.5 text-xs text-slate-600 border-t border-sky-200/60 pt-3">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-600" />
                  <strong>Who:</strong> Siapa yang terlibat? (I, my friends)
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  <strong>Where:</strong> Di mana peristiwanya? (In Bali)
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <strong>When:</strong> Kapan terjadinya? (Last weekend)
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Events */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center mb-3">
                02
              </div>
              <h2 className="text-lg font-bold text-indigo-950 mb-1">
                Events
              </h2>
              <div className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-3">
                (Rangkaian Peristiwa Kronologis)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                Paragraf inti yang menceritakan urutan kejadian secara bertahap dari awal, pertengahan, hingga akhir.
              </p>

              <div className="p-3 bg-white/80 rounded-xl border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
                <strong>Ciri Khas:</strong> Menggunakan kata hubung urutan waktu (<em>First, Then, After that, Next, Finally</em>).
              </div>
            </div>
          </div>

          {/* Pillar 3: Re-orientation */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-3">
                03
              </div>
              <h2 className="text-lg font-bold text-emerald-950 mb-1">
                Re-orientation
              </h2>
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3">
                (Komentar / Penutup Pribadi - Opsional)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                Paragraf penutup yang memuat kesimpulan, komentar pribadi, atau perasaan si penulis atas seluruh peristiwa yang terjadi.
              </p>

              <div className="p-3 bg-white/80 rounded-xl border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
                <strong>Sifat:</strong> Opsional (boleh ada, boleh tidak). Contoh: <em>"It was the best holiday ever!"</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Story Dissector */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Tool: Story Dissector</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Bedah Struktur Teks Cerita Nyata
            </h2>
            <p className="text-xs text-slate-500">
              Klik tombol penanda di bawah untuk melihat bagaimana tiap bagian teks bekerja
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
            <button
              onClick={() => setActiveHighlight('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeHighlight === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Bagian
            </button>
            <button
              onClick={() => setActiveHighlight('orientation')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeHighlight === 'orientation'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-sky-700 hover:bg-sky-50'
              }`}
            >
              Orientation
            </button>
            <button
              onClick={() => setActiveHighlight('events')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeHighlight === 'events'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveHighlight('reorientation')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeHighlight === 'reorientation'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Re-orientation
            </button>
          </div>
        </div>

        {/* Story Title & Paragraphs */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-extrabold text-slate-900">
              A Wonderful Sunday at Pangandaran Beach
            </h3>
            <span className="text-xs text-slate-400">Personal Recount</span>
          </div>

          {/* Paragraph 1: Orientation */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              activeHighlight === 'all' || activeHighlight === 'orientation'
                ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-200'
                : 'bg-white border-slate-200 opacity-40'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wide">
                [ 1. Orientation ]
              </span>
              <span className="text-xs text-sky-600 font-medium">
                Who, When, Where
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              Last Sunday morning, my parents, my little sister, and I drove to Pangandaran Beach in West Java. We departed from our house at 5:00 AM because we wanted to avoid traffic jams and witness the morning sunrise.
            </p>
            {activeHighlight === 'orientation' && (
              <div className="mt-3 pt-3 border-t border-sky-200 text-xs text-sky-900 leading-relaxed bg-white/70 p-3 rounded-xl">
                💡 <strong>Catatan Guru:</strong> Kalimat ini memperkenalkan <em>Who</em> (penulis dan keluarga), <em>When</em> (last Sunday morning), dan <em>Where</em> (Pangandaran Beach).
              </div>
            )}
          </div>

          {/* Paragraph 2: Events part 1 */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              activeHighlight === 'all' || activeHighlight === 'events'
                ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-200'
                : 'bg-white border-slate-200 opacity-40'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide">
                [ 2. Event 1 ]
              </span>
              <span className="text-xs text-indigo-600 font-medium">
                Awal Kejadian
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              First, we arrived at the beach around 8:00 AM. The sea breeze was so fresh and the sound of the ocean waves was relaxing. My sister and I immediately ran toward the shoreline, built a giant sandcastle, and collected pretty white seashells.
            </p>
          </div>

          {/* Paragraph 3: Events part 2 */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              activeHighlight === 'all' || activeHighlight === 'events'
                ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-200'
                : 'bg-white border-slate-200 opacity-40'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide">
                [ 3. Event 2 ]
              </span>
              <span className="text-xs text-indigo-600 font-medium">
                Kejadian Lanjutan & Siang Hari
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              After that, at noon, we rented a colorful banana boat. It was very thrilling as the motorboat pulled us over the waves at high speed. Afterwards, my mother treated us to grilled seafood with warm fresh coconut water at a seaside restaurant.
            </p>
            {activeHighlight === 'events' && (
              <div className="mt-3 pt-3 border-t border-indigo-200 text-xs text-indigo-900 leading-relaxed bg-white/70 p-3 rounded-xl">
                💡 <strong>Catatan Guru:</strong> Perhatikan penggunaan kata hubung urutan kronologis seperti <em>"First", "After that", "Afterwards"</em> yang membuat jalan cerita runtut.
              </div>
            )}
          </div>

          {/* Paragraph 4: Re-orientation */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              activeHighlight === 'all' || activeHighlight === 'reorientation'
                ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-200'
                : 'bg-white border-slate-200 opacity-40'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                [ 4. Re-orientation ]
              </span>
              <span className="text-xs text-emerald-600 font-medium">
                Refleksi & Kesan Penulis
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              Finally, around 4:30 PM, we cleaned up our sandy shoes and prepared to go home. Although my back was sunburnt and we felt exhausted, we were very glad. We cannot wait to visit Pangandaran again next holiday!
            </p>
            {activeHighlight === 'reorientation' && (
              <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-emerald-900 leading-relaxed bg-white/70 p-3 rounded-xl">
                💡 <strong>Catatan Guru:</strong> Paragraf ini merangkum perasaan penulis (<em>"we were very glad"</em>) dan keinginan untuk kembali lagi.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mini-Quiz at end of module */}
      <div>
        <div className="text-center mb-6">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Evaluasi Bagian 2
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Kuis Pemahaman: Generic Structure Recount Text
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Uji kemampuanmu membedakan Orientation, Events, dan Re-orientation
          </p>
        </div>

        <MiniQuiz
          moduleId="structure"
          moduleTitle="Kuis Modul 2: Generic Structure Recount Text"
          questions={STRUCTURE_QUIZ}
          onComplete={() => {}}
        />
      </div>

      {/* Next Module Navigation */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={onBackToMenu}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
        >
          Menu Belajar
        </button>
        <button
          onClick={onNextModule}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          <span>Lanjut ke Modul 3: Language Features</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
