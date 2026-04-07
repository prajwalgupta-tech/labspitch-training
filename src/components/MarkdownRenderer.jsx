/**
 * Renders inline markdown: **bold**, and plain text.
 */
function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part
      )}
    </>
  );
}

/**
 * Renders a markdown content string into React elements.
 * Supports: ## h2, ### h3, **bold** inline, > blockquote,
 * --- divider, → callout, bullet lists, numbered lists, blank lines.
 */
export default function MarkdownRenderer({ content, accentColor = 'blue' }) {
  const lines = content.split('\n');

  const quoteColors = {
    blue: 'border-blue-400 bg-blue-50',
    purple: 'border-purple-400 bg-purple-50',
    green: 'border-green-400 bg-green-50',
  };
  const calloutColors = {
    blue: 'text-blue-700 bg-blue-50',
    purple: 'text-purple-700 bg-purple-50',
    green: 'text-green-700 bg-green-50',
  };
  const wrongColor = 'text-red-600';
  const rightColor = 'text-green-600';

  return (
    <div className="leading-relaxed">
      {lines.map((line, i) => {
        // H2
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.slice(3)}</h2>;
        }
        // H3
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-base font-semibold text-gray-800 mt-5 mb-2">{line.slice(4)}</h3>;
        }
        // HR
        if (line.trim() === '---') {
          return <hr key={i} className="my-5 border-gray-200" />;
        }
        // Blockquote
        if (line.startsWith('> ')) {
          return (
            <blockquote key={i} className={`border-l-4 pl-4 py-1 my-2 text-sm italic text-gray-700 rounded-r ${quoteColors[accentColor]}`}>
              <Inline text={line.slice(2)} />
            </blockquote>
          );
        }
        // → callout
        if (line.startsWith('→ ')) {
          return (
            <p key={i} className={`text-sm px-3 py-1 rounded mb-2 ${calloutColors[accentColor]}`}>
              → <Inline text={line.slice(2)} />
            </p>
          );
        }
        // Wrong/right response markers
        if (line.startsWith('**Wrong response:**')) {
          return <p key={i} className={`text-sm font-medium mt-2 ${wrongColor}`}>✗ Wrong: <Inline text={line.replace('**Wrong response:**', '').trim()} /></p>;
        }
        if (line.startsWith('**Right response:**')) {
          return <p key={i} className={`text-sm font-medium mt-2 ${rightColor}`}>✓ Right: <Inline text={line.replace('**Right response:**', '').trim()} /></p>;
        }
        // Bullet list
        if (line.startsWith('- ')) {
          return (
            <p key={i} className="text-sm mb-1 flex gap-1.5">
              <span className="mt-0.5 flex-shrink-0">•</span>
              <span><Inline text={line.slice(2)} /></span>
            </p>
          );
        }
        // Numbered list
        if (/^\d+\. /.test(line)) {
          return (
            <p key={i} className="text-sm mb-1 ml-2">
              <Inline text={line} />
            </p>
          );
        }
        // Table lines — skip (tables rendered separately by parent)
        if (line.startsWith('| ')) return null;
        // Blank line
        if (line.trim() === '') return <div key={i} className="h-2" />;
        // Default paragraph with inline bold
        return (
          <p key={i} className="text-sm text-gray-700 mb-2">
            <Inline text={line} />
          </p>
        );
      })}
    </div>
  );
}
