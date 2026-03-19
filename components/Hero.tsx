import Link from 'next/link';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 92px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 24px 40px',
        maxWidth: 1100,
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* Equity chart background SVG */}
      <div className="equity-bg">
        <svg
          viewBox="0 0 1100 500"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <polyline
            points="0,420 80,390 160,410 240,350 320,360 400,300 480,280 560,310 640,240 720,200 800,220 880,170 960,140 1040,100 1100,80"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points="0,420 80,390 160,410 240,350 320,360 400,300 480,280 560,310 640,240 720,200 800,220 880,170 960,140 1040,100 1100,80 1100,500 0,500"
            fill="url(#equityFill)"
          />
        </svg>
      </div>

      {/* Scanline overlay */}
      <div className="scanline" />

      {/* Eyebrow */}
      <p
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 11,
          fontWeight: 400,
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          marginBottom: 32,
          position: 'relative',
        }}
      >
        IIT Dharwad · B.Tech Mathematics &amp; Computing · 2025–2029
      </p>

      {/* H1 — staggered lines */}
      <h1
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          lineHeight: 1.05,
          marginBottom: 32,
          position: 'relative',
        }}
      >
        <span className="hero-line">
          <span
            style={{
              fontSize: 'clamp(52px, 8vw, 96px)',
              fontWeight: 600,
              color: '#F1F5F9',
              letterSpacing: '-0.03em',
            }}
          >
            Ankush
          </span>
        </span>
        <span className="hero-line">
          <span
            style={{
              fontSize: 'clamp(52px, 8vw, 96px)',
              fontWeight: 600,
              color: 'var(--accent-green)',
              fontStyle: 'italic',
              letterSpacing: '-0.03em',
            }}
          >
            Tarafdar_
          </span>
        </span>
        <span className="hero-line">
          <span
            style={{
              fontSize: 'clamp(52px, 8vw, 96px)',
              fontWeight: 600,
              color: 'var(--text-ghost)',
              WebkitTextStroke: '1px #333',
              letterSpacing: '-0.03em',
            }}
          >
            // builder.
          </span>
        </span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 13,
          fontWeight: 400,
          color: 'var(--text-muted)',
          letterSpacing: '0.04em',
          marginBottom: 20,
          position: 'relative',
          maxWidth: 640,
        }}
      >
        · Cybersecurity · Post-Quantum Cryptography · Agentic AI · Quantum Algorithms · Finance Systems
      </p>

      {/* Bio */}
      <p
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 13,
          fontWeight: 300,
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: 560,
          marginBottom: 40,
          position: 'relative',
        }}
      >
        Building at the intersection of{' '}
        <span style={{ color: '#888' }}>Quantum Theory</span>,{' '}
        <span style={{ color: '#888' }}>Cryptographic Systems</span>, and{' '}
        <span style={{ color: '#888' }}>Agentic AI</span>. First year,{' '}
        <span style={{ color: '#888' }}>IIT Dharwad</span>.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 64,
          position: 'relative',
        }}
      >
        <Link href="/projects" className="btn-green">
          ./view-projects
        </Link>
        <Link href="/about" className="btn-ghost-green">
          ./research
        </Link>
        <Link href="/contact" className="btn-ghost-gray">
          ./contact
        </Link>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          maxWidth: 560,
          position: 'relative',
        }}
      >
        {[
          { value: '10+', label: 'Projects' },
          { value: '7', label: 'Achievements' },
          { value: 'ICPC', label: 'Regionalist' },
          { value: 'PQC+AI', label: 'Focus Areas' },
        ].map(({ value, label }) => (
          <div className="stat-box" key={label}>
            <div
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 22,
                fontWeight: 600,
                color: 'var(--accent-green)',
                letterSpacing: '-0.02em',
                marginBottom: 4,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 11,
                fontWeight: 300,
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
