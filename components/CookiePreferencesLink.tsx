'use client';

export const COOKIE_PREFERENCES_EVENT = 'aclpit:cookie-preferences';

export default function CookiePreferencesLink() {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT));
      }}
    >
      Cookie Preferences
    </a>
  );
}
