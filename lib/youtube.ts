/**
 * Extracts the 11-character video ID from any common YouTube URL shape
 * (watch?v=, youtu.be/, embed/, live/). Falls back to returning the input
 * unchanged if none of the patterns match, so a bare ID still works.
 */
export function extractYouTubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
    /(?:youtu\.be\/)([^?&\s]+)/,
    /(?:youtube\.com\/embed\/)([^?&\s]+)/,
    /(?:youtube\.com\/live\/)([^?&\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return url;
}
