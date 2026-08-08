import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';

export const metadata: Metadata = {
  title: 'Terms of Use | African Centre for Law and Public Interest Technology',
  description: 'Terms governing the use of the ACLPIT website and its content.',
};

export default function TermsPage() {
  return (
    <>
      <PageBanner
        breadcrumb="Terms of Use"
        title="Terms of Use"
        description="The terms that govern your use of this website and the Centre's published materials."
      />

      <section className="section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4">
              <div className="detail-block reveal visible">
                <p className="pub-meta mb-4"><span>Last Updated</span><span className="dot"></span><span>July 2026</span></p>

                <h2 className="h3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using this website, operated by the African Centre for Law and Public Interest
                  Technology (ACLPIT, &ldquo;the Centre&rdquo;), you agree to these Terms of Use. If you do not
                  agree, please do not use the website.
                </p>

                <h2 className="h3 mt-12">2. Use of Content</h2>
                <p>
                  The content on this website, including publications, commentary and other materials, is provided
                  for general information and public interest purposes. You may read, download and share our
                  materials for non commercial purposes with appropriate attribution to the Centre, unless a
                  specific publication states otherwise.
                </p>

                <h2 className="h3 mt-12">3. No Legal Advice</h2>
                <p>
                  Nothing on this website constitutes legal advice, and no lawyer client relationship is created by
                  your use of the website or by contacting the Centre. If you require legal advice, you should
                  consult a qualified legal practitioner in your jurisdiction.
                </p>

                <h2 className="h3 mt-12">4. Intellectual Property</h2>
                <p>
                  The Centre&rsquo;s name, logo and original content are the property of the Centre or its
                  licensors. Third party content, where included, remains the property of its respective owners.
                </p>

                <h2 className="h3 mt-12">5. Third Party Links</h2>
                <p>
                  This website may contain links to third party websites and services, including video platforms.
                  The Centre is not responsible for the content or privacy practices of those third parties.
                </p>

                <h2 className="h3 mt-12">6. Limitation of Liability</h2>
                <p>
                  The website and its content are provided on an &ldquo;as is&rdquo; basis. To the fullest extent
                  permitted by law, the Centre disclaims liability for any loss arising from reliance on the content
                  of this website.
                </p>

                <h2 className="h3 mt-12">7. Changes and Contact</h2>
                <p>
                  We may revise these terms from time to time, and the current version will always be published on
                  this page. Questions about these terms may be directed to{' '}
                  <a href="mailto:info@aclpit.org">info@aclpit.org</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta title="Need clarification on these terms?" description="Reach out and we will be glad to help." />
    </>
  );
}
