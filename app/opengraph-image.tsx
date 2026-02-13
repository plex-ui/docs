import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Plex UI — Figma Design System PRO';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0d0d0d',
          padding: '60px 80px',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #2e2e2e',
              fontSize: '20px',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.999 12.001C9.311 12.001 11.999 9.313 11.999 6V0H5.999C2.688 0 0 2.688 0 6C0 9.313 2.688 12.001 5.999 12.001Z" fill="#0ACF83" transform="translate(0 12)"/>
              <path d="M0 6C0 2.688 2.688 0 5.999 0H11.999V12.001H5.999C2.688 12.001 0 9.313 0 6Z" fill="#A259FF" transform="translate(0 6)"/>
              <path d="M0 6C0 2.688 2.688 0 5.999 0H11.999V12.001H5.999C2.688 12.001 0 9.313 0 6Z" fill="#F24E1E"/>
              <path d="M0 0H5.999C9.311 0 11.999 2.688 11.999 6C11.999 9.313 9.311 12.001 5.999 12.001H0Z" fill="#FF7262" transform="translate(12 0)"/>
              <path d="M11.999 6C11.999 9.313 9.311 12.001 5.999 12.001C2.688 12.001 0 9.313 0 6C0 2.688 2.688 0 5.999 0C9.311 0 11.999 2.688 11.999 6Z" fill="#1ABCFE" transform="translate(12 6)"/>
            </svg>
          </div>
          <span style={{ color: '#999999', fontSize: '18px', fontWeight: 500 }}>
            Figma + React Design System
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: '#ececec',
            fontSize: '64px',
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: '-2px',
            margin: '0 0 20px 0',
          }}
        >
          Plex UI
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: '#999999',
            fontSize: '22px',
            fontWeight: 400,
            textAlign: 'center',
            lineHeight: 1.5,
            margin: '0 0 32px 0',
            maxWidth: '750px',
          }}
        >
          22,000+ Figma variants. Three-layer token system.
          The design language behind ChatGPT.
        </p>

        {/* AI editors badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '36px',
            padding: '8px 20px',
            borderRadius: '999px',
            backgroundColor: '#1a1a2e',
            border: '1px solid #2e2e4e',
          }}
        >
          <span style={{ fontSize: '14px' }}>✦</span>
          <span style={{ color: '#a78bfa', fontSize: '15px', fontWeight: 500 }}>
            Built for AI code editors — Claude, Cursor, Codex & more
          </span>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
          }}
        >
          {[
            { value: '22K+', label: 'Variants' },
            { value: '35', label: 'Components' },
            { value: '6.6K+', label: 'Icons' },
            { value: '9', label: 'Size Scale' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  color: '#ececec',
                  fontSize: '36px',
                  fontWeight: 700,
                  letterSpacing: '-1px',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  color: '#666666',
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <p
          style={{
            position: 'absolute',
            bottom: '32px',
            color: '#666666',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          plexui.com
        </p>
      </div>
    ),
    { ...size }
  );
}
