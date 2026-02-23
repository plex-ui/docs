'use client';

import { useState } from 'react';
import { Switch } from '@plexui/ui/components/Switch';
import { Field } from '@plexui/ui/components/Field';

export function SwitchControlledDemo() {
  const [checked, setChecked] = useState(false);
  return <Switch label="Airplane mode" checked={checked} onCheckedChange={setChecked} />;
}

export function SwitchWithDescriptionDemo() {
  return (
    <Switch
      label="Disable user API keys"
      description="Disable user-based API keys across your entire organization."
    />
  );
}

export function SwitchLabelPositionWithDescriptionDemo() {
  return (
    <Switch
      label="Dark mode"
      description="Use dark theme across the entire application."
      labelPosition="start"
    />
  );
}

export function SwitchDisabledWithLabelDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Switch label="Notifications" disabled />
      <Switch label="Notifications" disabled defaultChecked />
    </div>
  );
}

export function SwitchDisabledWithDescriptionDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Switch
        label="Enable SSO"
        description="Requires an Enterprise plan to configure."
        disabled
      />
      <Switch
        label="Two-factor authentication"
        description="Enforced by organization policy."
        disabled
        defaultChecked
      />
    </div>
  );
}

export function SwitchWithFieldDemo() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="self-stretch mx-auto !max-w-[480px]">
      <Field label="Marketing emails" orientation="horizontal" className="items-center justify-between [--field-horizontal-label-width:auto] [--field-horizontal-control-width:auto] [--field-label-horizontal-offset:0px]">
        {(fieldProps) => (
          <Switch
            id={fieldProps.id}
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        )}
      </Field>
    </div>
  );
}

export function SwitchWithFieldDescriptionDemo() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="self-stretch mx-auto !max-w-[480px]">
      <Field label="Access Control" description="Disable user-based API keys across your entire organization. You can also choose to disable them on a project-by-project basis if needed.">
        {(fieldProps) => (
          <Switch
            id={fieldProps.id}
            label="Disable user API keys"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        )}
      </Field>
    </div>
  );
}

export function SwitchSettingsPanelDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <Switch
        label="Enable custom providers for evals"
        description="Allow eval runs to use third-party models you configure under Custom model providers."
      />
      <Switch
        label="Enable OpenRouter models"
        description="Make OpenRouter models available for evaluation runs."
      />
      <Switch
        label="Disable user API keys"
        description="Disable user-based API keys across your entire organization."
        defaultChecked
      />
    </div>
  );
}

export function SwitchNotificationSettingsDemo() {
  return (
    <div className="w-full max-w-lg divide-y divide-alpha/15">
      <div className="pb-5">
        <Field label="Notifications" description="Configure how you receive notifications.">
          {() => (
            <div className="flex flex-col gap-4">
              <Switch
                label="Push notifications"
                description="Receive push notifications on your devices."
                defaultChecked
              />
              <Switch
                label="Email notifications"
                description="Get notified via email for important updates."
              />
            </div>
          )}
        </Field>
      </div>
      <div className="pt-5">
        <Field label="Privacy" description="Control your data sharing preferences.">
          {() => (
            <div className="flex flex-col gap-4">
              <Switch
                label="Share usage data"
                description="Help us improve by sharing anonymous usage statistics."
              />
              <Switch
                label="Personalized content"
                description="Allow personalized recommendations based on your activity."
                defaultChecked
              />
            </div>
          )}
        </Field>
      </div>
    </div>
  );
}
