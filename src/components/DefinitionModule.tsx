import React, { useState } from 'react';
import { DEFINITION_QUIZ } from '../data/curriculumData';
import { MiniQuiz } from './MiniQuiz';
import { speechService } from '../utils/speech';
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  UserCheck,
  FileSpreadsheet,
  Compass,
  Award,
} from 'lucide-react';

interface DefinitionModuleProps {
  onBackToMenu: () => void;
  onNextModule: () => void;
}

export const DefinitionModule: React.FC<DefinitionModuleProps> = ({
  onBackToMenu,
  onNextModule,
}) => {
  // Interactive Type Matcher Game State
  const [selectedTypeTest, setSelectedTypeTest] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string | null>(null);

  const scenarios = [
    {
      id: 0,
      title: 'Kisah 1: "My Clumsy Day at School"',
      excerpt:
        'Yesterday during the flag ceremony, my shoelace was untied. When our teacher told us to march, I accidentally stepped on my own lace and fell in front of everyone! Luckily, my friends helped me stand up and we laughed together.',
      correctType: 'Personal Recount',
      explanation: 'Ini adalah Personal Recount karena menceritakan pengalaman pribadi yang dialami langsung oleh si penulis (penutur orang pertama "I / my").',
    },
    {
      id: 1,
      title: 'Kisah 2: "The Great Flood of Jakarta 2020"',
      excerpt:
        'On January 1, 2020, extreme rainfall hit the Greater Jakarta area. Over sixty neighborhoods were submerged by floodwaters up to two meters deep. Emergency rescue teams deployed rubber boats to evacuate nine thousand residents.',
      correctType: 'Factual Recount',
      explanation: 'Ini adalah Factual Recount karena menyajikan laporan peristiwa nyata secara objektif dengan data fakta, angka, dan kronologi bencana tanpa fokus pada emosi pribadi.',
    },
    {
      id: 2,
      title: 'Kisah 3: "A Spacewalk on the Rings of Saturn"',
      excerpt:
        'Last night in my dream, I piloted a silver starship to Saturn. I wore a neon anti-gravity suit and touched the icy rings. Space dust twinkled like diamonds as alien dolphins swam past my helmet.',
      correctType: 'Imaginative Recount',
      explanation: 'Ini adalah Imaginative Recount karena mengisahkan peristiwa lampau fiksi atau imajinatif (seperti pengalaman dalam mimpi atau khayalan penulis).',
    },
    {
      id: 3,
      title: 'Kisah 4: "Ki Hajar Dewantara: Father of National Education"',
      excerpt:
        'Soewardi Soerjaningrat was born in Yogyakarta on May 2, 1889. In 1922, he founded the Taman Siswa school to provide equal education for native Indonesians, introducing the philosophy "Ing Ngarsa Sung Tuladha".',
      correctType: 'Biographical Recount',
      explanation: 'Ini adalah Biographical Recount karena menceritakan riwayat perjalanan hidup seorang tokoh bangsa dari masa lahir, perjuangan, hingga warisannya.',
    },
  ];

  const handlePlayTermAudio = (text: string) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Module Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToMenu}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          ← Kembali ke Menu Belajar
        </button>
        <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
          Modul 1 dari 7
        </div>
      </div>

      {/* Hero Definition Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Materi 1: Definition & Social Function</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Apa itu Recount Text?
        </h1>

        <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-5 sm:p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2 className="text-base sm:text-lg font-bold text-sky-950">
              Definition (Definisi dalam Bahasa Inggris):
            </h2>
            <button
              onClick={() =>
                handlePlayTermAudio(
                  'A recount text is a text that retells events or experiences in the past in chronological order.'
                )
              }
              className="p-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition-colors cursor-pointer shrink-0"
              title="Dengarkan pelafalan audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm sm:text-base font-medium text-sky-900 italic mb-3">
            "A Recount Text is a text that retells events or experiences in the past in chronological order."
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-sky-100 pt-3">
            <strong>Artinya dalam Bahasa Indonesia:</strong> Recount Text adalah jenis teks dalam bahasa Inggris yang menceritakan kembali peristiwa, kejadian, atau pengalaman nyata yang telah terjadi di masa lalu secara berurutan (kronologis).
          </p>
        </div>

        {/* Social Function / Communicative Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-indigo-600 uppercase mb-1">
              Fungsi Sosial 1: To Inform
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Memberikan Informasi (To Inform)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memberikan informasi yang jelas dan akurat kepada pembaca tentang apa yang telah terjadi, siapa yang terlibat, di mana, dan kapan peristiwa berlangsung.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-emerald-600 uppercase mb-1">
              Fungsi Sosial 2: To Entertain
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Menghibur Pembaca (To Entertain)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menghibur pembaca melalui cerita pengalaman lucu (funny story), liburan seru (exciting vacation), atau momen berkesan (unforgettable moment).
            </p>
          </div>
        </div>
      </div>

      {/* 4 Types of Recount Text */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          4 Jenis Recount Text untuk Siswa Kelas 8
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Ketahui karakteristik masing-masing jenis agar kamu mudah mengenalinya di soal ujian
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Type 1 */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Personal Recount
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Menceritakan pengalaman pribadi yang dialami secara langsung oleh penulis. Sudut pandang biasanya menggunakan kata ganti orang pertama (<em>I, we, my family</em>).
            </p>
            <div className="text-xs font-medium text-indigo-700 bg-indigo-50/70 p-2.5 rounded-lg">
              Contoh: <em>"My Vacation to Bali", "A Funny Experience at School"</em>
            </div>
          </div>

          {/* Type 2 */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Factual Recount
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Mencatat laporan peristiwa nyata atau fakta secara objektif, seperti laporan kecelakaan, berita investigasi, atau catatan percobaan laboratorium sains sekolah.
            </p>
            <div className="text-xs font-medium text-sky-700 bg-sky-50/70 p-2.5 rounded-lg">
              Contoh: <em>"Science Lab Experiment Report", "A Traffic Accident in 2024"</em>
            </div>
          </div>

          {/* Type 3 */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Imaginative Recount
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Menceritakan pengalaman khayalan atau fiksi di masa lalu yang dialami tokoh imajiner atau dalam sebuah mimpi.
            </p>
            <div className="text-xs font-medium text-amber-700 bg-amber-50/70 p-2.5 rounded-lg">
              Contoh: <em>"A Day in My Dream as a Pilot", "Meeting an Alien on Mars"</em>
            </div>
          </div>

          {/* Type 4 */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Biographical Recount
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Menceritakan biografi atau riwayat hidup tokoh ternama secara kronologis dari masa kecil hingga wafat atau masa suksesnya.
            </p>
            <div className="text-xs font-medium text-emerald-700 bg-emerald-50/70 p-2.5 rounded-lg">
              Contoh: <em>"Biography of B.J. Habibie", "The Life of Nelson Mandela"</em>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Activity: Tebak Jenis Recount Text */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Aktivitas Interaktif: Tebak Jenis Recount</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Uji Instingmu: Termasuk Jenis Recount Mana Cerita Ini?
        </h2>

        {/* Story Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {scenarios.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedTypeTest(idx);
                setUserGuess(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedTypeTest === idx
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Kisah {idx + 1}
            </button>
          ))}
        </div>

        {/* Selected Excerpt */}
        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 mb-6">
          <div className="text-xs font-bold text-slate-400 mb-1">
            {scenarios[selectedTypeTest].title}
          </div>
          <p className="text-sm sm:text-base text-slate-100 italic leading-relaxed">
            "{scenarios[selectedTypeTest].excerpt}"
          </p>
        </div>

        {/* Choice buttons */}
        <div className="text-xs font-medium text-slate-300 mb-3">
          Pilih salah satu jawaban:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {['Personal Recount', 'Factual Recount', 'Imaginative Recount', 'Biographical Recount'].map(
            (typeName) => {
              const isSelected = userGuess === typeName;
              const isCorrect = scenarios[selectedTypeTest].correctType === typeName;
              let style = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700';

              if (userGuess !== null) {
                if (isCorrect) {
                  style = 'bg-emerald-600 border-emerald-500 text-white font-bold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-600 border-rose-500 text-white';
                } else {
                  style = 'bg-slate-800/50 border-slate-800 text-slate-500';
                }
              }

              return (
                <button
                  key={typeName}
                  disabled={userGuess !== null}
                  onClick={() => setUserGuess(typeName)}
                  className={`p-3 text-xs rounded-xl border text-center transition-all cursor-pointer ${style}`}
                >
                  {typeName}
                </button>
              );
            }
          )}
        </div>

        {/* Result Explanation */}
        {userGuess !== null && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
              userGuess === scenarios[selectedTypeTest].correctType
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                : 'bg-rose-950/60 border-rose-800 text-rose-200'
            }`}
          >
            <strong>
              {userGuess === scenarios[selectedTypeTest].correctType
                ? 'Tepat Sekali! 🎉 '
                : 'Belum Tepat. '}
            </strong>
            {scenarios[selectedTypeTest].explanation}
          </div>
        )}
      </div>

      {/* Mini-Quiz at end of module */}
      <div>
        <div className="text-center mb-6">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Evaluasi Bagian 1
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Kuis Pemahaman: Pengertian & Fungsi Sosial
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Uji pemahamanmu sebelum lanjut ke materi struktur teks
          </p>
        </div>

        <MiniQuiz
          moduleId="definition"
          moduleTitle="Kuis Modul 1: Pengertian & Fungsi Sosial Recount Text"
          questions={DEFINITION_QUIZ}
          onComplete={() => {}}
        />
      </div>

      {/* Next Module Button */}
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
          <span>Lanjut ke Modul 2: Generic Structure</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
