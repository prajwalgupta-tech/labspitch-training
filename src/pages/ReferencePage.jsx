import { COMPREHENSIVE_PACKAGE } from '../data/package';

const OBJECTIONS = [
  {
    objection: '"It\'s too expensive."',
    response: '₹2,699 ÷ 93 tests = ₹29 per test. One Vitamin D test alone costs ₹400–600 at a hospital. One hospitalisation from a missed condition costs lakhs.',
  },
  {
    objection: '"My doctor hasn\'t asked for it."',
    response: 'Doctors test reactively — after symptoms. Preventive testing is what you do before. You don\'t wait for the car to break down to check the engine oil.',
  },
  {
    objection: '"I\'ll do it later / next month."',
    response: 'What changes next month? The symptoms you\'re experiencing today will still be there. Every month without knowing is another month the cause continues unchecked.',
  },
  {
    objection: '"I already got tested recently."',
    response: 'Which tests? Most basic panels miss HsCRP, RA Factor, Vitamin D, B12, and Iron Studies — the ones that explain symptoms that persist after basic testing.',
  },
];

const SYMPTOM_MAP = [
  { symptom: 'Fatigue / Low Energy', tests: 'CBC, Iron Studies, Thyroid (TSH), Vitamin B12, Vitamin D' },
  { symptom: 'Hair Loss', tests: 'Thyroid (TSH), Iron Studies (Ferritin), CBC, B12, Vit D' },
  { symptom: 'Weight Gain (Unexplained)', tests: 'Thyroid (T3/T4/TSH), HbA1c, Lipid Profile' },
  { symptom: 'Joint Pain / Morning Stiffness', tests: 'RA Factor, CRP, HsCRP, Uric Acid (KFT)' },
  { symptom: 'Swelling (face, hands, feet)', tests: 'KFT (eGFR, Albumin), LFT, Thyroid' },
  { symptom: 'Digestive Issues / Bloating', tests: 'LFT, Amylase, Urine R&M' },
  { symptom: 'Palpitations / Breathlessness', tests: 'CBC (Anaemia), Thyroid, Lipid + HsCRP' },
  { symptom: 'Skin Issues / Acne', tests: 'Thyroid, HbA1c (insulin resistance), CBC' },
  { symptom: 'No symptoms (preventive)', tests: 'Full panel — CBC, Lipid, LFT, KFT, Thyroid, HbA1c, Urine R&M, Vit D, B12' },
];

export default function ReferencePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quick Reference</h1>
        <p className="text-gray-500 text-sm mt-1">Print this or keep it open during calls.</p>
      </div>

      {/* Package summary */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Preventive Complete Check — At a Glance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COMPREHENSIVE_PACKAGE.groups.map((g) => (
            <div key={g.name} className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{g.icon}</span>
                <span className="text-xs font-semibold text-gray-800">{g.name}</span>
              </div>
              <div className="text-xs text-gray-500">{g.count} param{g.count > 1 ? 's' : ''} · {g.turnaround}</div>
              <div className="text-xs text-gray-400 mt-1 italic">{g.prep}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fasting quick ref */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Fasting Requirements — Quick Ref</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Test Group</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Fasting?</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Note</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Blood Glucose Fasting', '✅ 8–10 hrs', 'Water OK'],
                ['Lipid Profile', '✅ 10–12 hrs', 'Most critical — TG spikes after food'],
                ['LFT', '✅ Preferred 8 hrs', 'No alcohol 24 hrs before'],
                ['Iron Studies', '✅ Morning preferred', 'Iron varies with meals'],
                ['Amylase', '✅ Preferred', 'Cleaner result fasting'],
                ['HbA1c', '❌ No fast needed', 'Any time'],
                ['CBC', '❌ No fast needed', 'Any time'],
                ['Thyroid Profile', '❌ No fast needed', 'Morning sample preferred'],
                ['KFT (Kidney)', '❌ No fast needed', 'Stay hydrated'],
                ['CRP / HsCRP', '❌ No fast needed', 'Any time'],
                ['Vitamin D / B12', '❌ No fast needed', 'Any time'],
                ['RA Factor', '❌ No fast needed', 'Any time'],
                ['Urine R&M', '❌ No fast needed', 'Midstream morning urine'],
              ].map(([test, fast, note]) => (
                <tr key={test} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{test}</td>
                  <td className="px-4 py-2">{fast}</td>
                  <td className="px-4 py-2 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Symptom map */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Symptom → Test Mapping</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Symptom</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Key Tests to Highlight</th>
              </tr>
            </thead>
            <tbody>
              {SYMPTOM_MAP.map(({ symptom, tests }) => (
                <tr key={symptom} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-800">{symptom}</td>
                  <td className="px-4 py-2 text-gray-600 text-xs">{tests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Objection handlers */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Objection Handlers</h2>
        <div className="flex flex-col gap-3">
          {OBJECTIONS.map(({ objection, response }) => (
            <div key={objection} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-sm font-semibold text-red-600 mb-2">Customer: {objection}</div>
              <div className="text-sm text-gray-700">Agent: <span className="italic">"{response}"</span></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
