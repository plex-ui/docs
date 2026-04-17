import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { Terminal } from '../components/Terminal';
import { TypedText } from '../components/TypedText';

export const SceneInstall: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const checkSpring = spring({ frame: frame - 90, fps, config: { stiffness: 110, damping: 12 } });

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
      <div style={{ width: vertical ? '95%' : 920 }}>
        <Terminal title="claude code">
          <div>
            <span style={{ color: theme.fgMuted }}>›</span>{' '}
            <TypedText text="/plugin marketplace add plex-ui/docs" startFrame={20} cps={30} />
          </div>
          <div style={{ marginTop: 16 }}>
            <span style={{ color: theme.fgMuted }}>›</span>{' '}
            <TypedText text="/plugin install plex-ui@plex-ui" startFrame={70} cps={30} />
          </div>
          <div
            style={{
              marginTop: 28,
              opacity: checkSpring,
              transform: `translateY(${interpolate(checkSpring, [0, 1], [12, 0])}px)`,
              color: theme.green,
              fontSize: 22,
            }}
          >
            ✓ Plex UI skill installed
            <div style={{ marginTop: 8, fontSize: 16, color: theme.fgMuted }}>
              ~50 components · prop signatures · usage examples loaded
            </div>
          </div>
        </Terminal>
      </div>
    </AbsoluteFill>
  );
};
