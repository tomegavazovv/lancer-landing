'use client';

import { cn } from '@/lib/utils';

interface HighlightedTextProps {
  text: string;
}

export function HighlightedText({ text }: HighlightedTextProps) {
  if (!text.trim()) return null;

  // Split by spaces and quotes, preserving quoted phrases
  const tokens: Array<{ text: string; isQuoted: boolean }> = [];
  let currentToken = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && currentToken) {
        tokens.push({ text: currentToken, isQuoted: true });
        currentToken = '';
      }
      inQuotes = !inQuotes;
    } else if (char === ' ' && !inQuotes) {
      if (currentToken) {
        tokens.push({ text: currentToken, isQuoted: false });
        currentToken = '';
      }
    } else {
      currentToken += char;
    }
  }

  if (currentToken) {
    tokens.push({ text: currentToken, isQuoted: inQuotes });
  }

  return (
    <div className='flex flex-wrap gap-1.5 text-xs'>
      {tokens.map((token, index) => (
        <span
          key={index}
          className={cn(
            'px-2 py-1 rounded-md font-medium',
            token.isQuoted
              ? 'bg-[#D94C58]/20 text-[#D94C58] border border-[#D94C58]/30'
              : 'bg-white/10 text-white/90 border border-white/20'
          )}
        >
          {token.isQuoted ? `"${token.text}"` : token.text}
        </span>
      ))}
    </div>
  );
}
