import { Link } from 'react-router-dom';
import { MODULES } from '../data/modules';

const colorMap = {
  blue: { card: 'border-blue-200 bg-blue-50', badge: 'bg-blue-100 text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700' },
  purple: { card: 'border-purple-200 bg-purple-50', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700' },
  green: { card: 'border-green-200 bg-green-50', badge: 'bg-green-100 text-green-700', btn: 'bg-green-600 hover:bg-green-700' },
};

export default function Dashboard({ progress, quizScores }) {
  const totalModules = MODULES.length;
  const completedModules = MODULES.filter((m) => (progress[m.id] || 0) >= 100).length;
  const overallPct = Math.round(
    MODULES.reduce((acc, m) => acc + (progress[m.id] || 0), 0) / totalModules
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to LabsPitch Training</h1>
        <p className="text-gray-500 mt-1">Truemeds Diagnostics — Agent Learning & Development Program</p>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold text-gray-900">Overall Progress</div>
            <div className="text-sm text-gray-500">{completedModules} of {totalModules} modules complete</div>
          </div>
          <div className="text-3xl font-bold text-green-600">{overallPct}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full transition-all" style={{ width: `${overallPct}%` }} />
        </div>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {MODULES.map((m) => {
          const pct = progress[m.id] || 0;
          const score = quizScores[m.id];
          const c = colorMap[m.color];
          return (
            <div key={m.id} className={`rounded-xl border p-5 flex flex-col gap-3 ${c.card}`}>
              <div className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${c.badge}`}>{m.icon}</span>
                <span className="font-semibold text-gray-900 text-sm">{m.title}</span>
              </div>
              <p className="text-xs text-gray-600">{m.description}</p>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span><span>{pct}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-60 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${pct}%`, background: pct === 100 ? '#22c55e' : '#6366f1' }} />
                </div>
              </div>
              {score !== undefined && (
                <div className="text-xs text-gray-600">
                  Quiz score: <span className="font-semibold">{score.correct}/{score.total}</span>
                </div>
              )}
              <Link
                to={`/module/${m.id}`}
                className={`mt-auto text-center text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors ${c.btn}`}
              >
                {pct === 0 ? 'Start' : pct === 100 ? 'Review' : 'Continue'}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Medical Deep-Dives */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Medical Deep-Dives</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/parameters" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-red-300 hover:shadow-sm transition-all group">
            <div className="text-2xl mb-2">🔬</div>
            <div className="font-semibold text-gray-900 text-sm group-hover:text-red-700">Parameter Library</div>
            <div className="text-xs text-gray-500 mt-1">30 key tests — ranges, meanings, customer scripts</div>
          </Link>
          <Link to="/conditions" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-sm transition-all group">
            <div className="text-2xl mb-2">🏥</div>
            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-700">Conditions</div>
            <div className="text-xs text-gray-500 mt-1">6 common conditions — causes, tests & pitch angles</div>
          </Link>
          <Link to="/flashcards" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group">
            <div className="text-2xl mb-2">🃏</div>
            <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700">Flashcards</div>
            <div className="text-xs text-gray-500 mt-1">Flip-card revision for packages and parameters</div>
          </Link>
          <Link to="/symptoms" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-cyan-300 hover:shadow-sm transition-all group">
            <div className="text-2xl mb-2">🩺</div>
            <div className="font-semibold text-gray-900 text-sm group-hover:text-cyan-700">Symptom Drill</div>
            <div className="text-xs text-gray-500 mt-1">Match patient symptoms to the right tests — scored</div>
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/practice" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition-colors">
          <div className="text-xl mb-2">🤖</div>
          <div className="font-semibold text-gray-900 text-sm">AI Practice Partner</div>
          <div className="text-xs text-gray-500 mt-1">Roleplay sales scenarios with a simulated customer</div>
        </Link>
        <Link to="/reference" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-yellow-300 transition-colors">
          <div className="text-xl mb-2">📋</div>
          <div className="font-semibold text-gray-900 text-sm">Quick Reference</div>
          <div className="text-xs text-gray-500 mt-1">Cheat sheet — tests, prep requirements, pitch angles</div>
        </Link>
      </div>
    </div>
  );
}
