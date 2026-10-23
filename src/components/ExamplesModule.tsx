import React, { useState, useEffect } from 'react';
import { EXAMPLE_STORIES } from '../data/curriculumData';
import { MiniQuiz } from './MiniQuiz';
import { speechService } from '../utils/speech';
import {
  Headphones,
  Play,
  Square,
  Volume2,
  Sparkles,
  ArrowRight,
  Eye,
  BookOpen,
  Filter,
} from 'lucide-react';

interface ExamplesModuleProps {
  onBackToMenu: () => void;
  onNextModule: () => void;
}

export const ExamplesModule: React.FC<ExamplesModuleProps> = ({
  onBackToMenu,
  onNextModule,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.9);

  // Filter toggles
  const [showStructureTags, setShowStructureTags] = useState(true);
  const [highlightVerbs, setHighlightVerbs] = useState(true);
  const [highlightConnectors, setHighlightConnectors] = useState(true);

  // Vocabulary popup state
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    note: string;
  } | null>(null);

  const currentStory = EXAMPLE_STORIES[activeStoryIndex];

  // Stop audio when changing story
  useEffect(() => {
    speechService.stop();
    setIsPlayingAudio(false);
  }, [activeStoryIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      const fullNarration = currentStory.paragraphs.map((p) => p.text).join(' ');
      speechService.speak(fullNarration, {
        rate: playbackSpeed,
        onEnd: () => setIsPlayingAudio(false),
      });
      setIsPlayingAudio(true);
    }
  };

  const handlePlayParagraph = (text: string) => {
    speechService.speak(text, {
      rate: playbackSpeed,
      onEnd: () => setIsPlayingAudio(false),
    });
    setIsPlayingAudio(true);
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
          Modul 4 dari 7
        </div>
      </div>

      {/* Hero Title */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
          <Headphones className="w-4 h-4" />
          <span>Materi 4: Recount Stories & Audio Narration</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Contoh Teks Recount & Audio Pelafalan
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          Pelajari 3 contoh recount text nyata yang dekat dengan kehidupan sehari-hari siswa SMP kelas 8. Dengarkan narasi audio berstandar penutur asli (native pronunciation) dan aktifkan filter struktur untuk membedah unsur teks secara mendalam!
        </p>

        {/* Story Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 p-1.5 bg-slate-100 rounded-2xl mb-8">
          {EXAMPLE_STORIES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStoryIndex(idx)}
              className={`flex-1 min-w-[200px] text-left p-3 rounded-xl transition-all cursor-pointer ${
                activeStoryIndex === idx
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="text-xs text-slate-400 font-semibold mb-0.5">
                {s.type}
              </div>
              <div className="text-xs sm:text-sm truncate">
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {/* Story Main Reader Surface */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Story Cover Image & Header */}
          <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden">
            <img
              src={currentStory.image}
              alt={currentStory.title}
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase mb-1">
                {currentStory.type}
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentStory.title}
              </h2>
            </div>
          </div>

          {/* Audio Toolbar & Highlighting Controls */}
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            {/* Audio Control */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs ${
                  isPlayingAudio
                    ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Square className="w-3.5 h-3.5" /> Jeda Audio
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Dengarkan Narasi Suara
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white px-2.5 py-2 rounded-lg border border-slate-200">
                <span>Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="bg-transparent font-bold text-slate-800 outline-hidden cursor-pointer"
                >
                  <option value={0.8}>0.8x (Lambat/Siswa)</option>
                  <option value={0.9}>0.9x (Normal Siswa)</option>
                  <option value={1.0}>1.0x (Normal Standar)</option>
                </select>
              </div>
            </div>

            {/* Filter highlighter toggles */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter Sorot:
              </span>

              <button
                onClick={() => setShowStructureTags(!showStructureTags)}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  showStructureTags
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                🏷️ Struktur Teks
              </button>

              <button
                onClick={() => setHighlightVerbs(!highlightVerbs)}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  highlightVerbs
                    ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                🟡 Kata Kerja Lampau (V2)
              </button>

              <button
                onClick={() => setHighlightConnectors(!highlightConnectors)}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  highlightConnectors
                    ? 'bg-purple-50 border-purple-300 text-purple-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                🟣 Time Connectives
              </button>
            </div>
          </div>

          {/* Paragraphs body */}
          <div className="p-6 sm:p-8 space-y-6">
            {currentStory.paragraphs.map((p, pIdx) => {
              let partBadge = '';
              let badgeStyle = '';
              if (p.part === 'orientation') {
                partBadge = 'ORIENTATION';
                badgeStyle = 'bg-sky-100 text-sky-800 border-sky-300';
              } else if (p.part === 'event') {
                partBadge = `EVENT ${pIdx}`;
                badgeStyle = 'bg-indigo-100 text-indigo-800 border-indigo-300';
              } else {
                partBadge = 'RE-ORIENTATION';
                badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300';
              }

              return (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    {showStructureTags && (
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border tracking-wider ${badgeStyle}`}
                      >
                        {partBadge}
                      </span>
                    )}
                    <button
                      onClick={() => handlePlayParagraph(p.text)}
                      className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer ml-auto"
                      title="Dengar paragraf ini saja"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Putar Paragraf
                    </button>
                  </div>

                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
                    {p.text}
                  </p>

                  {/* Highlights key words badge below paragraph */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                    {highlightVerbs && p.highlightPastVerbs && p.highlightPastVerbs.length > 0 && (
                      <div className="flex items-center gap-1 text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/80">
                        <span className="font-semibold text-[10px] uppercase text-amber-600">Past Verbs:</span>
                        <span>{p.highlightPastVerbs.join(', ')}</span>
                      </div>
                    )}
                    {highlightConnectors && p.highlightConnectors && p.highlightConnectors.length > 0 && (
                      <div className="flex items-center gap-1 text-purple-800 bg-purple-50/80 px-2.5 py-1 rounded-md border border-purple-200/80">
                        <span className="font-semibold text-[10px] uppercase text-purple-600">Connectors:</span>
                        <span>{p.highlightConnectors.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Reflection / Moral Value */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">
                Refleksi Makna Cerita (Reflection):
              </span>
              <p className="italic text-slate-600">
                "{currentStory.moralOrReflection}"
              </p>
            </div>
          </div>
        </div>

        {/* Story Comprehension Mini-Quiz */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Pemahaman Cerita
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Kuis Pemahaman: {currentStory.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Uji pemahamanmu terhadap detail peristiwa pada cerita di atas
            </p>
          </div>

          <MiniQuiz
            moduleId={`story-${currentStory.id}`}
            moduleTitle={`Kuis Cerita: ${currentStory.title}`}
            questions={currentStory.comprehensionQuiz}
            onComplete={() => {}}
          />
        </div>
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
          <span>Lanjut ke Modul 5: Latihan Membaca Aktif</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
