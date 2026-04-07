import { useState } from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';

const LESSONS = [
  {
    title: 'Consultative Selling',
    content: `
## Ask First. Pitch Second.

The biggest mistake agents make is pitching a package before understanding the customer. Consultative selling flips this.

### The 5 Questions to Ask First

1. **"How old are you, roughly?"** — Age guides which organ systems to prioritise
2. **"When did you last get tested?"** — Determines urgency; 2+ years = strong case for comprehensive package
3. **"Have you been experiencing any symptoms?"** — Fatigue, hair loss, joint pain, weight gain → map to tests
4. **"Do you have any known conditions — diabetes, BP, thyroid?"** — Conditions = specific test matches
5. **"Is there a budget you have in mind?"** — Sets the conversation range, but don't anchor too early

### Why This Works
- The customer feels heard, not sold to
- You identify their real concern → match the right package
- Objections are pre-empted because the recommendation is personalised
- It positions you as a health advisor, not an order-taker

### Example Opening
> "Before I recommend anything, let me ask you a few quick questions so I can suggest exactly what makes sense for you specifically. Is that okay?"

This one line reframes the entire call. You're not selling — you're advising.

### Mapping Answers to Packages
- Fatigue + vegetarian + 30s female → CBC, Thyroid, Iron, B12, Vit D → She Cares Panel or Preventive Complete
- Joint pain + 50s male + 3 years no test → RA Factor, HsCRP, Lipid, HbA1c → Preventive Complete Check
- Known diabetic → HbA1c, KFT, Lipid → Sugar & Organ Monitor or Kidney & Diabetes Guard
    `,
  },
  {
    title: 'Handling Objections',
    content: `
## The 4 Objections You'll Face Every Day

### 1. "It's too expensive."

**Wrong response:** "Let me check if there's a discount."
→ This immediately signals the price isn't real. You lose authority.

**Right response:** Break it down and reframe.
> "This package is ₹2,699 for 93 tests — that's ₹29 per test. One hospital lab charges ₹400–600 just for a Vitamin D test. And one missed result that leads to a 3-day hospital stay costs lakhs. The test is the cheapest part of your healthcare."

**Then:** Anchor to cost of inaction.
> "The question isn't whether ₹2,699 is affordable. It's what it costs NOT to know."

---

### 2. "My doctor hasn't asked for it."

**Wrong response:** "Okay, check with your doctor and call us back."
→ You've just lost the customer.

**Right response:** Reframe preventive vs. reactive medicine.
> "Doctors typically test when you have a symptom. Preventive testing is what you do before the symptom appears. You don't wait for the car to break down to check the engine oil — this is the same idea."

> "Your doctor will actually thank you for coming in with a full report. It makes their job easier."

---

### 3. "I'll do it later / next month."

**Wrong response:** "Okay, I'll call you then."
→ 80% of "later" customers never call back.

**Right response:** Probe what changes, then link urgency to their concern.
> "I totally understand. Can I ask — what would be different next month? Because whatever you're feeling right now — the fatigue, the hair loss — will still be there. And every month without knowing the cause is another month of it continuing."

> "I can book you for tomorrow morning. You're done in 10 minutes, home for breakfast by 8am."

---

### 4. "I've already done some tests recently."

**Right response:** Find the gap.
> "That's great! Which tests did you get? Most standard panels miss Vitamin D, B12, HsCRP, and RA Factor — those are the ones that explain the symptoms people still have after basic testing."

> "If you've already done CBC, Lipid, and sugar — the upgrade here adds the inflammation, vitamin, and thyroid panels. Want me to tell you exactly what's new?"
    `,
  },
  {
    title: 'Upselling & Cross-Selling',
    content: `
## How to Upsell Without Being Pushy

The rule: **Upsell only when it genuinely covers something the customer's concern requires.**

### The Right Upsell Trigger
A customer has symptoms that the base package doesn't fully address.

**Example:**
Customer calls asking about fatigue. Agent recommends Fatigue & Low Energy Screen (₹899).
Then agent discovers the customer is 45, vegetarian, and hasn't tested in 3 years.

> "The Fatigue Screen is great, but given that you're vegetarian and 45, I'd want to check your iron stores, B12, and Vitamin D too — because these are almost universally low in vegetarians your age and they're a big driver of fatigue. The Preventive Complete Check at ₹2,699 covers all of that in one draw — and it also checks your thyroid, kidney, and liver which you haven't looked at in 3 years."

### The Upsell Formula
1. Acknowledge the base package is good
2. Name the specific tests the upgrade adds
3. Link those tests to the customer's stated concern
4. State the price difference — make it sound small against the value

> "It's ₹1,800 more than the basic screen — but you're getting 6 extra test groups that directly explain what's causing your fatigue."

### Cross-Selling (Family)
> "While you're booking this for yourself — would it make sense to get your spouse or parents tested at the same time? We can do multiple collections in one visit. It's the same slot, same phlebotomist, no extra logistics."

### What NOT to Do
- Never mention upsell before understanding the customer's profile
- Never upsell purely on price (don't say "just ₹500 more")
- Never add packages the customer clearly doesn't need
    `,
  },
  {
    title: 'Creating Urgency & Closing',
    content: `
## Ethical Urgency and Closing Techniques

### Creating Urgency Without Fear-Mongering

**Bad urgency:** "If you don't test, you might have cancer."
→ Manipulative. Damages trust. Unethical.

**Good urgency:** Anchor to the customer's own stated problem.
> "You said you've been feeling tired for 4 months. That's 4 months of your body signalling something. The thyroid or iron result will either reassure you, or give you something to act on. Either way — you win."

**Statistical urgency (use sparingly, accurately):**
> "1 in 3 urban Indians has fatty liver — most don't know it. It becomes irreversible at stage 3. This is caught at stage 1 on a simple LFT."

---

### Closing Techniques

**The Summary Close** (most effective in healthcare)
Recap the customer's profile, then close.
> "So you mentioned you're 42, feeling tired, hair loss for 6 months, haven't tested in 2 years, and you're vegetarian. The Preventive Complete Check will check your thyroid, iron stores, B12, Vitamin D, and anaemia — which are literally the top 5 causes of what you're describing. Should I book you for tomorrow morning at 7:30?"

**The Soft Close**
Don't demand. Invite.
> "Based on what you've told me, this is exactly the test I'd suggest. Would you like to try and get it done this week?"

**The Option Close**
Give two yeses, no escape route.
> "Would tomorrow morning work for you, or is the day after better?"

**The Reassurance Close** (for hesitant customers)
> "The worst case is you spend ₹2,699 and everything comes back normal — and that gives you total peace of mind. The best case is we catch something early when it's cheap and easy to fix."

---

### After the Close
- Confirm the slot, address, and name clearly
- Tell them what to expect: fasting duration, what to wear, time the phlebotomist will arrive
- Send a WhatsApp confirmation immediately
- Set a reminder for them if possible
    `,
  },
];

