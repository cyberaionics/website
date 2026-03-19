import Nav from '../../../../components/Nav';
import Footer from '../../../../components/Footer';
import ProjectViz from '../../../../components/ProjectViz';
import { PROJECTS } from '../../../../lib/projects';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  return {
    title: project ? `${project.name} — Ankush Tarafdar` : 'Project — Ankush Tarafdar',
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <>
        <Nav />
        <main className="page-container" style={{ paddingTop: 100 }}>
          <p style={{ fontFamily: 'IBM Plex Mono', color: 'var(--text-muted)' }}>
            // project not found
          </p>
          <Link href="/projects" className="btn-ghost-gray" style={{ marginTop: 24, display: 'inline-block' }}>
            ← back to projects
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="page-container" style={{ paddingTop: 100 }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 40 }}>
          <Link
            href="/projects"
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 12,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ← projects
          </Link>
          <span style={{ color: 'var(--text-ghost)', margin: '0 8px', fontSize: 12 }}>/</span>
          <span
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 12,
              color: 'var(--accent-green)',
            }}
          >
            {project.slug}
          </span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 11,
              color: 'var(--text-ghost)',
              letterSpacing: '0.06em',
              marginBottom: 8,
            }}
          >
            {project.index}
          </p>
          <h1
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 'clamp(22px, 4vw, 36px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </h1>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {project.tags.map((t) => (
              <span key={t} className="tag tag-green">
                {t}
              </span>
            ))}
          </div>
          <div className="divider" />
        </div>

        {/* Description */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            marginBottom: 48,
            alignItems: 'start',
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: 12 }}>
              // description
            </p>
            <p
              style={{
                fontFamily: 'IBM Plex Mono',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
              }}
            >
              {project.desc}
            </p>

            {/* GitHub link */}
            {project.github && (
              <div style={{ marginTop: 24 }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-green"
                  style={{ fontSize: 12 }}
                >
                  View on GitHub ↗
                </a>
              </div>
            )}
          </div>

          <div>
            <p className="section-label" style={{ marginBottom: 12 }}>
              // metadata
            </p>
            <div
              style={{
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
              }}
            >
              {[
                { label: 'Index', value: project.index },
                { label: 'Slug', value: project.slug },
                { label: 'Tags', value: project.tags.join(' · ') },
                { label: 'Status', value: 'Completed' },
              ].map(({ label, value }, i, arr) => (
                <div
                  key={label}
                  style={{
                    padding: '12px 16px',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: 12,
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
                      paddingTop: 1,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'IBM Plex Mono',
                      fontSize: 12,
                      fontWeight: 300,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div>
          <p className="section-label" style={{ marginBottom: 12 }}>
            // interactive visualization
          </p>
          <div className="viz-container">
            <ProjectViz slug={project.slug} />
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <Link href="/projects" className="btn-ghost-gray" style={{ fontSize: 12 }}>
            ← all projects
          </Link>

          {/* Prev / Next */}
          <div style={{ display: 'flex', gap: 12 }}>
            {(() => {
              const idx = PROJECTS.findIndex((p) => p.slug === params.slug);
              const prev = PROJECTS[idx - 1];
              const next = PROJECTS[idx + 1];
              return (
                <>
                  {prev && (
                    <Link
                      href={`/projects/${prev.slug}`}
                      className="btn-ghost-gray"
                      style={{ fontSize: 12 }}
                    >
                      ← {prev.index}
                    </Link>
                  )}
                  {next && (
                    <Link
                      href={`/projects/${next.slug}`}
                      className="btn-ghost-gray"
                      style={{ fontSize: 12 }}
                    >
                      {next.index} →
                    </Link>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
