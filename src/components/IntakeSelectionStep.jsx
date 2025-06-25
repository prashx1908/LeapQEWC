import React, { useState } from 'react';

const intakeOptions = [
  {
    value: 'fall-2025',
    icon: '🍂',
    title: 'Fall 2025 (Aug/Sep)',
    subtitle: 
      	'Perfect timing if you\'re graduating before August 2025',
    badge: 'Recommended',
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
    value: 'not-sure',
    icon: '🤔',
    title: 'Still Deciding',
    subtitle: 'Let us help you find the perfect intake based on your timeline',
  },
];

function IntakeSelectionStep({ visible, onSelect, country, graduationYear, graduationMonth }) {
  const [selected, setSelected] = useState(null);
  if (!visible) return null;

  // Determine recommended intake based on graduationYear and graduationMonth
  let recommendedValue = null;
  if (graduationYear) {
    const gradYear = Number(graduationYear);
    let gradMonth = graduationMonth;
    if (typeof gradMonth === 'string' && gradMonth.length === 2) {
      gradMonth = Number(gradMonth);
    } else if (typeof gradMonth === 'string') {
      // fallback: try to parse month name
      const monthMap = {
        january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
      };
      gradMonth = monthMap[gradMonth.toLowerCase()] || 1;
    }
    if (gradYear < 2025 || (gradYear === 2025 && gradMonth < 8)) {
      recommendedValue = 'fall-2025';
    } else if (gradYear === 2025 && gradMonth >= 8 && gradMonth <= 12) {
      recommendedValue = 'spring-2026';
    } else if (gradYear === 2026 && gradMonth >= 5 && gradMonth <= 8) {
      recommendedValue = 'fall-2026';
    } else {
      recommendedValue = null;
    }
  }

  const intakeOptionsWithBadge = intakeOptions.map(opt => ({
    ...opt,
    badge: (opt.value === recommendedValue) ? 'Recommended' : undefined
  }));

  return (
    <div style={{ maxWidth: 500, width: '100%', margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="question-title" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>When do you plan to start?</h2>
      <div className="question-subtitle" style={{ fontSize: 16, color: '#374151', marginBottom: 18, textAlign: 'center' }}>Choose your preferred intake</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18, width: '90%', maxWidth: 400 }}>
        {intakeOptionsWithBadge.map(opt => (
          <div
            key={opt.value}
            style={{
              position: 'relative',
              background: '#fff',
              border: selected === opt.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
              borderRadius: 16,
              boxShadow: selected === opt.value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              cursor: 'pointer',
              minHeight: 80,
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onClick={() => {
              setSelected(opt.value);
              if (onSelect) onSelect(opt.value);
            }}
            tabIndex={0}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(opt.value)}
            onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
            onMouseOut={e => e.currentTarget.style.borderColor = selected === opt.value ? '#6366f1' : '#e5e7eb'}
          >
            {/* Recommended badge at top-right */}
            {opt.badge && (
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
              {opt.badge && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#0891b2', fontWeight: 500 }}>
                  Matches your graduation timeline
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