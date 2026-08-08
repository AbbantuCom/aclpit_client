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
