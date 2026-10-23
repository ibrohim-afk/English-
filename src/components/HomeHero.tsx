import React from 'react';
import { ModuleId, StudentProfile } from '../types/recount';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Award,
  Layers,
  GraduationCap,
  Volume2,
  CheckCircle2,
} from 'lucide-react';

interface HomeHeroProps {
  profile: StudentProfile;
  completedModules: string[];
  averageScore: number;
  onNavigate: (module: ModuleId) => void;
  onOpenProfile: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  profile,
  completedModules,
  averageScore,
  onNavigate,
  onOpenProfile,
}) => {
  return (
    <div className="space-y-12">
      {/* Research Badge & Welcome Header */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Text Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata without pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-4">
                <span>Media Pembelajaran Bahasa Inggris</span>
                <span aria-hidden="true">·</span>
                <span>SMP Kelas 8</span>
                <span aria-hidden="true">·</span>
                <span>Materi: Recount Text</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 text-balance">
                Kuasai <span className="text-indigo-600">Recount Text</span> dengan Cerita, Audio & Kuis Interaktif.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                Selamat datang, <strong className="text-slate-900 font-semibold">{profile.name}</strong> ({profile.grade})!
                Aplikasi ini dirancang khusus untuk membantumu memahami cara menceritakan kembali peristiwa masa lampau dalam Bahasa Inggris secara seru, mudah, dan terstruktur.
              </p>

              {/* Research Note for Undergraduate Thesis */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-8">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Media Riset Skripsi Pendidikan Bahasa Inggris
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Dikembangkan sebagai media pembelajaran interaktif berbasis web untuk meneliti efektivitas pemahaman materi Recount Text siswa kelas 8 SMP.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
              >
                <span>Buka Menu Pembelajaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('quiz')}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-300 transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Kuis & Evaluasi Skripsi</span>
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative bg-slate-100 min-h-[300px] lg:min-h-full">
            <img
              src="/src/assets/images/hero_recount_learning_1792766110844.jpg"
              alt="Indonesian SMP students learning English recount text"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Progress & Quick Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 mb-1">Status Belajar</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {completedModules.length} / 7
          </div>
          <div className="text-xs text-indigo-600 mt-1 font-medium">
            Modul Selesai
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 mb-1">Rata-rata Nilai</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {averageScore > 0 ? `${averageScore}%` : '-'}
          </div>
          <div className="text-xs text-emerald-600 mt-1 font-medium">
            {averageScore >= 75 ? 'Tuntas KKM (>= 75)' : 'Dalam Proses'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 mb-1">Bank Kosakata</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            50+ Verbs
          </div>
          <div className="text-xs text-amber-600 mt-1 font-medium">
            Dengan Audio Suara
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-500 mb-1">Cerita Nyata</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            3 Contoh + 1 Lab
          </div>
          <div className="text-xs text-violet-600 mt-1 font-medium">
            Analisis Struktur & Grammar
          </div>
        </div>
      </div>

      {/* Learning Objectives & Curriculum Guidelines */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Kompetensi Dasar & Tujuan Pembelajaran (Kurikulum SMP)
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Materi ini disusun mengacu pada standar kurikulum Bahasa Inggris SMP Kelas 8 (KD 3.11 & 4.11 / Kurikulum Merdeka Fase D). Setelah mempelajari media ini, siswa diharapkan mampu:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Fungsi Sosial (Social Function)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mengidentifikasi tujuan komunikatif teks recount untuk menceritakan kembali peristiwa masa lampau secara runtut.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Struktur Teks (Generic Structure)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menganalisis bagian Orientation (pembuka), Events (urutan kejadian), dan Re-orientation (refleksi penutup).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Unsur Bahasa (Language Features)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menggunakan Simple Past Tense (V1 ke V2 regular & irregular), Time Connectives, serta kata keterangan waktu & tempat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards Preview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Modul Pembelajaran Mandiri
            </h2>
            <p className="text-sm text-slate-500">
              Pilih bebas modul mana saja yang ingin kamu pelajari hari ini
            </p>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            Lihat Semua Modul <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => onNavigate('definition')}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-sky-600 mb-1">
                Modul 1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                Pengertian & Tujuan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pelajari definisi, fungsi komunikatif, dan 4 macam teks recount (Personal, Factual, Imaginative, Biographical).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-indigo-600">
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigate('structure')}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-indigo-600 mb-1">
                Modul 2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                Struktur Teks (Generic Structure)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kupas tuntas Orientation, Events, dan Re-orientation dengan disektor interaktif berwarna.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-indigo-600">
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigate('examples')}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Volume2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-emerald-600 mb-1">
                Modul 4
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                Contoh Teks & Audio Narasi
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dengarkan pelafalan native English dari cerita liburan Yogya, lomba masak sekolah, & biografi Habibie.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-indigo-600">
              <span>Dengarkan Cerita</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
