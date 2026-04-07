import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { QUIZZES, MEDICAL_LEVELS } from '../data/quiz';

const TIMER_SECONDS = 30;

const levelConfig = {
  easy:   { label: 'Easy',   emoji: '🟢', accent: 'bg-green-600',  light: 'bg-green-50 border-green-200',   text: 'text-green-700',  color: 'green' },
  medium: { label: 'Medium', emoji: '🟡', accent: 'bg-yellow-500', light: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', color: 'yellow' },
  hard:   { label: 'Hard',   emoji: '🔴', accent: 'bg-red-600',    light: 'bg-red-50 border-red-200',       text: 'text-red-700',    color: 'red' },
};

const moduleConfig = {
  medical: { label: 'Medical & Product Knowledge', color: 'blue', accent: 'bg-blue-600', light: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
  sales:   { label: 'Sales & Persuasion Skills',   color: 'purple', accent: 'bg-purple-600', light: 'bg-purple-50 border-purple-200', text: 'text-purple-700' },
  package: { label: 'Preventive Complete Check',   color: 'green', accent: 'bg-green-600', light: 'bg-green-50 border-green-200', text: 'text-green-700' },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Spaced repetition: load/save wrong-answer weights from localStorage
function loadWeights(key) {
  try { return JSON.parse(localStorage.getItem(`lp_sr_${key}`) || '{}'); } catch { return {}; }
}
function saveWeights(key, weights) {
  localStorage.setItem(`lp_sr_${key}`, JSON.stringify(weights));
}
function weightedShuffle(questions, weights) {
  // Give wrong-answer questions extra copies (up to 3×) in the shuffled pool
  const pool = [];
  questions.forEach((q) => {
    const w = weights[q.q] || 1;
    for (let i = 0; i < Math.min(w, 3); i++) pool.push(q);
  });
  return shuffle(pool).slice(0, questions.length);
}

export default function QuizPage({ onQuizComplete, onProgress }) {
  const { moduleId, level } = useParams();
  const [searchParams] = useSearchParams();
  const timed = searchParams.get('timed') === '1';
  const spaced = searchParams.get('spaced') === '1';

  // Tiered medical quiz
  const isTiered = moduleId === 'medical' && level && MEDICAL_LEVELS[level];
  const baseQuestions = isTiered ? MEDICAL_LEVELS[level] : (QUIZZES[moduleId] || []);

  const lvlCfg = isTiered ? levelConfig[level] : null;
  const cfg = lvlCfg
    ? { ...moduleConfig.medical, ...lvlCfg, label: `Medical Knowledge — ${lvlCfg.label}` }
    : (moduleConfig[moduleId] || moduleConfig.medical);

  const scoreKey = isTiered ? `medical_${level}` : moduleId;
  const backLink = isTiered ? '/quiz/medical' : `/module/${moduleId}`;

  // Build question list (spaced repetition weights if enabled)
  const weights = spaced ? loadWeights(scoreKey) : {};
  const [questions] = useState(() => spaced ? weightedShuffle(baseQuestions, weights) : shuffle(baseQuestions));

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef(null);

  const q = questions[current];

  const handleTimeout = useCallback(() => {
    if (answered) return;
    setTimedOut(true);
    setAnswered(true);
    setAnswers((prev) => [...prev, { correct: false, selected: -1, answer: q?.answer }]);
    // Update spaced weight — timed out = wrong
    if (spaced && q) {
      const newW = { ...loadWeights(scoreKey), [q.q]: (weights[q.q] || 1) + 1 };
      saveWeights(scoreKey, newW);
    }
  }, [answered, q, spaced, scoreKey, weights]);

  // Timer
  useEffect(() => {
    if (!timed || answered || done) return;
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, timed, done, answered, handleTimeout]);

  const handleSelect = (idx) => {
    if (answered) return;
    clearInterval(timerRef.current);
    setSelected(idx);
    setAnswered(true);
    setTimedOut(false);
    const correct = idx === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { correct, selected: idx, answer: q.answer }]);

    // Update spaced repetition weights
    if (spaced) {
      const currentWeights = loadWeights(scoreKey);
      const newW = { ...currentWeights };
      if (!correct) newW[q.q] = (newW[q.q] || 1) + 1;
      else if (newW[q.q] > 1) newW[q.q] = Math.max(1, newW[q.q] - 1);
      saveWeights(scoreKey, newW);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      onQuizComplete(scoreKey, { correct: score, total: questions.length });
      if (!isTiered) onProgress(moduleId, 100);
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimedOut(false);
    }
  };

  const finalCorrect = answers.filter((a) => a.correct).length;
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timerPct > 50 ? 'bg-green-500' : timerPct > 25 ? 'bg-yellow-400' : 'bg-red-500';

  if (done) {
    const pct = Math.round((finalCorrect / questions.length) * 100);
    const modeTag = [timed && '⏱ Timed', spaced && '🔁 Spaced'].filter(Boolean).join(' · ');
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">{pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Quiz Complete!</h2>
          <p className="text-gray-500 mb-1 text-sm">{cfg.label}</p>
          {modeTag && <p className="text-xs text-gray-400 mb-5">{modeTag}</p>}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-1">{finalCorrect}/{questions.length}</div>
            <div className="text-gray-500 text-sm">{pct}% correct</div>
            <div className="mt-4 text-sm">
              {pct >= 80 ? <span className="text-green-600 font-medium">Excellent! You're ready to sell with confidence.</span>
               : pct >= 60 ? <span className="text-yellow-600 font-medium">Good effort! Keep drilling the weak spots.</span>
               : <span className="text-red-600 font-medium">Review the module content and retry.</span>}
            </div>
            {spaced && <p className="text-xs text-blue-600 mt-3">Spaced repetition weights updated — wrong answers will appear more often next time.</p>}
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            <Link to={backLink} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              {isTiered ? 'Choose Level' : 'Review Module'}
            </Link>
            <button
              onClick={() => { window.location.reload(); }}
              className={`px-4 py-2 text-white rounded-lg text-sm font-medium ${cfg.accent} hover:opacity-90`}
            >
              Retry
            </button>
            <Link to="/" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-xl w-full">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-3">
          <div className="text-xs text-gray-500 flex-shrink-0">{cfg.label}</div>
          {timed && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">⏱ Timed</span>}
          {spaced && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">🔁 Spaced</span>}
          <div className="flex-1 bg-gray-200 rounded-full h-1.5 ml-auto">
            <div className={`h-1.5 rounded-full ${cfg.accent}`} style={{ width: `${(current / questions.length) * 100}%` }} />
          </div>
          <div className="text-xs text-gray-500 flex-shrink-0">{current + 1}/{questions.length}</div>
        </div>

        {/* Timer bar */}
        {timed && !answered && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Time remaining</span>
              <span className={timeLeft <= 10 ? 'text-red-500 font-bold' : ''}>{timeLeft}s</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${timerColor}`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Question */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${cfg.text}`}>Question {current + 1}</div>
          <p className="text-gray-900 font-medium text-base leading-relaxed">{q.q}</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2 mb-4">
          {q.options.map((opt, i) => {
            let cls = 'border-gray-200 bg-white text-gray-800 hover:border-gray-400';
            if (answered || timedOut) {
              if (i === q.answer) cls = 'border-green-500 bg-green-50 text-green-800';
              else if (i === selected && i !== q.answer) cls = 'border-red-400 bg-red-50 text-red-700';
              else cls = 'border-gray-100 bg-gray-50 text-gray-400';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered || timedOut}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${cls} ${(answered || timedOut) ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
              </button>
            );
          })}
        </div>

        {/* Timed out message */}
        {timedOut && !selected && (
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 mb-4">
            <div className="text-xs font-semibold text-orange-700 uppercase tracking-wider mb-1">⏱ Time's up!</div>
            <p className="text-sm text-gray-800">The correct answer was <strong>{q.options[q.answer]}</strong>.</p>
          </div>
        )}

        {/* Explanation */}
        {(answered || timedOut) && (
          <div className={`rounded-xl border p-4 mb-4 ${cfg.light}`}>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${cfg.text}`}>
              {!timedOut && selected === q.answer ? '✓ Correct' : timedOut ? 'Timed out' : '✗ Incorrect'} — Explanation
            </div>
            <p className="text-sm text-gray-800">{q.explanation}</p>
          </div>
        )}

        {(answered || timedOut) && (
          <button onClick={handleNext} className={`w-full py-3 text-white font-medium rounded-xl ${cfg.accent} hover:opacity-90 transition-opacity`}>
            {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
