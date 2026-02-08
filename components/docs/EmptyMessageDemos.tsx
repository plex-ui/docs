'use client';

import { Button } from '@plexui/ui/components/Button';
import { ArrowUpRight, Explore, Mic, Plus, Search, Sparkle } from '@plexui/ui/components/Icon';
import { TextLink } from '@plexui/ui/components/TextLink';
import { EmptyMessage } from '@plexui/ui/components/EmptyMessage';

export function EmptyMessageBaseDemo() {
  return (
    <EmptyMessage>
      <EmptyMessage.Icon>
        <Explore />
      </EmptyMessage.Icon>
      <EmptyMessage.Title>Your evaluations will appear here</EmptyMessage.Title>
      <EmptyMessage.Description>
        Create an evaluation to assess your model's responses
      </EmptyMessage.Description>
      <EmptyMessage.ActionRow>
        <Button color="primary" onClick={() => {}} size="lg">
          <Plus className="mr-[-2px]" />
          Create
        </Button>
      </EmptyMessage.ActionRow>
    </EmptyMessage>
  );
}

export function EmptyMessageErrorDemo() {
  return (
    <EmptyMessage>
      <EmptyMessage.Icon color="danger">
        <Mic />
      </EmptyMessage.Icon>
      <EmptyMessage.Title color="danger">
        Enable microphone access in your browser's settings.
      </EmptyMessage.Title>
    </EmptyMessage>
  );
}

export function EmptyMessageEmptyDemo() {
  return (
    <EmptyMessage fill="none">
      <EmptyMessage.Icon size="sm">
        <Search />
      </EmptyMessage.Icon>
      <EmptyMessage.Description>
        No icons found matching <span className="font-semibold">&quot;pizza&quot;</span>
      </EmptyMessage.Description>
    </EmptyMessage>
  );
}

export function EmptyMessageWarningDemo() {
  return (
    <EmptyMessage>
      <EmptyMessage.Icon color="warning">
        <Sparkle />
      </EmptyMessage.Icon>
      <EmptyMessage.Title>o1-preview is in beta</EmptyMessage.Title>
      <EmptyMessage.Description>
        System instructions and model configuration are not available yet. Responses may take
        longer.
      </EmptyMessage.Description>
      <EmptyMessage.ActionRow className="text-sm">
        <TextLink href="/">
          Learn more
          <ArrowUpRight />
        </TextLink>
      </EmptyMessage.ActionRow>
    </EmptyMessage>
  );
}
