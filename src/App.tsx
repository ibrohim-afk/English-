import React, { useState, useEffect } from 'react';
import { ModuleId, StudentProfile, QuizResult } from './types/recount';
import {
  getStudentProfile,
  saveStudentProfile,
  getCompletedModules,
  getQuizResults,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { LearningMenu } from './components/LearningMenu';
import { DefinitionModule } from './components/DefinitionModule';
import { StructureModule } from './components/StructureModule';
import { LanguageModule } from './components/LanguageModule';
import { ExamplesModule } from './components/ExamplesModule';
import { ReadingModule } from './components/ReadingModule';
import { VocabularyLab } from './components/VocabularyLab';
import { SummaryModule } from './components/SummaryModule';
import { FinalQuizModule } from './components/FinalQuizModule';
import { ProfileModal } from './components/ProfileModal';
import { GraduationCap, Heart } from 'lucide-react';

export default function App() {
  const [currentModule, setCurrentModule] = useState<ModuleId>('home');
  const [profile, setProfile] = useState<StudentProfile>(getStudentProfile());
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Initialize and check for autostart URL query parameter
  useEffect(() => {
    setProfile(getStudentProfile());
    setCompletedModules(getCompletedModules());
    setQuizResults(getQuizResults());

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setCurrentModule('menu');
      }
    }
  }, []);

  const refreshProgress = () => {
    setCompletedModules(getCompletedModules());
    setQuizResults(getQuizResults());
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    saveStudentProfile(updated);
  };

  const handleNavigate = (target: ModuleId) => {
    refreshProgress();
    setCurrentModule(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate average score
  const quizScores = Object.values(quizResults).map((r) => r.percentage);
  const averageScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentModule={currentModule}
        onNavigate={handleNavigate}
        profile={profile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentModule === 'home' && (
          <HomeHero
            profile={profile}
            completedModules={completedModules}
            averageScore={averageScore}
            onNavigate={handleNavigate}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {currentModule === 'menu' && (
          <LearningMenu
            completedModules={completedModules}
            quizResults={quizResults}
            onSelectModule={handleNavigate}
          />
        )}

        {currentModule === 'definition' && (
          <DefinitionModule
            onBackToMenu={() => handleNavigate('menu')}
            onNextModule={() => handleNavigate('structure')}
          />
        )}

        {currentModule === 'structure' && (
          <StructureModule
            onBackToMenu={() => handleNavigate('menu')}
            onNextModule={() => handleNavigate('language')}
          />
        )}

        {currentModule === 'language' && (
          <LanguageModule
            onBackToMenu={() => handleNavigate('menu')}
            onNextModule={() => handleNavigate('examples')}
          />
        )}

        {currentModule === 'examples' && (
          <ExamplesModule
            onBackToMenu={() => handleNavigate('menu')}
            onNextModule={() => handleNavigate('reading')}
          />
        )}

        {currentModule === 'reading' && (
          <ReadingModule
            onBackToMenu={() => handleNavigate('menu')}
            onNextModule={() => handleNavigate('vocabulary')}
          />
        )}

        {currentModule === 'vocabulary' && (
          <VocabularyLab
            onBackToMenu={() => handleNavigate('menu')}
            onNextModule={() => handleNavigate('summary')}
          />
        )}

        {currentModule === 'summary' && (
          <SummaryModule
            onBackToMenu={() => handleNavigate('menu')}
            onGoToQuiz={() => handleNavigate('quiz')}
          />
        )}

        {currentModule === 'quiz' && (
          <FinalQuizModule
            profile={profile}
            onBackToMenu={() => handleNavigate('menu')}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Clean Academic Footer (Hidden on print) */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">RecountCraft</span>
            <span aria-hidden="true">·</span>
            <span>Media Pembelajaran Bahasa Inggris SMP Kelas 8</span>
          </div>

          <div className="text-center md:text-right">
            <span>Riset Skripsi Program Studi Pendidikan Bahasa Inggris</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Kurikulum SMP Fase D</span>
          </div>
        </div>
      </footer>

      {/* Profile Personalization Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
