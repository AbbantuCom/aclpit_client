import { draftMode } from 'next/headers';

/**
 * Fixed bar shown only while Draft Mode is on, so an editor can never mistake a
 * preview for the live site. Exit is a native form POST to the exit route rather
 * than a link, because Next prefetches <Link>s and would drop the draft cookie
 * before the editor ever clicked.
 */
export default async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <aside
      role="status"
      style={{
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '0.6rem 1rem',
        background: '#5E0E3A',
        color: '#fff',
        fontSize: '0.85rem',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.25)',
      }}
    >
      <strong style={{ letterSpacing: '0.02em' }}>Preview mode</strong>
      <span style={{ opacity: 0.85 }}>
        You are viewing unpublished draft content. Visitors still see the published site.
      </span>
      <form action="/api/preview/exit" method="post" style={{ margin: 0 }}>
        <button
          type="submit"
          style={{
            background: '#fff',
            color: '#5E0E3A',
            border: 0,
            borderRadius: '999px',
            padding: '0.35rem 0.9rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Exit preview
        </button>
      </form>
    </aside>
  );
}
