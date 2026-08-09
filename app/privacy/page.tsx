import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';

export const metadata: Metadata = {
  title: 'Privacy Policy | African Centre for Law and Public Interest Technology',
  description: 'How the African Centre for Law and Public Interest Technology collects, uses and protects personal information.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageBanner
        breadcrumb="Privacy Policy"
        title="Privacy Policy"
        description="How the Centre collects, uses and protects your personal information."
      />

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4">
              <div className="detail-block reveal visible">
                <p className="pub-meta mb-4"><span>Last Updated</span><span className="dot"></span><span>July 2026</span></p>

                <h2 className="h3">1. Introduction</h2>
                <p>
                  The African Centre for Law and Public Interest Technology (ACLPIT, &ldquo;the Centre&rdquo;,
                  &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting the privacy of everyone who visits
                  this website or engages with our work. This policy explains what personal information we collect,
                  why we collect it, and how we handle it.
                </p>

                <h2 className="h3 mt-12">2. Information We Collect</h2>
                <p>
                  We collect information you provide directly, such as your name, email address, organisation and
                  message when you use our contact form or subscribe to updates. We may also collect limited
                  technical information, such as browser type and pages visited, to understand how the website is
                  used and to improve it.
                </p>

                <h2 className="h3 mt-12">3. How We Use Your Information</h2>
                <p>
                  We use personal information to respond to enquiries, share publications and event information you
                  have requested, improve the website and carry out the Centre&rsquo;s charitable and public
                  interest activities. We do not sell personal information, and we do not use it for commercial
                  advertising.
                </p>

                <h2 className="h3 mt-12">4. Sharing and Disclosure</h2>
                <p>
                  We share personal information only with service providers who help us operate this website and
                  our communications, under appropriate safeguards, or where the law requires disclosure. As an
                  institution that works on data protection, we hold ourselves to the standards we advocate.
                </p>

                <h2 className="h3 mt-12">5. Data Security and Retention</h2>
                <p>
                  We apply reasonable technical and organisational measures to protect personal information against
                  loss, misuse and unauthorised access, and we retain it only for as long as necessary for the
                  purposes described in this policy.
                </p>

                <h2 className="h3 mt-12">6. Your Rights</h2>
                <p>
                  Subject to applicable law, you may request access to, correction of, or deletion of your personal
                  information, and you may object to or restrict certain processing. To exercise these rights,
                  contact us at <a href="mailto:info@aclpit.org">info@aclpit.org</a>.
                </p>

                <h2 className="h3 mt-12">7. Changes to This Policy</h2>
                <p>
                  We may update this policy from time to time. The most current version will always be available on
                  this page, with the date of the last update shown above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta title="Questions about your data?" description="Contact us and our team will respond to any privacy related enquiry." />
    </>
  );
}
