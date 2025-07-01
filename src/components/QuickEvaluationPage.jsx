import React from 'react';

export default function QuickEvaluationPage({ onContinue }) {
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div style={{ background: '#fff', borderRadius: 22, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: 540, width: '95%', padding: '36px 24px 32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>⚡</div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#b91c1c', marginBottom: 18 }}>Minimum Academic Profile Required</h2>
        <div style={{ color: '#374151', fontSize: 16, marginBottom: 18, textAlign: 'center' }}>
          Sorry, a minimum academic profile is required to proceed with a detailed evaluation.<br />
          <span style={{ color: '#b91c1c', fontWeight: 700 }}>You need at least 6 backlogs, 55% or above, and valid documents for any year gap.</span>
        </div>
        <div style={{ width: '100%', background: '#e0e7ff', borderRadius: 14, padding: 18, marginBottom: 18 }}>
          <b>Helpful Resources:</b>
          <ul style={{ margin: '10px 0 0 18px', padding: 0, color: '#1e293b', fontSize: 15 }}>
            <li><a href="https://leapfinance.com/resources" target="_blank" rel="noopener noreferrer">Study Abroad Guides</a></li>
            <li><a href="https://leapscholar.com/country-guides" target="_blank" rel="noopener noreferrer">Country Guides</a></li>
            <li><a href="https://leapscholar.com/blog" target="_blank" rel="noopener noreferrer">Leap Scholar Blog</a></li>
            <li><a href="https://leapscholar.com/counsellor" target="_blank" rel="noopener noreferrer">Book a Free Counselling Call</a></li>
          </ul>
        </div>
        <button
          onClick={onContinue}
          style={{
            background: '#443eff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 22px',
            fontWeight: 800,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(74,144,226,0.10)',
            transition: 'background 0.2s',
            marginTop: 18
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
} 