import { useState, useRef, useEffect } from 'react';

const SCENARIOS = [
  {
    id: 'fatigue',
    label: 'Fatigue & Hair Loss — 34F Vegetarian',
    systemPrompt: `You are playing the role of Priya, a 34-year-old female customer calling a diagnostics helpline. You are vegetarian, haven't tested in 2 years, and are experiencing fatigue and hair loss for the past 3 months. You're slightly hesitant about the price and not sure if you really need it. You're curious but need convincing. Ask natural follow-up questions. When the agent gives good information, warm up. If they push too hard on price, push back. Stay in character as Priya throughout. The agent you're speaking to is from Truemeds Diagnostics. Keep your responses short — 1-3 sentences like a real phone call.`,
    opening: "Hi, I saw your ad online. I've been feeling really tired lately and losing a lot of hair. Not sure if I need tests or what.",
  },
  {
    id: 'diabetes',
    label: 'Known Diabetic — 55M Doctor Not Asked',
    systemPrompt: `You are playing the role of Ramesh, a 55-year-old male with known Type 2 diabetes. You haven't tested your kidney function in over a year. You're calling out of curiosity but keep saying "my doctor hasn't asked me to do extra tests." You're price-conscious and skeptical. You need to be convinced with clinical reasoning, not just marketing. Stay in character as Ramesh. Keep responses short — 1-3 sentences like a real phone call.`,
    opening: "Hello, I'm diabetic — my doctor knows. He hasn't asked me to do any additional tests. I was just wondering what packages you have for people like me.",
  },
  {
    id: 'joint',
    label: 'Joint Pain — 48F "I\'ll Think About It"',
    systemPrompt: `You are playing the role of Sunita, a 48-year-old woman with joint pain and morning stiffness for 6 months. Your family has a history of arthritis. You keep saying "I'll think about it" or "maybe next month." The agent needs to create genuine urgency and close the booking. You're not rude — just non-committal. Gradually warm up if the agent gives you a compelling reason to act now. Keep responses short — 1-3 sentences.`,
    opening: "Hi, I've been having some joint pain in my hands and knees. Morning time it's really stiff. My mother had arthritis so I'm a bit worried. I'll probably get tested eventually...",
  },
  {
    id: 'price',
    label: 'Price Objection — "Too Expensive"',
    systemPrompt: `You are playing the role of Aditya, a 39-year-old male who called after seeing a ₹2,699 package advertised. You immediately say it's too expensive and ask if there's a cheaper option. You earn a reasonable salary but are frugal. You need the agent to justify the value, break down the cost per test, and show you why this is actually cheap — not just offer a discount. You have no obvious symptoms but haven't tested in 4 years. Keep responses short — 1-3 sentences.`,
    opening: "Hi, I saw the Preventive Complete package for ₹2,699. Honestly that sounds quite expensive. Do you have something cheaper?",
  },
];

export default function PracticePage() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('hp_api_key') || '');
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const saveKey = (k) => {
    setApiKey(k);
    localStorage.setItem('hp_api_key', k);
  };

  const startScenario = () => {
    setMessages([{ role: 'assistant', content: scenario.opening }]);
    setFeedback(null);
    setStarted(true);
  };

  const reset = () => {
    setMessages([]);
    setStarted(false);
    setFeedback(null);
    setInput('');
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: scenario.systemPrompt,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, something went wrong.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: '(Error contacting AI — check your API key and connection.)' }]);
    }
    setLoading(false);
  };

  const getFeedback = async () => {
    if (loading || messages.length < 4) return;
    setLoading(true);
    try {
      const transcript = messages.map((m) => `${m.role === 'user' ? 'Agent' : 'Customer'}: ${m.content}`).join('\n');
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: `You are a sales coach reviewing a diagnostics sales call transcript. The agent works for Truemeds Diagnostics. Evaluate the agent's performance across: (1) consultative questioning, (2) product knowledge accuracy, (3) objection handling, (4) urgency creation, (5) closing technique. Be specific, constructive, and brief. Use this format:

**Overall:** [1 sentence verdict]

**What worked:** [2-3 bullet points]

**What to improve:** [2-3 bullet points]

**Score:** [X/10]`,
          messages: [{ role: 'user', content: `Review this sales call:\n\n${transcript}` }],
        }),
      });
      const data = await res.json();
      setFeedback(data.content?.[0]?.text || 'Could not generate feedback.');
    } catch {
      setFeedback('Error generating feedback. Check your API key.');
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (!apiKey) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-3xl mb-4">🤖</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">AI Practice Partner</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your Anthropic API key to start roleplay sessions with simulated customers. Keys are stored only in your browser.</p>
          <input
            type="password"
            placeholder="sk-ant-..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onBlur={(e) => saveKey(e.target.value)}
            defaultValue={apiKey}
          />
          <button
            onClick={() => { const el = document.querySelector('input[type=password]'); saveKey(el.value); }}
            className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600"
          >
            Save & Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-4">
        <span className="text-xl">🤖</span>
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-sm">AI Practice Partner</div>
          <div className="text-xs text-gray-500">Roleplay with a simulated customer — get scored at the end</div>
        </div>
        {!started ? (
          <div className="flex items-center gap-2">
            <select
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none"
              value={scenario.id}
              onChange={(e) => setScenario(SCENARIOS.find((s) => s.id === e.target.value))}
            >
              {SCENARIOS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            <button onClick={startScenario} className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600">
              Start →
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={getFeedback} disabled={loading || messages.length < 4} className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40">
              Get Feedback
            </button>
            <button onClick={reset} className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50">
              New Scenario
            </button>
          </div>
        )}
      </div>

      {!started ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-3">🎭</div>
            <p className="text-sm">Select a scenario and click Start to begin your practice session.</p>
            <p className="text-xs mt-2 text-gray-300">You play the agent. The AI plays the customer.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
              <div className="text-center text-xs text-gray-400 bg-gray-50 rounded-lg py-2 px-4">
                Scenario: <strong>{scenario.label}</strong> · You are the agent. Respond as you would on a real call.
              </div>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-orange-500 text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                  }`}>
                    {m.role === 'assistant' && <div className="text-xs font-semibold text-gray-400 mb-1">Customer</div>}
                    {m.role === 'user' && <div className="text-xs font-semibold text-orange-200 mb-1">You (Agent)</div>}
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type your response as the agent... (Enter to send)"
                  rows={2}
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-orange-500 text-white px-4 rounded-xl text-sm font-medium hover:bg-orange-600 disabled:opacity-40"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Feedback panel */}
          {feedback && (
            <div className="w-80 border-l border-gray-200 bg-white p-5 overflow-y-auto">
              <div className="text-sm font-semibold text-gray-900 mb-3">📊 Coach Feedback</div>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {feedback.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-gray-900 mt-3 mb-1">{line.slice(2, -2)}</p>;
                  if (line.startsWith('**') && line.includes('**')) {
                    const [bold, rest] = line.split('**').filter(Boolean);
                    return <p key={i} className="mt-2 mb-1"><strong>{bold}</strong>{rest}</p>;
                  }
                  if (line.startsWith('- ')) return <p key={i} className="text-sm mb-1">• {line.slice(2)}</p>;
                  if (line.trim() === '') return <div key={i} className="h-2" />;
                  return <p key={i} className="text-sm mb-1">{line}</p>;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