export default function SalesModule({ onProgress }) {
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));

  const goTo = (idx) => {
    setCurrent(idx);
    const newVisited = new Set([...visited, idx]);
    setVisited(newVisited);
    onProgress('sales', Math.round((newVisited.size / LESSONS.length) * 80));
  };

  const lesson = LESSONS[current];
  const pct = Math.round((visited.size / LESSONS.length) * 100);

  return (
    <div className="flex flex-1">
      <div className="w-56 border-r border-gray-200 bg-white p-4 flex flex-col gap-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Lessons</div>
        {LESSONS.map((l, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              current === i ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs flex-shrink-0 ${
              visited.has(i) ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-300 text-gray-400'
            }`}>
              {visited.has(i) ? '✓' : i + 1}
            </span>
            <span className="leading-tight">{l.title}</span>
          </button>
        ))}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1">{pct}% complete</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <Link to="/quiz/sales" className="mt-3 block text-center bg-purple-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors">
            Take Quiz →
          </Link>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-2">
            Sales & Persuasion Skills · Lesson {current + 1} of {LESSONS.length}
          </div>
          <MarkdownRenderer content={lesson.content} accentColor="purple" />
          <div className="flex gap-3 mt-8">
            {current > 0 && (
              <button onClick={() => goTo(current - 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                ← Previous
              </button>
            )}
            {current < LESSONS.length - 1 ? (
              <button onClick={() => goTo(current + 1)} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 ml-auto">
                Next Lesson →
              </button>
            ) : (
              <Link to="/quiz/sales" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 ml-auto">
                Take the Quiz →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
