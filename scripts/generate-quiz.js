#!/usr/bin/env node
// generate-quiz.js
// Calls Claude API to generate 10 fresh medium-difficulty quiz questions,
// then renders them as a fully self-contained interactive HTML file.

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRAINING_CONTEXT } from './training-context.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ──────────────────────────────────────────────────────────────────

const MODEL = 'claude-haiku-4-5';
const NUM_QUESTIONS = 10;
const OUTPUT_DIR = path.join(__dirname, '..', 'quiz-output');

const today = new Date();
const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
const displayDate = today.toLocaleDateString('en-IN', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// ─── Step 1: Generate questions via Claude ────────────────────────────────────

async function generateQuestions() {
  const client = new Anthropic();

  const systemPrompt = `You are a training quiz creator for Truemeds Diagnostics sales agents in India.

Your task: Generate exactly ${NUM_QUESTIONS} ORIGINAL multiple-choice questions split into two difficulty tiers.

SPLIT: 6 Medical questions (EASY) + 4 Sales questions (MEDIUM).

RULES:
1. MEDICAL questions (6) must be EASY difficulty:
   - Easy means: direct recall of facts, normal ranges, what a test measures, which condition a test detects.
   - Examples of the right level: "What is the normal range for HbA1c?", "Which test is the earliest marker of iron deficiency?", "What does a high TSH indicate?"
   - Avoid complex multi-step reasoning or nuanced clinical scenarios.
2. SALES questions (4) must be MEDIUM difficulty:
   - Medium means: applying sales knowledge to a realistic customer scenario — objection handling, consultative questioning, pitch framing, closing technique.
   - Examples of the right level: "A customer says the package is too expensive — what is the best response?", "Which question should an agent ask FIRST when a customer calls?"
   - Avoid trivial yes/no or definition-style sales questions.
3. Every question must have EXACTLY 4 options (A, B, C, D), with only 1 correct answer.
4. Include a brief explanation (2–3 sentences) for the correct answer.
5. Set "category" to "Medical" for medical questions and "Sales" for sales questions.
6. Questions must be ORIGINAL — do not replicate any existing standard questions. Use the training content as domain knowledge, not as a question bank to copy from.
7. Be specific and grounded in the training content. Avoid vague or generic questions.

OUTPUT FORMAT — Return ONLY a valid JSON array, no markdown, no preamble:
[
  {
    "q": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 0,
    "explanation": "Brief explanation of why this is correct and why the others aren't.",
    "category": "Medical"
  }
]`;

  const userPrompt = `${TRAINING_CONTEXT}

Today's date: ${dateStr}
Generate ${NUM_QUESTIONS} fresh medium-difficulty quiz questions for today's daily training quiz.`;

  console.log(`🤖 Calling Claude ${MODEL} to generate ${NUM_QUESTIONS} questions...`);

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  });

  const rawText = message.content[0].text.trim();

  // Strip markdown code fences if present
  const jsonText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

  let questions;
  try {
    questions = JSON.parse(jsonText);
  } catch (err) {
    console.error('❌ Failed to parse Claude response as JSON:\n', rawText);
    throw new Error('Claude returned invalid JSON. See above for raw output.');
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Claude returned an empty or non-array response.');
  }

  console.log(`✅ Generated ${questions.length} questions successfully.`);
  return questions;
}

// ─── Step 2: Build self-contained HTML ───────────────────────────────────────

