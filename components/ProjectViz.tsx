'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Ring-LWE Lattice Grid ───────────────────────────────────────────────────
function RingLWEViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const step = 30;
    const cx = W / 2;
    const cy = H / 2;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, W, H);

    // Draw lattice points
    for (let i = -8; i <= 8; i++) {
      for (let j = -5; j <= 5; j++) {
        const x = cx + i * step + j * 8;
        const y = cy + j * step;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const alpha = Math.max(0.05, 1 - dist / 200);

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${alpha})`;
        ctx.fill();

        // Grid lines
        if (i < 8) {
          const nx = cx + (i + 1) * step + j * 8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, y);
          ctx.strokeStyle = `rgba(74,222,128,${alpha * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        if (j < 5) {
          const ny = cy + (j + 1) * step;
          const nx2 = cx + i * step + (j + 1) * 8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx2, ny);
          ctx.strokeStyle = `rgba(74,222,128,${alpha * 0.2})`;
          ctx.stroke();
        }
      }
    }

    // Highlight origin region (secret lattice)
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(74,222,128,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Ciphertext vector
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 72, cy - 48);
    ctx.strokeStyle = '#4ADE80';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 72, cy - 48, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#4ADE80';
    ctx.fill();
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={560}
        height={300}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <div style={{ marginTop: 16, padding: '12px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
          // Ring-LWE encryption formula
        </p>
        <div
          style={{
            fontFamily: 'IBM Plex Mono',
            fontSize: 13,
            color: 'var(--accent-green)',
            background: 'var(--bg-deep)',
            padding: '10px 14px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          c = (A·s + e) mod q, where e ← χ_σ (Gaussian noise)
        </div>
        <div style={{ marginTop: 8, fontFamily: 'IBM Plex Mono', fontSize: 12, color: 'var(--text-ghost)' }}>
          q = 3329 (Kyber) · n = 256 · σ = 3.19
        </div>
      </div>
    </div>
  );
}

// ─── QUBO/QAOA Quantum Circuit ───────────────────────────────────────────────
function QUBOViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const qubits = 4;
    const lineSpacing = 56;
    const startY = 60;
    const startX = 60;
    const endX = W - 40;

    const gates = [
      { type: 'H', qubit: 0, x: 120 },
      { type: 'H', qubit: 1, x: 120 },
      { type: 'H', qubit: 2, x: 120 },
      { type: 'H', qubit: 3, x: 120 },
      { type: 'Rz', qubit: 0, x: 200 },
      { type: 'CNOT', control: 0, target: 1, x: 270 },
      { type: 'Rz', qubit: 1, x: 340 },
      { type: 'CNOT', control: 1, target: 2, x: 410 },
      { type: 'Rz', qubit: 2, x: 480 },
      { type: 'CNOT', control: 2, target: 3, x: 380 },
      { type: 'M', qubit: 0, x: 520 },
      { type: 'M', qubit: 1, x: 520 },
      { type: 'M', qubit: 2, x: 520 },
      { type: 'M', qubit: 3, x: 520 },
    ];

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, W, H);

      t += 0.02;

      // Qubit labels & wires
      for (let q = 0; q < qubits; q++) {
        const y = startY + q * lineSpacing;
        ctx.fillStyle = '#888';
        ctx.font = '12px IBM Plex Mono';
        ctx.fillText(`|q${q}⟩`, 12, y + 5);

        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.strokeStyle = '#2A2A2A';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw gates
      gates.forEach((g) => {
        const pulse = (Math.sin(t * 3 + g.x * 0.01) + 1) / 2;
        const alpha = 0.5 + pulse * 0.5;

        if (g.type === 'CNOT') {
          const cy2 = startY + (g as any).control * lineSpacing;
          const ty = startY + (g as any).target * lineSpacing;
          ctx.beginPath();
          ctx.moveTo(g.x, cy2);
          ctx.lineTo(g.x, ty);
          ctx.strokeStyle = `rgba(74,222,128,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(g.x, cy2, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(74,222,128,${alpha})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(g.x, ty, 12, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(74,222,128,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(g.x - 12, ty);
          ctx.lineTo(g.x + 12, ty);
          ctx.moveTo(g.x, ty - 12);
          ctx.lineTo(g.x, ty + 12);
          ctx.stroke();
        } else {
          const qy = startY + (g as any).qubit * lineSpacing;
          const boxW = g.type === 'M' ? 24 : 30;
          const boxH = 28;
          ctx.strokeStyle = `rgba(74,222,128,${alpha})`;
          ctx.fillStyle = `rgba(74,222,128,0.08)`;
          ctx.lineWidth = 1;
          ctx.fillRect(g.x - boxW / 2, qy - boxH / 2, boxW, boxH);
          ctx.strokeRect(g.x - boxW / 2, qy - boxH / 2, boxW, boxH);
          ctx.fillStyle = `rgba(74,222,128,${alpha})`;
          ctx.font = '11px IBM Plex Mono';
          ctx.textAlign = 'center';
          ctx.fillText(g.type, g.x, qy + 4);
          ctx.textAlign = 'left';
        }
      });

      // QAOA label
      ctx.font = '11px IBM Plex Mono';
      ctx.fillStyle = '#444';
      ctx.fillText('QAOA depth p=1 · 4-qubit NISQ circuit', 12, H - 12);

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={580}
      height={320}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
}

// ─── Bayes Frontier — Drone + Heatmap ────────────────────────────────────────
function BayesFrontierViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, W, H);

      const t = (timeRef.current += 0.01);

      // Heatmap
      const gridSize = 20;
      const cols = Math.floor(W / gridSize);
      const rows = Math.floor(H / gridSize);
      const dockX = W * 0.65;
      const dockY = H * 0.55;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const px = i * gridSize + gridSize / 2;
          const py = j * gridSize + gridSize / 2;
          const dist = Math.sqrt((px - dockX) ** 2 + (py - dockY) ** 2);
          const sigma = 60 + Math.sin(t * 0.5) * 10;
          const prob = Math.exp(-(dist ** 2) / (2 * sigma ** 2));
          ctx.fillStyle = `rgba(74,222,128,${prob * 0.25})`;
          ctx.fillRect(i * gridSize, j * gridSize, gridSize - 1, gridSize - 1);
        }
      }

      // Dock target
      ctx.beginPath();
      ctx.arc(dockX, dockY, 16, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(74,222,128,0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(dockX, dockY, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'var(--accent-green)';
      ctx.fill();

      // Drone path
      const droneX = dockX - 80 * Math.cos(t * 0.4) + Math.sin(t * 1.2) * 15;
      const droneY = dockY - 60 * Math.sin(t * 0.4) + Math.cos(t * 0.9) * 10;

      // Drone body
      ctx.save();
      ctx.translate(droneX, droneY);
      const arms = [
        [-14, -14],
        [14, -14],
        [14, 14],
        [-14, 14],
      ];
      arms.forEach(([ax, ay]) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(ax, ay);
        ctx.strokeStyle = '#4ADE80';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ax, ay, 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(74,222,128,0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.restore();

      // Path line to dock
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(droneX, droneY);
      ctx.lineTo(dockX, dockY);
      ctx.strokeStyle = 'rgba(74,222,128,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.font = '10px IBM Plex Mono';
      ctx.fillStyle = '#555';
      ctx.fillText('DRONE', droneX - 18, droneY - 20);
      ctx.fillText('DOCK', dockX - 14, dockY - 22);
      ctx.fillStyle = '#333';
      ctx.fillText('Bayesian probability heatmap · P(position | sensor_data)', 12, H - 12);

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={320}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
}

// ─── HashLock — Live SHA-256 Hasher ─────────────────────────────────────────
function HashLockViz() {
  const [input, setInput] = useState('hello_world');
  const [hash, setHash] = useState('');
  const [prevHash, setPrevHash] = useState('');
  const [diffBits, setDiffBits] = useState(0);

  const computeHash = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  useEffect(() => {
    const update = async () => {
      const h = await computeHash(input);
      if (prevHash) {
        let bits = 0;
        for (let i = 0; i < Math.min(h.length, prevHash.length); i++) {
          if (h[i] !== prevHash[i]) bits++;
        }
        setDiffBits(bits);
      }
      setPrevHash(hash);
      setHash(h);
    };
    update();
  }, [input]);

  return (
    <div
      style={{
        fontFamily: 'IBM Plex Mono',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div>
        <p style={{ fontSize: 11, color: 'var(--text-ghost)', marginBottom: 8 }}>// input string</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-input"
          style={{ fontSize: 13 }}
          placeholder="type anything..."
        />
      </div>

      <div>
        <p style={{ fontSize: 11, color: 'var(--text-ghost)', marginBottom: 8 }}>// SHA-256 digest</p>
        <div
          style={{
            background: 'var(--bg-deep)',
            border: '1px solid var(--accent-green)',
            padding: '12px 14px',
            fontSize: 12,
            color: 'var(--accent-green)',
            wordBreak: 'break-all',
            letterSpacing: '0.05em',
            lineHeight: 1.6,
          }}
        >
          {hash || '—'}
        </div>
      </div>

      {diffBits > 0 && (
        <div>
          <p style={{ fontSize: 11, color: 'var(--text-ghost)', marginBottom: 8 }}>// avalanche effect</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              background: 'rgba(74,222,128,0.04)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                height: 6,
                background: 'var(--accent-green)',
                width: `${(diffBits / 64) * 100}%`,
                transition: 'width 0.3s',
                maxWidth: '100%',
              }}
            />
            <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              {diffBits}/{64} hex chars changed
            </span>
          </div>
        </div>
      )}

      <p style={{ fontSize: 11, color: 'var(--text-ghost)' }}>
        // SHA-256 · Web Crypto API · avalanche effect demo
      </p>
    </div>
  );
}

// ─── Deepfake Detection — Confidence Chart ───────────────────────────────────
function DeepfakeViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    const labels = ['Facial\nBlend', 'Eye\nBlink', 'Skin\nTexture', 'Lighting', 'Temporal\nConsistency', 'Overall'];
    const scores = [0.92, 0.78, 0.95, 0.83, 0.88, 0.91];
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, W, H);
      t = Math.min(t + 0.025, 1);

      const barW = 60;
      const gap = (W - 60 - labels.length * barW) / (labels.length + 1);
      const maxH = H - 100;

      labels.forEach((label, i) => {
        const x = 40 + gap * (i + 1) + i * barW;
        const score = scores[i];
        const h = maxH * score * t;
        const y = H - 55 - h;

        const grad = ctx.createLinearGradient(0, y, 0, y + h);
        grad.addColorStop(0, `rgba(74,222,128,0.9)`);
        grad.addColorStop(1, `rgba(74,222,128,0.2)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barW, h);

        ctx.fillStyle = '#4ADE80';
        ctx.font = '11px IBM Plex Mono';
        ctx.textAlign = 'center';
        ctx.fillText(`${(score * 100).toFixed(0)}%`, x + barW / 2, y - 8);

        ctx.fillStyle = '#555';
        ctx.font = '10px IBM Plex Mono';
        label.split('\n').forEach((line, li) => {
          ctx.fillText(line, x + barW / 2, H - 38 + li * 14);
        });
      });

      // Threshold line
      const threshY = H - 55 - maxH * 0.5;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(30, threshY);
      ctx.lineTo(W - 10, threshY);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#ef4444';
      ctx.font = '10px IBM Plex Mono';
      ctx.textAlign = 'right';
      ctx.fillText('threshold 50%', W - 14, threshY - 6);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#333';
      ctx.font = '10px IBM Plex Mono';
      ctx.fillText('deepfake confidence scores · ML pipeline', 12, H - 8);

      if (t < 1) frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={300}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
}

// ─── sEMG Waveform ────────────────────────────────────────────────────────────
function SEMGViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const [noise, setNoise] = useState(0.3);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, W, H);

      const t = (timeRef.current += 0.04);
      const mid = H / 2;
      const amp = 80;

      // Raw signal (noisy)
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const phase = (x / W) * Math.PI * 8 - t;
        const raw =
          mid +
          amp * Math.sin(phase) * Math.exp(-0.3 * Math.abs(Math.sin(phase * 0.5))) +
          (Math.random() - 0.5) * amp * noise * 2;
        x === 0 ? ctx.moveTo(x, raw) : ctx.lineTo(x, raw);
      }
      ctx.strokeStyle = 'rgba(74,222,128,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Filtered signal
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const phase = (x / W) * Math.PI * 8 - t;
        const filtered = mid + amp * Math.sin(phase) * Math.exp(-0.3 * Math.abs(Math.sin(phase * 0.5)));
        x === 0 ? ctx.moveTo(x, filtered) : ctx.lineTo(x, filtered);
      }
      ctx.strokeStyle = '#4ADE80';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Labels
      ctx.font = '10px IBM Plex Mono';
      ctx.fillStyle = 'rgba(74,222,128,0.4)';
      ctx.fillText('raw', 8, 20);
      ctx.fillStyle = '#4ADE80';
      ctx.fillText('filtered', 8, 36);
      ctx.fillStyle = '#333';
      ctx.fillText('sEMG waveform · BPF + notch filter · 2kHz sampling', 8, H - 10);

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [noise]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={560}
        height={260}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontFamily: 'IBM Plex Mono',
          fontSize: 12,
        }}
      >
        <span style={{ color: 'var(--text-muted)' }}>noise level</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={noise}
          onChange={(e) => setNoise(parseFloat(e.target.value))}
          style={{ flex: 1, accentColor: 'var(--accent-green)', cursor: 'none' }}
        />
        <span style={{ color: 'var(--accent-green)', width: 36 }}>{(noise * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

// ─── BadUSB Attack Flow SVG ───────────────────────────────────────────────────
function BadUSBViz() {
  return (
    <div style={{ fontFamily: 'IBM Plex Mono' }}>
      <svg viewBox="0 0 560 280" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <style>{`
          @keyframes flowPulse {
            0% { stroke-dashoffset: 20; opacity: 0.4; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          .flow-line {
            stroke-dasharray: 6 4;
            animation: flowPulse 0.8s linear infinite;
          }
          @keyframes nodeGlow {
            0%, 100% { filter: drop-shadow(0 0 2px #4ADE80); }
            50% { filter: drop-shadow(0 0 8px #4ADE80); }
          }
          .node-active { animation: nodeGlow 1.5s ease-in-out infinite; }
        `}</style>

        {/* Step nodes */}
        {[
          { x: 40, y: 120, label: 'BadUSB\nDevice', step: '01' },
          { x: 160, y: 120, label: 'USB\nEnumeration', step: '02' },
          { x: 280, y: 120, label: 'HID\nRecognition', step: '03' },
          { x: 400, y: 120, label: 'Keystroke\nInjection', step: '04' },
          { x: 510, y: 120, label: 'Payload\nExec', step: '05' },
        ].map(({ x, y, label, step }) => (
          <g key={step} className="node-active" style={{ animationDelay: `${parseInt(step) * 0.3}s` }}>
            <rect
              x={x - 34}
              y={y - 28}
              width={68}
              height={56}
              fill="rgba(74,222,128,0.06)"
              stroke="#4ADE80"
              strokeWidth="1"
            />
            <text x={x} y={y - 6} fill="#4ADE80" fontSize="9" textAnchor="middle" fontFamily="IBM Plex Mono">
              {step}
            </text>
            {label.split('\n').map((line, i) => (
              <text key={i} x={x} y={y + 10 + i * 13} fill="#888" fontSize="9" textAnchor="middle" fontFamily="IBM Plex Mono">
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* Connecting arrows */}
        {[74, 194, 314, 434].map((x) => (
          <g key={x}>
            <line
              x1={x}
              y1={120}
              x2={x + 50}
              y2={120}
              stroke="#4ADE80"
              strokeWidth="1.5"
              className="flow-line"
            />
            <polygon
              points={`${x + 50},115 ${x + 60},120 ${x + 50},125`}
              fill="#4ADE80"
              opacity="0.7"
            />
          </g>
        ))}

        {/* Mitigation branch */}
        <line x1="400" y1="148" x2="400" y2="210" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
        <rect x="358" y="210" width="84" height="32" fill="rgba(239,68,68,0.06)" stroke="#ef4444" strokeWidth="1" />
        <text x="400" y="228" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="IBM Plex Mono">
          BLOCKED
        </text>
        <text x="400" y="240" fill="#ef4444" fontSize="8" textAnchor="middle" fontFamily="IBM Plex Mono">
          (USBGuard)
        </text>

        {/* Labels */}
        <text x="12" y="270" fill="#333" fontSize="9" fontFamily="IBM Plex Mono">
          BadUSB HID keystroke injection · Arduino · mitigation: USBGuard + HID whitelisting
        </text>
      </svg>
    </div>
  );
}

// ─── Robotic Arm IK Sliders ───────────────────────────────────────────────────
function RoboticArmViz() {
  const [theta1, setTheta1] = useState(30);
  const [theta2, setTheta2] = useState(60);
  const [theta3, setTheta3] = useState(45);

  const L1 = 80;
  const L2 = 60;
  const L3 = 40;
  const baseX = 140;
  const baseY = 230;

  const r1 = (theta1 * Math.PI) / 180;
  const r2 = (theta2 * Math.PI) / 180;
  const r3 = (theta3 * Math.PI) / 180;

  const x1 = baseX + L1 * Math.cos(r1);
  const y1 = baseY - L1 * Math.sin(r1);
  const x2 = x1 + L2 * Math.cos(r1 + r2);
  const y2 = y1 - L2 * Math.sin(r1 + r2);
  const x3 = x2 + L3 * Math.cos(r1 + r2 + r3);
  const y3 = y2 - L3 * Math.sin(r1 + r2 + r3);

  const joints = [
    { x: baseX, y: baseY },
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 20 }}>
        <svg
          viewBox="0 0 280 260"
          style={{ width: 260, height: 240, flexShrink: 0, background: '#0D0D0D', display: 'block' }}
        >
          {/* Grid */}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`hg${i}`} x1="0" y1={i * 40} x2="280" y2={i * 40} stroke="#1A1A1A" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`vg${i}`} x1={i * 40} y1="0" x2={i * 40} y2="260" stroke="#1A1A1A" strokeWidth="0.5" />
          ))}

          {/* Workspace circle */}
          <circle cx={baseX} cy={baseY} r={L1 + L2 + L3} fill="none" stroke="#1E1E1E" strokeWidth="1" strokeDasharray="4 4" />

          {/* Arm segments */}
          <line x1={baseX} y1={baseY} x2={x1} y2={y1} stroke="#4ADE80" strokeWidth="3" />
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22C55E" strokeWidth="2.5" />
          <line x1={x2} y1={y2} x2={x3} y2={y3} stroke="#4ADE80" strokeWidth="2" />

          {/* End effector */}
          <circle cx={x3} cy={y3} r={4} fill="#4ADE80" />
          <circle cx={x3} cy={y3} r={8} fill="none" stroke="rgba(74,222,128,0.3)" strokeWidth="1" />

          {/* Joints */}
          {joints.map((j, i) => (
            <g key={i}>
              <circle cx={j.x} cy={j.y} r={i === 0 ? 8 : 5} fill="#111" stroke="#4ADE80" strokeWidth="1.5" />
            </g>
          ))}

          {/* Base */}
          <rect x={baseX - 12} y={baseY} width={24} height={10} fill="#2A2A2A" />
          <line x1={baseX - 16} y1={baseY + 10} x2={baseX + 16} y2={baseY + 10} stroke="#333" strokeWidth="2" />

          {/* Coordinate text */}
          <text x={x3 + 8} y={y3 - 6} fill="#555" fontSize="9" fontFamily="IBM Plex Mono">
            ({x3.toFixed(0)},{y3.toFixed(0)})
          </text>
          <text x="4" y="252" fill="#333" fontSize="8" fontFamily="IBM Plex Mono">
            3-DOF IK · inverse kinematics
          </text>
        </svg>

        {/* Sliders */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
          {[
            { label: 'θ₁ (base)', value: theta1, set: setTheta1 },
            { label: 'θ₂ (elbow)', value: theta2, set: setTheta2 },
            { label: 'θ₃ (wrist)', value: theta3, set: setTheta3 },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 11,
                  marginBottom: 6,
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ color: 'var(--accent-green)' }}>{value}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                value={value}
                onChange={(e) => set(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-green)', cursor: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Morris AI — Multi-Agent Diagram ─────────────────────────────────────────
function MorrisAIViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  const agents = [
    { id: 'orchestrator', label: 'Orchestrator', x: 280, y: 60, color: '#4ADE80' },
    { id: 'resume', label: 'Resume\nValidator', x: 100, y: 180, color: '#22C55E' },
    { id: 'scheduler', label: 'Interview\nScheduler', x: 280, y: 200, color: '#22C55E' },
    { id: 'onboarding', label: 'Onboarding\nAgent', x: 460, y: 180, color: '#22C55E' },
    { id: 'records', label: 'Records\nManager', x: 100, y: 300, color: '#16A34A' },
    { id: 'escalation', label: 'Escalation\nHandler', x: 460, y: 300, color: '#16A34A' },
  ];

  const edges = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 1, to: 4 },
    { from: 3, to: 5 },
    { from: 2, to: 4 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, W, H);

      const t = (timeRef.current += 0.015);

      // Edges with animated particles
      edges.forEach(({ from, to }, ei) => {
        const a = agents[from];
        const b = agents[to];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y + 20);
        ctx.lineTo(b.x, b.y - 20);
        ctx.strokeStyle = 'rgba(74,222,128,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Particle
        const progress = ((t * 0.4 + ei * 0.3) % 1);
        const px = a.x + (b.x - a.x) * progress;
        const py = (a.y + 20) + (b.y - 20 - a.y - 20) * progress;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${0.8 - progress * 0.4})`;
        ctx.fill();
      });

      // Nodes
      agents.forEach((agent, i) => {
        const pulse = (Math.sin(t * 2 + i * 0.8) + 1) / 2;
        const glowRadius = 28 + pulse * 6;

        // Glow
        const grad = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, glowRadius);
        grad.addColorStop(0, `rgba(74,222,128,0.12)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(agent.x - glowRadius, agent.y - glowRadius, glowRadius * 2, glowRadius * 2);

        // Box
        const bw = i === 0 ? 120 : 100;
        const bh = 40;
        ctx.strokeStyle = i === 0 ? '#4ADE80' : '#22C55E';
        ctx.fillStyle = i === 0 ? 'rgba(74,222,128,0.1)' : 'rgba(34,197,94,0.06)';
        ctx.lineWidth = i === 0 ? 1.5 : 1;
        ctx.fillRect(agent.x - bw / 2, agent.y - bh / 2, bw, bh);
        ctx.strokeRect(agent.x - bw / 2, agent.y - bh / 2, bw, bh);

        // Label
        ctx.fillStyle = i === 0 ? '#4ADE80' : '#888';
        ctx.font = `${i === 0 ? '11' : '9'}px IBM Plex Mono`;
        ctx.textAlign = 'center';
        const lines = agent.label.split('\n');
        lines.forEach((line, li) => {
          ctx.fillText(line, agent.x, agent.y + (li - (lines.length - 1) / 2) * 12 + 4);
        });
      });

      // Status indicator
      ctx.textAlign = 'left';
      ctx.font = '10px IBM Plex Mono';
      ctx.fillStyle = '#333';
      ctx.fillText('Morris AI · multi-agent HR system · task delegation flow', 12, H - 10);

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={370}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
}

// ─── Main ProjectViz dispatcher ───────────────────────────────────────────────
export default function ProjectViz({ slug }: { slug: string }) {
  const vizMap: Record<string, React.ReactNode> = {
    'ring-lwe': <RingLWEViz />,
    'qubo-qaoa': <QUBOViz />,
    'bayes-frontier': <BayesFrontierViz />,
    hashlock: <HashLockViz />,
    'deepfake-detection': <DeepfakeViz />,
    'semg-eureka': <SEMGViz />,
    badusb: <BadUSBViz />,
    'robotic-arm': <RoboticArmViz />,
    'morris-ai': <MorrisAIViz />,
  };

  const viz = vizMap[slug];

  if (!viz) {
    return (
      <div
        style={{
          fontFamily: 'IBM Plex Mono',
          fontSize: 13,
          color: 'var(--text-muted)',
          padding: 24,
          textAlign: 'center',
        }}
      >
        // visualization not found
      </div>
    );
  }

  return <>{viz}</>;
}
