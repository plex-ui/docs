'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import {
  Code,
  Functions,
  Globe,
  ImageSquare,
  Search,
  Tools,
} from '@plexui/ui/components/Icon';
import { Popover, usePopoverController } from '@plexui/ui/components/Popover';

export function PopoverBaseDemo() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button color="primary">Generate</Button>
      </Popover.Trigger>
      <Popover.Content side="right">
        <div className="p-4">
          <p className="text-sm text-secondary">Popover content. Use with any floating UI.</p>
        </div>
      </Popover.Content>
    </Popover>
  );
}

export function PopoverNaturalSizingDemo() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button color="primary" size="lg" variant="ghost" className="font-semibold gap-1.5">
          <Tools /> Actions
        </Button>
      </Popover.Trigger>
      <Popover.Content className="flex p-2" minWidth="auto" side="top">
        <Button color="primary" variant="ghost" gutterSize="sm">
          <Functions height={18} width={18} />
        </Button>
        <Button color="primary" variant="ghost" gutterSize="sm">
          <Search height={18} width={18} />
        </Button>
        <Button color="primary" variant="ghost" gutterSize="sm">
          <Globe height={18} width={18} />
        </Button>
        <Button color="primary" variant="ghost" gutterSize="sm">
          <Code height={18} width={18} />
        </Button>
        <Button color="primary" variant="ghost" gutterSize="sm">
          <ImageSquare height={18} width={18} />
        </Button>
      </Popover.Content>
    </Popover>
  );
}

function InteractiveContent() {
  const { close } = usePopoverController();
  return (
    <div className="p-4">
      <h3 className="mb-1 text-sm font-semibold">Popover with actions</h3>
      <p className="text-sm text-secondary">Try using tab to navigate</p>
      <div className="mt-4 flex gap-2">
        <Button color="secondary" variant="soft" onClick={close}>
          Cancel
        </Button>
        <Button color="primary" onClick={close}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

export function PopoverHoverDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Popover showOnHover>
        <Popover.Trigger>
          <Button color="primary">Static content</Button>
        </Popover.Trigger>
        <Popover.Content width={320} side="right">
          <div className="p-3">
            <h3 className="mb-0.5 font-semibold">Popover Title</h3>
            <p className="text-sm text-secondary">
              This is an example of a hoverable popover containing presentational content.
            </p>
            <footer className="mt-2 text-xs text-tertiary">Last updated June 20, 2025</footer>
          </div>
        </Popover.Content>
      </Popover>
      <Popover showOnHover>
        <Popover.Trigger>
          <Button color="primary">Interactive content</Button>
        </Popover.Trigger>
        <Popover.Content minWidth={230} side="right">
          <InteractiveContent />
        </Popover.Content>
      </Popover>
    </div>
  );
}

function PopoverTextarea({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (next: string) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={(evt) => onChange?.(evt.target.value)}
      placeholder="Describe what you're using the model for, and we'll generate system instructions."
      style={{
        width: '100%',
        height: 80,
        background: 'none',
        padding: '8px 12px 12px',
        border: 0,
        fontSize: 14,
        lineHeight: '20px',
        resize: 'none',
        outline: 0,
      }}
    />
  );
}

function PopoverActionBar({ loading }: { loading?: boolean }) {
  return (
    <div className="px-2 pb-2 flex items-center justify-between">
      <div className="flex gap-1 items-center font-normal text-sm text-tertiary">
        <Tools width={16} height={16} />
        Free beta
      </div>
      <Button color="primary" size="xs" loading={loading} type="submit">
        Create
      </Button>
    </div>
  );
}

function PopoverControllerForm() {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { shake, close } = usePopoverController();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!value) {
      shake();
      return;
    }
    setSubmitting(true);
    setTimeout(close, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PopoverTextarea value={value} onChange={setValue} />
      <PopoverActionBar loading={submitting} />
    </form>
  );
}

export function PopoverControllerDemo() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button color="primary">Generate</Button>
      </Popover.Trigger>
      <Popover.Content side="right">
        <PopoverControllerForm />
      </Popover.Content>
    </Popover>
  );
}
