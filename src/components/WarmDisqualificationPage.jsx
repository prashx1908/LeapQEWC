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
          <div style={{ textAlign: 'left', fontSize: 13, color: '#443eff' }}>
            From all of us at Leap, wishing you the best!
          </div>
        </div>
      </div>
    </div>
  );
}

// Advisory page for MBBS/Medical/Bachelors/10th/12th
export function AdvisoryMBBSPage({ type = 'mbbs', onContinue, resources = [] }) {
  // type: 'mbbs', 'bachelors', or '10th' (or '12th')
  const isMBBS = type === 'mbbs';
  const isBachelors = type === 'bachelors';
  const is10thOr12th = type === '10th' || type === '12th';
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
        alignItems: 'center',
        gap: 18
      }}>
        {/* Header */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 8, animation: 'bounce 1.2s' }}>🎉</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#443eff', marginBottom: 8, letterSpacing: '-0.01em' }}>Thank you!</h2>
          <div style={{ fontSize: 17, color: '#1e293b', fontWeight: 700, marginBottom: 4 }}>
            {is10thOr12th
              ? "We're excited about your ambition to study abroad."
              : isBachelors
              ? "We're excited about your ambition to study abroad."
              : "We're excited about your ambition to study medicine abroad."}
          </div>
        </div>
        {/* Main Message */}
        <div style={{
          background: '#f3f4f6',
          borderRadius: 10,
          padding: '16px 18px',
          fontSize: 15,
          color: '#374151',
          fontWeight: 500,
          marginBottom: 0,
          width: '100%',
          textAlign: 'center',
          lineHeight: 1.6
        }}>
          {is10thOr12th ? (
            <div style={{ textAlign: 'left', display: 'inline-block', margin: '0 auto' }}>
              <ul style={{ listStyle: 'disc', paddingLeft: 22, margin: 0 }}>
                <li style={{ marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: '#443eff' }}>We currently guide students for postgraduate (PG) programs only.</span>
                </li>
                <li style={{ marginBottom: 6 }}>
                  <span style={{ color: '#374151' }}>Complete your 12th grade and undergraduate degree, then come back to explore global opportunities with us!</span>
                </li>
              </ul>
            </div>
          ) : isBachelors ? (
            <ul style={{ listStyle: 'disc', paddingLeft: 22, margin: 0, textAlign: 'left', display: 'inline-block' }}>
              <li>At Leap Scholar, we currently guide students for <span style={{ fontWeight: 700, color: '#443eff' }}>postgraduate (PG) programs</span> only.</li>
              <li>Please complete your undergraduate degree, then come back to explore global opportunities with us!</li>
            </ul>
          ) : (
            <>
              Right now, we support <span style={{ fontWeight: 700, color: '#443eff' }}>PG aspirants</span>, but we're building resources for future stars like you.<br/>
              <span style={{ color: '#059669', fontWeight: 700 }}>You're on the right path</span> — and we'll be here when the time is right!
            </>
          )}
        </div>
        {/* Resources Section */}
        <div style={{
          background: '#e0e7ff',
          borderRadius: 12,
          padding: 18,
          marginBottom: 0,
          minWidth: 260,
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 1px 4px #6366f111',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 800, color: '#443eff', fontSize: 16, marginBottom: 8, letterSpacing: 0.2 }}>Access Resources</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, color: '#1e293b' }}>Free guides for you:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <a href="https://leapscholar.com/ebook" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
              <span style={{ fontSize: 18 }}>📘</span> Roadmap to Studying Abroad
            </a>
            <a href="https://leapscholar.com/blog" target="_blank" rel="noopener noreferrer" style={{ background: '#f8f6f3', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 4px #443eff11', textAlign: 'left', color: '#443eff', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
              <span style={{ fontSize: 18 }}>🎥</span> Study Abroad for High Schoolers
            </a>
          </div>
        </div>
        {/* Leap Scholar Branding */}
        <div style={{
          background: '#f3f4f6',
          borderRadius: 10,
          padding: '10px 14px',
          width: '100%',
          textAlign: 'center',
          marginTop: 0
        }}>
          <div style={{ fontWeight: 700, color: '#6366f1', fontSize: 16, marginBottom: 2 }}>Leap Scholar</div>
          <div style={{ color: '#64748b', fontSize: 15, fontWeight: 500 }}>
            From all of us at <span style={{ fontWeight: 700, color: '#443eff' }}>Leap</span>, wishing you the best!
          </div>
        </div>
        {/* Back to Home Button */}
        {onContinue && <button style={{ background: '#443eff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 22px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 8, width: '100%' }} onClick={onContinue}>Back to Home</button>}
      </div>
    </div>
  );
}

// Advisory page for PhD after Bachelors or Masters
export function AdvisoryPhDPathPage({ after = 'bachelors', onSelect }) {
  // --- Unified card structure for both PhD after Bachelors and PhD after Masters ---
  const isBachelors = after === 'bachelors';
  const isMasters = after === 'masters';
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div style={{
        background: '#fff',
        borderRadius: 22,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: 540,
        width: '95%',
        padding: '36px 24px 32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>
        {/* Header */}
        <div style={{ width: '100%', textAlign: 'center', marginBottom: 10 }}>
          <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 8, animation: 'bounce 1.2s' }}>🎓</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#443eff', marginBottom: 8, letterSpacing: '-0.01em' }}>
            {isBachelors ? 'PhD after Bachelors?' : 'PhD after Masters?'}
          </h2>
        </div>
        {/* Main message */}
        <div style={{
          background: '#f3f4f6',
          borderRadius: 10,
          padding: '14px 18px',
          fontSize: 15,
          color: '#374151',
          fontWeight: 500,
          width: '100%',
          textAlign: 'center',
          lineHeight: 1.6,
          marginBottom: 10
        }}>
          {isBachelors ? (
            <>
              <span style={{ color: '#443eff', fontWeight: 700 }}>Direct PhD after Bachelors</span> is extremely rare and highly competitive.<br/>
              <span style={{ color: '#b91c1c', fontWeight: 700 }}>Most students pursue a Masters or MBA first for better admit chances and research profile.</span>
            </>
          ) : (
            <>
              <span style={{ color: '#b91c1c', fontWeight: 700 }}>Direct PhD after Masters is not recommended since it gives low chances of admit.</span>
            </>
          )}
        </div>
        {/* Expert advice container */}
        <div style={{
          background: '#e0e7ff',
          borderRadius: 10,
          padding: '14px 18px',
          fontSize: 15,
          color: '#374151',
          fontWeight: 500,
          width: '100%',
          maxWidth: 520,
          textAlign: 'center',
          lineHeight: 1.6,
          marginBottom: 18
        }}>
          <ul style={{ listStyle: 'disc', paddingLeft: 22, margin: 0, textAlign: 'left', display: 'inline-block' }}>
            {isBachelors ? (
              <>
                <li><span style={{ color: '#443eff', fontWeight: 700 }}>Masters or MBA</span> is the recommended path for research or management careers.</li>
                <li style={{ fontStyle: 'italic' }}><span style={{ color: '#443eff', fontWeight: 700 }}>Experts recommend:</span> Build your research profile with a Masters, then apply for a PhD abroad.</li>
              </>
            ) : (
              <>
                <li><span style={{ color: '#443eff', fontWeight: 700 }}>Double Masters</span> is the preferred path for research.</li>
                <li style={{ fontStyle: 'italic' }}><span style={{ color: '#443eff', fontWeight: 700 }}>Experts recommend:</span> You can do masters abroad then internally convert to PhD at your university abroad.</li>
              </>
            )}
          </ul>
        </div>
        {/* Question and options in a separate card below */}
        <div style={{
          background: '#e0e7ff',
          borderRadius: 14,
          boxShadow: '0 2px 12px rgba(68,62,255,0.07)',
          maxWidth: 520,
          width: '100%',
          padding: '22px 24px 18px 24px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0
        }}>
          <div style={{
            background: '#f3f4f6',
            borderRadius: 10,
            padding: '16px 18px',
            fontSize: 18,
            color: '#1e293b',
            fontWeight: 900,
            width: '100%',
            textAlign: 'center',
            marginBottom: 18,
            letterSpacing: '-0.01em',
          }}>
            Which path fits you best after your {isBachelors ? 'Bachelors' : 'Masters'}?
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 0,
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            {/* Masters/Double Masters */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: 1, minWidth: 120 }}>
              <button
                style={{
                  background: '#fff',
                  color: '#3730a3',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 22px',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: 72,
                  maxHeight: 90,
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}
                onClick={() => onSelect(isMasters ? 'double-masters' : 'masters')}
              >
                <span style={{ fontSize: 15, fontWeight: 700 }}>{isMasters ? 'Double Masters' : 'Masters'}</span>
                <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, opacity: 0.92, marginTop: 'auto', marginBottom: 0, whiteSpace: 'nowrap' }}>{isMasters ? 'Research Path' : 'Corporate Path'}</span>
              </button>
            </div>
            {/* MBA */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: 1, minWidth: 120 }}>
              <button
                style={{
                  background: '#fff',
                  color: '#3730a3',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 22px',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: 72,
                  maxHeight: 90,
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}
                onClick={() => onSelect('mba')}
              >
                <span style={{ fontSize: 15, fontWeight: 700 }}>MBA</span>
                <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, opacity: 0.92, marginTop: 'auto', marginBottom: 0, whiteSpace: 'nowrap' }}>Management Path</span>
              </button>
            </div>
            {/* PhD */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 120 }}>
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
                  width: '100%',
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: 72,
                  maxHeight: 90,
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                onClick={() => onSelect('phd')}
              >
                <span style={{ fontSize: 13, fontWeight: 700 }}>Continue with PhD</span>
                <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, opacity: 0.92, marginTop: 'auto', marginBottom: 0, whiteSpace: 'nowrap' }}>Not Recommended</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Advisory page for Bachelors after Bachelors
