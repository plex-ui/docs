import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { Editor, Line, t } from '../components/Editor';

const CODE_LINES: { content: React.ReactNode; minLen: number }[] = [
  { content: <><span style={{ color: t.keyword }}>import</span> <span style={{ color: t.punct }}>{`{`}</span> <span style={{ color: t.fn }}>Field</span><span style={{ color: t.punct }}>{`,`}</span> <span style={{ color: t.fn }}>Input</span><span style={{ color: t.punct }}>{`,`}</span> <span style={{ color: t.fn }}>Switch</span><span style={{ color: t.punct }}>{`,`}</span> <span style={{ color: t.fn }}>Button</span> <span style={{ color: t.punct }}>{`}`}</span> <span style={{ color: t.keyword }}>from</span> <span style={{ color: t.string }}>&apos;@plexui/ui&apos;</span><span style={{ color: t.punct }}>;</span></>, minLen: 1 },
  { content: <></>, minLen: 2 },
  { content: <><span style={{ color: t.keyword }}>export default function</span> <span style={{ color: t.fn }}>Settings</span><span style={{ color: t.punct }}>() {`{`}</span></>, minLen: 3 },
  { content: <span style={{ color: t.keyword }}>  return (</span>, minLen: 4 },
  { content: <span>    <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>form</span> <span style={{ color: t.prop }}>className</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;space-y-4&quot;</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 5 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Field</span> <span style={{ color: t.prop }}>label</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;Email&quot;</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 6 },
  { content: <span>        <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Input</span> <span style={{ color: t.prop }}>type</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;email&quot;</span> <span style={{ color: t.prop }}>placeholder</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;you@example.com&quot;</span> <span style={{ color: t.punct }}>{`/>`}</span></span>, minLen: 7 },
  { content: <span>      <span style={{ color: t.punct }}>{`</`}</span><span style={{ color: t.comp }}>Field</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 8 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Field</span> <span style={{ color: t.prop }}>label</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;Password&quot;</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 9 },
  { content: <span>        <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Input</span> <span style={{ color: t.prop }}>type</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;password&quot;</span> <span style={{ color: t.prop }}>placeholder</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;••••••&quot;</span> <span style={{ color: t.punct }}>{`/>`}</span></span>, minLen: 10 },
  { content: <span>      <span style={{ color: t.punct }}>{`</`}</span><span style={{ color: t.comp }}>Field</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 11 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Field</span> <span style={{ color: t.prop }}>label</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;Dark mode&quot;</span> <span style={{ color: t.prop }}>orientation</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;horizontal&quot;</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 12 },
  { content: <span>        <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Switch</span> <span style={{ color: t.punct }}>{`/>`}</span></span>, minLen: 13 },
  { content: <span>      <span style={{ color: t.punct }}>{`</`}</span><span style={{ color: t.comp }}>Field</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 14 },
  { content: <span>      <span style={{ color: t.punct }}>{`<`}</span><span style={{ color: t.comp }}>Button</span> <span style={{ color: t.prop }}>color</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;primary&quot;</span> <span style={{ color: t.prop }}>type</span><span style={{ color: t.punct }}>=</span><span style={{ color: t.string }}>&quot;submit&quot;</span><span style={{ color: t.punct }}>{`>`}</span>Save<span style={{ color: t.punct }}>{`</`}</span><span style={{ color: t.comp }}>Button</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 15 },
  { content: <span>    <span style={{ color: t.punct }}>{`</`}</span><span style={{ color: t.comp }}>form</span><span style={{ color: t.punct }}>{`>`}</span></span>, minLen: 16 },
  { content: <span>  <span style={{ color: t.punct }}>);</span></span>, minLen: 17 },
  { content: <span><span style={{ color: t.punct }}>{`}`}</span></span>, minLen: 18 },
];

export const SceneGeneration: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Reveal lines progressively across the first ~18s of the scene
  const revealEnd = fps * 18;
  const linesRevealed = Math.min(
    CODE_LINES.length,
    Math.floor(interpolate(frame, [0, revealEnd], [0, CODE_LINES.length + 1], { extrapolateRight: 'clamp' })),
  );

  // Banner appears after generation
  const bannerOpacity = interpolate(frame, [fps * 18, fps * 18 + 12], [0, 1], { extrapolateRight: 'clamp' });

  // Preview appears at ~22s of the scene
  const previewOpacity = interpolate(frame, [fps * 22, fps * 24], [0, 1], { extrapolateRight: 'clamp' });
  const previewScale = interpolate(frame, [fps * 22, fps * 24], [0.92, 1], { extrapolateRight: 'clamp' });

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
        <Editor filename="app/settings/page.tsx" height={vertical ? 700 : 880}>
          {CODE_LINES.slice(0, linesRevealed).map((line, i) => (
            <Line key={i}>{line.content}</Line>
          ))}
        </Editor>
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 16,
            opacity: bannerOpacity,
            backgroundColor: theme.green,
            color: '#003a14',
            fontSize: 14,
            fontWeight: 700,
            padding: '6px 12px',
            borderRadius: 999,
          }}
        >
          ✓ All props correct · 0 hallucinations
        </div>
      </div>
      <div
        style={{
          flex: vertical ? '0 0 auto' : 1,
          width: vertical ? '95%' : 'auto',
          opacity: previewOpacity,
          transform: `scale(${previewScale})`,
        }}
      >
        <BrowserPreview />
      </div>
    </AbsoluteFill>
  );
};

const BrowserPreview: React.FC = () => (
  <div
    style={{
      backgroundColor: '#fff',
      color: '#0b0b0f',
      borderRadius: 12,
      border: `1px solid ${theme.border}`,
      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        height: 36,
        backgroundColor: '#f6f6f8',
        borderBottom: '1px solid #e5e5ea',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 14,
        gap: 8,
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: 5, background: '#ff5f57' }} />
      <span style={{ width: 10, height: 10, borderRadius: 5, background: '#febc2e' }} />
      <span style={{ width: 10, height: 10, borderRadius: 5, background: '#28c840' }} />
      <span style={{ marginLeft: 16, fontFamily: theme.mono, fontSize: 12, color: '#5a5a75' }}>
        localhost:3000/settings
      </span>
    </div>
    <div style={{ padding: 40, fontFamily: theme.sans }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28 }}>Settings</h1>
      <FieldRow label="Email">
        <input
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: '10px 14px',
            border: '1px solid #d4d4d8',
            borderRadius: 8,
            fontSize: 16,
            fontFamily: theme.sans,
          }}
          readOnly
        />
      </FieldRow>
      <FieldRow label="Password">
        <input
          placeholder="••••••"
          style={{
            width: '100%',
            padding: '10px 14px',
            border: '1px solid #d4d4d8',
            borderRadius: 8,
            fontSize: 16,
            fontFamily: theme.sans,
          }}
          readOnly
        />
      </FieldRow>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <span style={{ fontWeight: 500 }}>Dark mode</span>
        <span
          style={{
            display: 'inline-block',
            width: 44,
            height: 24,
            borderRadius: 999,
            backgroundColor: theme.accent,
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 2,
              left: 22,
              width: 20,
              height: 20,
              borderRadius: 10,
              background: '#fff',
            }}
          />
        </span>
      </div>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: theme.accent,
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: theme.sans,
        }}
      >
        Save
      </button>
    </div>
  </div>
);

const FieldRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: '#3f3f46' }}>{label}</div>
    {children}
  </div>
);
