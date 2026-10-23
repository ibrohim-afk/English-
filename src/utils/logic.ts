import { SequencingEvent } from '../types/recount';

export interface PerformanceGrade {
  grade: 'A' | 'B' | 'C' | 'D';
  label: string;
  feedback: string;
  passed: boolean;
}

/**
 * Calculates score percentage rounded to nearest integer
 */
export function calculateQuizScore(correctCount: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

/**
 * Evaluates student score against Grade 8 English standard (KKM: 75)
 */
export function evaluatePerformance(score: number): PerformanceGrade {
  if (score >= 88) {
    return {
      grade: 'A',
      label: 'Sangat Memuaskan (Excellent)',
      feedback: 'Luar biasa! Kamu memahami materi Recount Text dengan sangat mendalam.',
      passed: true,
    };
  }
  if (score >= 75) {
    return {
      grade: 'B',
      label: 'Baik (Good - Tuntas KKM)',
      feedback: 'Bagus sekali! Kamu sudah mencapai kriteria ketuntasan minimal (KKM).',
      passed: true,
    };
  }
  if (score >= 60) {
    return {
      grade: 'C',
      label: 'Cukup (Fair)',
      feedback: 'Cukup baik, pelajari lagi bagian Unsur Kebahasaan dan Struktur Teks ya.',
      passed: false,
    };
  }
  return {
    grade: 'D',
    label: 'Perlu Bimbingan (Needs Improvement)',
    feedback: 'Tetap semangat! Ulangi membaca materi dan contoh cerita untuk memperkuat pemahaman.',
    passed: false,
  };
}

/**
 * Validates whether user-ordered chronological events match the correct sequential order (1, 2, 3...)
 */
export function verifyEventSequence(currentList: SequencingEvent[]): {
  isCorrect: boolean;
  correctPositionsCount: number;
} {
  let correctCount = 0;
  for (let i = 0; i < currentList.length; i++) {
    if (currentList[i].order === i + 1) {
      correctCount++;
    }
  }
  return {
    isCorrect: correctCount === currentList.length,
    correctPositionsCount: correctCount,
  };
}

/**
 * Determines whether a given verb is regular or irregular
 */
export function classifyVerb(v1: string, v2: string): 'regular' | 'irregular' {
  const cleanV1 = v1.trim().toLowerCase();
  const cleanV2 = v2.trim().toLowerCase();
  
  if (cleanV2.endsWith('ed') || (cleanV1.endsWith('e') && cleanV2.endsWith('d'))) {
    // Check common deceptive irregulars like bleed -> bled or feed -> fed
    const deceptiveIrregulars = ['bled', 'fed', 'led', 'bred', 'sped'];
    if (deceptiveIrregulars.includes(cleanV2)) return 'irregular';
    return 'regular';
  }
  return 'irregular';
}

/**
 * Formats research assessment data to CSV for Skripsi analysis
 */
export function formatResearchLogCSV(
  records: Array<{
    studentName: string;
    studentClass: string;
    school: string;
    moduleName: string;
    score: number;
    completedAt: string;
  }>
): string {
  const headers = ['No', 'Nama Siswa', 'Kelas', 'Sekolah', 'Modul / Tes', 'Nilai (0-100)', 'Kategori', 'Waktu Pengerjaan'];
  const rows = records.map((r, index) => {
    const perf = evaluatePerformance(r.score);
    return [
      index + 1,
      `"${r.studentName.replace(/"/g, '""')}"`,
      `"${r.studentClass.replace(/"/g, '""')}"`,
      `"${r.school.replace(/"/g, '""')}"`,
      `"${r.moduleName.replace(/"/g, '""')}"`,
      r.score,
      `"${perf.label}"`,
      `"${r.completedAt}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
