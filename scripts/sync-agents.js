#!/usr/bin/env node
// sync-agents.js
// Calls the Ozonetel single-day CDR API for today's date, extracts agent emails
// from the AgentID field, and merges any new agents into scripts/agents.json.
//
// Rate limit: 2 requests/minute → we wait 31s between every API call.
// Both campaigns are queried and fully paginated.

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Ozonetel config ──────────────────────────────────────────────────────────
const API_KEY       = 'KK87a38089019cdfd79ca0b14d69f71464';
const AUTH_HEADER   = 'Basic dGxfdHJ1ZW1lZHM6VHJ1ZUAxMjM=';
const USERNAME      = 'intellihealth';
const BASE_URL      = 'in1-ccaas-api.ozonetel.com';
const ENDPOINT_PATH = '/ca_reports/getCDRDefaultByPagination';
const CAMPAIGNS     = ['lab_test_progressive', 'Inbound_918065194346'];

const AGENTS_FILE   = path.join(__dirname, 'agents.json');
const PAGE_SIZE     = 50;
const RATE_DELAY_MS = 31_000; // 31 seconds between requests (2 req/min limit)

// ─── Date helpers ─────────────────────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// ─── HTTP helper ──────────────────────────────────────────────────────────────
function httpGet(host, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({ host, path, method: 'GET' }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error(`JSON parse failed: ${body.slice(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30_000, () => { req.destroy(); reject(new Error('Request timed out')); });
    req.end();
  });
}

// ─── Rate-limited CDR page fetch ─────────────────────────────────────────────
let _lastCallAt = 0;

async function fetchPage(campaignName, date, pageNo) {
  // Enforce 31s gap between every API call
  const elapsed = Date.now() - _lastCallAt;
  if (_lastCallAt && elapsed < RATE_DELAY_MS) {
    const wait = RATE_DELAY_MS - elapsed;
    console.log(`  ⏳ Rate limit — waiting ${Math.round(wait / 1000)}s...`);
    await new Promise(r => setTimeout(r, wait));
  }
  _lastCallAt = Date.now();

  const fromDate = encodeURIComponent(`${date} 00:00:00`);
  const toDate   = encodeURIComponent(`${date} 23:59:59`);
  const body     = encodeURIComponent(JSON.stringify({
    userName:     USERNAME,
    fromDate:     `${date} 00:00:00`,
    toDate:       `${date} 23:59:59`,
    campaignName: campaignName,
  }));

  // Build query string — API takes JSON body as a query param AND headers
  // Use GET with headers (matching the existing fetch_calls.py approach)
  const qs = new URLSearchParams({
    pageNo,
    pageSize: PAGE_SIZE,
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      path:     `${ENDPOINT_PATH}?${qs}`,
      method:   'GET',
      headers:  {
        apiKey:         API_KEY,
        Authorization:  AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    };

    // The API expects the filter params in the request body even for GET
    const bodyStr = JSON.stringify({
      userName:     USERNAME,
      fromDate:     `${date} 00:00:00`,
      toDate:       `${date} 23:59:59`,
      campaignName: campaignName,
    });

    options.headers['Content-Length'] = Buffer.byteLength(bodyStr);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${data.slice(0, 300)}`)); }
      });
    });

    req.on('error', reject);
    req.setTimeout(30_000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(bodyStr);
    req.end();
  });
}

// ─── Fetch all pages for one campaign ─────────────────────────────────────────
async function fetchCampaign(campaignName, date) {
  const allRecords = [];
  let pageNo = 1;

  console.log(`\n  [${campaignName}] Fetching CDR for ${date}...`);

  while (true) {
    let data;
    try {
      data = await fetchPage(campaignName, date, pageNo);
    } catch (err) {
      console.log(`  [${campaignName}] Page ${pageNo} error: ${err.message}`);
      break;
    }

    const status = String(data?.status ?? '').toLowerCase();
    if (status !== 'success') {
      console.log(`  [${campaignName}] API returned: ${data?.message ?? JSON.stringify(data).slice(0, 100)}`);
      break;
    }

    const records = data.details ?? [];
    if (!records.length) break;

    allRecords.push(...records);
    const total = parseInt(data.totalCount ?? 0);
    console.log(`  [${campaignName}] Page ${pageNo}: ${records.length} records (${allRecords.length}/${total})`);

    if (allRecords.length >= total) break;
    pageNo++;
  }

  console.log(`  [${campaignName}] Done — ${allRecords.length} records`);
  return allRecords;
}

// ─── Extract agent emails from records ───────────────────────────────────────
function extractAgents(records) {
  const found = {};
  for (const r of records) {
    const email = (r.AgentID ?? '').trim().toLowerCase();
    const name  = (r.AgentName ?? '').trim();
    if (email && email.includes('@')) {
      found[email] = name || found[email] || email;
    }
  }
  return found; // { email: name }
}

// ─── Load / save agents.json ──────────────────────────────────────────────────
function loadAgents() {
  try {
    return JSON.parse(fs.readFileSync(AGENTS_FILE, 'utf8'));
  } catch {
    return { agents: [], last_synced: null };
  }
}

function saveAgents(data) {
  fs.writeFileSync(AGENTS_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const date = todayStr();
  console.log(`\n🔄 Syncing agents — CDR for ${date}`);

  // 1. Load existing agent list
  const agentData   = loadAgents();
  const existingSet = new Set(agentData.agents.map(a => a.email.toLowerCase()));

  console.log(`   Known agents: ${agentData.agents.length}`);

  // 2. Fetch CDR for both campaigns
  let allRecords = [];
  for (const campaign of CAMPAIGNS) {
    const records = await fetchCampaign(campaign, date);
    allRecords = allRecords.concat(records);
  }

  // 3. Extract agents from today's records
  const todayAgents = extractAgents(allRecords);
  console.log(`\n   Agents found in today's CDR: ${Object.keys(todayAgents).length}`);

  // 4. Find NEW agents not already in the list
  const newAgents = [];
  for (const [email, name] of Object.entries(todayAgents)) {
    if (!existingSet.has(email)) {
      newAgents.push({ name, email });
      console.log(`   ✨ New agent detected: ${name} <${email}>`);
    }
  }

  // 5. Merge and save if changed
  if (newAgents.length > 0) {
    agentData.agents.push(...newAgents);
    // Sort alphabetically by email for stable diffs
    agentData.agents.sort((a, b) => a.email.localeCompare(b.email));
    agentData.last_synced = date;
    saveAgents(agentData);
    console.log(`\n✅ agents.json updated — ${newAgents.length} new agent(s) added.`);
    console.log(`   Total agents: ${agentData.agents.length}`);
  } else {
    // Always update last_synced even if no new agents
    agentData.last_synced = date;
    saveAgents(agentData);
    console.log(`\n✅ No new agents today. Total: ${agentData.agents.length} agent(s).`);
  }

  // 6. Print current recipient list for the workflow to use
  const emails = agentData.agents.map(a => a.email).join(', ');
  console.log(`\n📧 Recipients: ${emails}`);

  // Write to a temp file so the workflow can read it easily
  fs.writeFileSync(
    path.join(__dirname, '..', 'quiz-output', '.recipients'),
    emails,
    'utf8'
  );
}

main().catch(err => {
  console.error('❌ sync-agents failed:', err.message);
  process.exit(1);
});
