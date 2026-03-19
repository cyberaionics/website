'use client';

import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import { useState } from 'react';

const socials = [
  {
    label: 'Email',
    value: 'ankush.tarafdar06@gmail.com',
    href: 'mailto:ankush.tarafdar06@gmail.com',
  },
  {
    label: 'Institute',
    value: 'mc25bt011@iitdh.ac.in',
    href: 'mailto:mc25bt011@iitdh.ac.in',
  },
  {
    label: 'GitHub',
    value: 'github.com/cyberaionics',
    href: 'https://github.com/cyberaionics',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/atcysec',
    href: 'https://linkedin.com/in/atcysec',
  },
];

// Replace YOUR_FORM_ID below with your Formspree form ID (e.g. "mreyrrjn")
const FORMSPREE_ID = 'mreyrrjn'; // <-- YOUR_FORM_ID

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Nav />
      <main className="page-container" style={{ paddingTop: 100 }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p className="section-label">$ ./contact</p>
          <h1
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}
          >
            Contact
          </h1>
          <div className="divider" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          {/* Left col */}
          <div>
            <h2
              style={{
                fontFamily: 'IBM Plex Mono',
                fontSize: 22,
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: 16,
                lineHeight: 1.3,
              }}
            >
              Let&apos;s build something together.
            </h2>
            <p
              style={{
                fontFamily: 'IBM Plex Mono',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Open to research collaborations, internship opportunities, and interesting conversations in
              quantum computing, AI, or security.
            </p>

            {/* Social links */}
            <div
              style={{
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
              }}
            >
              {socials.map(({ label, value, href }, i) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr auto',
                    alignItems: 'center',
                    padding: '14px 20px',
                    borderBottom:
                      i < socials.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'IBM Plex Mono',
                      fontSize: 10,
                      fontWeight: 500,
                      color: 'var(--accent-green)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'IBM Plex Mono',
                      fontSize: 12,
                      fontWeight: 300,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'IBM Plex Mono',
                      fontSize: 11,
                      color: 'var(--text-ghost)',
                    }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right col — form */}
          <div>
            <p className="section-label" style={{ marginBottom: 20 }}>
              // send a message
            </p>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 11,
                    color: 'var(--text-ghost)',
                    letterSpacing: '0.06em',
                    marginBottom: 6,
                  }}
                >
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your name"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 11,
                    color: 'var(--text-ghost)',
                    letterSpacing: '0.06em',
                    marginBottom: 6,
                  }}
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 11,
                    color: 'var(--text-ghost)',
                    letterSpacing: '0.06em',
                    marginBottom: 6,
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="what's on your mind?"
                  rows={6}
                  style={{ resize: 'vertical', minHeight: 120 }}
                />
              </div>

              <button
                type="submit"
                className="btn-green"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  opacity: status === 'sending' ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {status === 'sending' ? '// sending...' : '// send_message()'}
              </button>

              {status === 'sent' && (
                <p
                  style={{
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 12,
                    color: 'var(--accent-green)',
                    textAlign: 'center',
                    padding: '10px',
                    border: '1px solid var(--accent-green-muted)',
                    background: 'rgba(74,222,128,0.04)',
                  }}
                >
                  ✓ message sent — I&apos;ll get back to you soon
                </p>
              )}

              {status === 'error' && (
                <p
                  style={{
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 12,
                    color: 'var(--red-neg)',
                    textAlign: 'center',
                    padding: '10px',
                    border: '1px solid rgba(239,68,68,0.3)',
                    background: 'rgba(239,68,68,0.04)',
                  }}
                >
                  ✗ something went wrong — try emailing directly
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
