import React, { useState } from 'react';

const budgetOptions = [
  {
    value: '35L',
    icon: '👑',
    title: 'Can invest a min of 35 lakhs',
    description: 'Access top tier universities in USA and other amazing universities in other countries',
  },
  {
    value: '15L',
    icon: '✅',
    title: 'Can invest a min of 15 lakhs',
    description: 'Access top universities in countries like UK, Canada, Australia',
  },
  {
    value: 'not-sure',
    icon: '💬',
    title: 'Not sure about the finance',
    description: 'Need a counsellor to talk to to make a decision',
  },
  {
    value: 'cannot15',
    icon: 'ℹ️',
    title: ",Can't invest a min of 15 lakhs",
    description: '',
  },
];

const BudgetStep = ({ onBudgetSelected }) => {
  const [selected, setSelected] = useState(null);

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
              style={{
                background: selected === opt.value ? '#6366f1' : '#f3f4f6',
                color: selected === opt.value ? '#fff' : '#1e293b',
                borderRadius: 16,
                padding: '22px 24px',
                boxShadow: selected === opt.value ? '0 2px 8px #6366f133' : '0 2px 8px #64748b11',
                border: selected === opt.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 18,
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 0,
                transition: 'all 0.2s',
                position: 'relative',
              }}
              onClick={() => {
                setSelected(opt.value);
                if (onBudgetSelected) onBudgetSelected(opt.value);
              }}
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (() => { setSelected(opt.value); if (onBudgetSelected) onBudgetSelected(opt.value); })()}
            >
              <span style={{ fontSize: 32, marginRight: 12 }}>{opt.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{opt.title}</div>
                {opt.description && <div style={{ fontWeight: 500, fontSize: 15, color: selected === opt.value ? '#e0e7ff' : '#475569', marginTop: 4 }}>{opt.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetStep; 