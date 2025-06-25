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

// Advisory page for MBBS/Medical/Bachelors
export function AdvisoryMBBSPage({ type = 'mbbs', onContinue, resources = [] }) {
  // type: 'mbbs' or 'bachelors'
  const isMBBS = type === 'mbbs';
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        maxWidth: 500,
        width: '100%',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 10, animation: 'bounce 1.2s' }}>🎉</div>
        <h2 className="completion-title" style={{ fontSize: 24, fontWeight: 900, color: '#443eff', marginBottom: 18, letterSpacing: '-0.01em' }}>Thank you!</h2>
        <div style={{ fontSize: 18, color: '#1e293b', fontWeight: 700, marginBottom: 10, textAlign: 'center' }}>
          We're excited about your ambition to study abroad.
        </div>
        <div style={{ fontSize: 16, color: '#64748b', fontWeight: 500, marginBottom: 18, textAlign: 'center', maxWidth: 500 }}>
          {isMBBS ? (
            <>Right now, we support PG aspirants, but we're building resources for future stars like you.<br/>You're on the right path — and we'll be here when the time is right!</>
          ) : (
            <>Currently, our partner universities require a minimum of 12th grade or equivalent for study abroad programs. Complete your 12th and come back—we will be here to help you take the next step!</>
          )}
        </div>
        <div style={{ fontWeight: 700, color: '#443eff', fontSize: 17, marginBottom: 8 }}>Access Resources</div>
        <div style={{ background: '#f3f4f6', borderRadius: 12, padding: 18, marginBottom: 18, minWidth: 260, maxWidth: 400 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Free guides for you:</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, color: '#1e293b', fontWeight: 500 }}>
            <li>📘 Roadmap to Studying Abroad</li>
            <li>🗓️ MBBS → PG Abroad Pathways</li>
            <li>🎥 Study Abroad for High Schoolers</li>
          </ul>
        </div>
        <div style={{ fontWeight: 700, color: '#6366f1', fontSize: 16, marginBottom: 8 }}>Leap Scholar</div>
        <div style={{ color: '#64748b', fontSize: 15, fontWeight: 500, marginBottom: 18, textAlign: 'center' }}>
          From all of us at Leap Scholar, wishing you the best!
        </div>
        {onContinue && <button style={{ background: '#443eff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 22px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 8 }} onClick={onContinue}>Back to Home</button>}
      </div>
    </div>
  );
}

// Advisory page for PhD after Bachelors or Masters
export function AdvisoryPhDPathPage({ after = 'bachelors', onSelect }) {
  // after: 'bachelors' or 'masters'
  const isBachelors = after === 'bachelors';
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        maxWidth: 500,
        width: '100%',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 10, animation: 'bounce 1.2s' }}>🎓</div>
        <h2 className="completion-title" style={{ fontSize: 22, fontWeight: 900, color: '#443eff', marginBottom: 18, letterSpacing: '-0.01em' }}>
          {isBachelors ? 'PhD after Bachelors is not preferred' : 'PhD after Masters: Consider your options'}
        </h2>
        <div style={{ fontSize: 16, color: '#64748b', fontWeight: 500, marginBottom: 18, textAlign: 'center', maxWidth: 500 }}>
          {isBachelors ? (
            <>PhD after Bachelors has very low admit chances. Masters or MBA is your recommended path for better opportunities abroad.</>
          ) : (
            <>PhD after Masters is a likely path, but abroad PhD has low intake and less admit chances. You can choose MBA or another Masters for more options.</>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 18,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <button
            style={{
              background: '#e0e7ff',
              color: '#3730a3',
              border: 'none',
              borderRadius: 8,
              padding: '12px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              flex: '1 1 120px',
              minWidth: 120,
              maxWidth: 180,
              marginBottom: 8
            }}
            onClick={() => onSelect('masters')}
          >
            Choose Masters
          </button>
          <button
            style={{
              background: '#e0e7ff',
              color: '#3730a3',
              border: 'none',
              borderRadius: 8,
              padding: '12px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              flex: '1 1 120px',
              minWidth: 120,
              maxWidth: 180,
              marginBottom: 8
            }}
            onClick={() => onSelect('mba')}
          >
            Choose MBA
          </button>
          <button
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: '1.5px solid #e5e7eb',
              borderRadius: 8,
              padding: '12px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              flex: '1 1 120px',
              minWidth: 120,
              maxWidth: 180,
              marginBottom: 8
            }}
            onClick={() => onSelect('phd')}
          >
            Continue with PhD
          </button>
        </div>
        <div style={{ color: '#64748b', fontSize: 15, fontWeight: 500, marginBottom: 18, textAlign: 'center' }}>
          Choosing Masters or MBA is recommended for higher admit chances.
        </div>
      </div>
    </div>
  );
}

// Advisory page for Bachelors after Bachelors
export function AdvisoryBachelorsPathPage({ onSelect }) {
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        maxWidth: 500,
        width: '100%',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 10, animation: 'bounce 1.2s' }}>🎓</div>
        <h2 className="completion-title" style={{ fontSize: 22, fontWeight: 900, color: '#443eff', marginBottom: 18, letterSpacing: '-0.01em' }}>
          Another Bachelors after Bachelors?
        </h2>
        <div style={{ fontSize: 16, color: '#64748b', fontWeight: 500, marginBottom: 18, textAlign: 'center', maxWidth: 500 }}>
          After Bachelors, <b>Masters or MBA</b> is the preferred path for higher ROI and better opportunities. Another Bachelors is not recommended and gives low ROI.
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 18,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <button
            style={{
              background: '#e0e7ff',
              color: '#3730a3',
              border: 'none',
              borderRadius: 8,
              padding: '12px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              flex: '1 1 120px',
              minWidth: 120,
              maxWidth: 180,
              marginBottom: 8
            }}
            onClick={() => onSelect('masters')}
          >
            Choose Masters
          </button>
          <button
            style={{
              background: '#e0e7ff',
              color: '#3730a3',
              border: 'none',
              borderRadius: 8,
              padding: '12px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              flex: '1 1 120px',
              minWidth: 120,
              maxWidth: 180,
              marginBottom: 8
            }}
            onClick={() => onSelect('mba')}
          >
            Choose MBA
          </button>
          <button
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: '1.5px solid #e5e7eb',
              borderRadius: 8,
              padding: '12px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              flex: '1 1 120px',
              minWidth: 120,
              maxWidth: 180,
              marginBottom: 8
            }}
            onClick={() => onSelect('bachelors')}
          >
            Continue with Bachelors
          </button>
        </div>
        <div style={{ color: '#64748b', fontSize: 15, fontWeight: 500, marginBottom: 18, textAlign: 'center' }}>
          Choosing Masters or MBA is recommended for higher admit chances and career growth.
        </div>
      </div>
    </div>
  );
} 