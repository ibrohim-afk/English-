import React from 'react';
import { ModuleId } from '../types/recount';
import { MODULE_LIST } from '../data/curriculumData';
import {
  BookOpen,
  Layers,
  Sparkles,
  Headphones,
  FileText,
  SpellCheck,
  BookmarkCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
} from 'lucide-react';

interface LearningMenuProps {
  completedModules: string[];
  quizResults: Record<string, any>;
  onSelectModule: (id: ModuleId) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  SpellCheck: <SpellCheck className="w-6 h-6" />,
  BookmarkCheck: <BookmarkCheck className="w-6 h-6" />,
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'hover:border-sky-300' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'hover:border-indigo-300' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'hover:border-amber-300' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'hover:border-emerald-300' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'hover:border-rose-300' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'hover:border-violet-300' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'hover:border-teal-300' },
};

export const LearningMenu: React.FC<LearningMenuProps> = ({
  completedModules,
  quizResults,
  onSelectModule,
}) => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
              <span>Kurikulum SMP Kelas 8</span>
              <span aria-hidden="true">·</span>
              <span>English Recount Text</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Peta Menu Pembelajaran (Learning Menu)
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Kamu bebas memilih menu materi mana pun yang ingin kamu pelajari terlebih dahulu. Di setiap akhir materi, kamu dapat menguji pemahamanmu melalui <strong>Kuis Interaktif</strong>!
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-4">
            <div>
              <div className="text-xs text-indigo-700 font-medium">Progres Kamu</div>
              <div className="text-xl font-black text-indigo-900 tabular-nums">
                {completedModules.length} dari {MODULE_LIST.length} Modul
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white border border-indigo-200 flex items-center justify-center font-bold text-indigo-600 text-sm tabular-nums shadow-xs">
              {Math.round((completedModules.length / MODULE_LIST.length) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Learning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULE_LIST.map((mod, index) => {
          const isDone = completedModules.includes(mod.id);
          const quizResult = quizResults[mod.id];
          const color = COLOR_MAP[mod.color] || COLOR_MAP.indigo;

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id as ModuleId)}
              className={`bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md cursor-pointer ${color.border} group`}
            >
              <div>
                {/* Top bar with module number and status */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-11 h-11 rounded-xl ${color.bg} ${color.text} flex items-center justify-center transition-transform group-hover:scale-105`}
                    >
                      {ICON_MAP[mod.icon]}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 block">
                        Bagian 0{index + 1}
                      </span>
                      <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {mod.estimatedTime}
                      </span>
                    </div>
                  </div>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Selesai
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">
                      Belum
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                  {mod.title}
                </h3>
                <h4 className="text-xs font-medium text-slate-500 mb-3">
                  {mod.titleIndo}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              {/* Bottom footer with quiz score indicator or CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                {quizResult ? (
                  <span className="text-xs font-semibold text-slate-700 tabular-nums">
                    Skor Kuis: <span className="text-indigo-600 font-bold">{quizResult.percentage}%</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">
                    Termasuk Kuis Interaktif
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  Buka Materi <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent Final Evaluation & Certificate Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-amber-400 uppercase">
              <Award className="w-4 h-4" />
              <span>Evaluasi Skripsi & Sertifikat Resmi</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Sudah Siap Menguji Pemahaman Menyeluruh?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Kerjakan Post-Test Evaluasi Skripsi (10 soal mencakup fungsi sosial, struktur teks, grammar past tense, dan pemahaman bacaan). Dapatkan sertifikat kelulusan resmi dengan namamu!
            </p>
          </div>

          <button
            onClick={() => onSelectModule('quiz')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Mulai Tes Evaluasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
