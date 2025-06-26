import React, { useState, useEffect } from 'react';

const degreeOptions = [
  { value: '10th', label: '10th Grade' },
  { value: '12th', label: '12th Grade' },
  { value: 'non-final-bachelors', label: "Non-Final Year Bachelor's" },
  { value: 'final-bachelors', label: "Final Year Bachelor's" },
  { value: 'completed-bachelors', label: "Bachelor's Completed" },
  { value: 'masters', label: "Master's" },
  { value: 'mbbs', label: 'MBBS' },
];
const specializationOptions = [
  { value: 'cs', label: 'Computer Science' },
  { value: 'it', label: 'Information Technology' },
  { value: 'ece', label: 'Electronics & Communication' },
  { value: 'ee', label: 'Electrical Engineering' },
  { value: 'me', label: 'Mechanical Engineering' },
  { value: 'other', label: 'Other' },
];
const gradeTypeOptions = [
  { value: 'cgpa', label: 'CGPA' },
  { value: 'percentage', label: 'Percentage' },
];
const gradeValueOptions = {
  cgpa: [
    { value: '9+', label: 'Above 9.0' },
    { value: '8-9', label: '8.0 - 8.9' },
    { value: '7-8', label: '7.0 - 7.9' },
    { value: '6-7', label: '6.0 - 6.9' },
    { value: 'below-6', label: 'Below 6.0' },
  ],
  percentage: [
    { value: '90+', label: 'Above 90%' },
    { value: '80-90', label: '80% - 90%' },
    { value: '70-80', label: '70% - 80%' },
    { value: '60-70', label: '60% - 70%' },
    { value: 'below-60', label: 'Below 60%' },
  ],
};
const backlogOptions = [
  { value: '0', label: 'No Backlogs' },
  { value: '1-2', label: '1-2 Backlogs' },
  { value: '3-5', label: '3-5 Backlogs' },
  { value: '6-10', label: '6-10 Backlogs' },
  { value: '10+', label: 'More than 10 Backlogs' },
];
const yearOptions = [
  '2027-later', '2026', '2025', '2024', '2023', '2022', '2021', '2020', 'before-2020', 'before-2005'
];
const gapOptions = [
  { value: '0', label: '0 months' },
  { value: '12', label: 'Less than 12 months' },
  { value: '24', label: '12-24 months' },
  { value: '36', label: 'More than 24 months' },
];
const jobOptions = [
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'business-analyst', label: 'Business Analyst' },
  { value: 'project-manager', label: 'Project Manager' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'other', label: 'Other' },
  { value: 'none', label: 'No Work Experience' },
];
const expDurationOptions = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1-2 years' },
  { value: '2-3', label: '2-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5+', label: 'More than 5 years' },
];
const monthOptions = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

function getDefaultDegree(highestEducation) {
  switch (highestEducation) {
    case '10th':
    case '12th':
      return 'bachelors';
    case 'non-final-bachelors':
    case 'final-bachelors':
    case 'completed-bachelors':
      return 'masters';
    case 'masters':
      return 'phd';
    case 'mbbs':
      return 'masters';
    default:
      return '';
  }
}

const btnStyle = isActive => ({
  padding: '8px 24px',
  borderRadius: 8,
  border: isActive ? '2px solid #6366f1' : '1.5px solid #e5e7eb',
  background: isActive ? 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)' : '#fff',
  color: isActive ? '#fff' : '#3730a3',
  fontWeight: 600,
  fontSize: 15,
  marginRight: 16,
  cursor: 'pointer',
  boxShadow: isActive ? '0 2px 8px rgba(99,102,241,0.10)' : 'none',
  outline: 'none',
  transition: 'all 0.15s',
});

const selectWrapperStyle = {
  display: 'inline-block',
  position: 'relative',
  minWidth: 140,
  margin: '0 4px',
  verticalAlign: 'middle',
};
const selectStyle = {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  padding: '8px 32px 8px 12px',
  borderRadius: 8,
  border: '1.5px solid #c7d2fe',
  fontSize: 15,
  background: '#f8fafc',
  color: '#1e293b',
  minWidth: 120,
  fontWeight: 500,
  boxShadow: '0 1px 2px rgba(99,102,241,0.04)',
  outline: 'none',
  transition: 'border 0.2s',
};
const arrowStyle = {
  position: 'absolute',
  right: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  fontSize: 16,
  color: '#6366f1',
};