function buildHTML(questions) {
  const categoryColors = {
    Medical: { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8' },
    Sales: { bg: '#F5F3FF', border: '#8B5CF6', text: '#6D28D9' },
    Package: { bg: '#F0FDF4', border: '#22C55E', text: '#15803D' },
  };

  const questionsJS = JSON.stringify(questions);

  const questionBlocks = questions.map((q, i) => {
    const cat = q.category || 'Medical';
    const colors = categoryColors[cat] || categoryColors.Medical;
    const opts = q.options.map((opt, j) => `
        <label class="option-label" id="opt-${i}-${j}">
          <input type="radio" name="q${i}" value="${j}" />
          <span class="option-letter">${String.fromCharCode(65 + j)}</span>
          <span class="option-text">${escapeHTML(opt)}</span>
        </label>`).join('');

    return `
    <div class="question-card" id="qcard-${i}">
      <div class="question-header">
        <span class="q-number">Q${i + 1}</span>
        <span class="category-badge" style="background:${colors.bg};border-color:${colors.border};color:${colors.text}">${cat}</span>
      </div>
      <p class="question-text">${escapeHTML(q.q)}</p>
      <div class="options-list">${opts}
      </div>
      <div class="explanation" id="exp-${i}" style="display:none"></div>
    </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daily Training Quiz — ${dateStr}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #F8FAFC;
      color: #1E293B;
      min-height: 100vh;
      padding: 24px 16px 48px;
    }

    .container { max-width: 740px; margin: 0 auto; }

    /* Header */
    .header {
      background: linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%);
      border-radius: 16px;
      padding: 28px 32px;
      margin-bottom: 28px;
      color: #fff;
    }
    .header-logo {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.75;
      margin-bottom: 6px;
    }
    .header h1 { font-size: 26px; font-weight: 700; margin-bottom: 4px; }
    .header-meta { font-size: 14px; opacity: 0.8; }
    .header-pills { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
    .pill {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 20px;
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 500;
    }

    /* Progress bar */
    .progress-wrap {
      background: #E2E8F0;
      border-radius: 8px;
      height: 8px;
      margin-bottom: 24px;
      overflow: hidden;
    }
    .progress-bar {
      background: linear-gradient(90deg, #2563EB, #8B5CF6);
      height: 100%;
      width: 0%;
      border-radius: 8px;
      transition: width 0.4s ease;
    }
    .progress-label {
      text-align: right;
      font-size: 12px;
      color: #64748B;
      margin-bottom: 6px;
    }

    /* Question cards */
    .question-card {
      background: #fff;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 16px;
      transition: border-color 0.2s;
    }
    .question-card.answered { border-color: #CBD5E1; }

    .question-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }
    .q-number {
      background: #1E3A5F;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 6px;
    }
    .category-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 20px;
      border: 1px solid;
    }

    .question-text {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.55;
      margin-bottom: 16px;
      color: #0F172A;
    }

    .options-list { display: flex; flex-direction: column; gap: 9px; }

    .option-label {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 11px 14px;
      border: 1.5px solid #E2E8F0;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
      user-select: none;
    }
    .option-label:hover { background: #F8FAFC; border-color: #94A3B8; }
    .option-label input[type=radio] { display: none; }
    .option-label.selected { background: #EFF6FF; border-color: #3B82F6; }

    .option-letter {
      flex-shrink: 0;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #F1F5F9;
      border: 1.5px solid #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      transition: background 0.15s, border-color 0.15s;
    }
    .option-label.selected .option-letter {
      background: #2563EB;
      border-color: #2563EB;
      color: #fff;
    }

    .option-text { font-size: 14px; line-height: 1.5; color: #334155; padding-top: 1px; }

    /* Result states */
    .option-label.correct { background: #F0FDF4 !important; border-color: #22C55E !important; }
    .option-label.correct .option-letter { background: #22C55E !important; border-color: #22C55E !important; color: #fff !important; }
    .option-label.wrong { background: #FEF2F2 !important; border-color: #EF4444 !important; }
    .option-label.wrong .option-letter { background: #EF4444 !important; border-color: #EF4444 !important; color: #fff !important; }

    /* Explanation box */
    .explanation {
      margin-top: 14px;
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.6;
    }
    .explanation.correct-exp { background: #F0FDF4; border-left: 3px solid #22C55E; color: #166534; }
    .explanation.wrong-exp { background: #FEF2F2; border-left: 3px solid #EF4444; color: #991B1B; }
    .explanation strong { font-weight: 600; }

    /* Submit button */
    .submit-wrap { text-align: center; margin: 28px 0; }
    .btn-submit {
      background: linear-gradient(135deg, #1E3A5F, #2563EB);
      color: #fff;
      border: none;
      padding: 14px 44px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
      box-shadow: 0 4px 14px rgba(37,99,235,0.3);
    }
    .btn-submit:hover { opacity: 0.92; transform: translateY(-1px); }
    .btn-submit:active { transform: translateY(0); }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* Score card */
    .score-card {
      background: #fff;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 32px;
      text-align: center;
      margin-bottom: 28px;
      display: none;
    }
    .score-card.visible { display: block; }
    .score-number {
      font-size: 56px;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 8px;
    }
    .score-number.great { color: #16A34A; }
    .score-number.good { color: #2563EB; }
    .score-number.ok { color: #D97706; }
    .score-number.low { color: #DC2626; }
    .score-label { font-size: 18px; font-weight: 600; color: #334155; margin-bottom: 6px; }
    .score-sub { font-size: 14px; color: #64748B; }

    /* Footer */
    .footer {
      text-align: center;
      font-size: 12px;
      color: #94A3B8;
      margin-top: 40px;
    }

    @media (max-width: 480px) {
      .header { padding: 20px; }
      .header h1 { font-size: 20px; }
      .question-card { padding: 18px; }
    }
  </style>
</head>
<body>
  <div class="container">

    <div class="header">
      <div class="header-logo">Truemeds Diagnostics · LabsPitch Training</div>
      <h1>Daily Training Quiz</h1>
      <div class="header-meta">${displayDate}</div>
      <div class="header-pills">
        <span class="pill">🧠 10 Questions</span>
        <span class="pill">🔬 Medical (Easy) + Sales (Medium)</span>
      </div>
    </div>

    <div class="score-card" id="scoreCard">
      <div class="score-number" id="scoreNumber"></div>
      <div class="score-label" id="scoreLabel"></div>
      <div class="score-sub" id="scoreSub"></div>
    </div>

    <div class="progress-label" id="progressLabel">0 of ${NUM_QUESTIONS} answered</div>
    <div class="progress-wrap">
      <div class="progress-bar" id="progressBar"></div>
    </div>

    <form id="quizForm" onsubmit="return false;">
      ${questionBlocks}
      <div class="submit-wrap">
        <button class="btn-submit" id="submitBtn" type="button" onclick="submitQuiz()">
          Submit Quiz
        </button>
      </div>
    </form>

    <div class="footer">
      Generated by LabsPitch Training · ${dateStr} · Open in any browser
    </div>
  </div>

  <script>
    const QUESTIONS = ${questionsJS};
    let answered = new Array(QUESTIONS.length).fill(false);
    let submitted = false;

    // Track selections
    document.querySelectorAll('.option-label').forEach(label => {
      label.addEventListener('click', function() {
        if (submitted) return;
        const input = this.querySelector('input[type=radio]');
        const qIndex = parseInt(input.name.replace('q', ''));

        // Deselect siblings
        document.querySelectorAll(\`input[name="q\${qIndex}"]\`).forEach(r => {
          r.closest('.option-label').classList.remove('selected');
        });
        this.classList.add('selected');
        input.checked = true;

        if (!answered[qIndex]) {
          answered[qIndex] = true;
          updateProgress();
        }
        document.getElementById('qcard-' + qIndex).classList.add('answered');
      });
    });

    function updateProgress() {
      const count = answered.filter(Boolean).length;
      document.getElementById('progressLabel').textContent = \`\${count} of ${NUM_QUESTIONS} answered\`;
      document.getElementById('progressBar').style.width = \`\${(count / ${NUM_QUESTIONS}) * 100}%\`;
    }

    function submitQuiz() {
      if (submitted) return;

      let correct = 0;
      const unanswered = [];

      QUESTIONS.forEach((q, i) => {
        const selected = document.querySelector(\`input[name="q\${i}"]:checked\`);
        if (!selected) { unanswered.push(i + 1); return; }

        const chosenIdx = parseInt(selected.value);
        const correctIdx = q.answer;
        const isCorrect = chosenIdx === correctIdx;
        if (isCorrect) correct++;

        // Style options
        for (let j = 0; j < 4; j++) {
          const lbl = document.getElementById(\`opt-\${i}-\${j}\`);
          if (j === correctIdx) {
            lbl.classList.add('correct');
          } else if (j === chosenIdx && !isCorrect) {
            lbl.classList.add('wrong');
          }
        }

        // Show explanation
        const expEl = document.getElementById(\`exp-\${i}\`);
        expEl.style.display = 'block';
        expEl.className = \`explanation \${isCorrect ? 'correct-exp' : 'wrong-exp'}\`;
        expEl.innerHTML = \`<strong>\${isCorrect ? '✓ Correct!' : '✗ Incorrect.'}</strong> \${q.explanation}\`;
      });

      if (unanswered.length > 0) {
        const confirm = window.confirm(\`You haven't answered question\${unanswered.length > 1 ? 's' : ''} \${unanswered.join(', ')}. Submit anyway?\`);
        if (!confirm) return;
      }

      submitted = true;
      document.getElementById('submitBtn').disabled = true;
      document.getElementById('submitBtn').textContent = 'Quiz Submitted ✓';

      // Disable all inputs
      document.querySelectorAll('.option-label').forEach(l => l.style.cursor = 'default');

      // Show score
      const scoreCard = document.getElementById('scoreCard');
      const scoreNumber = document.getElementById('scoreNumber');
      const scoreLabel = document.getElementById('scoreLabel');
      const scoreSub = document.getElementById('scoreSub');
      const attempted = answered.filter(Boolean).length;

      scoreCard.classList.add('visible');
      scoreNumber.textContent = \`\${correct}/\${attempted}\`;

      let cls = 'low', label = 'Keep practising!', sub = 'Review the explanations and try again tomorrow.';
      if (correct >= 9) { cls = 'great'; label = 'Excellent work! 🌟'; sub = 'Outstanding score — you\\'re mastering the material.'; }
      else if (correct >= 7) { cls = 'good'; label = 'Great job! 👏'; sub = 'Strong performance — review any missed questions.'; }
      else if (correct >= 5) { cls = 'ok'; label = 'Good effort! 💪'; sub = 'You\\'re building knowledge — focus on the explanations.'; }

      scoreNumber.className = \`score-number \${cls}\`;
      scoreLabel.textContent = label;
      scoreSub.textContent = sub;

      scoreCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  </script>
</body>
</html>`;
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📋 LabsPitch Daily Quiz Generator`);
  console.log(`📅 Date: ${dateStr}\n`);

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY environment variable is not set.');
    process.exit(1);
  }

  const questions = await generateQuestions();
  const html = buildHTML(questions);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, `quiz-${dateStr}.html`);
  fs.writeFileSync(outputPath, html, 'utf8');

  console.log(`\n✅ Quiz saved to: ${outputPath}`);
  console.log(`   Open it in any browser to preview.\n`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
