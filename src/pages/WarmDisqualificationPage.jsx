import React from 'react';

export default function WarmDisqualificationPage({ reason }) {
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