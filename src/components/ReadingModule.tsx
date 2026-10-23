import React, { useState } from 'react';
import { READING_PASSAGE } from '../data/curriculumData';
import { speechService } from '../utils/speech';
import { verifyEventSequence } from '../utils/logic';
import { markModuleCompleted } from '../utils/storage';
import {
  FileText,
  Play,
  Square,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';
import { SequencingEvent } from '../types/recount';

interface ReadingModuleProps {
  onBackToMenu: () => void;
  onNextModule: () => void;
}

export const ReadingModule: React.FC<ReadingModuleProps> = ({
  onBackToMenu,
  onNextModule,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'mc' | 'tf' | 'sequence' | 'vocab'>('text');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Tab 1: Multiple Choice State
  const [mcAnswers, setMcAnswers] = useState<Record<number, number>>({});
  const [mcSubmitted, setMcSubmitted] = useState(false);

  // Tab 2: True/False State
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean>>({});
  const [tfSubmitted, setTfSubmitted] = useState(false);

  // Tab 3: Sequencing State (start with slightly shuffled order)
  const [eventsList, setEventsList] = useState<SequencingEvent[]>([
    READING_PASSAGE.sequencingItems[1],
    READING_PASSAGE.sequencingItems[0],
    READING_PASSAGE.sequencingItems[3],
    READING_PASSAGE.sequencingItems[2],
    READING_PASSAGE.sequencingItems[4],
  ]);
  const [seqResult, setSeqResult] = useState<{ isCorrect: boolean; correctCount: number } | null>(
    null
  );

  // Tab 4: Vocab Match State
  const [vocabMatches, setVocabMatches] = useState<Record<string, string>>({});
  const [vocabSubmitted, setVocabSubmitted] = useState(false);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      speechService.speak(READING_PASSAGE.fullText, {
        rate: 0.9,
        onEnd: () => setIsPlayingAudio(false),
      });
      setIsPlayingAudio(true);
    }
  };

  // Move event up in sequence
  const moveEvent = (index: number, direction: 'up' | 'down') => {
    if (seqResult !== null) setSeqResult(null); // reset verification
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= eventsList.length) return;

    const newList = [...eventsList];
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;
    setEventsList(newList);
  };

  const checkSequencing = () => {
    const res = verifyEventSequence(eventsList);
    setSeqResult({ isCorrect: res.isCorrect, correctCount: res.correctPositionsCount });
    if (res.isCorrect) {
      markModuleCompleted('reading');
    }
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
          Modul 5 dari 7
        </div>
      </div>

      {/* Hero Title */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>Materi 5: Reading Activity (Latihan Membaca Aktif)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Latihan Membaca: Our School Camping Trip
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          Baca teks recount bertema kegiatan kemah sekolah (Scout Camp) di bawah ini, dengarkan narasinya, dan selesaikan tantangan pemahaman: pilihan ganda, true/false, menyusun urutan peristiwa kronologis, dan kuis kosakata!
        </p>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'text'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📖 Teks Cerita & Audio
          </button>
          <button
            onClick={() => setActiveTab('mc')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'mc'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎯 Pilihan Ganda (5 Soal)
          </button>
          <button
            onClick={() => setActiveTab('tf')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'tf'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ⚖️ Benar / Salah (True/False)
          </button>
          <button
            onClick={() => setActiveTab('sequence')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'sequence'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🔢 Susun Urutan Kejadian
          </button>
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'vocab'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🔤 Cocokkan Kosakata
          </button>
        </div>

        {/* TAB 1: STORY TEXT & AUDIO */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={READING_PASSAGE.image}
                alt="Camping at Mount Salak"
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                  SMP Grade 8 Reading Passage
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {READING_PASSAGE.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <button
                onClick={handleToggleAudio}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Square className="w-3.5 h-3.5" /> Berhenti Membaca
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Dengarkan Bacaan
                  </>
                )}
              </button>
              <span className="text-xs text-slate-500">
                Laju baca: Ramah siswa SMP
              </span>
            </div>

            <div className="p-6 sm:p-8 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-4 text-base sm:text-lg text-slate-800 leading-relaxed font-sans">
              {READING_PASSAGE.fullText.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-900">
                Selesai membaca? Uji pemahamanmu sekarang!
              </span>
              <button
                onClick={() => setActiveTab('mc')}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Mulai Latihan Soal →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MULTIPLE CHOICE */}
        {activeTab === 'mc' && (
          <div className="space-y-6">
            <div className="space-y-6">
              {READING_PASSAGE.multipleChoiceQuestions.map((q, idx) => {
                const chosen = mcAnswers[idx];
                const isCorrect = chosen === q.correctAnswer;

                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-semibold text-indigo-600 mb-1">
                      Pertanyaan {idx + 1}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                      {q.question}
                    </h4>

                    <div className="space-y-2 mb-3">
                      {q.options.map((opt, optIdx) => {
                        const isThisChosen = chosen === optIdx;
                        let optStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                        if (mcSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          } else if (isThisChosen && !isCorrect) {
                            optStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                          } else {
                            optStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                          }
                        } else if (isThisChosen) {
                          optStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={mcSubmitted}
                            onClick={() =>
                              setMcAnswers((prev) => ({
                                ...prev,
                                [idx]: optIdx,
                              }))
                            }
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${optStyle}`}
                          >
                            <span>
                              <strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}
                            </span>
                            {mcSubmitted && optIdx === q.correctAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            )}
                            {mcSubmitted && isThisChosen && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {mcSubmitted && (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                        <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {!mcSubmitted ? (
                <button
                  onClick={() => setMcSubmitted(true)}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Koreksi Jawaban Pilihan Ganda
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMcAnswers({});
                    setMcSubmitted(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Ulangi Pilihan Ganda
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: TRUE / FALSE */}
        {activeTab === 'tf' && (
          <div className="space-y-4">
            {READING_PASSAGE.trueFalseQuestions.map((tf, i) => {
              const answer = tfAnswers[tf.id];
              const isSubmitted = tfSubmitted;
              const isCorrect = answer === tf.isTrue;

              return (
                <div key={tf.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800">
                      {i + 1}. "{tf.statement}"
                    </p>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        disabled={isSubmitted}
                        onClick={() =>
                          setTfAnswers((prev) => ({
                            ...prev,
                            [tf.id]: true,
                          }))
                        }
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          answer === true
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        TRUE (Benar)
                      </button>
                      <button
                        disabled={isSubmitted}
                        onClick={() =>
                          setTfAnswers((prev) => ({
                            ...prev,
                            [tf.id]: false,
                          }))
                        }
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          answer === false
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        FALSE (Salah)
                      </button>
                    </div>
                  </div>

                  {isSubmitted && (
                    <div className="mt-2 pt-2 border-t border-slate-200 text-xs">
                      {isCorrect ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Benar!
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Belum Tepat. Kunci:{' '}
                          {tf.isTrue ? 'TRUE' : 'FALSE'}
                        </span>
                      )}
                      <p className="text-slate-600 mt-1">{tf.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-2">
              {!tfSubmitted ? (
                <button
                  onClick={() => setTfSubmitted(true)}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Koreksi True / False
                </button>
              ) : (
                <button
                  onClick={() => {
                    setTfAnswers({});
                    setTfSubmitted(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CHRONOLOGICAL SEQUENCING */}
        {activeTab === 'sequence' && (
          <div className="space-y-6">
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed">
              <strong>Tantangan Kronologis (Chronological Order):</strong> Susun 5 peristiwa dari teks camping di bawah ini sesuai urutan waktu yang sebenarnya (dari kejadian 1 sampai kejadian 5) menggunakan tombol panah atas (▲) dan bawah (▼).
            </div>

            <div className="space-y-3">
              {eventsList.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800">
                      {item.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveEvent(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-slate-700"
                      title="Geser ke atas"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveEvent(index, 'down')}
                      disabled={index === eventsList.length - 1}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-slate-700"
                      title="Geser ke bawah"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {seqResult && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                  seqResult.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                {seqResult.isCorrect ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      Hebat sekali! Semua 5 peristiwa berhasil kamu urutkan secara kronologis dengan benar!
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold mb-1">
                      {seqResult.correctCount} dari 5 posisi sudah tepat.
                    </div>
                    <p>
                      Perhatikan kembali urutan hari: hari Jumat (kumpul di sekolah & pasang tenda) → malam api unggun → Sabtu (jungle trek) → Minggu siang (bersihkan tenda & pulang).
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={checkSequencing}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs"
              >
                Periksa Urutan Kronologis
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: VOCABULARY MATCH */}
        {activeTab === 'vocab' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-500">
              Pilih terjemahan bahasa Indonesia yang tepat untuk setiap kosakata dari teks perkemahan:
            </p>

            <div className="space-y-3">
              {READING_PASSAGE.vocabMatching.map((vm) => {
                const selected = vocabMatches[vm.word];
                const isCorrect = selected === vm.translation;

                return (
                  <div
                    key={vm.word}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="font-bold text-slate-900 text-sm">
                      {vm.word}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        disabled={vocabSubmitted}
                        value={selected || ''}
                        onChange={(e) =>
                          setVocabMatches((prev) => ({
                            ...prev,
                            [vm.word]: e.target.value,
                          }))
                        }
                        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium outline-hidden cursor-pointer"
                      >
                        <option value="">-- Pilih Arti Kata --</option>
                        {READING_PASSAGE.vocabMatching.map((opt) => (
                          <option key={opt.translation} value={opt.translation}>
                            {opt.translation}
                          </option>
                        ))}
                      </select>

                      {vocabSubmitted && (
                        <span>
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              {!vocabSubmitted ? (
                <button
                  onClick={() => setVocabSubmitted(true)}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Periksa Pasangan Kosakata
                </button>
              ) : (
                <button
                  onClick={() => {
                    setVocabMatches({});
                    setVocabSubmitted(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>
          </div>
        )}
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
          <span>Lanjut ke Modul 6: Bank Kosakata & Flashcards</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
