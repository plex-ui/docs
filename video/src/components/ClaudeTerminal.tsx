import React from 'react';
import { theme } from '../theme';

/**
 * Faithful re-creation of the Claude Code terminal welcome screen.
 *
 * Layout:
 *   Last login: ...
 *   user@host ~ % claude
 *   ╭─── Claude Code vX.Y.Z ───────────────────────╮
 *   │    Welcome back!         │ Tips for …        │
 *   │    [pixel-art robot]     │ Run /init to …    │
 *   │    Opus 4.X (1M)  ·      │ ───────────────── │
 *   │    /projects/next-app    │ Recent activity   │
 *   │                          │ No recent activity│
 *   ╰──────────────────────────┴───────────────────╯
 *   ─────────────────────────────────────────────
 *   ❯ <typed prompt>
 *
 * Text is neutral — user@laptop, /projects/next-app, "Welcome back!" (no name).
 */

const ORANGE = '#d97757';
const DIM = '#8a8a8a';
const TEXT = '#d4d4d4';

const ART = ['▐▛███▜▌', '▝▜█████▛▘', '▘▘ ▝▝'];

export const ClaudeTerminal: React.FC<{
  width?: number | string;
  height?: number | string;
  showWelcome?: boolean;
  children: React.ReactNode;
}> = ({ width = '100%', height = 'auto', showWelcome = false, children }) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#181818',
        borderRadius: 12,
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: theme.mono,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          position: 'relative',
          height: 44,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: '#222',
          borderBottom: '1px solid #2a2a2a',
          gap: 8,
        }}
      >
        <span style={{ width: 14, height: 14, borderRadius: 7, background: '#ff5f57' }} />
        <span style={{ width: 14, height: 14, borderRadius: 7, background: '#febc2e' }} />
        <span style={{ width: 14, height: 14, borderRadius: 7, background: '#28c840' }} />
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            pointerEvents: 'none',
            color: '#eaeaea',
            fontFamily: theme.sans,
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          ✻ Claude Code
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          padding: '24px 28px',
          fontSize: 18,
          lineHeight: 1.55,
          color: TEXT,
        }}
      >
        <div style={{ color: TEXT, whiteSpace: 'pre' }}>Last login: Thu Apr 17 10:16:25 on ttys000</div>
        <div style={{ marginTop: 2, whiteSpace: 'pre' }}>
          <span style={{ color: TEXT }}>user@laptop ~ % </span>
          <span style={{ color: TEXT }}>claude</span>
        </div>

        {showWelcome && (
          <div style={{ position: 'relative', marginTop: 18 }}>
            {/* Outer orange rounded border */}
            <div
              style={{
                border: `1px solid ${ORANGE}`,
                borderRadius: 6,
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr',
                minHeight: 180,
              }}
            >
              <div
                style={{
                  padding: '20px 18px',
                  borderRight: `1px solid ${ORANGE}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: TEXT, fontSize: 18, fontWeight: 700, marginBottom: 14 }}>
                  Welcome back!
                </div>
                <div style={{ color: ORANGE, lineHeight: 1, letterSpacing: 2 }}>
                  {ART.map((row, i) => (
                    <div key={i} style={{ fontSize: 18 }}>
                      {row}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, color: TEXT, fontSize: 14, lineHeight: 1.6 }}>
                  Opus 4.6 (1M context) · Claude Max
                  <br />
                  /projects/next-app
                </div>
              </div>
              <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: ORANGE, fontSize: 14, marginBottom: 8 }}>
                  Tips for getting started
                </div>
                <div style={{ color: TEXT, fontSize: 13, lineHeight: 1.6 }}>
                  Run /init to create a …
                  <br />
                  Note: You have launche…
                </div>
                <div
                  style={{ borderTop: `1px solid ${ORANGE}`, marginTop: 12, paddingTop: 12 }}
                />
                <div style={{ color: ORANGE, fontSize: 14, marginBottom: 6 }}>Recent activity</div>
                <div style={{ color: TEXT, fontSize: 13 }}>No recent activity</div>
              </div>
            </div>
            {/* Orange title cutting into the top border */}
            <div
              style={{
                position: 'absolute',
                top: -12,
                left: 16,
                padding: '0 10px',
                backgroundColor: '#181818',
                color: ORANGE,
                fontSize: 15,
                fontFamily: theme.mono,
              }}
            >
              Claude Code{' '}
              <span style={{ color: DIM }}>v2.1.112</span>
            </div>
          </div>
        )}

        {/* Divider before prompt */}
        <div
          style={{
            marginTop: 24,
            marginBottom: 14,
            borderTop: '1px solid #2e2e2e',
          }}
        />

        {/* Prompt input box — mimics Claude Code's rounded orange input */}
        <div
          style={{
            border: `1px solid ${ORANGE}`,
            borderRadius: 6,
            padding: '14px 16px',
            color: TEXT,
            fontSize: 18,
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>

        {/* Footer hint */}
        <div style={{ color: '#666', fontSize: 13, marginTop: 10 }}>
          ? for shortcuts
        </div>
      </div>
    </div>
  );
};
