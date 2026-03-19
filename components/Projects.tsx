'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '../lib/projects';

export default function Projects() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setOpen((prev) => (prev === slug ? null : slug));
  };

  return (
    <div
      style={{
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
      }}
    >
      {PROJECTS.map((p, i) => (
        <div
          key={p.slug}
          style={{
            borderBottom: i < PROJECTS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
          }}
        >
          {/* Row */}
          <div
            onClick={() => toggle(p.slug)}
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr auto',
              alignItems: 'center',
              padding: '16px 20px',
              gap: 16,
              cursor: 'none',
              transition: 'background 0.15s',
              background: open === p.slug ? 'rgba(74,222,128,0.03)' : 'transparent',
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 11,
                fontWeight: 400,
                color: 'var(--text-ghost)',
                letterSpacing: '0.04em',
              }}
            >
              {p.index}
            </span>

            {/* Name + Tags */}
            <div>
              <span
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: 14,
                  fontWeight: 500,
                  color: open === p.slug ? 'var(--accent-green)' : 'var(--text-primary)',
                  transition: 'color 0.2s',
                }}
              >
                {p.name}
              </span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <span
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 12,
                color: open === p.slug ? 'var(--accent-green)' : 'var(--text-ghost)',
                transition: 'transform 0.3s, color 0.2s',
                display: 'inline-block',
                transform: open === p.slug ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ▼
            </span>
          </div>

          {/* Accordion content */}
          <div
            className={`accordion-content ${open === p.slug ? 'open' : ''}`}
          >
            <div
              style={{
                padding: '0 20px 20px 64px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <p
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  maxWidth: 600,
                }}
              >
                {p.desc}
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link href={`/projects/${p.slug}`} className="btn-green" style={{ fontSize: 12, padding: '8px 16px' }}>
                  ./view-details →
                </Link>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-gray"
                    style={{ fontSize: 12, padding: '8px 16px' }}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
