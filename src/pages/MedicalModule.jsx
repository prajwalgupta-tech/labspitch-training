import { useState } from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';

const LESSONS = [
  {
    title: 'Common Pathology Tests — What They Are',
    content: `
## The Core Tests Every Agent Must Know

Diagnostic tests fall into panels — groups of related measurements run from a single blood or urine sample. Here are the most important ones:

**CBC (Complete Blood Count)** — 24 parameters
Measures all blood components. The first test ordered for almost any symptom. Detects anaemia, infections, immune disorders, and clotting problems.

**Lipid Profile** — 9 parameters
Full cholesterol panel. Total cholesterol, LDL (bad), HDL (good), triglycerides, and ratios. Essential for cardiac risk assessment.

**LFT (Liver Function Test)** — 12 parameters
Liver enzymes (SGOT, SGPT, ALP, GGT) + proteins (albumin, globulin). Detects fatty liver, hepatitis, and liver damage.

**KFT / Renal Function Test** — 11 parameters (Advanced)
Creatinine, BUN, eGFR, uric acid, electrolytes. Tracks how well kidneys filter waste.

**Thyroid Profile (T3, T4, TSH)** — 3 parameters
Controls metabolism, energy, mood, and weight. TSH ultra-sensitive catches subclinical thyroid issues.

**HbA1c** — 2 parameters
3-month blood sugar average. The gold standard for diabetes diagnosis and monitoring.

**Vitamin D & B12**
Nutrient deficiencies that are epidemic in India — affect energy, immunity, nerve health, and bone density.
    `,
  },
  {
    title: 'When Tests Are Recommended',
    content: `
## Matching Symptoms to Tests

Knowing when to recommend which test is what separates a great agent from an order-taker.

### Fatigue / Low Energy
→ CBC (anaemia?), Iron Studies (iron deficiency?), Thyroid (hypothyroid?), Vitamin B12 & D

### Hair Loss
→ Thyroid (TSH), Iron Studies (ferritin), CBC, Vitamin B12 & D

### Weight Gain (Unexplained)
→ Thyroid (hypothyroid slows metabolism), HbA1c (insulin resistance), Lipid Profile

### Joint Pain / Stiffness
→ RA Factor (autoimmune?), CRP + HsCRP (inflammation), Uric Acid (gout?)

### Digestive Problems / Bloating
→ LFT (liver?), Amylase (pancreas?), Urine R&M

### Swelling in Face / Hands / Feet
→ KFT (kidney protein loss?), LFT (albumin?), Thyroid

### No Symptoms (Preventive)
→ Annual full-body panel — CBC, Lipid, LFT, KFT, Thyroid, HbA1c, Urine R&M, Vit D, B12

### Age-Based Recommendations
- **20s**: CBC, Thyroid, Iron, B12/D (especially women, vegetarians)
- **30s**: + HbA1c, Lipid (metabolic risk starts here)
- **40s**: + HsCRP, KFT (cardiac and kidney vigilance)
- **50+**: Full panel yearly — every organ system
    `,
  },
  {
    title: 'Test Preparation Requirements',
    content: `
## Prep Requirements — Know This Cold

Getting prep wrong ruins the test result and customer trust.

| Test | Fasting | Sample | Notes |
|------|---------|--------|-------|
| Blood Glucose Fasting | ✅ 8–10 hrs | Blood | Water OK |
| Lipid Profile | ✅ 10–12 hrs | Blood | Most critical — triglycerides spike after eating |
| HbA1c | ❌ No fast | Blood | Can test any time |
| LFT | ✅ Preferred 8 hrs | Blood | Avoid alcohol 24 hrs prior |
| KFT | ❌ No fast | Blood | Stay hydrated |
| CBC | ❌ No fast | Blood | Any time |
| Thyroid | ❌ No fast | Blood | Morning preferred |
| Iron Studies | ✅ Morning preferred | Blood | Serum iron varies with food |
| Vitamin D / B12 | ❌ No fast | Blood | Any time |
| Amylase | ✅ Preferred | Blood | Fasting gives cleaner result |
| RA Factor | ❌ No fast | Blood | Any time |
| Urine R&M | ❌ No fast | Urine | Midstream morning sample |

### Key Points to Always Mention
1. **Fasting means 8–12 hrs no food, no juice.** Water is fine. Black coffee/tea without milk is borderline.
2. **The package includes fasting tests** — so the customer should book for morning and fast overnight.
3. For the Preventive Complete Check: morning collection is ideal so the patient can have breakfast right after.
    `,
  },
  {
    title: 'Report Turnaround & Collection Process',
    content: `
## How Reports Work

### Standard Turnaround Times
- **Same-day (4–6 hrs)**: CBC, Lipid, LFT, KFT, Glucose, HbA1c, CRP, HsCRP, Thyroid, Urine R&M, Amylase, RA Factor
- **Same-day (4–8 hrs)**: Iron Studies, Vitamin D, Vitamin B12
- **Full Preventive Complete Check**: Reports delivered same day, digitally

### Home Collection Process
1. Agent books the slot (morning preferred for fasting tests)
2. Phlebotomist arrives at customer's home at the scheduled time
3. Blood draw takes ~5 minutes. Urine sample collected separately.
4. Sample sent to lab within 2 hours
5. Digital report delivered via PDF (WhatsApp + email)
6. Doctor review available as add-on

### What to Tell Customers About Reports
- "Your report will be ready on your phone by evening — no need to visit anywhere."
- "All values come with reference ranges — normal vs. abnormal is clearly marked."
- "If something is flagged, I can help connect you with a doctor for interpretation."

### Common Customer Concerns
**"Will the phlebotomist be trained?"** → All phlebotomists are certified with experience in home collection.
**"How hygienic is home collection?"** → Sterile needles, gloves, and sealed sample tubes — same protocol as hospital labs.
**"Who accredits your labs?"** → NABL-accredited labs with standardised quality controls.
    `,
  },
  {
    title: 'Basic Anatomy for Credible Conversations',
    content: `
## The Organs Behind the Tests

You don't need to be a doctor. But you need to speak credibly about why a test matters.

### Liver 🫁
Processes nutrients, filters toxins, produces bile. Fatty liver is now epidemic — caused by processed food, alcohol, and sedentary lifestyle. Silently damages the liver over years.
→ LFT catches enzyme elevation before symptoms appear.

### Kidneys 🫘
Two bean-shaped organs that filter 180 litres of blood daily. Damage progresses silently — 50% function can be lost before any symptom.
→ KFT tracks creatinine and eGFR trajectory.

### Thyroid 🦋
Butterfly-shaped gland in the neck. Controls metabolism — every cell's speed. Hypothyroid = slow metabolism (fatigue, weight gain, hair loss). Hyperthyroid = overactive (anxiety, palpitations, weight loss).
→ TSH is the pituitary's command signal — rises when thyroid is underperforming.

### Pancreas 🫄
Dual-role organ: produces insulin (blood sugar) and digestive enzymes (amylase). Pancreatitis is a medical emergency. Often triggered by gallstones or alcohol.
→ Amylase serum detects pancreatic stress.

### Heart ❤️
Cholesterol (LDL) deposits in artery walls, narrowing them — atherosclerosis. Silent process over decades. HsCRP detects the inflammatory component of this process.
→ Lipid Profile + HsCRP = the cardiac risk duo.

### Joints 🦴
Rheumatoid arthritis is autoimmune — the immune system attacks joint lining. Caught early with RA Factor, treatment prevents permanent joint deformity.
→ RA Factor quantitative gives a number — not just positive/negative.
    `,
  },
];

