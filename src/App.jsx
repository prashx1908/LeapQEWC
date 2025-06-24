import React, { useRef, useState, useEffect } from 'react';
import EducationLevelStep from './components/EducationLevelStep';
import ProgramSelectionStep from './components/ProgramSelectionStep';
import CountrySelectionStep from './components/CountrySelectionStep';
import IntakeSelectionStep from './components/IntakeSelectionStep';
import EnglishPassportStep from './components/EnglishPassportStep';
import CitySelectionStep from './components/CitySelectionStep';
import PhoneOtpStep from './components/PhoneOtpStep';
import CompletionStep, { WarmDisqualificationStep } from './components/CompletionStep';
import AcademicDetailsStep from './components/AcademicDetailsStep';
import AcademicJourneyComplete from './components/AcademicJourneyComplete';
import BudgetStep from './components/BudgetStep';
import FinanceStep from './components/FinanceStep';
import UniversityPreferenceStep from './components/UniversityPreferenceStep';
import ApplicationTimelineStep from './components/ApplicationTimelineStep';
import EnglishTestDetailsStep from './components/EnglishTestDetailsStep';
import ContactDetailsStep from './components/ContactDetailsStep';
import WarmDisqualificationPage from './components/WarmDisqualificationPage';
import './App.css';

// Mapping of education to recommended programs (from your script.js)
const programOptionsMap = {
  '10th': [
    { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓', recommended: true },
    { value: 'masters', label: "Master's Degree", icon: '🎯', disabled: true },
    { value: 'mba', label: "MBA Program", icon: '💼', disabled: true },
    { value: 'phd', label: "PhD Program", icon: '🔬', disabled: true }
  ],
  '12th': [
    { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓', recommended: true },
    { value: 'diploma', label: "PG Diploma", icon: '📜', disabled: true },
    { value: 'masters', label: "Master's Degree", icon: '🎯', disabled: true },
    { value: 'mba', label: "MBA Program", icon: '💼', disabled: true },
    { value: 'phd', label: "PhD Program", icon: '🔬', disabled: true }
  ],
  'non-final-bachelors': [
    { value: 'masters', label: "Master's Degree", icon: '🎯', recommended: true },
    { value: 'mba', label: "MBA Program", icon: '💼', recommended: true },
    { value: 'bachelors', label: "Another Bachelor's", icon: '🎓' },
    { value: 'diploma', label: "PG Diploma", icon: '📜' },
    { value: 'phd', label: "PhD Program", icon: '🔬' }
  ],
  'final-bachelors': [
    { value: 'masters', label: "Master's Degree", icon: '🎯', recommended: true },
    { value: 'mba', label: "MBA Program", icon: '💼', recommended: true },
    { value: 'bachelors', label: "Another Bachelor's", icon: '🎓' },
    { value: 'diploma', label: "PG Diploma", icon: '📜' },
    { value: 'phd', label: "PhD Program", icon: '🔬' }
  ],
  'completed-bachelors': [
    { value: 'masters', label: "Master's Degree", icon: '🎯', recommended: true },
    { value: 'mba', label: "MBA Program", icon: '💼', recommended: true },
    { value: 'bachelors', label: "Another Bachelor's", icon: '🎓' },
    { value: 'diploma', label: "PG Diploma", icon: '📜' },
    { value: 'phd', label: "PhD Program", icon: '🔬' }
  ],
  'masters': [
    { value: 'phd', label: "PhD Program", icon: '🔬', recommended: true },
    { value: 'masters', label: "Another Master's", icon: '🎯' },
    { value: 'mba', label: "MBA Program", icon: '💼' },
    { value: 'diploma', label: "PG Diploma", icon: '📜' },
    { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓', disabled: true }
  ],
  'mbbs': [
    { value: 'masters', label: "Master's in Medicine", icon: '🎯', recommended: true },
    { value: 'specialization', label: "Medical Specialization", icon: '⚕️', recommended: true },
    { value: 'phd', label: "PhD in Medicine", icon: '🔬' },
    { value: 'mba', label: "Healthcare MBA", icon: '💼' },
    { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓', disabled: true }
  ]
};

const logoUrl = 'https://leapassets.s3.ap-south-1.amazonaws.com/ielts-recording/1619511191304-logo@2x_(1)_(1).png';

// Example university lists (should be replaced with real data)
const universityData = {
  usa: [
    { id: 'mit', name: 'Massachusetts Institute of Technology', icon: '🎓', rank: '#1' },
    { id: 'stanford', name: 'Stanford University', icon: '🎓', rank: '#2' },
    { id: 'harvard', name: 'Harvard University', icon: '🎓', rank: '#3' },
    { id: 'berkeley', name: 'University of California, Berkeley', icon: '🎓', rank: '#4' },
    { id: 'cmu', name: 'Carnegie Mellon University', icon: '🎓', rank: '#5' },
    // ... more ...
  ],
  uk: [
    { id: 'oxford', name: 'University of Oxford', icon: '🎓', rank: '#1' },
    { id: 'cambridge', name: 'University of Cambridge', icon: '🎓', rank: '#2' },
    { id: 'imperial', name: 'Imperial College London', icon: '🎓', rank: '#3' },
    // ... more ...
  ],
  canada: [
    { id: 'toronto', name: 'University of Toronto', icon: '🎓', rank: '#1' },
    { id: 'ubc', name: 'University of British Columbia', icon: '🎓', rank: '#2' },
    // ... more ...
  ],
  any: [
    // Top universities from multiple countries (long list for scroll)
    { id: 'mit', name: 'Massachusetts Institute of Technology', icon: '🎓', rank: 'USA #1' },
    { id: 'stanford', name: 'Stanford University', icon: '🎓', rank: 'USA #2' },
    { id: 'oxford', name: 'University of Oxford', icon: '🎓', rank: 'UK #1' },
    { id: 'cambridge', name: 'University of Cambridge', icon: '🎓', rank: 'UK #2' },
    { id: 'toronto', name: 'University of Toronto', icon: '🎓', rank: 'Canada #1' },
    { id: 'ubc', name: 'University of British Columbia', icon: '🎓', rank: 'Canada #2' },
    // ... add many more for scroll ...
  ],
  // ... add more countries as needed ...
};

function FinalCongratulationsPage({ universityCount = 42 }) {
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 10, animation: 'bounce 1.2s' }}>🎉</div>
      <h2 className="completion-title" style={{ fontSize: 24, fontWeight: 900, color: '#443eff', marginBottom: 18, letterSpacing: '-0.01em' }}>Profile Evaluation Completed!</h2>
      {/* Timeline Milestones (copied style from CompletionStep) */}
      <div style={{
        width: '100%',
        background: 'rgba(245,247,250,0.98)',
        borderRadius: 28,
        padding: '32px 32px 24px 32px',
        margin: '0 0 24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 1px 8px rgba(74,144,226,0.10)',
        gap: 0,
      }}>
        {/* Milestone 1: Onboarding - Completed */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 18,
          background: '#e6f9ed',
          borderRadius: 16,
          padding: '16px 10px',
          boxShadow: '0 1px 4px rgba(39,174,96,0.07)',
          border: '2.5px solid #4ade80',
          position: 'relative',
          transition: 'box-shadow 0.2s',
        }}>
          <span style={{ fontSize: 28, color: '#22c55e', marginLeft: 2 }}>🔓</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#22c55e' }}>Milestone 1: Onboarding <span style={{ fontWeight: 700, fontSize: 14, color: '#16a34a' }}>- Completed</span></div>
            <div style={{ fontSize: 15, color: '#15803d', marginTop: 2, fontWeight: 600 }}>Rewards unlocked: <span style={{ color: '#059669' }}>Complete Country guide sent on your WhatsApp</span></div>
          </div>
          <span style={{ fontSize: 22, color: '#22c55e', marginLeft: 8 }}>→</span>
        </div>
        {/* Milestone 2: Profile Evaluation - Completed (now green, unlocked, with rewards) */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 18,
          background: '#e6f9ed',
          borderRadius: 16,
          padding: '16px 10px',
          boxShadow: '0 1px 4px rgba(39,174,96,0.07)',
          border: '2.5px solid #4ade80',
          position: 'relative',
          transition: 'box-shadow 0.2s',
        }}>
          <span style={{ fontSize: 28, color: '#22c55e', marginLeft: 2 }}>🔓</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#16a34a' }}>Milestone 2: Profile Evaluation <span style={{ fontWeight: 700, fontSize: 14, color: '#16a34a' }}>- Completed</span></div>
            <div style={{ fontSize: 15, color: '#15803d', marginTop: 2, fontWeight: 600 }}>Rewards unlocked: <span style={{ color: '#059669' }}>Detailed profile evaluation sent on your WhatsApp</span></div>
            <ul style={{ margin: '8px 0 0 0', padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                <span style={{ fontSize: 18, color: '#443eff', marginRight: 8 }}>🎯</span>
                <span style={{ fontSize: 15, color: '#0369a1', fontWeight: 600 }}>Get your detailed profile evaluation completed.</span>
              </li>
            </ul>
          </div>
          <span style={{ fontSize: 22, color: '#22c55e', marginLeft: 8 }}>→</span>
        </div>
        {/* Milestone 3: Get university shortlist (active, blue border, uniform style) */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 10,
          background: '#f3f4f6',
          borderRadius: 16,
          padding: '16px 10px',
          boxShadow: '0 1px 4px rgba(74,144,226,0.04)',
          border: '2.5px solid #6366f1',
          opacity: 1,
          position: 'relative',
          minHeight: 80,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, width: '100%' }}>
            <span style={{ fontSize: 28, color: '#6366f1', marginLeft: 2, marginTop: 2 }}>🔵</span>
            <div style={{ flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#6366f1', marginBottom: 2 }}>
                Milestone 3: University Shortlisting <span style={{ fontWeight: 700, fontSize: 14, color: '#6366f1' }}>- Pending</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 15, fontWeight: 500 }}>
                Get your personalized university shortlist and next steps.
              </div>
            </div>
          </div>
          <button
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              marginTop: 18,
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              letterSpacing: 0.2,
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
              width: '100%',
              alignSelf: 'center',
            }}
            onClick={() => window.open('https://calendly.com/leapcounselor', '_blank')}
          >
            Book a call with counsellor
          </button>
        </div>
      </div>
      {/* What's Next Section and report buttons as before */}
      
      {/* Leap Scholar branding and stats as a regular container at the bottom */}
      <div style={{
        width: '100%',
        maxWidth: 650,
        margin: '40px auto 0 auto',
        background: 'rgba(74,144,226,0.07)',
        borderRadius: 18,
        padding: '24px 18px',
        boxShadow: '0 1px 4px rgba(74,144,226,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <img 
            src="https://leapassets.s3.ap-south-1.amazonaws.com/ielts-recording/1619511191304-logo@2x_(1)_(1).png" 
            alt="Leap Scholar" 
            style={{ height: 38, borderRadius: 8, background: '#fff', padding: 6 }} 
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 18, color: '#1F2937', fontWeight: 800, marginBottom: 2 }}>
              Leap Scholar
            </div>
            <div style={{ fontSize: 15, color: '#443eff', fontWeight: 600 }}>
              Trusted by 100,000+ students AND PARENTS worldwide
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#059669' }}>100K+</div>
            <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>Students Helped</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#DC2626' }}>50+</div>
            <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>Countries</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#7C3AED' }}>95%</div>
            <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>Success Rate</div>
          </div>
        </div>
      </div>
    </div>
    
  );
  
}


