'use client';

import { DateTime } from 'luxon';
import { useRef, useState } from 'react';
import { DatePicker } from '@plexui/ui/components/DatePicker';
import { Input } from '@plexui/ui/components/Input';

type MaskSegment = {
  length: number;
  separator?: string;
};

const DATE_MASK = 'MM / DD / YYYY';
const DATETIME_MASK = 'MM / DD / YYYY  HH : MM';
const DATE_SEGMENTS: MaskSegment[] = [
  { length: 2, separator: ' / ' },
  { length: 2, separator: ' / ' },
  { length: 4 },
];
const DATETIME_SEGMENTS: MaskSegment[] = [
  { length: 2, separator: ' / ' },
  { length: 2, separator: ' / ' },
  { length: 4, separator: '  ' },
  { length: 2, separator: ' : ' },
  { length: 2 },
];

function getDigits(value: string, maxDigits: number): string {
  return value.replace(/\D/g, '').slice(0, maxDigits);
}

function format(rawValue: string, segments: MaskSegment[]): string {
  const maxDigits = segments.reduce((acc, segment) => acc + segment.length, 0);
  const digits = getDigits(rawValue, maxDigits);
  let formatted = '';
  let offset = 0;

  for (const segment of segments) {
    if (offset >= digits.length) {
      break;
    }
    const part = digits.slice(offset, offset + segment.length);
    formatted += part;
    offset += part.length;
    if (part.length === segment.length && segment.separator) {
      formatted += segment.separator;
    }
  }

  return formatted;
}

function getMaskSuffix(formattedValue: string, mask: string): string {
  if (formattedValue.length >= mask.length) return '';
  return mask.slice(formattedValue.length);
}

function splitMaskSuffix(suffix: string): { before: string; highlight: string; after: string } {
  if (!suffix) return { before: '', highlight: '', after: '' };
  const match = suffix.match(/^([^A-Z]*)([A-Z]+)([\s\S]*)/);
  if (!match) return { before: suffix, highlight: '', after: '' };
  return {
    before: match[1] || '',
    highlight: match[2],
    after: match[3] || '',
  };
}

export function DatePickerBaseDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  return (
    <DatePicker
      id="date-picker-base"
      triggerDateFormat="MM/dd/yy"
      size="lg"
      pill
      clearable
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
    />
  );
}

export function DatePickerLimitsDemo() {
  const today = DateTime.local();
  const minDate = today.minus({ days: 30 }).startOf('day');
  const maxDate = today.plus({ days: 30 }).endOf('day');
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(today);
  return (
    <DatePicker
      id="date-picker-limits"
      triggerDateFormat="MM/dd/yy"
      size="lg"
      pill
      triggerShowIcon
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
      min={minDate}
      max={maxDate}
    />
  );
}

export function DatePickerWithoutIconDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  return (
    <DatePicker
      id="date-picker-no-icon"
      triggerDateFormat="MM/dd/yy"
      size="lg"
      triggerShowIcon={false}
      placeholder="Choose a date"
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
    />
  );
}

export function DatePickerDisabledDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(DateTime.local());
  return (
    <DatePicker
      id="date-picker-disabled"
      triggerDateFormat="MM/dd/yy"
      size="lg"
      disabled
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
    />
  );
}

export function DatePickerDobDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  return (
    <DatePicker
      id="date-picker-dob"
      triggerDateFormat="MMMM d, yyyy"
      size="lg"
      pill
      clearable
      placeholder="Select your birthday"
      captionLayout="dropdown"
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
      max={DateTime.local()}
    />
  );
}

export function DatePickerTimeDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  return (
    <DatePicker
      id="date-picker-time"
      triggerDateFormat="MM/dd/yy HH:mm"
      size="lg"
      pill
      clearable
      placeholder="Select date & time"
      showTime
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
    />
  );
}

export function DatePickerDateTimeDropdownDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  return (
    <DatePicker
      id="date-picker-datetime-dropdown"
      triggerDateFormat="MMM d, yyyy HH:mm"
      size="lg"
      pill
      clearable
      placeholder="Schedule event"
      captionLayout="dropdown"
      showTime
      yearRange={[2020, 2030]}
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
    />
  );
}