export function AdvisoryBachelorsPathPage({ onSelect }) {
  // --- Another Bachelors after Bachelors: wrap all content in a single outer container for unified look ---
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div style={{
        background: '#fff',
        borderRadius: 22,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: 540,
        width: '95%',
        padding: '36px 24px 32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>
        {/* Header */}
        <div style={{ width: '100%', textAlign: 'center', marginBottom: 10 }}>
          <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 8, animation: 'bounce 1.2s' }}>🎓</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#443eff', marginBottom: 8, letterSpacing: '-0.01em' }}>
            Another Bachelors after Bachelors?
          </h2>
        </div>
        {/* Main message */}
        <div style={{
          background: '#f3f4f6',
          borderRadius: 10,
          padding: '14px 18px',
          fontSize: 15,
          color: '#374151',
          fontWeight: 500,
          width: '100%',
          textAlign: 'center',
          lineHeight: 1.6,
          marginBottom: 10
        }}>
          <span style={{ color: '#b91c1c', fontWeight: 700 }}>Another Bachelors after Bachelors is not recommended and gives low ROI.</span>
        </div>
        {/* Expert advice container */}
        <div style={{
          background: '#e0e7ff',
          borderRadius: 10,
          padding: '14px 18px',
          fontSize: 15,
          color: '#374151',
          fontWeight: 500,
          width: '100%',
          maxWidth: 520,
          textAlign: 'center',
          lineHeight: 1.6,
          marginBottom: 18
        }}>
          <ul style={{ listStyle: 'disc', paddingLeft: 22, margin: 0, textAlign: 'left', display: 'inline-block' }}>
            <li><span style={{ color: '#443eff', fontWeight: 700 }}>Masters or MBA</span> is the preferred path for higher ROI and better opportunities.</li>
            <li style={{ fontStyle: 'italic' }}><span style={{ color: '#443eff', fontWeight: 700 }}>Experts recommend:</span> Build on your Bachelors with a Masters or MBA for career growth.</li>
          </ul>
        </div>
        {/* Question and options in a separate card below */}
        <div style={{
          background: '#e0e7ff',
          borderRadius: 14,
          boxShadow: '0 2px 12px rgba(68,62,255,0.07)',
          maxWidth: 520,
          width: '100%',
          padding: '22px 24px 18px 24px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0
        }}>
          <div style={{
            background: '#f3f4f6',
            borderRadius: 10,
            padding: '16px 18px',
            fontSize: 18,
            color: '#1e293b',
            fontWeight: 900,
            width: '100%',
            textAlign: 'center',
            marginBottom: 18,
            letterSpacing: '-0.01em',
          }}>
            Which path fits you best after your Bachelors?
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 0,
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            {/* Masters */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: 1, minWidth: 120 }}>
              <button
                style={{
                  background: '#fff',
                  color: '#3730a3',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 22px',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: 72,
                  maxHeight: 90,
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}
                onClick={() => onSelect('masters')}
              >
                <span style={{ fontSize: 15, fontWeight: 700 }}>Masters</span>
                <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, opacity: 0.92, marginTop: 'auto', marginBottom: 0, whiteSpace: 'nowrap' }}>Corporate Path</span>
              </button>
            </div>
            {/* MBA */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: 1, minWidth: 120 }}>
              <button
                style={{
                  background: '#fff',
                  color: '#3730a3',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 22px',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: 72,
                  maxHeight: 90,
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}
                onClick={() => onSelect('mba')}
              >
                <span style={{ fontSize: 15, fontWeight: 700 }}>MBA</span>
                <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, opacity: 0.92, marginTop: 'auto', marginBottom: 0, whiteSpace: 'nowrap' }}>Management Path</span>
              </button>
            </div>
            {/* Bachelors */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 120 }}>
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
                  width: '100%',
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: 72,
                  maxHeight: 90,
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                onClick={() => onSelect('bachelors')}
              >
                <span style={{ fontSize: 13, fontWeight: 700 }}>Continue with Bachelors</span>
                <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, opacity: 0.92, marginTop: 'auto', marginBottom: 0, whiteSpace: 'nowrap' }}>Low ROI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 