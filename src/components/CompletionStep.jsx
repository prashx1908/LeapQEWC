import React, { useState, useEffect } from 'react';

function maskPhone(phone) {
  if (!phone || phone.length < 4) return '';
  return '+91-XXXXXX' + phone.slice(-4);
}

const CompletionStep = ({
  education,
  program,
  country,
  intake,
  city,
  phone,
  english,
  passport,
  onDownloadReport,
  onViewReport,
  buttonLoading = {},
  saving = false,
  onContinue,
}) => {
  // Map values to display labels
  const educationMap = {
    '10th': '10th Grade',
    '12th': '12th Grade',
    'non-final-bachelors': "+3 (Not Final Year)",
    'final-bachelors': "+3 (Final Year)",
    'completed-bachelors': "+3 Completed",
    'masters': 'Master\'s',
    'mbbs': 'MBBS',
  };
  // Add country flag and program icon maps
  const countryMap = {
    usa: { name: 'USA', flag: '🇺🇸' },
    uk: { name: 'UK', flag: '🇬🇧' },
    canada: { name: 'Canada', flag: '🇨🇦' },
    australia: { name: 'Australia', flag: '🇦🇺' },
    germany: { name: 'Germany', flag: '🇩🇪' },
    ireland: { name: 'Ireland', flag: '🇮🇪' },
    'new-zealand': { name: 'New Zealand', flag: '🇳🇿' },
    france: { name: 'France', flag: '🇫🇷' },
    netherlands: { name: 'Netherlands', flag: '🇳🇱' },
    singapore: { name: 'Singapore', flag: '🇸🇬' },
    sweden: { name: 'Sweden', flag: '🇸🇪' },
    denmark: { name: 'Denmark', flag: '🇩🇰' },
    italy: { name: 'Italy', flag: '🇮🇹' },
    spain: { name: 'Spain', flag: '🇪🇸' },
    any: { name: 'Any', flag: '🌎' },
    'not-sure': { name: 'Not Sure', flag: '🤔' },
  };
  const programIconMap = {
    bachelors: '🎓',
    masters: '🎯',
    mba: '💼',
    phd: '🔬',
    diploma: '📜',
    specialization: '⚕️',
    'medical specialization': '⚕️',
    'another bachelors': '🎓',
    'another masters': '🎯',
    'pg diploma': '📜',
    'master\'s in medicine': '🎯',
    'healthcare mba': '💼',
  };
  const [milestone2Open, setMilestone2Open] = useState(false);

  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 10, animation: 'bounce 1.2s' }}>🎉</div>
      <h2 className="completion-title" style={{ fontSize: 24, fontWeight: 900, color: '#443eff', marginBottom: 18, letterSpacing: '-0.01em' }}>Quick Evaluation Complete!</h2>
      {/* Timeline Milestones */}
      <div style={{
        width: '100%',
        background: 'rgba(245,247,250,0.98)',
        borderRadius: 28,
        padding: '32px 32px 24px 32px',
        margin: '0 0 24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 1px 8px rgba(74,144,226,0.10)',
        gap: 0,
      }}>
        {/* Milestone 1: Onboarding - Completed */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 18,
          background: '#e6f9ed',
          borderRadius: 16,
          padding: '16px 10px',
          boxShadow: '0 1px 4px rgba(39,174,96,0.07)',
          cursor: 'pointer',
          border: '2.5px solid #4ade80',
          position: 'relative',
          transition: 'box-shadow 0.2s',
        }} onClick={onContinue}>
          <span style={{ fontSize: 28, color: '#22c55e', marginLeft: 2 }}>🔓</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#22c55e' }}>Milestone 1: Onboarding <span style={{ fontWeight: 700, fontSize: 14, color: '#16a34a' }}>- Completed</span></div>
            <div style={{ fontSize: 15, color: '#15803d', marginTop: 2, fontWeight: 600 }}>Rewards unlocked: <span style={{ color: '#059669' }}>Complete Country guide sent on your WhatsApp</span></div>
          </div>
          <span style={{ fontSize: 22, color: '#22c55e', marginLeft: 8 }}>→</span>
        </div>
        {/* Milestone 2: Profile Evaluation (Show reward directly, no dropdown) */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 18,
          background: '#e0f2fe',
          borderRadius: 16,
          boxShadow: '0 1px 4px rgba(59,130,246,0.10)',
          border: '2.5px solid #38bdf8',
          position: 'relative',
          transition: 'box-shadow 0.2s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 10px' }}>
            <span style={{ fontSize: 28, color: '#0ea5e9', marginLeft: 2 }}>🟦</span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#0ea5e9' }}>Milestone 2: Profile Evaluation <span style={{ fontWeight: 700, fontSize: 14, color: '#0369a1' }}>(&lt;5 mins)</span></div>
            </div>
          </div>
          {/* Always show reward directly */}
          <div style={{ padding: '0 18px 12px 54px', textAlign: 'left' }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 18, color: '#443eff', marginRight: 8 }}>🎯</span>
                <span style={{ fontSize: 15, color: '#0369a1', fontWeight: 600 }}>Get your detailed profile evaluation completed.</span>
              </li>
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 18px 16px 0' }}>
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
                marginLeft: 8
              }}
            >
              Complete profile evaluation now
            </button>
          </div>
        </div>
        {/* Milestone 3: Get university shortlist */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 10,
          background: '#f3f4f6',
          borderRadius: 16,
          padding: '16px 10px',
          boxShadow: '0 1px 4px rgba(74,144,226,0.04)',
          border: '2px solid #e5e7eb',
          opacity: 0.7,
          position: 'relative',
        }}>
          <span style={{ fontSize: 28, color: '#a3a3a3', marginLeft: 2 }}>🔒</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#64748b' }}>Milestone 3: Get university shortlist</div>
          </div>
          <button style={{ background: '#443eff', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 16px', fontWeight: 700, fontSize: 14, cursor: 'not-allowed', opacity: 0.7 }}>Locked</button>
        </div>
        {/* Placeholder for more milestones */}
        {[4,5,6,7].map(i => (
          <div key={i} style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 8,
            background: '#f3f4f6',
            borderRadius: 16,
            padding: '16px 10px',
            boxShadow: '0 1px 4px rgba(74,144,226,0.04)',
            border: '2px solid #e5e7eb',
            opacity: 0.7,
            position: 'relative',
          }}>
            <span style={{ fontSize: 28, color: '#a3a3a3', marginLeft: 2 }}>🔒</span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#64748b' }}>Milestone {i}: Coming soon</div>
            </div>
            <button style={{ background: '#443eff', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 16px', fontWeight: 700, fontSize: 14, cursor: 'not-allowed', opacity: 0.7 }}>Locked</button>
          </div>
        ))}
      </div>
      {/* Leap Scholar branding and stats as a regular container at the bottom */}
      <div style={{
        width: '100%',
        maxWidth: 650,
        margin: '40px auto 0 auto',
        background: 'rgba(74,144,226,0.07)',
        borderRadius: 18,
        padding: '24px 18px',
        boxShadow: '0 1px 4px rgba(74,144,226,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <img 
            src="https://leapassets.s3.ap-south-1.amazonaws.com/ielts-recording/1619511191304-logo@2x_(1)_(1).png" 
            alt="Leap Scholar" 
            style={{ height: 38, borderRadius: 8, background: '#fff', padding: 6 }} 
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 18, color: '#1F2937', fontWeight: 800, marginBottom: 2 }}>
              Leap Scholar
            </div>
            <div style={{ fontSize: 15, color: '#443eff', fontWeight: 600 }}>
              Trusted by 100,000+ students AND PARENTS worldwide
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#059669' }}>100K+</div>
            <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>Students Helped</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#DC2626' }}>50+</div>
            <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>Countries</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#7C3AED' }}>95%</div>
            <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function WarmDisqualificationStep({ reason }) {
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="question-card" style={{
        maxWidth: 440,
        width: '100%',
        background: 'linear-gradient(135deg, #fff 80%, #e0e7ff 100%)',
        borderRadius: 28,
        boxShadow: '0 8px 32px rgba(99,102,241,0.13)',
        padding: '44px 32px 36px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        position: 'relative',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 54, marginBottom: 10, animation: 'bounce 1.2s' }}>🤗</div>
        <h2 style={{ fontSize: 25, fontWeight: 800, color: '#3730a3', marginBottom: 8 }}>We're Sorry, We Can't Proceed Right Now</h2>
        <div style={{ color: '#374151', fontSize: 17, marginBottom: 18, fontWeight: 500 }}>
          {reason}
        </div>
        <div style={{ color: '#6366f1', fontWeight: 600, fontSize: 16, marginBottom: 10 }}>How you can strengthen your profile:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%', marginBottom: 18 }}>
          <div style={{ background: '#f8fafc', borderRadius: 14, padding: '18px 16px', boxShadow: '0 1px 4px #6366f111', textAlign: 'left' }}>
            <b>📚 Focus on your academics:</b> Complete your current education and aim for strong grades. Universities abroad require a minimum of 12th grade or equivalent.
          </div>
          <div style={{ background: '#f8fafc', borderRadius: 14, padding: '18px 16px', boxShadow: '0 1px 4px #6366f111', textAlign: 'left' }}>
            <b>🛂 Apply for a passport:</b> If you haven't already, start your passport application process. <a href="https://portal2.passportindia.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'underline' }}>Apply here</a>.
          </div>
          <div style={{ background: '#f8fafc', borderRadius: 14, padding: '18px 16px', boxShadow: '0 1px 4px #6366f111', textAlign: 'left' }}>
            <b>🌐 Explore free resources:</b> Check out online courses, language learning, and extracurriculars to build your profile for the future.
          </div>
        </div>
        <div style={{ width: '100%', background: 'rgba(99,102,241,0.07)', borderRadius: 16, padding: '18px 14px', margin: '0 0 18px 0', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 1px 4px rgba(99,102,241,0.06)' }}>
          <img src="https://ik.imagekit.io/onsnhxjshmp/LeapScholar/new-header-logo_7i5sVUf9VF.svg" alt="Leap Scholar" style={{ height: 38, marginRight: 8, borderRadius: 8, background: '#fff', padding: 4 }} />
          <div style={{ textAlign: 'left', fontSize: 15, color: '#3730a3' }}>
            <b>Leap Scholar</b> is here to help you at every step. Come back when you're ready—we'll be waiting to support your dreams!
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletionStep; 