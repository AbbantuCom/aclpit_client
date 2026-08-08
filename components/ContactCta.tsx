import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  buttonLabel?: string;
}

export default function ContactCta({ title, description, buttonLabel = 'Contact Our Team' }: Props) {
  return (
    <section className="section section-wine">
      <div className="max-w-7xl mx-auto px-6 text-center reveal">
        <span className="eyebrow on-dark">Get In Touch</span>
        <h2 className="mb-3">{title}</h2>
        <p className="lead-lg mx-auto mb-4" style={{ maxWidth: 700 }}>{description}</p>
        <Link className="btn btn-ivory" href="/#contact">{buttonLabel}</Link>
      </div>
    </section>
  );
}
