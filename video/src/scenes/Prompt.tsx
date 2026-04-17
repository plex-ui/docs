import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';
import { ClaudeTerminal } from '../components/ClaudeTerminal';
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
      <div style={{ width: vertical ? '95%' : 1000 }}>
        <ClaudeTerminal showWelcome>
          <div>
            <span style={{ color: '#d97757' }}>❯</span>{' '}
            <TypedText
              text={`Build a sign-up form with full name, email, country selector, and phone number. Use Plex UI.`}
              startFrame={20}
              cps={30}
            />
          </div>
        </ClaudeTerminal>
      </div>
    </AbsoluteFill>
  );
};
