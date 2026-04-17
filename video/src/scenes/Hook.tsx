import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { lightTheme, theme } from '../theme';
import { Terminal } from '../components/Terminal';

export const SceneHook: React.FC<{ vertical?: boolean; light?: boolean }> = ({ vertical, light }) => {
  const t = light ? lightTheme : theme;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 18], [12, 0], { extrapolateRight: 'clamp' });
  const tShake = spring({ frame: frame - 35, fps, config: { stiffness: 200, damping: 8 } });
  const shake = (tShake > 0 ? Math.sin(frame * 0.8) : 0) * (tShake > 0 ? 4 : 0);

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
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 60,
        }}
      >
        <div
          style={{
            fontSize: vertical ? 56 : 72,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: t.fg,
          }}
        >
          Why doesn&apos;t my AI agent
          <br />
          know my component library?
        </div>
      </div>
      <div
        style={{
          width: vertical ? '95%' : 920,
          transform: `translateX(${shake}px)`,
        }}
      >
        <Terminal title="claude — broken output">
          <div style={{ color: theme.fgMuted }}>
            <span style={{ color: theme.green }}>›</span> add a danger button
          </div>
          <div style={{ marginTop: 12 }}>
            <span style={{ color: '#c084fc' }}>{'<'}Button</span>
            <span style={{ color: '#7dd3fc' }}> color</span>
            <span style={{ color: '#94a3b8' }}>=</span>
            <span style={{ color: theme.red, textDecoration: 'underline wavy', textDecorationColor: theme.red }}>
              &quot;destructive&quot;
            </span>
            <span style={{ color: '#c084fc' }}>{' /> '}</span>
            <span style={{ color: theme.fgMuted, fontSize: 14, marginLeft: 14 }}>
              ← prop doesn&apos;t exist
            </span>
          </div>
          <div style={{ marginTop: 8 }}>
            <span style={{ color: '#c084fc' }}>import</span>{' '}
            <span style={{ color: '#94a3b8' }}>{'{ Toast }'}</span>{' '}
            <span style={{ color: '#c084fc' }}>from</span>{' '}
            <span style={{ color: theme.red, textDecoration: 'underline wavy', textDecorationColor: theme.red }}>
              &quot;@plexui/ui/Toast&quot;
            </span>
            <span style={{ color: theme.fgMuted, fontSize: 14, marginLeft: 14 }}>
              ← package doesn&apos;t ship Toast
            </span>
          </div>
          <div style={{ marginTop: 8 }}>
            <span style={{ color: '#c084fc' }}>{'<'}Dialog.Header</span>
            <span style={{ color: '#7dd3fc' }}> title</span>
            <span style={{ color: '#94a3b8' }}>=</span>
            <span style={{ color: theme.red, textDecoration: 'underline wavy', textDecorationColor: theme.red }}>
              &quot;Hi&quot;
            </span>
            <span style={{ color: '#c084fc' }}>{' /> '}</span>
            <span style={{ color: theme.fgMuted, fontSize: 14, marginLeft: 14 }}>
              ← title prop hallucinated
            </span>
          </div>
        </Terminal>
      </div>
    </AbsoluteFill>
  );
};
