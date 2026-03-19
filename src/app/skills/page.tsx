import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills — Ankush Tarafdar',
};

const categories = [
  {
    name: 'Languages',
    chips: [
      { label: 'C/C++', hot: true },
      { label: 'Python', hot: true },
      { label: 'Rust', hot: false },
      { label: 'Bash', hot: false },
      { label: 'JavaScript', hot: false },
      { label: 'HTML', hot: false },
      { label: 'CSS', hot: false },
    ],
  },
  {
    name: 'Quantum & AI',
    chips: [
      { label: 'Qiskit', hot: true },
      { label: 'Cirq', hot: true },
      { label: 'PyTorch', hot: true },
      { label: 'TensorFlow', hot: false },
      { label: 'ML', hot: true },
      { label: 'Signal Processing', hot: false },
    ],
  },
  {
    name: 'Security & Systems',
    chips: [
      { label: 'Kali Linux', hot: true },
      { label: 'Metasploit', hot: false },
      { label: 'Burp Suite', hot: false },
      { label: 'Wireshark', hot: false },
      { label: 'Ghidra', hot: true },
      { label: 'Arduino', hot: false },
      { label: 'Raspberry Pi', hot: false },
      { label: 'ESP32', hot: false },
    ],
  },
  {
    name: 'Specializations',
    chips: [
      { label: 'Post-Quantum Cryptography', hot: true },
      { label: 'Quantum Algorithms', hot: true },
      { label: 'Cybersecurity', hot: false },
      { label: 'Agentic AI', hot: true },
      { label: 'Machine Learning', hot: true },
      { label: 'Computer Vision', hot: true },
      { label: 'Bayesian Optimisation', hot: true },
      { label: 'Artificial Intelligence', hot: true },
      { label: 'Embedded Systems', hot: false },
      { label: 'Digital Forensics', hot: false },
    ],
  },
];

export default function SkillsPage() {
  return (
    <>
      <Nav />
      <main className="page-container" style={{ paddingTop: 100 }}>
        <div style={{ marginBottom: 64 }}>
          <p className="section-label">$ ls skills/</p>
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
            Skills
          </h1>
          <div className="divider" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {categories.map(({ name, chips }) => (
            <div key={name}>
              <p
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--text-ghost)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                // {name}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {chips.map(({ label, hot }) => (
                  <span key={label} className={`chip ${hot ? 'chip-hot' : ''}`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: 24,
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 11,
              color: 'var(--text-ghost)',
            }}
          >
            // legend
          </span>
          <span className="chip chip-hot" style={{ fontSize: 11 }}>
            Primary Focus
          </span>
          <span className="chip" style={{ fontSize: 11 }}>
            Supporting Skill
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
}