export default function MedicalModule({ onProgress }) {
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));

  const goTo = (idx) => {
    setCurrent(idx);
    const newVisited = new Set([...visited, idx]);
    setVisited(newVisited);
    onProgress('medical', Math.round((newVisited.size / LESSONS.length) * 80));
  };

  const lesson = LESSONS[current];
  const pct = Math.round((visited.size / LESSONS.length) * 100);

  return (
    <div className="flex flex-1">
      {/* Lesson nav */}
      <div className="w-56 border-r border-gray-200 bg-white p-4 flex flex-col gap-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Lessons</div>
        {LESSONS.map((l, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              current === i ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs flex-shrink-0 ${
              visited.has(i) ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-400'
            }`}>
              {visited.has(i) ? '✓' : i + 1}
            </span>
            <span className="leading-tight">{l.title}</span>
          </button>
        ))}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1">{pct}% complete</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <Link
            to="/quiz/medical"
            className="mt-3 block text-center bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Quiz →
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">
            Medical & Product Knowledge · Lesson {current + 1} of {LESSONS.length}
          </div>
          <MarkdownRenderer content={lesson.content} accentColor="blue" />

          {/* Table rendering for lesson 3 */}
          {current === 2 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-3 py-2 border border-gray-200">Test</th>
                    <th className="text-left px-3 py-2 border border-gray-200">Fasting</th>
                    <th className="text-left px-3 py-2 border border-gray-200">Sample</th>
                    <th className="text-left px-3 py-2 border border-gray-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Blood Glucose Fasting', '✅ 8–10 hrs', 'Blood', 'Water OK'],
                    ['Lipid Profile', '✅ 10–12 hrs', 'Blood', 'Most critical — TG spikes after eating'],
                    ['HbA1c', '❌ No fast', 'Blood', 'Can test any time'],
                    ['LFT', '✅ Preferred 8 hrs', 'Blood', 'Avoid alcohol 24 hrs prior'],
                    ['KFT', '❌ No fast', 'Blood', 'Stay hydrated'],
                    ['CBC', '❌ No fast', 'Blood', 'Any time'],
                    ['Thyroid', '❌ No fast', 'Blood', 'Morning preferred'],
                    ['Iron Studies', '✅ Morning pref.', 'Blood', 'Serum iron varies with food'],
                    ['Vitamin D / B12', '❌ No fast', 'Blood', 'Any time'],
                    ['Amylase', '✅ Preferred', 'Blood', 'Fasting gives cleaner result'],
                    ['RA Factor', '❌ No fast', 'Blood', 'Any time'],
                    ['Urine R&M', '❌ No fast', 'Urine', 'Midstream morning sample'],
                  ].map(([test, fast, sample, notes]) => (
                    <tr key={test} className="border-b border-gray-100">
                      <td className="px-3 py-2 font-medium border border-gray-200">{test}</td>
                      <td className="px-3 py-2 border border-gray-200">{fast}</td>
                      <td className="px-3 py-2 border border-gray-200">{sample}</td>
                      <td className="px-3 py-2 text-gray-600 border border-gray-200">{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {current > 0 && (
              <button onClick={() => goTo(current - 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                ← Previous
              </button>
            )}
            {current < LESSONS.length - 1 ? (
              <button onClick={() => goTo(current + 1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 ml-auto">
                Next Lesson →
              </button>
            ) : (
              <Link to="/quiz/medical" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 ml-auto">
                Take the Quiz →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
