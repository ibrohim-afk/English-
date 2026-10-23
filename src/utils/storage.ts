import { StudentProfile, QuizResult } from '../types/recount';

const STORAGE_KEYS = {
  PROFILE: 'recountcraft_student_profile',
  COMPLETED_MODULES: 'recountcraft_completed_modules',
  QUIZ_RESULTS: 'recountcraft_quiz_results',
  RESEARCH_LOGS: 'recountcraft_research_logs',
};

export const defaultProfile: StudentProfile = {
  name: 'Budi Santoso',
  grade: 'VIII-A',
  school: 'SMP Negeri 1 Cerdas',
  avatarId: 1,
};

export function getStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load profile', e);
  }
  return defaultProfile;
}

export function saveStudentProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function getCompletedModules(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_MODULES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load completed modules', e);
  }
  return [];
}

export function markModuleCompleted(moduleId: string): void {
  try {
    const list = getCompletedModules();
    if (!list.includes(moduleId)) {
      list.push(moduleId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(list));
    }
  } catch (e) {
    console.error('Failed to mark module completed', e);
  }
}

export function getQuizResults(): Record<string, QuizResult> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load quiz results', e);
  }
  return {};
}

export function saveQuizResult(result: QuizResult): void {
  try {
    const existing = getQuizResults();
    existing[result.moduleId] = result;
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(existing));

    // Also append to research logs
    const profile = getStudentProfile();
    const logs = getResearchLogs();
    logs.push({
      studentName: profile.name,
      studentClass: profile.grade,
      school: profile.school,
      moduleName: result.moduleTitle,
      score: result.percentage,
      completedAt: result.completedAt,
    });
    localStorage.setItem(STORAGE_KEYS.RESEARCH_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to save quiz result', e);
  }
}

export interface ResearchRecord {
  studentName: string;
  studentClass: string;
  school: string;
  moduleName: string;
  score: number;
  completedAt: string;
}

export function getResearchLogs(): ResearchRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESEARCH_LOGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load research logs', e);
  }
  // Initial sample data for demonstration in thesis defense
  return [
    {
      studentName: 'Ahmad Fauzi',
      studentClass: 'VIII-A',
      school: 'SMP Negeri 1 Cerdas',
      moduleName: 'Final Evaluation (Post-Test)',
      score: 90,
      completedAt: '2026-10-21 09:30',
    },
    {
      studentName: 'Siti Rahma',
      studentClass: 'VIII-A',
      school: 'SMP Negeri 1 Cerdas',
      moduleName: 'Final Evaluation (Post-Test)',
      score: 80,
      completedAt: '2026-10-21 09:35',
    },
    {
      studentName: 'Rian Pratama',
      studentClass: 'VIII-B',
      school: 'SMP Negeri 1 Cerdas',
      moduleName: 'Final Evaluation (Post-Test)',
      score: 85,
      completedAt: '2026-10-21 10:15',
    },
  ];
}
