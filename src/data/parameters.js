// 30 key parameter deep-dives agents need to know cold

export const PARAMETERS = [
  // ── CBC ─────────────────────────────────────────────────────────────────────
  {
    id: 'haemoglobin',
    name: 'Haemoglobin (Hb)',
    group: 'CBC',
    unit: 'g/dL',
    normalRange: 'Men: 13.5–17.5 | Women: 12.0–15.5',
    low: {
      label: 'Low → Anaemia',
      meaning: 'Not enough oxygen-carrying protein in the blood. Severity: mild (10–12), moderate (8–10), severe (<8).',
    },
    high: {
      label: 'High → Polycythaemia',
      meaning: 'Too many red cells — can thicken blood and raise clot risk. Also seen in dehydration (false elevation).',
    },
    whyItMatters: 'Haemoglobin is the most direct measure of anaemia. It\'s what your red blood cells carry oxygen with. Low Hb = less oxygen to every organ — causing fatigue, breathlessness, and brain fog.',
    customerScript: '"Your haemoglobin tells us how much oxygen your blood is carrying. Think of it like the fuel level in your car — if it\'s low, your whole system slows down. That\'s why you feel tired. We\'ll know exactly where you stand."',
  },
  {
    id: 'wbc',
    name: 'Total WBC Count',
    group: 'CBC',
    unit: 'cells/µL (×10³)',
    normalRange: '4,000–11,000 cells/µL',
    low: {
      label: 'Low → Leucopenia',
      meaning: 'Reduced immune defence. Can occur with viral infections, bone marrow suppression, or certain medications (chemotherapy, some antibiotics).',
    },
    high: {
      label: 'High → Leucocytosis',
      meaning: 'Active immune response — most commonly bacterial infection, inflammation, or stress. Very high counts may indicate blood disorders.',
    },
    whyItMatters: 'White blood cells are your immune army. The total count tells you if the immune system is active (fighting something) or suppressed (vulnerable). The differential (neutrophils vs. lymphocytes) tells you what kind of threat.',
    customerScript: '"Your white blood cell count shows us how active your immune system is right now. If it\'s elevated, it means your body is fighting something — even if you feel okay. We also break it down by cell type so we know exactly what\'s going on."',
  },
  {
    id: 'neutrophils',
    name: 'Absolute Neutrophil Count (ANC)',
    group: 'CBC',
    unit: 'cells/µL',
    normalRange: '1,800–7,500 cells/µL',
    low: {
      label: 'Low → Neutropenia',
      meaning: 'High infection risk. Common with viral illness, chemotherapy, or bone marrow problems.',
    },
    high: {
      label: 'High → Neutrophilia',
      meaning: 'Bacterial infection, physical stress, steroid use, or acute inflammation. The body\'s primary bacterial defence is activated.',
    },
    whyItMatters: 'Neutrophils are the first responders to bacterial infection. An elevated ANC is the CBC\'s way of saying "there is a bacterial threat." Combine with CRP to assess severity.',
    customerScript: '"Neutrophils are like your body\'s rapid response team against bacteria. If this number is high, it means your immune system is actively fighting a bacterial infection — even one you might not have noticed yet."',
  },
  {
    id: 'platelets',
    name: 'Platelet Count',
    group: 'CBC',
    unit: 'cells/µL (×10³)',
    normalRange: '150,000–400,000 cells/µL',
    low: {
      label: 'Low → Thrombocytopenia',
      meaning: 'Risk of excessive bleeding. Common in dengue fever, immune disorders, liver disease, or bone marrow suppression.',
    },
    high: {
      label: 'High → Thrombocytosis',
      meaning: 'Risk of abnormal clotting. Can be reactive (after infection, iron deficiency, surgery) or indicate a blood disorder.',
    },
    whyItMatters: 'Platelets are the clotting cells. A dangerously low count is a medical emergency (spontaneous bleeding). A high count can cause abnormal clots in blood vessels.',
    customerScript: '"Platelets are what make your blood clot when you get a cut. If the count is too low, you bruise or bleed easily — we\'d see this in conditions like dengue. Too high, and blood can clot where it shouldn\'t."',
  },
  {
    id: 'mcv',
    name: 'MCV (Mean Corpuscular Volume)',
    group: 'CBC',
    unit: 'fL (femtolitres)',
    normalRange: '80–100 fL',
    low: {
      label: 'Low → Microcytic anaemia',
      meaning: 'Small red blood cells — hallmark of iron deficiency. Also seen in thalassaemia.',
    },
    high: {
      label: 'High → Macrocytic anaemia',
      meaning: 'Large red blood cells — classic in Vitamin B12 or folate deficiency. Also with liver disease, alcohol use.',
    },
    whyItMatters: 'MCV is the "size" of red blood cells. It turns anaemia from a diagnosis into a direction — small cells point to iron, large cells point to B12/folate. Essential for knowing what supplement to recommend.',
    customerScript: '"MCV tells us the size of your red blood cells. If they\'re too small, it usually means iron deficiency. If they\'re too large, it often means low B12 or folate. The size tells us the cause — not just the symptom."',
  },
  {
    id: 'rdw',
    name: 'RDW (Red Cell Distribution Width)',
    group: 'CBC',
    unit: '%',
    normalRange: '11.5–14.5%',
    low: {
      label: 'Low → Uniformly sized cells (rarely a concern)',
      meaning: 'All red cells are similar in size.',
    },
    high: {
      label: 'High → Anisocytosis',
      meaning: 'Red blood cells vary significantly in size. Classic early marker of iron deficiency and B12 deficiency — often rises before haemoglobin falls.',
    },
    whyItMatters: 'RDW is the "consistency" of red cell sizes. High RDW is often the earliest CBC signal of nutritional deficiency — appearing before the patient becomes truly anaemic. A high RDW with normal Hb = early deficiency, catch it now.',
    customerScript: '"RDW tells us if your red blood cells are all the same size or if some are bigger and some smaller. When it\'s uneven, it usually means the body is running low on iron or B12 — sometimes months before proper anaemia develops."',
  },

  // ── LIPID PROFILE ────────────────────────────────────────────────────────────
  {
    id: 'ldl',
    name: 'LDL Cholesterol (Bad)',
    group: 'Lipid Profile',
    unit: 'mg/dL',
    normalRange: 'Optimal: <100 | Near optimal: 100–129 | Borderline: 130–159 | High: ≥160',
    low: {
      label: 'Low → Generally good',
      meaning: 'Very low LDL (<50) sometimes seen with malnutrition or certain medications. Not a common concern.',
    },
    high: {
      label: 'High → Cardiovascular risk',
      meaning: 'LDL deposits in artery walls forming plaques — atherosclerosis. Primary driver of heart disease and stroke.',
    },
    whyItMatters: 'LDL is the cholesterol that sticks to artery walls and builds up plaque over decades. The higher the LDL, the faster the arteries narrow — silently. No symptoms until a blockage causes a heart attack or stroke.',
    customerScript: '"LDL is the cholesterol that sticks to your artery walls over time — like rust building up in a pipe. It\'s completely silent for years. By the time you feel it, the damage is done. This test gives you the number before that happens."',
  },
  {
    id: 'hdl',
    name: 'HDL Cholesterol (Good)',
    group: 'Lipid Profile',
    unit: 'mg/dL',
    normalRange: 'Men: >40 | Women: >50 | Optimal: >60',
    low: {
      label: 'Low → Increased cardiac risk',
      meaning: 'HDL removes cholesterol from arteries. Low HDL means less cleanup — allowing LDL to accumulate faster. Strong independent cardiac risk factor.',
    },
    high: {
      label: 'High → Protective',
      meaning: 'High HDL is generally protective. Very high HDL (>80) is usually benign.',
    },
    whyItMatters: 'HDL is the "cleanup crew" — it carries cholesterol away from arteries back to the liver for processing. Low HDL accelerates atherosclerosis even when LDL looks acceptable.',
    customerScript: '"HDL is your good cholesterol — it actually cleans your arteries. Think of it as the garbage truck for bad cholesterol. Low HDL means less cleaning, which is just as dangerous as having too much bad cholesterol."',
  },
  {
    id: 'triglycerides',
    name: 'Triglycerides',
    group: 'Lipid Profile',
    unit: 'mg/dL',
    normalRange: 'Normal: <150 | Borderline: 150–199 | High: 200–499 | Very High: ≥500',
    low: {
      label: 'Low → Generally fine',
      meaning: 'Low triglycerides are not a concern.',
    },
    high: {
      label: 'High → Metabolic syndrome, cardiac risk',
      meaning: 'High triglycerides are strongly linked to metabolic syndrome, fatty liver, insulin resistance, and pancreatitis at very high levels.',
    },
    whyItMatters: 'Triglycerides are the blood fats that spike after meals (which is why Lipid Profile requires fasting). Chronically high triglycerides are a red flag for metabolic syndrome — the cluster of conditions that precede diabetes and heart disease.',
    customerScript: '"Triglycerides are the fat molecules in your blood — they spike after eating, which is why we test after fasting. If they\'re consistently high, it means your body isn\'t processing fats well — a sign of metabolic stress."',
  },

  // ── LFT ─────────────────────────────────────────────────────────────────────
  {
    id: 'sgpt',
    name: 'SGPT / ALT (Alanine Aminotransferase)',
    group: 'LFT',
    unit: 'U/L',
    normalRange: 'Men: 7–56 | Women: 7–45',
    low: {
      label: 'Low → Normal or not clinically relevant',
      meaning: 'Low ALT is not a concern.',
    },
    high: {
      label: 'High → Liver cell damage',
      meaning: 'SGPT leaks from damaged liver cells into the blood. Elevated in fatty liver (NAFLD), hepatitis, alcohol damage, or drug toxicity. Highly liver-specific.',
    },
    whyItMatters: 'SGPT is the most liver-specific enzyme — it\'s the first to rise when liver cells are stressed or dying. Fatty liver is now present in 1 in 3 urban Indians. SGPT is how you catch it silently, before cirrhosis develops.',
    customerScript: '"SGPT is an enzyme that sits inside liver cells. When the liver is stressed — from fatty food, alcohol, or medication — these cells leak SGPT into your blood. Elevated SGPT means your liver is under pressure, even if you feel nothing."',
  },
  {
    id: 'sgot',
    name: 'SGOT / AST (Aspartate Aminotransferase)',
    group: 'LFT',
    unit: 'U/L',
    normalRange: '10–40 U/L',
    low: {
      label: 'Low → Not clinically significant',
      meaning: 'Low values are normal.',
    },
    high: {
      label: 'High → Liver or muscle damage',
      meaning: 'SGOT rises with liver damage but also with heart attack and muscle injury. An SGOT/SGPT ratio >2 often suggests alcoholic liver disease.',
    },
    whyItMatters: 'SGOT and SGPT together tell a richer story than either alone. When SGOT is disproportionately higher than SGPT, it points specifically toward alcohol-related liver damage.',
    customerScript: '"SGOT is similar to SGPT but less specific — it also comes from heart and muscle cells. We look at the two together. If SGOT is much higher than SGPT, it often points to alcohol affecting the liver, even in people who drink "only socially"."',
  },
  {
    id: 'bilirubin',
    name: 'Total Bilirubin',
    group: 'LFT',
    unit: 'mg/dL',
    normalRange: '0.2–1.2 mg/dL',
    low: {
      label: 'Low → Not significant',
      meaning: 'Low bilirubin is not a concern.',
    },
    high: {
      label: 'High → Jaundice risk',
      meaning: 'Bilirubin is a breakdown product of haemoglobin. Elevated levels cause yellowing of skin and eyes (jaundice). Can be pre-hepatic (haemolysis), hepatic (liver disease), or post-hepatic (bile duct blockage).',
    },
    whyItMatters: 'Bilirubin levels — total, direct, and indirect — together tell you where in the system the problem is: red blood cells breaking down too fast, the liver failing to process it, or bile being blocked from draining.',
    customerScript: '"Bilirubin is what makes people go yellow. It\'s a waste product from old red blood cells — normally processed by the liver and excreted. If it builds up, the skin and eyes turn yellow. Even mildly elevated bilirubin tells us the liver is under strain."',
  },
  {
    id: 'albumin',
    name: 'Albumin',
    group: 'LFT',
    unit: 'g/dL',
    normalRange: '3.5–5.0 g/dL',
    low: {
      label: 'Low → Liver synthetic failure or malnutrition',
      meaning: 'Low albumin means the liver has lost significant capacity to produce proteins. Causes fluid leakage into tissues (oedema, ascites). Also seen in severe malnutrition and kidney protein loss.',
    },
    high: {
      label: 'High → Usually dehydration',
      meaning: 'Concentrated blood due to dehydration raises albumin artificially.',
    },
    whyItMatters: 'Albumin is the liver\'s "output product." When the liver is chronically damaged (cirrhosis), albumin is one of the first proteins to drop. Low albumin is a sign of advanced, not early, liver disease — making it a serious finding.',
    customerScript: '"Albumin is a protein your liver makes to maintain fluid balance in your blood. When the liver is really struggling — not just stressed, but significantly damaged — albumin falls. It\'s one of the signs we use to measure how hard the liver is still working."',
  },

  // ── KFT ─────────────────────────────────────────────────────────────────────
  {
    id: 'creatinine',
    name: 'Serum Creatinine',
    group: 'KFT',
    unit: 'mg/dL',
    normalRange: 'Men: 0.7–1.3 | Women: 0.6–1.1',
    low: {
      label: 'Low → Low muscle mass (not usually a concern)',
      meaning: 'Seen in elderly patients or those with very low muscle mass.',
    },
    high: {
      label: 'High → Reduced kidney filtration',
      meaning: 'Creatinine is a waste product of muscle metabolism. Kidneys normally filter it out. Rising creatinine = kidneys filtering less efficiently. However, it\'s insensitive — kidneys can lose 50% function before creatinine rises significantly.',
    },
    whyItMatters: 'Creatinine is the most commonly used kidney marker — but it is a late indicator. That\'s why the Advanced KFT adds eGFR, which is a more sensitive and adjusted measure of kidney function.',
    customerScript: '"Creatinine is a waste product your muscles produce that the kidneys filter out. If the level rises in your blood, it means the kidneys aren\'t filtering as well as they should. But here\'s the catch — by the time creatinine rises noticeably, you\'ve already lost 40–50% of kidney function. That\'s why we also calculate eGFR."',
  },
  {
    id: 'egfr',
    name: 'eGFR (Estimated Glomerular Filtration Rate)',
    group: 'KFT',
    unit: 'mL/min/1.73m²',
    normalRange: '>90 = Normal | 60–89 = Mildly reduced | 45–59 = CKD Stage 3a | <60 for 3+ months = CKD',
    low: {
      label: 'Low → Reduced kidney filtering capacity',
      meaning: 'eGFR <60 for 3+ months = Chronic Kidney Disease. <30 = severe CKD. <15 = kidney failure, dialysis territory.',
    },
    high: {
      label: 'High → Not clinically significant',
      meaning: 'eGFR >90 is normal. Very high values don\'t have additional clinical meaning.',
    },
    whyItMatters: 'eGFR is the gold standard kidney function metric. Unlike creatinine, it corrects for age, sex, and body size — so a "normal-looking" creatinine in an elderly patient can still show a very low eGFR. This makes it far more sensitive.',
    customerScript: '"eGFR is the most accurate measure of kidney function — it tells us how many millilitres of blood your kidneys clean per minute. Normal is above 90. If it\'s dropping, we can catch it early and take action before there\'s permanent damage."',
  },
  {
    id: 'uricacid',
    name: 'Uric Acid',
    group: 'KFT',
    unit: 'mg/dL',
    normalRange: 'Men: 3.5–7.2 | Women: 2.6–6.0',
    low: {
      label: 'Low → Rarely significant',
      meaning: 'Low uric acid is not usually a clinical concern.',
    },
    high: {
      label: 'High → Gout, kidney stones',
      meaning: 'Uric acid crystallises in joints (gout: severe joint pain) and kidneys (uric acid stones). Also a marker of metabolic syndrome.',
    },
    whyItMatters: 'Uric acid is the waste product of purines (found in red meat, shellfish, alcohol). When it crystallises in joints, gout attacks are excruciatingly painful. Chronically high uric acid also increases risk of kidney stone formation.',
    customerScript: '"Uric acid is a waste product that can crystallise if it builds up too much. When it settles in joints — usually the big toe or knee — it causes gout: a sudden, very intense joint pain. When it crystallises in the kidney, it causes kidney stones. This test catches the level before either of those happens."',
  },

  // ── THYROID ──────────────────────────────────────────────────────────────────
  {
    id: 'tsh',
    name: 'TSH (Thyroid-Stimulating Hormone)',
    group: 'Thyroid',
    unit: 'mIU/L',
    normalRange: '0.4–4.0 mIU/L (ultra-sensitive range)',
    low: {
      label: 'Low → Hyperthyroidism or over-medication',
      meaning: 'Low TSH means the pituitary doesn\'t need to drive the thyroid — the thyroid is already overproducing. Causes rapid heartbeat, weight loss, anxiety, heat intolerance.',
    },
    high: {
      label: 'High → Hypothyroidism',
      meaning: 'High TSH means the pituitary is trying hard to stimulate an underperforming thyroid. Classic symptoms: fatigue, weight gain, hair loss, cold intolerance, depression.',
    },
    whyItMatters: 'TSH is the most sensitive thyroid marker — it changes before T3 and T4 shift outside normal range. The ultra-sensitive assay catches subclinical hypothyroidism: TSH elevated but T3/T4 still normal. This is the earliest, most treatable stage.',
    customerScript: '"TSH is the signal your brain sends to your thyroid telling it how hard to work. If TSH is high, the brain is screaming at a sluggish thyroid — which means your metabolism is slowing down even if your thyroid hormone levels look okay. It\'s the earliest warning sign."',
  },
  {
    id: 't4',
    name: 'T4 Total (Thyroxine)',
    group: 'Thyroid',
    unit: 'µg/dL',
    normalRange: '5.0–12.0 µg/dL',
    low: {
      label: 'Low → Hypothyroidism confirmed',
      meaning: 'Low T4 with high TSH = confirmed hypothyroidism. The thyroid is failing to produce enough hormone despite the pituitary\'s demands.',
    },
    high: {
      label: 'High → Hyperthyroidism confirmed',
      meaning: 'High T4 with low TSH = confirmed hyperthyroidism. Causes metabolic overactivity.',
    },
    whyItMatters: 'T4 is the main hormone produced by the thyroid. Together with TSH, it confirms whether the thyroid is truly over or underactive — or just subclinically stressed (TSH abnormal but T4 still in range).',
    customerScript: '"T4 is the main hormone your thyroid makes. Think of TSH as the thermostat and T4 as the actual room temperature. You need both to understand whether your thyroid is genuinely underperforming or just borderline."',
  },

  // ── IRON STUDIES ─────────────────────────────────────────────────────────────
  {
    id: 'ferritin',
    name: 'Serum Ferritin',
    group: 'Iron Studies',
    unit: 'ng/mL',
    normalRange: 'Men: 24–336 | Women: 11–307 | Optimal (women): >50',
    low: {
      label: 'Low → Iron stores depleted',
      meaning: 'The body\'s iron reserve is exhausted. This is the earliest stage of iron deficiency — before serum iron falls, before haemoglobin falls. Symptoms: fatigue, hair loss, reduced exercise tolerance.',
    },
    high: {
      label: 'High → Iron overload or inflammation',
      meaning: 'Very high ferritin can mean iron overload (haemochromatosis — damages liver, heart, pancreas). Also rises as an acute-phase protein in inflammation and infection, masking actual iron status.',
    },
    whyItMatters: 'Ferritin is the most sensitive early marker of iron deficiency — depleting months before haemoglobin falls. Most importantly, CBC can be completely normal while ferritin is low. This is why Iron Studies is a separate test from CBC.',
    customerScript: '"Ferritin is your iron savings account — it\'s the stored iron in your body. CBC only tells us if you\'re already anaemic. Ferritin tells us if you\'re running low before the problem fully develops. A woman can have normal haemoglobin but very low ferritin — and still be feeling exhausted and losing hair because of iron deficiency."',
  },
  {
    id: 'serumIron',
    name: 'Serum Iron',
    group: 'Iron Studies',
    unit: 'µg/dL',
    normalRange: 'Men: 65–177 | Women: 50–170',
    low: {
      label: 'Low → Iron deficiency (Stage 2)',
      meaning: 'After ferritin stores deplete, serum iron starts to fall. Iron deficiency is now in Stage 2 — more symptomatic.',
    },
    high: {
      label: 'High → Iron overload or haemolysis',
      meaning: 'Excessive serum iron is seen in haemochromatosis, haemolysis (red cell breakdown), or iron supplement overdose.',
    },
    whyItMatters: 'Serum iron is the current circulating iron level. Unlike ferritin (stores), serum iron fluctuates with meals and time of day — which is why morning fasting sampling is preferred. It falls after ferritin, making it a later indicator of deficiency.',
    customerScript: '"Serum iron is the iron currently in your blood right now — not what\'s stored. It goes up and down with meals and varies during the day. We look at it alongside ferritin and TIBC to get the full picture of your iron status."',
  },
  {
    id: 'tibc',
    name: 'TIBC (Total Iron Binding Capacity)',
    group: 'Iron Studies',
    unit: 'µg/dL',
    normalRange: '250–370 µg/dL',
    low: {
      label: 'Low → Anaemia of chronic disease, iron overload',
      meaning: 'The body is not producing transport proteins for iron — seen in chronic inflammation or iron overload (no need for more binding capacity).',
    },
    high: {
      label: 'High → Iron deficiency',
      meaning: 'The body creates more iron transport protein (transferrin) when it\'s starved of iron — trying to capture every available iron molecule. High TIBC with low iron = iron deficiency.',
    },
    whyItMatters: 'TIBC and ferritin together form the classic iron deficiency pattern: high TIBC + low ferritin + low serum iron = iron deficiency anaemia. This trinity confirms the diagnosis when CBC alone is still normal.',
    customerScript: '"TIBC measures how much iron-carrying capacity your blood has available. When you\'re iron deficient, your body increases this capacity — it\'s like adding more empty trucks because there\'s so little iron to carry. High TIBC is actually your body\'s way of screaming for more iron."',
  },

  // ── INFLAMMATION ──────────────────────────────────────────────────────────────
  {
    id: 'crp',
    name: 'CRP (C-Reactive Protein)',
    group: 'Inflammation',
    unit: 'mg/L',
    normalRange: '<5 mg/L',
    low: {
      label: 'Normal → No significant acute inflammation',
      meaning: 'No active infection or major inflammatory process.',
    },
    high: {
      label: 'High → Active inflammation or infection',
      meaning: 'CRP rises sharply with bacterial infections (high elevation), viral infections (mild elevation), autoimmune flares, and inflammatory conditions. Falls quickly when the cause resolves.',
    },
    whyItMatters: 'CRP is the body\'s general alarm for inflammation. It rises within hours of an infection or inflammatory trigger and falls rapidly when resolved — making it useful for both diagnosis and monitoring treatment response.',
    customerScript: '"CRP is your body\'s alarm bell for inflammation. Even if you feel okay, an elevated CRP means your immune system is actively fighting something. It rises within hours of an infection — and drops just as fast once the threat is resolved."',
  },
  {
    id: 'hscrp',
    name: 'HsCRP (High-Sensitivity CRP)',
    group: 'Inflammation',
    unit: 'mg/L',
    normalRange: '<1 mg/L = Low risk | 1–3 = Moderate risk | >3 = High cardiac risk',
    low: {
      label: 'Low (<1) → Low cardiovascular inflammatory risk',
      meaning: 'No significant vascular inflammation detected.',
    },
    high: {
      label: 'High (>3) → Elevated cardiac risk',
      meaning: 'Silent vascular inflammation — strong independent predictor of heart attack and stroke, even with normal cholesterol. Also elevated in metabolic syndrome.',
    },
    whyItMatters: 'HsCRP measures CRP at 10× the sensitivity of standard CRP. It detects low-grade chronic inflammation invisible to regular CRP. The JUPITER trial showed elevated HsCRP predicted cardiac events in patients with normal LDL — validating it as an independent cardiac risk marker.',
    customerScript: '"HsCRP is like a much more sensitive version of CRP. It detects tiny levels of inflammation in your arteries — inflammation that\'s quietly damaging your heart and blood vessels years before any symptom appears. Half of all heart attacks happen in people with normal cholesterol but elevated HsCRP."',
  },

  // ── DIABETES ─────────────────────────────────────────────────────────────────
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Haemoglobin)',
    group: 'Diabetes',
    unit: '%',
    normalRange: 'Normal: <5.7% | Pre-diabetic: 5.7–6.4% | Diabetic: ≥6.5%',
    low: {
      label: 'Low → Well-controlled or no diabetes',
      meaning: 'Below 5.7% is normal. Very low values in known diabetics may suggest over-medication (hypoglycaemia risk).',
    },
    high: {
      label: 'High → Pre-diabetes or diabetes',
      meaning: '5.7–6.4% = pre-diabetes (action required). ≥6.5% = diabetes by WHO criteria. The higher the HbA1c, the more time blood sugar was elevated — and the greater the organ damage risk.',
    },
    whyItMatters: 'HbA1c reflects average blood sugar over 90 days — not just today\'s reading. A patient can fast 12 hours and show normal glucose but have an elevated HbA1c from chronic post-meal spikes. It\'s the most reliable single test for diagnosing and monitoring diabetes.',
    customerScript: '"HbA1c is like a 3-month report card for your blood sugar. Fasting glucose only shows us the last 12 hours. HbA1c shows us the full picture — including all the post-meal spikes you might not even know you\'re having. It\'s the reason someone can have a perfectly normal fasting glucose but still be pre-diabetic."',
  },
  {
    id: 'glucose',
    name: 'Blood Glucose Fasting',
    group: 'Diabetes',
    unit: 'mg/dL',
    normalRange: 'Normal: 70–99 | Impaired Fasting: 100–125 | Diabetic: ≥126',
    low: {
      label: 'Low → Hypoglycaemia',
      meaning: 'Blood sugar below 70 mg/dL. Symptoms: sweating, trembling, confusion. Dangerous if severe. Seen with excess insulin, skipped meals, alcohol.',
    },
    high: {
      label: 'High → Diabetes or pre-diabetes',
      meaning: '100–125 mg/dL = impaired fasting glucose (pre-diabetic). ≥126 mg/dL = diabetic. Requires HbA1c confirmation.',
    },
    whyItMatters: 'Fasting glucose is the most direct measure of diabetes. It\'s used alongside HbA1c because each catches what the other misses: fasting glucose catches acute decompensation; HbA1c reveals chronic control.',
    customerScript: '"Fasting glucose tells us your baseline blood sugar after 8–10 hours without food. Think of it as your blood sugar in its resting state. If it\'s high even at rest, your body\'s insulin response is failing. We pair it with HbA1c for the complete picture."',
  },

  // ── VITAMINS ──────────────────────────────────────────────────────────────────
  {
    id: 'vitd',
    name: 'Vitamin D Total (25-OH)',
    group: 'Vitamins',
    unit: 'ng/mL',
    normalRange: 'Deficient: <20 | Insufficient: 20–29 | Optimal: 30–100',
    low: {
      label: 'Low → Vitamin D deficiency',
      meaning: 'Weakened bones, impaired immunity, fatigue, low mood, muscle weakness, and increased insulin resistance. 70–80% of urban Indians are deficient.',
    },
    high: {
      label: 'High → Vitamin D toxicity (>100)',
      meaning: 'Rare with food or sun exposure. Only from excessive supplementation. Can cause calcium toxicity.',
    },
    whyItMatters: 'Vitamin D is not just a "bone vitamin." It modulates immunity, mood (serotonin synthesis), insulin sensitivity, and muscle function. Deficiency is epidemic in urban India — even in people who work outdoors — because melanin-rich skin + air pollution + indoor work all reduce synthesis.',
    customerScript: '"Vitamin D deficiency is India\'s silent epidemic — even outdoor workers are often deficient because of pollution and skin type. It\'s not just about bones. Low Vitamin D causes fatigue, low immunity (frequent infections), low mood, and even makes diabetes harder to control."',
  },
  {
    id: 'vitb12',
    name: 'Vitamin B12 (Cyanocobalamin)',
    group: 'Vitamins',
    unit: 'pg/mL',
    normalRange: 'Deficient: <200 | Low-normal: 200–300 | Optimal: 300–900',
    low: {
      label: 'Low → B12 deficiency',
      meaning: 'Causes macrocytic anaemia and — critically — peripheral neuropathy (tingling, numbness in hands/feet), cognitive decline, and fatigue. Neurological damage can precede anaemia by months to years and may be irreversible if untreated.',
    },
    high: {
      label: 'High → Usually excess supplementation or liver disease',
      meaning: 'Excess B12 from supplements is not usually harmful. Very high values (>1000) without supplementation may warrant liver investigation.',
    },
    whyItMatters: 'B12 deficiency is irreversible in its neurological form. It\'s most common in vegetarians/vegans, elderly, and Metformin users (the drug reduces B12 absorption). Testing B12 annually is essential for all these groups.',
    customerScript: '"B12 is critical for your nerves and blood. It\'s found only in animal products — so vegetarians are at very high risk of being deficient without knowing it. The scary part is that B12 can damage your nerves silently for years before anaemia shows up. That nerve damage can become permanent if we don\'t catch it early."',
  },

  // ── SPECIALIST ────────────────────────────────────────────────────────────────
  {
    id: 'amylase',
    name: 'Amylase Serum',
    group: 'Pancreas',
    unit: 'U/L',
    normalRange: '28–100 U/L',
    low: {
      label: 'Low → Not usually clinically significant',
      meaning: 'Occasionally seen in advanced chronic pancreatitis when pancreatic tissue is exhausted.',
    },
    high: {
      label: 'High → Pancreatic stress or pancreatitis',
      meaning: 'Serum amylase rises 2–12 hours after pancreatic injury and peaks at 12–72 hours. 3× upper limit or more strongly suggests pancreatitis. Also rises with salivary gland issues and bowel obstruction.',
    },
    whyItMatters: 'The pancreas is the "missing organ" in most preventive packages. Amylase is the enzyme that flags pancreatic stress early. Pancreatitis can be triggered by gallstones, alcohol, or unknown causes — and can be life-threatening if missed.',
    customerScript: '"Most health packages skip the pancreas entirely — this one doesn\'t. Amylase is an enzyme the pancreas produces. If the pancreas is inflamed or under stress, amylase leaks into the blood. We catch it here, before it becomes an emergency."',
  },
  {
    id: 'ra',
    name: 'RA Factor Quantitative',
    group: 'Autoimmune',
    unit: 'IU/mL',
    normalRange: '<14 IU/mL',
    low: {
      label: 'Negative → RA antibodies not detected',
      meaning: 'RA Factor not detected. Note: 20–30% of RA patients are "seronegative" — negative RF but still have RA.',
    },
    high: {
      label: 'High → Rheumatoid arthritis, autoimmune conditions',
      meaning: 'Elevated RF supports RA diagnosis. Higher values often correlate with more aggressive disease. Also elevated in Sjögren\'s syndrome, lupus, and other autoimmune conditions.',
    },
    whyItMatters: 'Quantitative RF gives a number, not just positive/negative. This matters for monitoring — a falling RF value over time suggests treatment is working. A rising value despite treatment means the disease is progressing.',
    customerScript: '"RA Factor is an antibody that appears in the blood when the immune system attacks the joints. In rheumatoid arthritis, the immune system mistakes joint lining as the enemy. The quantitative test gives us a number — not just a yes or no — so we can track whether the condition is getting better or worse over time."',
  },
];

export const PARAMETER_GROUPS = [...new Set(PARAMETERS.map(p => p.group))];
