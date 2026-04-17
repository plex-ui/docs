import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { Editor, Line, t } from '../components/Editor';

const CODE_LINES: { content: React.ReactNode; minLen: number }[] = [
  { content: <><span style={{ color: t.keyword }}>import</span> <span style={{ color: t.punct }}>{`{`}</span> <span style={{ color: t.fn }}>FloatingLabelInput</span><span style={{ color: t.punct }}>{`,`}</span> <span style={{ color: t.fn }}>Select</span><span style={{ color: t.punct }}>{`,`}</span> <span style={{ color: t.fn }}>Button</span> <span style={{ color: t.punct }}>{`}`}</span> <span style={{ color: t.keyword }}>from</span> <span style={{ color: t.string }}>&apos;@plexui/ui&apos;</span><span style={{ color: t.punct }}>;</span></>, minLen: 1 },
  { content: <></>, minLen: 2 },
  { content: <><span style={{ color: t.keyword }}>export default function</span> <span style={{ color: t.fn }}>SignUp</span><span style={{ color: t.punct }}>() {`{`}</span></>, minLen: 3 },
  { content: <span style={{ color: t.keyword }}>  return (</span>, minLen: 4 },
  { content: <span>    <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>form</span> <span style={{ color: t.prop }}>className</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;flex flex-col gap-3&quot;</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 5 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>FloatingLabelInput</span> <span style={{ color: t.prop }}>label</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;Full name&quot;</span> <span style={{ color: t.punct }}>{`/>`}</span></span>, minLen: 6 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>FloatingLabelInput</span> <span style={{ color: t.prop }}>label</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;Email address&quot;</span> <span style={{ color: t.prop }}>type</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;email&quot;</span> <span style={{ color: t.punct }}>{`/>`}</span></span>, minLen: 7 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Select</span> <span style={{ color: t.prop }}>options</span><span style={{ color: t.punct }}>={`{`}</span><span style={{ color: t.fn }}>COUNTRIES</span><span style={{ color: t.punct }}>{`}`}</span> <span style={{ color: t.prop }}>trigger</span><span style={{ color: t.punct }}>={`{`}</span><span style={{ color: t.fn }}>countryTrigger</span><span style={{ color: t.punct }}>{`}`} {`/>`}</span></span>, minLen: 8 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>FloatingLabelInput</span></span>, minLen: 9 },
  { content: <span>        <span style={{ color: t.prop }}>label</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;Phone number&quot;</span></span>, minLen: 10 },
  { content: <span>        <span style={{ color: t.prop }}>startAdornment</span><span style={{ color: t.punct }}>={`{<`}</span><span style={{ color: t.comp }}>span</span><span style={{ color: t.punct }}>{`>`}</span>+34<span style={{ color: t.punct }}>{`</`}</span><span style={{ color: t.comp }}>span</span><span style={{ color: t.punct }}>{`>}`}</span></span>, minLen: 11 },
  { content: <span>        <span style={{ color: t.prop }}>type</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;tel&quot;</span> <span style={{ color: t.punct }}>{`/>`}</span></span>, minLen: 12 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Button</span> <span style={{ color: t.prop }}>color</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;primary&quot;</span> <span style={{ color: t.prop }}>size</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;3xl&quot;</span><span style={{ color: t.punct }}>{`>`}</span>Continue<span style={{ color: t.punct }}>{`</`}</span><span style={{ color: t.comp }}>Button</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 13 },
  { content: <span>    <span style={{ color: t.punct }}>{`</`}</span><span style={{ color: t.comp }}>form</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 14 },
  { content: <span>  <span style={{ color: t.punct }}>);</span></span>, minLen: 15 },
  { content: <span><span style={{ color: t.punct }}>{`}`}</span></span>, minLen: 16 },
];

export const SceneGeneration: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reveal lines progressively across the first ~3s — feels like an LLM streaming output
  const revealEnd = fps * 3;
  const linesRevealed = Math.min(
    CODE_LINES.length,
    Math.floor(interpolate(frame, [0, revealEnd], [0, CODE_LINES.length + 1], { extrapolateRight: 'clamp' })),
  );

  // Banner fades in at 3s and out at 6s
  const bannerOpacity = interpolate(
    frame,
    [fps * 3, fps * 3 + 6, fps * 6, fps * 7],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' },
  );

  // Preview fades in at ~3.5s and stays until the end
  const previewOpacity = interpolate(frame, [fps * 3.5, fps * 4.2], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        flexDirection: vertical ? 'column' : 'row',
        padding: vertical ? 40 : 80,
        gap: vertical ? 24 : 40,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ flex: 1, width: vertical ? '100%' : 'auto', position: 'relative' }}>
        <Editor filename="app/signup/page.tsx" height={vertical ? 700 : 880}>
          {CODE_LINES.slice(0, linesRevealed).map((line, i) => (
            <Line key={i}>{line.content}</Line>
          ))}
        </Editor>
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 28,
            opacity: bannerOpacity,
            backgroundColor: theme.green,
            color: '#003a14',
            fontSize: 28,
            fontWeight: 800,
            padding: '14px 28px',
            borderRadius: 999,
            boxShadow: '0 12px 32px rgba(74, 222, 128, 0.35)',
            letterSpacing: '-0.005em',
          }}
        >
          ✓ All props correct · 0 hallucinations
        </div>
      </div>
      <div
        style={{
          flex: vertical ? '0 0 auto' : 1,
          width: vertical ? '100%' : 'auto',
          opacity: previewOpacity,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 0,
        }}
      >
        <Img
          src={staticFile('signup-form.png')}
          style={{
            display: 'block',
            height: vertical ? 1050 : 880,
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: 16,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