const TOTAL_STEPS = 12;
function ProgressBar({ step }) {
  let sectionStart = 0;
  let sectionEnd = 4;
  if (step >= 6) {
    sectionStart = 6;
    sectionEnd = 11;
  }
  let progress = 0;
  if (step >= sectionStart && step <= sectionEnd) {
    progress = ((step - sectionStart + 1) / (sectionEnd - sectionStart + 1)) * 100;
  } else if (step > sectionEnd) {
    progress = 100;
  }
  return (
    <div className="ls-progress-bar-outer" style={{ margin: '0 auto 18px auto', width: '100%', maxWidth: 500, background: '#cbd5e1', borderRadius: 6, height: 8, overflow: 'hidden' }}>
      <div
        className="ls-progress-bar-inner"
        style={{ width: `${progress}%`, height: '100%', background: '#443eff', borderRadius: 6, transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </div>
  );
}

function isCountryEligible(country, backlogCount) {
  const eligibility = getCountryEligibility(backlogCount).find(c => c.code === country || c.value === country);
  return eligibility ? eligibility.isEligible : true;
}

// Helper to get tag for sorting
const getProgramTagForOther = (opt) => {
  if (opt.value === 'masters' || opt.value === 'double-masters' || opt.value === 'mba') return 'Recommended';
  if (opt.value === 'phd') return 'Not Recommended';
  return '';
};

// Add a placeholder CountryEligibilityStep component for now
function CountryEligibilityStep({ country, budget, backlogs, onSelectCountry, onContinue }) {
  // Add these state hooks at the top of CountryEligibilityStep (after other useState hooks)
  const [showDisqualDialog, setShowDisqualDialog] = React.useState(false);
  const [disqualCountry, setDisqualCountry] = React.useState(null);
  const [disqualReason, setDisqualReason] = React.useState('');

  // --- Compact country button style ---
  const compactButtonStyle = {
    background: '#fff',
    border: '1.5px solid #6366f1',
    borderRadius: 12,
    padding: '10px 8px',
    margin: '0 8px 12px 0',
    minWidth: 100,
    maxWidth: 120,
    fontWeight: 600,
    fontSize: 13,
    color: '#1e293b',
    boxShadow: '0 1px 4px #6366f111',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s, border-color 0.2s',
  };

  // Extended country requirements
  const countryReqs = [
    { value: 'usa', name: 'USA', flag: '🇺🇸', minBudget: 35, minBacklogs: 10, roi: 60 },
    { value: 'canada', name: 'Canada', flag: '🇨🇦', minBudget: 25, minBacklogs: 10, roi: 45 },
    { value: 'uk', name: 'UK', flag: '🇬🇧', minBudget: 25, minBacklogs: 15, roi: 45 },
    { value: 'australia', name: 'Australia', flag: '🇦🇺', minBudget: 15, minBacklogs: 15, roi: 35 },
    { value: 'new-zealand', name: 'New Zealand', flag: '🇳🇿', minBudget: 15, minBacklogs: 8, roi: 35 },
    { value: 'ireland', name: 'Ireland', flag: '🇮🇪', minBudget: 15, minBacklogs: 7, roi: 35 },
    { value: 'france', name: 'France', flag: '🇫🇷', minBudget: 15, minBacklogs: 15, roi: 30 },
    { value: 'germany', name: 'Germany', flag: '🇩🇪', minBudget: 10, minBacklogs: 15, roi: 28 },
    { value: 'netherlands', name: 'Netherlands', flag: '🇳🇱', minBudget: 20, minBacklogs: 15, roi: 32 },
    { value: 'singapore', name: 'Singapore', flag: '🇸🇬', minBudget: 30, minBacklogs: 12, roi: 50 },
    { value: 'sweden', name: 'Sweden', flag: '🇸🇪', minBudget: 18, minBacklogs: 12, roi: 30 },
    { value: 'denmark', name: 'Denmark', flag: '🇩🇰', minBudget: 18, minBacklogs: 12, roi: 30 },
    { value: 'italy', name: 'Italy', flag: '🇮🇹', minBudget: 12, minBacklogs: 15, roi: 25 },
    { value: 'spain', name: 'Spain', flag: '🇪🇸', minBudget: 12, minBacklogs: 15, roi: 25 },
  ];

  // Calculate eligibility strictly: eligible if userBacklogs <= minBacklogs AND userBudget >= minBudget
  const userBudget = typeof budget === 'string' ? (budget.includes('35') ? 35 : budget.includes('30') ? 30 : budget.includes('25') ? 25 : budget.includes('20') ? 20 : budget.includes('18') ? 18 : budget.includes('15') ? 15 : budget.includes('12') ? 12 : budget.includes('10') ? 10 : 0) : budget;
  const userBacklogs = backlogs;

  // Budget logic: two brackets
  let budgetMax = userBudget === 15 ? 35 : 1000; // 15L means eligible for all with minBudget <= 35L

  // Determine if user is 'not sure' and has enough budget
  const isNotSure = country === 'any' || country === 'not-sure';
  const notSureAnd15L = isNotSure && userBudget >= 15;
  const notSureAnd35L = isNotSure && userBudget >= 35;

  // Helper to check if a country is eligible (budget + backlogs)
  const isCountryEligible = (c) => {
    if (notSureAnd15L) return true; // All countries eligible if not sure and budget >= 15L
    return userBacklogs <= c.minBacklogs && c.minBudget <= budgetMax;
  };

  // Build eligible/ineligible lists for dropdown and cards
  const eligibleCountries = countryReqs.filter(isCountryEligible);
  const ineligibleCountries = countryReqs.filter(c => !isCountryEligible(c));
  let reasonMap = {};
  // Always populate reasonMap for all main countries if ineligible, even in 'not sure' + 15L
  countryReqs.forEach(c => {
    if (userBacklogs > 15) reasonMap[c.value] = 'Backlogs > 15';
    else if (userBacklogs > c.minBacklogs) reasonMap[c.value] = `Backlogs > ${c.minBacklogs}`;
    else if (c.minBudget > budgetMax) reasonMap[c.value] = `Min ${c.minBudget}L`;
    // else do not set
  });

  // --- Show advisory message if selected country is ineligible (softer wording) ---
  const selectedCountryObj = countryReqs.find(c => c.value === country);
  const selectedCountryIneligible = selectedCountryObj && !isCountryEligible(selectedCountryObj);
  const advisoryMessage = (!notSureAnd15L && selectedCountryIneligible) ? (
    <div style={{
      background: '#f8fafc',
      color: '#b91c1c',
      borderRadius: 10,
      padding: '12px 18px',
      fontWeight: 500,
      fontSize: 15,
      marginBottom: 18,
      textAlign: 'center',
      maxWidth: 700,
      width: '100%',
      border: '1.5px solid #e0e7ff',
    }}>
      {selectedCountryObj?.name} with {reasonMap[country]} has low admit chances. Explore other options or continue if you wish.
    </div>
  ) : null;

  // --- Main country button click handler ---
  function handleCountryClick(c, isEligible) {
    // If USA is selected and both backlogs > 10 and budget is 15L, always show the 3-option dialog
    if (c.value === 'usa' && userBudget === 15 && userBacklogs > 10) {
      setShowUSAConfirm(true);
      return;
    }
    if (isNotSure && userBudget === 15 && c.value === 'usa') {
      setShowUSAConfirm(true);
      return;
    }
    // In 'not sure' + 15L, if country is ineligible due to backlogs, show dialog
    if (notSureAnd15L && userBacklogs > c.minBacklogs) {
      setDisqualCountry(c);
      setDisqualReason(reasonMap[c.value]);
      setShowDisqualDialog(true);
      return;
    }
    if (notSureAnd15L) {
      onSelectCountry(c.value);
      onContinue();
      return;
    }
    if (!isEligible || (c.value === 'usa' && userBacklogs > 10)) {
      setDisqualCountry(c);
      setDisqualReason(reasonMap[c.value] || `Backlogs > 10`);
      setShowDisqualDialog(true);
      return;
    }
    if (c.value === 'usa' && userBudget === 15 && !notSureAnd35L) {
      setShowUSAConfirm(true);
      return;
    }
    onSelectCountry(c.value);
    onContinue();
  }

  // --- 35+ lakhs container: USA as a button ---
  const usa = countryReqs.find(x => x.value === 'usa');
  const usaEligible = isCountryEligible(usa);
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

  // --- 15+ lakhs container: show main countries as always clickable buttons ---
  const mainCountries = ['australia', 'uk', 'canada', 'new-zealand', 'ireland', 'germany'];
  const recommended = ['australia', 'uk', 'canada', 'new-zealand'];
  const mainCountryButtons = mainCountries.map(val => {
    const c = countryReqs.find(x => x.value === val);
    // In 'not sure' + 15L, check strict backlog eligibility for tag/confirmation
    let isEligible = eligibleCountries.some(x => x.value === val);
    let showLowAdmit = false;
    let showRecommended = false;
    if (notSureAnd15L) {
      // Use strict backlog rules for low admit chances
      if (userBacklogs > c.minBacklogs) {
        isEligible = false;
        showLowAdmit = true;
      } else {
        isEligible = true;
        showRecommended = recommended.includes(c.value);
      }
    } else {
      showLowAdmit = !isEligible && ineligibleCountries.find(x => x.value === val);
      showRecommended = recommended.includes(c.value) && isEligible;
    }
    return (
      <button
        key={val}
        style={{
          ...compactButtonStyle,
          border: isEligible ? compactButtonStyle.border : '1.5px solid #fca5a5',
          background: isEligible ? compactButtonStyle.background : '#fef2f2',
          color: isEligible ? '#1e293b' : '#b91c1c',
          position: 'relative',
        }}
        onClick={() => handleCountryClick(c, isEligible)}
      >
        <span style={{ fontSize: 22, marginBottom: 2 }}>{c.flag}</span>
        <span>{c.name}</span>
        <span style={{ color: '#64748b', fontSize: 11, fontWeight: 500 }}>ROI: ₹{c.roi}L</span>
        {showRecommended && (
          <span style={{
            position: 'absolute',
            top: 6,
            right: 6,
            background: '#e0e7ff',
            color: '#3730a3',
            fontWeight: 700,
            fontSize: 9,
            borderRadius: 7,
            padding: '1px 6px',
          }}>Recommended</span>
        )}
        {showLowAdmit && (
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
          }}>Low admit chances</span>
        )}
        {showLowAdmit && reasonMap[c.value] && (
          <span style={{ color: '#dc2626', fontSize: 10, marginTop: 2 }}>{reasonMap[c.value]}</span>
        )}
      </button>
    );
  });

  // --- Dropdown for more countries as compact buttons ---
  const [showMore, setShowMore] = React.useState(false);
  const moreCountries = countryReqs
    .filter(c => !mainCountries.includes(c.value) && c.value !== 'usa')
    .map(c => {
      const isEligible = eligibleCountries.some(x => x.value === c.value);
      const ineligible = ineligibleCountries.find(x => x.value === c.value);
      return (
        <button
          key={c.value}
          style={{
            ...compactButtonStyle,
            border: isEligible ? compactButtonStyle.border : '1.5px solid #fca5a5',
            background: isEligible ? compactButtonStyle.background : '#fef2f2',
            color: isEligible ? '#1e293b' : '#b91c1c',
            position: 'relative',
          }}
          onClick={() => handleCountryClick(c, isEligible)}
        >
          <span style={{ fontSize: 22, marginBottom: 2 }}>{c.flag}</span>
          <span>{c.name}</span>
          <span style={{ color: '#64748b', fontSize: 11, fontWeight: 500 }}>ROI: ₹{c.roi}L</span>
          {!isEligible && ineligible && (
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
            }}>Low admit chances</span>
          )}
          {!isEligible && ineligible && (
            <span style={{ color: '#dc2626', fontSize: 10, marginTop: 2 }}>{reasonMap[c.value]}</span>
          )}
        </button>
      );
    });

  // State for USA confirmation
  const [showUSAConfirm, setShowUSAConfirm] = React.useState(false);
  const [usaConfirmed, setUSAConfirmed] = React.useState(false);

  // Show USA confirm dialog if user selects 15L budget and USA, even after 'not-sure' or 'any'
  React.useEffect(() => {
    if (country === 'usa' && userBudget === 15 && !usaConfirmed) {
      setShowUSAConfirm(true);
    }
  }, [country, userBudget, usaConfirmed]);

  // Dropdown options: always include USA, but with warning if not eligible by budget
  const dropdownOptions = countryReqs.filter(c => {
    if (c.value === 'usa') return true;
    return isCountryEligible(c);
  });

  // Eligible for proceed: all eligible countries, or USA if confirmed
  const canProceed = (country === 'usa' && userBudget < 35) ? usaConfirmed : !!country;

  // --- USA confirmation dialog with 3 options ---
  const dialogButtonStyle = {
    flex: 1,
    minWidth: 0,
    height: 48,
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 15,
    padding: '0 8px',
    margin: 0,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s, border 0.2s',
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 0,
  };
  const dialogButtonPrimary = {
    ...dialogButtonStyle,
    background: '#fde68a',
    color: '#b45309',
    border: '1.5px solid #fde68a',
  };
  const dialogButtonSecondary = {
    ...dialogButtonStyle,
    background: '#fff7ed',
    color: '#b45309',
    border: '1.5px solid #fde68a',
  };
  const dialogButtonNeutral = {
    ...dialogButtonStyle,
    background: '#f3f4f6',
    color: '#374151',
    border: '1.5px solid #e5e7eb',
  };
  const dialogButtonBlue = {
    ...dialogButtonStyle,
    background: '#e0e7ff',
    color: '#3730a3',
    border: '1.5px solid #e0e7ff',
  };
  const usaConfirmDialog = (!notSureAnd35L && showUSAConfirm) && (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309', marginBottom: 12 }}>USA requires a minimum of 35 lakhs for high admit rate.</div>
        <div style={{ color: '#a16207', fontSize: 15, marginBottom: 18 }}>With 15 lakhs, admit chances are low. What would you like to do?</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <button style={dialogButtonPrimary}
            onClick={() => { setShowUSAConfirm(false); setUSAConfirmed(false); onSelectCountry('usa'); onContinue('extend-budget'); }}>
            Extend budget to 35 lakhs
          </button>
          <button style={dialogButtonSecondary}
            onClick={() => { setShowUSAConfirm(false); setUSAConfirmed(true); onSelectCountry('usa'); onContinue('continue-15l'); }}>
            Continue with 15 lakhs (Low admit rate)
          </button>
          <button style={dialogButtonNeutral}
            onClick={() => { setShowUSAConfirm(false); setUSAConfirmed(false); }}>
            Explore other countries
          </button>
        </div>
      </div>
    </div>
  );

  // --- Disqualification dialog for other countries ---
  const disqualDialog = showDisqualDialog && disqualCountry && (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: '#dc2626', marginBottom: 12 }}>Low admit chances for {disqualCountry.name}.</div>
        <div style={{ color: '#b91c1c', fontSize: 15, marginBottom: 18 }}>{disqualReason}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <button style={dialogButtonBlue}
            onClick={() => { setShowDisqualDialog(false); onSelectCountry(disqualCountry.value); onContinue(); }}>
            Continue with {disqualCountry.name}
          </button>
          <button style={dialogButtonNeutral}
            onClick={() => setShowDisqualDialog(false)}>
            Explore other countries
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 800, width: '100%', padding: '24px 16px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Country Eligibility</h2>
      <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 16, textAlign: 'center' }}>
        Choose the country which best suits for you
      </div>
      {advisoryMessage}
      <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 16, border: '2px solid #e5e7eb', padding: '14px 18px', marginBottom: 18, maxWidth: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#6366f1', marginBottom: 8, width: '100%', textAlign: 'left' }}>35+ lakhs</div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {usaButton}
        </div>
      </div>
      <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 16, border: '2px solid #e5e7eb', padding: '14px 18px', marginBottom: 0, maxWidth: 700 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#6366f1', marginBottom: 8 }}>15+ lakhs</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, width: '100%' }}>
          {mainCountryButtons}
          {showMore && moreCountries}
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: showMore ? 18 : 0 }}>
          <button
            style={{ background: '#e0e7ff', color: '#3730a3', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 13, cursor: 'pointer', width: 160 }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Hide more countries' : 'View more countries'}
          </button>
        </div>
      </div>
      {usaConfirmDialog}
      {disqualDialog}
    </div>
  );
}

