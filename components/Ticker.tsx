'use client';

import { useEffect, useState } from 'react';

interface CoinData {
  symbol: string;
  price: number;
  change: number;
}

const STATIC_LABELS = [
  'POST-QUANTUM CRYPTOGRAPHY',
  'RING-LWE',
  'CYBERSECURITY',
  'IIT DHARWAD',
  'ICPC REGIONALIST',
  'MORRIS AI',
  'AGENTIC AI',
];

const COIN_IDS: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  solana: 'SOL',
  chainlink: 'LINK',
};

export default function Ticker() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [error, setError] = useState(false);

  const fetchPrices = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,chainlink&vs_currencies=usd&include_24hr_change=true',
        { next: { revalidate: 0 } }
      );
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const parsed: CoinData[] = Object.entries(COIN_IDS).map(([id, sym]) => ({
        symbol: sym,
        price: data[id]?.usd ?? 0,
        change: data[id]?.usd_24h_change ?? 0,
      }));
      setCoins(parsed);
      setError(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Build ticker items: coins + static labels interleaved
  const items: React.ReactNode[] = [];
  const coinItems = coins.map((c) => (
    <span
      key={c.symbol}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 24px',
        fontSize: 11,
        fontWeight: 400,
        color: 'var(--text-secondary)',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{c.symbol}</span>
      <span>${c.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
      <span
        style={{
          color: c.change >= 0 ? 'var(--accent-green)' : 'var(--red-neg)',
          fontWeight: 500,
        }}
      >
        {c.change >= 0 ? '▲' : '▼'} {Math.abs(c.change).toFixed(2)}%
      </span>
    </span>
  ));

  STATIC_LABELS.forEach((label, i) => {
    if (i < coinItems.length) items.push(coinItems[i]);
    items.push(
      <span
        key={`static-${i}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0 24px',
          fontSize: 11,
          fontWeight: 500,
          color: 'var(--text-ghost)',
          letterSpacing: '0.08em',
          borderRight: '1px solid var(--border-subtle)',
        }}
      >
        {label}
      </span>
    );
  });

  // Fallback if API fails
  if (error && coins.length === 0) {
    STATIC_LABELS.forEach((label) => {
      items.push(
        <span
          key={`fb-${label}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0 24px',
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--text-ghost)',
            letterSpacing: '0.08em',
            borderRight: '1px solid var(--border-subtle)',
          }}
        >
          {label}
        </span>
      );
    });
  }

  return (
    <div
      style={{
        background: 'var(--bg-deep)',
        borderBottom: '1px solid var(--border-subtle)',
        height: 36,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 60,
          background: 'linear-gradient(to right, var(--bg-deep), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 60,
          background: 'linear-gradient(to left, var(--bg-deep), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div className="ticker-track">
        {items}
        {/* Duplicate for seamless loop */}
        {items}
      </div>
    </div>
  );
}
