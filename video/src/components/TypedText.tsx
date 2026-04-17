import { useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Renders `text` as if it were being typed character-by-character.
 * `startFrame` — frame at which typing begins (relative to current sequence).
 * `cps` — characters per second.
 */
export const TypedText: React.FC<{
  text: string;
  startFrame?: number;
  cps?: number;
  cursor?: boolean;
}> = ({ text, startFrame = 0, cps = 35, cursor = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - startFrame);
  const charsRevealed = Math.min(text.length, Math.floor((elapsed / fps) * cps));
  const visible = text.slice(0, charsRevealed);
  const isDone = charsRevealed >= text.length;
  const cursorVisible = cursor && (!isDone || Math.floor(frame / 15) % 2 === 0);
  return (
    <span style={{ whiteSpace: 'pre-wrap' }}>
      {visible}
      {cursorVisible && (
        <span style={{ display: 'inline-block', width: 8, height: '1.05em', verticalAlign: 'text-bottom', background: 'currentColor', marginLeft: 1 }} />
      )}
    </span>
  );
};
