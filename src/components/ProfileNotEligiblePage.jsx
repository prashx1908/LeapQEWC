import React from 'react';

export default function ProfileNotEligiblePage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: 480, width: '100%', padding: 36, borderRadius: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 54, marginBottom: 10 }}>🤗</div>
        <h2 style={{ fontSize: 25, fontWeight: 800, color: '#3730a3', marginBottom: 8 }}>
          Thank You for Your Interest!
        </h2>
        <div style={{ color: '#374151', fontSize: 17, marginBottom: 18, fontWeight: 500 }}>
          At this time, we're unable to proceed with your profile due to academic requirements.<br />
          <span style={{ color: '#b91c1c', fontWeight: 700 }}>We value your ambition and are here to help you grow!</span>
        </div>
        <div style={{ color: '#6366f1', fontWeight: 600, fontSize: 16, marginBottom: 10 }}>
          How you can strengthen your profile:
        </div>
        <ul style={{ textAlign: 'left', margin: '0 auto 18px auto', maxWidth: 380 }}>
          <li>📚 Focus on your academics and aim for higher grades.</li>
          <li>🌐 Explore free resources and online courses.</li>
          <li>🛂 Prepare your documents for future opportunities.</li>
        </ul>
        <div style={{ background: 'rgba(99,102,241,0.07)', borderRadius: 16, padding: 18, margin: '0 0 18px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="logo-3d" style={{ height: 38, width: 38, marginRight: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
  <img src="https://ik.imagekit.io/onsnhxjshmp/LeapScholar/new-header-logo_7i5sVUf9VF.svg" alt="Leap Scholar" style={{ width: '100%', height: '100%', borderRadius: 8, background: '#fff', padding: 4 }} />
</div>
          <div style={{ textAlign: 'left', fontSize: 15, color: '#3730a3' }}>
            <b>Leap Scholar</b> is here to help you at every step. Come back when you're ready—we'll be waiting to support your dreams!
          </div>
        </div>
        <div style={{ color: '#443eff', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Helpful Resources:</div>
        <ul style={{ margin: 0, padding: 0, color: '#64748b', fontSize: 15, listStyle: 'disc inside', width: '100%', textAlign: 'left', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
          <li><a href="https://leapfinance.com/resources" target="_blank" rel="noopener noreferrer" style={{ color: '#443eff', fontWeight: 600, textDecoration: 'underline' }}>Study Abroad Guides</a></li>
          <li><a href="https://leapscholar.com/country-guides" target="_blank" rel="noopener noreferrer" style={{ color: '#443eff', fontWeight: 600, textDecoration: 'underline' }}>Country Guides</a></li>
          <li><a href="https://leapscholar.com/blog" target="_blank" rel="noopener noreferrer" style={{ color: '#443eff', fontWeight: 600, textDecoration: 'underline' }}>Leap Scholar Blog</a></li>
          <li><a href="https://leapscholar.com/counsellor" target="_blank" rel="noopener noreferrer" style={{ color: '#443eff', fontWeight: 600, textDecoration: 'underline' }}>Book a Free Counselling Call</a></li>
        </ul>
      </div>
    </div>
  );
} 