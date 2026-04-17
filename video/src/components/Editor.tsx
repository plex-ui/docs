import React from 'react';
import { theme } from '../theme';

export const Editor: React.FC<{
  filename?: string;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}> = ({ filename = 'app/page.tsx', width = '100%', height = 'auto', children }) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: theme.bgSoft,
        borderRadius: 12,
        border: `1px solid ${theme.border}`,
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          backgroundColor: theme.surface,
          borderBottom: `1px solid ${theme.border}`,
          paddingLeft: 8,
          paddingTop: 0,
        }}
      >
        <div
          style={{
            padding: '8px 18px',
            backgroundColor: theme.bgSoft,
            color: theme.fg,
            fontFamily: theme.mono,
            fontSize: 13,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderTop: `1px solid ${theme.border}`,
            borderLeft: `1px solid ${theme.border}`,
            borderRight: `1px solid ${theme.border}`,
            position: 'relative',
            top: 1,
          }}
        >
          {filename}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: '20px 24px 24px 24px',
          fontFamily: theme.mono,
          fontSize: 17,
          lineHeight: 1.65,
          color: theme.fg,
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

/* Token colors for syntax-coloured code (rough VS Code dark+ palette) */
export const t = {
  keyword: '#c084fc',
  string: '#a5e3a5',
  fn: '#7dd3fc',
  comp: '#fbbf24',
  prop: '#7dd3fc',
  punct: '#94a3b8',
  comment: '#5a5a75',
  text: '#e2e8f0',
  num: '#fb923c',
};

export const Line: React.FC<{ indent?: number; children: React.ReactNode }> = ({
  indent = 0,
  children,
}) => (
  <div style={{ paddingLeft: indent * 16, color: t.text }}>{children || '\u00A0'}</div>
);
