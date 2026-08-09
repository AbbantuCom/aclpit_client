import type { Metadata } from 'next';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import DialoguesGrid from '@/components/DialoguesGrid';
import { getSection } from '@/lib/content-api';
import { fallbackDialogues } from '@/lib/fallback-content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Legal Tech Dialogues | African Centre for Law and Public Interest Technology',
  description: "Legal Tech Dialogues: ACLPIT's video series on law, technology and the public interest in Africa.",
};

export default async function DialoguesPage() {
  const dialogues = await getSection('dialogues', fallbackDialogues);
  const sorted = [...dialogues].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageBanner
        breadcrumb="Legal Tech Dialogues"
        title="Legal Tech Dialogues"
        description="A video series bringing policymakers, technologists, regulators and communities into one conversation about Africa's digital future."
      />

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <DialoguesGrid items={sorted} />
          <div className="text-center mt-14 reveal">
            <p className="lead-lg mx-auto" style={{ maxWidth: 680 }}>
              Legal Tech Dialogues brings together voices from government, industry, civil society and academia for
              candid conversations about law, technology and the public interest in Africa.
            </p>
            <Link className="btn btn-wine mt-2" href="/#contact">Suggest a Topic or Guest</Link>
          </div>
        </div>
      </section>

      <ContactCta title="Join the conversation" description="Suggest a topic, nominate a guest or invite the Centre to your own platform." />
    </>
  );
}
