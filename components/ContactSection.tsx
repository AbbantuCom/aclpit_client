'use client';

const topics = [
  'General Enquiry',
  'Research and Publications',
  'Technical Advisory',
  'Training and Capacity Building',
  'Convenings and Dialogues',
  'Public Interest Litigation',
  'Partnerships and Media',
];

// Static for now — Phase 4 replaces this with a useMutation POST to
// ${ADMIN_API_URL}/api/contact, plus real validation and loading/success/error states.
export default function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <span className="eyebrow">Contact Us</span>
          <h2>Let us shape Africa&rsquo;s digital future together</h2>
          <p className="lead-lg mx-auto" style={{ maxWidth: 720 }}>
            Whether you are a government, regulator, technology company, civil society organisation or researcher, we
            would like to hear from you.
          </p>
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
                      {topics.map((t) => (
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
                <div><strong>Email</strong><a href="mailto:info@aclpit.org">info@aclpit.org</a></div>
              </li>
              <li>
                <i className="bi bi-telephone" />
                <div><strong>Phone</strong><a href="tel:+256414671838">+256 414 671 838</a></div>
              </li>
              <li>
                <i className="bi bi-geo-alt" />
                <div><strong>Physical Address</strong>Plot 1 Lourdel Road, Lourdel Towers, 5th Floor</div>
              </li>
              <li>
                <i className="bi bi-mailbox" />
                <div><strong>Postal Address</strong>P.O. BOX 133174 Kampala&ndash;Uganda</div>
              </li>
              <li>
                <i className="bi bi-clock" />
                <div><strong>Office Hours</strong>Monday to Friday, 8:30 am to 5:30 pm EAT</div>
              </li>
            </ul>
            <div className="map-frame mb-4">
              <iframe
                title="ACLPIT office location map"
                src="https://maps.google.com/maps?q=Plot%201%20Lourdel%20Road%2C%20Kampala%2C%20Uganda&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/african-centre-for-law-and-public-interest-technology/about/" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
              <a href="#" aria-label="X"><i className="bi bi-twitter-x" /></a>
              <a href="https://www.youtube.com/@LegalTechDialogues" target="_blank" rel="noopener" aria-label="YouTube"><i className="bi bi-youtube" /></a>
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
