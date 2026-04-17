import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useVideoConfig } from 'remotion';
import { lightTheme, theme } from './theme';
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
  { name: 'install', seconds: 6 },
  { name: 'prompt', seconds: 4 },
  { name: 'generation', seconds: 8 },
  { name: 'features', seconds: 6 },
  { name: 'cta', seconds: 8 },
];

export const HeroVideo: React.FC<{ vertical?: boolean; light?: boolean }> = ({ vertical = false, light = false }) => {
  const { fps, durationInFrames } = useVideoConfig();
  let cursor = 0;
  const ranges = SCENES.map((scene) => {
    const start = cursor;
    cursor += scene.seconds * fps;
    return { ...scene, start, durationInFrames: scene.seconds * fps };
  });

  const fadeFrames = fps * 1.5;
  const t = light ? lightTheme : theme;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: t.bg,
        fontFamily: t.sans,
        color: t.fg,
      }}
    >
      <Audio
        src={staticFile('music.mp3')}
        volume={(f) =>
          interpolate(
            f,
            [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
            [0, 0.45, 0.45, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          )
        }
      />
      <Sequence from={ranges[0].start} durationInFrames={ranges[0].durationInFrames}>
        <SceneHook vertical={vertical} light={light} />
      </Sequence>
      <Sequence from={ranges[1].start} durationInFrames={ranges[1].durationInFrames}>
        <SceneInstall vertical={vertical} />
      </Sequence>
      <Sequence from={ranges[2].start} durationInFrames={ranges[2].durationInFrames}>
        <ScenePrompt vertical={vertical} />
      </Sequence>
      <Sequence from={ranges[3].start} durationInFrames={ranges[3].durationInFrames}>
        <SceneGeneration vertical={vertical} light={light} />
      </Sequence>
      <Sequence from={ranges[4].start} durationInFrames={ranges[4].durationInFrames}>
        <SceneFeatures vertical={vertical} light={light} />
      </Sequence>
      <Sequence from={ranges[5].start} durationInFrames={ranges[5].durationInFrames}>
        <SceneCTA vertical={vertical} light={light} />
      </Sequence>
    </AbsoluteFill>
  );
};
