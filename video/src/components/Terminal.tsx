import React from 'react';
import { theme } from '../theme';

export const Terminal: React.FC<{
  title?: string;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}> = ({ title = 'plexui', width = '100%', height = 'auto', children }) => {
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
          position: 'relative',
          height: 36,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 14,
          paddingRight: 14,
          backgroundColor: theme.surface,
          borderBottom: `1px solid ${theme.border}`,
          gap: 8,
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: 6, background: '#ff5f57' }} />
        <span style={{ width: 12, height: 12, borderRadius: 6, background: '#febc2e' }} />
        <span style={{ width: 12, height: 12, borderRadius: 6, background: '#28c840' }} />
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            pointerEvents: 'none',
            color: theme.fgMuted,
            fontFamily: theme.mono,
            fontSize: 13,
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          padding: '20px 24px',
          fontFamily: theme.mono,
          fontSize: 18,
          lineHeight: 1.6,
          color: theme.fg,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};
