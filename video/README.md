# Plex UI hero video (Remotion)

60-second animated launch video, fully programmatic — no recording, no editor required.

## Install

This is an isolated workspace. From the repo root:

```bash
cd video
npm install
```

(First run downloads Chromium for Remotion. ~150MB, one-time.)

## Preview live

```bash
npm run preview
```

Opens Remotion Studio at http://localhost:3000 (or next free port). Edit any file in `src/` and see changes live. Use the timeline to scrub, the props panel to toggle vertical mode.

## Render to MP4

```bash
# 16:9 landscape (1920×1080) — for YouTube, README, HN, docs hero
npm run build

# 9:16 vertical (1080×1920) — for Threads, TikTok, Reels, Shorts
npm run build-vertical

# Animated GIF (use sparingly — large file)
npm run build-gif
```

Output lands in `out/`. Render takes ~2-3 minutes on an M-series Mac, longer on Linux/Windows.

## Structure

```
video/
├── src/
│   ├── index.ts              # registerRoot
│   ├── Root.tsx              # composition definitions (16:9 + 9:16)
│   ├── HeroVideo.tsx         # main scene orchestration
│   ├── theme.ts              # colors + fonts
│   ├── components/
│   │   ├── Terminal.tsx      # macOS-style terminal frame
│   │   ├── Editor.tsx        # VS Code-style editor + syntax tokens
│   │   └── TypedText.tsx     # typewriter animation primitive
│   └── scenes/
│       ├── Hook.tsx          # 0-3s — broken AI output
│       ├── Install.tsx       # 3-8s — one-command install
│       ├── Prompt.tsx        # 8-14s — user types prompt
│       ├── Generation.tsx    # 14-45s — code streams + browser preview
│       ├── Features.tsx      # 45-55s — 4 feature cards
│       └── CTA.tsx           # 55-60s — logo + npm install
└── out/                      # rendered MP4s (gitignored)
```

## How to tweak

- **Scene durations** — edit `SCENES` array in `src/HeroVideo.tsx`. Must sum to 60s (or update `Root.tsx` total).
- **Colors / fonts** — `src/theme.ts`. Used everywhere.
- **Code shown in Generation** — `CODE_LINES` in `src/scenes/Generation.tsx`.
- **Audio** — Remotion supports `<Audio src="..." />` inside compositions. Drop a track in `public/`, then add `<Audio src={staticFile('music.mp3')} volume={0.3} />` in `HeroVideo.tsx`. Suggested: `epidemicsound.com` or `pixabay.com/music`.

## Why Remotion vs. real screen recording

- Predictable, re-renderable from code
- Easy to crop to vertical for socials
- No "wait for the dev server to load" / typo dubs
- Looks like Linear/Arc/Raycast announcements

For a *companion* "live Claude Code" recording, see `.claude/launch/video-script.md` in the repo root — that's a separate take you can do later if you want a more authentic angle.

## Troubleshooting

- **Chromium download fails** — set `REMOTION_BROWSER_EXECUTABLE_PATH` to your local Chrome.
- **Fonts look generic** — ensure system has Inter installed, or comment in `@remotion/google-fonts` calls.
- **Output is too dark on some screens** — change `Config.setCrf(18)` to `15` in `remotion.config.ts` for higher quality.
