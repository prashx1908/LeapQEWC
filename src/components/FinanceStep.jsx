import React, { useState } from 'react';

const financeOptions = [
  {
    value: 'self-funded',
    icon: '💰',
    title: 'Self-Funded',
    subtitle: 'Using personal/family savings',
  },
  {
    value: 'loan',
    icon: '🏦',
    title: 'Education Loan',
    subtitle: 'Planning to take a student loan',
  },
  {
    value: 'scholarship',
    icon: '🎓',
    title: '100% Scholarship',
    subtitle: 'Applying for scholarships',
  },
  {
    value: 'combination',
    icon: '🔄',
    title: 'Combination of loan + savings',
    subtitle: '',
  },
];

export default function FinanceStep({ onSelect, initialValue }) {
  const [selected, setSelected] = useState(initialValue || null);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: '#fff',
        borderRadius: 28,
        boxShadow: '0 8px 32px rgba(99,102,241,0.13)',
        maxWidth: 480,
        width: '100%',
        padding: '48px 36px 36px 36px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 10, letterSpacing: 0.2 }}>
          How do you plan to finance your education?
        </h2>
        <div style={{ color: '#374151', fontSize: 17, marginBottom: 28, fontWeight: 500 }}>
          Select your preferred mode of financing
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%' }}>
          {financeOptions.map(opt => (
            <div
              key={opt.value}
              className={`option-card${selected === opt.value ? ' selected' : ''}`}
              style={{
                background: selected === opt.value ? '#eff6ff' : '#fff',
                border: selected === opt.value ? '2px solid #3b82f6' : '1.5px solid #e5e7eb',
                borderRadius: 14,
                padding: '20px 18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                boxShadow: selected === opt.value ? '0 2px 8px #6366f122' : 'none',
                transition: 'all 0.2s',
                fontWeight: 500,
                fontSize: 16,
                marginBottom: 0,
              }}
              onClick={() => {
                setSelected(opt.value);
                if (onSelect) onSelect(opt.value);
              }}
            >
              <span style={{ fontSize: 32, marginRight: 10 }}>{opt.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 17 }}>{opt.title}</div>
                {opt.subtitle && <div style={{ color: '#64748b', fontSize: 15 }}>{opt.subtitle}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 