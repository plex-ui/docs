'use client';
import React, { useCallback, useId, useRef, useState } from 'react';
import { FloatingLabelInput } from '@plexui/ui/components/FloatingLabelInput';
import { FloatingLabelSelect } from '@plexui/ui/components/FloatingLabelSelect';
import { Select, type Option } from '@plexui/ui/components/Select';
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
 * When a segment is complete (2 digits for month, 4 for month+day),
 * the trailing separator is included so the cursor advances past it.
 */
function formatBirthdayValue(rawValue: string): string {
  const digits = getDigits(rawValue);
  const month = digits.slice(0, 2);
  const day = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  if (digits.length < 2) return month;
  if (digits.length === 2) return `${month} / `;
  if (digits.length < 4) return `${month} / ${day}`;
  if (digits.length === 4) return `${month} / ${day} / `;
  return `${month} / ${day} / ${year}`;
}

/**
 * Build the visible mask suffix that appears after the typed text.
 * E.g. typed "12" -> value is "12 / " -> mask suffix is "DD / YYYY"
 *      typed "1"  -> value is "1"     -> mask suffix is "M / DD / YYYY"
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
      const raw = evt.target.value;
      const newDigits = getDigits(raw);
      const oldDigits = getDigits(value);
      // Backspace through a separator: raw got shorter but digit count unchanged
      if (raw.length < value.length && newDigits.length === oldDigits.length) {
        const trimmed = newDigits.slice(0, -1);
        onChange(formatBirthdayValue(trimmed));
      } else {
        onChange(formatBirthdayValue(raw));
      }
    },
    [onChange, value],
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
          {/* Active segment placeholder (accent highlight) */}
          {maskParts.highlight && (
            <span
              style={{
                backgroundColor: 'var(--color-background-primary-solid)',
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
export function FloatingLabelInputBirthdayValidationDemo() {
  const [birthday, setBirthday] = useState('02 / 30 / 2001');
  const errorMessage = birthday ? (isValidBirthday(birthday) ? undefined : 'Please enter a valid date.') : undefined;
  const errorId = 'birthday-validation-demo-error';

  return (
    <div data-demo-stage className="py-10">
      <div className="w-[360px]">
        <div className="flex flex-col gap-1.5">
          <BirthdayMaskedInput
            value={birthday}
            onChange={setBirthday}
            invalid={!!errorMessage}
            aria-describedby={errorMessage ? errorId : undefined}
          />
          {errorMessage && <FieldError id={errorId}>{errorMessage}</FieldError>}
        </div>
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

// ---------------------------------------------------------------------------
// FlagIcon — SVG flags from lipis/flag-icons CDN (matching PhoneInputDemos)
// ---------------------------------------------------------------------------
function FlagIcon({ code }: { code: string }) {
  return (
    <span
      style={{
        display: 'block',
        height: 16,
        aspectRatio: '4 / 3',
        borderRadius: 2,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <img
        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.5.0/flags/4x3/${code}.svg`}
        alt=""
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Country select data (full list matching PhoneInputDemos)
// ---------------------------------------------------------------------------
const COUNTRIES: { value: string; label: string }[] = [
  { value: 'af', label: 'Afghanistan' },
  { value: 'al', label: 'Albania' },
  { value: 'dz', label: 'Algeria' },
  { value: 'as', label: 'American Samoa' },
  { value: 'ad', label: 'Andorra' },
  { value: 'ao', label: 'Angola' },
  { value: 'ai', label: 'Anguilla' },
  { value: 'ag', label: 'Antigua and Barbuda' },
  { value: 'ar', label: 'Argentina' },
  { value: 'am', label: 'Armenia' },
  { value: 'aw', label: 'Aruba' },
  { value: 'au', label: 'Australia' },
  { value: 'at', label: 'Austria' },
  { value: 'az', label: 'Azerbaijan' },
  { value: 'bs', label: 'Bahamas' },
  { value: 'bh', label: 'Bahrain' },
  { value: 'bd', label: 'Bangladesh' },
  { value: 'bb', label: 'Barbados' },
  { value: 'by', label: 'Belarus' },
  { value: 'be', label: 'Belgium' },
  { value: 'bz', label: 'Belize' },
  { value: 'bj', label: 'Benin' },
  { value: 'bm', label: 'Bermuda' },
  { value: 'bt', label: 'Bhutan' },
  { value: 'bo', label: 'Bolivia' },
  { value: 'ba', label: 'Bosnia and Herzegovina' },
  { value: 'bw', label: 'Botswana' },
  { value: 'br', label: 'Brazil' },
  { value: 'bn', label: 'Brunei' },
  { value: 'bg', label: 'Bulgaria' },
  { value: 'bf', label: 'Burkina Faso' },
  { value: 'bi', label: 'Burundi' },
  { value: 'kh', label: 'Cambodia' },
  { value: 'cm', label: 'Cameroon' },
  { value: 'ca', label: 'Canada' },
  { value: 'cv', label: 'Cape Verde' },
  { value: 'ky', label: 'Cayman Islands' },
  { value: 'cf', label: 'Central African Republic' },
  { value: 'td', label: 'Chad' },
  { value: 'cl', label: 'Chile' },
  { value: 'cn', label: 'China' },
  { value: 'co', label: 'Colombia' },
  { value: 'km', label: 'Comoros' },
  { value: 'cg', label: 'Congo' },
  { value: 'cd', label: 'Congo (DRC)' },
  { value: 'ck', label: 'Cook Islands' },
  { value: 'cr', label: 'Costa Rica' },
  { value: 'ci', label: "C\u00f4te d'Ivoire" },
  { value: 'hr', label: 'Croatia' },
  { value: 'cu', label: 'Cuba' },
  { value: 'cw', label: 'Cura\u00e7ao' },
  { value: 'cy', label: 'Cyprus' },
  { value: 'cz', label: 'Czech Republic' },
  { value: 'dk', label: 'Denmark' },
  { value: 'dj', label: 'Djibouti' },
  { value: 'dm', label: 'Dominica' },
  { value: 'do', label: 'Dominican Republic' },
  { value: 'ec', label: 'Ecuador' },
  { value: 'eg', label: 'Egypt' },
  { value: 'sv', label: 'El Salvador' },
  { value: 'gq', label: 'Equatorial Guinea' },
  { value: 'er', label: 'Eritrea' },
  { value: 'ee', label: 'Estonia' },
  { value: 'sz', label: 'Eswatini' },
  { value: 'et', label: 'Ethiopia' },
  { value: 'fk', label: 'Falkland Islands' },
  { value: 'fo', label: 'Faroe Islands' },
  { value: 'fj', label: 'Fiji' },
  { value: 'fi', label: 'Finland' },
  { value: 'fr', label: 'France' },
  { value: 'gf', label: 'French Guiana' },
  { value: 'pf', label: 'French Polynesia' },
  { value: 'ga', label: 'Gabon' },
  { value: 'gm', label: 'Gambia' },
  { value: 'ge', label: 'Georgia' },
  { value: 'de', label: 'Germany' },
  { value: 'gh', label: 'Ghana' },
  { value: 'gi', label: 'Gibraltar' },
  { value: 'gr', label: 'Greece' },
  { value: 'gl', label: 'Greenland' },
  { value: 'gd', label: 'Grenada' },
  { value: 'gp', label: 'Guadeloupe' },
  { value: 'gu', label: 'Guam' },
  { value: 'gt', label: 'Guatemala' },
  { value: 'gn', label: 'Guinea' },
  { value: 'gw', label: 'Guinea-Bissau' },
  { value: 'gy', label: 'Guyana' },
  { value: 'ht', label: 'Haiti' },
  { value: 'hn', label: 'Honduras' },
  { value: 'hk', label: 'Hong Kong' },
  { value: 'hu', label: 'Hungary' },
  { value: 'is', label: 'Iceland' },
  { value: 'in', label: 'India' },
  { value: 'id', label: 'Indonesia' },
  { value: 'ir', label: 'Iran' },
  { value: 'iq', label: 'Iraq' },
  { value: 'ie', label: 'Ireland' },
  { value: 'il', label: 'Israel' },
  { value: 'it', label: 'Italy' },
  { value: 'jm', label: 'Jamaica' },
  { value: 'jp', label: 'Japan' },
  { value: 'jo', label: 'Jordan' },
  { value: 'kz', label: 'Kazakhstan' },
  { value: 'ke', label: 'Kenya' },
  { value: 'ki', label: 'Kiribati' },
  { value: 'xk', label: 'Kosovo' },
  { value: 'kw', label: 'Kuwait' },
  { value: 'kg', label: 'Kyrgyzstan' },
  { value: 'la', label: 'Laos' },
  { value: 'lv', label: 'Latvia' },
  { value: 'lb', label: 'Lebanon' },
  { value: 'ls', label: 'Lesotho' },
  { value: 'lr', label: 'Liberia' },
  { value: 'ly', label: 'Libya' },
  { value: 'li', label: 'Liechtenstein' },
  { value: 'lt', label: 'Lithuania' },
  { value: 'lu', label: 'Luxembourg' },
  { value: 'mo', label: 'Macao' },
  { value: 'mg', label: 'Madagascar' },
  { value: 'mw', label: 'Malawi' },
  { value: 'my', label: 'Malaysia' },
  { value: 'mv', label: 'Maldives' },
  { value: 'ml', label: 'Mali' },
  { value: 'mt', label: 'Malta' },
  { value: 'mh', label: 'Marshall Islands' },
  { value: 'mq', label: 'Martinique' },
  { value: 'mr', label: 'Mauritania' },
  { value: 'mu', label: 'Mauritius' },
  { value: 'mx', label: 'Mexico' },
  { value: 'fm', label: 'Micronesia' },
  { value: 'md', label: 'Moldova' },
  { value: 'mc', label: 'Monaco' },
  { value: 'mn', label: 'Mongolia' },
  { value: 'me', label: 'Montenegro' },
  { value: 'ms', label: 'Montserrat' },
  { value: 'ma', label: 'Morocco' },
  { value: 'mz', label: 'Mozambique' },
  { value: 'mm', label: 'Myanmar' },
  { value: 'na', label: 'Namibia' },
  { value: 'nr', label: 'Nauru' },
  { value: 'np', label: 'Nepal' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'nc', label: 'New Caledonia' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'ni', label: 'Nicaragua' },
  { value: 'ne', label: 'Niger' },
  { value: 'ng', label: 'Nigeria' },
  { value: 'kp', label: 'North Korea' },
  { value: 'mk', label: 'North Macedonia' },
  { value: 'no', label: 'Norway' },
  { value: 'om', label: 'Oman' },
  { value: 'pk', label: 'Pakistan' },
  { value: 'pw', label: 'Palau' },
  { value: 'ps', label: 'Palestine' },
  { value: 'pa', label: 'Panama' },
  { value: 'pg', label: 'Papua New Guinea' },
  { value: 'py', label: 'Paraguay' },
  { value: 'pe', label: 'Peru' },
  { value: 'ph', label: 'Philippines' },
  { value: 'pl', label: 'Poland' },
  { value: 'pt', label: 'Portugal' },
  { value: 'pr', label: 'Puerto Rico' },
  { value: 'qa', label: 'Qatar' },
  { value: 're', label: 'R\u00e9union' },
  { value: 'ro', label: 'Romania' },
  { value: 'ru', label: 'Russia' },
  { value: 'rw', label: 'Rwanda' },
  { value: 'kn', label: 'Saint Kitts and Nevis' },
  { value: 'lc', label: 'Saint Lucia' },
  { value: 'vc', label: 'Saint Vincent and the Grenadines' },
  { value: 'ws', label: 'Samoa' },
  { value: 'sm', label: 'San Marino' },
  { value: 'st', label: 'S\u00e3o Tom\u00e9 and Pr\u00edncipe' },
  { value: 'sa', label: 'Saudi Arabia' },
  { value: 'sn', label: 'Senegal' },
  { value: 'rs', label: 'Serbia' },
  { value: 'sc', label: 'Seychelles' },
  { value: 'sl', label: 'Sierra Leone' },
  { value: 'sg', label: 'Singapore' },
  { value: 'sk', label: 'Slovakia' },
  { value: 'si', label: 'Slovenia' },
  { value: 'sb', label: 'Solomon Islands' },
  { value: 'so', label: 'Somalia' },
  { value: 'za', label: 'South Africa' },
  { value: 'kr', label: 'South Korea' },
  { value: 'ss', label: 'South Sudan' },
  { value: 'es', label: 'Spain' },
  { value: 'lk', label: 'Sri Lanka' },
  { value: 'sd', label: 'Sudan' },
  { value: 'sr', label: 'Suriname' },
  { value: 'se', label: 'Sweden' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'sy', label: 'Syria' },
  { value: 'tw', label: 'Taiwan' },
  { value: 'tj', label: 'Tajikistan' },
  { value: 'tz', label: 'Tanzania' },
  { value: 'th', label: 'Thailand' },
  { value: 'tl', label: 'Timor-Leste' },
  { value: 'tg', label: 'Togo' },
  { value: 'to', label: 'Tonga' },
  { value: 'tt', label: 'Trinidad and Tobago' },
  { value: 'tn', label: 'Tunisia' },
  { value: 'tr', label: 'Turkey' },
  { value: 'tm', label: 'Turkmenistan' },
  { value: 'tc', label: 'Turks and Caicos Islands' },
  { value: 'tv', label: 'Tuvalu' },
  { value: 'ug', label: 'Uganda' },
  { value: 'ua', label: 'Ukraine' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
  { value: 'uy', label: 'Uruguay' },
  { value: 'uz', label: 'Uzbekistan' },
  { value: 'vu', label: 'Vanuatu' },
  { value: 'va', label: 'Vatican City' },
  { value: 've', label: 'Venezuela' },
  { value: 'vn', label: 'Vietnam' },
  { value: 'vg', label: 'Virgin Islands (British)' },
  { value: 'vi', label: 'Virgin Islands (U.S.)' },
  { value: 'ye', label: 'Yemen' },
  { value: 'zm', label: 'Zambia' },
  { value: 'zw', label: 'Zimbabwe' },
];

// ---------------------------------------------------------------------------
// Country item renderer (shared between demos)
// ---------------------------------------------------------------------------
function CountryLabel({ code, label }: { code: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, verticalAlign: 'middle', lineHeight: 0 }}>
      <FlagIcon code={code} />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Country option renderer for Select dropdown
// ---------------------------------------------------------------------------
const CountryOptionView = ({ value, label }: Option) => (
  <CountryLabel code={value} label={label} />
);

// ---------------------------------------------------------------------------
// Stable trigger renderers for Select (must not be inline per Select docs)
// ---------------------------------------------------------------------------
function useCountryTrigger(
  country: string,
  onClear: () => void,
  extra?: { invalid?: boolean; 'aria-describedby'?: string },
) {
  const selected = COUNTRIES.find((c) => c.value === country);
  return useCallback(
    ({ open }: { open: boolean; onToggle: () => void }) => (
      <FloatingLabelSelect
        label="Country"
        selected={!!selected}
        open={open}
        onClearClick={selected ? onClear : undefined}
        {...extra}
      >
        {selected && <CountryLabel code={selected.value} label={selected.label} />}
      </FloatingLabelSelect>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected, onClear, extra?.invalid, extra?.['aria-describedby']],
  );
}

// ---------------------------------------------------------------------------
// FloatingLabelSelect demos
// ---------------------------------------------------------------------------
export function FloatingLabelSelectCountryDemo() {
  const [country, setCountry] = useState('');
  const handleClear = useCallback(() => setCountry(''), []);
  const trigger = useCountryTrigger(country, handleClear);

  return (
    <div data-demo-stage className="py-10">
      <div className="w-[360px]">
        <Select
          value={country}
          options={COUNTRIES}
          onChange={(option) => setCountry(option.value)}
          searchPlaceholder="Search countries..."
          OptionView={CountryOptionView}
          listMinWidth={360}
          block
          trigger={trigger}
          checkPosition="end"
        />
      </div>
    </div>
  );
}
export function FloatingLabelSelectAboutYouFormDemo() {
  const [fullName, setFullName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [birthdayError, setBirthdayError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const birthdayFieldId = useId();
  const countryFieldId = useId();
  const handleClearCountry = useCallback(() => {
    setCountry('');
    setCountryError(null);
  }, []);
  const triggerExtra = {
    invalid: !!countryError,
    'aria-describedby': countryError ? countryFieldId : undefined,
  };
  const trigger = useCountryTrigger(country, handleClearCountry, triggerExtra);
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let hasError = false;
    if (!birthday) {
      setBirthdayError('Birthday is required.');
      hasError = true;
    } else if (!isValidBirthday(birthday)) {
      setBirthdayError('Please enter a valid date.');
      hasError = true;
    } else {
      setBirthdayError(null);
    }
    if (!country) {
      setCountryError('Please select a country.');
      hasError = true;
    } else {
      setCountryError(null);
    }
    if (hasError) return;
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
          <div className="flex flex-col gap-1.5">
            <Select
              value={country}
              options={COUNTRIES}
              onChange={(option) => { setCountry(option.value); setCountryError(null); }}
              searchPlaceholder="Search countries..."
              OptionView={CountryOptionView}
              listMinWidth={320}
              block
              trigger={trigger}
              checkPosition="end"
            />
            {countryError && <FieldError id={countryFieldId}>{countryError}</FieldError>}
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
