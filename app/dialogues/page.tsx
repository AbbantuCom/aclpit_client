import type { Metadata } from 'next';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import DialoguesGrid, { type DialogueEntry } from '@/components/DialoguesGrid';

export const metadata: Metadata = {
  title: 'Legal Tech Dialogues | African Centre for Law and Public Interest Technology',
  description: "Legal Tech Dialogues: ACLPIT's video series on law, technology and the public interest in Africa.",
};

const dialogues: DialogueEntry[] = [
  {
    id: 'unit-trusts',
    youtubeId: 'NZZkLlvyX1A',
    category: 'Legal Tech',
    title: 'Rethinking Unit Trusts, T-Bills & Bonds',
    description:
      "Hosted by Tony Kira Galandi on Legal Tech Dialogues, this video explores Uganda's capital markets. Featuring legal expert Luis Kisto, it demystifies unit trusts, treasury bills, and government bonds, encouraging lawyers and bankers to move beyond traditional loan disputes toward modern financial market investment opportunities.",
  },
  {
    id: 'courts-cybersecurity',
    youtubeId: 'iOCYecdRklY',
    category: 'Legal Tech',
    title: 'Courts, Counsel & Cybersecurity: Navigating the Paperless Frontier',
    description:
      "A conversation on the intersection of courts, legal counsel and cybersecurity as Uganda's justice sector transitions toward paperless systems.",
  },
  {
    id: 'mental-health-ai',
    youtubeId: '3XE7fpZ5RUk',
    category: 'Legal Tech',
    title: 'Mental Health in the Age of Legal AI: Opportunities, Ethics and Safeguards',
    description:
      'Exploring the opportunities, ethical questions and safeguards raised by artificial intelligence for mental health and wellbeing in the legal profession.',
  },
  {
    id: 'digital-justice-uganda',
    youtubeId: 'J8pOvS33LZw',
    category: 'Legal Tech',
    title: 'Digital Justice in Uganda: AI & ICT Opportunities, Barriers, and Policies',
    description:
      "A discussion on the opportunities, barriers and policy questions shaping AI and ICT adoption within Uganda's justice sector.",
  },
  {
    id: 'digital-justice-constitutionalism',
    youtubeId: 'dy_bb3UsRLg',
    category: 'Legal Tech',
    title: 'Digital Justice and Constitutionalism in the Contemporary Era',
    description: 'Examining how digital justice initiatives intersect with constitutionalism in the contemporary era.',
  },
  {
    id: 'digital-revolution-left-behind',
    youtubeId: 'zlCjAkwA92k',
    category: 'Legal Tech',
    title: "Who Is Being Left Behind in Uganda's Digital Revolution? | Simon Kaggwa Njala",
    description: "Simon Kaggwa Njala joins Legal Tech Dialogues to discuss who is being left behind in Uganda's digital revolution.",
  },
  {
    id: 'competition-law-fintech',
    youtubeId: '6wlrKHCiEmI',
    category: 'Capacity Building Initiatives',
    title: 'Competition Law Compliance Training for Fintech Service Providers in Uganda',
    description: 'A capacity building training session on competition law compliance for fintech service providers in Uganda.',
  },
];

export default function DialoguesPage() {
  return (
    <>
      <PageBanner
        breadcrumb="Legal Tech Dialogues"
        title="Legal Tech Dialogues"
        description="A video series bringing policymakers, technologists, regulators and communities into one conversation about Africa's digital future."
      />

      <section className="section">
        <div className="max-w-7xl mx-auto px-6">
          <DialoguesGrid items={dialogues} />
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
