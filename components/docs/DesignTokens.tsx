'use client';

import { useMemo, useState } from 'react';
import { CopyButton } from '@plexui/ui/components/Button';
import { Search } from '@plexui/ui/components/Icon';
import s from './DesignTokens.module.css';
import {
  BREAKPOINTS,
  FONTS,
  MOTION,
  RADIUS,
  SEMANTIC_COLORS,
  SHADOWS,
  TEXT_COLORS,
} from './tokens';

function matchesFilter(name: string, filter: string) {
  const query = filter.trim().toLowerCase();
  if (query.length === 0) return true;
  return name.toLowerCase().includes(query);
}

export function DesignTokens() {
  const [search, setSearch] = useState<string>('');

  return (
    <>
      <div className={s.StickyContainer}>
        <div className={s.Container}>
          <Search className={s.InputIcon} />
          <input
            className={s.Input}
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      <TextColors filter={search} />
      <SemanticColors filter={search} />
      <TypographyTokens filter={search} />
      <RadiusTokens filter={search} />
      <ShadowTokens filter={search} />
      <BreakpointTokens filter={search} />
      <MotionTokens filter={search} />
    </>
  );
}

function TextColors({ filter }: { filter: string }) {
  const filtered = useMemo(
    () => TEXT_COLORS.filter(({ name }) => matchesFilter(name, filter)),
    [filter]
  );

  if (!filtered.length) return null;

  return (
    <>
      <h2 id="text-colors">Text colors</h2>
      <table className={`${s.Table} ${s.SwatchTable}`}>
        <tbody>
          {filtered.map(({ name, value }) => (
            <tr key={name}>
              <td width={50}>
                <ColorDisplay value={value} />
              </td>
              <td>
                <CopyButton
                  className={s.CopyButton}
                  color="secondary"
                  variant="soft"
                  size="2xs"
                  copyValue={`var(--${name})`}
                >
                  {name}
                </CopyButton>
              </td>
              <td>
                <ValueDisplay value={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function SemanticColors({ filter }: { filter: string }) {
  const filtered = useMemo(
    () => SEMANTIC_COLORS.filter(({ name }) => matchesFilter(name, filter)),
    [filter]
  );

  if (!filtered.length) return null;

  return (
    <>
      <h2 id="semantic-colors">Semantic colors</h2>
      <table className={`${s.Table} ${s.SwatchTable}`}>
        <tbody>
          {filtered.map(({ name, value }) => (
            <tr key={name}>
              <td width={50}>
                <ColorDisplay value={value} />
              </td>
              <td>
                <CopyButton
                  className={s.CopyButton}
                  color="secondary"
                  variant="soft"
                  size="2xs"
                  copyValue={`var(--${name})`}
                >
                  {name}
                </CopyButton>
              </td>
              <td>
                <ValueDisplay value={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function RadiusTokens({ filter }: { filter: string }) {
  const filtered = useMemo(
    () => RADIUS.filter(({ name }) => matchesFilter(name, filter)),
    [filter]
  );

  if (!filtered.length) return null;

  return (
    <>
      <h2 id="radius">Radius</h2>
      <table className={`${s.Table} ${s.RadiusTable}`}>
        <tbody>
          {filtered.map(({ name, value }) => (
            <tr key={name}>
              <td width={80} className={s.RadiusPreviewCell}>
                <div
                  className={s.RadiusDisplay}
                  style={{ borderRadius: `var(--${name})` }}
                />
              </td>
              <td>
                <CopyButton
                  className={s.CopyButton}
                  color="secondary"
                  variant="soft"
                  size="2xs"
                  copyValue={`var(--${name})`}
                >
                  {name}
                </CopyButton>
              </td>
              <td>
                <ValueDisplay value={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function TypographyTokens({ filter }: { filter: string }) {
  const filtered = useMemo(
    () => FONTS.filter(({ name }) => matchesFilter(name, filter)),
    [filter]
  );

  if (!filtered.length) return null;

  return (
    <>
      <h2 id="fonts">Fonts</h2>
      <table className={`${s.Table} ${s.TokenTable}`}>
        <tbody>
          {filtered.map(({ name, value }) => (
            <tr key={name}>
              <td className={s.TokenNameCell}>
                <CopyButton
                  className={s.CopyButton}
                  color="secondary"
                  variant="soft"
                  size="2xs"
                  copyValue={`var(--${name})`}
                >
                  {name}
                </CopyButton>
              </td>
              <td>
                <ValueDisplay value={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function ShadowTokens({ filter }: { filter: string }) {
  const filtered = useMemo(
    () => SHADOWS.filter(({ name }) => matchesFilter(name, filter)),
    [filter]
  );

  if (!filtered.length) return null;

  return (
    <>
      <h2 id="shadows">Shadows</h2>
      <table className={`${s.Table} ${s.ShadowTable}`}>
        <tbody>
          {filtered.map(({ name }) => (
            <tr key={name}>
              <td className={s.ShadowPreviewCell}>
                <div className={s.ShadowDisplayWrapper}>
                  <div
                    className={s.ShadowDisplay}
                    style={{ boxShadow: `var(--${name})` }}
                  />
                </div>
              </td>
              <td className={s.ShadowTokenCell}>
                <CopyButton
                  className={s.CopyButton}
                  color="secondary"
                  variant="soft"
                  size="2xs"
                  copyValue={`var(--${name})`}
                >
                  {name}
                </CopyButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function BreakpointTokens({ filter }: { filter: string }) {
  const filtered = useMemo(
    () => BREAKPOINTS.filter(({ name }) => matchesFilter(name, filter)),
    [filter]
  );

  if (!filtered.length) return null;

  return (
    <>
      <h2 id="breakpoints">Breakpoints</h2>
      <table className={`${s.Table} ${s.TokenTable}`}>
        <tbody>
          {filtered.map(({ name, value }) => (
            <tr key={name}>
              <td className={s.TokenNameCell}>
                <CopyButton
                  className={s.CopyButton}
                  color="secondary"
                  variant="soft"
                  size="2xs"
                  copyValue={`var(--${name})`}
                >
                  {name}
                </CopyButton>
              </td>
              <td>
                <ValueDisplay value={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function MotionTokens({ filter }: { filter: string }) {
  const filtered = useMemo(
    () => MOTION.filter(({ name }) => matchesFilter(name, filter)),
    [filter]
  );

  if (!filtered.length) return null;

  return (
    <>
      <h2 id="motion">Motion</h2>
      <table className={`${s.Table} ${s.TokenTable}`}>
        <tbody>
          {filtered.map(({ name, value }) => (
            <tr key={name}>
              <td className={s.TokenNameCell}>
                <CopyButton
                  className={s.CopyButton}
                  color="secondary"
                  variant="soft"
                  size="2xs"
                  copyValue={`var(--${name})`}
                >
                  {name}
                </CopyButton>
              </td>
              <td>
                <ValueDisplay value={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function ColorDisplay({
  value,
}: {
  value: { light: string; dark: string };
}) {
  const { light, dark } = value;
  return (
    <div
      className={s.ColorDisplay}
      style={{ backgroundColor: `light-dark(${light}, ${dark})` }}
    />
  );
}

function ValueDisplay({
  value,
}: {
  value: string | { light: string; dark: string };
}) {
  if (typeof value === 'string') {
    const displayValue = value.replace(/var\(--(.*?)\)/g, '$1');
    const translatedValue = displayValue.endsWith('rem')
      ? `${parseFloat(displayValue) * 16}px`
      : '';

    return (
      <>
        <span className={s.ValueDisplay}>{displayValue}</span>
        {translatedValue && (
          <>
            <span className="text-tertiary mx-1">≈</span>
            <span className={s.ValueDisplay}>{translatedValue}</span>
          </>
        )}
      </>
    );
  }

  const { light, dark } = value;

  return (
    <span className={s.ValueDisplay}>
      <span data-light>{light.replace(/var\(--(.*?)\)/g, '$1')}</span>
      <span data-dark>{dark.replace(/var\(--(.*?)\)/g, '$1')}</span>
    </span>
  );
}
