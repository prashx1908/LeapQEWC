import React, { useState } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const years = [2024, 2025, 2026];

const englishOptions = [
  { value: 'taken', icon: '✅', label: 'Taken' },
  { value: 'booked', icon: '📅', label: 'Booked' },
  { value: 'yet-to-take', icon: '🕒', label: 'Yet to take' },
  { value: 'not-sure', icon: '🤔', label: 'Not sure' },
];

const offlineCities = ['chennai', 'bangalore', 'ludhiana', 'pune'];
const bangaloreBranches = ['MG Road', 'HSR Layout'];

function Modal({ children, onClose }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 22, maxWidth: 420, width: '100%', padding: 32, boxShadow: '0 8px 32px rgba(99,102,241,0.13)', textAlign: 'center', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 22, background: 'none', border: 'none', fontSize: 28, color: '#64748b', cursor: 'pointer' }}>×</button>
        {children}
      </div>
    </div>
  );
}

export default function EnglishTestDetailsStep({ englishTestStatus, onSubmit, initial = {}, selectedCity, intake, onEditIntake }) {
  const [scores, setScores] = useState(initial.scores || { reading: '', writing: '', listening: '', speaking: '' });
  const [testDate, setTestDate] = useState(initial.testDate || '');
  const [plannedMonth, setPlannedMonth] = useState(initial.plannedMonth || '');
  const [plannedYear, setPlannedYear] = useState(initial.plannedYear || '');
  const [showCounselling, setShowCounselling] = useState(false);
  const [counsellingType, setCounsellingType] = useState('');
  const [bangaloreBranch, setBangaloreBranch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editStatus, setEditStatus] = useState(null);
  const [editTestDate, setEditTestDate] = useState('');
  const [editPlannedMonth, setEditPlannedMonth] = useState('');
  const [editPlannedYear, setEditPlannedYear] = useState('');
  const [hasSelectedStatus, setHasSelectedStatus] = useState(!!englishTestStatus);
  const [currentEnglishStatus, setCurrentEnglishStatus] = useState(englishTestStatus);

  const normalizedCity = (selectedCity || '').toLowerCase();
  console.log('EnglishTestDetailsStep: selectedCity =', selectedCity, 'normalized =', normalizedCity);

  // Force label color for this component
  const labelColorStyle = `
    .english-test-label { color: #6366f1 !important; }
  `;

  // Helper: should we show the counselling preference?
  const showCounsellingPref =
    (currentEnglishStatus === 'taken' || currentEnglishStatus === 'booked' || currentEnglishStatus === 'yet-to-take' || currentEnglishStatus === 'not-sure') &&
    offlineCities.includes(normalizedCity) &&
    submitted;

  // Helper: should we show Bangalore branch selection?
  const showBangaloreBranch =
    normalizedCity === 'bangalore' &&
    counsellingType === 'offline';

  // Map status to label
  const statusLabel = {
    taken: 'Taken',
    booked: 'Booked',
    'yet-to-take': 'Yet to take',
    'not-sure': 'Not sure',
  };

  // Handler for initial English test status selection
  const handleStatusSelect = (status) => {
    setHasSelectedStatus(true);
    setCurrentEnglishStatus(status);
    setSubmitted(false); // Reset submitted state when changing status
  };

  // Handler for test score submit
  const handleScoreSubmit = () => {
    setSubmitted(true);
    if (!offlineCities.includes(normalizedCity)) {
      onSubmit({ scores });
    }
    // Otherwise, show counselling preference below
  };

  // Handler for date submit
  const handleDateSubmit = () => {
    setSubmitted(true);
    if (!offlineCities.includes(normalizedCity)) {
      onSubmit({ testDate });
    }
  };

  // Handler for planned month/year submit
  const handlePlannedSubmit = () => {
    setSubmitted(true);
    if (!offlineCities.includes(normalizedCity)) {
      onSubmit({ plannedMonth, plannedYear });
    }
  };

  // Handler for not-sure continue
  const handleNotSureContinue = () => {
    setSubmitted(true);
    if (!offlineCities.includes(normalizedCity)) {
      onSubmit({ englishTestStatus: 'not-sure' });
    }
  };

  // Handler for final submit (after counselling selection)
  const handleFinalSubmit = () => {
    let payload = {};
    if (currentEnglishStatus === 'taken') payload.scores = scores;
    if (currentEnglishStatus === 'booked') payload.testDate = testDate;
    if (currentEnglishStatus === 'yet-to-take') {
      payload.plannedMonth = plannedMonth;
      payload.plannedYear = plannedYear;
    }
    if (currentEnglishStatus === 'not-sure') payload.englishTestStatus = 'not-sure';
    payload.counsellingType = counsellingType;
    if (showBangaloreBranch) payload.bangaloreBranch = bangaloreBranch;
    onSubmit(payload);
  };

  // Handler for changing English test status
  const handleEditStatus = (newStatus) => {
    setEditStatus(newStatus);
    if (newStatus === 'taken') {
      setShowEditModal(false);
      onSubmit({ englishTestStatus: newStatus });
    } else if (newStatus === 'not-sure') {
      setShowEditModal(false);
      // Do NOT call onSubmit here; let the main UI render the advice for 'not-sure'
    }
    // For 'booked' and 'yet-to-take', show relevant input
  };

  const handleEditSave = () => {
    if (editStatus === 'booked') {
      setShowEditModal(false);
      onSubmit({ englishTestStatus: 'booked', testDate: editTestDate });
    } else if (editStatus === 'yet-to-take') {
      setShowEditModal(false);
      onSubmit({ englishTestStatus: 'yet-to-take', plannedMonth: editPlannedMonth, plannedYear: editPlannedYear });
    }
  };

  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 className="question-title" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>English Proficiency Test</h2>
      
      {/* Initial Question Card */}
      <div style={{
        width: '100%',
        maxWidth: 440,
        margin: '0 auto',
        marginBottom: hasSelectedStatus ? 24 : 0,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        padding: '28px 24px 22px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'center' }}>Have you taken any English proficiency test?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 180px)', gap: 18, justifyContent: 'center', margin: '0 auto' }}>
          {englishOptions.map(opt => (
            <div
              key={opt.value}
              style={{
                width: 180,
                height: 120,
                background: '#fff',
                border: currentEnglishStatus === opt.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
                borderRadius: 16,
                boxShadow: currentEnglishStatus === opt.value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                fontWeight: 600,
                fontSize: 16,
                userSelect: 'none',
              }}
              onClick={() => handleStatusSelect(opt.value)}
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleStatusSelect(opt.value)}
              onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
              onMouseOut={e => e.currentTarget.style.borderColor = currentEnglishStatus === opt.value ? '#6366f1' : '#e5e7eb'}
            >
              <span style={{ fontSize: 32, marginBottom: 6 }}>{opt.icon}</span>
              <div style={{ color: '#1e293b', fontWeight: 600 }}>{opt.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Form Fold - appears below when status is selected */}
      {hasSelectedStatus && (
        <div style={{
          width: '100%',
          maxWidth: 440,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          padding: '28px 24px 22px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* Taken - Show score input form */}
          {currentEnglishStatus === 'taken' && (
            <>
              <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'center' }}>Enter Your Test Scores</h3>
              <div style={{ color: '#374151', fontSize: 16, marginBottom: 18, textAlign: 'center' }}>Please enter your English test scores (0-9)</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: '100%', marginBottom: 18 }}>
                {['reading', 'writing', 'listening', 'speaking'].map((field) => (
                  <div key={field} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label className="english-test-label" style={{ fontWeight: 600, marginBottom: 6, fontSize: 15 }}>{field.charAt(0).toUpperCase() + field.slice(1)} Score</label>
                    <input
                      type="number"
                      min={0}
                      max={9}
                      step={0.5}
                      value={scores[field]}
                      onChange={e => setScores({ ...scores, [field]: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 15, background: '#fff', color: '#1e293b' }}
                      placeholder="0-9"
                    />
                  </div>
                ))}
              </div>
              {!submitted && (
                <button
                  style={{ background: '#443eff', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginTop: 8, width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
                  onClick={handleScoreSubmit}
                >
                  Submit Scores
                </button>
              )}
            </>
          )}

          {/* Booked - Show date input form */}
          {currentEnglishStatus === 'booked' && (
            <>
              <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'center' }}>When is your test scheduled?</h3>
              <div style={{ color: '#374151', fontSize: 16, marginBottom: 18, textAlign: 'center' }}>Select Your Test Date</div>
              <input
                type="date"
                value={testDate}
                onChange={e => setTestDate(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 15, marginBottom: 18, background: '#fff', color: '#1e293b' }}
              />
              {!submitted && (
                <button
                  style={{ background: '#443eff', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginTop: 8, width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
                  onClick={handleDateSubmit}
                >
                  Continue
                </button>
              )}
            </>
          )}

          {/* Yet to take - Show planning form */}
          {currentEnglishStatus === 'yet-to-take' && (
            <>
              <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'center' }}>When are you planning to take the test?</h3>
              <div style={{ color: '#374151', fontSize: 16, marginBottom: 18, textAlign: 'center' }}>Month & Year</div>
              <div style={{ display: 'flex', gap: 16, width: '100%', marginBottom: 18 }}>
                <select value={plannedMonth} onChange={e => setPlannedMonth(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 15, background: '#fff', color: '#1e293b' }}>
                  <option value="">Select Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select value={plannedYear} onChange={e => setPlannedYear(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 15, background: '#fff', color: '#1e293b' }}>
                  <option value="">Select Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              {!submitted && (
                <button
                  style={{ background: '#443eff', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginTop: 8, width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
                  onClick={handlePlannedSubmit}
                >
                  Continue
                </button>
              )}
            </>
          )}

          {/* Not sure - Show information and continue */}
          {currentEnglishStatus === 'not-sure' && (
            <>
              <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'left' }}>Why English Proficiency Tests Matter for Study Abroad</h3>
              <div style={{ color: '#374151', fontSize: 16, marginBottom: 18, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>🎓</span> <b>University Requirement:</b> Most universities require proof of English proficiency for admission, ensuring you can handle academic coursework.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>📝</span> <b>Visa Processing:</b> Many countries require English test scores for student visa applications.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>💼</span> <b>Career Opportunities:</b> Strong English skills open doors to internships and job opportunities during and after your studies.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>🌍</span> <b>Global Recognition:</b> Tests like IELTS and TOEFL are globally recognized and valid for 2 years.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>🚀</span> <b>Academic Success:</b> Good English skills are crucial for understanding lectures, participating in discussions, and writing assignments.</div>
              </div>
              {!submitted && (
                <button
                  style={{ background: '#443eff', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginTop: 8, width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
                  onClick={handleNotSureContinue}
                >
                  Continue
                </button>
              )}
            </>
          )}

          {/* Counselling preference for offline cities */}
          {showCounsellingPref && (
            <div style={{ marginTop: 32, width: '100%', background: '#f8fafc', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(99,102,241,0.06)' }}>
              <div style={{ fontWeight: 600, color: '#6366f1', fontSize: 17, marginBottom: 10 }}>
                Your selected current city has the preference of offline counselling.
              </div>
              <div style={{ color: '#374151', fontSize: 15, marginBottom: 18 }}>
                Would you like <b>offline counselling</b> or <b>online counselling</b>?
              </div>
              <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 18 }}>
                <button
                  style={{ background: counsellingType === 'offline' ? '#3578c6' : '#fff', color: counsellingType === 'offline' ? '#fff' : '#443eff', border: '2px solid #443eff', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: counsellingType === 'offline' ? '0 2px 8px rgba(99,102,241,0.08)' : 'none', transition: 'background 0.2s' }}
                  onClick={() => setCounsellingType('offline')}
                >
                  Offline Counselling
                </button>
                <button
                  style={{ background: counsellingType === 'online' ? '#3578c6' : '#fff', color: counsellingType === 'online' ? '#fff' : '#443eff', border: '2px solid #443eff', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: counsellingType === 'online' ? '0 2px 8px rgba(99,102,241,0.08)' : 'none', transition: 'background 0.2s' }}
                  onClick={() => setCounsellingType('online')}
                >
                  Online Counselling
                </button>
              </div>
              {showBangaloreBranch && (
                <div style={{ marginTop: 18 }}>
                  <div style={{ color: '#6366f1', fontWeight: 600, marginBottom: 8 }}>Which branch do you prefer?</div>
                  <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                    {bangaloreBranches.map(branch => (
                      <button
                        key={branch}
                        style={{ background: bangaloreBranch === branch ? '#3578c6' : '#fff', color: bangaloreBranch === branch ? '#fff' : '#443eff', border: '2px solid #443eff', borderRadius: 10, padding: '10px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: bangaloreBranch === branch ? '0 2px 8px rgba(99,102,241,0.08)' : 'none', transition: 'background 0.2s' }}
                        onClick={() => setBangaloreBranch(branch)}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {counsellingType && (!showBangaloreBranch || bangaloreBranch) && (
                <button
                  style={{ marginTop: 24, background: '#443eff', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
                  onClick={handleFinalSubmit}
                >
                  Continue
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 