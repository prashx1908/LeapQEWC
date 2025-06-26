import React, { useState } from 'react';

const intakeOptions = [
  {
    value: 'fall-2025',
    icon: '🍂',
    title: 'Fall 2025 (Aug/Sep)',
    subtitle: 'Perfect timing if you\'re graduating before August 2025',
  },
  {
    value: 'spring-2026',
    icon: '🌸',
    title: 'Spring 2026 (Jan/Feb)',
    subtitle: "Great option if you\'ll complete your degree by December 2025",
  },
  {
    value: 'fall-2026',
    icon: '🍂',
    title: 'Fall 2026 (Aug/Sep)',
    subtitle: "Ideal if you\'re graduating between May and August 2026",
  },
  {
    value: '2027-later',
    icon: '🟦',
    title: '2027 or later',
    subtitle: "Best fit if you're graduating in 2027 or after",
  },
];

function getRecommendedIntake(graduationYear, graduationMonth) {
  if (!graduationYear) return null;
  if (graduationYear === '2027-later') return '2027-later';
  const year = Number(graduationYear);
  let month = Number(graduationMonth);
  const currentYear = new Date().getFullYear();
  // If month is not set and year is in the past, default to June
  if (!month) {
    if (year < currentYear) month = 6;
    else return null;
  }
  // Fall 2025: Grad before Sep 2025
  if (year < 2025 || (year === 2025 && month <= 8)) return 'fall-2025';
  // Spring 2026: Grad between Sep-Dec 2025
  if (year === 2025 && month >= 9 && month <= 12) return 'spring-2026';
  // Fall 2026: Grad between Jan-Aug 2026
  if (year === 2026 && month <= 8) return 'fall-2026';
  // 2027 or later
  if (year > 2026) return '2027-later';
  // Fallback (shouldn't happen)
  return null;
}

function IntakeSelectionStep({ visible, onSelect, country, graduationYear, graduationMonth }) {
  const [selected, setSelected] = useState(null);
  if (!visible) return null;

  // Determine eligibility for each intake
  const year = Number(graduationYear);
  let month = Number(graduationMonth);
  const currentYear = new Date().getFullYear();
  const is2027Later = graduationYear === '2027-later';

  // Mark disabled options
  const optionsWithEligibility = intakeOptions.map(opt => {
    if (is2027Later) {
      if (opt.value === '2027-later') {
        return { ...opt, recommended: true, disabled: false };
      }
      return { ...opt, disabled: true, disabledReason: 'Not eligible due to graduation timeline' };
    }
    if (opt.value === 'fall-2025' && !(year < 2025 || (year === 2025 && (!month || month < 9)))) {
      return { ...opt, disabled: true, disabledReason: 'Not eligible due to graduation timeline' };
    }
    if (opt.value === 'spring-2026' && !((year < 2025) || (year === 2025 && month < 12))) {
      return { ...opt, disabled: true, disabledReason: 'Not eligible due to graduation timeline' };
    }
    return { ...opt, disabled: false };
  });

  // Stack: recommended first, then eligible, then disabled
  const sortedOptions = [
    ...optionsWithEligibility.filter(opt => opt.recommended),
    ...optionsWithEligibility.filter(opt => !opt.recommended && !opt.disabled),
    ...optionsWithEligibility.filter(opt => opt.disabled),
  ];

  // Determine recommended value for badge logic
  let recommendedValue = getRecommendedIntake(graduationYear, graduationMonth);
  if (is2027Later) recommendedValue = '2027-later';

  return (
    <div style={{ maxWidth: 500, width: '100%', margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="question-title" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>When do you plan to start?</h2>
      <div className="question-subtitle" style={{ fontSize: 16, color: '#374151', marginBottom: 18, textAlign: 'center' }}>Choose your preferred intake</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18, width: '90%', maxWidth: 400 }}>
        {sortedOptions.map(opt => (
          <div
            key={opt.value}
            style={{
              position: 'relative',
              background: opt.disabled ? '#f3f4f6' : '#fff',
              border: selected === opt.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
              borderRadius: 16,
              boxShadow: selected === opt.value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              cursor: opt.disabled ? 'not-allowed' : 'pointer',
              minHeight: 80,
              opacity: opt.disabled ? 0.5 : 1,
              transition: 'border-color 0.2s, box-shadow 0.2s',
              pointerEvents: opt.disabled ? 'none' : 'auto',
            }}
            onClick={() => {
              if (!opt.disabled) {
                setSelected(opt.value);
                if (onSelect) onSelect(opt.value);
              }
            }}
            tabIndex={opt.disabled ? -1 : 0}
            onKeyDown={e => !opt.disabled && (e.key === 'Enter' || e.key === ' ') && onSelect(opt.value)}
            onMouseOver={e => !opt.disabled && (e.currentTarget.style.borderColor = '#6366f1')}
            onMouseOut={e => !opt.disabled && (e.currentTarget.style.borderColor = selected === opt.value ? '#6366f1' : '#e5e7eb')}
          >
            {/* Recommended badge at top-right */}
            {opt.value === recommendedValue && (
              <div style={{
                position: 'absolute',
                top: 12,
                right: 18,
                background: '#e0f2fe',
                color: '#0891b2',
                fontSize: 12,
                fontWeight: 700,
                borderRadius: 12,
                padding: '2px 10px',
                zIndex: 2,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                letterSpacing: 0.2,
              }}>Recommended</div>
            )}
            <span style={{ fontSize: 28, marginRight: 10 }}>{opt.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#1e293b', marginBottom: 2 }}>{opt.title}</div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.3 }}>{opt.subtitle}</div>
              {/* Reason for recommended intake */}
              {opt.value === recommendedValue && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#0891b2', fontWeight: 500 }}>
                  Matches your graduation timeline
                </div>
              )}
              {opt.disabled && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#b91c1c', fontWeight: 500 }}>
                  {opt.disabledReason}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntakeSelectionStep; 