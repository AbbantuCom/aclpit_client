import Link from 'next/link';

interface Props {
  breadcrumb: string;
  title: string;
  description: string;
}

export default function PageBanner({ breadcrumb, title, description }: Props) {
  return (
    <header className="page-banner">
      <div className="max-w-7xl mx-auto px-6">
        <p className="breadcrumb-aclpit"><Link href="/">Home</Link> &nbsp;/&nbsp; {breadcrumb}</p>
        <h1 className="reveal visible">{title}</h1>
        <div className="arch-divider on-dark" aria-hidden="true"><span></span><span></span></div>
        <p>{description}</p>
      </div>
    </header>
  );
}
