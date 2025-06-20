import React, { useState, useEffect, forwardRef } from 'react';
import '../style.css';

const ProgramSelectionStep = forwardRef(({ visible, onSelect, initialValue, options = [], question = 'What do you want to study?', asPanel = false }, ref) => {
  const [selected, setSelected] = useState(initialValue || null);

  useEffect(() => {
    if (visible && ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [visible, ref]);

  // Update selected if initialValue changes (e.g., when navigating back)
  useEffect(() => {
    setSelected(initialValue || null);
  }, [initialValue]);

  const handleSelect = (value, disabled) => {
    if (disabled) return;
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  if (!visible) return null;

  // Panel mode: just the fold, no card wrapper
  if (asPanel) {
    return (
      <div
        ref={ref}
        className={`fold${visible ? ' active' : ''}`}
        style={{
          display: visible ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 0,
          transition: 'opacity 0.3s',
          opacity: visible ? 1 : 0,
          minHeight: '180px',
          position: 'relative',
          zIndex: 10,
          background: 'transparent',
          boxShadow: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        <div className="options-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 180px)',
          gap: 16,
          marginTop: 0,
          justifyContent: 'center',
          width: '100%',
        }}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={`option-card${selected === opt.value ? ' selected' : ''}${opt.disabled ? ' disabled' : ''}`}
              data-value={opt.value}
              onClick={() => handleSelect(opt.value, opt.disabled)}
              style={{
                cursor: opt.disabled ? 'not-allowed' : 'pointer',
                opacity: opt.disabled ? 0.5 : 1,
                position: 'relative',
                width: 180,
                height: 120,
                background: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 500,
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: selected === opt.value ? '0 2px 8px rgba(59,130,246,0.08)' : 'none',
                borderColor: selected === opt.value ? '#6366f1' : '#e5e7eb',
                textAlign: 'center',
                margin: 0,
                padding: 0,
              }}
            >
              <span className="option-icon" style={{ fontSize: 32 }}>{opt.icon}</span>
              <div className="option-text">{opt.label}</div>
              {opt.recommended && !opt.disabled && (
                <span style={{ position: 'absolute', top: 8, right: 12, background: '#e0e7ff', color: '#3730a3', fontSize: 11, borderRadius: 8, padding: '2px 8px', fontWeight: 600 }}>Recommended</span>
              )}
              {opt.disabled && (
                <span style={{ position: 'absolute', top: 8, right: 12, background: '#fee2e2', color: '#b91c1c', fontSize: 11, borderRadius: 8, padding: '2px 8px', fontWeight: 600 }}>Not Available</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: card mode
  return (
    <div
      ref={ref}
      className={`fold${visible ? ' active' : ''}`}
      style={{
        display: visible ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 0,
        transition: 'opacity 0.3s',
        opacity: visible ? 1 : 0,
        minHeight: '180px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="question-card" style={{
        maxWidth: 500,
        width: '100%',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        padding: '24px 0',
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 className="question-title" style={{ fontSize: 22, marginBottom: 16, textAlign: 'center' }}>{question}</h2>
        <div className="options-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          marginTop: 10,
          justifyItems: 'center',
          width: '100%',
        }}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={`option-card${selected === opt.value ? ' selected' : ''}${opt.disabled ? ' disabled' : ''}`}
              data-value={opt.value}
              onClick={() => handleSelect(opt.value, opt.disabled)}
              style={{
                cursor: opt.disabled ? 'not-allowed' : 'pointer',
                opacity: opt.disabled ? 0.5 : 1,
                position: 'relative',
                width: 180,
                height: 120,
                background: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 500,
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: selected === opt.value ? '0 2px 8px rgba(59,130,246,0.08)' : 'none',
                borderColor: selected === opt.value ? '#6366f1' : '#e5e7eb',
                textAlign: 'center',
                margin: 0,
                padding: 0,
              }}
            >
              <span className="option-icon" style={{ fontSize: 32 }}>{opt.icon}</span>
              <div className="option-text">{opt.label}</div>
              {opt.recommended && !opt.disabled && (
                <span style={{ position: 'absolute', top: 8, right: 12, background: '#e0e7ff', color: '#3730a3', fontSize: 11, borderRadius: 8, padding: '2px 8px', fontWeight: 600 }}>Recommended</span>
              )}
              {opt.disabled && (
                <span style={{ position: 'absolute', top: 8, right: 12, background: '#fee2e2', color: '#b91c1c', fontSize: 11, borderRadius: 8, padding: '2px 8px', fontWeight: 600 }}>Not Available</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ProgramSelectionStep;