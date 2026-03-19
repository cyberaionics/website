import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ankush Tarafdar — Mathematics & Computing, IIT Dharwad',
  description:
    'Post-Quantum Cryptography · Agentic AI · Quantum Algorithms · Cybersecurity · Finance Systems. B.Tech Mathematics & Computing, IIT Dharwad (2025–2029).',
  keywords: [
    'Ankush Tarafdar',
    'IIT Dharwad',
    'Post-Quantum Cryptography',
    'Agentic AI',
    'Quantum Computing',
    'Cybersecurity',
  ],
  authors: [{ name: 'Ankush Tarafdar' }],
  openGraph: {
    title: 'Ankush Tarafdar',
    description: 'Post-Quantum Cryptography · Agentic AI · Quantum Algorithms',
    type: 'website',
    url: 'https://cyberaionics.github.io',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const dot = document.getElementById('cursor-dot');
                const ring = document.getElementById('cursor-ring');
                let mouseX = 0, mouseY = 0;
                let ringX = 0, ringY = 0;
                
                document.addEventListener('mousemove', function(e) {
                  mouseX = e.clientX;
                  mouseY = e.clientY;
                  dot.style.left = mouseX + 'px';
                  dot.style.top = mouseY + 'px';
                });
                
                function animateRing() {
                  ringX += (mouseX - ringX) * 0.15;
                  ringY += (mouseY - ringY) * 0.15;
                  ring.style.left = ringX + 'px';
                  ring.style.top = ringY + 'px';
                  requestAnimationFrame(animateRing);
                }
                animateRing();
                
                document.addEventListener('mouseleave', function() {
                  dot.style.opacity = '0';
                  ring.style.opacity = '0';
                });
                document.addEventListener('mouseenter', function() {
                  dot.style.opacity = '1';
                  ring.style.opacity = '1';
                });
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
