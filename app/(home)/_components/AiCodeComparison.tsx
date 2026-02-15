'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { LandingSection, SectionHeading } from './LandingSection';

const WITHOUT_CODE = `// AI-generated — no design system
export function SettingsPage() {
  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: 600 }}>
        Settings
      </h1>
      <label style={{ display: "block", marginTop: "16px" }}>
        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          Name
        </span>
        <input
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            marginTop: "4px",
          }}
        />
      </label>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        Save changes
      </button>
    </div>
  );
}`;

const WITH_CODE = `// AI-generated — with Plex UI
import { Button } from "@plexui/ui/components/Button";
import { Input } from "@plexui/ui/components/Input";
import { Field } from "@plexui/ui/components/Field";

export function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Settings</h1>
      <Field label="Name" className="mt-4">
        <Input size="md" />
      </Field>
      <Button color="primary" size="md" className="mt-5">
        Save changes
      </Button>
    </div>
  );
}`;

/** Strip fumadocs chrome — keep figure overflow:hidden so copy button stays pinned */
const codeReset =
  '[&_figure]:!my-0 [&_figure]:!rounded-none [&_figure]:!border-0 [&_figure]:!bg-transparent [&_figure]:!shadow-none ' +
  '[&_figure>div]:!max-h-none ' +
  '[&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent';

export function AiCodeComparison() {
  return (
    <LandingSection id="ai-comparison" data-reveal>
      {/*
        Target the fumadocs inner scroll div (figure > div.overflow-auto).
        Hide scrollbar by default, show on card hover.
      */}
      <style>{`
        .code-card figure > div.overflow-auto::-webkit-scrollbar { height: 6px; }
        .code-card figure > div.overflow-auto::-webkit-scrollbar-track { background: transparent; }
        .code-card figure > div.overflow-auto::-webkit-scrollbar-thumb { background: transparent; border-radius: 3px; }
        .code-card:hover figure > div.overflow-auto::-webkit-scrollbar-thumb { background: rgba(0,0,0,.18); }
        :root.dark .code-card:hover figure > div.overflow-auto::-webkit-scrollbar-thumb { background: rgba(255,255,255,.18); }
        .code-card figure > div.overflow-auto { scrollbar-width: none; }
        .code-card:hover figure > div.overflow-auto { scrollbar-width: thin; }
      `}</style>

      <SectionHeading description="Same prompt, two outputs. One relies on magic numbers. The other uses a real design system.">
        See the difference
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Left — without */}
        <div className={`code-card flex flex-col overflow-hidden rounded-xl border border-fd-border`}>
          <div className="flex items-center gap-2 border-b border-fd-border px-4 py-2.5">
            <span className="size-2 shrink-0 rounded-full bg-red-500/60" />
            <span className="text-sm font-medium text-fd-muted-foreground">Without a design system</span>
          </div>
          <div className={`flex-1 bg-fd-muted/30 ${codeReset}`}>
            <DynamicCodeBlock lang="tsx" code={WITHOUT_CODE} />
          </div>
        </div>

        {/* Right — with Plex UI: stretch figure+scroll div to fill height so scrollbar sits at bottom */}
        <div className={`code-card flex flex-col overflow-hidden rounded-xl border border-fd-border`}>
          <div className="flex items-center gap-2 border-b border-fd-border px-4 py-2.5">
            <span className="size-2 shrink-0 rounded-full bg-emerald-500/60" />
            <span className="text-sm font-medium text-fd-muted-foreground">With Plex UI</span>
          </div>
          <div className={`flex-1 flex flex-col bg-fd-muted/30 ${codeReset} [&_figure]:!flex [&_figure]:!flex-col [&_figure]:!flex-1 [&_figure>div]:!flex-1`}>
            <DynamicCodeBlock lang="tsx" code={WITH_CODE} />
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
