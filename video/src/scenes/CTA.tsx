import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { TypedText } from '../components/TypedText';

export const SceneCTA: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({ frame, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: vertical ? 60 : 120,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: vertical ? 72 : 96,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 24,
          opacity: titleSpring,
          transform: `scale(${interpolate(titleSpring, [0, 1], [0.94, 1])})`,
          background: `linear-gradient(135deg, #ffffff 0%, ${theme.accent} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Plex UI
      </div>
      <div
        style={{
          fontSize: vertical ? 32 : 36,
          color: theme.fgMuted,
          marginBottom: 56,
          opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Install in 5 seconds. Ship in 5 minutes.
      </div>

      <div
        style={{
          backgroundColor: theme.bgSoft,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          padding: '20px 32px',
          fontFamily: theme.mono,
          fontSize: vertical ? 26 : 28,
          color: theme.fg,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }),
          marginBottom: 40,
        }}
      >
        <span style={{ color: theme.fgMuted }}>$ </span>
        <TypedText text="npm install @plexui/ui" startFrame={30} cps={28} cursor={false} />
      </div>

      <div
        style={{
          fontSize: vertical ? 26 : 28,
          color: theme.fgMuted,
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        plexui.com · github.com/plex-ui/docs · @plex_uikit
      </div>
    </AbsoluteFill>
  );
};
