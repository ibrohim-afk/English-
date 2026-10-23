export type ModuleId =
  | 'home'
  | 'menu'
  | 'definition'
  | 'structure'
  | 'language'
  | 'examples'
  | 'reading'
  | 'vocabulary'
  | 'summary'
  | 'quiz';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  indicator?: string; // e.g. "Mengidentifikasi Struktur", "Menggunakan Simple Past Tense"
}

export interface QuizResult {
  moduleId: string;
  moduleTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  answers: Record<number, number>; // questionIndex -> chosenOptionIndex
}

export interface StudentProfile {
  name: string;
  grade: string; // e.g. "VIII-B"
  school: string; // e.g. "SMP Negeri 1"
  avatarId: number;
}

export interface VocabularyWord {
  id: string;
  v1: string;
  v2: string;
  v3: string;
  category: 'regular' | 'irregular' | 'connector' | 'adverb';
  indonesian: string;
  pronunciation: string;
  exampleSentence: string;
  exampleTranslation: string;
}

export interface StoryParagraph {
  text: string;
  part: 'orientation' | 'event' | 'reorientation';
  highlightPastVerbs?: string[];
  highlightConnectors?: string[];
}

export interface StoryItem {
  id: string;
  title: string;
  type: string;
  image: string;
  audioKey: string;
  paragraphs: StoryParagraph[];
  comprehensionQuiz: QuizQuestion[];
  moralOrReflection: string;
}

export interface SequencingEvent {
  id: number;
  text: string;
  order: number;
}
