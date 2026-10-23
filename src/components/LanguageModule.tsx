import React, { useState } from 'react';
import { LANGUAGE_QUIZ } from '../data/curriculumData';
import { MiniQuiz } from './MiniQuiz';
import { speechService } from '../utils/speech';
import {
  Sparkles,
  ArrowRight,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface LanguageModuleProps {
  onBackToMenu: () => void;
  onNextModule: () => void;
}

export const LanguageModule: React.FC<LanguageModuleProps> = ({
  onBackToMenu,
  onNextModule,
}) => {
  // Interactive Verb Practice State
  const [selectedVerbPair, setSelectedVerbPair] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const verbCards = [
    { v1: 'go', v2: 'went', type: 'Irregular', meaning: 'pergi', example: 'We went to Bali last holiday.' },
    { v1: 'visit', v2: 'visited', type: 'Regular', meaning: 'mengunjungi', example: 'They visited Borobudur Temple.' },
    { v1: 'buy', v2: 'bought', type: 'Irregular', meaning: 'membeli', example: 'Mother bought delicious cookies.' },
    { v1: 'play', v2: 'played', type: 'Regular', meaning: 'bermain', example: 'We played badminton in the yard.' },
    { v1: 'see', v2: 'saw', type: 'Irregular', meaning: 'melihat', example: 'I saw a giant turtle on the sand.' },
    { v1: 'cook', v2: 'cooked', type: 'Regular', meaning: 'memasak', example: 'Father cooked fried rice for dinner.' },
    { v1: 'swim', v2: 'swam', type: 'Irregular', meaning: 'berenang', example: 'We swam in the calm lagoon.' },
    { v1: 'arrive', v2: 'arrived', type: 'Regular', meaning: 'tiba', example: 'The train arrived at 7:00 AM.' },
  ];

  // Interactive Sentence Quiz State
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [checkedFill, setCheckedFill] = useState(false);

  const fillQuestions = [
    {
      id: 0,
      sentencePre: 'Yesterday, my family ',
      options: ['go', 'went', 'gone'],
      correct: 'went',
      sentencePost: ' to the zoo.',
      explanation: '"went" adalah Past Form (V2) dari "go".',
    },
    {
      id: 1,
      sentencePre: 'We did not ',
      options: ['swam', 'swim', 'swimming'],
      correct: 'swim',
      sentencePost: ' because it was raining.',
      explanation: 'Setelah kata bantu negatif "did not", kata kerja kembali ke bentuk dasar V1 ("swim").',
    },
    {
      id: 2,
      sentencePre: 'First, we unpacked our luggage. ',
      options: ['Because', 'Then', 'Although'],
      correct: 'Then',
      sentencePost: ', we ordered lunch at the cafe.',
      explanation: '"Then" adalah kata hubung urutan waktu (time connective) yang tepat.',
    },
  ];

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToMenu}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          ← Kembali ke Menu Belajar
        </button>
        <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
          Modul 3 dari 7
        </div>
      </div>

      {/* Hero Title */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Materi 3: Language Features</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Unsur Kebahasaan Recount Text
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          Untuk menyusun teks recount yang tepat, terdapat 4 pilar kebahasaan utama yang wajib kamu kuasai: <strong>Simple Past Tense</strong>, <strong>Action Verbs</strong>, <strong>Time Connectives</strong>, dan <strong>Adverb of Time/Place</strong>.
        </p>

        {/* 1. Simple Past Tense Formula Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-800">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Pilar Utama Kebahasaan
              </span>
              <h2 className="text-lg sm:text-xl font-bold">
                Rumus Simple Past Tense (Waktu Lampau)
              </h2>
            </div>
            <span className="text-xs text-slate-400">Verbal Sentences</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
              <div className="text-xs font-bold text-emerald-400 uppercase mb-1">
                Kalimat Positif (+)
              </div>
              <div className="text-sm font-mono text-amber-300 font-bold mb-2">
                Subject + Verb 2 + Object
              </div>
              <p className="text-xs text-slate-300">
                <em>"We visited Mount Bromo last year."</em>
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
              <div className="text-xs font-bold text-rose-400 uppercase mb-1">
                Kalimat Negatif (-)
              </div>
              <div className="text-sm font-mono text-amber-300 font-bold mb-2">
                Subject + did not + Verb 1 + Object
              </div>
              <p className="text-xs text-slate-300">
                <em>"We did not visit Mount Bromo."</em>
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
              <div className="text-xs font-bold text-sky-400 uppercase mb-1">
                Kalimat Tanya (?)
              </div>
              <div className="text-sm font-mono text-amber-300 font-bold mb-2">
                Did + Subject + Verb 1 + Object?
              </div>
              <p className="text-xs text-slate-300">
                <em>"Did you visit Mount Bromo?"</em>
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <span className="text-amber-400 font-bold text-sm">⚠️</span>
            <span>
              <strong>Perhatian Kunci untuk Ujian:</strong> Pada kalimat negatif (-) dan tanya (?), kata kerja selalu kembali ke bentuk dasar <strong>Verb 1</strong> karena sudah ada kata bantu <em>"did"</em>!
            </span>
          </div>
        </div>

        {/* 2. Regular vs Irregular Verbs Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs mb-3">
              A
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Regular Verbs (Kata Kerja Beraturan)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Kata kerja lampau yang dibentuk hanya dengan menambahkan akhiran <strong>-ed</strong> atau <strong>-d</strong> pada kata kerja dasar.
            </p>
            <div className="space-y-1.5 text-xs text-slate-800 bg-white/80 p-3 rounded-xl border border-amber-200">
              <div>• visit → <strong className="text-amber-700">visited</strong> (mengunjungi)</div>
              <div>• play → <strong className="text-amber-700">played</strong> (bermain)</div>
              <div>• clean → <strong className="text-amber-700">cleaned</strong> (membersihkan)</div>
              <div>• arrive → <strong className="text-amber-700">arrived</strong> (tiba)</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-3">
              B
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Irregular Verbs (Kata Kerja Tak Beraturan)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Kata kerja yang mengalami perubahan ejaan khusus atau bahkan tidak berubah sama sekali saat menjadi bentuk lampau.
            </p>
            <div className="space-y-1.5 text-xs text-slate-800 bg-white/80 p-3 rounded-xl border border-indigo-200">
              <div>• go → <strong className="text-indigo-700">went</strong> (pergi)</div>
              <div>• see → <strong className="text-indigo-700">saw</strong> (melihat)</div>
              <div>• buy → <strong className="text-indigo-700">bought</strong> (membeli)</div>
              <div>• eat → <strong className="text-indigo-700">ate</strong> (makan)</div>
            </div>
          </div>
        </div>

        {/* 3. Time Connectives & Adverbs */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
          <h3 className="text-base font-bold text-slate-900 mb-3">
            Kata Hubung Waktu (Time Connectives) & Keterangan Waktu
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Agar cerita mengalir dengan runtut (chronological), gunakan kata penghubung berikut:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-indigo-600 block">First / Firstly</span>
              <span className="text-slate-500">Pertama-tama</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-indigo-600 block">Then / Next</span>
              <span className="text-slate-500">Kemudian / Lalu</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-indigo-600 block">After that / Later</span>
              <span className="text-slate-500">Setelah itu / Nanti</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-indigo-600 block">Finally / In the end</span>
              <span className="text-slate-500">Akhirnya / Pada akhirnya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tool: Verb Transformation Flash Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Card: Verb Lab</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Latihan Mengubah Kata Kerja V1 → V2
            </h2>
            <p className="text-xs text-slate-500">
              Pilih kata kerja, tebak bentuk lampaunya, lalu klik 'Buka Jawaban & Audio'
            </p>
          </div>
        </div>

        {/* Verb selector chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {verbCards.map((card, idx) => (
            <button
              key={card.v1}
              onClick={() => {
                setSelectedVerbPair(idx);
                setIsRevealed(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedVerbPair === idx
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {card.v1} ({card.meaning})
            </button>
          ))}
        </div>

        {/* Card Display */}
        {(() => {
          const current = verbCards[selectedVerbPair];
          return (
            <div className="max-w-xl mx-auto bg-gradient-to-br from-indigo-50/80 to-slate-50 rounded-2xl p-6 sm:p-8 border border-indigo-200 text-center shadow-xs">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Kata Dasar (Verb 1)
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
                {current.v1}
              </div>
              <div className="text-xs text-slate-500 mb-6">
                Artinya: <span className="font-semibold text-slate-700">{current.meaning}</span>
              </div>

              {!isRevealed ? (
                <button
                  onClick={() => setIsRevealed(true)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Buka Jawaban Bentuk Lampau (V2) & Audio
                </button>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-2xs">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
                        {current.v2}
                      </span>
                      <button
                        onClick={() => handleSpeak(current.v2)}
                        className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 cursor-pointer"
                        title="Dengar pelafalan"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      Tipe: {current.type} Verb
                    </span>
                  </div>

                  <div className="p-3 bg-white/70 rounded-xl text-left border border-slate-200 text-xs">
                    <div className="text-slate-400 font-semibold mb-1">Contoh dalam Kalimat Recount:</div>
                    <div className="text-slate-800 font-medium italic flex items-center justify-between gap-2">
                      <span>"{current.example}"</span>
                      <button
                        onClick={() => handleSpeak(current.example)}
                        className="text-slate-500 hover:text-indigo-600 p-1 cursor-pointer"
                        title="Dengar kalimat"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Mini Sentence Builder Challenge */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Tantangan Cepat: Pilih Bentuk Kata yang Benar
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Klik pilihan kata yang tepat di dalam kalimat
        </p>

        <div className="space-y-4 mb-6">
          {fillQuestions.map((q) => {
            const chosen = fillAnswers[q.id];
            const isCorrect = chosen === q.correct;

            return (
              <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-medium text-slate-700">{q.sentencePre}</span>

                  <div className="inline-flex items-center gap-1">
                    {q.options.map((opt) => {
                      const isOptChosen = chosen === opt;
                      return (
                        <button
                          key={opt}
                          disabled={checkedFill}
                          onClick={() =>
                            setFillAnswers((prev) => ({
                              ...prev,
                              [q.id]: opt,
                            }))
                          }
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            isOptChosen
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <span className="font-medium text-slate-700">{q.sentencePost}</span>
                </div>

                {checkedFill && (
                  <div className="mt-2 pt-2 border-t border-slate-200 text-xs flex items-center gap-2">
                    {isCorrect ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Benar!
                      </span>
                    ) : (
                      <span className="text-rose-600 font-bold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Belum tepat (Jawaban: {q.correct})
                      </span>
                    )}
                    <span className="text-slate-500">— {q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCheckedFill(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Cek Jawaban Saya
          </button>
          {checkedFill && (
            <button
              onClick={() => {
                setFillAnswers({});
                setCheckedFill(false);
              }}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Mini-Quiz at end of module */}
      <div>
        <div className="text-center mb-6">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Evaluasi Bagian 3
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Kuis Pemahaman: Unsur Kebahasaan Recount Text
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Uji kemampuanmu seputar Simple Past Tense dan Time Connectives
          </p>
        </div>

        <MiniQuiz
          moduleId="language"
          moduleTitle="Kuis Modul 3: Language Features Recount Text"
          questions={LANGUAGE_QUIZ}
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
          <span>Lanjut ke Modul 4: Contoh Cerita & Audio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
