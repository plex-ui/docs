import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { TypedText } from '../components/TypedText';

export const SceneInstall: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const checkSpring = spring({ frame: frame - 60, fps, config: { stiffness: 110, damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: vertical ? 60 : 120,
      }}
    >
      <div
        style={{
          fontSize: vertical ? 56 : 72,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: 60,
          opacity: titleOpacity,
        }}
      >
        One command.
      </div>
      <div style={{ width: vertical ? '95%' : 1000 }}>
        <ShellTerminal>
          <div style={{ whiteSpace: 'pre' }}>
            <span style={{ color: theme.fgMuted }}>user@laptop ~/next-app % </span>
            <TypedText text="npm install @plexui/ui" startFrame={20} cps={32} />
          </div>
          <div
            style={{
              marginTop: 18,
              opacity: checkSpring,
              transform: `translateY(${interpolate(checkSpring, [0, 1], [12, 0])}px)`,
              fontFamily: theme.mono,
            }}
          >
            <div style={{ color: theme.fgMuted, fontSize: 16 }}>
              <span style={{ color: theme.green }}>added</span> 1 package in 4s
            </div>
            <div style={{ marginTop: 14, color: theme.green, fontSize: 22, fontWeight: 600 }}>
              ✓ Ready to use Plex UI
            </div>
            <div style={{ marginTop: 6, fontSize: 16, color: theme.fgMuted }}>
              ~50 components · accessible · dark mode · AI-ready
            </div>
          </div>
        </ShellTerminal>
      </div>
    </AbsoluteFill>
  );
};

const ShellTerminal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      backgroundColor: '#181818',
      borderRadius: 12,
      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      fontFamily: theme.mono,
    }}
  >
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
        Terminal
      </span>
    </div>
    <div
      style={{
        padding: '32px 28px',
        fontSize: 22,
        lineHeight: 1.55,
        color: '#d4d4d4',
        minHeight: 260,
      }}
    >
      {children}
    </div>
  </div>
);
