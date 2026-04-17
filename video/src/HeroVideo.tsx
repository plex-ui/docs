import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { theme } from './theme';
import { SceneHook } from './scenes/Hook';
import { SceneInstall } from './scenes/Install';
import { ScenePrompt } from './scenes/Prompt';
import { SceneGeneration } from './scenes/Generation';
import { SceneFeatures } from './scenes/Features';
import { SceneCTA } from './scenes/CTA';

/**
 * Scene durations in seconds, must sum to 60.
 */
const SCENES = [
  { name: 'hook', seconds: 3 },
  { name: 'install', seconds: 5 },
  { name: 'prompt', seconds: 6 },
  { name: 'generation', seconds: 31 },
  { name: 'features', seconds: 10 },
  { name: 'cta', seconds: 5 },
];

export const HeroVideo: React.FC<{ vertical?: boolean }> = ({ vertical = false }) => {
  const { fps } = useVideoConfig();
  let cursor = 0;
  const ranges = SCENES.map((scene) => {
    const start = cursor;
    cursor += scene.seconds * fps;
    return { ...scene, start, durationInFrames: scene.seconds * fps };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        fontFamily: theme.sans,
        color: theme.fg,
      }}
    >
      <Sequence from={ranges[0].start} durationInFrames={ranges[0].durationInFrames}>
        <SceneHook vertical={vertical} />
      </Sequence>
      <Sequence from={ranges[1].start} durationInFrames={ranges[1].durationInFrames}>
        <SceneInstall vertical={vertical} />
      </Sequence>
      <Sequence from={ranges[2].start} durationInFrames={ranges[2].durationInFrames}>
        <ScenePrompt vertical={vertical} />
      </Sequence>
      <Sequence from={ranges[3].start} durationInFrames={ranges[3].durationInFrames}>
        <SceneGeneration vertical={vertical} />
      </Sequence>
      <Sequence from={ranges[4].start} durationInFrames={ranges[4].durationInFrames}>
        <SceneFeatures vertical={vertical} />
      </Sequence>
      <Sequence from={ranges[5].start} durationInFrames={ranges[5].durationInFrames}>
        <SceneCTA vertical={vertical} />
      </Sequence>
    </AbsoluteFill>
  );
};
