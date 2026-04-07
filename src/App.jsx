import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MedicalModule from './pages/MedicalModule';
import SalesModule from './pages/SalesModule';
import PackageModule from './pages/PackageModule';
import QuizPage from './pages/QuizPage';
import MedicalQuizHub from './pages/MedicalQuizHub';
import PracticePage from './pages/PracticePage';
import ReferencePage from './pages/ReferencePage';
import ParameterLibrary from './pages/ParameterLibrary';
import ConditionsModule from './pages/ConditionsModule';
import FlashcardPage from './pages/FlashcardPage';
import SymptomDrill from './pages/SymptomDrill';

function ModuleRouter({ progress, onProgress }) {
  const { moduleId } = useParams();
  if (moduleId === 'medical') return <MedicalModule onProgress={onProgress} />;
  if (moduleId === 'sales') return <SalesModule onProgress={onProgress} />;
  if (moduleId === 'package') return <PackageModule onProgress={onProgress} />;
  return <div className="p-8 text-gray-500">Module not found.</div>;
}

export default function App() {
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lp_progress') || '{}'); } catch { return {}; }
  });
  const [quizScores, setQuizScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lp_quiz_scores') || '{}'); } catch { return {}; }
  });

  const updateProgress = (moduleId, pct) => {
    setProgress((prev) => {
      const updated = { ...prev, [moduleId]: Math.max(prev[moduleId] || 0, pct) };
      localStorage.setItem('lp_progress', JSON.stringify(updated));
      return updated;
    });
  };

  const handleQuizComplete = (moduleId, score) => {
    setQuizScores((prev) => {
      const updated = { ...prev, [moduleId]: score };
      localStorage.setItem('lp_quiz_scores', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar progress={progress} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard progress={progress} quizScores={quizScores} />} />
            <Route path="/module/:moduleId" element={<ModuleRouter progress={progress} onProgress={updateProgress} />} />
            {/* Medical tiered quick tests */}
            <Route path="/quiz/medical" element={<MedicalQuizHub levelScores={quizScores} />} />
            <Route path="/quiz/:moduleId/:level" element={<QuizPage onQuizComplete={handleQuizComplete} onProgress={updateProgress} />} />
            {/* Standard module quizzes */}
            <Route path="/quiz/:moduleId" element={<QuizPage onQuizComplete={handleQuizComplete} onProgress={updateProgress} />} />
            {/* Medical deep-dive tools */}
            <Route path="/parameters" element={<ParameterLibrary />} />
            <Route path="/conditions" element={<ConditionsModule onProgress={updateProgress} />} />
            <Route path="/flashcards" element={<FlashcardPage />} />
            <Route path="/symptoms" element={<SymptomDrill />} />
            {/* Practice & Reference */}
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/reference" element={<ReferencePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
