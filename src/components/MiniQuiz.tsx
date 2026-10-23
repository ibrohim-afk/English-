import React, { useState } from 'react';
import { QuizQuestion } from '../types/recount';
import { calculateQuizScore, evaluatePerformance } from '../utils/logic';
import { markModuleCompleted, saveQuizResult } from '../utils/storage';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, HelpCircle } from 'lucide-react';

interface MiniQuizProps {
  moduleId: string;
  moduleTitle: string;
  questions: QuizQuestion[];
  onComplete?: () => void;
}

export const MiniQuiz: React.FC<MiniQuizProps> = ({
  moduleId,
  moduleTitle,
  questions,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];
  const isAnswered = selectedOption !== undefined;

  const handleSelectOption = (optIndex: number) => {
    if (showExplanation) return; // Prevent changing after confirmed
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(selectedAnswers[currentIndex + 1] !== undefined);
    } else {
      // Finish quiz
      let correct = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          correct++;
        }
      });
      const percentage = calculateQuizScore(correct, questions.length);

      saveQuizResult({
        moduleId,
        moduleTitle,
        score: correct,
        totalQuestions: questions.length,
        percentage,
        completedAt: new Date().toLocaleString('id-ID'),
        answers: selectedAnswers,
      });

      markModuleCompleted(moduleId);
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  if (isFinished) {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });
    const percentage = calculateQuizScore(correct, questions.length);
    const evalData = evaluatePerformance(percentage);

    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-1">
          Kuis Pemahaman Selesai!
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          {moduleTitle}
        </p>

        <div className="bg-slate-50 rounded-xl p-6 max-w-sm mx-auto mb-6 border border-slate-200">
          <div className="text-4xl font-extrabold text-indigo-600 mb-1 tabular-nums">
            {percentage}%
          </div>
          <div className="text-sm font-semibold text-slate-800 mb-1">
            {evalData.label}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {evalData.feedback}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-center gap-6 text-xs text-slate-600">
            <div>
              <span className="font-bold text-emerald-600">{correct}</span> Benar
            </div>
            <div>
              <span className="font-bold text-rose-600">{questions.length - correct}</span> Salah
            </div>
            <div>
              Total: <span className="font-bold">{questions.length}</span> Soal
            </div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Ulangi Kuis
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Kuis Pemahaman Cepat
          </span>
          <h4 className="text-lg font-bold text-slate-900">
            {moduleTitle}
          </h4>
        </div>
        <div className="text-xs font-medium text-slate-500">
          Soal <span className="font-bold text-indigo-600 tabular-nums">{currentIndex + 1}</span> dari <span className="tabular-nums">{questions.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-indigo-600 h-1.5 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        {currentQ.indicator && (
          <span className="text-xs font-medium text-slate-600 mb-2 block">
            Indikator: {currentQ.indicator}
          </span>
        )}
        <p className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
          {currentQ.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((option, optIdx) => {
          const isChosen = selectedOption === optIdx;
          const isCorrect = optIdx === currentQ.correctAnswer;
          let btnStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700';

          if (showExplanation) {
            if (isCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
            } else if (isChosen && !isCorrect) {
              btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
            } else {
              btnStyle = 'border-slate-200 text-slate-400 opacity-60';
            }
          } else if (isChosen) {
            btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium';
          }

          return (
            <button
              key={optIdx}
              onClick={() => handleSelectOption(optIdx)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {String.fromCharCode(65 + optIdx)}
              </span>
              <span className="flex-1 text-sm sm:text-base leading-relaxed">
                {option}
              </span>
              {showExplanation && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {showExplanation && isChosen && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Pembahasan / Penjelasan Guru:</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {showExplanation && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            {currentIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
