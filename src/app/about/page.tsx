import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Ankush Tarafdar',
};

const meta = [
  { label: 'Institution', value: 'Indian Institute of Technology, Dharwad' },
  { label: 'Program', value: 'B.Tech Mathematics & Computing (2025–2029)' },
  {
    label: 'Interests',
    value:
      'Post-Quantum Cryptography · Quantum Algorithms · Agentic AI · Machine Learning · Computer Vision · Cybersecurity · Embedded Systems · Robotics · Signal Processing',
  },
  { label: 'Location', value: 'Kolkata, West Bengal, India' },
  { label: 'Status', value: 'First Year · Open to Research Collaborations' },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="page-container" style={{ paddingTop: 100 }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p className="section-label">$ cat about.txt</p>
          <h1
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}
          >
            About
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
          {/* Bio */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}
              >
                First-year B.Tech Mathematics &amp; Computing at IIT Dharwad with deep interest in quantum
                computing, cybersecurity, and AI systems.
              </p>
              <p
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}
              >
                Research focuses on post-quantum cryptography (lattice-based primitives, Ring-LWE,
                CRYSTALS-Kyber) and quantum information theory (QEC, Stabilizer Formalism).
              </p>
              <p
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}
              >
                Building at the intersection of theory and systems — from multi-agentic AI workflows to
                hardware-level exploits.
              </p>
            </div>
          </div>

          {/* Meta info */}
          <div
            style={{
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
            }}
          >
            {meta.map(({ label, value }, i) => (
              <div
                key={label}
                style={{
                  padding: '16px 20px',
                  borderBottom: i < meta.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap: 16,
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--accent-green)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    paddingTop: 2,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 12,
                    fontWeight: 300,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub + Links */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
          <p className="section-label">// connect</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
            {[
              { label: 'GitHub', href: 'https://github.com/cyberaionics' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/atcysec' },
              { label: 'Email', href: 'mailto:ankush.tarafdar06@gmail.com' },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost-green">
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
