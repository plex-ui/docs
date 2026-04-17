import { Composition } from 'remotion';
import { HeroVideo } from './HeroVideo';

const FPS = 30;
// Total duration in frames: 60 seconds at 30fps = 1800
const DURATION_FRAMES = 60 * FPS;

export const Root = () => {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="HeroVideoVertical"
        component={HeroVideo}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ vertical: true }}
      />
    </>
  );
};
