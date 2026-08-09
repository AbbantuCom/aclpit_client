import type { Metadata } from 'next';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';

export const metadata: Metadata = {
  title: 'Cookie Policy | African Centre for Law and Public Interest Technology',
  description: 'How the African Centre for Law and Public Interest Technology uses cookies on this website, and your choices about them.',
};

export default function CookiesPage() {
  return (
    <>
      <PageBanner
        breadcrumb="Cookie Policy"
        title="Cookie Policy"
        description="How this website uses cookies, and your choices about them."
      />

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4">
              <div className="detail-block reveal visible">
                <p className="pub-meta mb-4"><span>Last Updated</span><span className="dot"></span><span>July 2026</span></p>

                <h2 className="h3">1. What Are Cookies</h2>
                <p>
                  Cookies are small text files placed on your device by a website you visit. They are commonly used
                  to remember your preferences, keep you signed in, or gather information about how a site is used.
                </p>

                <h2 className="h3 mt-12">2. Cookies on This Website</h2>
                <p>
                  The African Centre for Law and Public Interest Technology (ACLPIT, &ldquo;the Centre&rdquo;) sets
                  one strictly necessary cookie, <code>aclpit_cookie_consent</code>, which records whether you
                  accepted or rejected cookies in the consent banner. It contains no personal information, is not
                  used for analytics, tracking or advertising, and is not shared with any third party. It is stored
                  for up to 180 days, or until you clear your browser&rsquo;s cookies.
                </p>
                <p>
                  We do not currently use any other cookies, such as those for analytics, advertising or visitor
                  profiling, on this website.
                </p>

                <h2 className="h3 mt-12">3. Your Choice</h2>
                <p>
                  When you first visit the site, you are asked to accept or reject cookies. Choosing &ldquo;Reject&rdquo;
                  still sets the consent cookie described above, since it is required for the site to remember your
                  choice; it does not enable any additional, non essential cookies. If the Centre introduces further
                  cookies in future, for example to understand how the website is used, we will only set them if
                  you have accepted.
                </p>

                <h2 className="h3 mt-12">4. Changing Your Mind</h2>
                <p>
                  You can update your choice at any time using the &ldquo;Cookie Preferences&rdquo; link in the
                  footer of this website, which reopens the consent banner.
                </p>

                <h2 className="h3 mt-12">5. Third Party Content</h2>
                <p>
                  Some pages embed third party content, such as YouTube videos or Google Maps and Drive. If you
                  interact with that embedded content, the third party provider may set its own cookies in
                  accordance with its own policy. These are not controlled by the Centre.
                </p>

                <h2 className="h3 mt-12">6. Changes to This Policy</h2>
                <p>
                  If the Centre begins using cookies for analytics or other purposes, this page will be updated to
                  describe them before they are set, and the consent banner will ask for your choice again. The
                  current version of this policy is always available on this page.
                </p>
                <p>
                  For questions about this policy, contact us at <a href="mailto:info@aclpit.org">info@aclpit.org</a>.
                  See also our <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta title="Questions about cookies or your data?" description="Contact us and our team will respond to any privacy related enquiry." />
    </>
  );
}
