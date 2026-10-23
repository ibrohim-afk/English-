import React, { useState } from 'react';
import { VOCABULARY_LIST } from '../data/curriculumData';
import { speechService } from '../utils/speech';
import { markModuleCompleted } from '../utils/storage';
import {
  SpellCheck,
  Search,
  Volume2,
  RotateCw,
  ArrowRight,
  ArrowLeft,
  Filter,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { VocabularyWord } from '../types/recount';

interface VocabularyLabProps {
  onBackToMenu: () => void;
  onNextModule: () => void;
}

export const VocabularyLab: React.FC<VocabularyLabProps> = ({
  onBackToMenu,
  onNextModule,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'regular' | 'irregular' | 'connector'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filtered list
  const filteredWords = VOCABULARY_LIST.filter((w) => {
    const matchesCat = filterCategory === 'all' || w.category === filterCategory;
    const matchesSearch =
      w.v1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.v2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.indonesian.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    if (flashcardIndex < filteredWords.length - 1) {
      setFlashcardIndex((prev) => prev + 1);
    } else {
      setFlashcardIndex(0);
      markModuleCompleted('vocabulary');
    }
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    if (flashcardIndex > 0) {
      setFlashcardIndex((prev) => prev - 1);
    } else {
      setFlashcardIndex(filteredWords.length - 1);
    }
  };

  const currentFlashcard: VocabularyWord | undefined = filteredWords[flashcardIndex] || filteredWords[0];

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
          Modul 6 dari 7
        </div>
      </div>

      {/* Hero Title */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-violet-600 uppercase tracking-wider mb-2">
          <SpellCheck className="w-4 h-4" />
          <span>Materi 6: Vocabulary & Past Verbs Lab</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Bank Kosakata & Kata Kerja Recount Text
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          Kuasai kata kerja lampau penting untuk kelas 8 SMP. Dilengkapi pelafalan suara (audio pronunciation), arti bahasa Indonesia, serta contoh kalimat recount text nyata!
        </p>

        {/* View Mode Toggle & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kerja atau arti (misal: went, makan, visit)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 bg-white"
            />
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              📋 Mode Tabel / Daftar
            </button>
            <button
              onClick={() => setViewMode('flashcard')}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                viewMode === 'flashcard'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              🃏 Mode Flashcard Interaktif
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-4 mb-6">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Kategori:
          </span>
          {[
            { id: 'all', label: 'Semua Kosakata' },
            { id: 'irregular', label: 'Irregular Verbs (Tak Beraturan)' },
            { id: 'regular', label: 'Regular Verbs (Berakhiran -ed)' },
            { id: 'connector', label: 'Time Connectives (Kata Hubung)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id as any);
                setFlashcardIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* VIEW 1: FLASHCARD MODE */}
        {viewMode === 'flashcard' && currentFlashcard && (
          <div className="max-w-md mx-auto my-6">
            <div className="text-center text-xs text-slate-500 mb-3">
              Kartu ke <span className="font-bold text-indigo-600 tabular-nums">{flashcardIndex + 1}</span> dari <span className="tabular-nums">{filteredWords.length}</span> (Klik kartu untuk membalik)
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[260px] bg-gradient-to-br from-indigo-50/90 to-purple-50/50 rounded-3xl border-2 border-indigo-200 p-8 flex flex-col justify-between items-center text-center cursor-pointer shadow-sm hover:shadow transition-all relative select-none"
            >
              <div className="w-full flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-700 uppercase tracking-wide">
                  {currentFlashcard.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" /> Balik Kartu
                </span>
              </div>

              {!isFlipped ? (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Present / Base Form (V1)
                  </div>
                  <div className="text-4xl font-black text-slate-900 mb-2">
                    {currentFlashcard.v1}
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    Artinya: "{currentFlashcard.indonesian}"
                  </div>
                  <div className="mt-4 text-xs font-semibold text-indigo-600 bg-white/80 px-3 py-1 rounded-full border border-indigo-100 inline-block">
                    Sentuh untuk lihat Bentuk Lampau (V2)
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Past Form (V2)
                  </div>
                  <div className="text-4xl font-black text-indigo-600">
                    {currentFlashcard.v2}
                  </div>
                  <div className="text-xs text-slate-500">
                    Pelafalan: <span className="font-mono">{currentFlashcard.pronunciation}</span>
                  </div>
                  <div className="p-3 bg-white/90 rounded-xl text-left border border-indigo-100 text-xs text-slate-700 mt-2">
                    <p className="italic font-medium">"{currentFlashcard.exampleSentence}"</p>
                    <p className="text-slate-500 mt-1">{currentFlashcard.exampleTranslation}</p>
                  </div>
                </div>
              )}

              <div className="w-full flex justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(isFlipped ? currentFlashcard.v2 : currentFlashcard.v1);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 hover:bg-indigo-50 cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Dengarkan Pelafalan
                </button>
              </div>
            </div>

            {/* Flashcard Controller */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrevFlashcard}
                className="inline-flex items-center gap-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Sebelumnya
              </button>
              <button
                onClick={handleNextFlashcard}
                className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-pointer shadow-xs"
              >
                Selanjutnya <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: TABLE LIST MODE */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Verb 1 (Present)</th>
                  <th className="py-3 px-4">Verb 2 (Past)</th>
                  <th className="py-3 px-4">Arti Indonesia</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Contoh Kalimat Recount</th>
                  <th className="py-3 px-4 text-center">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWords.map((word) => (
                  <tr key={word.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {word.v1}
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-600">
                      {word.v2}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {word.indonesian}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          word.category === 'irregular'
                            ? 'bg-amber-100 text-amber-800'
                            : word.category === 'regular'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {word.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">
                      <p className="italic font-medium text-slate-800">"{word.exampleSentence}"</p>
                      <p className="text-slate-400 mt-0.5">{word.exampleTranslation}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleSpeak(word.v2)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer transition-colors"
                        title="Dengar pelafalan V2"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <span>Lanjut ke Modul 7: Rangkuman & Cheat Sheet</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
