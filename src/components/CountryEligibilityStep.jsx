import React from 'react';

// State for USA 10+ backlogs confirmation
const [showUSABacklogConfirm, setShowUSABacklogConfirm] = React.useState(false);
const [pendingUSABacklogConfirm, setPendingUSABacklogConfirm] = React.useState(false);

// --- USA confirmation dialog with 3 options ---
const usaConfirmDialog = showUSAConfirm && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309', marginBottom: 12 }}>USA admits are higher with 35L+ budget. With 15L, options are more limited.</div>
      <div style={{ color: '#a16207', fontSize: 15, marginBottom: 18 }}>What would you like to do next?</div>
      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        <button style={{ background: '#fde68a', color: '#b45309', border: '1.5px solid #fde68a', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
          onClick={() => { setShowUSAConfirm(false); onSelectCountry('usa'); onContinue('extend-budget'); }}>
          Extend budget to 35 lakhs
        </button>
        <button style={{ background: '#e0e7ff', color: '#3730a3', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
          onClick={() => { setShowUSAConfirm(false); onContinue && onContinue('counsellor'); }}>
          Talk with the counsellor
        </button>
        <button style={{ background: '#f3f4f6', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
          onClick={() => { setShowUSAConfirm(false); onSelectCountry(null); onContinue(); }}>
          Explore other countries
        </button>
      </div>
    </div>
  </div>
);

// --- Generic country confirmation dialog ---
const countryConfirmDialog = showCountryConfirm && pendingCountryConfirm && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309', marginBottom: 12 }}>Switch Country?</div>
      <div style={{ color: '#1e293b', fontSize: 15, marginBottom: 18 }}>
        Do you want to switch to <b>{pendingCountryConfirm && pendingCountryConfirm.toUpperCase()}</b>?
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
          onClick={() => {
            onSelectCountry(pendingCountryConfirm);
            setShowCountryConfirm(false);
            setPendingCountryConfirm(null);
            onContinue();
          }}>
          Yes, switch to {pendingCountryConfirm && pendingCountryConfirm.toUpperCase()}
        </button>
        <button style={{ background: '#f3f4f6', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
          onClick={() => {
            setShowCountryConfirm(false);
            setPendingCountryConfirm(null);
          }}>
          No, stay with current country
        </button>
      </div>
    </div>
  </div>
);

// --- USA 10+ backlogs confirmation dialog ---
const usaBacklogConfirmDialog = showUSABacklogConfirm && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#b91c1c', marginBottom: 12 }}>Low admit chances for USA with more than 10 backlogs.</div>
      <div style={{ color: '#1e293b', fontSize: 15, marginBottom: 18 }}>
        Do you want to continue with USA or explore other countries?
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
          onClick={() => {
            setShowUSABacklogConfirm(false);
            onSelectCountry('usa');
            onContinue();
          }}>
          Go ahead with this option
        </button>
        <button style={{ background: '#f3f4f6', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
          onClick={() => {
            setShowUSABacklogConfirm(false);
          }}>
          Explore other country
        </button>
      </div>
    </div>
  </div>
);

// --- USA Backlog > 10 warning container ---
const showUSABacklogWarning = country === 'usa' && userBacklogs > 10;
// --- USA 15L budget warning ---
const showUSALimitedBudgetWarning = country === 'usa' && budget === 'cannot15' && userBacklogs <= 10;
const usaLimitedBudgetWarning = showUSALimitedBudgetWarning && (
  <div style={{
    background: '#fef9c3',
    color: '#b45309',
    borderRadius: 14,
    padding: '18px 22px',
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 22,
    textAlign: 'center',
    border: '2px solid #fde68a',
    maxWidth: 700,
    width: '100%',
    boxShadow: '0 2px 8px #fde68a33',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  }}>
    USA has very limited opportunities with a 15 lakhs budget. <br />
    <span style={{ fontWeight: 600 }}>Extend your budget to 35 lakhs to unlock more universities.</span>
  </div>
);

// --- USA button ---
const usaButton = (
  <button
    style={{
      ...compactButtonStyle,
      background: userBacklogs > 10 ? '#fef2f2' : compactButtonStyle.background,
      border: userBacklogs > 10 ? '2px solid #fca5a5' : compactButtonStyle.border,
      color: userBacklogs > 10 ? '#b91c1c' : compactButtonStyle.color,
      fontWeight: 700,
      fontSize: 14,
      minWidth: 120,
      maxWidth: 160,
      margin: 0,
      position: 'relative',
    }}
    onClick={() => {
      if (userBacklogs > 10) {
        setDisqualCountry(usa);
        setDisqualReason('Low admit chances for USA with more than 10 backlogs.');
        setShowDisqualDialog(true);
      } else {
        handleCountryClick(usa, usaEligible);
      }
    }}
  >
    <span style={{ fontSize: 22, marginBottom: 2 }}>{usa.flag}</span>
    <span>{usa.name}</span>
    <span style={{ color: userBacklogs > 10 ? '#b91c1c' : '#64748b', fontSize: 11, fontWeight: 600 }}>ROI: ₹{usa.roi}L</span>
    {userBacklogs > 10 && (
      <span style={{
        position: 'absolute',
        top: 6,
        right: 6,
        background: '#fde68a',
        color: '#b45309',
        fontWeight: 700,
        fontSize: 9,
        borderRadius: 7,
        padding: '1px 6px',
      }}>Low admit</span>
    )}
  </button>
);

// --- Disqualification dialog for all countries ---
const disqualDialog = showDisqualDialog && disqualCountry && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: 38, minWidth: 360, textAlign: 'center', position: 'relative' }}>
      {/* Close button */}
      <button onClick={() => setShowDisqualDialog(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#64748b', cursor: 'pointer', fontWeight: 700, zIndex: 2 }} aria-label="Close">×</button>
      {disqualCountry.value === 'usa' && userBacklogs > 10 ? (
        <>
          <div style={{ fontWeight: 900, fontSize: 20, color: '#b91c1c', marginBottom: 14 }}>
            You selected <b>USA <span style={{fontSize:22}}>🇺🇸</span></b> and it has <b>1 in 10 admit chances</b> with an academic profile of <b>10+ backlogs</b>.
          </div>
          <div style={{ color: '#b91c1c', fontSize: 16, marginBottom: 22, fontWeight: 700 }}>
            Consider our recommended options below or continue if you wish.
          </div>
        </>
      ) : (
        <>
          <div style={{ fontWeight: 900, fontSize: 20, color: '#b91c1c', marginBottom: 14 }}>
            You chose <b>{disqualCountry.name} {disqualCountry.flag}</b> with <b>{disqualReason}</b>.
          </div>
          <div style={{ color: '#b91c1c', fontSize: 16, marginBottom: 22, fontWeight: 700 }}>
            There are very few university admit chances. Try exploring other countries we have recommended below.
          </div>
        </>
      )}
      <div style={{ display: 'flex', gap: 18, marginTop: 10, justifyContent: 'center' }}>
        <button style={{
          background: '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          fontWeight: 800,
          fontSize: 16,
          padding: '12px 26px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #6366f122',
        }}
          onClick={() => { setShowDisqualDialog(false); onSelectCountry(disqualCountry.value); onContinue(); }}>
          Continue with USA
        </button>
        <button style={{
          background: '#f3f4f6',
          color: '#374151',
          border: '1.5px solid #e5e7eb',
          borderRadius: 10,
          fontWeight: 800,
          fontSize: 16,
          padding: '12px 26px',
          cursor: 'pointer',
        }}
          onClick={() => setShowDisqualDialog(false)}>
          Explore other countries
        </button>
      </div>
    </div>
  </div>
);

// --- Main handler ---
function handleCountryClick(c, isEligible) {
  // USA + 10+ backlogs: always show the custom popup (academic profile takes priority over budget)
  if (c.value === 'usa' && userBacklogs > 10) {
    setDisqualCountry(c);
    setDisqualReason('Low admit chances for USA with more than 10 backlogs.');
    setShowDisqualDialog(true);
    return;
  }
  // For any country, if not eligible, show confirmation dialog
  if (!isEligible) {
    setDisqualCountry(c);
    setDisqualReason(reasonMap[c.value] || 'This option may have a low admit rate.');
    setShowDisqualDialog(true);
    return;
  }
  // If user is on USA and budget is 'cannot15', and clicks any other country, show confirmation
  if (country === 'usa' && budget === 'cannot15' && c.value !== 'usa') {
    setPendingCountryConfirm(c.value);
    setShowCountryConfirm(true);
    return;
  }
  // If user selects USA and cannot invest 15L, show advisory only, do not show popup
  if (c.value === 'usa' && budget === 'cannot15' && !usaConfirmed) {
    onSelectCountry(c.value);
    return;
  }
  // If user selects USA again after previously attempting with cannot15, show the popup
  if (country === 'not-sure') {
    setYesNoCountry(c);
    setShowYesNoDialog(true);
    return;
  }
  if (c.value !== 'usa') {
    setPendingCountryConfirm(c.value);
    setShowCountryConfirm(true);
    return;
  }
  // ...rest of logic unchanged...
}

return (
  <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 800, width: '100%', padding: '24px 16px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Country Eligibility</h2>
    {showUSABacklogWarning && (
      <div style={{
        background: '#fef3c7',
        color: '#b91c1c',
        borderRadius: 14,
        padding: '22px 28px',
        fontWeight: 900,
        fontSize: 18,
        marginBottom: 28,
        textAlign: 'center',
        border: '2.5px solid #fde68a',
        maxWidth: 700,
        width: '100%',
        boxShadow: '0 2px 12px #fde68a33',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        letterSpacing: 0.1,
      }}>
        You selected <b>USA <span style={{fontSize:22}}>🇺🇸</span></b> and it has <b>1 in 10 admit chances</b> with an academic profile of <b>10+ backlogs</b>.<br />
        <span style={{ fontWeight: 800, color: '#b91c1c', fontSize: 17 }}>
          Consider our recommended options below or continue if you wish.
        </span>
      </div>
    )}
    {usaLimitedBudgetWarning}
    {countryConfirmDialog}
    <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 16, border: '2px solid #e5e7eb', padding: '14px 18px', marginBottom: 18, maxWidth: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: '#6366f1', marginBottom: 8, width: '100%', textAlign: 'left' }}>35+ lakhs</div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {usaButton}
      </div>
    </div>
    {disqualDialog}
  </div>
); 