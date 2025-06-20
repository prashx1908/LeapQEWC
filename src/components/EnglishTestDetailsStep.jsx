import React, { useState } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const years = [2024, 2025, 2026];

const offlineCities = ['chennai', 'bangalore', 'ludhiana', 'pune'];
const bangaloreBranches = ['MG Road', 'HSR Layout'];

export default function EnglishTestDetailsStep({ englishTestStatus, onSubmit, initial = {}, selectedCity, intake, onEditIntake }) {
  const [scores, setScores] = useState(initial.scores || { reading: '', writing: '', listening: '', speaking: '' });
  const [testDate, setTestDate] = useState(initial.testDate || '');
  const [plannedMonth, setPlannedMonth] = useState(initial.plannedMonth || '');
  const [plannedYear, setPlannedYear] = useState(initial.plannedYear || '');
  const [showCounselling, setShowCounselling] = useState(false);
  const [counsellingType, setCounsellingType] = useState('');
  const [bangaloreBranch, setBangaloreBranch] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const normalizedCity = (selectedCity || '').toLowerCase();
  console.log('EnglishTestDetailsStep: selectedCity =', selectedCity, 'normalized =', normalizedCity);

  // Force label color for this component
  const labelColorStyle = `
    .english-test-label { color: #6366f1 !important; }
  `;

  // Helper: should we show the counselling preference?
  const showCounsellingPref =
    (englishTestStatus === 'taken' || englishTestStatus === 'booked' || englishTestStatus === 'yet-to-take' || englishTestStatus === 'not-sure') &&
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
    if (englishTestStatus === 'taken') payload.scores = scores;
    if (englishTestStatus === 'booked') payload.testDate = testDate;
    if (englishTestStatus === 'yet-to-take') {
      payload.plannedMonth = plannedMonth;
      payload.plannedYear = plannedYear;
    }
    if (englishTestStatus === 'not-sure') payload.englishTestStatus = 'not-sure';
    payload.counsellingType = counsellingType;
    if (showBangaloreBranch) payload.bangaloreBranch = bangaloreBranch;
    onSubmit(payload);
  };

  // Show summary and edit button at the top
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: 18, background: '#f3f4f6', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ color: '#6366f1', fontWeight: 600, fontSize: 15 }}>
          You selected: <span style={{ color: '#3730a3', fontWeight: 700 }}>{statusLabel[englishTestStatus] || '—'}</span>. Based on this, we're asking the following.
        </div>
        <button
          type="button"
          style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 600, fontSize: 15, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          onClick={onEditIntake}
        >
          Edit
        </button>
      </div>
      {englishTestStatus === 'taken' && (
        <div style={{ maxWidth: 420, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '40px 32px 32px 32px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <style>{labelColorStyle}</style>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Enter Your Test Scores</h2>
          <div style={{ color: '#374151', fontSize: 16, marginBottom: 18 }}>Please enter your English test scores (0-9)</div>
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
              style={{ background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginTop: 8, width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
              onClick={handleScoreSubmit}
            >
              Submit Scores
            </button>
          )}
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
                  style={{ background: counsellingType === 'offline' ? 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)' : '#fff', color: counsellingType === 'offline' ? '#fff' : '#6366f1', border: '2px solid #6366f1', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: counsellingType === 'offline' ? '0 2px 8px rgba(99,102,241,0.08)' : 'none', transition: 'background 0.2s' }}
                  onClick={() => setCounsellingType('offline')}
                >
                  Offline Counselling
                </button>
                <button
                  style={{ background: counsellingType === 'online' ? 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)' : '#fff', color: counsellingType === 'online' ? '#fff' : '#6366f1', border: '2px solid #6366f1', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: counsellingType === 'online' ? '0 2px 8px rgba(99,102,241,0.08)' : 'none', transition: 'background 0.2s' }}
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
                        style={{ background: bangaloreBranch === branch ? 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)' : '#fff', color: bangaloreBranch === branch ? '#fff' : '#6366f1', border: '2px solid #6366f1', borderRadius: 10, padding: '10px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: bangaloreBranch === branch ? '0 2px 8px rgba(99,102,241,0.08)' : 'none', transition: 'background 0.2s' }}
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
                  style={{ marginTop: 24, background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
                  onClick={handleFinalSubmit}
                >
                  Continue
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {englishTestStatus === 'booked' && (
        <div style={{ maxWidth: 420, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '40px 32px 32px 32px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>When is your test scheduled?</h2>
          <div style={{ color: '#374151', fontSize: 16, marginBottom: 18 }}>Select Your Test Date</div>
          <input
            type="date"
            value={testDate}
            onChange={e => setTestDate(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 15, marginBottom: 18, background: '#fff', color: '#1e293b' }}
          />
          <button
            style={{ background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginTop: 8, width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
            onClick={handleDateSubmit}
          >
            Continue
          </button>
        </div>
      )}
      {englishTestStatus === 'yet-to-take' && (
        <div style={{ maxWidth: 420, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '40px 32px 32px 32px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>When are you planning to take the test?</h2>
          <div style={{ color: '#374151', fontSize: 16, marginBottom: 18 }}>Month & Year</div>
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
          <button
            style={{ background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginTop: 8, width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
            onClick={handlePlannedSubmit}
          >
            Continue
          </button>
        </div>
      )}
      {englishTestStatus === 'not-sure' && (
        <div style={{ maxWidth: 480, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '40px 32px 32px 32px', margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Why English Proficiency Tests Matter for Study Abroad</h2>
          <div style={{ color: '#374151', fontSize: 16, marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>🎓</span> <b>University Requirement:</b> Most universities require proof of English proficiency for admission, ensuring you can handle academic coursework.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>📝</span> <b>Visa Processing:</b> Many countries require English test scores for student visa applications.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>💼</span> <b>Career Opportunities:</b> Strong English skills open doors to internships and job opportunities during and after your studies.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>🌍</span> <b>Global Recognition:</b> Tests like IELTS and TOEFL are globally recognized and valid for 2 years.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><span style={{ fontSize: 22 }}>🚀</span> <b>Academic Success:</b> Good English skills are crucial for understanding lectures, participating in discussions, and writing assignments.</div>
          </div>
          {!submitted && (
            <button
              style={{ marginTop: 24, background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', width: '100%', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', transition: 'background 0.2s', letterSpacing: 1 }}
              onClick={handleNotSureContinue}
            >
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
} 