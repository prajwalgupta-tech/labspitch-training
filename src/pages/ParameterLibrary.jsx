import { useState } from 'react';
import { PARAMETERS, PARAMETER_GROUPS } from '../data/parameters';

const groupColors = {
  CBC: 'bg-red-100 text-red-700 border-red-200',
  'Lipid Profile': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  LFT: 'bg-orange-100 text-orange-700 border-orange-200',
  KFT: 'bg-blue-100 text-blue-700 border-blue-200',
  Thyroid: 'bg-purple-100 text-purple-700 border-purple-200',
  'Iron Studies': 'bg-amber-100 text-amber-700 border-amber-200',
  Inflammation: 'bg-rose-100 text-rose-700 border-rose-200',
  Diabetes: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Vitamins: 'bg-green-100 text-green-700 border-green-200',
  Pancreas: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Autoimmune: 'bg-violet-100 text-violet-700 border-violet-200',
};

function ParameterCard({ param }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('overview');
  const gc = groupColors[param.group] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-shadow ${open ? 'shadow-md' : 'hover:shadow-sm'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex items-center gap-3"
      >
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${gc}`}>{param.group}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm">{param.name}</div>
          <div className="text-xs text-gray-400">{param.unit} · Normal: {param.normalRange}</div>
        </div>
        <span className="text-gray-400 text-sm flex-shrink-0">{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className="border-t border-gray-100">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {['overview', 'ranges', 'script'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-xs font-semibold capitalize transition-colors ${
                  tab === t ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'script' ? '💬 Customer Script' : t === 'ranges' ? '📊 Ranges' : '🔬 Overview'}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === 'overview' && (
              <p className="text-sm text-gray-700 leading-relaxed">{param.whyItMatters}</p>
            )}

            {tab === 'ranges' && (
              <div className="flex flex-col gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Normal Range</div>
                  <div className="text-sm text-gray-900">{param.normalRange}</div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="text-xs font-semibold text-blue-600 uppercase mb-1">⬇ {param.low.label}</div>
                  <div className="text-sm text-gray-700">{param.low.meaning}</div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <div className="text-xs font-semibold text-red-600 uppercase mb-1">⬆ {param.high.label}</div>
                  <div className="text-sm text-gray-700">{param.high.meaning}</div>
                </div>
              </div>
            )}

            {tab === 'script' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Say it this way to the customer:</div>
                <p className="text-sm text-gray-900 leading-relaxed italic">{param.customerScript}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ParameterLibrary() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');

  const filtered = PARAMETERS.filter((p) => {
    const matchGroup = activeGroup === 'All' || p.group === activeGroup;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.group.toLowerCase().includes(search.toLowerCase());
    return matchGroup && matchSearch;
  });

  return (
    <div className="flex flex-1">
      {/* Group filter sidebar */}
      <div className="w-48 border-r border-gray-200 bg-white p-4 flex flex-col gap-1 flex-shrink-0">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Filter by Group</div>
        {['All', ...PARAMETER_GROUPS].map((g) => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeGroup === g ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Parameter Deep-Dives</h1>
            <p className="text-sm text-gray-500">30 key parameters — what they mean, when they're abnormal, and how to explain them to customers.</p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Search parameters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 pl-9"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
          </div>

          <div className="text-xs text-gray-400 mb-3">{filtered.length} parameter{filtered.length !== 1 ? 's' : ''}</div>

          <div className="flex flex-col gap-2">
            {filtered.map((p) => <ParameterCard key={p.id} param={p} />)}
            {filtered.length === 0 && (
              <div className="text-center text-gray-400 py-12 text-sm">No parameters match your search.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
