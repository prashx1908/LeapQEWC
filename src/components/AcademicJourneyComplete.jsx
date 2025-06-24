import React from 'react';

const stats = [
  {
    icon: '🎓',
    value: '18Cr+',
    label: 'Scholarships Awarded',
  },
  {
    icon: '📈',
    value: '20-30%',
    label: 'Average Scholarship',
  },
  {
    icon: '💰',
    value: '',
    label: 'Lowest Interest Loans',
    desc: 'Flexible repayment options',
  },
];

const AcademicJourneyComplete = ({ onContinue }) => (
  <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
    <div style={{
      background: '#fff',
      borderRadius: 24,
      boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
      maxWidth: 420,
      width: '100%',
      padding: '40px 32px 32px 32px',
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Logo */}
      <img src="https://leapassets.s3.ap-south-1.amazonaws.com/ielts-recording/1619511191304-logo@2x_(1)_(1).png" alt="Leap Scholar" style={{ width: 120, marginBottom: 18 }} />
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Your Path to Affordable Education</h2>
      <div style={{ color: '#374151', fontSize: 16, marginBottom: 28 }}>
        We've helped thousands of students achieve their study abroad dreams
      </div>
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: '#f8fafc',
            borderRadius: 16,
            padding: '18px 16px',
            minWidth: 110,
            flex: '1 1 110px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(99,102,241,0.06)',
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{stat.icon}</div>
            {stat.value && <div style={{ fontWeight: 700, color: '#3730a3', fontSize: 20 }}>{stat.value}</div>}
            <div style={{ color: '#1e293b', fontWeight: 500, fontSize: 15, marginBottom: stat.desc ? 2 : 0 }}>{stat.label}</div>
            {stat.desc && <div style={{ color: '#64748b', fontSize: 13 }}>{stat.desc}</div>}
          </div>
        ))}
      </div>
      <div style={{ background: '#e0f2fe', color: '#0c4a6e', borderRadius: 10, padding: '16px 14px', fontSize: 15, marginBottom: 32, textAlign: 'left' }}>
        <div style={{ marginBottom: 6 }}>
          Keeping all these financial support options aside, let's understand your minimum tuition budget investment.
        </div>
        <div>
          This will help us suggest the best universities and financial planning options for you.
        </div>
      </div>
      <button
        onClick={onContinue}
        style={{
          background: '#443eff',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '15px 0',
          fontSize: 17,
          fontWeight: 700,
          cursor: 'pointer',
          width: '100%',
          boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
          transition: 'background 0.2s',
          letterSpacing: 1,
        }}
      >
        CONTINUE TO BUDGET SELECTION
      </button>
    </div>
  </div>
);

export default AcademicJourneyComplete; 