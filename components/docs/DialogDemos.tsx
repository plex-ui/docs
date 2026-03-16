'use client';

import { useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Dialog } from '@plexui/ui/components/Dialog';

export function DialogOverviewDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div data-demo-stage className="py-10 flex justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button color="secondary" variant="outline">Open dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Unsaved changes</Dialog.Title>
          </Dialog.Header>
          <p className="text-sm text-secondary">You have unsaved changes that will be lost if you close this page. Do you want to save before leaving?</p>
          <Dialog.Footer>
            <Dialog.Close>
              <Button color="primary" variant="soft">Cancel</Button>
            </Dialog.Close>
            <Button color="primary" onClick={() => setOpen(false)}>Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export function DialogDeleteConfirmDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div data-demo-stage className="py-10 flex justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button color="danger" variant="outline">Delete</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Delete assistant?</Dialog.Title>
          </Dialog.Header>
          <p className="text-sm text-secondary">
            This change will affect all API integrations using{' '}
            <span className="font-medium text-[var(--color-text)]">asst_NAM5K9a7loKZay9W8gtQVQ3H</span>.
            It cannot be undone.
          </p>
          <Dialog.Footer>
            <Dialog.Close>
              <Button color="secondary" variant="soft">Cancel</Button>
            </Dialog.Close>
            <Button color="danger" onClick={() => setOpen(false)}>Delete</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
