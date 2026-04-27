import { ImageResponse } from 'next/og';

/**
 * Shared template for per-page OpenGraph images. Each
 * `opengraph-image.tsx` file under `app/(docs)/{components,docs,icons}/
 * [[...slug]]/` calls this with `section` (e.g. "Components") + the
 * page's `title` + `description` and returns the generated PNG.
 *
 * Visual: white background, faint top-left brand row, big title,
 * single-line description, "plexui.com" footer. No webfont fetching —
 * uses the system's UI font stack via `font-family: system-ui, …` so
 * this works in any deploy environment without a font asset round-trip.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = 'image/png' as const;

const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

export function renderOgImage(opts: {
  section: string;
  title: string;
  description?: string;
}) {
  const { section, title, description } = opts;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          fontFamily: FONT_STACK,
          background:
            'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)',
        }}
      >
        {/* Brand row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#0A0A0A',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: '#0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <span>Plex UI</span>
          <span style={{ color: '#A3A3A3', fontWeight: 500 }}>·</span>
          <span style={{ color: '#737373', fontWeight: 500 }}>{section}</span>
        </div>

        {/* Title block */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                fontSize: 32,
                fontWeight: 400,
                color: '#525252',
                lineHeight: 1.35,
                maxWidth: 1040,
                // Render at most ~2 lines worth — shorter descriptions
                // already fit; longer ones get visually trimmed by the
                // box height.
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        {/* Footer URL */}
        <div
          style={{
            display: 'flex',
            color: '#737373',
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: '-0.005em',
          }}
        >
          plexui.com
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE }
  );
}
