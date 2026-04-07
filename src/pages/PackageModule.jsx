import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPREHENSIVE_PACKAGE } from '../data/package';

export default function PackageModule({ onProgress }) {
  const [selected, setSelected] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const [showParams, setShowParams] = useState(false);

  const groups = COMPREHENSIVE_PACKAGE.groups;
  const group = groups[selected];
  const pct = Math.round((visited.size / groups.length) * 80);

  const goTo = (idx) => {
    setSelected(idx);
    setShowParams(false);
    const newVisited = new Set([...visited, idx]);
    setVisited(newVisited);
    onProgress('package', Math.round((newVisited.size / groups.length) * 80));
  };

  return (
    <div className="flex flex-1">
      {/* Test group list */}
      <div className="w-64 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="font-semibold text-gray-900 text-sm">{COMPREHENSIVE_PACKAGE.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">₹{COMPREHENSIVE_PACKAGE.price.toLocaleString()} · {COMPREHENSIVE_PACKAGE.totalTests} tests</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {groups.map((g, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 mb-0.5 ${
                selected === i ? 'bg-green-50 text-green-800 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-base flex-shrink-0">{g.icon}</span>
              <div className="min-w-0">
                <div className="truncate text-xs font-medium">{g.name}</div>
                <div className="text-xs text-gray-400">{g.count} parameter{g.count > 1 ? 's' : ''}</div>
              </div>
              {visited.has(i) && <span className="ml-auto text-green-500 text-xs flex-shrink-0">✓</span>}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1">{pct}% explored</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <Link to="/quiz/package" className="block text-center bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-green-700 transition-colors">
            Take Quiz →
          </Link>
        </div>
      </div>

      {/* Group detail */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-2">
            Preventive Complete Check · Group {selected + 1} of {groups.length}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{group.icon}</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{group.name}</h1>
              <span className="text-sm text-gray-500">{group.count} parameter{group.count > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">What it measures</div>
              <p className="text-sm text-gray-800">{group.what}</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">What it detects</div>
              <p className="text-sm text-gray-800">{group.detects}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <div className="text-xs font-semibold text-yellow-700 uppercase tracking-wider mb-2">Preparation</div>
              <p className="text-sm text-gray-800">{group.prep}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Turnaround</div>
              <p className="text-sm text-gray-800">{group.turnaround}</p>
            </div>
          </div>

          {/* Pitch angle */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">💬 Pitch Angle</div>
            <p className="text-sm text-gray-900 leading-relaxed">"{group.pitchAngle}"</p>
          </div>

          {/* Parameters toggle */}
          <button
            onClick={() => setShowParams(!showParams)}
            className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1 mb-4"
          >
            {showParams ? '▾' : '▸'} {group.count} Parameters {showParams ? '(hide)' : '(show all)'}
          </button>
          {showParams && (
            <div className="grid grid-cols-2 gap-2 mb-6">
              {group.parameters.map((p, i) => (
                <div key={i} className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700">
                  {i + 1}. {p}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-4">
            {selected > 0 && (
              <button onClick={() => goTo(selected - 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                ← Previous
              </button>
            )}
            {selected < groups.length - 1 ? (
              <button onClick={() => goTo(selected + 1)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 ml-auto">
                Next Group →
              </button>
            ) : (
              <Link to="/quiz/package" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 ml-auto">
                Take the Quiz →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
