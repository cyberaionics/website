import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Projects from '../../../components/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Ankush Tarafdar',
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="page-container" style={{ paddingTop: 100 }}>
        <div style={{ marginBottom: 48 }}>
          <p className="section-label">$ ls projects/</p>
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
            Projects
          </h1>
          <p
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 12,
              color: 'var(--text-muted)',
              fontWeight: 300,
              marginBottom: 8,
            }}
          >
            9 projects · click any row to expand
          </p>
          <div className="divider" />
        </div>

        <Projects />
      </main>
      <Footer />
    </>
  );
}
