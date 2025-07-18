import React, { useState } from 'react';

const theme = {
  blue: '#443eff',
  green: '#27ae60',
  orange: '#FFA726',
  purple: '#a78bfa',
  red: '#b91c1c',
  border: '#e5e7eb',
  cardBg: '#fff',
  shadow: '0 2px 8px rgba(68,62,255,0.04)',
  progress: '#a78bfa',
  locked: '#64748b',
  lightPurple: '#f3f0ff',
};

const milestones = [
  {
    title: 'Profile Started',
    icon: <span style={{ fontSize: 22, color: theme.green }}>✔️</span>,
    border: `2px solid ${theme.green}`,
    badge: <span style={{ background: theme.green, color: '#fff', borderRadius: 8, padding: '2px 12px', fontWeight: 700, fontSize: 13 }}>Completed</span>,
    reward: <span style={{ color: theme.green, fontWeight: 700 }}>Welcome Guide sent to your WhatsApp</span>,
    desc: 'You have started your study abroad profile.',
    status: 'completed',
  },
  {
    title: 'Quick Evaluation',
    icon: <span style={{ fontSize: 22, color: theme.orange }}>⏳</span>,
    border: `2px solid ${theme.orange}`,
    badge: <span style={{ background: theme.orange, color: '#fff', borderRadius: 8, padding: '2px 12px', fontWeight: 700, fontSize: 13 }}>In Progress</span>,
    reward: <span style={{ color: theme.orange, fontWeight: 700 }}>Access to country guides</span>,
    desc: 'Quick academic check completed.',
    status: 'in-progress',
  },
  {
    title: 'Full Evaluation',
    icon: <span style={{ fontSize: 22, color: theme.blue }}>🔒</span>,
    border: `2px solid ${theme.blue}`,
    badge: <span style={{ background: theme.purple, color: '#fff', borderRadius: 8, padding: '2px 12px', fontWeight: 700, fontSize: 13 }}>Locked</span>,
    reward: <span style={{ color: theme.blue, fontWeight: 700 }}>Personalized university shortlist</span>,
    desc: 'Complete your profile for a detailed evaluation.',
    status: 'locked',
  },
];

const resources = [
  { label: 'Study Abroad Guides', url: 'https://leapfinance.com/resources' },
  { label: 'Country Guides', url: 'https://leapscholar.com/country-guides' },
  { label: 'Leap Scholar Blog', url: 'https://leapscholar.com/blog' },
  { label: 'Book a Free Counselling Call', url: 'https://leapscholar.com/counsellor' },
];

export default function QuickEvaluationPage({ onContinue }) {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div style={{ background: '#fff', borderRadius: 22, boxShadow: theme.shadow, maxWidth: 480, width: '95%', padding: '0 0 32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative' }}>
        {/* Heading and warning */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32, marginBottom: 0 }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🎉</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: theme.blue, margin: 0, letterSpacing: '-0.01em', textAlign: 'center' }}>Quick Evaluation Complete!</h2>
          <div style={{ color: '#222', fontSize: 15, margin: '10px 0 0 0', textAlign: 'center', fontWeight: 500, maxWidth: 420 }}>
            Sorry, a minimum academic profile is required to proceed with a detailed evaluation.
          </div>
          <div style={{ color: theme.red, fontWeight: 800, fontSize: 15, margin: '6px 0 0 0', textAlign: 'center', maxWidth: 420 }}>
            You need at least 6 backlogs, 55% or above, and<br />valid documents for any year gap.
          </div>
        </div>
        {/* Progress Bar */}
        <div style={{ width: '80%', margin: '22px auto 24px auto', height: 6, background: '#ede9fe', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
          <div style={{
            width: '60%',
            height: '100%',
            background: theme.progress,
            borderRadius: 8,
            transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>
        {/* Milestone Cards */}
        <div style={{ width: '90%', display: 'flex', flexDirection: 'column', gap: 18, margin: '0 auto 24px auto', alignItems: 'center' }}>
          {milestones.map((m, idx) => (
            <div
              key={m.title}
              style={{
                background: theme.cardBg,
                border: m.border,
                borderRadius: 14,
                boxShadow: '0 1px 4px #0001',
                padding: '18px 18px 14px 18px',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                width: '100%',
                margin: '0 auto',
                position: 'relative',
                color: '#222',
                fontWeight: 600,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#fff', fontSize: 20 }}>{m.icon}</div>
                <div style={{ flex: 1, fontWeight: 800, fontSize: 15, color: m.status === 'locked' ? theme.locked : m.status === 'in-progress' ? theme.orange : theme.green }}>{m.title}</div>
                {m.badge}
              </div>
              <div style={{ fontSize: 14, color: m.status === 'locked' ? theme.locked : '#222', margin: '6px 0 0 0', fontWeight: 500 }}>{m.desc}</div>
              <div style={{ fontSize: 14, marginTop: 6, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                {m.reward}
              </div>
              {/* Button for Full Evaluation */}
              {m.status === 'locked' && (
                <button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      onContinue && onContinue();
                    }, 800);
                  }}
                  style={{
                    background: theme.orange,
                    color: '#fff',
                    border: `2px solid ${theme.purple}`,
                    borderRadius: 8,
                    padding: '13px 0',
                    fontSize: 16,
                    fontWeight: 800,
                    cursor: loading ? 'wait' : 'pointer',
                    width: '100%',
                    marginTop: 14,
                    boxShadow: '0 2px 8px #443eff22',
                    transition: 'background 0.2s, box-shadow 0.2s',
                    outline: 'none',
                  }}
                  disabled={loading}
                  aria-busy={loading}
                  tabIndex={0}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      Loading...
                    </span>
                  ) : (
                    'Complete profile evaluation now'
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
        {/* Helpful Resources */}
        <div style={{ width: '90%', background: theme.lightPurple, borderRadius: 14, padding: 18, margin: '0 auto', boxShadow: '0 1px 4px #a78bfa22', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontWeight: 700, color: theme.blue, fontSize: 16, marginBottom: 6, letterSpacing: 0.2 }}>Helpful Resources:</div>
          <ul style={{ margin: 0, padding: 0, color: theme.locked, fontSize: 15, listStyle: 'disc inside', width: '100%' }}>
            {resources.map((r) => (
              <li key={r.label} style={{ margin: '6px 0' }}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: theme.blue, fontWeight: 600, textDecoration: 'underline' }}>{r.label}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Spinner keyframes (if not present) */}
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
} 