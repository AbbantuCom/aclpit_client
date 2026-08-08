import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// Called by aclpit_admin_api right after a content section is saved, so this
// site's cache for that section drops instead of waiting out the hourly ISR window.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.secret !== 'string' || typeof body.tag !== 'string') {
    return NextResponse.json({ error: 'secret and tag are required' }, { status: 400 });
  }

  if (!process.env.REVALIDATE_SECRET || body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // { expire: 0 } expires the tag immediately — the caller is an external
  // system (the admin API's save webhook) that needs the change to take
  // effect right away, not Next 16's stale-while-revalidate "max" profile.
  revalidateTag(body.tag, { expire: 0 });

  return NextResponse.json({ revalidated: true, tag: body.tag, now: Date.now() });
}
