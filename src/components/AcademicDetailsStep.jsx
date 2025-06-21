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
  { value: 'cgpa', label: 'CGPA of' },
  { value: 'percentage', label: 'Percentage of' },
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
  '2026', '2025', '2024', '2023', '2022', '2021', '2020', 'before-2020'
];
const gapOptions = [
  { value: '0', label: 'No gap' },
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
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
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

  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="question-card" style={{ maxWidth: 520, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '36px 32px', margin: '0 auto', position: 'relative', textAlign: 'left' }}>
        <h2 className="question-title" style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: '#3730a3', textAlign: 'left' }}>Your Academic Journey</h2>
        <div className="question-subtitle" style={{ fontSize: 16, color: '#6366f1', marginBottom: 28, textAlign: 'left', lineHeight: 1.6 }}>Let's understand your educational background</div>
        {/* Story-style Academic Details */}
        <div className="story-section" style={{ marginBottom: 28, fontSize: 16, color: '#374151', lineHeight: 2 }}>
          <div style={{ marginBottom: 10 }}>
            My degree is
            <span style={selectWrapperStyle}>
              <select value={degree} disabled style={inputStyle}>
                {degreeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <span style={arrowStyle}>▼</span>
            </span>
          </div>
          <div style={{ marginBottom: 10 }}>
            I specialized in
            <span style={selectWrapperStyle}>
              <select value={specialization} onChange={e => setSpecialization(e.target.value)} style={inputStyle}>
                <option value="">Select Specialization</option>
                {specializationOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <span style={arrowStyle}>▼</span>
            </span>
          </div>
          <div style={{ marginBottom: 10 }}>
            My grade type is
            <span style={selectWrapperStyle}>
              <select value={gradeType} onChange={e => { setGradeType(e.target.value); setGradeValue(''); }} style={inputStyle}>
                <option value="">Select Grade Type</option>
                {gradeTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <span style={arrowStyle}>▼</span>
            </span>
            with a grade of
            <input
              type="number"
              value={gradeValue}
              onChange={e => setGradeValue(e.target.value)}
              min={gradeType === 'cgpa' ? 0 : 0}
              max={gradeType === 'cgpa' ? 10 : 100}
              step={gradeType === 'cgpa' ? 0.01 : 1}
              placeholder={gradeType === 'cgpa' ? 'CGPA' : 'Percentage'}
              style={{ ...inputStyle, width: 90, display: 'inline-block', margin: '0 8px' }}
              disabled={!gradeType}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            I have
            <input
              type="number"
              value={backlogs}
              onChange={e => setBacklogs(e.target.value)}
              min={0}
              max={99}
              step={1}
              placeholder="Backlogs"
              style={{ ...inputStyle, width: 60, display: 'inline-block', margin: '0 8px' }}
            />
            backlogs
          </div>
          <div style={{ marginBottom: 10 }}>
            I will be graduating by
            <input
              type="number"
              value={graduationYear}
              onChange={e => setGraduationYear(e.target.value)}
              min={1950}
              max={new Date().getFullYear() + 1}
              step={1}
              placeholder="Year"
              style={{ ...inputStyle, width: 90, display: 'inline-block', margin: '0 8px' }}
            />
            {['2025', '2026'].includes(String(graduationYear)) && (
              <span style={selectWrapperStyle}>
                <select value={graduationMonth} onChange={e => setGraduationMonth(e.target.value)} style={inputStyle}>
                  <option value="">Select Month</option>
                  {monthOptions.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <span style={arrowStyle}>▼</span>
              </span>
            )}
          </div>
        </div>
        {/* Year Gap Section */}
        {showGap && (
          <div className="story-section" style={{ marginBottom: 28 }}>
            <div className="story-header" style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <span className="story-icon" style={{ fontSize: 22, marginRight: 10 }}>⏳</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 }}>Year Gap</h3>
            </div>
            <div className="story-container" style={{ fontSize: 16, color: '#374151', lineHeight: 2, paddingLeft: 2 }}>
              I had a career gap of
              <span style={selectWrapperStyle}>
                <select value={gap} onChange={e => setGap(e.target.value)} style={selectStyle}>
                  <option value="">Select Gap</option>
                  {gapOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <span style={arrowStyle}>▼</span>
              </span>
              {showGapDoc && (
                <div style={{ marginTop: 18, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 18 }}>
                  <span style={{ fontWeight: 500, color: '#3730a3', fontSize: 15 }}>Do you have documentation for your gap?</span>
                  <button
                    type="button"
                    style={btnStyle(gapDoc === 'yes')}
                    onClick={() => setGapDoc('yes')}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    style={btnStyle(gapDoc === 'no')}
                    onClick={() => setGapDoc('no')}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Work Experience Section */}
        {showWork && (
          <div className="story-section" style={{ marginBottom: 28 }}>
            <div className="story-header" style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <span className="story-icon" style={{ fontSize: 22, marginRight: 10 }}>💼</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 }}>Work Experience</h3>
            </div>
            <div className="story-container" style={{ fontSize: 16, color: '#374151', lineHeight: 2, paddingLeft: 2 }}>
              I worked as
              <span style={selectWrapperStyle}>
                <select value={job} onChange={e => setJob(e.target.value)} style={selectStyle}>
                  <option value="">Select Job Title</option>
                  {jobOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <span style={arrowStyle}>▼</span>
              </span>
              {showExpDuration && (
                <>
                  for
                  <span style={selectWrapperStyle}>
                    <select value={expDuration} onChange={e => setExpDuration(e.target.value)} style={selectStyle}>
                      <option value="">Select Duration</option>
                      {expDurationOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    <span style={arrowStyle}>▼</span>
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        <button
          onClick={handleContinue}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '15px 0',
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 12,
            width: '100%',
            boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            transition: 'background 0.2s',
            letterSpacing: 1,
          }}
        >
          CONTINUE TO FINANCIAL ASSESSMENT
        </button>
      </div>
    </div>
  );
};

export default AcademicDetailsStep; 