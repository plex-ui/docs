'use client';
import React, { useCallback, useId, useRef, useState } from 'react';
import { FloatingLabelInput } from '@plexui/ui/components/FloatingLabelInput';
import { Switch } from '@plexui/ui/components/Switch';
import { Button } from '@plexui/ui/components/Button';
import { FieldError } from '@plexui/ui/components/FieldError';
// ---------------------------------------------------------------------------
// Birthday mask utilities
// ---------------------------------------------------------------------------

const MASK = 'MM / DD / YYYY';

/**
 * Extract raw digits from a formatted birthday string.
 */
function getDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, 8);
}

/**
 * Format raw digits into "MM / DD / YYYY" with partial support.
 */
function formatBirthdayValue(rawValue: string): string {
  const digits = getDigits(rawValue);
  const month = digits.slice(0, 2);
  const day = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  if (digits.length <= 2) return month;
  if (digits.length <= 4) return `${month} / ${day}`;
  return `${month} / ${day} / ${year}`;
}

/**
 * Build the visible mask suffix that appears after the typed text.
 * E.g. typed "12" -> value is "12" -> mask suffix is " / DD / YYYY"
 *      typed "1"  -> value is "1"  -> mask suffix is "M / DD / YYYY"
 */
function getMaskSuffix(formattedValue: string): string {
  if (formattedValue.length >= MASK.length) return '';
  return MASK.slice(formattedValue.length);
}


/**
 * Split mask suffix into three parts for segment-based highlighting:
 * - before: separator text before the active segment (gray)
 * - highlight: the active/next segment placeholder chars (blue bg)
 * - after: remaining mask text after the active segment (gray)
 *
 * E.g. suffix " / DD / YYYY" => { before: " / ", highlight: "DD", after: " / YYYY" }
 *      suffix "M / DD / YYYY"  => { before: "", highlight: "M", after: " / DD / YYYY" }
 *      suffix "YYY"            => { before: "", highlight: "YYY", after: "" }
 */
function splitMaskSuffix(suffix: string): { before: string; highlight: string; after: string } {
  if (!suffix) return { before: '', highlight: '', after: '' };
  const match = suffix.match(/^(\s*\/\s*)?([A-Z]+)([\s\S]*)/);
  if (!match) return { before: suffix, highlight: '', after: '' };
  return {
    before: match[1] || '',
    highlight: match[2],
    after: match[3] || '',
  };
}

function isValidBirthday(value: string): boolean {
  const parsed = value.match(/^(\d{2})\s\/\s(\d{2})\s\/\s(\d{4})$/);
  if (!parsed) return false;
  const month = Number(parsed[1]);
  const day = Number(parsed[2]);
  const year = Number(parsed[3]);
  if (month < 1 || month > 12) return false;
  const maxDay = new Date(year, month, 0).getDate();
  return day >= 1 && day <= maxDay;
}

// ---------------------------------------------------------------------------
// BirthdayMaskedInput - FloatingLabelInput + OpenAI-style inline mask
// ---------------------------------------------------------------------------

