import { useState } from 'react';

// Symptom scenarios — each maps to a set of test group names from the package
const SCENARIOS = [
  {
    id: 'fatigue_breathless',
    title: 'Chronic Fatigue & Breathlessness',
    persona: 'Female, 34, housewife',
    complaint: "\"I've been feeling very tired for the past month. Even climbing stairs leaves me breathless. My friends say I look pale.\"",
    hint: 'Think about what causes fatigue and breathlessness — look at oxygen-carrying capacity, nutrition deficiencies, and thyroid function.',
    correctTests: ['Complete Blood Count (CBC)', 'Iron Studies', 'Thyroid Profile (TSH, FT3, FT4)', 'Vitamin B12 & Folate'],
    explanation: 'Fatigue + pallor + breathlessness is a classic anaemia presentation. CBC reveals Hb levels and RBC indices. Iron studies confirm iron-deficiency anaemia. B12/folate rules out megaloblastic anaemia. Thyroid checks hypothyroidism — a silent fatigue driver.',
    keyPitch: '"Tiredness isn\'t normal — it\'s your body signalling something. These 4 tests will tell us exactly why she feels this way."',
  },
  {
    id: 'weight_gain_cold',
    title: 'Unexplained Weight Gain & Cold Intolerance',
    persona: 'Female, 42, teacher',
    complaint: '"I haven\'t changed my diet but I\'ve put on 8 kg in 6 months. I feel cold all the time and my hair is falling out. My mind feels foggy."',
    hint: 'Classic presentation of a single endocrine condition. Also check metabolic impact.',
    correctTests: ['Thyroid Profile (TSH, FT3, FT4)', 'Complete Blood Count (CBC)', 'Lipid Profile'],
    explanation: 'Weight gain + cold intolerance + hair loss + brain fog = hypothyroidism until proven otherwise. TSH is the key marker. Hypothyroidism also causes anaemia (CBC) and dyslipidaemia (Lipid Profile), so those are secondary must-checks.',
    keyPitch: '"These symptoms together form a very specific pattern. We can confirm or rule out hypothyroidism with a simple TSH test — and catch any downstream effects on her blood and cholesterol."',
  },
  {
    id: 'chest_pain_family',
    title: 'Family History of Heart Disease',
    persona: 'Male, 48, software manager',
    complaint: '"My father had a heart attack at 52. I get occasional chest tightness after climbing stairs. I work long hours and don\'t exercise."',
    hint: 'Cardiac risk requires lipid profiling, inflammation markers, and metabolic screening.',
    correctTests: ['Lipid Profile', 'Blood Glucose Fasting', 'HbA1c', 'Complete Blood Count (CBC)', 'Liver Function Test (LFT)', 'High-Sensitivity CRP (hsCRP)'],
    explanation: 'Family history + sedentary lifestyle + chest tightness = high cardiac risk profile. Lipid profile is the core. HsCRP flags arterial inflammation — a cardiac risk independent of cholesterol. Fasting glucose + HbA1c check for diabetes (major cardiac risk factor). LFT because statins (likely to be prescribed) affect the liver.',
    keyPitch: '"With your family history, this isn\'t optional — it\'s essential. We\'re not just checking cholesterol; we\'re mapping your entire cardiovascular risk so your doctor can act before it becomes a crisis."',
  },
  {
    id: 'frequent_urination',
    title: 'Frequent Urination & Excessive Thirst',
    persona: 'Male, 55, retired',
    complaint: '"I\'m going to the bathroom 8–10 times a day. I\'m constantly thirsty and feel tired after meals. I\'ve been putting this off for months."',
    hint: 'Classic diabetes triad: polyuria, polydipsia, fatigue. Also check kidney function — diabetes affects kidneys.',
    correctTests: ['Blood Glucose Fasting', 'HbA1c', 'Kidney Function Test (KFT/RFT)', 'Complete Blood Count (CBC)', 'Lipid Profile'],
    explanation: 'Polyuria + polydipsia + post-meal fatigue = textbook uncontrolled diabetes. Fasting glucose and HbA1c confirm diagnosis. KFT is urgent because diabetes is the leading cause of kidney disease — we need baseline eGFR and urine protein. Lipid Profile and CBC for full metabolic picture.',
    keyPitch: '"He has 3 of the 4 classic diabetes warning signs. The longer this goes unchecked, the more damage it does to his kidneys and eyes. These tests will tell us exactly where he stands today."',
  },
  {
    id: 'joint_pain_morning',
    title: 'Morning Joint Stiffness & Swelling',
    persona: 'Female, 38, accounts executive',
    complaint: '"My fingers and wrists are stiff every morning for about an hour. My knees feel swollen sometimes. The pain moves around — it\'s not always in the same joint."',
    hint: 'Migratory joint symptoms with morning stiffness suggest inflammatory arthritis. Need to distinguish RA from other causes.',
    correctTests: ['Rheumatoid Factor & Anti-CCP (Autoimmune Panel)', 'Complete Blood Count (CBC)', 'High-Sensitivity CRP (hsCRP)', 'Thyroid Profile (TSH, FT3, FT4)'],
    explanation: 'Morning stiffness >1 hour + migratory joint pain is the hallmark of Rheumatoid Arthritis. Anti-CCP is more specific than RF for early RA. CRP/ESR in CBC indicate active inflammation. Thyroid is checked because hypothyroidism mimics arthritis with joint pain and fatigue.',
    keyPitch: '"Joints moving pain isn\'t normal wear and tear at 38. Early RA caught now can be managed to prevent permanent joint damage. These tests will tell us whether this is autoimmune or something else."',
  },
  {
    id: 'yellow_eyes_dark_urine',
    title: 'Yellow Eyes & Dark-Coloured Urine',
    persona: 'Male, 29, food delivery rider',
    complaint: '"My roommate noticed my eyes look yellow for the past 3 days. My urine is very dark — almost brown. I feel nauseous and have no appetite."',
    hint: 'Jaundice presentation. Need to determine if hepatic (liver cells) or cholestatic (bile flow) in origin.',
    correctTests: ['Liver Function Test (LFT)', 'Complete Blood Count (CBC)', 'Kidney Function Test (KFT/RFT)'],
    explanation: 'Jaundice + dark urine + nausea is a liver emergency. LFT (bilirubin, AST, ALT, ALP, GGT) tells us whether it\'s hepatocellular (hepatitis) or cholestatic (bile duct obstruction). CBC checks for haemolytic anaemia as another cause. KFT because severe liver disease impacts kidneys (hepatorenal syndrome).',
    keyPitch: '"Yellow eyes means bilirubin is in the blood — the liver is struggling. We need LFT results today to understand whether this is hepatitis, a blockage, or something else entirely."',
  },
  {
    id: 'recurrent_infections',
    title: 'Recurrent Infections & Slow Healing',
    persona: 'Female, 47, homemaker',
    complaint: '"I keep getting urinary tract infections — this is the third time in 4 months. Small cuts take forever to heal. I feel generally run down."',
    hint: 'Recurrent infections + slow healing = impaired immune function. Most common cause in India?',
    correctTests: ['Blood Glucose Fasting', 'HbA1c', 'Complete Blood Count (CBC)', 'Thyroid Profile (TSH, FT3, FT4)', 'Vitamin B12 & Folate'],
    explanation: 'Recurrent UTIs + poor wound healing = high suspicion for undiagnosed diabetes (high glucose impairs neutrophil function). CBC checks WBC differential for immune status. HbA1c gives 3-month average. Thyroid and B12 for secondary immune-compromise causes.',
    keyPitch: '"Recurrent infections are a red flag — her immune system is struggling. In India, the most common reason for this pattern is uncontrolled blood sugar. These tests will tell us if that\'s what\'s happening."',
  },
  {
    id: 'acne_irregular_periods',
    title: 'Acne, Weight Gain & Irregular Periods',
    persona: 'Female, 26, software developer',
    complaint: '"My periods have been irregular for 2 years — sometimes I skip 2–3 months. I have acne on my jaw and chin, and I\'ve put on weight around my belly despite dieting."',
    hint: 'Classic PCOS triad. But rule out thyroid (common mimic) and check metabolic implications.',
    correctTests: ['Thyroid Profile (TSH, FT3, FT4)', 'Blood Glucose Fasting', 'HbA1c', 'Lipid Profile', 'Complete Blood Count (CBC)'],
    explanation: 'Irregular periods + jaw acne + central obesity is textbook PCOS. But thyroid dysfunction mimics PCOS exactly — TSH is mandatory. PCOS increases insulin resistance (diabetes risk) and dyslipidaemia, so metabolic screening is essential. CBC for baseline.',
    keyPitch: '"PCOS is more than irregular periods — it\'s a metabolic condition that affects her heart health, diabetes risk, and fertility long-term. Catching it early with the right tests changes her entire health trajectory."',
  },
  {
    id: 'senior_routine_checkup',
    title: 'Annual Health Check — Asymptomatic Senior',
    persona: 'Male, 62, retired banker',
    complaint: '"I feel fine, actually. My wife insisted I get a check-up. I had a blood test 5 years ago and everything was normal. I\'m not sure what tests I actually need."',
    hint: 'For a 60+ asymptomatic male, which organ systems need routine surveillance? Think comprehensively.',
    correctTests: [
      'Complete Blood Count (CBC)', 'Blood Glucose Fasting', 'HbA1c',
      'Lipid Profile', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT/RFT)',
      'Thyroid Profile (TSH, FT3, FT4)', 'High-Sensitivity CRP (hsCRP)',
      'Vitamin B12 & Folate', 'Iron Studies',
    ],
    explanation: 'At 62, "feeling fine" doesn\'t mean healthy — most serious conditions are asymptomatic until advanced. CBC for blood health, glucose + HbA1c for diabetes (common in this age group), lipid + CRP for cardiac risk, LFT + KFT for organ function, thyroid for metabolic health, B12/iron for deficiency anaemia common in seniors.',
    keyPitch: '"The best time to catch a problem is before you feel it. At 62, routine screening is not optional — it\'s the difference between catching a treatable condition early versus managing a crisis later."',
  },
];

