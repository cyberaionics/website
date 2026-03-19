'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/about', label: 'about' },
  { href: '/skills', label: 'skills' },
  { href: '/projects', label: 'projects' },
  { href: '/achievements', label: 'achievements' },
  { href: '/blog', label: 'blog' },
  { href: '/contact', label: 'contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--accent-green)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          ~/ankush-tarafdar
        </Link>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 12,
                fontWeight: 400,
                color: pathname === href ? 'var(--accent-green)' : 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                letterSpacing: '0.02em',
              }}
            >
              {label}
            </Link>
          ))}

          {/* Available badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              paddingLeft: 16,
              borderLeft: '1px solid var(--border-mid)',
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50% !important',
                background: 'var(--accent-green)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontWeight: 300,
                whiteSpace: 'nowrap',
              }}
            >
              available for collabs
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
