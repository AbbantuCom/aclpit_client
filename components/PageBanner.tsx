import Link from 'next/link';

interface Props {
  breadcrumb: string;
  title: string;
  description: string;
  /** Anchor id, so menu links can point at the top of the page (e.g. `#who-we-are`). */
  id?: string;
  /** Extra content under the description, such as call-to-action buttons. */
  children?: React.ReactNode;
}

export default function PageBanner({ breadcrumb, title, description, id, children }: Props) {
  return (
    <header className="page-banner" id={id}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        <p className="breadcrumb-aclpit"><Link href="/">Home</Link> &nbsp;/&nbsp; {breadcrumb}</p>
        <h1 className="reveal visible">{title}</h1>
        <div className="arch-divider on-dark" aria-hidden="true"><span></span><span></span></div>
        <p>{description}</p>
        {children && <div className="relative z-10 mt-6">{children}</div>}
      </div>
    </header>
  );
}
