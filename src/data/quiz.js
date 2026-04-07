// ─── Existing module quizzes (sales, package) ────────────────────────────────

export const QUIZZES = {
  medical: [
    {
      q: 'How many parameters does the CBC (Complete Blood Count) include in the Preventive Complete Check?',
      options: ['12', '18', '24', '30'],
      answer: 2,
      explanation: 'CBC has 24 parameters — including haemoglobin, WBC differential (5 types, absolute + %), platelet indices, and RBC indices.',
    },
    {
      q: 'A customer says they feel tired all the time. Which tests in the package are most relevant?',
      options: ['LFT and Amylase', 'CBC, Iron Studies, Thyroid, Vitamin B12 & D', 'Lipid Profile and HsCRP', 'Urine R&M and KFT'],
      answer: 1,
      explanation: 'Fatigue is classically caused by anaemia (CBC + Iron), thyroid dysfunction (T3/T4/TSH), and vitamin deficiencies (B12, Vit D).',
    },
    {
      q: 'What is the key difference between CRP and HsCRP?',
      options: [
        'They test the same thing at the same sensitivity',
        'HsCRP detects low-grade cardiac inflammation; CRP detects acute/general inflammation',
        'CRP is a urine test; HsCRP is a blood test',
        'HsCRP is only for women',
      ],
      answer: 1,
      explanation: 'CRP flags active infection/inflammation. HsCRP is ultra-sensitive — it catches subclinical cardiac inflammation even when CRP is normal. Half of heart attacks occur in people with normal cholesterol but elevated HsCRP.',
    },
    {
      q: 'Which test requires mandatory 10–12 hours fasting for most accurate results?',
      options: ['Thyroid Profile', 'Lipid Profile', 'CBC', 'RA Factor'],
      answer: 1,
      explanation: 'Lipid Profile (especially triglycerides) requires 10–12 hours fasting. Eating beforehand raises triglyceride readings artificially.',
    },
    {
      q: 'What does HbA1c measure that fasting glucose cannot?',
      options: [
        'Current blood sugar at this moment',
        'Insulin resistance',
        'Average blood sugar over the past 2–3 months',
        'Kidney\'s ability to filter sugar',
      ],
      answer: 2,
      explanation: 'HbA1c binds to red blood cells, which live ~90 days. So it reflects the average glucose over 2–3 months — not just today\'s reading.',
    },
    {
      q: 'Ferritin is part of Iron Studies. What specifically does it measure?',
      options: ['Current iron in blood', 'Iron stored in the body', 'Iron excreted through urine', 'Iron absorbed from food'],
      answer: 1,
      explanation: 'Ferritin is the body\'s iron storage protein. It depletes before serum iron drops — meaning iron deficiency can exist even with a "normal" CBC.',
    },
    {
      q: 'A 35-year-old vegetarian woman complains of tingling in her hands and brain fog. Which vitamin should you highlight?',
      options: ['Vitamin C', 'Vitamin D', 'Vitamin B12', 'Vitamin A'],
      answer: 2,
      explanation: 'Vitamin B12 is found almost exclusively in animal products. Vegetarians are highly susceptible. B12 deficiency causes nerve damage (tingling, numbness) and cognitive symptoms.',
    },
    {
      q: 'The Urine R&M Extended test has 21 parameters. Which of these would NOT typically be found in a standard 8-parameter urine test?',
      options: ['Glucose', 'Protein', 'Bacteria (Microscopy)', 'pH'],
      answer: 2,
      explanation: 'Standard dipstick urine tests cover 8–10 chemical parameters. Microscopic examination — finding bacteria, casts, crystals under a microscope — requires the extended panel.',
    },
    {
      q: 'Which test in the package is specifically added to detect early pancreatic stress?',
      options: ['Amylase Serum', 'LFT', 'SGPT', 'Uric Acid'],
      answer: 0,
      explanation: 'Amylase is a pancreatic enzyme. Elevated serum amylase signals pancreatitis or pancreatic duct obstruction. Most preventive packages skip this.',
    },
    {
      q: 'eGFR is part of the advanced KFT. What does it calculate?',
      options: [
        'Amount of glucose filtered by the kidney',
        'Estimated rate at which kidneys filter blood per minute',
        'Electrolyte balance in urine',
        'Protein lost through the kidney',
      ],
      answer: 1,
      explanation: 'eGFR (estimated Glomerular Filtration Rate) estimates how many mL of blood the kidneys filter per minute. Normal is >90. Values <60 for 3+ months indicate chronic kidney disease.',
    },
  ],

  sales: [
    {
      q: 'A customer says "my doctor hasn\'t asked me to get tested." What is the best response?',
      options: [
        'Tell them to call their doctor first.',
        'Explain that preventive testing is often pro-active — you don\'t wait for symptoms to check engine oil.',
        'Offer a discount immediately.',
        'Agree and suggest they come back when the doctor recommends it.',
      ],
      answer: 1,
      explanation: 'Doctors typically test reactively — after symptoms appear. Preventive testing is self-initiated. Reframe this as the customer being proactive about their health.',
    },
    {
      q: 'What is consultative selling in the context of diagnostics?',
      options: [
        'Immediately pitching the most expensive package',
        'Asking questions to understand the caller\'s health concern before recommending a package',
        'Reading out the list of tests in the package',
        'Offering a free consultation with a doctor',
      ],
      answer: 1,
      explanation: 'Consultative selling means diagnosing the customer\'s needs first. Ask: age, gender, symptoms, last checkup, known conditions. Then match the package to their specific concern.',
    },
    {
      q: 'A customer says "₹2,699 is too expensive." Which response is most effective?',
      options: [
        '"Okay, let me check if we have a discount."',
        '"This is actually very cheap compared to hospitals."',
        '"That\'s ₹29 per test for 93 tests covering every major organ. One abnormal result caught early saves lakhs in treatment later."',
        '"We can\'t reduce the price, but we\'ll give you a free report review."',
      ],
      answer: 2,
      explanation: 'Break the price down per test to reframe the value. Then anchor to the cost of treating a missed condition. This handles the price objection without discounting.',
    },
    {
      q: 'What is the "summary close" technique?',
      options: [
        'Summarizing the price before closing',
        'Recapping the customer\'s health concerns and how the package addresses each one, then asking for the booking',
        'Sending a WhatsApp summary after the call',
        'Listing all 93 tests at the end of the call',
      ],
      answer: 1,
      explanation: 'The summary close works by recapping the customer\'s own stated concerns and showing exactly how the package addresses each one, then smoothly asking to book.',
    },
    {
      q: 'A customer says "I\'ll do it next month." What is the most appropriate urgency technique?',
      options: [
        'Tell them a price increase is coming next week.',
        'Let them go and follow up next month.',
        'Ask what specifically would change next month, and link current symptoms to the cost of delayed knowledge.',
        'Offer a time-limited slot.',
      ],
      answer: 2,
      explanation: 'Probe what will actually be different next month. Then link urgency to the customer\'s own stated symptoms: "Every month of not knowing is another month the underlying cause continues."',
    },
    {
      q: 'When is it appropriate to upsell from a lower package to the Preventive Complete Check?',
      options: [
        'Always — it\'s the most comprehensive.',
        'When the customer mentions multiple symptoms or risk factors that the base package doesn\'t cover.',
        'Only when the customer asks for it.',
        'When the customer\'s budget slider is above ₹2,500.',
      ],
      answer: 1,
      explanation: 'Upsell when the lower package genuinely doesn\'t address the customer\'s profile. Point out exactly which tests the upgrade adds and why those tests matter for their specific concern.',
    },
    {
      q: 'What is the key principle of creating urgency in healthcare selling WITHOUT fear-mongering?',
      options: [
        'Tell them they might have cancer if they don\'t test.',
        'Use statistics about disease prevalence to make them anxious.',
        'Link urgency to the customer\'s own stated symptoms and the value of early knowledge.',
        'Give them a 24-hour deadline to book.',
      ],
      answer: 2,
      explanation: 'Ethical urgency is grounded in the customer\'s own stated problem — not manufactured fear. The urgency is real and relevant.',
    },
    {
      q: 'A customer asks "why should I book with you and not a hospital lab?" What is the best response?',
      options: [
        '"Our prices are the lowest in the market."',
        '"Hospitals are overcrowded and slow."',
        '"We offer home collection, same-day digital reports, and package pricing that hospitals charge separately for each test."',
        '"Our quality is better than hospitals."',
      ],
      answer: 2,
      explanation: 'Lead with concrete differentiators: home collection, same-day digital reports, and value consolidation. Avoid disparaging competitors.',
    },
  ],

  package: [
    {
      q: 'How many total tests are included in the Preventive Complete Check?',
      options: ['75', '83', '93', '101'],
      answer: 2,
      explanation: '93 tests across 15 groups — from CBC (24 parameters) to single markers like Amylase and RA Factor.',
    },
    {
      q: 'Which TWO tests together give the most complete picture of cardiac risk in this package?',
      options: [
        'CRP + RA Factor',
        'Lipid Profile + HsCRP',
        'KFT + Glucose Fasting',
        'Thyroid Profile + Amylase',
      ],
      answer: 1,
      explanation: 'Lipid Profile shows cholesterol levels. HsCRP shows cardiac inflammation. Together they capture both metabolic and inflammatory cardiac risk.',
    },
    {
      q: 'What is the price of the Preventive Complete Check?',
      options: ['₹1,999', '₹2,199', '₹2,499', '₹2,699'],
      answer: 3,
      explanation: '₹2,699 — which works out to approximately ₹29 per test for 93 parameters across all major organ systems.',
    },
    {
      q: 'Which organ system is tested by Amylase that is NOT covered by LFT or KFT?',
      options: ['Spleen', 'Pancreas', 'Gallbladder', 'Adrenal glands'],
      answer: 1,
      explanation: 'Amylase is a pancreatic enzyme. LFT covers the liver; KFT covers the kidneys. The Preventive Complete Check covers the pancreas via Amylase.',
    },
    {
      q: 'A 50-year-old male customer with joint stiffness, fatigue, and no testing in 3 years calls in. Which groups are most relevant to highlight?',
      options: [
        'CBC, Iron Studies, Urine R&M',
        'CBC, Thyroid, B12/Vit D, HsCRP, RA Factor, Iron Studies',
        'Lipid Profile, LFT, KFT',
        'Glucose Fasting, HbA1c, Amylase',
      ],
      answer: 1,
      explanation: 'Joint stiffness → RA Factor + HsCRP. Fatigue at 50 → CBC, Iron, Thyroid, B12, Vit D. The package covers all of this in one draw.',
    },
    {
      q: 'How many parameters does the Urine Routine & Microscopy Extended include?',
      options: ['8', '12', '18', '21'],
      answer: 3,
      explanation: '21 parameters — from basic dipstick (pH, protein, glucose, ketones) to microscopic analysis (RBCs, WBCs, casts, crystals, bacteria).',
    },
    {
      q: 'Which test in the package is specifically relevant for vegetarian customers?',
      options: ['Amylase', 'RA Factor', 'Vitamin B12', 'Uric Acid'],
      answer: 2,
      explanation: 'Vitamin B12 is found almost exclusively in animal products. Vegetarians are at very high risk of deficiency.',
    },
  ],
};

