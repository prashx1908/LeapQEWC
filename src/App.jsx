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
import { AdvisoryMBBSPage, AdvisoryPhDPathPage, AdvisoryBachelorsPathPage } from './components/WarmDisqualificationPage';
import UniformDialog from './components/UniformDialog';

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
    { value: 'masters', label: "Master's Degree", icon: '🎯', disabled: true },
    { value: 'mba', label: "MBA Program", icon: '💼', disabled: true },
    { value: 'phd', label: "PhD Program", icon: '🔬', disabled: true }
  ],
  'non-final-bachelors': [
    { value: 'masters', label: "Master's Degree", icon: '🎯', recommended: true },
    { value: 'mba', label: "MBA Program", icon: '💼', recommended: true },
    { value: 'bachelors', label: "Another Bachelor's", icon: '🎓' },
    { value: 'phd', label: "PhD Program", icon: '🔬' }
  ],
  'final-bachelors': [
    { value: 'masters', label: "Master's Degree", icon: '🎯', recommended: true },
    { value: 'mba', label: "MBA Program", icon: '💼', recommended: true },
    { value: 'bachelors', label: "Another Bachelor's", icon: '🎓' },
    { value: 'phd', label: "PhD Program", icon: '🔬' }
  ],
  'completed-bachelors': [
    { value: 'masters', label: "Master's Degree", icon: '🎯', recommended: true },
    { value: 'mba', label: "MBA Program", icon: '💼', recommended: true },
    { value: 'bachelors', label: "Another Bachelor's", icon: '🎓' },
    { value: 'phd', label: "PhD Program", icon: '🔬' }
  ],
  'masters': [
    { value: 'phd', label: "PhD Program", icon: '🔬', recommended: true },
    { value: 'masters', label: "Another Master's", icon: '🎯' },
    { value: 'mba', label: "MBA Program", icon: '💼' },
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

function FinalCongratulationsPage({ universityCount = 42, passportStatus }) {
  const needsPassport = passportStatus === 'yet-to-apply';
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div className="completion-emoji" style={{ fontSize: 48, marginBottom: 10, animation: 'bounce 1.2s' }}>🎉</div>
      <h2 className="completion-title" style={{ fontSize: 24, fontWeight: 900, color: '#443eff', marginBottom: 18, letterSpacing: '-0.01em' }}>Profile Evaluation Completed!</h2>
      {/* Timeline Milestones */}
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
        {/* Milestone 2: Profile Evaluation - Completed */}
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
        {/* Milestone 3: Passport or University Shortlisting */}
        {needsPassport ? (
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
              <span style={{ fontSize: 28, color: '#6366f1', marginLeft: 2, marginTop: 2 }}>🛂</span>
            <div style={{ flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#6366f1', marginBottom: 2 }}>
                  Milestone 3: Apply and receive passport <span style={{ fontWeight: 700, fontSize: 14, color: '#6366f1' }}>- Pending</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 15, fontWeight: 500 }}>
                  To proceed with your study abroad journey, you need a valid passport. Start your application now!
                </div>
                {/* Resources */}
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="https://portal2.passportindia.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#443eff', fontWeight: 700, textDecoration: 'underline', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 18 }}>🛂</span> Indian Passport Application Portal
                  </a>
                  <a href="https://leapscholar.com/blog/how-to-apply-for-passport-india" target="_blank" rel="noopener noreferrer" style={{ color: '#443eff', fontWeight: 700, textDecoration: 'underline', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 18 }}>📘</span> How to Apply for a Passport (Guide)
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            width: '100%',
            background: '#f3f4f6',
            borderRadius: 16,
            border: '2.5px solid #6366f1',
            minHeight: 100,
            boxShadow: '0 2px 8px #6366f122',
            padding: '24px 24px 20px 24px',
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            gap: 0,
          }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 32, color: '#6366f1', marginRight: 8 }}>🔵</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#6366f1', marginBottom: 2, letterSpacing: 0.1 }}>
                  Milestone 3: University Shortlisting <span style={{ fontWeight: 700, fontSize: 14, color: '#6366f1' }}>- Pending</span>
                </div>
                <div style={{ color: '#64748b', fontSize: 15, fontWeight: 500, marginBottom: 0 }}>
                Get your personalized university shortlist and next steps.
              </div>
            </div>
          </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', marginTop: 18 }}>
          <button
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
              color: '#fff',
              border: 'none',
                  borderRadius: 10,
                  padding: '14px 32px',
                  fontWeight: 800,
                  fontSize: 16,
              cursor: 'pointer',
                  boxShadow: '0 4px 16px #6366f133',
              letterSpacing: 0.2,
                  transition: 'background 0.2s, box-shadow 0.2s',
              whiteSpace: 'nowrap',
                  alignSelf: 'flex-end',
            }}
            onClick={() => window.open('https://calendly.com/leapcounselor', '_blank')}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 24px #6366f155'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 16px #6366f133'}
          >
            Book a call with counsellor
          </button>
        </div>
          </div>
        )}
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
  // Add state for custom dialog for cannot15 budget
  const [showCannot15Dialog, setShowCannot15Dialog] = React.useState(false);
  const [cannot15Country, setCannot15Country] = React.useState(null);

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
  const showUSABudgetAdvisory = country === 'usa' && userBudget < 35;
  const showUSABacklogAdvisory = country === 'usa' && userBacklogs > 10;

  // Budget logic: two brackets
  let budgetMax = userBudget === 15 ? 35 : 1000; // 15L means eligible for all with minBudget <= 35L

  // Determine if user is 'not sure' and has enough budget
  const isNotSureBudget = budget === 'not-sure';
  const notSureAnd15L = isNotSureBudget && userBudget >= 15;
  const notSureAnd35L = isNotSureBudget && userBudget >= 35;

  // If budget is 'not-sure', only use backlogs for eligibility/disqualification
  const isBudgetNotSure = budget === 'not-sure';

  // Helper to check if a country is eligible (backlogs only if budget is not-sure)
  const isCountryEligible = (c) => {
    if (notSureAnd15L) return true; // All countries eligible if not sure and budget >= 15L
    if (isBudgetNotSure) {
      return backlogs <= c.minBacklogs;
    }
    return userBacklogs <= c.minBacklogs && c.minBudget <= budgetMax;
  };

  // Build eligible/ineligible lists for dropdown and cards
  const eligibleCountries = countryReqs.filter(isCountryEligible);
  const ineligibleCountries = countryReqs.filter(c => !isCountryEligible(c));
  let reasonMap = {};
  countryReqs.forEach(c => {
    if (backlogs > 15) reasonMap[c.value] = 'Backlogs > 15';
    else if (backlogs > c.minBacklogs) reasonMap[c.value] = `Backlogs > ${c.minBacklogs}`;
    else if (!isBudgetNotSure && c.minBudget > budgetMax) reasonMap[c.value] = `Min ${c.minBudget}L`;
    // else do not set
  });

  // --- Show advisory message if selected country is ineligible (softer wording) ---
  const selectedCountryObj = countryReqs.find(c => c.value === country);
  const selectedCountryIneligible = selectedCountryObj && !isCountryEligible(selectedCountryObj);
  const advisoryMessage = (selectedCountryIneligible && backlogs > selectedCountryObj.minBacklogs && (
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
      {getBacklogWarningMessage(selectedCountryObj)}
    </div>
  ));

  // --- Main country button click handler ---
  function handleCountryClick(c, isEligible) {
    // Special handling for 'not-sure' country: treat as a country picker with finance sub-options
    if (country === 'not-sure') {
      
      if (!notSureFinanceOption) {
        setShowNotSureDialog(true);
        return;
      }
      if (notSureFinanceOption === '35L') {
        if (c.value === 'usa') {
          setShowUSAConfirm(true);
          return;
        }
        setYesNoCountry(c);
        setShowYesNoDialog(true);
        return;
      }
      if (notSureFinanceOption === '15L') {
        if (c.value === 'usa') {
          setShowUSAConfirm(true);
          return;
        }
        setYesNoCountry(c);
        setShowYesNoDialog(true);
        return;
      }
      if (notSureFinanceOption === 'cannot15') {
        setCannot15Country(c);
        setShowCannot15Dialog(true);
        return;
      }
      if (notSureFinanceOption === 'counsellor') {
        // Only check backlog eligibility, never show USA budget warning
        if (backlogs > c.minBacklogs) {
          setDisqualCountry(c);
          setDisqualReason('Not eligible due to backlogs');
          setShowDisqualDialog(true);
          return;
        }
        setYesNoCountry(c);
        setShowYesNoDialog(true);
        return;
      }
      return;
    }
    // If budget is 'cannot15', always show the cannot15Dialog for any country
    if (budget === 'cannot15') {
      setCannot15Country(c);
      setShowCannot15Dialog(true);
      return;
    }
    // If user previously selected USA and cannot invest 15L, and now selects another country, show confirmation
    if (country === 'usa' && budget === 'cannot15' && c.value !== 'usa') {
      setPendingCountryConfirm(c.value);
      setShowCountryConfirm(true);
      return;
    }
    // If user selects USA and cannot invest 15L, show advisory only, do not show popup
    if (c.value === 'usa' && budget === 'cannot15' && !usaConfirmed) {
      // Just select USA, do not show popup
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
    if (budget === 'cannot15' && isEligible) {
      setCannot15Country(c);
      setShowCannot15Dialog(true);
      return;
    }
    if (budget === 'cannot15' && c.value === 'usa') {
      setCannot15Country(c);
      setShowCannot15Dialog(true);
      return;
    }
    if (budget === 'not-sure') {
      // Only show disqual dialog for backlogs
      if (backlogs > c.minBacklogs) {
        setDisqualCountry(c);
        setDisqualReason(reasonMap[c.value]);
        setShowDisqualDialog(true);
        return;
      }
      onSelectCountry(c.value);
      onContinue();
      return;
    }
    // Only show USA 35L dialog if budget is exactly 15L
    if (c.value === 'usa' && budget === '15L' && userBacklogs > 10) {
      setShowUSAConfirm(true);
      return;
    }
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
    if (c.value === 'usa' && budget === '15L' && !notSureAnd35L) {
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
        } else if (userBudget < 35) {
          setShowUSAConfirm(true);
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

  // --- 15+ lakhs container: show main countries as always clickable buttons ---
  const mainCountries = ['australia', 'uk', 'canada', 'new-zealand', 'ireland', 'germany'];
  const recommended = ['australia', 'uk', 'canada', 'new-zealand'];
  const lowAdmitPhrases = [
    '2 universities match this budget',
    'Admit rate: below 20%',
    'Only 1 option at budget',
    'Low chance, high competition',
    'Budget gap: ₹2L below avg',
    'Admit rate: very limited',
    'Few matches, tough admits',
    'Only 3 fits, low chance',
    'Limited: 2 universities found',
    'Admit rate: less than 10%',
    'Budget shortfall: ₹1L',
    'Just 1 university fits',
    'Low admit, high cutoff',
    'Budget 30% below average',
    'Admit rate: 1 in 10',
  ];
  const recommendedPhrases = [
    'Top match for your budget',
    'Admit rate: above 70%',
    'Best fit: 3 universities',
    'High admit, strong match',
    'Budget meets requirements',
    'Admit rate: 4 in 5',
    'Optimal: 2 universities found',
    'Great fit, high admit rate',
    'Budget matches 5 universities',
    'Admit rate: 80%+',
    'Strong match, 3 options',
    'Meets average budget',
  ];
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const mainCountryButtons = mainCountries.map(val => {
    const c = countryReqs.find(x => x.value === val);
    let isEligible = eligibleCountries.some(x => x.value === val);
    let showLowAdmit = false;
    let showRecommended = false;
    let reasonPhrase = '';
    if (notSureAnd15L) {
      if (userBacklogs > c.minBacklogs) {
        isEligible = false;
        showLowAdmit = true;
        reasonPhrase = getRandom(lowAdmitPhrases);
      } else {
        isEligible = true;
        showRecommended = recommended.includes(c.value);
        if (showRecommended) reasonPhrase = getRandom(recommendedPhrases);
      }
    } else {
      showLowAdmit = !isEligible && ineligibleCountries.find(x => x.value === val);
      showRecommended = recommended.includes(c.value) && isEligible;
      if (showLowAdmit) reasonPhrase = getRandom(lowAdmitPhrases);
      if (showRecommended) reasonPhrase = getRandom(recommendedPhrases);
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
          }}>Low admit rate</span>
        )}
        {(showLowAdmit || showRecommended) && reasonPhrase && (
          <span style={{
            color: showLowAdmit ? '#dc2626' : '#0891b2',
            fontSize: 11,
            marginTop: 8,
            fontWeight: 600,
            display: 'block',
            width: '100%',
            textAlign: 'center',
            minHeight: 16,
          }}>{reasonPhrase}</span>
        )}
        {showLowAdmit && reasonMap[c.value] && (
          <span style={{
            color: '#b91c1c',
            fontSize: 10,
            marginTop: 2,
            display: 'block',
            width: '100%',
            textAlign: 'center',
            fontWeight: 400,
            opacity: 0.7,
          }}>{reasonMap[c.value]}</span>
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
      let showLowAdmit = !isEligible && ineligible;
      let reasonPhrase = '';
      if (showLowAdmit) reasonPhrase = getRandom(lowAdmitPhrases);
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
            }}>Low admit rate</span>
          )}
          {showLowAdmit && reasonPhrase && (
            <span style={{
              color: '#dc2626',
              fontSize: 11,
              marginTop: 8,
              fontWeight: 600,
              display: 'block',
              width: '100%',
              textAlign: 'center',
              minHeight: 16,
            }}>{reasonPhrase}</span>
          )}
          {showLowAdmit && reasonMap[c.value] && (
            <span style={{
              color: '#b91c1c',
              fontSize: 10,
              marginTop: 2,
              display: 'block',
              width: '100%',
              textAlign: 'center',
              fontWeight: 400,
              opacity: 0.7,
            }}>{reasonMap[c.value]}</span>
          )}
        </button>
      );
    });

  // State for USA confirmation
  const [showUSAConfirm, setShowUSAConfirm] = React.useState(false);
  const [usaConfirmed, setUSAConfirmed] = React.useState(false);
  // State for generic country confirmation
  const [showCountryConfirm, setShowCountryConfirm] = React.useState(false);
  const [pendingCountryConfirm, setPendingCountryConfirm] = React.useState(null);

  // --- USA advisory message (yellow box) ---
  const showUSABudgetAdvisoryBox = country === 'usa' && budget === 'cannot15';

  // --- Disqualification dialog for other countries ---
  const disqualDialog = showDisqualDialog && disqualCountry && (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center', position: 'relative' }}>
        {/* Close button */}
        <button onClick={() => setShowDisqualDialog(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#64748b', cursor: 'pointer', fontWeight: 700, zIndex: 2 }} aria-label="Close">×</button>
        {backlogs > disqualCountry.minBacklogs ? (
          <>
            <div style={{ fontWeight: 900, fontSize: 20, color: '#b91c1c', marginBottom: 14 }}>
              {getBacklogWarningMessage(disqualCountry)}
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
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <button style={{
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            padding: '10px 18px',
            cursor: 'pointer'
          }}
            onClick={() => { setShowDisqualDialog(false); onSelectCountry(disqualCountry.value); onContinue(); }}>
            Continue with {disqualCountry.name}
          </button>
          <button style={{
            background: '#f3f4f6',
            color: '#374151',
            border: '1.5px solid #e5e7eb',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            padding: '10px 18px',
            cursor: 'pointer'
          }}
            onClick={() => setShowDisqualDialog(false)}>
            Explore other countries
          </button>
        </div>
      </div>
    </div>
  );

  // --- Advisory for cannot15 budget ---
  const cannot15Advisory = budget === 'cannot15' && (
    <div style={{
      background: 'linear-gradient(90deg, #fef9c3 0%, #e0e7ff 100%)',
      color: '#b45309',
      borderRadius: 14,
      padding: '18px 22px',
      fontWeight: 600,
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
      gap: 8,
    }}>
      <span style={{ fontSize: 22 }}>💡</span>
      <span>
        Expand your budget a little to get access to more universities, or select a country and talk to a counsellor for financial decisions.
      </span>
    </div>
  );

  // --- Custom dialog for cannot15 budget ---
  const cannot15Dialog = showCannot15Dialog && cannot15Country && (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0002', padding: 36, minWidth: 340, textAlign: 'center', maxWidth: 380, position: 'relative' }}>
        {/* Close button */}
        <button onClick={() => setShowCannot15Dialog(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#64748b', cursor: 'pointer', fontWeight: 700, zIndex: 2 }} aria-label="Close">×</button>
        <div style={{ fontWeight: 800, fontSize: 19, color: '#b45309', marginBottom: 10 }}>Next Steps for {cannot15Country.name}</div>
        <div style={{ color: '#a16207', fontSize: 15, marginBottom: 18 }}>
          {cannot15Country.value === 'usa'
            ? 'You can either select USAitself or explore other countries.'
            : `You can either select this country itself or explore other countries.`}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
          {cannot15Country.value === 'usa' ? (
            <button style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
              color: '#fff',
              border: 'none',
    borderRadius: 8,
              padding: '12px 22px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              letterSpacing: 0.2,
              width: '100%',
              marginBottom: 4,
            }}
              onClick={() => {
                setShowCannot15Dialog(false);
                onSelectCountry('usa');
                // Set budget to 35L if possible
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('setBudget', { detail: '35L' }));
                }
                onContinue();
              }}
            >
              Select USA with 35 lakhs budget
            </button>
          ) : (
            <button style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
              color: '#fff',
    border: 'none',
              borderRadius: 8,
              padding: '12px 22px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              letterSpacing: 0.2,
              width: '100%',
              marginBottom: 4,
            }}
              onClick={() => {
                setShowCannot15Dialog(false);
                onSelectCountry(cannot15Country.value);
                onContinue();
              }}
            >
              Continue with {cannot15Country.name}  
            </button>
          )}
          <button style={{
    background: '#e0e7ff',
    color: '#3730a3',
            border: 'none',
            borderRadius: 8,
            padding: '12px 22px',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #6366f122',
            letterSpacing: 0.2,
            width: '100%',
          }}
            onClick={() => {
              setShowCannot15Dialog(false);
         
            }}
          >
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
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center', position: 'relative' }}>
        {/* Close button */}
        <button onClick={() => { setShowCountryConfirm(false); setPendingCountryConfirm(null); }} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#64748b', cursor: 'pointer', fontWeight: 700, zIndex: 2 }} aria-label="Close">×</button>
        <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309', marginBottom: 12 }}>Select Country</div>
        <div style={{ color: '#1e293b', fontSize: 15, marginBottom: 18 }}>
          Do you want to select <b>{pendingCountryConfirm && pendingCountryConfirm.toUpperCase()}</b>?
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
          <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
            onClick={() => {
              onSelectCountry(pendingCountryConfirm);
              setShowCountryConfirm(false);
              setPendingCountryConfirm(null);
              onContinue();
            }}>
            Yes, select {pendingCountryConfirm && pendingCountryConfirm.toUpperCase()}
          </button>
          <button style={{ background: '#f3f4f6', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
            onClick={() => {
              setShowCountryConfirm(false);
              setPendingCountryConfirm(null);
            }}>
            Explore other countries 
          </button>
        </div>
      </div>
    </div>
  );

  // --- USA confirmation dialog with 3 options ---
  const usaConfirmDialog = showUSAConfirm && (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center', position: 'relative' }}>
        {/* Close button */}
        <button onClick={() => setShowUSAConfirm(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#64748b', cursor: 'pointer', fontWeight: 700, zIndex: 2 }} aria-label="Close">×</button>
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
            onClick={() => { setShowUSAConfirm(false); setCountry(null); setStep(10); }}>
            Explore other countries
          </button>
        </div>
      </div>
    </div>
  );

  // --- Render country picker for 'not-sure' country with finance sub-options ---
  
  // --- Render country picker for 'not-sure' country with finance sub-options ---
  if (country === 'not-sure') {
    // Determine eligible countries based on sub-option
    let eligibleList = eligibleCountries;
    if (notSureFinanceOption === '35L') {
      eligibleList = countryReqs.filter(c => backlogs <= c.minBacklogs);
    } else if (notSureFinanceOption === '15L') {
      eligibleList = countryReqs.filter(c => backlogs <= c.minBacklogs && c.minBudget <= 15);
    } else if (notSureFinanceOption === 'cannot15') {
      eligibleList = countryReqs.filter(c => backlogs <= c.minBacklogs && c.minBudget <= 15);
    } else if (notSureFinanceOption === 'counsellor') {
      eligibleList = countryReqs.filter(c => backlogs <= c.minBacklogs);
    }
    return (
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 800, width: '100%', padding: '24px 16px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Select a Country to Proceed</h2>
        <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500, marginBottom: 16, textAlign: 'center' }}>
          Not sure which country? Explore all eligible options below or talk to a counsellor.
        </div>
        {/* Show finance sub-option dialog if not picked yet */}
        {showNotSureDialog && notSureDialog}
        <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 16, border: '2px solid #e5e7eb', padding: '14px 18px', marginBottom: 18, maxWidth: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#6366f1', marginBottom: 8, width: '100%', textAlign: 'left' }}>Eligible Countries</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, width: '100%' }}>
            {eligibleList.map(c => (
              <button
                key={c.value}
                style={{
                  ...compactButtonStyle,
                  border: compactButtonStyle.border,
                  background: compactButtonStyle.background,
                  color: compactButtonStyle.color,
                  position: 'relative',
                }}
                onClick={() => handleCountryClick(c, true)}
              >
                <span style={{ fontSize: 22, marginBottom: 2 }}>{c.flag}</span>
                <span>{c.name}</span>
                <span style={{ color: '#64748b', fontSize: 11, fontWeight: 500 }}>ROI: ₹{c.roi}L</span>
              </button>
            ))}
          </div>
        </div>
        <button
          style={{ background: '#e0e7ff', color: '#6366f1', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', minWidth: 180, marginTop: 18 }}
          onClick={() => setNotSureFinanceOption('counsellor')}
        >
          Talk to a counsellor
        </button>
        {/* Yes/No, USA, and cannot15 dialogs are rendered globally below */}
        {yesNoDialog}
        {usaConfirmDialog}
        {cannot15Dialog}
        {countryConfirmDialog}
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 800, width: '100%', padding: '24px 16px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Country Eligibility</h2>
      {showUSABudgetAdvisoryBox && (
        <div style={{
          background: '#fef9c3',
          color: '#b45309',
          borderRadius: 14,
          padding: '18px 22px',
          fontWeight: 600,
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
       
        </div>
      )}
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
      {cannot15Dialog}
      {usaConfirmDialog}
      {disqualDialog}
      {countryConfirmDialog}
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
  const [advisoryType, setAdvisoryType] = useState(null); // 'mbbs', 'bachelors', 'phd-bachelors', 'phd-masters'
  const [showPhDAdvisory, setShowPhDAdvisory] = useState(false);
  const [showMBBSAdvisory, setShowMBBSAdvisory] = useState(false);
  const [showBachelorsAdvisory, setShowBachelorsAdvisory] = useState(false);
  const [preferredUniAnswer, setPreferredUniAnswer] = useState('not-sure');
  const [selectedPreferredUnis, setSelectedPreferredUnis] = useState([]);
  // Add at the top of App component
  const [showCountrySwitchConfirm, setShowCountrySwitchConfirm] = useState(false);
  const [pendingCountrySwitch, setPendingCountrySwitch] = useState(null);
  const [usaBudgetFlow, setUsaBudgetFlow] = useState(false);
  // Add a flag to track if user has previously selected USA and cannot invest 15L
  const [usaCannot15Attempted, setUsaCannot15Attempted] = useState(false);

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

  // Helper: is medical program
  const isMedicalProgram = (program) => {
    return [
      'masters-in-medicine', 'medical-specialization', 'phd-in-medicine', 'healthcare-mba', 'mbbs',
      // Also allow for value matches in your programOptionsMap if needed
    ].includes(program);
  };

  // Preferred cities for offline counseling
  const preferredCities = ['bangalore', 'chennai', 'pune', 'gurgaon', 'ludhiana'];

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
        {step !== 5 && step !== 'advisory-phd' && <ProgressBar step={step} />}
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
              // Debug log for advisory logic
              console.log({ education, program, step, advisoryType, showPhDAdvisory });
              // --- Custom advisory/disqualification logic ---
              // 1. MBBS or medical program
              if (
                education === 'mbbs' ||
                isMedicalProgram(program)
              ) {
                setAdvisoryType('mbbs');
                setShowMBBSAdvisory(true);
                setStep('advisory-mbbs');
                return;
              }
              // 2. Bachelors + PhD
              if (education && program === 'phd' && (
                education === 'bachelors' || education === 'completed-bachelors' || education === 'final-bachelors' || education === 'non-final-bachelors'
              )) {
                setAdvisoryType('phd-bachelors');
                setShowPhDAdvisory(true);
                setStep('advisory-phd');
                return;
              }
              // 3. Masters + PhD
              if (education === 'masters' && program === 'phd') {
                setAdvisoryType('phd-masters');
                setShowPhDAdvisory(true);
                setStep('advisory-phd');
                return;
              }
              // 4. Bachelors + Bachelors (new logic)
              if (
                (education === 'bachelors' || education === 'completed-bachelors' || education === 'final-bachelors' || education === 'non-final-bachelors') &&
                (program === 'bachelors' || program === 'another-bachelors')
              ) {
                setShowBachelorsAdvisory(true);
                setStep('advisory-bachelors');
                return;
              }
              // 5. 10th/12th + Bachelors (new logic)
              if ((education === '10th' || education === '12th') && program === 'bachelors') {
                setAdvisoryType('bachelors');
                setShowMBBSAdvisory(true);
                setStep('advisory-mbbs');
                return;
              }
              // 6. Passport 'yet-to-apply' (allow to proceed)
              if (passport === 'yet-to-apply') {
                setStep(5);
                return;
              }
              // 7. Disqualification for 10th/12th (as before)
              if (education === '10th' || education === '12th') {
                setDisqualifiedReason(
                  education === '10th'
                    ? 'Currently, our partner universities require a minimum of 12th grade or equivalent for study abroad programs. Complete your 12th and come back—we will be here to help you take the next step!'
                    : 'You are just one step away! Please complete your 12th grade and return to explore global opportunities with us.'
                );
                setStep('disqualified');
              } else {
                setStep(5);
              }
            }}
            onCloseOtpPopup={() => setShowOtpPopup(false)}
          />
        </div>
      )}
      {/* Advisory MBBS/Medical page */}
      {step === 'advisory-mbbs' && (
        <AdvisoryMBBSPage
          type={advisoryType === 'mbbs' ? 'mbbs' : 'bachelors'}
          onContinue={() => {
            setStep(0); // Back to home
            setShowMBBSAdvisory(false);
          }}
        />
      )}
      {/* Advisory PhD path page */}
      {step === 'advisory-phd' && (
        <AdvisoryPhDPathPage
          after={advisoryType === 'phd-bachelors' ? 'bachelors' : 'masters'}
          onSelect={(choice) => {
            if (choice === 'masters' || choice === 'mba') {
              setProgram(choice);
              setShowPhDAdvisory(false);
              setStep(5); // Unlock milestone, go to next page
            } else if (choice === 'phd') {
              setShowPhDAdvisory(false);
              setAdvisoryType('mbbs');
              setShowMBBSAdvisory(true);
              setStep('advisory-mbbs');
            }
          }}
        />
      )}
      {/* Advisory Bachelors after Bachelors page */}
      {step === 'advisory-bachelors' && (
        <AdvisoryBachelorsPathPage
          onSelect={(choice) => {
            if (choice === 'masters' || choice === 'mba') {
              setProgram(choice);
              setShowBachelorsAdvisory(false);
              setStep(5); // Unlock milestone, go to next page
            } else if (choice === 'bachelors') {
              setShowBachelorsAdvisory(false);
              setAdvisoryType('bachelors');
              setShowMBBSAdvisory(true);
              setStep('advisory-mbbs');
            }
          }}
        />
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
      {/* Step 10: Country Eligibility Step (moved up in flow) */}
      {step === 10 && (
        <CountryEligibilityStep
          country={country}
          budget={budget}
          backlogs={academicDetails.backlogs}
          onSelectCountry={(newCountry) => {
            // Only update country immediately if not switching from USA with cannot15
            if (country === 'usa' && budget === 'cannot15' && newCountry !== 'usa') {
              // Do not update country here; let the confirmation dialog handle it
              return;
            }
            setCountry(newCountry);
          }}
          onContinue={() => setStep(11)}
          />
      )}
      {/* Step 11: Application Timeline + Preferred University (combined) */}
      {step === 11 && (
        <div style={{ maxWidth: 520, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '40px 32px 32px 32px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span role="img" aria-label="hourglass">⏳</span> Application Timeline
          </h2>
          <div style={{ color: '#374151', fontSize: 16, marginBottom: 18 }}>When do you want to apply for your studies?</div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 22, width: '100%', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
            {['immediately', '3-months', 'not-sure'].map(opt => {
              const option = {
                'immediately': { icon: '⚡', title: 'Immediately', subtitle: 'Start application process now' },
                '3-months': { icon: '📅', title: 'Within 3 months', subtitle: 'Plan to apply soon' },
                'not-sure': { icon: '🤔', title: 'Not Sure Yet', subtitle: 'Still deciding on timeline' },
              }[opt];
              return (
                <div
                  key={opt}
                  onClick={() => setTimeline(opt)}
                  style={{
                    background: timeline === opt ? '#eef2ff' : '#fff',
                    border: timeline === opt ? '2px solid #6366f1' : '1.5px solid #e5e7eb',
                    borderRadius: 12,
                    padding: '22px 18px',
                    cursor: 'pointer',
                    minWidth: 140,
                    maxWidth: 180,
                    minHeight: 120,
                    flex: '1 1 140px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: timeline === opt ? '0 2px 8px #6366f122' : 'none',
                    fontWeight: 500,
                    fontSize: 15,
                    marginBottom: 0,
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 28, marginBottom: 8 }}>{option.icon}</span>
                  <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 16 }}>{option.title}</div>
                  <div style={{ color: '#64748b', fontSize: 14 }}>{option.subtitle}</div>
          </div>
              );
            })}
            </div>
          {/* Preferred University Yes/No */}
          <div style={{ marginTop: 24, width: '100%' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#443eff', marginBottom: 10, textAlign: 'center' }}>
              Do you have a preferred university?
            </h3>
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 18 }}>
              <button
                style={{ background: preferredUniAnswer === 'yes' ? '#e0e7ff' : '#fff', color: '#3730a3', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '10px 22px', fontWeight: 700, fontSize: 15, cursor: 'pointer', minWidth: 100 }}
                onClick={() => setPreferredUniAnswer('yes')}
              >
                Yes
              </button>
              <button
                style={{ background: preferredUniAnswer === 'no' ? '#e0e7ff' : '#fff', color: '#3730a3', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '10px 22px', fontWeight: 700, fontSize: 15, cursor: 'pointer', minWidth: 100 }}
                onClick={() => setPreferredUniAnswer('no')}
              >
                No
              </button>
            </div>
            {/* If Yes, show custom multi-select dropdown with checkboxes and chips */}
            {preferredUniAnswer === 'yes' && (
              <MultiSelectDropdown
                options={universityData[country] || universityData.any}
                selected={selectedPreferredUnis}
                setSelected={setSelectedPreferredUnis}
                max={5}
                placeholder="Select up to 5 preferred universities"
              />
            )}
          </div>
          <button
            style={{ marginTop: 18, background: '#443eff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', minWidth: 120 }}
            disabled={!timeline || (preferredUniAnswer === 'yes' && selectedPreferredUnis.length === 0) || !preferredUniAnswer}
            onClick={() => setStep(12)}
          >
            Continue
          </button>
        </div>
      )}
      {/* Step 12: Preferred Intake Step */}
      {step === 12 && (
        <IntakeSelectionStep
          visible={true}
          onSelect={(intakeValue) => {
            setIntake(intakeValue);
            setStep(13);
          }}
          country={country}
          graduationYear={graduationYear}
          graduationMonth={graduationMonth}
        />
      )}
      {/* Step 13: English Proficiency Test Step */}
      {step === 13 && (
        <EnglishTestDetailsStep
          englishTestStatus={null}
          onSubmit={details => {
            setEnglishTestDetails(details);
            // Always go to name/email page (step 15) after English test/counseling selection
            setStep(15);
          }}
          selectedCity={city}
          intake={intake}
          onEditIntake={() => setStep(11)}
        />
      )}
      {/* Step 15: Final Name and Email Page */}
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
          <FinalCongratulationsPage universityCount={42} passportStatus={passport} />
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
      {showCountrySwitchConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, textAlign: 'center', position: 'relative' }}>
            {/* Close button */}
            <button onClick={() => { setShowCountrySwitchConfirm(false); setPendingCountrySwitch(null); }} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#64748b', cursor: 'pointer', fontWeight: 700, zIndex: 2 }} aria-label="Close">×</button>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309', marginBottom: 12 }}>Select Country</div>
            <div style={{ color: '#1e293b', fontSize: 15, marginBottom: 18 }}>
              You previously selected USA but cannot invest a minimum of 15 lakhs. Do you want to switch to <b>{pendingCountrySwitch && pendingCountrySwitch.toUpperCase()}</b> or stay with USA?
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
              <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
                onClick={() => {
                  setCountry(pendingCountrySwitch);
                  setShowCountrySwitchConfirm(false);
                  setPendingCountrySwitch(null);
                  // Optionally, advance the flow
                  setStep(10); // or whatever is appropriate
                }}>
                Yes, select {pendingCountrySwitch && pendingCountrySwitch.toUpperCase()}
              </button>
              <button style={{ background: '#f3f4f6', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '10px 18px', cursor: 'pointer' }}
                onClick={() => {
                  setShowCountrySwitchConfirm(false);
                  setPendingCountrySwitch(null);
                }}>
                No, stay with USA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// Helper function to check country eligibility by backlogs
function isCountryEligibleByBacklogs(country, backlogs) {
  if (!country) return false;
  if (backlogs > 15) return false;
  if ((country === 'canada' || country === 'usa') && backlogs > 10) return false;
  if (country === 'ireland' && backlogs > 7) return false;
  if (country === 'new-zealand' && backlogs > 8) return false;
  return true;
}

// Add MultiSelectDropdown component at the bottom of the file
function MultiSelectDropdown({ options, selected, setSelected, max = 5, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleToggle = () => setOpen(o => !o);
  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(sid => sid !== id));
    } else if (selected.length < max) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
      <div
        style={{
          minHeight: 48,
          border: '1.5px solid #e5e7eb',
          borderRadius: 10,
          background: '#f8fafc',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
          cursor: 'pointer',
          fontSize: 15,
          position: 'relative',
        }}
        onClick={handleToggle}
      >
        {selected.length === 0 && <span style={{ color: '#64748b' }}>{placeholder}</span>}
        {selected.length > 0 && options.filter(u => selected.includes(u.id)).map(u => (
          <span key={u.id} style={{ background: '#e0e7ff', color: '#3730a3', borderRadius: 16, padding: '6px 14px', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            {u.icon || '🎓'} {u.name}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', color: '#6366f1', fontSize: 18, fontWeight: 700, userSelect: 'none' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          width: '100%',
          background: '#fff',
          border: '1.5px solid #e5e7eb',
          borderRadius: 10,
          boxShadow: '0 4px 16px rgba(99,102,241,0.10)',
          zIndex: 20,
          maxHeight: 260,
          overflowY: 'auto',
          padding: '8px 0',
        }}>
          {options.map(u => (
            <label key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px', cursor: 'pointer', fontSize: 15 }}>
              <input
                type="checkbox"
                checked={selected.includes(u.id)}
                onChange={() => handleSelect(u.id)}
                style={{ accentColor: '#6366f1', width: 18, height: 18 }}
                disabled={!selected.includes(u.id) && selected.length >= max}
              />
              <span style={{ fontWeight: 500 }}>{u.name}</span>
              {u.rank && <span style={{ color: '#64748b', fontSize: 13, marginLeft: 8 }}>{u.rank}</span>}
            </label>
          ))}
        </div>
      )}
      <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Selected: {selected.length}/{max}</div>
    </div>
  );
}

// Helper to generate backlog warning message
function getBacklogWarningMessage(countryObj) {
  if (!countryObj) return null;
  return (
    <>
      You selected <b>{countryObj.name} <span style={{fontSize:22}}>{countryObj.flag}</span></b>, but it doesn't support profiles with <b>{countryObj.minBacklogs}+</b> backlogs.<br />
      <span style={{ fontWeight: 800, color: '#b91c1c', fontSize: 17 }}>
        Try choosing our recommended countries below.
      </span>
    </>
  );
}