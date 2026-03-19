import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Achievements — Ankush Tarafdar',
};

const entrance = [
  {
    index: '01',
    title: 'JEE Mains — 99th Percentile',
    tag: '◆ Entrance Exam',
    desc: 'All India Joint Entrance Examination (Mains). Top 1% among 1.2 million+ candidates.',
    stat: '99%ile',
    year: '2025',
  },
  {
    index: '02',
    title: 'JEE Advanced — AIR 6561',
    tag: '◆ Entrance Exam',
    desc: 'All India Rank 6561 in JEE Advanced — gateway to IITs. One of ~180,000 who qualify to sit the exam.',
    stat: 'AIR 6561',
    year: '2025',
  },
  {
    index: '03',
    title: 'WBJEE — AIR 387',
    tag: '◆ Entrance Exam',
    desc: 'All India Rank 387 in West Bengal Joint Entrance Examination.',
    stat: 'AIR 387',
    year: '2025',
  },
  {
    index: '04',
    title: 'ISI B.Stat — Category Rank 27',
    tag: '◆ Entrance Exam',
    desc: "Category Rank 27 in Indian Statistical Institute B.Stat entrance — one of India's most selective math exams.",
    stat: 'Rank 27',
    year: '2025',
  },
];

const technical = [
  {
    index: '05',
    title: 'ICPC 2025–26 Regionalist',
    tag: '◆ Competition',
    desc: 'Team ApexAlgo, IIT Dharwad — International Collegiate Programming Contest.',
    stat: 'ICPC',
    year: '2025',
  },
  {
    index: '06',
    title: 'Quantum Computing Certification — IIT Delhi',
    tag: '◆ Certification',
    desc: 'Mentored by Prof. Kolin Paul. Quantum Error Correction, fault-tolerant gates, Stabilizer Formalism.',
    stat: 'IIT Delhi',
    year: '2025',
  },
  {
    index: '07',
    title: 'Smart India Hackathon Finalist',
    tag: '◆ Hackathon',
    desc: 'Team HashLock — hardware tampering detection for industrial measuring instruments.',
    stat: 'SIH',
    year: '2025',
  },
];

function AchievementCard({
  index,
  title,
  tag,
  desc,
  stat,
  year,
}: {
  index: string;
  title: string;
  tag: string;
  desc: string;
  stat: string;
  year: string;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '20px 24px',
        display: 'grid',
        gridTemplateColumns: '48px 1fr auto',
        gap: 20,
        alignItems: 'start',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Index */}
      <div>
        <span
          style={{
            fontFamily: 'IBM Plex Mono',
            fontSize: 11,
            fontWeight: 400,
            color: 'var(--text-ghost)',
            letterSpacing: '0.04em',
          }}
        >
          {index}
        </span>
      </div>

      {/* Content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
          <h3
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>
          <span className="tag tag-green" style={{ fontSize: 10 }}>
            {tag}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'IBM Plex Mono',
            fontSize: 12,
            fontWeight: 300,
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: 520,
          }}
        >
          {desc}
        </p>
      </div>

      {/* Stat */}
      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontFamily: 'IBM Plex Mono',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--accent-green)',
            letterSpacing: '-0.02em',
            marginBottom: 4,
          }}
        >
          {stat}
        </div>
        <div
          style={{
            fontFamily: 'IBM Plex Mono',
            fontSize: 10,
            fontWeight: 300,
            color: 'var(--text-ghost)',
          }}
        >
          {year}
        </div>
      </div>
    </div>
  );
}

export default function AchievementsPage() {
  return (
    <>
      <Nav />
      <main className="page-container" style={{ paddingTop: 100 }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p className="section-label">$ cat achievements.log</p>
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
            Achievements
          </h1>
          <p
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 12,
              color: 'var(--text-muted)',
              fontWeight: 300,
              marginBottom: 8,
            }}
          >
            7 achievements · academic entrance + technical
          </p>
          <div className="divider" />
        </div>

        {/* Entrance Exams */}
        <div style={{ marginBottom: 56 }}>
          <p
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--text-ghost)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            // Academic Entrance Exams
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {entrance.map((a) => (
              <AchievementCard key={a.index} {...a} />
            ))}
          </div>
        </div>

        {/* Technical */}
        <div>
          <p
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--text-ghost)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            // Technical Achievements
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {technical.map((a) => (
              <AchievementCard key={a.index} {...a} />
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
          }}
        >
          {[
            { value: '99%ile', label: 'JEE Mains' },
            { value: 'AIR 387', label: 'WBJEE' },
            { value: 'ICPC', label: '2025–26' },
            { value: 'IIT Delhi', label: 'Certification' },
          ].map(({ value, label }) => (
            <div className="stat-box" key={label}>
              <div
                style={{
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 18,
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
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 11,
                  fontWeight: 300,
                  color: 'var(--text-muted)',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
