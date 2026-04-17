import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';
import { Terminal } from '../components/Terminal';
import { TypedText } from '../components/TypedText';

export const ScenePrompt: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

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
        Now watch.
      </div>
      <div style={{ width: vertical ? '95%' : 1080 }}>
        <Terminal title="claude code — prompt">
          <div style={{ color: theme.fgMuted, marginBottom: 12 }}>You:</div>
          <div style={{ fontSize: 22, lineHeight: 1.55 }}>
            <TypedText
              text={`Build a settings panel with fields for email,\npassword, and a dark mode toggle. Use Plex UI.`}
              startFrame={20}
              cps={28}
            />
          </div>
        </Terminal>
      </div>
    </AbsoluteFill>
  );
};
