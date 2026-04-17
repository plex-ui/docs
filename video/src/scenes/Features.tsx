import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';

const FEATURES = [
  { title: '~50 components', sub: 'Radix + accessible' },
  { title: 'AI skill in the box', sub: 'Claude · Codex · MCP' },
  { title: 'shadcn-ready', sub: 'npx shadcn add …' },
  { title: 'Figma parity', sub: '22,000+ variants' },
];

export const SceneFeatures: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        flexDirection: vertical ? 'column' : 'row',
        gap: vertical ? 28 : 36,
        padding: vertical ? 60 : 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {FEATURES.map((f, i) => {
        const start = i * (fps * 0.35);
        const opacity = interpolate(frame, [start, start + 12], [0, 1], { extrapolateRight: 'clamp' });
        const y = interpolate(frame, [start, start + 18], [40, 0], { extrapolateRight: 'clamp' });
        return (
          <div
            key={f.title}
            style={{
              flex: vertical ? 'none' : 1,
              width: vertical ? '90%' : 'auto',
              opacity,
              transform: `translateY(${y}px)`,
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: '40px 32px',
              minHeight: vertical ? 0 : 260,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: vertical ? 36 : 38,
                fontWeight: 800,
                letterSpacing: '-0.01em',
                color: theme.fg,
                marginBottom: 8,
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontSize: vertical ? 22 : 20,
                color: theme.fgMuted,
                fontFamily: theme.mono,
              }}
            >
              {f.sub}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