// ─── Medical Knowledge — Tiered Quick Tests ───────────────────────────────────

export const MEDICAL_LEVELS = {

  // ── EASY: Basic recall and definitions ──────────────────────────────────────
  easy: [
    {
      q: 'What does CBC stand for?',
      options: ['Complete Blood Chemistry', 'Complete Blood Count', 'Comprehensive Blood Check', 'Core Blood Count'],
      answer: 1,
      explanation: 'CBC stands for Complete Blood Count. It measures all the components of blood — red cells, white cells, and platelets — across 24 parameters.',
    },
    {
      q: 'How many parameters are in the CBC panel of the Preventive Complete Check?',
      options: ['12', '18', '24', '32'],
      answer: 2,
      explanation: 'CBC includes 24 parameters covering red blood cells, white blood cell types (with absolute counts), platelet indices, and haemoglobin.',
    },
    {
      q: 'Which test measures your average blood sugar over the past 2–3 months?',
      options: ['Blood Glucose Fasting', 'HbA1c', 'Urine Glucose', 'Insulin Level'],
      answer: 1,
      explanation: 'HbA1c (Glycated Haemoglobin) binds to red blood cells and reflects average blood sugar over their 90-day lifespan — not just today\'s reading.',
    },
    {
      q: 'Which organ does the Liver Function Test (LFT) primarily assess?',
      options: ['Kidney', 'Pancreas', 'Liver', 'Gallbladder'],
      answer: 2,
      explanation: 'LFT measures liver enzymes (SGOT, SGPT, ALP, GGT) and proteins (albumin, globulin) to assess liver health and detect damage or disease.',
    },
    {
      q: 'What does TSH stand for?',
      options: ['Total Serum Hormone', 'Thyroid-Stimulating Hormone', 'Thyroid Serum Haemoglobin', 'Triiodothyronine Serum Hormone'],
      answer: 1,
      explanation: 'TSH is Thyroid-Stimulating Hormone, produced by the pituitary gland. It tells the thyroid how much hormone to make. Elevated TSH signals an underactive thyroid.',
    },
    {
      q: 'Which vitamin is commonly deficient in vegetarians?',
      options: ['Vitamin A', 'Vitamin C', 'Vitamin B12', 'Vitamin E'],
      answer: 2,
      explanation: 'Vitamin B12 is found almost exclusively in animal products (meat, eggs, dairy). Pure vegetarians and vegans are at very high risk of deficiency.',
    },
    {
      q: 'What does KFT stand for?',
      options: ['Kidney Function Test', 'Ketone Function Test', 'Kidney Fat Test', 'Key Function Thyroid'],
      answer: 0,
      explanation: 'KFT stands for Kidney Function Test. The Preventive Complete Check uses the Advanced KFT with 11 parameters including eGFR, creatinine, and electrolytes.',
    },
    {
      q: 'How many hours must a patient fast before a Blood Glucose Fasting test?',
      options: ['2–4 hours', '4–6 hours', '8–10 hours', '12–14 hours'],
      answer: 2,
      explanation: 'Blood Glucose Fasting requires 8–10 hours of fasting. Water is fine. This ensures the reading reflects true baseline glucose, not food intake.',
    },
    {
      q: 'What type of sample is collected for Urine Routine & Microscopy?',
      options: ['First morning blood sample', 'Midstream morning urine', '24-hour urine collection', 'Random blood sample'],
      answer: 1,
      explanation: 'A midstream morning urine sample is collected — the first void is discarded to avoid contamination. Morning urine is most concentrated and gives the most accurate results.',
    },
    {
      q: 'Which test is most useful for detecting anaemia?',
      options: ['Lipid Profile', 'CBC (Complete Blood Count)', 'Thyroid Profile', 'Urine R&M'],
      answer: 1,
      explanation: 'CBC directly measures haemoglobin and red blood cell count — the two core markers of anaemia. It also measures RBC indices (MCV, MCH) that help identify the type of anaemia.',
    },
    {
      q: 'How many parameters are in the Lipid Profile panel?',
      options: ['4', '6', '9', '12'],
      answer: 2,
      explanation: 'The Lipid Profile has 9 parameters: Total Cholesterol, Triglycerides, HDL, LDL, VLDL, Non-HDL, TC/HDL ratio, LDL/HDL ratio, and TG/HDL ratio.',
    },
    {
      q: 'What does RA Factor test for?',
      options: ['Rheumatoid Arthritis', 'Renal Acidity', 'Red Antigen', 'Reactive Anaemia'],
      answer: 0,
      explanation: 'RA Factor (Rheumatoid Arthritis Factor) detects antibodies associated with rheumatoid arthritis and other autoimmune conditions. The Preventive Complete Check includes a quantitative RA test.',
    },
    {
      q: 'Which enzyme in the package detects pancreatic problems?',
      options: ['SGPT', 'Amylase', 'Creatinine', 'Ferritin'],
      answer: 1,
      explanation: 'Amylase is a digestive enzyme produced by the pancreas. Elevated serum amylase is the primary marker for pancreatitis and pancreatic dysfunction.',
    },
    {
      q: 'Vitamin D deficiency primarily affects which part of the body?',
      options: ['Liver and kidneys only', 'Bones, immunity, and mood', 'Blood clotting', 'Digestive enzymes'],
      answer: 1,
      explanation: 'Vitamin D is essential for calcium absorption (bones), immune function, mood regulation, and insulin sensitivity. Deficiency is epidemic in India — even in people who spend time outdoors.',
    },
    {
      q: 'How many parameters are in the Liver Function Test (LFT)?',
      options: ['6', '9', '12', '15'],
      answer: 2,
      explanation: 'LFT has 12 parameters including Total Bilirubin, Direct/Indirect Bilirubin, SGOT, SGPT, ALP, GGT, Total Protein, Albumin, Globulin, A/G Ratio, and LDH.',
    },
    {
      q: 'What does CRP (C-Reactive Protein) detect in the body?',
      options: ['Cholesterol levels', 'Inflammation and infection', 'Blood sugar', 'Kidney function'],
      answer: 1,
      explanation: 'CRP is produced by the liver in response to inflammation. Elevated CRP signals active infection, inflammatory conditions, or autoimmune flares.',
    },
    {
      q: 'Which test does NOT require fasting?',
      options: ['Blood Glucose Fasting', 'Lipid Profile', 'HbA1c', 'Iron Studies'],
      answer: 2,
      explanation: 'HbA1c does not require fasting — it can be collected any time. It reflects the 3-month average, so a single meal has no impact on the result.',
    },
    {
      q: 'The Kidney Function Test includes a parameter called eGFR. What does it stand for?',
      options: [
        'Electrolyte-Guided Filtration Rate',
        'Estimated Glomerular Filtration Rate',
        'Extended Glucose Filtration Ratio',
        'Enzymatic Glucose Fluid Rate',
      ],
      answer: 1,
      explanation: 'eGFR stands for Estimated Glomerular Filtration Rate. It calculates how efficiently the kidneys filter blood per minute. Normal eGFR is above 90 mL/min.',
    },
    {
      q: 'How many parameters does the Thyroid Profile in this package include?',
      options: ['1', '2', '3', '5'],
      answer: 2,
      explanation: 'The Thyroid Profile includes 3 parameters: T3 (Triiodothyronine), T4 (Thyroxine), and TSH (ultra-sensitive). Together they give a complete picture of thyroid function.',
    },
    {
      q: 'What does the Iron Studies panel include that a standard CBC does not?',
      options: ['Haemoglobin level', 'Ferritin (iron stores)', 'White blood cell count', 'Platelet count'],
      answer: 1,
      explanation: 'CBC shows haemoglobin and RBC — signs of anaemia once it\'s advanced. Iron Studies adds Ferritin (iron stores), Serum Iron, TIBC, and Transferrin Saturation — catching deficiency before anaemia develops.',
    },
  ],

  // ── MEDIUM: Application and clinical understanding ──────────────────────────
  medium: [
    {
      q: 'A 35-year-old vegetarian woman with hair loss for 4 months calls in. Which 4 test groups in the Preventive Complete Check are MOST relevant to her complaint?',
      options: [
        'Lipid Profile, LFT, KFT, Urine R&M',
        'Thyroid Profile, Iron Studies, CBC, Vitamin B12',
        'HbA1c, Glucose Fasting, RA Factor, CRP',
        'Amylase, HsCRP, Urine R&M, Vitamin D',
      ],
      answer: 1,
      explanation: 'Hair loss in women is most commonly caused by thyroid dysfunction (TSH), iron deficiency (Iron Studies + CBC), and B12 deficiency — all present in the Preventive Complete Check. Vitamin D is also a contributing factor.',
    },
    {
      q: 'What is the key difference between Serum Iron and Ferritin?',
      options: [
        'Serum Iron tests urine; Ferritin tests blood',
        'Serum Iron is the current level in blood; Ferritin is the body\'s stored iron reserve',
        'They measure the same thing with different units',
        'Ferritin is only relevant for men',
      ],
      answer: 1,
      explanation: 'Serum Iron reflects iron currently in circulation. Ferritin reflects iron stored in tissues. Ferritin depletes first — so a customer can have normal serum iron but already be iron-deficient at the storage level.',
    },
    {
      q: 'Why does Lipid Profile require 10–12 hours fasting but HbA1c requires no fasting at all?',
      options: [
        'Lipid Profile is more expensive and requires stricter protocols',
        'Triglycerides spike temporarily after eating, inflating the result; HbA1c reflects 3-month average so one meal has no impact',
        'HbA1c is a urine test so food doesn\'t affect it',
        'Fasting is optional for Lipid Profile — it\'s just a hospital convention',
      ],
      answer: 1,
      explanation: 'Dietary fat raises triglycerides within hours of eating, making results inaccurate. HbA1c binds to red blood cells that live ~90 days — no single meal changes the 3-month average.',
    },
    {
      q: 'What does eGFR below 60 mL/min sustained for 3 or more months indicate?',
      options: [
        'Normal kidney function for someone over 60 years old',
        'Chronic Kidney Disease (CKD)',
        'Temporary dehydration',
        'Elevated protein intake',
      ],
      answer: 1,
      explanation: 'eGFR below 60 for 3+ months is the diagnostic threshold for Chronic Kidney Disease. Normal eGFR is >90. Values of 60–89 indicate mildly reduced function requiring monitoring.',
    },
    {
      q: 'Which two tests in the package form the "cardiac risk duo"?',
      options: [
        'CRP + CBC',
        'Lipid Profile + HsCRP',
        'HbA1c + Glucose Fasting',
        'KFT + Urine R&M',
      ],
      answer: 1,
      explanation: 'Lipid Profile measures cholesterol (metabolic risk). HsCRP measures cardiac inflammation (inflammatory risk). Together they identify risk from both pathways — critical because half of heart attacks occur in people with normal cholesterol.',
    },
    {
      q: 'A patient\'s LFT shows elevated SGPT (ALT). What does this most likely indicate?',
      options: [
        'Kidney damage',
        'Thyroid overactivity',
        'Liver cell damage — fatty liver, hepatitis, or drug toxicity',
        'Pancreatic inflammation',
      ],
      answer: 2,
      explanation: 'SGPT (ALT) is a liver-specific enzyme. When liver cells are damaged or inflamed (fatty liver, hepatitis, alcohol damage), SGPT leaks into the bloodstream. It\'s one of the most sensitive early markers of liver disease.',
    },
    {
      q: 'A patient has elevated TSH but normal T3 and T4. What does this represent?',
      options: [
        'Hyperthyroidism',
        'Subclinical hypothyroidism — the pituitary is working harder to stimulate an underperforming thyroid',
        'Normal thyroid function',
        'Thyroid cancer',
      ],
      answer: 1,
      explanation: 'When TSH is high but T3/T4 are still normal, it means the pituitary is compensating by overdriving the thyroid. This is subclinical hypothyroidism — the thyroid is struggling but hasn\'t failed yet. Early treatment prevents full hypothyroidism.',
    },
    {
      q: 'A customer with known diabetes asks why they need KFT. What is the best clinical reason?',
      options: [
        'Diabetic patients produce more creatinine',
        'High blood sugar over time damages kidney filtration vessels — KFT tracks this decline before symptoms appear',
        'KFT is needed to adjust insulin dosing',
        'Diabetes causes kidney stones, which KFT detects',
      ],
      answer: 1,
      explanation: 'Diabetes is the leading cause of chronic kidney disease. High glucose damages the tiny blood vessels in the kidney glomeruli. KFT (especially eGFR and creatinine) tracks this damage — often years before any symptom appears.',
    },
    {
      q: 'What does the microscopy component of Urine R&M Extended reveal that the dipstick cannot?',
      options: [
        'Glucose and protein levels',
        'Kidney casts, RBCs, WBCs, crystals, and bacteria under a microscope',
        'pH and specific gravity',
        'Bilirubin and urobilinogen',
      ],
      answer: 1,
      explanation: 'Dipstick tests chemical markers only. Microscopy physically examines the urine sediment for casts (kidney tubule damage), RBCs (bleeding), WBCs (infection), crystals (stone risk), and bacteria — giving a far more complete picture.',
    },
    {
      q: 'A 48-year-old male has normal cholesterol but elevated HsCRP. Why is this clinically significant?',
      options: [
        'It confirms he has an active cold or flu',
        'It suggests silent cardiac inflammation — a risk factor for heart attack independent of cholesterol',
        'It means his liver is inflamed',
        'It is not significant if cholesterol is normal',
      ],
      answer: 1,
      explanation: 'Research shows 50% of heart attacks occur in people with normal LDL cholesterol. HsCRP detects low-grade vascular inflammation — a separate cardiac risk pathway. Elevated HsCRP with normal cholesterol warrants lifestyle intervention and monitoring.',
    },
    {
      q: 'The Thyroid Profile includes T3, T4, and TSH. Which of these is the MOST sensitive early indicator of thyroid dysfunction?',
      options: ['T3', 'T4', 'TSH', 'All three are equally sensitive'],
      answer: 2,
      explanation: 'TSH changes first — even before T3/T4 shift outside normal range. When the thyroid is underperforming, the pituitary compensates by raising TSH. That\'s why TSH ultra-sensitive is the screening test of choice.',
    },
    {
      q: 'What does elevated Uric Acid in the Advanced KFT panel indicate?',
      options: [
        'High dietary protein intake only',
        'Risk of gout and uric acid kidney stones',
        'Kidney infection',
        'Liver dysfunction',
      ],
      answer: 1,
      explanation: 'Uric acid is a waste product of purine metabolism. Elevated levels cause crystals to deposit in joints (gout) and kidneys (uric acid stones). It\'s included in the Advanced KFT as part of the full kidney and metabolic workup.',
    },
    {
      q: 'A CBC report shows low MCV (Mean Corpuscular Volume). What does this suggest?',
      options: [
        'B12 deficiency anaemia (megaloblastic)',
        'Iron deficiency anaemia (microcytic)',
        'Normal healthy red blood cells',
        'High white blood cell count',
      ],
      answer: 1,
      explanation: 'Low MCV means red blood cells are small (microcytic). This is the hallmark of iron deficiency anaemia. B12/folate deficiency causes large red blood cells (high MCV, macrocytic anaemia) — the opposite pattern.',
    },
    {
      q: 'The LFT panel includes Albumin. Why is a low albumin level significant?',
      options: [
        'It means the patient has high cholesterol',
        'It indicates the liver has lost significant capacity to produce proteins — a sign of advanced liver disease',
        'It is normal in elderly patients',
        'It suggests dehydration',
      ],
      answer: 1,
      explanation: 'Albumin is produced by the liver. Low albumin means the liver is failing to synthesize adequate protein — a sign of chronic liver disease or cirrhosis. It also causes fluid to leak into tissues (oedema/ascites).',
    },
    {
      q: 'Which parameter from Iron Studies is the EARLIEST indicator of iron deficiency — before anaemia develops?',
      options: ['Serum Iron', 'Haemoglobin', 'Ferritin', 'TIBC'],
      answer: 2,
      explanation: 'Ferritin drops first as the body uses up stored iron. Serum iron and haemoglobin only fall later. This is why Iron Studies catches deficiency at the "pre-anaemia" stage — when CBC alone would still look normal.',
    },
    {
      q: 'A customer with joint pain tests positive for RA Factor. What does a QUANTITATIVE RA Factor add over a simple positive/negative result?',
      options: [
        'It tells you which joint is affected',
        'It measures the level of RF antibody — helping assess disease severity and monitor treatment response',
        'It differentiates gout from arthritis',
        'It confirms the diagnosis without further testing',
      ],
      answer: 1,
      explanation: 'A qualitative test just says positive or negative. The Preventive Complete Check includes a quantitative RA Factor — giving a numeric value. Higher values correlate with more aggressive disease. It also helps track whether treatment is working over time.',
    },
    {
      q: 'How many parameters are in the Advanced KFT panel?',
      options: ['6', '8', '11', '14'],
      answer: 2,
      explanation: 'The Advanced KFT has 11 parameters: BUN, Creatinine, eGFR, Uric Acid, Sodium, Potassium, Chloride, Calcium, Phosphorus, Bicarbonate, and BUN/Creatinine Ratio.',
    },
    {
      q: 'A customer\'s CBC shows elevated absolute neutrophil count. What does this most commonly indicate?',
      options: ['Viral infection', 'Bacterial infection or acute inflammation', 'Iron deficiency', 'Dehydration'],
      answer: 1,
      explanation: 'Neutrophils are the frontline immune cells against bacteria. An elevated absolute neutrophil count (ANC) is the classic CBC response to bacterial infection or acute inflammatory conditions. Viral infections typically raise lymphocytes instead.',
    },
    {
      q: 'The LFT includes both ALP and GGT. What condition would raise GGT specifically, even if ALP is normal?',
      options: [
        'Iron deficiency',
        'Alcohol consumption or liver inflammation',
        'Thyroid overactivity',
        'Kidney disease',
      ],
      answer: 1,
      explanation: 'GGT (Gamma-GT) is highly sensitive to alcohol and is the first liver enzyme to rise with regular drinking. It also elevates in non-alcoholic fatty liver disease. GGT rising while ALP is normal can point specifically to alcohol or early fatty liver.',
    },
    {
      q: 'What is the clinical significance of the A/G (Albumin/Globulin) Ratio in LFT?',
      options: [
        'It measures liver fat content',
        'A reversed A/G ratio (globulin higher than albumin) can suggest chronic liver disease, autoimmune conditions, or inflammatory disorders',
        'It measures bile production',
        'It directly measures liver size',
      ],
      answer: 1,
      explanation: 'Normally albumin exceeds globulin (ratio >1). When globulin rises (due to chronic inflammation or autoimmune disease) and albumin falls (liver dysfunction), the ratio reverses. A reversed A/G ratio is a prompt to investigate further.',
    },
    {
      q: 'Which of the following symptoms would make you highlight Vitamin D as a key selling point?',
      options: [
        'High blood sugar and frequent urination',
        'Joint pain, fatigue, low mood, and frequent infections',
        'Yellow skin and dark urine',
        'Palpitations and weight loss',
      ],
      answer: 1,
      explanation: 'Vitamin D deficiency presents as bone/joint pain, chronic fatigue, low mood (it affects serotonin), and impaired immunity (frequent colds/infections). 70–80% of urban Indians are deficient — even those who work outdoors.',
    },
  ],

  // ── HARD: Clinical reasoning, nuance, and pitch mastery ─────────────────────
  hard: [
    {
      q: 'A customer has a normal fasting glucose of 95 mg/dL but an HbA1c of 6.1% (pre-diabetic range). How do you explain this to them?',
      options: [
        'Tell them one result must be wrong — they can\'t both be accurate',
        'Explain that fasting glucose shows one data point; HbA1c reveals that their average glucose over 3 months is elevated, suggesting post-meal spikes they are unaware of',
        'Reassure them the fasting glucose is normal so they have nothing to worry about',
        'Tell them to retest after 2 weeks',
      ],
      answer: 1,
      explanation: 'Fasting glucose only reflects one moment — overnight. HbA1c captures the full picture including post-meal (postprandial) spikes. Someone can have controlled fasting glucose but significantly elevated post-meal sugars, showing as pre-diabetic HbA1c. This is exactly why both tests are in the package.',
    },
    {
      q: 'How do MCV and RDW together in a CBC help distinguish between iron deficiency anaemia and B12 deficiency anaemia?',
      options: [
        'They don\'t — both present identically in CBC',
        'Iron deficiency: low MCV (small cells) + high RDW (varied sizes); B12 deficiency: high MCV (large cells) + high RDW',
        'Iron deficiency: high MCV; B12 deficiency: low MCV',
        'RDW only changes in B12 deficiency',
      ],
      answer: 1,
      explanation: 'Iron deficiency = microcytic (low MCV) anaemia with anisocytosis (high RDW — cells of varying sizes). B12/folate = macrocytic (high MCV) anaemia with high RDW. Knowing both allows the CBC to guide which supplementation is needed without waiting for Iron Studies.',
    },
    {
      q: 'A patient\'s LFT shows elevated ALP and GGT but NORMAL SGOT and SGPT. Which pattern does this suggest?',
      options: [
        'Hepatocellular damage (liver cell death)',
        'Cholestatic disease — bile duct obstruction or bile flow impairment',
        'Viral hepatitis',
        'Alcoholic hepatitis',
      ],
      answer: 1,
      explanation: 'SGOT/SGPT elevation = hepatocellular damage (liver cells dying). ALP + GGT elevation with normal SGOT/SGPT = cholestatic pattern (impaired bile flow — gallstones, primary biliary cholangitis, or bile duct obstruction). The pattern in LFT guides the next diagnostic step.',
    },
    {
      q: 'In Iron Studies, why does ferritin deplete before serum iron falls — and why does this matter clinically?',
      options: [
        'Ferritin is produced faster than it can be consumed',
        'The body mobilises iron from stores (ferritin) to maintain serum iron levels — serum iron only falls once stores are exhausted',
        'Serum iron is a more stable molecule than ferritin',
        'They deplete at the same rate — ferritin just has a lower starting value',
      ],
      answer: 1,
      explanation: 'The body maintains serum iron homeostasis by releasing stored iron from ferritin. Ferritin falls first while serum iron appears normal — this is Stage 1 iron deficiency. Only when stores are exhausted does serum iron drop and anaemia develop. Checking ferritin catches patients at Stage 1 — years before CBC changes.',
    },
    {
      q: 'Explain why HsCRP can predict cardiac events in a patient with completely normal LDL cholesterol.',
      options: [
        'HsCRP measures the same thing as cholesterol but more precisely',
        'Atherosclerosis has two components: cholesterol deposition AND vascular inflammation. HsCRP measures the inflammatory component, which drives plaque rupture independently of cholesterol level',
        'HsCRP elevation always means cholesterol will be abnormal soon',
        'HsCRP is more sensitive only in women',
      ],
      answer: 1,
      explanation: 'Atherosclerosis involves cholesterol plaques forming in artery walls AND inflammation that destabilises those plaques. Plaque rupture (heart attack trigger) is driven by inflammation. HsCRP detects this inflammatory activity. The JUPITER trial showed that patients with normal LDL but elevated HsCRP benefited significantly from treatment — confirming it as an independent cardiac risk factor.',
    },
    {
      q: 'A patient has creatinine of 1.8 mg/dL (above normal) but eGFR of 52 mL/min. Another patient has creatinine of 1.2 mg/dL (within normal range) but eGFR of 58 mL/min. Which patient has worse kidney function and why?',
      options: [
        'Patient 1, because creatinine is higher',
        'Patient 2 — eGFR is lower. eGFR accounts for age, sex, and body size; creatinine alone can appear "normal" in elderly or muscle-depleted patients despite poor filtration',
        'They are identical — eGFR and creatinine always agree',
        'Patient 1 has worse function only if they are over 60',
      ],
      answer: 1,
      explanation: 'eGFR is the superior marker because it corrects creatinine for age, sex, and race. In elderly patients or those with low muscle mass, creatinine is naturally lower — so 1.2 mg/dL can still indicate poor filtration. eGFR of 58 (CKD Stage 3a territory) can occur with a "normal-looking" creatinine. This is why the Advanced KFT includes eGFR.',
    },
    {
      q: 'A vegetarian patient\'s CBC is completely normal, yet they have classic symptoms of B12 deficiency (tingling, fatigue, brain fog). How do you explain this?',
      options: [
        'Their symptoms are unrelated to B12',
        'CBC measures haemoglobin — B12 deficiency affects nerves (subacute combined degeneration) before causing anaemia. Neurological damage can precede anaemia by years',
        'Their CBC must contain an error',
        'Normal CBC rules out B12 deficiency completely',
      ],
      answer: 1,
      explanation: 'B12 deficiency causes two types of damage: haematological (macrocytic anaemia — CBC change) and neurological (damage to myelin sheaths — tingling, weakness, cognitive decline). Neurological damage often precedes anaemia by months to years. So a vegetarian can have normal CBC but significant B12 deficiency damaging their nervous system — only a serum B12 test reveals this.',
    },
    {
      q: 'What does a reversed A/G ratio in LFT (globulin > albumin) suggest, and what conditions should you associate it with?',
      options: [
        'It is always normal and requires no follow-up',
        'Chronic liver disease (reduced albumin synthesis) AND/OR chronic inflammatory or autoimmune conditions (elevated globulins from immune response)',
        'It only occurs in dehydrated patients',
        'It suggests gallbladder disease specifically',
      ],
      answer: 1,
      explanation: 'Albumin falls when the liver can\'t synthesise proteins adequately (cirrhosis, chronic hepatitis). Globulins rise when there is prolonged immune stimulation (autoimmune hepatitis, chronic infections, multiple myeloma). The reversed ratio is a red flag requiring investigation of both the liver and the immune/inflammatory axis.',
    },
    {
      q: 'Which two Urine R&M Extended findings together most strongly suggest early diabetic nephropathy?',
      options: [
        'Red blood cells + crystals',
        'Protein (proteinuria) + glucose in urine',
        'Bacteria + WBCs',
        'Casts + ketones',
      ],
      answer: 1,
      explanation: 'In diabetic nephropathy, the glomerular filtration barrier is damaged. This allows albumin/protein to spill into urine (microalbuminuria → proteinuria). Glucose in urine occurs when blood sugar exceeds the renal threshold. Together, proteinuria + glucosuria in a known or suspected diabetic is a strong early signal of kidney damage.',
    },
    {
      q: 'Why does the Preventive Complete Check include BOTH CRP and HsCRP — aren\'t they measuring the same protein?',
      options: [
        'They are identical tests — it is a billing strategy',
        'CRP detects acute, high-level inflammation (infections, flares); HsCRP detects chronic low-grade vascular inflammation at concentrations 10x below CRP\'s detection limit',
        'CRP is for liver disease; HsCRP is for cardiac disease only',
        'HsCRP is the newer version and replaces CRP — they should not both be included',
      ],
      answer: 1,
      explanation: 'Both measure C-Reactive Protein, but at different sensitivities. Standard CRP detects values ≥3–5 mg/L — useful for infections and acute inflammation. HsCRP measures 0.1–3 mg/L — the subclinical range that predicts cardiovascular risk. They serve completely different clinical purposes and together give both the acute and chronic inflammatory picture.',
    },
    {
      q: 'A CBC shows elevated absolute eosinophil count. What should an agent know about this finding?',
      options: [
        'It always means bacterial infection',
        'Eosinophilia suggests allergic conditions, parasitic infections, or in rare cases, haematological malignancies',
        'It is always benign and needs no attention',
        'It confirms the patient has anaemia',
      ],
      answer: 1,
      explanation: 'Eosinophils are the immune cells that respond to parasites and allergens. Elevated absolute eosinophil count (eosinophilia) is seen in: allergic diseases (asthma, atopic dermatitis), parasitic infections, and occasionally haematological disorders. The CBC WBC differential captures this — allowing early investigation.',
    },
    {
      q: 'A 55-year-old man has high SGPT but normal GGT and ALP. He drinks no alcohol. What is the most likely cause and what does the Lipid Profile add to the clinical picture?',
      options: [
        'He likely has a bile duct stone; Lipid Profile is irrelevant',
        'Isolated SGPT elevation without GGT/ALP rise suggests hepatocellular damage — most likely Non-Alcoholic Fatty Liver Disease (NAFLD). Lipid Profile is critical as high triglycerides and low HDL confirm metabolic syndrome driving the fatty liver',
        'It means viral hepatitis only; Lipid Profile does not help',
        'Normal GGT rules out any liver disease',
      ],
      answer: 1,
      explanation: 'Isolated SGPT elevation in a non-drinker is the classic pattern of NAFLD (non-alcoholic fatty liver disease), now called MASLD. The metabolic context is crucial — high triglycerides and low HDL in Lipid Profile confirm insulin resistance as the driver. This is exactly why the Preventive Complete Check includes LFT + Lipid Profile together.',
    },
    {
      q: 'How does the BUN/Creatinine ratio in Advanced KFT help differentiate types of kidney problems?',
      options: [
        'It does not add clinical value beyond BUN and creatinine individually',
        'A high ratio (>20) suggests pre-renal causes (dehydration, low blood flow to kidneys); a normal/low ratio with elevated creatinine suggests intrinsic kidney disease',
        'A low ratio always means the patient is well hydrated',
        'It only applies to patients over 70 years old',
      ],
      answer: 1,
      explanation: 'BUN rises dramatically when the kidney is getting insufficient blood flow (dehydration, heart failure) — the kidney reabsorbs more urea. Creatinine rises with the loss of actual kidney filtering capacity. High BUN/Creatinine ratio = pre-renal (reversible with hydration). Normal ratio with high creatinine = structural kidney damage. This ratio adds significant diagnostic value to the panel.',
    },
    {
      q: 'A customer says "my fasting glucose was 105 mg/dL last year and the year before." Why is this trend significant even though both readings are in the "normal" range (70–110)?',
      options: [
        'It is not significant — normal is normal',
        'A rising trend within the normal range indicates the patient is moving toward pre-diabetes; HbA1c and repeat glucose will likely confirm pre-diabetic status soon',
        'The test must have been wrong both times',
        'It only matters if it crosses 110 mg/dL',
      ],
      answer: 1,
      explanation: 'Fasting glucose above 100 mg/dL (even within the "normal" range) is considered impaired fasting glucose by ADA standards. A rising trend from 95 → 100 → 105 over years is a clear trajectory toward pre-diabetes. Adding HbA1c to the picture gives a more definitive answer and motivates early lifestyle intervention.',
    },
    {
      q: 'In the LFT, what is the clinical difference between Direct Bilirubin and Indirect Bilirubin elevation?',
      options: [
        'They are the same — total bilirubin is all that matters',
        'Elevated Indirect Bilirubin = haemolysis (RBC destruction) or Gilbert\'s syndrome; Elevated Direct Bilirubin = liver disease or bile duct obstruction',
        'Indirect Bilirubin only elevates in kidney disease',
        'Direct Bilirubin elevation always causes jaundice; indirect does not',
      ],
      answer: 1,
      explanation: 'Bilirubin is a breakdown product of haemoglobin. Indirect (unconjugated) bilirubin elevates when too many red cells are destroyed (haemolysis) before the liver can process it. Direct (conjugated) bilirubin elevates when the liver has processed it but can\'t excrete it — pointing to liver disease or bile duct blockage. The LFT includes all three values — Total, Direct, and Indirect.',
    },
    {
      q: 'Transferrin Saturation % is part of Iron Studies. What does it measure and why does a very HIGH value matter?',
      options: [
        'It measures dietary iron absorption and high values are always beneficial',
        'It measures what % of available iron-binding capacity is occupied. Very high saturation (>45–50%) suggests iron overload (haemochromatosis) — which causes organ damage',
        'High transferrin saturation means the patient needs more iron supplements',
        'It only applies to patients with diagnosed anaemia',
      ],
      answer: 1,
      explanation: 'Transferrin Saturation % = (Serum Iron / TIBC) × 100. Normal is 20–45%. Very high saturation means available binding sites are almost fully occupied by iron — indicating iron excess. Hereditary haemochromatosis causes iron to accumulate in the liver, heart, and pancreas, causing organ damage. Iron Studies catch both deficiency AND overload.',
    },
    {
      q: 'A patient has all CBC parameters normal but reports extreme fatigue. Which combination of tests in the Preventive Complete Check provides the next level of investigation?',
      options: [
        'Lipid Profile and Urine R&M',
        'Thyroid Profile (TSH), Vitamin B12, Vitamin D, and Iron Studies (Ferritin)',
        'LFT and KFT',
        'HbA1c and Glucose Fasting',
      ],
      answer: 1,
      explanation: 'Normal CBC rules out overt anaemia but fatigue persists. The next layer: subclinical hypothyroidism (TSH elevated, T3/T4 still normal), Vitamin D deficiency (causes fatigue and myalgia), Vitamin B12 deficiency (neurological fatigue), and iron deficiency (Ferritin low before CBC changes). All four are included in the Preventive Complete Check.',
    },
    {
      q: 'Why does the Preventive Complete Check include HbA1c AND Fasting Blood Glucose rather than just one of them?',
      options: [
        'They are redundant — it is just to increase the test count',
        'Fasting glucose catches acute hyperglycaemia; HbA1c reveals chronic control. Together they diagnose diabetes, pre-diabetes, and identify patients whose daily sugar is spiking post-meals despite an acceptable fasting result',
        'Only HbA1c is medically validated — glucose is included as a formality',
        'Fasting glucose is for kidney function monitoring, not diabetes',
      ],
      answer: 1,
      explanation: 'The two tests complement each other. Fasting glucose: single-point measurement, catches acute issues. HbA1c: 3-month average, catches chronic control failure. ADA guidelines use BOTH for diagnosis and monitoring. A patient can have: (a) high fasting glucose but good HbA1c (newly decompensated), or (b) normal fasting glucose but high HbA1c (post-meal spikes). Only using both gives the full picture.',
    },
    {
      q: 'The Amylase Serum test is included in the Preventive Complete Check. Most preventive packages omit it. What is the specific clinical rationale for its inclusion?',
      options: [
        'Amylase is a cheap test so it\'s added to increase parameter count',
        'Pancreatitis can present silently or with vague abdominal symptoms easily dismissed. Elevated serum amylase is an early marker of pancreatic stress — and the pancreas is not covered by LFT or KFT',
        'Amylase tests the gallbladder specifically',
        'It is only relevant for patients with known alcohol dependence',
      ],
      answer: 1,
      explanation: 'The pancreas is a "missing organ" in most preventive panels — LFT covers liver, KFT covers kidneys, but nothing else covers the pancreas. Amylase serum fills this gap. Pancreatitis can be triggered by gallstones, alcohol, or idiopathic causes and can be life-threatening if missed. Including amylase makes the Preventive Complete Check truly comprehensive across all major abdominal organs.',
    },
    {
      q: 'A customer has been taking Metformin for 2 years for diabetes. Why is Vitamin B12 testing particularly important for them?',
      options: [
        'Metformin increases B12 absorption so levels should be monitored for excess',
        'Metformin reduces B12 absorption in the gut by interfering with the intrinsic factor pathway — leading to B12 deficiency even in non-vegetarians. Deficiency can cause irreversible peripheral neuropathy',
        'B12 testing is only relevant for vegetarians',
        'Metformin has no interaction with vitamins',
      ],
      answer: 1,
      explanation: 'Metformin reduces B12 absorption by interfering with calcium-dependent ileal membrane transport of the B12-intrinsic factor complex. Studies show 5–30% of Metformin users develop B12 deficiency over time. This causes peripheral neuropathy — which can be misattributed to diabetic neuropathy. Testing B12 in any Metformin user is medically appropriate — and a strong clinical selling point.',
    },
  ],
};
