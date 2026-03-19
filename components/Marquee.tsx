const items = [
  'Post-Quantum Cryptography',
  '◆',
  'ICPC Regionalist',
  '◆',
  'Morris AI',
  '◆',
  'Agentic AI',
  '◆',
  'Ring-LWE · CRYSTALS-Kyber',
  '◆',
  'Quantum Error Correction',
  '◆',
  'IIT Dharwad',
  '◆',
  'JEE 99%iler',
  '◆',
  'Cybersecurity',
  '◆',
  'Finance Systems',
  '◆',
];

export default function Marquee() {
  return (
    <div
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        height: 44,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(to right, var(--bg-surface), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: 'linear-gradient(to left, var(--bg-surface), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              padding: '0 16px',
              fontSize: 12,
              fontWeight: item === '◆' ? 400 : 300,
              color: item === '◆' ? 'var(--accent-green)' : 'var(--text-muted)',
              fontFamily: 'IBM Plex Mono, monospace',
              whiteSpace: 'nowrap',
              letterSpacing: item === '◆' ? 0 : '0.04em',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
