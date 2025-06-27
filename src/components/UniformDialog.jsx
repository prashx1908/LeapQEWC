import React from 'react';

export default function UniformDialog({ open, onClose, children, minWidth = 360, maxWidth = 400, style = {} }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: '36px 24px 28px 24px', minWidth, maxWidth, width: '100%', textAlign: 'center', position: 'relative', ...style
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 8, right: 10, background: 'none', border: 'none', fontSize: 16, color: '#64748b', cursor: 'pointer', fontWeight: 700, zIndex: 2, padding: 0, lineHeight: 1, width: 24, height: 24
          }}
          aria-label="Close"
        >×</button>
        {children}
      </div>
    </div>
  );
} 