import Nav from '../../../../components/Nav';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '../../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: `${post.title} — Ankush Tarafdar`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return (
    <>
      <Nav />
      <main className="page-container" style={{ paddingTop: 100, maxWidth: 780 }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 40 }}>
          <Link
            href="/blog"
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 12,
              color: 'var(--text-muted)',
              textDecoration: 'none',
            }}
          >
            ← blog
          </Link>
          <span style={{ color: 'var(--text-ghost)', margin: '0 8px', fontSize: 12 }}>/</span>
          <span
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 12,
              color: 'var(--accent-green)',
            }}
          >
            {params.slug}
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
              marginBottom: 12,
            }}
          >
            {post.date}
          </p>
          <h1
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: 16,
              lineHeight: 1.25,
            }}
          >
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {(post.tags ?? []).map((t) => (
              <span key={t} className="tag tag-green">
                {t}
              </span>
            ))}
          </div>
          <p
            style={{
              fontFamily: 'IBM Plex Mono',
              fontSize: 13,
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: 8,
            }}
          >
            {post.excerpt}
          </p>
          <div className="divider" />
        </div>

        {/* MDX Content */}
        <div className="prose-green">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                remarkPlugins: [remarkMath as any],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rehypePlugins: [rehypeKatex as any],
              },
            }}
          />
        </div>

        {/* Footer nav */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <Link href="/blog" className="btn-ghost-gray" style={{ fontSize: 12 }}>
            ← back to blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
