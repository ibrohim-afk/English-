import React, { useState } from 'react';
import { FINAL_COMPREHENSIVE_QUIZ } from '../data/curriculumData';
import { StudentProfile } from '../types/recount';
import { calculateQuizScore, evaluatePerformance, formatResearchLogCSV } from '../utils/logic';
import {
  saveQuizResult,
  getQuizResults,
  getResearchLogs,
  markModuleCompleted,
} from '../utils/storage';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Printer,
  Download,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';

interface FinalQuizModuleProps {
  profile: StudentProfile;
  onBackToMenu: () => void;
  onOpenProfile: () => void;
}

export const FinalQuizModule: React.FC<FinalQuizModuleProps> = ({
  profile,
  onBackToMenu,
  onOpenProfile,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResearcherPanel, setShowResearcherPanel] = useState(false);

  const questions = FINAL_COMPREHENSIVE_QUIZ;
  const currentQ = questions[currentIdx];
  const selectedOpt = answers[currentIdx];

  // Calculate results
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (answers[idx] === q.correctAnswer) correctCount++;
  });
  const scorePercent = calculateQuizScore(correctCount, questions.length);
  const perfGrade = evaluatePerformance(scorePercent);

  const handleSelectOption = (optIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx,
    }));
  };

  const handleFinishQuiz = () => {
    saveQuizResult({
      moduleId: 'final_evaluation',
      moduleTitle: 'Post-Test Evaluasi Skripsi Recount Text',
      score: correctCount,
      totalQuestions: questions.length,
      percentage: scorePercent,
      completedAt: new Date().toLocaleString('id-ID'),
      answers,
    });
    markModuleCompleted('quiz');
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    const logs = getResearchLogs();
    const csvContent = formatResearchLogCSV(logs);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data_penelitian_skripsi_recount_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto print:p-0 print:space-y-4">
      {/* Top Bar (Hidden on Print) */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <button
          onClick={onBackToMenu}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          ← Kembali ke Menu Belajar
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResearcherPanel(!showResearcherPanel)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Mode Peneliti Skripsi
          </button>
        </div>
      </div>

      {/* RESEARCHER PANEL DRAWER (Hidden on print) */}
      {showResearcherPanel && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg print:hidden animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                Panel Mahasiswa Peneliti Skripsi (English Education Research)
              </div>
              <h3 className="text-lg font-bold">
                Log Data Penelitian & Responden Siswa
              </h3>
            </div>
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Unduh Data Responden (CSV / Excel)
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Data responden siswa yang menyelesaikan kuis dan post-test otomatis terekam di sini dan dapat diekspor langsung ke format CSV untuk analisis statistik skripsi (uji normalitas, t-test, dsb).
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 font-semibold uppercase">
                <tr>
                  <th className="py-2.5 px-3">Nama Siswa</th>
                  <th className="py-2.5 px-3">Kelas</th>
                  <th className="py-2.5 px-3">Sekolah</th>
                  <th className="py-2.5 px-3">Modul / Tes</th>
                  <th className="py-2.5 px-3 text-center">Nilai</th>
                  <th className="py-2.5 px-3">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {getResearchLogs().map((log, i) => (
                  <tr key={i} className="hover:bg-slate-800/50">
                    <td className="py-2.5 px-3 font-semibold text-white">{log.studentName}</td>
                    <td className="py-2.5 px-3">{log.studentClass}</td>
                    <td className="py-2.5 px-3">{log.school}</td>
                    <td className="py-2.5 px-3">{log.moduleName}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-amber-400 tabular-nums">
                      {log.score}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[11px]">{log.completedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUIZ INTERFACE (BEFORE SUBMIT) */}
      {!isSubmitted ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                <Award className="w-4 h-4" />
                <span>Post-Test Evaluasi Skripsi</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Kuis Evaluasi Menyeluruh Recount Text
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Mencakup fungsi sosial, generic structure, simple past tense, dan reading comprehension
              </p>
            </div>

            {/* Student info chip */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 block font-medium">Responden:</span>
              <span className="font-bold text-slate-800">{profile.name}</span>{' '}
              <span className="text-slate-500">({profile.grade} · {profile.school})</span>
            </div>
          </div>

          {/* Question Stepper */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-xs font-semibold text-slate-600">
              Soal ke <span className="font-bold text-indigo-600 tabular-nums">{currentIdx + 1}</span> dari <span className="tabular-nums">{questions.length}</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Terjawab: {Object.keys(answers).length} / {questions.length}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Active Question Box */}
          <div className="mb-8">
            <div className="text-xs font-bold text-indigo-600 mb-2">
              Indikator Soal: {currentQ.indicator}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((opt, optIndex) => {
              const isSelected = selectedOpt === optIndex;
              return (
                <button
                  key={optIndex}
                  onClick={() => handleSelectOption(optIndex)}
                  className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base flex items-start gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/90 border-indigo-600 text-indigo-950 font-semibold shadow-xs ring-1 ring-indigo-500'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-800'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-300 text-slate-600 bg-slate-50'
                    }`}
                  >
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              ← Soal Sebelumnya
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx((prev) => prev + 1)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs transition-colors"
              >
                <span>Soal Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                disabled={Object.keys(answers).length < questions.length}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kumpulkan & Lihat Hasil Evaluasi</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* AFTER SUBMISSION: SCORECARD + OFFICIAL THESIS CERTIFICATE */
        <div className="space-y-8">
          {/* Action Header (Hidden on print) */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 print:hidden">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase">
                Hasil Evaluasi Berhasil Dicatat
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Lembar Hasil Belajar & Sertifikat Resmi
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintCertificate}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak Sertifikat Siswa
              </button>
              <button
                onClick={handleRetake}
                className="inline-flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Ulangi Tes
              </button>
            </div>
          </div>

          {/* OFFICIAL CERTIFICATE CARD (Printable) */}
          <div className="bg-white rounded-3xl border-4 border-indigo-900/80 p-8 sm:p-12 shadow-md relative overflow-hidden print:border-2 print:border-black print:p-6">
            {/* Background watermark badge */}
            <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
              <GraduationCap className="w-64 h-64 text-indigo-950" />
            </div>

            {/* Certificate Header */}
            <div className="text-center mb-8 border-b-2 border-indigo-950/20 pb-6">
              <div className="flex items-center justify-center gap-2 text-indigo-700 mb-2">
                <GraduationCap className="w-7 h-7" />
                <span className="text-xs font-extrabold uppercase tracking-widest">
                  Media Riset Pembelajaran Skripsi Pendidikan Bahasa Inggris
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                CERTIFICATE OF ACHIEVEMENT
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Sertifikat Hasil Belajar Materi Recount Text SMP Kelas 8
              </p>
            </div>

            {/* Recipient Details */}
            <div className="text-center my-6 space-y-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Diberikan kepada siswa:
              </span>
              <div className="text-2xl sm:text-4xl font-black text-indigo-950 underline decoration-indigo-300 decoration-2 underline-offset-8">
                {profile.name}
              </div>
              <div className="text-sm font-semibold text-slate-600 pt-2">
                Kelas: {profile.grade} · Asal Sekolah: {profile.school}
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="max-w-md mx-auto my-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Nilai Akhir Post-Test:
              </div>
              <div className="text-5xl font-black text-indigo-700 mb-1 tabular-nums">
                {scorePercent}
                <span className="text-xl font-bold text-slate-400">/100</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mb-1">
                Kategori: {perfGrade.label}
              </div>
              <div className="text-xs text-slate-600">
                Menjawab benar <strong>{correctCount}</strong> dari <strong>{questions.length}</strong> butir soal
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full ${
                    perfGrade.passed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {perfGrade.passed
                    ? 'TUNTAS KRITERIA KETUNTASAN MINIMAL (KKM >= 75)'
                    : 'PERLU PENGAYAAN / REMIDIAL (BELUM TUNTAS KKM)'}
                </span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200 text-center text-xs">
              <div>
                <div className="text-slate-400 mb-8">Tanggal Pelaksanaan:</div>
                <div className="font-bold text-slate-900 border-t border-slate-400 pt-1 max-w-[180px] mx-auto">
                  {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <div className="text-[11px] text-slate-500">Waktu Evaluasi</div>
              </div>

              <div>
                <div className="text-slate-400 mb-8">Peneliti / Pengajar:</div>
                <div className="font-bold text-slate-900 border-t border-slate-400 pt-1 max-w-[180px] mx-auto">
                  Peneliti Skripsi Pend. Bahasa Inggris
                </div>
                <div className="text-[11px] text-slate-500">Universitas / Tim Peneliti</div>
              </div>
            </div>
          </div>

          {/* DETAILED QUESTION-BY-QUESTION REVIEW (Hidden on print) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs print:hidden">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Pembahasan Lengkap Tiap Butir Soal
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Pelajari alasan dan pembahasan setiap soal untuk memperkuat pemahamanmu
            </p>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userChoice = answers[idx];
                const isCorrect = userChoice === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border ${
                      isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-500">
                        Soal {idx + 1} · {q.indicator}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? 'BENAR' : 'SALAH'}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-slate-900 mb-3">
                      {q.question}
                    </p>

                    <div className="text-xs space-y-1 mb-3">
                      <div>
                        Jawabanmu:{' '}
                        <span
                          className={`font-bold ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {userChoice !== undefined
                            ? q.options[userChoice]
                            : '(Tidak dijawab)'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-700 font-bold">
                          Kunci Jawaban yang Benar: {q.options[q.correctAnswer]}
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                      💡 <strong>Pembahasan Pedagogis:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
