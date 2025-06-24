import React, { useState } from 'react';
import '../style.css';

const educationOptions = [
  { value: '10th', label: 'Yet to finish 10th Grade', icon: '🔟' },
  { value: '12th', label: 'Completed 12th/Currently in 11th-12th', icon: '1️⃣2️⃣' },
 

  { value: 'completed-bachelors', label: 'Completed/Pursuing Bachelors', icon: '🎓' },
  { value: 'masters', label: 'Completed/Pursuing Masters', icon: '🎯' },
  { value: 'mbbs', label: 'Completed/Pursuing MBBS', icon: '🩺' },
  { value: 'other', label: 'Other degree not in list', icon: '❓' }
];

export default function EducationLevelStep({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  return (
    <div
      className="page active"
      id="page-1"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        padding: 0,
        margin: 0,
        background: 'none',
        minHeight: '90vh',
      }}
    >
      <div className="question-card" style={{ maxWidth: 600, width: '100%', borderRadius: 18, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '80px 32px 72px 32px', margin: '0 auto', background: '#fff', marginBottom: 0 }}>
     
        <h2 className="question-title" style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6, letterSpacing: '-0.01em', textAlign: 'center', padding: 0, marginTop: 0 }}>What's your current education level?</h2>
        <div className="options-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 24,
          marginTop: 18,
          marginBottom: 0,
          width: '100%',
        }}>
          {educationOptions.map(opt => (
            <div
              key={opt.value}
              className={`option-card${selected === opt.value ? ' selected' : ''}`}
              data-value={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                cursor: 'pointer',
                width: '100%',
                minHeight: 140,
                background: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 500,
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: selected === opt.value ? '0 2px 16px rgba(59,130,246,0.12)' : 'none',
                borderColor: selected === opt.value ? '#6366f1' : '#e5e7eb',
                textAlign: 'center',
                margin: 0,
                padding: '14px 8px',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              <span className="option-icon" style={{ fontSize: 32, marginBottom: 8 }}>{opt.icon}</span>
              <div className="option-text" style={{ fontSize: 15, lineHeight: 1.25 }}>{opt.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}