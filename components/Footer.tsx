export default function Footer() {
  return (
    <footer>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--text-ghost)' }}>
          © {new Date().getFullYear()} Ankush Tarafdar · IIT Dharwad ·{' '}
          <a
            href="https://github.com/cyberaionics"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
          >
            github.com/cyberaionics
          </a>
        </p>
      </div>
    </footer>
  );
}