function BirthdayMaskedInput({
  value,
  onChange,
  invalid,
  ...rest
}: {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  'aria-describedby'?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      onChange(formatBirthdayValue(evt.target.value));
    },
    [onChange],
  );

  const maskSuffix = getMaskSuffix(value);
  const showMask = focused && maskSuffix.length > 0;
  const maskParts = splitMaskSuffix(maskSuffix);
  return (
    <div style={{ position: 'relative' }}>
      <FloatingLabelInput
        ref={inputRef}
        label="Birthday"
        value={value}
        maxLength={14}
        inputMode="numeric"
        invalid={invalid}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
      {showMask && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '0 calc(var(--floating-input-gutter) + 1px)',
            pointerEvents: 'none',
            font: 'inherit',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            zIndex: 2,
          }}
        >
          {/* Invisible spacer matching width of typed text */}
          <span style={{ visibility: 'hidden', whiteSpace: 'pre' }}>
            {value}
          </span>
          {/* Separator before the active segment (gray) */}
          {maskParts.before && (
            <span style={{ color: 'var(--color-text-tertiary)', whiteSpace: 'pre' }}>
              {maskParts.before}
            </span>
          )}
          {/* Active segment placeholder (blue highlight) */}
          {maskParts.highlight && (
            <span
              style={{
                backgroundColor: 'var(--floating-input-border-color-focus)',
                color: 'white',
                whiteSpace: 'pre',
                borderRadius: '3px',
                padding: '1px 1px',
              }}
            >
              {maskParts.highlight}
            </span>
          )}
          {/* Remaining mask text after active segment (gray) */}
          {maskParts.after && (
            <span style={{ color: 'var(--color-text-tertiary)', whiteSpace: 'pre' }}>
              {maskParts.after}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo controls
// ---------------------------------------------------------------------------
const controlsTableStyle: React.CSSProperties = {
  background: 'var(--docs-surface-elevated)',
  width: '100%',
};
const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 16px 6px 8px',
  borderTop: '1px solid var(--color-fd-border)',
};
const controlLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
  fontSize: '0.8125rem',
  padding: '2px 8px',
};
function DemoControlBoolean({
  name,
  value,
  onChange,
}: {
  name: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const controlId = 'demo-switch-' + name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div style={controlRowStyle}>
      <label htmlFor={controlId} style={controlLabelStyle}>{name}</label>
      <Switch id={controlId} checked={value} onCheckedChange={onChange} aria-label={name} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exported demos
// ---------------------------------------------------------------------------
export function FloatingLabelInputWithClearButtonDemoWithControls() {
  const [value, setValue] = useState('clearable@example.com');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
        <DemoControlBoolean name="readOnly" value={readOnly} onChange={setReadOnly} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[360px]">
          <FloatingLabelInput
            label="Email address"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
            onClear={() => setValue('')}
            disabled={disabled}
            readOnly={readOnly}
          />
        </div>
      </div>
    </>
  );
}
export function FloatingLabelInputDisabledDemoWithControls() {
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[360px]">
          <FloatingLabelInput
            label="Email address"
            defaultValue="disabled@example.com"
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
}
export function FloatingLabelInputBirthdayDemo() {
  const [birthday, setBirthday] = useState('');

  return (
    <div data-demo-stage className="py-10">
      <div className="w-[360px]">
        <BirthdayMaskedInput value={birthday} onChange={setBirthday} />
      </div>
    </div>
  );
}
export function FloatingLabelInputAboutYouFormDemo() {
  const [fullName, setFullName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthdayError, setBirthdayError] = useState<string | null>(null);
  const birthdayFieldId = useId();
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!birthday) {
      setBirthdayError('Birthday is required.');
      return;
    }
    if (!isValidBirthday(birthday)) {
      setBirthdayError('Please enter a valid date.');
      return;
    }
    setBirthdayError(null);
  };

  return (
    <div data-demo-stage className="py-10">
      <div className="w-[320px]">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">Tell us about you</h3>
          <p className="text-secondary text-sm mt-1">This helps us customize your experience.</p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <FloatingLabelInput
            label="Full name"
            value={fullName}
            onChange={(evt) => setFullName(evt.target.value)}
          />
          <div className="flex flex-col gap-1.5">
            <BirthdayMaskedInput
              value={birthday}
              onChange={(val) => {
                setBirthday(val);
                setBirthdayError(null);
              }}
              invalid={!!birthdayError}
              aria-describedby={birthdayError ? birthdayFieldId : undefined}
            />
            {birthdayError && <FieldError id={birthdayFieldId}>{birthdayError}</FieldError>}
          </div>
          <p className="text-xs text-center text-tertiary mt-3">
            By clicking &ldquo;Continue&rdquo;, you agree to our{' '}
            <span className="underline">Terms</span> and have read our{' '}
            <span className="underline">Privacy Policy</span>.
          </p>
          <Button color="primary" type="submit" className="h-[3.25rem]">Continue</Button>
        </form>
      </div>
    </div>
  );
}
