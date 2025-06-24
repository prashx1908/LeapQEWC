import React from 'react';

export default function WarmDisqualificationPage({ reasonType }) {
  const isPassport = reasonType === 'passport';
  const isBoth = reasonType === 'both';
  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>
      <div style={{ maxWidth: 400, width: '100%', background: '#fff', borderRadius: 22, boxShadow: '0 4px 18px rgba(74,144,226,0.10)', padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '48px auto 0 auto', position: 'relative', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{isBoth ? '🛂🌱' : isPassport ? '🛂' : '🌱'}</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#443eff', marginBottom: 10 }}>Thank you!</h2>
        {isBoth ? (
          <>
            <div style={{ color: '#555', fontSize: 15, marginBottom: 14, fontWeight: 500, lineHeight: 1.5 }}>
              To proceed, you'll need to complete your 12th grade (or MBBS) <b>and</b> have a valid passport (or an application in process).<br/>
              Please complete your education and apply for a passport. We'll be here to help you take the next step!
            </div>
            <div style={{ color: '#27AE60', fontWeight: 700, fontSize: 15, marginBottom: 18 }}>
              You're on the right path — and we'll be here when you're ready!
            </div>
            <button style={{ background: '#27AE60', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 0', fontSize: 16, fontWeight: 700, cursor: 'pointer', width: 180, boxShadow: '0 2px 8px rgba(39,174,96,0.08)', marginBottom: 18, letterSpacing: 0.5 }} onClick={() => window.open('https://portal2.passportindia.gov.in/', '_blank')}>Apply for Passport</button>
            <div style={{ color: '#443eff', fontWeight: 600, fontSize: 14, marginBottom: 10, marginTop: 8 }}>Resources for you:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginBottom: 18 }}>
              <a href="https://portal2.passportindia.gov.in/" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>🛂</span> Passport Application Portal
              </a>
              <a href="https://leapscholar.com/ebook" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>📘</span> Roadmap to Studying Abroad
              </a>
              <a href="https://leapscholar.com/blog/mbbs-to-pg-abroad" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>🗓️</span> MBBS → PG Abroad Pathways
              </a>
              <a href="https://leapscholar.com/blog" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>🎥</span> Study Abroad for High Schoolers
              </a>
            </div>
          </>
        ) : isPassport ? (
          <>
            <div style={{ color: '#555', fontSize: 15, marginBottom: 14, fontWeight: 500, lineHeight: 1.5 }}>
              A valid passport (or an application in process) is required to proceed with your study abroad journey.<br/>
              Please apply for a passport and return—we'll be ready to help you take the next step!
            </div>
            <div style={{ color: '#27AE60', fontWeight: 700, fontSize: 15, marginBottom: 18 }}>
              You're on the right path — and we'll be here when you're ready!
            </div>
            <button style={{ background: '#27AE60', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 0', fontSize: 16, fontWeight: 700, cursor: 'pointer', width: 180, boxShadow: '0 2px 8px rgba(39,174,96,0.08)', marginBottom: 18, letterSpacing: 0.5 }} onClick={() => window.open('https://portal2.passportindia.gov.in/', '_blank')}>Apply for Passport</button>
            <div style={{ color: '#443eff', fontWeight: 600, fontSize: 14, marginBottom: 10, marginTop: 8 }}>Resources for you:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginBottom: 18 }}>
              <a href="https://portal2.passportindia.gov.in/" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>🛂</span> Passport Application Portal
              </a>
              <a href="https://leapscholar.com/ebook" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>📘</span> Roadmap to Studying Abroad
              </a>
            </div>
          </>
        ) : (
          <>
            <div style={{ color: '#555', fontSize: 15, marginBottom: 14, fontWeight: 500, lineHeight: 1.5 }}>
              We're excited about your ambition to study abroad.<br/>
              Right now, we support PG aspirants, but we're building resources for future stars like you.
            </div>
            <div style={{ color: '#27AE60', fontWeight: 700, fontSize: 15, marginBottom: 18 }}>
              You're on the right path — and we'll be here when the time is right!
            </div>
            <button style={{ background: '#27AE60', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 0', fontSize: 16, fontWeight: 700, cursor: 'pointer', width: 180, boxShadow: '0 2px 8px rgba(39,174,96,0.08)', marginBottom: 18, letterSpacing: 0.5 }} onClick={() => window.open('https://leapscholar.com/resources', '_blank')}>Access Resources</button>
            <div style={{ color: '#443eff', fontWeight: 600, fontSize: 14, marginBottom: 10, marginTop: 8 }}>Free guides for you:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginBottom: 18 }}>
              <a href="https://leapscholar.com/ebook" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>📘</span> Roadmap to Studying Abroad
              </a>
              <a href="https://leapscholar.com/blog/mbbs-to-pg-abroad" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>🗓️</span> MBBS → PG Abroad Pathways
              </a>
              <a href="https://leapscholar.com/blog" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                <span style={{ fontSize: 18 }}>🎥</span> Study Abroad for High Schoolers
              </a>
            </div>
          </>
        )}
        <div style={{ width: '100%', background: 'rgba(74,144,226,0.07)', borderRadius: 12, padding: '12px 10px', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 4px rgba(74,144,226,0.06)' }}>
          <img src="https://leapassets.s3.ap-south-1.amazonaws.com/ielts-recording/1619511191304-logo@2x_(1)_(1).png" alt="Leap Scholar" style={{ height: 28, marginRight: 8, borderRadius: 6, background: '#fff', padding: 2 }} />
          <div style={{ textAlign: 'left', fontSize: 13, color: '#443eff' }}>
            From all of us at Leap Scholar, wishing you the best!
          </div>
        </div>
      </div>
    </div>
  );
} 