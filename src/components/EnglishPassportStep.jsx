import React, { useRef, useEffect } from 'react';

const englishOptions = [
  { value: 'taken', icon: '✅', label: 'Taken' },
  { value: 'booked', icon: '📅', label: 'Booked' },
  { value: 'yet-to-take', icon: '🕒', label: 'Yet to take' },
  { value: 'not-sure', icon: '🤔', label: 'Not sure of taking' },
];

const passportOptions = [
  { value: 'bearer', icon: '🛂', label: 'Bearer' },
  { value: 'applied', icon: '✅', label: 'Applied' },
  { value: 'yet-to-apply', icon: '📄', label: 'Yet to apply' },
  { value: 'non-bearer', icon: '❌', label: 'Non-Bearer' },
];

function EnglishPassportStep({ visible, english, passport, onEnglishSelect, onPassportSelect }) {
  const passportFoldRef = useRef(null);

  // Scroll to passport fold when english is selected
  useEffect(() => {
    if (english && passportFoldRef.current) {
      passportFoldRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [english]);

  if (!visible) return null;
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 className="question-title" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>English Proficiency & Passport</h2>
      {/* English Test Fold in its own card */}
      <div style={{
        width: '100%',
        maxWidth: 440,
        margin: '0 auto',
        marginBottom: 32,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        padding: '28px 24px 22px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'center' }}>Have you taken any English proficiency test?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 180px)', gap: 18, justifyContent: 'center', margin: '0 auto' }}>
          {englishOptions.map(opt => (
            <div
              key={opt.value}
              style={{
                width: 180,
                height: 100,
                background: '#fff',
                border: english === opt.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
                borderRadius: 16,
                boxShadow: english === opt.value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                fontWeight: 600,
                fontSize: 16,
                userSelect: 'none',
              }}
              onClick={() => onEnglishSelect(opt.value)}
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onEnglishSelect(opt.value)}
              onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
              onMouseOut={e => e.currentTarget.style.borderColor = english === opt.value ? '#6366f1' : '#e5e7eb'}
            >
              <span style={{ fontSize: 32, marginBottom: 6 }}>{opt.icon}</span>
              <div style={{ color: '#1e293b', fontWeight: 600 }}>{opt.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Passport Fold in its own card (appears after English is selected) */}
      {english && (
        <div
          ref={passportFoldRef}
          style={{
            width: '100%',
            maxWidth: 440,
            margin: '0 auto',
            marginBottom: 0,
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            padding: '28px 24px 22px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'center' }}>Do you hold a valid passport?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 180px)', gap: 18, justifyContent: 'center', margin: '0 auto' }}>
            {passportOptions.map(opt => (
              <div
                key={opt.value}
                style={{
                  width: 180,
                  height: 100,
                  background: '#fff',
                  border: passport === opt.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
                  borderRadius: 16,
                  boxShadow: passport === opt.value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontWeight: 600,
                  fontSize: 16,
                  userSelect: 'none',
                }}
                onClick={() => onPassportSelect(opt.value)}
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onPassportSelect(opt.value)}
                onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
                onMouseOut={e => e.currentTarget.style.borderColor = passport === opt.value ? '#6366f1' : '#e5e7eb'}
              >
                <span style={{ fontSize: 32, marginBottom: 6 }}>{opt.icon}</span>
                <div style={{ color: '#1e293b', fontWeight: 600 }}>{opt.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EnglishPassportStep; 