'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COOKIE_PREFERENCES_EVENT } from './CookiePreferencesLink';

const CONSENT_COOKIE = 'aclpit_cookie_consent';
const CONSENT_MAX_AGE_DAYS = 180;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie(CONSENT_COOKIE)) setVisible(true);

    function showBanner() {
      setVisible(true);
    }
    window.addEventListener(COOKIE_PREFERENCES_EVENT, showBanner);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, showBanner);
  }, []);

  function setConsent(value: 'accepted' | 'rejected') {
    setCookie(CONSENT_COOKIE, value, CONSENT_MAX_AGE_DAYS);
    setVisible(false);
  }

  return (
    <div className={`cookie-banner ${visible ? 'is-visible' : ''}`} role="region" aria-label="Cookie consent">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <p>
            We use a cookie to remember your cookie preference. Accept or reject cookies, and change your choice
            anytime. Read our <Link href="/cookies">Cookie Policy</Link>.
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn-outline-ivory" onClick={() => setConsent('rejected')}>Reject</button>
          <button type="button" className="btn btn-ivory" onClick={() => setConsent('accepted')}>Accept</button>
        </div>
      </div>
    </div>
  );
}
