import React, { useState } from 'react';

const budgetOptions = [
  {
    value: '35L',
    icon: '👑',
    label: 'Can invest a min of 35 lakhs',
    description: 'Access top tier universities in USA and other amazing universities in other countries',
  },
  {
    value: '15L',
    icon: '✅',
    label: 'Can invest a min of 15 lakhs',
    description: 'Access top universities in countries like UK, Canada, Australia',
  },
  {
    value: 'not-sure',
    icon: '💬',
    label: 'Not sure about the finance',
    description: 'Need a counsellor to talk to to make a decision',
  },
  {
    value: 'cannot15',
    icon: 'ℹ️',
    label: "Can't invest a min of 15 lakhs",
    description: 'We recommend considering financial decision help from our counsellor.',
    badge: 'Not recommended',
  },
];

const BudgetStep = ({ onBudgetSelected, country }) => {
  const [selected, setSelected] = useState(null);
  const [showCannot15Popup, setShowCannot15Popup] = useState(false);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 8px 32px rgba(99,102,241,0.13)', maxWidth: 700, width: '100%', padding: '48px 36px 36px 36px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', marginBottom: 10, letterSpacing: 0.2 }}>What is your planned investment range for tuition fees <span style={{ fontWeight: 600, color: '#6366f1' }}>(excluding living expenses)</span></h2>
        <div style={{ background: '#e0f2fe', color: '#0c4a6e', borderRadius: 12, padding: '14px 18px', fontSize: 16, margin: '22px 0 32px 0', textAlign: 'left', fontWeight: 500, boxShadow: '0 2px 8px #38bdf833' }}>
          <b>💡 Why we ask this:</b> To help you understand realistic budgets and make the best choice for your study abroad journey.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%' }}>
          {budgetOptions.map(opt => (
            <div
              key={opt.value}
              className={`option-card${selected === opt.value ? ' selected' : ''}${opt.value === 'cannot15' ? ' not-recommended' : ''}`}
              onClick={() => {
                if (opt.value === 'cannot15') {
                  setShowCannot15Popup(true);
                } else {
                  setSelected(opt.value);
                  if (onBudgetSelected) onBudgetSelected(opt.value);
                }
              }}
              style={{ position: 'relative' }}
            >
              <span className="option-icon">{opt.icon}</span>
              <span className="option-text">{opt.label}</span>
              {opt.badge && (
                <span style={{ position: 'absolute', top: 8, right: 8, background: '#fde68a', color: '#b45309', fontWeight: 700, fontSize: 11, borderRadius: 8, padding: '2px 8px' }}>{opt.badge}</span>
              )}
              <span className="option-desc">{opt.description}</span>
            </div>
          ))}
        </div>
      </div>
      {showCannot15Popup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 320, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309', marginBottom: 16 }}>Consider your decision carefully</div>
            <div style={{ color: '#a16207', fontSize: 15, marginBottom: 18 }}>
              With a budget of {country === 'usa' ? '35 lakhs' : '15 lakhs'} or less, there are very low chances of getting an admit anywhere in the globe.<br />
              Please consider your decision carefully.
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
              <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
                onClick={() => { setShowCannot15Popup(false); setSelected(country === 'usa' ? '35L' : '15L'); if (onBudgetSelected) onBudgetSelected(country === 'usa' ? '35L' : '15L'); }}>
                Extend budget to {country === 'usa' ? '35 lakhs' : '15 lakhs'}
              </button>
              <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
                onClick={() => { setShowCannot15Popup(false); setSelected('not-sure'); if (onBudgetSelected) onBudgetSelected('not-sure'); }}>
                Not sure, get financial help
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetStep; 