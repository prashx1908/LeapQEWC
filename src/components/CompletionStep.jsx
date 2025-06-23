import React from 'react';

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
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="question-card" style={{
        maxWidth: 420,
        width: '100%',
        background: 'linear-gradient(135deg, #fff 80%, #e0e7ff 100%)',
        borderRadius: 28,
        boxShadow: '0 8px 32px rgba(99,102,241,0.13)',
        padding: '40px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        position: 'relative',
        textAlign: 'center',
      }}>
        <div className="completion-emoji" style={{ fontSize: 54, marginBottom: 12, animation: 'bounce 1.2s' }}>🎉</div>
        <h2 className="completion-title" style={{ fontSize: 26, fontWeight: 800, color: '#3730a3', marginBottom: 8 }}>Quick Evaluation Complete!</h2>
        {/* Highlighted containers for shortlisting and scholarship */}
        <div style={{
          width: '100%',
          background: 'rgba(16,185,129,0.08)',
          borderRadius: 16,
          padding: '16px 12px',
          margin: '12px 0 8px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 1px 4px rgba(16,185,129,0.07)',
        }}>
          <span style={{ fontSize: 28, color: '#10b981' }}>🎓</span>
          <span style={{ fontWeight: 700, color: '#10b981', fontSize: 16, textAlign: 'left' }}>
            Congratulations! You are shortlisted for <span style={{ fontWeight: 800 }}>60+ universities</span>.
          </span>
        </div>
        <div style={{
          width: '100%',
          background: 'rgba(161,98,232,0.08)',
          borderRadius: 16,
          padding: '16px 12px',
          margin: '0 0 18px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 1px 4px rgba(161,98,232,0.07)',
        }}>
          <span style={{ fontSize: 26, color: '#a162e8' }}>💸</span>
          <span style={{ fontWeight: 700, color: '#a162e8', fontSize: 16, textAlign: 'left' }}>
            25-70% scholarship possible based on your profile.
          </span>
        </div>
        {/* Compact country and program cards */}
        <div style={{
          width: '100%',
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          margin: '10px 0 18px 0',
          flexWrap: 'wrap',
        }}>
          {/* Country card */}
          <div style={{
            flex: 1,
            minWidth: 120,
            maxWidth: 180,
            background: 'rgba(99,102,241,0.08)',
            borderRadius: 14,
            boxShadow: '0 1px 4px rgba(99,102,241,0.06)',
            padding: '18px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 32, marginBottom: 6 }}>{countryMap[country]?.flag || '🌍'}</span>
            <span style={{ fontWeight: 700, color: '#3730a3', fontSize: 16 }}>{countryMap[country]?.name || country}</span>
            <span style={{ color: '#6366f1', fontSize: 13, marginTop: 2 }}>Country</span>
          </div>
          {/* Program card */}
          <div style={{
            flex: 1,
            minWidth: 120,
            maxWidth: 180,
            background: 'rgba(16,185,129,0.08)',
            borderRadius: 14,
            boxShadow: '0 1px 4px rgba(16,185,129,0.06)',
            padding: '18px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 32, marginBottom: 6 }}>{programIconMap[program] || '🎓'}</span>
            <span style={{ fontWeight: 700, color: '#10b981', fontSize: 16 }}>{program?.charAt(0).toUpperCase() + program?.slice(1)}</span>
            <span style={{ color: '#10b981', fontSize: 13, marginTop: 2 }}>Program</span>
          </div>
        </div>
        {/* Trust-building Leap Scholar info */}
        <div style={{
          width: '100%',
          background: 'rgba(99,102,241,0.07)',
          borderRadius: 16,
          padding: '18px 14px',
          margin: '0 0 18px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          boxShadow: '0 1px 4px rgba(99,102,241,0.06)',
        }}>
          <img src="https://ik.imagekit.io/onsnhxjshmp/LeapScholar/new-header-logo_7i5sVUf9VF.svg" alt="Leap Scholar" style={{ height: 38, marginRight: 8, borderRadius: 8, background: '#fff', padding: 4 }} />
          <div style={{ textAlign: 'left', fontSize: 15, color: '#3730a3' }}>
            <b>Leap Scholar</b> has helped <b>100,000+ students</b> achieve their study abroad dreams.<br />
            <span style={{ color: '#6366f1', fontWeight: 600 }}>Trusted by students and parents worldwide.</span>
          </div>
        </div>
        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
          <button
            onClick={onDownloadReport}
            disabled={saving || buttonLoading.download}
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '13px 0',
              fontSize: 16,
              fontWeight: 700,
              cursor: saving || buttonLoading.download ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              transition: 'background 0.2s',
              letterSpacing: 1,
              flex: 1,
              minWidth: 0,
              maxWidth: 200,
              opacity: saving || buttonLoading.download ? 0.7 : 1,
            }}
          >
            {buttonLoading.download ? 'Processing...' : 'Download Report'}
          </button>
          <button
            onClick={onViewReport}
            disabled={saving || buttonLoading.view}
            style={{
              background: 'linear-gradient(90deg, #a78bfa 0%, #6366f1 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '13px 0',
              fontSize: 16,
              fontWeight: 700,
              cursor: saving || buttonLoading.view ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              transition: 'background 0.2s',
              letterSpacing: 1,
              flex: 1,
              minWidth: 0,
              maxWidth: 200,
              opacity: saving || buttonLoading.view ? 0.7 : 1,
            }}
          >
            {buttonLoading.view ? 'Processing...' : 'View Report'}
          </button>
        </div>
        {/* Continue button */}
        <button
          onClick={onContinue}
          disabled={saving || buttonLoading.download || buttonLoading.view}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '15px 0',
            fontSize: 17,
            fontWeight: 700,
            cursor: saving || buttonLoading.download || buttonLoading.view ? 'not-allowed' : 'pointer',
            marginTop: 24,
            width: '100%',
            boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            transition: 'background 0.2s',
            letterSpacing: 1,
            opacity: saving || buttonLoading.download || buttonLoading.view ? 0.7 : 1,
          }}
        >
          Continue
        </button>
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