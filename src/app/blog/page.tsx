import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { getAllPosts } from '../../../lib/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Ankush Tarafdar',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="page-container" style={{ paddingTop: 100 }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p className="section-label">$ ls blog/</p>
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
            Blog
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
            writing on quantum cryptography, agentic AI &amp; finance systems
          </p>
          <div className="divider" />
        </div>

        {posts.length === 0 ? (
          <div
            style={{
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'IBM Plex Mono',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--text-ghost)',
                fontStyle: 'italic',
              }}
            >
              // writing coming soon — quantum cryptography, agentic AI &amp; finance systems
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {posts.map((post) => (
              <article
                key={post.slug}
                style={{
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  padding: '24px 28px',
                  transition: 'border-color 0.2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 24,
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: 'IBM Plex Mono',
                        fontSize: 11,
                        color: 'var(--text-ghost)',
                        letterSpacing: '0.06em',
                        marginBottom: 8,
                      }}
                    >
                      {post.date}
                    </p>
                    <h2
                      style={{
                        fontFamily: 'IBM Plex Mono',
                        fontSize: 16,
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        marginBottom: 10,
                        lineHeight: 1.3,
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'IBM Plex Mono',
                        fontSize: 12,
                        fontWeight: 300,
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                        maxWidth: 580,
                        marginBottom: 16,
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                      {(post.tags ?? []).map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="btn-ghost-green"
                      style={{ fontSize: 12, padding: '7px 14px' }}
                    >
                      ./read-more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