const ALL_TESTS = [
  'Complete Blood Count (CBC)',
  'Blood Glucose Fasting',
  'HbA1c',
  'Lipid Profile',
  'Liver Function Test (LFT)',
  'Kidney Function Test (KFT/RFT)',
  'Thyroid Profile (TSH, FT3, FT4)',
  'Iron Studies',
  'Vitamin B12 & Folate',
  'High-Sensitivity CRP (hsCRP)',
  'Rheumatoid Factor & Anti-CCP (Autoimmune Panel)',
  'Urine Routine & Microscopy',
  'Calcium & Phosphorus',
  'Serum Electrolytes',
  'Vitamin D (25-OH)',
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ScenarioCard({ scenario, onSubmit }) {
  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [tests] = useState(() => shuffle(ALL_TESTS));

  const toggle = (test) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(test)) next.delete(test);
      else next.add(test);
      return next;
    });
  };

  const correct = new Set(scenario.correctTests);

  const handleSubmit = () => {
    if (selected.size === 0) return;
    setSubmitted(true);
    // Score: correct picks / total needed
    const truePositives = [...selected].filter((t) => correct.has(t)).length;
    const falsePositives = [...selected].filter((t) => !correct.has(t)).length;
    const falseNegatives = [...correct].filter((t) => !selected.has(t)).length;
    const score = Math.max(0, Math.round(((truePositives - falsePositives * 0.5) / correct.size) * 100));
    onSubmit(Math.min(100, score), truePositives, falsePositives, falseNegatives);
  };

  const getButtonStyle = (test) => {
    if (!submitted) {
      return selected.has(test)
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50';
    }
    if (correct.has(test) && selected.has(test)) return 'bg-green-100 text-green-800 border-green-400';
    if (correct.has(test) && !selected.has(test)) return 'bg-amber-50 text-amber-800 border-amber-400 border-dashed';
    if (!correct.has(test) && selected.has(test)) return 'bg-red-50 text-red-700 border-red-400';
    return 'bg-gray-50 text-gray-400 border-gray-100';
  };

  const getIcon = (test) => {
    if (!submitted) return null;
    if (correct.has(test) && selected.has(test)) return <span className="text-green-600">✓</span>;
    if (correct.has(test) && !selected.has(test)) return <span className="text-amber-500">!</span>;
    if (!correct.has(test) && selected.has(test)) return <span className="text-red-500">✗</span>;
    return null;
  };

  return (
    <div>
      {/* Scenario header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🎯</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-base font-bold text-gray-900">{scenario.title}</h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{scenario.persona}</span>
            </div>
            <blockquote className="text-sm text-gray-700 italic border-l-4 border-blue-200 pl-3 mt-2 leading-relaxed">
              {scenario.complaint}
            </blockquote>
          </div>
        </div>
      </div>

      {/* Hint toggle */}
      {!submitted && (
        <div className="mb-4">
          <button
            onClick={() => setShowHint((h) => !h)}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            {showHint ? '▾ Hide hint' : '▸ Show hint (costs 10 pts)'}
          </button>
          {showHint && (
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
              💡 {scenario.hint}
            </div>
          )}
        </div>
      )}

      {/* Test selector */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Select all tests you would recommend for this customer
        </div>
        <div className="flex flex-wrap gap-2">
          {tests.map((test) => (
            <button
              key={test}
              onClick={() => toggle(test)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all ${getButtonStyle(test)}`}
            >
              {getIcon(test)}
              {test}
            </button>
          ))}
        </div>
      </div>

      {/* Legend when submitted */}
      {submitted && (
        <div className="flex flex-wrap gap-3 text-xs mb-4">
          <span className="flex items-center gap-1 text-green-700"><span className="w-3 h-3 rounded bg-green-200 inline-block"/> Correct pick</span>
          <span className="flex items-center gap-1 text-amber-700"><span className="w-3 h-3 rounded border-2 border-dashed border-amber-400 inline-block"/> Missed — should have picked</span>
          <span className="flex items-center gap-1 text-red-700"><span className="w-3 h-3 rounded bg-red-100 inline-block"/> Wrong pick</span>
        </div>
      )}

      {/* Explanation */}
      {submitted && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">📖 Clinical Reasoning</div>
          <p className="text-sm text-gray-800 leading-relaxed">{scenario.explanation}</p>
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <div className="text-xs font-semibold text-green-700 mb-1">💬 Key Pitch Line</div>
            <p className="text-sm text-gray-800 italic">{scenario.keyPitch}</p>
          </div>
        </div>
      )}

      {/* Submit / Selected count */}
      {!submitted && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={selected.size === 0}
            className={`px-5 py-2 rounded-xl text-sm font-medium text-white transition-all ${
              selected.size > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Submit my answer
          </button>
          {selected.size > 0 && (
            <span className="text-xs text-gray-500">{selected.size} test{selected.size !== 1 ? 's' : ''} selected</span>
          )}
        </div>
      )}
    </div>
  );
}

export default function SymptomDrill() {
  const [scenarioOrder] = useState(() => shuffle(SCENARIOS));
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState([]);
  const [currentScore, setCurrentScore] = useState(null);
  const [done, setDone] = useState(false);

  const scenario = scenarioOrder[idx];

  const handleSubmit = (score, tp, fp, fn) => {
    setCurrentScore({ score, tp, fp, fn });
    setResults((prev) => [...prev, { scenario, score, tp, fp, fn }]);
  };

  const handleNext = () => {
    if (idx + 1 >= scenarioOrder.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setCurrentScore(null);
    }
  };

  const totalScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
    : 0;

  if (done) {
    const avg = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
    const perfectCount = results.filter((r) => r.score >= 90).length;

    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">{avg >= 80 ? '🏆' : avg >= 60 ? '💪' : '📚'}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Symptom Drill Complete!</h2>
            <p className="text-gray-500 text-sm">{scenarioOrder.length} clinical scenarios</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5">
            <div className="text-4xl font-bold text-gray-900 text-center mb-1">{avg}%</div>
            <div className="text-sm text-gray-500 text-center mb-4">Average clinical accuracy</div>
            <div className="flex justify-around text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{perfectCount}</div>
                <div className="text-xs text-gray-500 mt-1">Near-perfect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-700">{results.length}</div>
                <div className="text-xs text-gray-500 mt-1">Scenarios done</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(results.reduce((s, r) => s + r.tp, 0) / results.length * 10) / 10}
                </div>
                <div className="text-xs text-gray-500 mt-1">Avg correct picks</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  r.score >= 90 ? 'bg-green-100 text-green-700' : r.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>{r.score}%</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{r.scenario.title}</div>
                  <div className="text-xs text-gray-500">
                    {r.tp} correct · {r.fp} extra · {r.fn} missed
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
            >
              New drill
            </button>
            <a href="/" className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 inline-flex items-center">
              Dashboard
            </a>
          </div>

          {avg < 70 && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              💡 <strong>Tip:</strong> Review the Conditions module and Parameter Library — they explain the clinical reasoning behind each test recommendation.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-4 flex-shrink-0">
        <div className="text-sm font-semibold text-gray-700">🩺 Symptom Builder Drill</div>
        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${(idx / scenarioOrder.length) * 100}%` }} />
        </div>
        <div className="text-xs text-gray-500">{idx + 1}/{scenarioOrder.length}</div>
        {results.length > 0 && (
          <div className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
            Avg: {totalScore}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            onSubmit={handleSubmit}
          />

          {/* Score result + Next button */}
          {currentScore !== null && (
            <div className="mt-4">
              <div className={`rounded-xl border p-4 mb-4 ${
                currentScore.score >= 90 ? 'bg-green-50 border-green-200' :
                currentScore.score >= 60 ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`text-3xl font-bold ${
                    currentScore.score >= 90 ? 'text-green-700' :
                    currentScore.score >= 60 ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>{currentScore.score}%</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {currentScore.score >= 90 ? 'Excellent clinical reasoning!' :
                       currentScore.score >= 70 ? 'Good — a few gaps to review.' :
                       currentScore.score >= 50 ? 'Getting there — study the explanation above.' :
                       'Review the conditions module and retry.'}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {currentScore.tp} correct · {currentScore.fp} unnecessary · {currentScore.fn} missed
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition-colors"
              >
                {idx + 1 >= scenarioOrder.length ? 'See Final Results' : 'Next Scenario →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
