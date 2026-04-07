import { useState } from 'react';
import { Link } from 'react-router-dom';

const LEVELS = [
  {
    id: 'easy',
    label: 'Easy',
    emoji: '🟢',
    questions: 20,
    description: 'Basic recall and definitions. Test names, parameter counts, fasting rules, and what each test detects.',
    topics: ['CBC, LFT, KFT, Thyroid names & counts', 'Fasting requirements', 'What each test detects', 'Sample types'],
    color: 'green',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    btn: 'bg-green-600 hover:bg-green-700',
    bar: 'bg-green-500',
  },
  {
    id: 'medium',
    label: 'Medium',
    emoji: '🟡',
    questions: 20,
    description: 'Clinical application. Symptom-to-test mapping, interpreting single results, and understanding why tests work the way they do.',
    topics: ['Symptom → test mapping', 'Interpreting CBC, LFT, KFT results', 'Why fasting matters for specific tests', 'Understanding MCV, eGFR, ferritin'],
    color: 'yellow',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    btn: 'bg-yellow-500 hover:bg-yellow-600',
    bar: 'bg-yellow-400',
  },
  {
    id: 'hard',
    label: 'Hard',
    emoji: '🔴',
    questions: 20,
    description: 'Deep clinical reasoning. Nuanced interpretation, multi-test interactions, and real-world cases that challenge your expertise.',
    topics: ['Normal glucose + elevated HbA1c — how to explain', 'MCV + RDW pattern recognition', 'LFT cholestatic vs. hepatocellular patterns', 'Pre-renal vs. intrinsic kidney disease'],
    color: 'red',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    btn: 'bg-red-600 hover:bg-red-700',
    bar: 'bg-red-500',
  },
];

export default function MedicalQuizHub({ levelScores }) {
  const [timed, setTimed] = useState(false);
  const [spaced, setSpaced] = useState(false);

  const buildUrl = (levelId) => {
    const params = new URLSearchParams();
    if (timed) params.set('timed', '1');
    if (spaced) params.set('spaced', '1');
    const qs = params.toString();
    return `/quiz/medical/${levelId}${qs ? `?${qs}` : ''}`;
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-2">
        <Link to="/module/medical" className="text-xs text-blue-600 hover:underline">← Back to Medical Module</Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Medical & Product Knowledge</h1>
        <p className="text-gray-500 mt-1 text-sm">Quick Tests — Choose your difficulty level. 20 questions each.</p>
      </div>

      {/* Mode toggles */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTimed((t) => !t)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
            timed ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300 hover:border-orange-300'
          }`}
        >
          ⏱ Timed Mode {timed ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={() => setSpaced((s) => !s)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
            spaced ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
          }`}
        >
          🔁 Spaced Repetition {spaced ? 'ON' : 'OFF'}
        </button>
        {(timed || spaced) && (
          <div className="text-xs text-gray-500 flex items-center">
            {timed && '30s per question'}{timed && spaced && ' · '}{spaced && 'Missed questions prioritised'}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {LEVELS.map((level) => {
          const score = levelScores?.[level.id];
          const pct = score ? Math.round((score.correct / score.total) * 100) : null;

          return (
            <div key={level.id} className={`rounded-xl border p-6 ${level.bg} ${level.border}`}>
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-0.5">{level.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold text-gray-900">{level.label}</h2>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${level.badge}`}>
                      {level.questions} questions
                    </span>
                    {pct !== null && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${level.badge}`}>
                        Last score: {score.correct}/{score.total} ({pct}%)
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{level.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {level.topics.map((t) => (
                      <span key={t} className="text-xs bg-white bg-opacity-70 text-gray-600 px-2 py-1 rounded-lg border border-white">
                        {t}
                      </span>
                    ))}
                  </div>
                  {pct !== null && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Previous attempt</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full bg-white bg-opacity-60 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${level.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                  <Link
                    to={buildUrl(level.id)}
                    className={`inline-block text-white text-sm font-medium py-2 px-5 rounded-lg transition-colors ${level.btn}`}
                  >
                    {pct !== null ? 'Retry' : 'Start'} {level.label} Test →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-5">
        <div className="text-sm font-semibold text-gray-900 mb-2">💡 Recommended Order</div>
        <p className="text-sm text-gray-600">
          Start with <strong>Easy</strong> to lock in the fundamentals. Move to <strong>Medium</strong> once you can explain each test to a customer without notes.
          Only attempt <strong>Hard</strong> after completing the full Medical module — these questions require clinical reasoning at the level of a trained advisor.
        </p>
      </div>
    </div>
  );
}