// Add styles for the grid and form groups
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '18px 24px',
  marginBottom: 18,
};
const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
};
const labelStyle = {
  fontSize: 14,
  color: '#6366f1',
  marginBottom: 6,
  fontWeight: 600,
};
const inputStyle = {
  padding: '10px 12px',
  borderRadius: 8,
  border: '1.5px solid #e5e7eb',
  fontSize: 15,
  background: '#fff',
  color: '#1e293b',
  width: '100%',
  boxSizing: 'border-box',
};

const workExpOptions = [
  { value: '0', label: '0 years' },
  { value: '1', label: '1 year' },
  { value: '2', label: '2 years' },
  { value: '3', label: '3 years' },
  { value: '4', label: '4 years' },
  { value: '5+', label: '5+ years' },
];

const AcademicDetailsStep = ({ highestEducation, initialDetails = {}, onSubmit }) => {
  const [degree] = useState(highestEducation);
  const [specialization, setSpecialization] = useState(initialDetails.specialization || '');
  const [gradeType, setGradeType] = useState(initialDetails.gradeType || '');
  const [gradeValue, setGradeValue] = useState(initialDetails.gradeValue || '');
  const [backlogs, setBacklogs] = useState(initialDetails.backlogs || '');
  const [graduationYear, setGraduationYear] = useState(initialDetails.graduationYear || '');
  const [graduationMonth, setGraduationMonth] = useState(initialDetails.graduationMonth || '');
  const [gap, setGap] = useState(initialDetails.gap || '');
  const [gapDoc, setGapDoc] = useState(initialDetails.gapDoc || '');
  const [job, setJob] = useState(initialDetails.job || '');
  const [expDuration, setExpDuration] = useState(initialDetails.expDuration || '');
  const [showGap, setShowGap] = useState(false);
  const [showGapDoc, setShowGapDoc] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showExpDuration, setShowExpDuration] = useState(false);
  const [jobSpecializations, setJobSpecializations] = useState(initialDetails.jobSpecializations || []);
  const [workExp, setWorkExp] = useState(initialDetails.workExp || '');
  const [showSpecDropdown, setShowSpecDropdown] = useState(false);

  const currentYear = new Date().getFullYear();
  const showMonth = graduationYear && Number(graduationYear) >= currentYear;

  useEffect(() => {
    if (graduationYear) setShowGap(true);
  }, [graduationYear]);
  useEffect(() => {
    if (gap === '36') setShowGapDoc(true);
    else setShowGapDoc(false);
    if (gap) setShowWork(true);
  }, [gap]);
  useEffect(() => {
    if (job && job !== 'none') setShowExpDuration(true);
    else setShowExpDuration(false);
  }, [job]);
  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.spec-dropdown-root')) {
        setShowSpecDropdown(false);
      }
    }
    if (showSpecDropdown) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSpecDropdown]);

  const handleContinue = () => {
    onSubmit({
      degree,
      specialization,
      gradeType,
      gradeValue: gradeValue !== '' ? Number(gradeValue) : '',
      backlogs: backlogs !== '' ? Number(backlogs) : '',
      graduationYear: graduationYear !== '' ? Number(graduationYear) : '',
      graduationMonth: graduationMonth || '',
      gap,
      gapDoc,
      job,
      expDuration,
    });
  };

  const storyItemStyle = { marginRight: 16, marginBottom: 10, display: 'inline-block', verticalAlign: 'middle' };

  // Intake recommendation logic
  function getRecommendedIntake(year, month) {
    if (!year) return null;
    if (year === '2027-later') return '2027-later'; // <-- Fix here
    if (!month) return null;
  
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
  
    if (m >= 1 && m <= 5) return `Fall ${y}`;
    if (m >= 6 && m <= 8) return `Spring ${y}`;
    return `Next available intake after ${month}/${y}`;
  }
  const recommendedIntake = getRecommendedIntake(graduationYear, graduationMonth);

  return (
    <div style={{ minHeight: '70vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div className="question-card" style={{
        maxWidth: 540,
        width: '100%',
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 32,
        boxShadow: '0 8px 32px rgba(74,144,226,0.10)',
        padding: '40px 32px 32px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        position: 'relative',
        textAlign: 'left',
        gap: 0,
      }}>
        <h2 className="question-title" style={{ fontSize: 24, fontWeight: 800, color: '#443eff', marginBottom: 8, letterSpacing: '-0.01em', textAlign: 'center' }}>Your Academic Journey</h2>
        <div className="question-subtitle" style={{ fontSize: 16, color: '#888', marginBottom: 24, fontWeight: 500, textAlign: 'center' }}>Let's understand your educational background</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleContinue();
          }}
          style={{ width: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}
        >
          <div style={{
            background: '#f8f6f3',
            borderRadius: 18,
            boxShadow: '0 2px 8px rgba(74,144,226,0.06)',
            padding: '28px 18px',
            marginBottom: 24,
            width: '100%',
            fontSize: 17,
            color: '#555',
            lineHeight: 2.2,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <span>
              <span role="img" aria-label="degree">🎓</span> 
              {['completed-bachelors', 'masters', 'mbbs'].includes(degree) ? (
                <>
                  I have completed / Pursuing <b>{degreeOptions.find(opt => opt.value === degree)?.label.replace(' Completed', '')}</b> and 
                </>
              ) : (
                <>
                  I am pursuing <b>{degreeOptions.find(opt => opt.value === degree)?.label.replace(' Completed', '')}</b>
                </>
              )}
            </span>
            <span>
              <span role="img" aria-label="specialization">🔬</span> My specialization is
              <select style={{ ...selectStyle, minWidth: 120, fontSize: 16, borderRadius: 10, margin: '0 8px' }} value={specialization} onChange={e => setSpecialization(e.target.value)} required>
                <option value="">Specialization</option>
                {specializationOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </span>
            <span>
              <span role="img" aria-label="grade">📊</span> My grade type is
              <select style={{ ...selectStyle, minWidth: 120, fontSize: 16, borderRadius: 10, margin: '0 8px' }} value={gradeType} onChange={e => setGradeType(e.target.value)} required>
                <option value="">Grade Type</option>
                {gradeTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              and I have
              <input
                type="number"
                style={{ ...selectStyle, minWidth: 80, fontSize: 16, borderRadius: 10, margin: '0 8px', width: 120 }}
                value={gradeValue}
                onChange={e => setGradeValue(e.target.value)}
                required
                min={0}
                max={gradeType === 'cgpa' ? 10 : 100}
                step={gradeType === 'cgpa' ? 0.01 : 1}
                placeholder={gradeType === 'cgpa' ? 'e.g. 8.5' : 'e.g. 85'}
              />
              {gradeType === 'cgpa' && <span style={{ marginLeft: 4, fontWeight: 600, color: '#555' }}>CGPA</span>}
              {gradeType === 'percentage' && <span style={{ marginLeft: 4, fontWeight: 600, color: '#555' }}>%</span>}
            </span>
            <span>
              <span role="img" aria-label="backlogs">📚</span> I have
              <input
                type="number"
                style={{ ...selectStyle, minWidth: 60, fontSize: 16, borderRadius: 10, margin: '0 8px', width: 80 }}
                value={backlogs}
                onChange={e => setBacklogs(e.target.value)}
                required
                min={0}
                max={50}
                step={1}
                placeholder="0"
              />
              backlogs
            </span>
            <span>
              <span role="img" aria-label="graduation">🎓</span> I Graduated or I am graduating in
              <select style={{ ...selectStyle, minWidth: 120, fontSize: 16, borderRadius: 10, margin: '0 8px' }} value={graduationYear} onChange={e => { setGraduationYear(e.target.value); setGraduationMonth(''); }} required>
                <option value="">Year</option>
                {yearOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === '2027-later' ? '2027 or later' : opt.replace('-', ' ')}</option>
                ))}
              </select>
              {showMonth && (
                <>
               
                  <select style={{ ...selectStyle, minWidth: 120, fontSize: 16, borderRadius: 10, margin: '0 8px' }} value={graduationMonth} onChange={e => setGraduationMonth(e.target.value)} required>
                    <option value="">Month</option>
                    {monthOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </>
              )}
            </span>
            {showGap && (
              <span>
                <span role="img" aria-label="gap">⏳</span> I have a gap year of
                <select style={{ ...selectStyle, minWidth: 140, fontSize: 16, borderRadius: 10, margin: '0 8px', width: 180 }} value={gap} onChange={e => setGap(e.target.value)} required>
                  <option value="" disabled>Select gap</option>
                  <option value="0">No gap</option>
                  <option value="12">Less than 12 months</option>
                  <option value="24">12-24 months</option>
                  <option value="36">24+ months</option>
                </select>
              </span>
            )}
            {gap === '36' && (
              <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: 8 }}>
                <span role="img" aria-label="document">📄</span> Do you have valid documents to justify the gap?
                <span style={{ display: 'inline-flex', gap: 10, marginLeft: 4, verticalAlign: 'middle' }}>
                  <button
                    type="button"
                    onClick={() => setGapDoc('yes')}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 20,
                      border: gapDoc === 'yes' ? '2px solid #443eff' : '1.5px solid #c7d2fe',
                      background: gapDoc === 'yes' ? '#443eff' : '#fff',
                      color: gapDoc === 'yes' ? '#fff' : '#1e293b',
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: 'pointer',
                      boxShadow: gapDoc === 'yes' ? '0 2px 8px rgba(74,144,226,0.10)' : 'none',
                      outline: 'none',
                      transition: 'all 0.15s',
                      minWidth: 60,
                      maxWidth: 90,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setGapDoc('no')}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 20,
                      border: gapDoc === 'no' ? '2px solid #dc2626' : '1.5px solid #c7d2fe',
                      background: gapDoc === 'no' ? '#dc2626' : '#fff',
                      color: gapDoc === 'no' ? '#fff' : '#1e293b',
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: 'pointer',
                      boxShadow: gapDoc === 'no' ? '0 2px 8px rgba(220,38,38,0.10)' : 'none',
                      outline: 'none',
                      transition: 'all 0.15s',
                      minWidth: 60,
                      maxWidth: 90,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    No
                  </button>
                </span>
              </span>
            )}
            {showWork && (
              <span>
                <span role="img" aria-label="work">💼</span> I have a work experience of
                <select style={{ ...selectStyle, minWidth: 140, fontSize: 16, borderRadius: 10, margin: '0 8px', width: 170 }} value={workExp} onChange={e => setWorkExp(e.target.value)} required>
                  <option value="" disabled>Select no. of years</option>
                  <option value="0">0 years</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </span>
            )}
            {showWork && workExp && workExp !== '0' && (
              <span style={{ display: 'block', marginTop: 8 }}>
                with specialization in
                <div className="spec-dropdown-root" style={{ position: 'relative', display: 'inline-block', minWidth: 180 }}>
                  <button
                    type="button"
                    style={{
                      border: '1.5px solid #c7d2fe',
                      borderRadius: 10,
                      background: '#f8fafc',
                      padding: '10px 12px',
                      minWidth: 180,
                      margin: '8px 0',
                      fontSize: 15,
                      fontWeight: 500,
                      color: '#1e293b',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: '0 1px 2px rgba(99,102,241,0.04)',
                      maxWidth: 320,
                      width: '100%',
                    }}
                    onClick={() => setShowSpecDropdown(v => !v)}
                  >
                    {jobSpecializations.length > 0
                      ? jobOptions.filter(opt => jobSpecializations.includes(opt.value)).map(opt => opt.label).join(', ')
                      : 'Select specializations'}
                    <span style={{ float: 'right', marginLeft: 8, color: '#6366f1' }}>▼</span>
                  </button>
                  {showSpecDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 10,
                        background: '#fff',
                        border: '1.5px solid #c7d2fe',
                        borderRadius: 10,
                        boxShadow: '0 4px 16px rgba(99,102,241,0.10)',
                        marginTop: 2,
                        maxHeight: 200,
                        overflowY: 'auto',
                        minWidth: 180,
                        width: '100%',
                      }}
                    >
                      {jobOptions.filter(opt => opt.value !== 'none').map(opt => (
                        <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px', cursor: 'pointer', fontSize: 15 }}>
                          <input
                            type="checkbox"
                            checked={jobSpecializations.includes(opt.value)}
                            onChange={() => {
                              if (jobSpecializations.includes(opt.value)) {
                                setJobSpecializations(jobSpecializations.filter(j => j !== opt.value));
                              } else {
                                setJobSpecializations([...jobSpecializations, opt.value]);
                              }
                            }}
                            style={{ accentColor: '#6366f1', width: 18, height: 18 }}
                          />
                          <span style={{ fontWeight: 500 }}>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </span>
            )}
          </div>
          <button
            type="submit"
            style={{
              background: '#443eff',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '15px 0',
              fontSize: 17,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(74,144,226,0.08)',
              transition: 'CGPA 0.2s',
              letterSpacing: 1,
              width: '100%',
              marginTop: 18,
              minWidth: 0,
              maxWidth: 340,
            }}
          >
            Continue to Financial Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcademicDetailsStep; 