import { NavLink } from 'react-router-dom';
import { MODULES } from '../data/modules';

const colorMap = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-green-100 text-green-700',
};

export default function Sidebar({ progress }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-4 gap-1 overflow-y-auto">
      <div className="mb-6 px-2">
        <div className="flex items-center gap-2 mb-1">
          <img src="/truemeds-logo.svg" alt="Truemeds" className="h-6 w-auto" style={{ maxWidth: '120px' }} />
          <span className="text-base font-bold text-gray-700 leading-none tracking-tight">Labs</span>
        </div>
        <div className="text-xs text-gray-500 leading-tight">Training &amp; Development Portal</div>
      </div>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <span className="text-lg">🏠</span> Dashboard
      </NavLink>

      <div className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Modules</div>

      {MODULES.map((m) => {
        const pct = progress[m.id] || 0;
        return (
          <NavLink
            key={m.id}
            to={`/module/${m.id}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className={`w-7 h-7 rounded-md flex items-center justify-center text-sm ${colorMap[m.color]}`}>
              {m.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="truncate">{m.title}</div>
              {pct > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              )}
            </div>
          </NavLink>
        );
      })}

      <div className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Medical Deep-Dives</div>

      <NavLink
        to="/parameters"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-red-100 text-red-700">🔬</span>
        Parameter Library
      </NavLink>

      <NavLink
        to="/conditions"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-purple-100 text-purple-700">🏥</span>
        Conditions
      </NavLink>

      <NavLink
        to="/flashcards"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-blue-100 text-blue-700">🃏</span>
        Flashcards
      </NavLink>

      <NavLink
        to="/symptoms"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-cyan-100 text-cyan-700">🩺</span>
        Symptom Drill
      </NavLink>

      <div className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Practice</div>

      <NavLink
        to="/practice"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-orange-100 text-orange-700">🤖</span>
        AI Practice Partner
      </NavLink>

      <NavLink
        to="/reference"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-yellow-100 text-yellow-700">📋</span>
        Quick Reference
      </NavLink>
    </aside>
  );
}
