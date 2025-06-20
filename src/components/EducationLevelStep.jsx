import React, { useState } from 'react';
import '../style.css';

const educationOptions = [
  { value: '10th', label: "10th Grade", icon: '🔟' },
  { value: '12th', label: "12th Grade", icon: '1️⃣2️⃣' },
  { value: 'non-final-bachelors', label: "Bachelor's (Not Final Year)", icon: '🎓' },
  { value: 'final-bachelors', label: "Bachelor's (Final Year)", icon: '🎓' },
  { value: 'completed-bachelors', label: "Completed Bachelor's", icon: '🎓' },
  { value: 'masters', label: "Master's", icon: '🎯' },
  { value: 'mbbs', label: "MBBS", icon: '🩺' }
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
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="question-card" style={{ maxWidth: 500, width: '100%' }}>
        <h2 className="question-title">What's your current education level?</h2>
        <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 30 }}>
          {educationOptions.map(opt => (
            <div
              key={opt.value}
              className={`option-card${selected === opt.value ? ' selected' : ''}`}
              data-value={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                cursor: 'pointer',
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}