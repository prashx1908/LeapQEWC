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

// --- USA 15L budget warning ---
const showUSALimitedBudgetWarning = country === 'usa' && budget === 'cannot15';
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

// --- USA button ---
const usaButton = (
  <button
    style={{
      ...compactButtonStyle,
      background: usaEligible ? compactButtonStyle.background : '#f3f4f6',
      border: usaEligible ? compactButtonStyle.border : '2px solid #eab308',
      color: usaEligible ? compactButtonStyle.color : '#b45309',
      fontWeight: 700,
      fontSize: 14,
      minWidth: 120,
      maxWidth: 160,
      margin: 0,
      position: 'relative',
    }}
    onClick={() => handleCountryClick(usa, usaEligible)}
  >
    <span style={{ fontSize: 22, marginBottom: 2 }}>{usa.flag}</span>
    <span>{usa.name}</span>
    <span style={{ color: usaEligible ? '#64748b' : '#a16207', fontSize: 11, fontWeight: 600 }}>ROI: ₹{usa.roi}L</span>
    {userBudget < 35 && (
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
      }}>Low admit rate</span>
    )}
  </button>
);

// --- Disqualification dialog for all countries ---
const disqualDialog = showDisqualDialog && disqualCountry && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#b91c1c', marginBottom: 12 }}>
        {disqualCountry.value === 'usa'
          ? 'Low admit chances for USA with more than 10 backlogs.'
          : `Do you want to continue with ${disqualCountry.name}? This option may have a low admit rate.`}
      </div>
      <div style={{ color: '#b91c1c', fontSize: 15, marginBottom: 18 }}>{disqualReason}</div>
      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        <button style={{
          background: '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 15,
          padding: '10px 18px',
          cursor: 'pointer',
        }}
          onClick={() => { setShowDisqualDialog(false); onSelectCountry(disqualCountry.value); onContinue(); }}>
          Go ahead with {disqualCountry.name}
        </button>
        <button style={{
          background: '#f3f4f6',
          color: '#374151',
          border: '1.5px solid #e5e7eb',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 15,
          padding: '10px 18px',
          cursor: 'pointer',
        }}
          onClick={() => setShowDisqualDialog(false)}>
          Explore other country
        </button>
      </div>
    </div>
  </div>
);

// --- Main handler ---
function handleCountryClick(c, isEligible) {
  // USA + 35L + >10 backlogs: show confirmation
  if (c.value === 'usa' && userBacklogs > 10 && userBudget >= 35) {
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
  if (c.value === 'usa' && budget === 'cannot15' && usaConfirmed) {
    setShowUSAConfirm(true);
    return;
  }
  // For other countries, show confirmation dialog before proceeding
  if (c.value !== 'usa') {
    setPendingCountryConfirm(c.value);
    setShowCountryConfirm(true);
    return;
  }
  // ...rest of logic unchanged...
}

return (
  <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 800, width: '100%', padding: '24px 16px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
    {usaLimitedBudgetWarning}
    {usaBacklogConfirmDialog}
    {usaConfirmDialog}
    {countryConfirmDialog}
    {disqualDialog}
  </div>
); 