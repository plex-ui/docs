'use client';

import { MarkdownEditor, markdownEditorStyles } from '@plexui/ui/components/MarkdownEditor';
import { Field } from '@plexui/ui/components/Field';
import { Translate } from '@plexui/ui/components/Icon';

const ALL_FORMATTING_MD = `This is regular text with **bold** and *italic* formatting.

Read our [Privacy Policy](https://example.com/privacy) and [Terms of Service](https://example.com/terms) for details.

1. First ordered item
2. Second ordered item
3. Third ordered item

- Unordered item one
- Unordered item two
- Unordered item three`;

export function MarkdownEditorBaseDemo() {
  return (
    <div className="w-[500px]">
      <MarkdownEditor placeholder="Enter text..." />
    </div>
  );
}

export function MarkdownEditorAllFormattingDemo() {
  return (
    <div className="w-[500px]">
      <MarkdownEditor defaultValue={ALL_FORMATTING_MD} />
    </div>
  );
}

export function MarkdownEditorWithFieldDemo() {
  return (
    <div className="w-[500px]">
      <Field label="Description" description="Supports bold, italic, lists, and links.">
        <MarkdownEditor placeholder="Enter description..." />
      </Field>
    </div>
  );
}

export function MarkdownEditorToolbarEndDemo() {
  return (
    <div className="w-[500px]">
      <Field label="Text markdown">
        <MarkdownEditor
          placeholder="Enter text..."
          toolbarEnd={
            <button
              type="button"
              className={markdownEditorStyles.toolbarButton}
              aria-label="Edit translations"
              title="Edit translations"
            >
              <Translate />
            </button>
          }
        />
      </Field>
    </div>
  );
}

export function MarkdownEditorVariantsDemo() {
  return (
    <div className="flex flex-col gap-4 w-[500px]">
      <Field label="Outline">
        <MarkdownEditor placeholder="Outline variant..." variant="outline" />
      </Field>
      <Field label="Soft">
        <MarkdownEditor placeholder="Soft variant..." variant="soft" />
      </Field>
    </div>
  );
}

export function MarkdownEditorDisabledDemo() {
  return (
    <div className="w-[500px]">
      <MarkdownEditor
        disabled
        defaultValue="This content is **read-only**."
      />
    </div>
  );
}

export function MarkdownEditorInvalidDemo() {
  return (
    <div className="w-[500px]">
      <Field label="Bio" errorMessage="This field is required.">
        <MarkdownEditor placeholder="Tell us about yourself..." invalid />
      </Field>
    </div>
  );
}


