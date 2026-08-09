'use client';

import { useState, type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { ContactContent } from '@/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  address: string;
  organisation: string;
  topic: string;
  message: string;
}

const emptyForm: FormState = { name: '', email: '', address: '', organisation: '', topic: '', message: '' };

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!form.message.trim()) errors.message = 'Please include a short message.';
  return errors;
}

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

async function submitContact(payload: ContactPayload): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;
  if (!baseUrl) throw new Error('The contact form is not configured. Please email us directly instead.');

  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || 'Something went wrong sending your message. Please try again.');
  }
}

export default function ContactSection({ data }: { data: ContactContent }) {
  const [form, setForm] = useState<FormState>({ ...emptyForm, topic: data.topics[0] ?? '' });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({ mutationFn: submitContact });

  const errors = submitted ? validate(form) : {};
  const hasErrors = Object.keys(errors).length > 0;

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) return;

    // The admin API only accepts { name, email, subject, message } — fold the
    // organisation/address/topic fields the legacy design collects into
    // subject + message, the same way _legacy/js/main.js's mailto fallback did.
    const messageLines = [
      form.organisation && `Organisation: ${form.organisation}`,
      form.address && `Address: ${form.address}`,
    ].filter(Boolean);
    const message = messageLines.length ? `${messageLines.join('\n')}\n\n${form.message.trim()}` : form.message.trim();

    mutation.mutate(
      { name: form.name.trim(), email: form.email.trim(), subject: form.topic || 'General Enquiry', message },
      {
        onSuccess: () => {
          setForm({ ...emptyForm, topic: data.topics[0] ?? '' });
          setSubmitted(false);
        },
      }
    );
  }

  return (
    <section className="section" id="contact">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14 reveal">
          <span className="eyebrow">{data.subtitle}</span>
          <h2>{data.title}</h2>
          <p className="lead-lg mx-auto" style={{ maxWidth: 720 }}>{data.description}</p>
        </div>
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 reveal">
            <div className="contact-panel">
              {mutation.isSuccess && (
                <div className="mb-6 rounded-[10px] border border-wine bg-sand px-5 py-4 text-ink" role="status">
                  Thank you. Your message has been sent — we will be in touch soon.
                </div>
              )}
              {mutation.isError && (
                <div className="mb-6 rounded-[10px] border border-wine bg-sand px-5 py-4 text-ink" role="alert">
                  {mutation.error instanceof Error ? mutation.error.message : 'Something went wrong. Please try again.'}
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label" htmlFor="cName">Full Name</label>
                    <input
                      className="form-control"
                      type="text"
                      id="cName"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      required
                    />
                    {errors.name && <p className="text-wine text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cEmail">Email Address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="cEmail"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      required
                    />
                    {errors.email && <p className="text-wine text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cAddress">Address</label>
                    <input className="form-control" type="text" id="cAddress" value={form.address} onChange={(e) => set('address', e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cOrg">Organisation</label>
                    <input className="form-control" type="text" id="cOrg" value={form.organisation} onChange={(e) => set('organisation', e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cTopic">Area of Interest</label>
                    <select className="form-select" id="cTopic" value={form.topic} onChange={(e) => set('topic', e.target.value)}>
                      {data.topics.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="form-label" htmlFor="cMsg">Message</label>
                    <textarea
                      className="form-control"
                      id="cMsg"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      required
                    />
                    {errors.message && <p className="text-wine text-sm mt-1">{errors.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <button className="btn btn-wine" type="submit" disabled={mutation.isPending || (submitted && hasErrors)}>
                      {mutation.isPending ? 'Sending…' : 'Send Message'}
                    </button>
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
