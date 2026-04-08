// Training context for Claude quiz generation
// This file provides a rich summary of all training content so Claude can generate
// grounded, accurate medium-difficulty questions for Truemeds Diagnostics agents.

const TRAINING_CONTEXT = `
=== TRUEMEDS DIAGNOSTICS — AGENT TRAINING CONTENT ===

You are generating quiz questions for sales agents who sell diagnostic health packages.
They need to understand both MEDICAL KNOWLEDGE (tests, parameters, conditions) and SALES SKILLS.

─────────────────────────────────────────
SECTION 1: THE FLAGSHIP PACKAGE — "PREVENTIVE COMPLETE CHECK"
─────────────────────────────────────────
93 tests across 15 groups. Key selling points:
- Comprehensive: covers blood, organs, vitamins, metabolism, immunity, urine
- Includes tests most basic packages miss: HsCRP, Iron Studies (all 4), RA Factor, Amylase, Urine R&M Extended
- Designed for annual preventive screening for adults 25+
- One fasting blood draw + urine sample
- Results in 24–48 hours

TEST GROUPS IN THE PACKAGE:
1. CBC (Complete Blood Count) — 28 parameters: Hb, WBC differential, platelets, RBC indices
2. LFT (Liver Function Test) — SGPT, SGOT, bilirubin (total/direct/indirect), albumin, globulin, A/G ratio, ALP
3. KFT Advanced (Kidney Function Test) — Creatinine, eGFR, BUN, uric acid, electrolytes
4. Thyroid Profile — TSH ultra-sensitive, T3 Total, T4 Total
5. Lipid Profile — 9 parameters: Total cholesterol, LDL, HDL, VLDL, TG, non-HDL, ratios
6. Iron Studies — Ferritin, Serum Iron, TIBC, Transferrin Saturation
7. Vitamin D Total (25-OH)
8. Vitamin B12
9. HbA1c (Glycated Haemoglobin)
10. Blood Glucose Fasting
11. CRP Quantitative
12. HsCRP (High-Sensitivity CRP)
13. RA Factor Quantitative
14. Amylase Serum
15. Urine R&M Extended — 24 parameters including glucose, protein, ketones, cells, casts

─────────────────────────────────────────
SECTION 2: KEY TEST PARAMETERS (MEDICAL KNOWLEDGE)
─────────────────────────────────────────

CBC PARAMETERS:
- Haemoglobin (Hb): Men 13.5–17.5 g/dL, Women 12.0–15.5 g/dL. Low = anaemia. High = polycythaemia.
- WBC Count: 4,000–11,000 cells/µL. Low = leucopenia (immune suppression). High = leucocytosis (infection/inflammation).
- ANC (Absolute Neutrophil Count): 1,800–7,500 cells/µL. Elevated = bacterial infection response.
- Platelets: 150,000–400,000 cells/µL. Low = thrombocytopenia (bleeding risk, seen in dengue). High = clotting risk.
- MCV: 80–100 fL. Low = microcytic (iron deficiency). High = macrocytic (B12/folate deficiency).
- RDW: 11.5–14.5%. High = anisocytosis, early marker of iron or B12 deficiency before Hb falls.

LIPID PROFILE:
- LDL: Optimal <100 mg/dL. High = builds arterial plaque (atherosclerosis). Silent for decades.
- HDL: Men >40, Women >50 mg/dL. Protective — removes cholesterol from arteries. Low HDL = accelerated atherosclerosis.
- Triglycerides: Normal <150 mg/dL. High = linked to metabolic syndrome, fatty liver, insulin resistance. Requires fasting.
- Total Cholesterol: <200 mg/dL normal. Screening value only — must interpret with full panel.

LIVER FUNCTION:
- SGPT/ALT: Men 7–56, Women 7–45 U/L. Most liver-specific enzyme. Elevated in fatty liver (NAFLD), hepatitis, alcohol.
- SGOT/AST: 10–40 U/L. Also rises in heart/muscle damage. SGOT/SGPT ratio >2 = alcoholic liver disease.
- Total Bilirubin: 0.2–1.2 mg/dL. High = jaundice. Can be pre-hepatic, hepatic, or post-hepatic.
- Albumin: 3.5–5.0 g/dL. Low = liver synthetic failure or severe malnutrition.

KIDNEY FUNCTION:
- Serum Creatinine: Men 0.7–1.3, Women 0.6–1.1 mg/dL. Rises when kidneys lose ~50% function — late marker.
- eGFR: >90 = normal. 60–89 = mildly reduced. <60 for 3+ months = Chronic Kidney Disease.
- Uric Acid: Men 3.5–7.2, Women 2.6–6.0 mg/dL. High = gout risk (crystallises in joints) and kidney stones.

THYROID:
- TSH Ultra-Sensitive: 0.4–4.0 mIU/L. High = hypothyroidism (sluggish metabolism). Low = hyperthyroidism. Changes before T3/T4 shift.
- T4 Total: 5.0–12.0 µg/dL. Confirms severity of thyroid dysfunction alongside TSH.
- T3 Total: Active thyroid hormone. Low T3 + high TSH = confirmed hypothyroidism.
- Subclinical hypothyroidism: TSH elevated but T3/T4 still normal — earliest, most treatable stage.

IRON STUDIES:
- Ferritin: Most sensitive EARLY marker. Depletes before Hb falls. Men 24–336, Women 11–307 ng/mL. Low ferritin + normal CBC = pre-anaemia iron deficiency.
- Serum Iron: Men 65–177, Women 50–170 µg/dL. Falls after ferritin depletes — Stage 2 iron deficiency.
- TIBC: 250–370 µg/dL. High TIBC = body craving iron (makes more transport protein). Classic iron deficiency pattern: high TIBC + low ferritin + low serum iron.
- Transferrin Saturation: Iron / TIBC × 100. Normal 20–50%. Low = iron deficiency, high = iron overload.

INFLAMMATION:
- CRP: <5 mg/L. Rises sharply with bacterial infections. Falls quickly when resolved.
- HsCRP: <1 mg/L = low risk, 1–3 = moderate, >3 = high cardiac risk. Detects silent vascular inflammation. 50% of heart attacks occur in people with normal LDL but high HsCRP.

DIABETES:
- HbA1c: Normal <5.7%, Pre-diabetes 5.7–6.4%, Diabetes ≥6.5%. 3-month blood sugar average. Catches post-meal spikes. More reliable than single fasting glucose.
- Blood Glucose Fasting: Normal 70–99, Pre-diabetic 100–125, Diabetic ≥126 mg/dL. Must fast 8–10 hours.
- Together HbA1c + fasting glucose cover both chronic control and acute levels.

VITAMINS:
- Vitamin D (25-OH): Deficient <20, Insufficient 20–29, Optimal 30–100 ng/mL. 70–80% of urban Indians are deficient. Not just bones — also affects immunity, mood, insulin sensitivity, muscle function.
- Vitamin B12: Deficient <200, Low-normal 200–300, Optimal 300–900 pg/mL. Most common in vegetarians. Causes macrocytic anaemia AND neuropathy (tingling/numbness). Neurological damage can precede anaemia and may be irreversible.

SPECIALIST MARKERS:
- Amylase: 28–100 U/L. Pancreatic enzyme. Elevated = pancreatic stress or pancreatitis. One of few packages to include this.
- RA Factor Quantitative: <14 IU/mL. Elevated = rheumatoid arthritis or other autoimmune. Quantitative monitors treatment response.

URINE R&M EXTENDED:
- 24 parameters including: glucose (confirms hyperglycaemia), protein (earliest sign of diabetic kidney damage), ketones, RBCs, WBCs, casts, specific gravity, pH.
- Proteinuria in a diabetic = diabetic nephropathy, act immediately.

─────────────────────────────────────────
SECTION 3: CLINICAL CONDITIONS
─────────────────────────────────────────

1. DIABETES & PRE-DIABETES
- 101 million Indians have diabetes. 136 million are pre-diabetic. Silent for 5–10 years.
- Relevant tests: HbA1c (3-month average), Fasting Glucose, KFT (kidney damage), Lipid Profile (diabetic dyslipidaemia), Urine R&M (proteinuria = earliest kidney damage sign).
- Key insight: HbA1c 5.8–6.4% = silent pre-diabetes even with normal fasting glucose.
- Pitch trigger: family history of diabetes, fatigue, frequent urination, overweight.

2. THYROID DISEASE
- 42 million Indians affected. Women 5–8× more likely. Subclinical hypothyroidism can last years.
- Hypothyroidism symptoms: fatigue, weight gain, hair loss, cold intolerance, depression.
- Hyperthyroidism symptoms: weight loss, rapid heartbeat, anxiety, heat intolerance.
- Key insight: TSH changes before T3/T4 shift — ultra-sensitive assay catches subclinical stage.
- Pitch trigger: women 25–45 with fatigue, hair loss, weight gain despite dieting.

3. FATTY LIVER DISEASE (NAFLD)
- 1 in 3 urban Indians. Most common liver condition. Completely silent in early stages.
- Progression: Simple fatty liver → NASH → Fibrosis → Cirrhosis (irreversible).
- Relevant tests: SGPT (most liver-specific), Triglycerides (fuel progression), HbA1c (insulin resistance link), Amylase (pancreatic co-involvement).
- Key insight: Fatty liver reverses with lifestyle changes in Stage 1–2 but NOT after fibrosis.
- Pitch trigger: overweight, sedentary, high-fat diet, known diabetes or high triglycerides.

4. ANAEMIA & IRON DEFICIENCY
- 57% of Indian women anaemic. 25% of men. Iron deficiency is most common cause.
- Iron deficiency stages: Stage 1 = low ferritin only; Stage 2 = low serum iron; Stage 3 = anaemia (low Hb).
- Key insight: CBC can be NORMAL while ferritin is very low — Iron Studies catches Stage 1. Ferritin depletes 6–12 months before Hb falls.
- B12 deficiency: causes macrocytic anaemia (high MCV) + neuropathy. Especially in vegetarians.
- Pitch trigger: women 18–45, vegetarians, elderly, fatigue, hair loss.

5. JOINT DISEASE & AUTOIMMUNE (RA + Gout)
- RA: immune system attacks joint lining. Caught early = treatable, excellent outcomes. Late = permanent joint damage.
- Gout: uric acid crystals in joints — sudden severe pain, usually big toe or knee.
- Relevant tests: RA Factor Quantitative, CRP, HsCRP, Uric Acid.
- Key insight: RA Factor >40 IU/mL + morning stiffness >30 min = strong RA suspicion. Uric acid >9 mg/dL = very high gout risk.
- Pitch trigger: morning stiffness lasting >30 minutes, symmetrical hand/foot joint pain, women 30+.

6. CARDIAC RISK & METABOLIC SYNDROME
- India's #1 killer. Indians have heart attacks 10 years earlier than Western populations.
- Silent for 20–30 years. 50% of heart attacks occur in people with NORMAL cholesterol but elevated HsCRP.
- Metabolic syndrome: high TG + low HDL + high glucose + high BP + abdominal obesity — dramatically accelerates atherosclerosis.
- Relevant tests: Lipid Profile (full 9 parameters), HsCRP (silent vascular inflammation), HbA1c (diabetes multiplies cardiac risk 2–4×), CBC (anaemia increases cardiac workload).
- Key insight: LDL alone is not enough — HsCRP is essential for complete cardiac risk.
- Pitch trigger: men 35+, sedentary, family history of heart disease, smoker, post-menopausal women.

─────────────────────────────────────────
SECTION 4: SALES SKILLS & TECHNIQUES
─────────────────────────────────────────

CONSULTATIVE SELLING (5 questions to ask before pitching):
1. "What health concerns have you noticed lately?" — identify symptoms
2. "Is there any family history of diabetes, heart disease, or thyroid issues?" — risk flag
3. "When did you last get a comprehensive blood test?" — establish gap
4. "Are you currently taking any medications?" — identify monitoring needs (e.g., Metformin depletes B12)
5. "What does your typical diet look like — vegetarian?" — tailor pitch (veg = B12/iron risk)

KEY SALES PRINCIPLE: Diagnose before you prescribe. Ask 3–4 questions before mentioning any test. Show you understand their specific situation.

OBJECTION HANDLING:
- "It's too expensive": Frame as cost per test (~₹5–8 per parameter for 93 tests vs ₹300–500 per individual test). Calculate what 93 individual tests would cost. Offer value context — one early diagnosis saves ₹50,000+ in treatment.
- "My doctor hasn't asked for this": "This is a preventive package — it's designed to catch things before you need a doctor to ask for it. The doctor reacts to symptoms; this package finds problems before symptoms appear."
- "I feel completely fine": "That's exactly who this is for. Fatty liver, pre-diabetes, and hypothyroidism have zero symptoms for years. Most people who've had heart attacks felt completely fine the week before."
- "I'll do it later": "Most people who delay preventive tests do so until a symptom forces them to. By then, the early reversible stage has passed. Fatty liver reverses in Stage 1 — not Stage 3."
- "I already did a test recently": Ask what tests were included. Most basic tests miss HsCRP, Iron Studies, RA Factor, Amylase — use the gap analysis approach.

CLOSING TECHNIQUES:
- Assumptive close: "Shall I book your appointment for morning so you can fast from tonight?"
- Urgency: "We have slots available tomorrow — fasting tests are better done on weekdays when the lab is less busy."
- Fear-of-missing: "The three most common silent conditions in India — fatty liver, pre-diabetes, thyroid — are all reversible if caught in Stage 1. Caught in Stage 3, they're not."
- Social proof: "We've had agents tell us 1 in 4 customers who do this test for the first time discover a value outside normal range — usually thyroid or vitamin deficiency."

VALUE PROPOSITION:
- 93 tests in one draw vs buying individually (≥3× more expensive individually)
- Covers what most basic packages miss: HsCRP, Iron Studies, RA Factor, Amylase
- Designed for preventive use, not reactive — finds the problem before it needs treatment
- Annual monitoring: shows trends year-over-year

ETHICAL SELLING:
- Never overstate urgency beyond what's medically accurate
- Never diagnose — say "this value is outside the normal range" not "you have diabetes"
- Always recommend doctor consultation for abnormal results
- Focus on empowering the customer, not creating fear

─────────────────────────────────────────
SECTION 5: TEST PREPARATION REQUIREMENTS
─────────────────────────────────────────
- FASTING REQUIRED (8–10 hours, water only): Fasting Glucose, Lipid Profile, Triglycerides, Iron Studies
- NO FASTING REQUIRED: CBC, LFT, KFT, Thyroid, HbA1c, CRP, HsCRP, RA Factor, Amylase, Vitamin D, B12
- SAMPLE TYPES: Blood (most tests) + Urine (Urine R&M Extended) — both collected at single visit
- TIMING: Morning preferred for fasting tests. Avoid strenuous exercise 24 hours before.
- MEDICATIONS: Biotin supplements interfere with Vitamin D and B12 assays — stop 48 hours before.

─────────────────────────────────────────
SECTION 6: KEY STATISTICS & TALKING POINTS
─────────────────────────────────────────
- 101 million Indians have diabetes; 136 million are pre-diabetic
- 42 million Indians have thyroid disorders; women 5–8× more affected
- 1 in 3 urban Indians has fatty liver disease
- 57% of Indian women are anaemic; 25% of men
- 70–80% of urban Indians are Vitamin D deficient
- 50% of heart attacks occur in people with normal cholesterol (HsCRP is the missing piece)
- Indians have heart attacks 10 years earlier than Western populations
- Fatty liver is now India's most common liver condition (more common than alcohol-related)
- B12 deficiency affects 70–80% of vegetarians not on supplements
- Metformin (most common diabetes drug) reduces B12 absorption — all diabetics on Metformin should test B12 annually

=== END OF TRAINING CONTENT ===
`;

export { TRAINING_CONTEXT };
