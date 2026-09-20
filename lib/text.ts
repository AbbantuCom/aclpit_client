export interface SplitTitle {
  before: string;
  highlight: string;
  after: string;
}

/** Splits `title` around the first occurrence of `highlight` for wrapping in a <span>. */
export function splitHighlight(title: string, highlight: string): SplitTitle {
  const idx = highlight ? title.indexOf(highlight) : -1;
  if (idx < 0) return { before: title, highlight: '', after: '' };
  return {
    before: title.slice(0, idx),
    highlight: title.slice(idx, idx + highlight.length),
    after: title.slice(idx + highlight.length),
  };
}

/** Honorifics that would otherwise be mistaken for someone's first name. */
const HONORIFICS = new Set([
  'dr', 'prof', 'professor', 'mr', 'mrs', 'ms', 'miss', 'hon', 'rev', 'sir', 'dame', 'adv',
]);

/**
 * The name to address someone by in running text — "work with Aisha and the team".
 *
 * Naively taking the first word turns "Dr. Aisha Nakato" into "Dr.", so leading
 * honorifics are skipped. Falls back to the whole string when there is nothing
 * else left, which keeps mononyms and unusual formats intact.
 */
export function firstName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const name = parts.find((part) => !HONORIFICS.has(part.replace(/\./g, '').toLowerCase()));
  return name ?? fullName;
}