export function DatePickerTwoFieldDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [time, setTime] = useState('10:30');

  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d:]/g, '');
    const digits = raw.replace(/:/g, '');
    let formatted = digits;
    if (digits.length >= 3) {
      formatted = digits.slice(0, 2) + ':' + digits.slice(2, 4);
    } else if (digits.length === 2 && !raw.includes(':')) {
      formatted = digits + ':';
    }
    setTime(formatted.slice(0, 5));

    const parts = formatted.split(':');
    if (parts.length === 2 && parts[1].length === 2 && selectedDate) {
      const h = Math.min(23, Number(parts[0]) || 0);
      const m = Math.min(59, Number(parts[1]) || 0);
      setSelectedDate(selectedDate.set({ hour: h, minute: m }));
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <DatePicker
        id="date-picker-two-field-date"
        triggerDateFormat="MMM d, yyyy"
        size="lg"
        pill
        captionLayout="dropdown"
        triggerShowIcon={false}
        dropdownIconType="none"
        placeholder="Select date"
        value={selectedDate}
        onChange={(next) => {
          const dt = next as DateTime | null;
          if (dt && time) {
            const [h, m] = time.split(':').map(Number);
            setSelectedDate(dt.set({ hour: h || 0, minute: m || 0 }));
          } else {
            setSelectedDate(dt);
          }
        }}
      />
      <Input
        id="date-picker-two-field-time"
        size="lg"
        pill
        value={time}
        onChange={handleTimeInput}
        placeholder="HH:MM"
        maxLength={5}
        style={{ width: '72px' }}
      />
    </div>
  );
}

function MaskedInput({
  value,
  onChange,
  mask,
  segments,
  maxDigits,
}: {
  value: string;
  onChange: (v: string) => void;
  mask: string;
  segments: MaskSegment[];
  maxDigits: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const raw = evt.target.value;
    const newDigits = getDigits(raw, maxDigits);
    const oldDigits = getDigits(value, maxDigits);
    if (raw.length < value.length && newDigits.length === oldDigits.length) {
      onChange(format(newDigits.slice(0, -1), segments));
      return;
    }
    onChange(format(raw, segments));
  };

  const maskSuffix = getMaskSuffix(value, mask);
  const hasSuffix = maskSuffix.length > 0;
  const maskParts = splitMaskSuffix(maskSuffix);
  const showHighlight = focused && hasSuffix;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={mask.length}
        inputMode="numeric"
        style={{
          height: '36px',
          padding: '0 16px',
          border: '1px solid var(--color-border)',
          borderRadius: '9999px',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          fontSize: '14px',
          fontFamily: 'inherit',
          lineHeight: '36px',
          outline: 'none',
          width: `${mask.length + 2}ch`,
          caretColor: showHighlight ? 'transparent' : undefined,
        }}
      />
      {hasSuffix && (
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
            padding: '0 16px',
            pointerEvents: 'none',
            fontSize: '14px',
            fontFamily: 'inherit',
            lineHeight: '36px',
            overflow: 'hidden',
          }}
        >
          <span style={{ visibility: 'hidden', whiteSpace: 'pre' }}>{value}</span>
          {maskParts.before && (
            <span style={{ color: 'var(--color-text-tertiary)', whiteSpace: 'pre' }}>{maskParts.before}</span>
          )}
          {maskParts.highlight && showHighlight ? (
            <span style={{
              backgroundColor: 'var(--color-background-primary-solid)',
              color: 'white',
              whiteSpace: 'pre',
              borderRadius: '4px',
              padding: '2px 3px',
              margin: '0 -1px',
              lineHeight: '1.2',
            }}>
              {maskParts.highlight}
            </span>
          ) : maskParts.highlight ? (
            <span style={{ color: 'var(--color-text-tertiary)', whiteSpace: 'pre' }}>{maskParts.highlight}</span>
          ) : null}
          {maskParts.after && (
            <span style={{ color: 'var(--color-text-tertiary)', whiteSpace: 'pre' }}>{maskParts.after}</span>
          )}
        </div>
      )}
    </div>
  );
}

export function DatePickerMaskedDateDemo() {
  const [value, setValue] = useState('');
  return <MaskedInput value={value} onChange={setValue} mask={DATE_MASK} segments={DATE_SEGMENTS} maxDigits={8} />;
}

export function DatePickerMaskedDateTimeDemo() {
  const [value, setValue] = useState('');
  return <MaskedInput value={value} onChange={setValue} mask={DATETIME_MASK} segments={DATETIME_SEGMENTS} maxDigits={12} />;
}
