import React from 'react';
import {
  BookmarkCheck,
  Printer,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
} from 'lucide-react';
import { markModuleCompleted } from '../utils/storage';

interface SummaryModuleProps {
  onBackToMenu: () => void;
  onGoToQuiz: () => void;
}

export const SummaryModule: React.FC<SummaryModuleProps> = ({
  onBackToMenu,
  onGoToQuiz,
}) => {
  const handlePrint = () => {
    markModuleCompleted('summary');
    window.print();
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto print:space-y-4 print:max-w-none">
      {/* Navigation Breadcrumb (hidden on print) */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <button
          onClick={onBackToMenu}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          ← Kembali ke Menu Belajar
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg cursor-pointer shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          Cetak / Simpan PDF Rangkuman
        </button>
      </div>

      {/* Main Infographic Summary Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs print:border-none print:shadow-none print:p-0">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 print:text-black">
          <BookmarkCheck className="w-4 h-4" />
          <span>Rangkuman Inti Materi Recount Text</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Study Guide & Cheat Sheet: Recount Text SMP Kelas 8
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-8">
          Panduan kilat satu halaman untuk belajar sebelum ujian harian dan evaluasi skripsi.
        </p>

        {/* 4 Quadrants Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quadrant 1: Definition & Purpose */}
          <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-200">
            <h2 className="text-base font-bold text-sky-950 mb-1 flex items-center gap-1.5">
              <span>01. Pengertian & Fungsi Sosial</span>
            </h2>
            <div className="space-y-2 text-xs text-slate-700 mt-3 leading-relaxed">
              <p>
                <strong>Definisi:</strong> Teks yang menceritakan kembali peristiwa masa lampau secara berurutan.
              </p>
              <p>
                <strong>Tujuan Komunikatif:</strong>
                <br />• <em>To inform:</em> Memberi informasi kronologis peristiwa.
                <br />• <em>To entertain:</em> Menghibur pembaca dengan pengalaman menarik.
              </p>
              <p>
                <strong>4 Jenis Recount:</strong> Personal Recount, Factual Recount, Imaginative Recount, Biographical Recount.
              </p>
            </div>
          </div>

          {/* Quadrant 2: Generic Structure */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200">
            <h2 className="text-base font-bold text-indigo-950 mb-1 flex items-center gap-1.5">
              <span>02. Struktur Teks (Generic Structure)</span>
            </h2>
            <div className="space-y-2 text-xs text-slate-700 mt-3 leading-relaxed">
              <p>
                <strong>1. Orientation:</strong> Latar belakang di awal teks (Siapa / <em>Who</em>, Di mana / <em>Where</em>, Kapan / <em>When</em>).
              </p>
              <p>
                <strong>2. Events:</strong> Rangkaian kejadian secara kronologis (First, Next, Then, After that, Finally).
              </p>
              <p>
                <strong>3. Re-orientation:</strong> Penutup berisi komentar pribadi atau kesan perasaan penulis (opsional).
              </p>
            </div>
          </div>

          {/* Quadrant 3: Simple Past Tense Formula */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
            <h2 className="text-base font-bold text-amber-950 mb-1 flex items-center gap-1.5">
              <span>03. Rumus Simple Past Tense</span>
            </h2>
            <div className="space-y-2 text-xs text-slate-800 mt-3 font-mono">
              <div className="p-2 bg-white rounded-lg border border-amber-200">
                (+) <strong>Subject + Verb 2 + Object</strong>
                <div className="text-[11px] text-slate-600 font-sans mt-0.5">
                  <em>Contoh: We visited Bali last month.</em>
                </div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-amber-200">
                (-) <strong>Subject + did not + Verb 1 + Object</strong>
                <div className="text-[11px] text-slate-600 font-sans mt-0.5">
                  <em>Contoh: We did not visit Bali.</em>
                </div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-amber-200">
                (?) <strong>Did + Subject + Verb 1 + Object?</strong>
                <div className="text-[11px] text-slate-600 font-sans mt-0.5">
                  <em>Contoh: Did you visit Bali?</em>
                </div>
              </div>
            </div>
          </div>

          {/* Quadrant 4: Connectors & Verbs */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <h2 className="text-base font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
              <span>04. Kata Hubung & Kata Kerja</span>
            </h2>
            <div className="space-y-2 text-xs text-slate-700 mt-3 leading-relaxed">
              <div>
                <strong>Regular Verbs (+ed/-d):</strong>
                <br />play → played, visit → visited, cook → cooked, clean → cleaned.
              </div>
              <div>
                <strong>Irregular Verbs (Spesial):</strong>
                <br />go → went, see → saw, buy → bought, eat → ate, swim → swam.
              </div>
              <div>
                <strong>Time Connectives:</strong>
                <br />First → Then → Next → After that → Later → Finally.
              </div>
            </div>
          </div>
        </div>

        {/* Exam Tips & Traps Card */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 mb-8 print:bg-white print:text-black print:border-slate-300">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 print:text-black">
            💡 Tips & Jebakan Soal Ujian Bahasa Inggris SMP:
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-800 list-disc list-inside leading-relaxed">
            <li>
              Jika ada kata <strong>"did not"</strong>, jangan gunakan Verb 2! Pastikan selalu kembali ke bentuk <strong>Verb 1</strong> (misal: <em>did not go</em>, BUKAN <em>did not went</em>).
            </li>
            <li>
              Pertanyaan <em>"What is the writer's intention in writing the text?"</em> jawabannya selalu diawali <strong>To retell past events / To share personal experience</strong>.
            </li>
            <li>
              Pertanyaan paragraf pertama biasanya menguji <strong>Orientation</strong> (mencari waktu, tempat, atau tokoh).
            </li>
          </ul>
        </div>

        {/* Ready to Take the Final Test CTA (hidden on print) */}
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div>
            <h3 className="text-base font-bold text-indigo-950 mb-0.5">
              Siap untuk Evaluasi Skripsi & Sertifikat?
            </h3>
            <p className="text-xs text-indigo-700">
              Selesaikan 10 soal post-test untuk membuktikan pemahamanmu dan raih sertifikat resmi!
            </p>
          </div>
          <button
            onClick={onGoToQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Mulai Post-Test Evaluasi Skripsi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
