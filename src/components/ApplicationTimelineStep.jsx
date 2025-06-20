import React, { useState } from 'react';

const timelineOptions = [
  { value: 'immediately', icon: '⚡', title: 'Immediately', subtitle: 'Start application process now' },
  { value: '3-months', icon: '📅', title: 'Within 3 months', subtitle: 'Plan to apply soon' },
  { value: 'not-sure', icon: '🤔', title: 'Not Sure Yet', subtitle: 'Still deciding on timeline' },
];

export default function ApplicationTimelineStep({ onSelect, initialValue }) {
  const [selected, setSelected] = useState(initialValue || null);

  return (
    <div style={{ maxWidth: 520, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '40px 32px 32px 32px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span role="img" aria-label="hourglass">⏳</span> Application Timeline
      </h2>
      <div style={{ color: '#374151', fontSize: 16, marginBottom: 18 }}>When do you want to apply for your studies?</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 22,
          width: '100%',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 18,
        }}
      >
        {timelineOptions.map(opt => (
          <div
            key={opt.value}
            onClick={() => { setSelected(opt.value); onSelect && onSelect(opt.value); }}
            style={{
              background: selected === opt.value ? '#eef2ff' : '#fff',
              border: selected === opt.value ? '2px solid #6366f1' : '1.5px solid #e5e7eb',
              borderRadius: 12,
              padding: '22px 18px',
              cursor: 'pointer',
              minWidth: 140,
              maxWidth: 180,
              minHeight: 120,
              flex: '1 1 140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: selected === opt.value ? '0 2px 8px #6366f122' : 'none',
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 0,
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 28, marginBottom: 8 }}>{opt.icon}</span>
            <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 16 }}>{opt.title}</div>
            <div style={{ color: '#64748b', fontSize: 14 }}>{opt.subtitle}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 700px) {
          .timeline-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
} 