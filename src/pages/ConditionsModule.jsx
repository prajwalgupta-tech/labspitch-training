import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONDITIONS } from '../data/conditions';

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',   accent: 'text-blue-600',  bar: 'bg-blue-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', accent: 'text-purple-600', bar: 'bg-purple-500' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', accent: 'text-orange-600', bar: 'bg-orange-500' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-700',    accent: 'text-red-600',   bar: 'bg-red-500' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',  accent: 'text-green-600',  bar: 'bg-green-500' },
};

function ConditionDetail({ condition, onBack }) {
  const [tab, setTab] = useState('overview');
  const c = colorMap[condition.color] || colorMap.blue;

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="text-xs text-blue-600 hover:underline mb-4 block">
        ← Back to conditions
      </button>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{condition.icon}</span>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{condition.name}</h1>
          <p className={`text-xs font-semibold mt-0.5 ${c.accent}`}>{condition.prevalence}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5 gap-1 overflow-x-auto">
        {['overview', 'tests', 'warnings', 'pitch'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-xs font-semibold whitespace-nowrap capitalize transition-colors ${
              tab === t ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'overview' ? '📖 How it works' : t === 'tests' ? '🔬 Tests & why' : t === 'warnings' ? '⚠️ Early signs' : '💬 Customer pitch'}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">What happens in the body</div>
            <p className="text-sm text-gray-700 leading-relaxed">{condition.whatHappens}</p>
          </div>
          <div className={`rounded-xl border p-5 ${c.bg} ${c.border}`}>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${c.accent}`}>Silent period</div>
            <p className="text-sm text-gray-800">{condition.silentPeriod}</p>
          </div>
        </div>
      )}

      {tab === 'tests' && (
        <div className="flex flex-col gap-3">
          {condition.tests.map((t) => (
            <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="font-semibold text-gray-900 text-sm mb-2">🔬 {t.name}</div>
              <p className="text-sm text-gray-700 mb-3">{t.why}</p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800">
                <span className="font-semibold">Early flag:</span> {t.earlyFlag}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'warnings' && (
        <div className="flex flex-col gap-3">
          {Array.isArray(condition.earlyWarnings) ? (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Signs to listen for on calls</div>
              <div className="flex flex-col gap-2">
                {condition.earlyWarnings.map((w) => (
                  <div key={w} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-amber-500">⚠</span> {w}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            Object.entries(condition.earlyWarnings).map(([label, signs]) => (
              <div key={label} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{label}</div>
                <div className="flex flex-col gap-2">
                  {signs.map((w) => (
                    <div key={w} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-amber-500">⚠</span> {w}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Agent tip</div>
            <p className="text-sm text-gray-700">{condition.agentNote}</p>
          </div>
        </div>
      )}

      {tab === 'pitch' && (
        <div className="flex flex-col gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">💬 What to say to the customer</div>
            <p className="text-sm text-gray-900 leading-relaxed">{condition.customerPitch}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">🎯 Agent note</div>
            <p className="text-sm text-gray-700">{condition.agentNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConditionsModule({ onProgress }) {
  const [selected, setSelected] = useState(null);
  const [visited, setVisited] = useState(new Set());

  const select = (c) => {
    setSelected(c);
    const nv = new Set([...visited, c.id]);
    setVisited(nv);
    onProgress('conditions', Math.round((nv.size / CONDITIONS.length) * 100));
  };

  if (selected) {
    return (
      <div className="flex-1 p-8 overflow-y-auto">
        <ConditionDetail condition={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Medical & Product Knowledge</div>
          <h1 className="text-xl font-bold text-gray-900">Disease & Condition Lessons</h1>
          <p className="text-sm text-gray-500 mt-1">Understand the conditions your customers actually have — and which tests in the package detect them.</p>
        </div>

        <div className="flex flex-col gap-3">
          {CONDITIONS.map((c) => {
            const col = colorMap[c.color] || colorMap.blue;
            const seen = visited.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => select(c)}
                className={`w-full text-left rounded-xl border p-5 transition-all hover:shadow-md ${col.bg} ${col.border}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                      {seen && <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full">✓ Visited</span>}
                    </div>
                    <p className={`text-xs font-medium mb-2 ${col.accent}`}>{c.prevalence}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.tests.slice(0, 3).map((t) => (
                        <span key={t.name} className="text-xs bg-white bg-opacity-70 text-gray-600 px-2 py-0.5 rounded-full border border-white">
                          {t.name}
                        </span>
                      ))}
                      {c.tests.length > 3 && (
                        <span className="text-xs text-gray-400 px-2 py-0.5">+{c.tests.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${col.accent} flex-shrink-0`}>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
