'use client';

import type { ContactContent } from '@/types';

// Static for now — Phase 4 replaces this with a useMutation POST to
// ${ADMIN_API_URL}/api/contact, plus real validation and loading/success/error states.
export default function ContactSection({ data }: { data: ContactContent }) {
  return (
    <section className="section" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <span className="eyebrow">{data.subtitle}</span>
          <h2>{data.title}</h2>
          <p className="lead-lg mx-auto" style={{ maxWidth: 720 }}>{data.description}</p>
        </div>
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 reveal">
            <div className="contact-panel">
              <form onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label" htmlFor="cName">Full Name</label>
                    <input className="form-control" type="text" id="cName" name="name" required />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cEmail">Email Address</label>
                    <input className="form-control" type="email" id="cEmail" name="email" required />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cAddress">Address</label>
                    <input className="form-control" type="text" id="cAddress" name="address" />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cOrg">Organisation</label>
                    <input className="form-control" type="text" id="cOrg" name="organisation" />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cTopic">Area of Interest</label>
                    <select className="form-select" id="cTopic" name="topic">
                      {data.topics.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="form-label" htmlFor="cMsg">Message</label>
                    <textarea className="form-control" id="cMsg" name="message" rows={5} required />
                  </div>
                  <div className="sm:col-span-2">
                    <button className="btn btn-wine" type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-5 reveal reveal-delay-1">
            <ul className="contact-list mb-4">
              <li>
                <i className="bi bi-envelope" />
                <div><strong>Email</strong><a href={`mailto:${data.email}`}>{data.email}</a></div>
              </li>
              <li>
                <i className="bi bi-telephone" />
                <div><strong>Phone</strong><a href={`tel:${data.phone.replace(/\s+/g, '')}`}>{data.phone}</a></div>
              </li>
              <li>
                <i className="bi bi-geo-alt" />
                <div><strong>Physical Address</strong>{data.address}</div>
              </li>
              <li>
                <i className="bi bi-mailbox" />
                <div><strong>Postal Address</strong>{data.postalAddress}</div>
              </li>
              <li>
                <i className="bi bi-clock" />
                <div><strong>Office Hours</strong>{data.officeHours}</div>
              </li>
            </ul>
            <div className="map-frame mb-4">
              <iframe
                title="ACLPIT office location map"
                src={data.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="social-links">
              {data.socials.linkedin && (
                <a href={data.socials.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
              )}
              <a href={data.socials.twitter || '#'} aria-label="X"><i className="bi bi-twitter-x" /></a>
              {data.socials.youtube && (
                <a href={data.socials.youtube} target="_blank" rel="noopener" aria-label="YouTube"><i className="bi bi-youtube" /></a>
              )}
              <a href={data.socials.facebook || '#'} aria-label="Facebook"><i className="bi bi-facebook" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
