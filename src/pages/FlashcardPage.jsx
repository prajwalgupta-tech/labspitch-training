import { useState, useEffect, useCallback } from 'react';
import { COMPREHENSIVE_PACKAGE } from '../data/package';
import { PARAMETERS } from '../data/parameters';

// Build two decks
const TEST_DECK = COMPREHENSIVE_PACKAGE.groups.map((g) => ({
  id: g.name,
  front: g.name,
  frontSub: `${g.count} parameter${g.count > 1 ? 's' : ''}`,
  backs: [
    { label: 'What it measures', value: g.what },
    { label: 'What it detects', value: g.detects },
    { label: 'Preparation', value: g.prep },
    { label: 'Pitch angle', value: g.pitchAngle },
  ],
}));

const PARAM_DECK = PARAMETERS.map((p) => ({
  id: p.id,
  front: p.name,
  frontSub: `${p.group} · ${p.unit}`,
  backs: [
    { label: 'Normal range', value: p.normalRange },
    { label: p.low.label, value: p.low.meaning },
    { label: p.high.label, value: p.high.meaning },
    { label: 'Say to customer', value: p.customerScript },
  ],
}));

const DECKS = [
  { id: 'tests', label: 'Test Groups', emoji: '📦', cards: TEST_DECK, count: TEST_DECK.length },
  { id: 'params', label: 'Parameters', emoji: '🔬', cards: PARAM_DECK, count: PARAM_DECK.length },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Flashcard({ card, onKnow, onReview }) {
  const [flipped, setFlipped] = useState(false);
  const [backIdx, setBackIdx] = useState(0);

  // Reset flip when card changes
  useEffect(() => { setFlipped(false); setBackIdx(0); }, [card.id]);

  const handleKey = useCallback((e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped((f) => !f); }
    if (e.key === 'ArrowRight' && flipped) onKnow();
    if (e.key === 'ArrowLeft' && flipped) onReview();
    if (e.key === 'ArrowDown' && flipped) setBackIdx((i) => (i + 1) % card.backs.length);
  }, [flipped, card.backs.length, onKnow, onReview]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className="w-full max-w-lg cursor-pointer select-none"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className="relative transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: 240 }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-sm"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">What is this?</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{card.front}</div>
            <div className="text-sm text-gray-500">{card.frontSub}</div>
            <div className="mt-6 text-xs text-gray-300">Tap to flip</div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-blue-600 rounded-2xl flex flex-col p-6 shadow-sm"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-xs text-blue-200 uppercase tracking-wider mb-2">{card.backs[backIdx].label}</div>
            <div className="text-white text-sm leading-relaxed flex-1 flex items-center">
              {card.backs[backIdx].value}
            </div>
            {card.backs.length > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {card.backs.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setBackIdx(i); }}
                      className={`w-2 h-2 rounded-full transition-colors ${i === backIdx ? 'bg-white' : 'bg-blue-400'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setBackIdx((i) => (i + 1) % card.backs.length); }}
                  className="text-blue-200 text-xs hover:text-white"
                >
                  Next info ↓
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons — only show when flipped */}
      <div className={`flex gap-3 mt-6 transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={onReview}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
        >
          <span>←</span> Review again
        </button>
        <button
          onClick={onKnow}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
        >
          Got it <span>→</span>
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-300">Space to flip · ← Review · → Got it · ↓ Next info</div>
    </div>
  );
}

export default function FlashcardPage() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [known, setKnown] = useState([]);
  const [toReview, setToReview] = useState([]);
  const [done, setDone] = useState(false);
  const [round, setRound] = useState(1);

  const startDeck = (deck) => {
    setDeckId(deck.id);
    setCards(shuffle(deck.cards));
    setIdx(0); setKnown([]); setToReview([]); setDone(false); setRound(1);
  };

  const handleKnow = () => {
    setKnown((k) => [...k, cards[idx]]);
    advance();
  };

  const handleReview = () => {
    setToReview((r) => [...r, cards[idx]]);
    advance();
  };

  const advance = () => {
    if (idx + 1 >= cards.length) setDone(true);
    else setIdx((i) => i + 1);
  };

  const retryMissed = () => {
    if (toReview.length === 0) return;
    setCards(shuffle(toReview));
    setIdx(0); setKnown([]); setToReview([]); setDone(false);
    setRound((r) => r + 1);
  };

  const resetDeck = () => {
    setDeckId(null); setCards([]); setIdx(0);
    setKnown([]); setToReview([]); setDone(false); setRound(1);
  };

  // Deck selector
  if (!deckId) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🃏</div>
            <h1 className="text-2xl font-bold text-gray-900">Flashcard Mode</h1>
            <p className="text-gray-500 text-sm mt-2">Flip-card drills. Mark cards you know — retry the ones you don't.</p>
          </div>
          <div className="flex flex-col gap-3">
            {DECKS.map((d) => (
              <button
                key={d.id}
                onClick={() => startDeck(d)}
                className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{d.emoji}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{d.label}</div>
                    <div className="text-sm text-gray-500">{d.count} cards</div>
                  </div>
                  <span className="ml-auto text-blue-500 font-semibold">Start →</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">Tip: Use keyboard shortcuts — Space to flip, ← / → to mark</p>
        </div>
      </div>
    );
  }

  // Done screen
  if (done) {
    const knownCount = known.length + (idx < cards.length ? 0 : 0);
    const allKnown = known.length;
    const missedCount = toReview.length;
    const pct = Math.round((allKnown / cards.length) * 100);

    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-4">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚'}</div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Round {round} complete</h2>
          <p className="text-gray-500 text-sm mb-6">
            {pct >= 80 ? 'Strong performance!' : pct >= 50 ? 'Good — keep drilling the tricky ones.' : 'Keep going — it gets easier.'}
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex justify-around">
              <div>
                <div className="text-3xl font-bold text-green-600">{allKnown}</div>
                <div className="text-xs text-gray-500 mt-1">Got it</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500">{missedCount}</div>
                <div className="text-xs text-gray-500 mt-1">Review again</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{pct}%</div>
                <div className="text-xs text-gray-500 mt-1">Score</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            {missedCount > 0 && (
              <button onClick={retryMissed} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
                Retry {missedCount} missed →
              </button>
            )}
            <button
              onClick={() => startDeck(DECKS.find(d => d.id === deckId))}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm hover:bg-gray-50"
            >
              Restart deck
            </button>
            <button onClick={resetDeck} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm hover:bg-gray-50">
              Choose deck
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = cards[idx];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center gap-4">
        <button onClick={resetDeck} className="text-xs text-gray-500 hover:text-gray-700">← Decks</button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${(idx / cards.length) * 100}%` }} />
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">{idx + 1}/{cards.length}</span>
          </div>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="text-green-600 font-semibold">✓ {known.length}</span>
          <span className="text-red-500 font-semibold">↺ {toReview.length}</span>
        </div>
        {round > 1 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Round {round}</span>}
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <Flashcard key={current.id} card={current} onKnow={handleKnow} onReview={handleReview} />
        </div>
      </div>
    </div>
  );
}