function App() {
  const [education, setEducation] = useState(null);
  const [program, setProgram] = useState(null);
  const [country, setCountry] = useState(null);
  const [step, setStep] = useState(0); // Use only this for navigation
  const [intake, setIntake] = useState(null);
  const [english, setEnglish] = useState(null);
  const [passport, setPassport] = useState(null);
  const [city, setCity] = useState(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const programFoldRef = useRef(null);
  const [applicationSaved, setApplicationSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [buttonLoading, setButtonLoading] = useState({ download: false, view: false });
  const [academicDetails, setAcademicDetails] = useState({});
  const [budget, setBudget] = useState(null);
  const [financeMode, setFinanceMode] = useState(null);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [timeline, setTimeline] = useState(null);
  const [englishTestDetails, setEnglishTestDetails] = useState(null);
  const [graduationYear, setGraduationYear] = useState(null);
  const [graduationMonth, setGraduationMonth] = useState(null);
  const [disqualifiedReason, setDisqualifiedReason] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);
  const timelineRef = useRef(null);

  // Scroll to program fold when education is selected
  useEffect(() => {
    if (education && programFoldRef.current) {
      programFoldRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [education]);

  // Dynamic question for program fold
  const programQuestion = education
    ? `What do you want to study after your ${{
        '10th': '10th Grade',
        '12th': '12th Grade',
        'non-final-bachelors': "Bachelor's (Not Final Year)",
        'final-bachelors': "Bachelor's (Final Year)",
        'completed-bachelors': "Completed Bachelor's",
        'masters': "Master's",
        'mbbs': "MBBS"
      }[education] || 'education'}?`
    : 'What do you want to study?';

  // Get program options for selected education
  let programOptions = [];
  if (education === 'other') {
    // Flatten all options from all education levels, remove duplicates by value, and set disabled: false
    const allOptions = Object.values(programOptionsMap).flat();
    const seen = new Set();
    programOptions = allOptions.filter(opt => {
      if (seen.has(opt.value)) return false;
      seen.add(opt.value);
      return true;
    }).map(opt => ({ ...opt, disabled: false }));
    // Sort: Recommended first, then Not Recommended, then rest
    programOptions.sort((a, b) => {
      const tagA = getProgramTagForOther(a);
      const tagB = getProgramTagForOther(b);
      if (tagA === 'Recommended' && tagB !== 'Recommended') return -1;
      if (tagB === 'Recommended' && tagA !== 'Recommended') return 1;
      if (tagA === 'Not Recommended' && tagB !== 'Not Recommended') return -1;
      if (tagB === 'Not Recommended' && tagA !== 'Not Recommended') return 1;
      return 0;
    });
  } else if (education) {
    programOptions = programOptionsMap[education] || [];
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    if (step === 12 && timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  // Save application to backend when step === 6 and not already saved
  useEffect(() => {
    if (step === 6 && !applicationSaved && phone) {
      setSaving(true);
      fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          education,
          program,
          country,
          intake,
          city,
          phone,
          english,
          passport,
        }),
      })
        .then(res => res.json())
        .then(() => setApplicationSaved(true))
        .catch(() => {})
        .finally(() => setSaving(false));
    }
  }, [step, applicationSaved, phone, education, program, country, intake, city, english, passport]);

  // Helper to log click
  const logClick = async (type) => {
    if (!phone) return;
    await fetch('http://localhost:5000/api/applications/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, type }),
    });
  };

  // Main render
  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      {/* Add sticky header with logo and progress bar */}
      <div style={{
        width: '100vw',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'none',
        padding: 0,
        margin: 0,
      }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent', margin: '28px 0 0 0', padding: 0 }}>
          <img src={logoUrl} alt="Leap Scholar" style={{ height: 68, maxWidth: 260, background: 'transparent', marginBottom: 24 }} />
        </div>
        {step !== 5 && <ProgressBar step={step} />}
      </div>

      {/* Step 0: Country Selection */}
      {step === 0 && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, color: '#443eff', marginBottom: 2 }}>
            Your Study Abroad Dream Starts Here
          </div>
          <CountrySelectionStep
            visible={true}
            onSelect={(value) => {
              setCountry(value);
              setStep(1);
            }}
            initialValue={country}
          />
        </div>
      )}
      {/* Step 1: Education */}
      {step === 1 && (
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', margin: '5px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, color: '#443eff', marginBottom: 2 }}>
            Your study abroad dream starts here
          </div>
          <div style={{ textAlign: 'center', fontSize: 18, color: '#443eff', fontWeight: 600, marginBottom: 0 }}>
            Tell us about your educational background
          </div>
          <div style={{ marginTop: 4 }}>
            <EducationLevelStep
              onSelect={(value) => {
                setEducation(value);
                setProgram(null);
              }}
              selected={education}
            />
          </div>
          {education && (
            <div ref={programFoldRef} style={{ marginTop: 8, width: '100%' }}>
              <div className="fold active" style={{ width: '100%', background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
                <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '10px 0 12px 0', color: '#1e293b', textAlign: 'center' }}>{programQuestion}</h3>
                <ProgramSelectionStep
                  visible={true}
                  onSelect={(value) => {
                    setProgram(value);
                    setStep(3);
                  }}
                  initialValue={program}
                  options={programOptions}
                  question={programQuestion}
                  asPanel
                  highestEducation={education}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {/* Step 3: Passport & City */}
      {step === 3 && (
        <EnglishPassportStep
          passport={passport}
          city={city}
          onPassportSelect={value => setPassport(value)}
          onCitySelect={value => setCity(value)}
          onContinue={() => setStep(4)}
        />
      )}
      {/* Step 4: Phone & OTP */}
      {step === 4 && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <PhoneOtpStep
            visible={true}
            phone={phone}
            otp={otp}
            showOtpPopup={showOtpPopup}
            onPhoneSubmit={(value) => {
              setPhone(value);
              setShowOtpPopup(true);
            }}
            onOtpSubmit={(value) => {
              setOtp(value);
              setShowOtpPopup(false);
              // Disqualification logic after phone verification
              if (education === '10th' || education === '12th' || education === 'mbbs') {
                setDisqualifiedReason(
                  education === '10th'
                    ? 'Currently, our partner universities require a minimum of 12th grade or equivalent for study abroad programs. Complete your 12th and come back—we will be here to help you take the next step!'
                    : education === '12th'
                    ? 'You are just one step away! Please complete your 12th grade and return to explore global opportunities with us.'
                    : 'Currently, we are unable to support MBBS profiles for study abroad. If you are planning to pursue further studies, please reach out after your graduation.'
                );
                setStep('disqualified');
              } else if (passport === 'yet-to-apply') {
                setDisqualifiedReason('A valid passport or an application in process is required to proceed. Please apply for a passport and return—we will be ready to help you with your study abroad journey!');
                setStep('disqualified');
              } else {
                setStep(5);
              }
            }}
            onCloseOtpPopup={() => setShowOtpPopup(false)}
          />
        </div>
      )}
      {/* Step 5: Completion */}
      {step === 5 && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <CompletionStep
            education={education}
            program={program}
            country={country}
            intake={intake}
            city={city}
            phone={phone}
            english={english}
            passport={passport}
            onDownloadReport={async () => {
              setButtonLoading((b) => ({ ...b, download: true }));
              await logClick('download');
              setTimeout(() => setButtonLoading((b) => ({ ...b, download: false })), 800);
              alert('Download coming soon!');
            }}
            onViewReport={async () => {
              setButtonLoading((b) => ({ ...b, view: true }));
              await logClick('view');
              setTimeout(() => setButtonLoading((b) => ({ ...b, view: false })), 800);
              alert('View report coming soon!');
            }}
            buttonLoading={buttonLoading}
            saving={saving}
            onContinue={() => setStep(7)}
          />
        </div>
      )}
      {/* Step 7: Academic Details */}
      {step === 7 && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <AcademicDetailsStep
            highestEducation={education}
            initialDetails={academicDetails}
            onSubmit={details => {
              setAcademicDetails(details);
              setGraduationYear(details.graduationYear);
              setGraduationMonth(details.graduationMonth);
              setStep(8);
            }}
          />
        </div>
      )}
      {/* Step 8: Academic Journey Complete */}
      {step === 8 && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <AcademicJourneyComplete onContinue={() => setStep(9)} />
        </div>
      )}
      {/* Step 9: Budget */}
      {step === 9 && !budget && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <BudgetStep
            onBudgetSelected={(budgetValue) => {
              setBudget(budgetValue);
              setStep(9); // Always advance to finance mode
            }}
          />
        </div>
      )}
      {/* Step 9: Finance Mode */}
      {step === 9 && budget && !financeMode && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <FinanceStep
            onSelect={(mode) => {
              setFinanceMode(mode);
              setStep(10);
            }}
            initialValue={financeMode}
          />
        </div>
      )}
      {/* Step 10: IELTS/English Test Details */}
      {step === 10 && budget && financeMode && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, padding: '32px 24px', marginTop: 0 }}>
          <EnglishTestDetailsStep
            englishTestStatus={null}
            onSubmit={details => {
              setEnglishTestDetails(details);
              setStep(11);
            }}
            selectedCity={city}
            intake={intake}
            onEditIntake={() => setStep(10)}
          />
        </div>
      )}
      {/* Step 11: University Preference + Application Timeline Step */}
      {step === 11 && (
        <div style={{ width: '100%', maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ marginBottom: 32 }}>
            <UniversityPreferenceStep
              country={country}
              universitiesList={universityData[country] || universityData.any}
              onSelect={(selected) => {
                setSelectedUniversities(selected);
                // Do not advance step here
              }}
            />
          </div>
          {/* Show Application Timeline only if at least one university is selected */}
          {selectedUniversities && selectedUniversities.length > 0 && (
            <div>
              <ApplicationTimelineStep
                onSelect={(timeline) => {
                  setTimeline(timeline);
                  if (timeline) setStep(13); // auto-advance to intake
                }}
                initialValue={timeline}
              />
            </div>
          )}
        </div>
      )}
      {/* Step 13: Preferred Intake Step */}
      {step === 13 && (
        <IntakeSelectionStep
          visible={true}
          onSelect={(intakeValue) => {
            setIntake(intakeValue);
            // --- Refactored eligibility navigation logic ---
            const budgetNum = typeof budget === 'string' ? (budget.includes('35') ? 35 : budget.includes('15') ? 15 : 0) : budget;
            const isUSA = country === 'usa';
            const isNotSure = country === 'any' || country === 'not-sure';
            const backlogs = academicDetails.backlogs;
            // Country requirements
            const countryReqs = [
              { value: 'usa', minBudget: 35, minBacklogs: 10 },
              { value: 'canada', minBudget: 25, minBacklogs: 10 },
              { value: 'uk', minBudget: 25, minBacklogs: 15 },
              { value: 'australia', minBudget: 15, minBacklogs: 15 },
              { value: 'new-zealand', minBudget: 15, minBacklogs: 8 },
              { value: 'ireland', minBudget: 15, minBacklogs: 7 },
              { value: 'france', minBudget: 15, minBacklogs: 15 },
              { value: 'germany', minBudget: 10, minBacklogs: 15 },
              { value: 'netherlands', minBudget: 20, minBacklogs: 15 },
              { value: 'singapore', minBudget: 30, minBacklogs: 12 },
              { value: 'sweden', minBudget: 18, minBacklogs: 12 },
              { value: 'denmark', minBudget: 18, minBacklogs: 12 },
              { value: 'italy', minBudget: 12, minBacklogs: 15 },
              { value: 'spain', minBudget: 12, minBacklogs: 15 },
            ];
            const req = countryReqs.find(c => c.value === country);
            // --- USA flow ---
            if (isUSA) {
              if (backlogs > 10) {
                setStep(14); // Hard disqualify for USA
                return;
              }
              if (budgetNum < 35) {
                setStep(14); // Show warning, allow confirmation
                return;
              }
              // Eligible for USA
              setStep(15);
              return;
            }
            // --- Not Sure flow ---
            if (isNotSure) {
              setStep(14); // Always show eligibility page
              return;
            }
            // --- Other country flow ---
            if (req) {
              if (backlogs > req.minBacklogs || budgetNum < req.minBudget) {
                setStep(14); // Disqualify for selected country
                return;
              }
              // Eligible for selected country
              setStep(15);
              return;
            }
            // Default: show eligibility page
            setStep(14);
          }}
          country={country}
          graduationYear={graduationYear}
          graduationMonth={graduationMonth}
        />
      )}
      {/* Step 14: Country Eligibility Step */}
      {step === 14 && (
        <CountryEligibilityStep
          country={country}
          budget={budget}
          backlogs={academicDetails.backlogs}
          onSelectCountry={(newCountry) => setCountry(newCountry)}
          onContinue={() => setStep(15)}
        />
      )}
      {/* Step 15: Contact Details */}
      {step === 15 && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <ContactDetailsStep
            onSubmit={details => {
              setContactDetails(details);
              setStep(16);
            }}
          />
        </div>
      )}
      {/* Step 16: Final Congratulations */}
      {step === 16 && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <FinalCongratulationsPage universityCount={42} />
        </div>
      )}
      {/* Render the disqualification page if needed */}
      {step === 'disqualified' && (
        <WarmDisqualificationPage reasonType={
          (passport === 'yet-to-apply' && (education === '10th' || education === '12th' || education === 'mbbs'))
            ? 'both'
            : passport === 'yet-to-apply'
            ? 'passport'
            : undefined
        } />
      )}
    </div>
  );
}

export default App;