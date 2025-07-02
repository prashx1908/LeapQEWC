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
import QuickEvaluationPage from './components/QuickEvaluationPage';
import ProfileNotEligiblePage from './components/ProfileNotEligiblePage';

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

// --- BEGIN NEW CountryEligibilityStep ---
function CountryEligibilityStep({ country, budget, backlogs, onSelectCountry, onContinue }) {
  const recommendedSet = new Set(['usa','canada','uk','ireland','australia','new-zealand','germany']);
  const initialCountry = React.useRef(country).current;
  const [selectedCountry, setSelectedCountry] = React.useState(country);
  const [showMore, setShowMore] = React.useState(false);

  // All countries (priority first, then the rest)
  const priorityOrder = ['usa', 'canada', 'new-zealand', 'uk', 'ireland', 'australia','germany'];
  const countryReqs = [
    { value: 'usa', name: 'USA', flag: '🇺🇸', roi: 60, minBacklogs: 10, minBudget: 35 },
    { value: 'canada', name: 'Canada', flag: '🇨🇦', roi: 45, minBacklogs: 10, minBudget: 15 },
    { value: 'new-zealand', name: 'New Zealand', flag: '🇳🇿', roi: 35, minBacklogs: 8, minBudget: 15 },
    { value: 'uk', name: 'UK', flag: '🇬🇧', roi: 45, minBacklogs: 15, minBudget: 15 },
    { value: 'ireland', name: 'Ireland', flag: '🇮🇪', roi: 35, minBacklogs: 7, minBudget: 15 },
    { value: 'australia', name: 'Australia', flag: '🇦🇺', roi: 35, minBacklogs: 15, minBudget: 15 },
    { value: 'france', name: 'France', flag: '🇫🇷', roi: 30, minBacklogs: 15, minBudget: 15 },
    { value: 'germany', name: 'Germany', flag: '🇩🇪', roi: 28, minBacklogs: 15, minBudget: 15 },
    { value: 'netherlands', name: 'Netherlands', flag: '🇳🇱', roi: 32, minBacklogs: 15, minBudget: 15 },
    { value: 'singapore', name: 'Singapore', flag: '🇸🇬', roi: 50, minBacklogs: 12, minBudget: 15 },
    { value: 'sweden', name: 'Sweden', flag: '🇸🇪', roi: 30, minBacklogs: 12, minBudget: 15 },
    { value: 'denmark', name: 'Denmark', flag: '🇩🇰', roi: 30, minBacklogs: 12, minBudget: 15 },
    { value: 'italy', name: 'Italy', flag: '🇮🇹', roi: 25, minBacklogs: 15, minBudget: 15 },
    { value: 'spain', name: 'Spain', flag: '🇪🇸', roi: 25, minBacklogs: 15, minBudget: 15 },
    // ... add more if needed ...
  ];

  // Helper to check if a country is eligible (backlog first, then budget)
  const isCountryEligible = (c) => {
    if (backlogs > c.minBacklogs) return false;
    if (budget !== undefined && budget !== null) {
      if (
        budget === 'cannot15' ||
        budget === 'cannot invest min 15 lakhs' ||
        budget === 'cannot-invest-15' ||
        budget === 'cannot invest a minimum of 15 lakhs'
      ) {
        return false;
      }
      const userBudget = typeof budget === 'string' ? parseInt(budget) : budget;
      if (userBudget < c.minBudget) return false;
    }
    return true;
  };

  // Reason logic: backlog > budget, with positive personalized messages
  const getCountryReason = (c) => {
    if (backlogs > c.minBacklogs) {
      // Different, relatable messages for each country
      const backlogMessages = {
        'usa': 'Admit rate: below 20%',
        'canada': '2 universities match your profile',
        'new-zealand': 'Admit rate: very limited',
        'uk': 'Low chance, high competition',
        'ireland': 'Few matches, tough admits',
        'australia': 'Only 3 fits, low chance',
        'france': 'Limited: 2 universities found',
        'germany': 'Admit rate: less than 10%',
        'netherlands': 'Admit rate: 1 in 10',
        'singapore': 'Low admit, high cutoff',
        'sweden': 'Just 1 university fits',
        'denmark': 'Admit rate: below 15%',
        'italy': 'Limited options available',
        'spain': 'Very few universities match'
      };
      return backlogMessages[c.value] || 'Limited university options';
    }
    // If ineligible due to budget, show no message
    if (budget !== undefined && budget !== null) {
      const userBudget = typeof budget === 'string' ? parseInt(budget) : budget;
      if (userBudget < c.minBudget) return '';
    }
    return 'Eligible';
  };

  // Split countries into priority and others
  const priorityCountries = priorityOrder.map(val => countryReqs.find(c => c.value === val)).filter(Boolean);
  const otherCountries = countryReqs.filter(c => !priorityOrder.includes(c.value));

  // Find selected country object
  const selectedCountryObj = selectedCountry ? countryReqs.find(c => c.value === selectedCountry) : null;
  const selectedCountryEligible = selectedCountryObj && isCountryEligible(selectedCountryObj);
  const selectedCountryReason = selectedCountryObj ? getCountryReason(selectedCountryObj) : '';

  // The country currently being confirmed (shown in the confirmation section)
  const confirmingCountry = selectedCountryObj ? selectedCountryObj.value : initialCountry;

  // Remove confirming country from the rest of the grid
  const filteredPriority = priorityCountries.filter(c => c.value !== confirmingCountry);
  const filteredOther = otherCountries.filter(c => c.value !== confirmingCountry);
  const eligiblePriority = priorityCountries.filter(c => isCountryEligible(c) && c.value !== confirmingCountry);

  // --- Custom logic for initial country 'not-sure' ---
  let customMessage = null;
  if (initialCountry === 'not-sure') {
    // 1. Budget is 35L and user selects USA
    if (budget && (budget === '35L' || budget === 'can35' || budget === 35 || budget === '35') && selectedCountry === 'usa') {
      customMessage = (
        <div style={{ width: '100%', background: '#fef9c3', border: '2px solid #fde68a', borderRadius: 14, padding: '18px 22px', fontWeight: 700, fontSize: 16, color: '#b45309', marginBottom: 10, textAlign: 'center', boxShadow: '0 2px 8px #fde68a33' }}>
          <span style={{ fontSize: 22, marginRight: 8 }}>ℹ️</span>
          With less than 15 lakhs, options are limited.<br />
          You can select a country for 15 lakhs, or <a href="https://calendly.com/leapcounselor" target="_blank" rel="noopener noreferrer" style={{ color: '#443eff', textDecoration: 'underline' }}>talk to a counselor</a> for financial planning.
        </div>
      );
    }
    // 2. Budget is cannot15
    if (budget && (budget === 'cannot15' || budget === 'cannot invest min 15 lakhs' || budget === 'cannot-invest-15' || budget === 'cannot invest a minimum of 15 lakhs')) {
      customMessage = (
        <div style={{ width: '100%', background: '#fef9c3', border: '2px solid #fde68a', borderRadius: 14, padding: '18px 22px', fontWeight: 700, fontSize: 16, color: '#b45309', marginBottom: 10, textAlign: 'center', boxShadow: '0 2px 8px #fde68a33' }}>
          <span style={{ fontSize: 22, marginRight: 8 }}>ℹ️</span>
          With less than 15 lakhs, options are limited.<br />
          You can select a country for 15 lakhs, or <a href="https://calendly.com/leapcounselor" target="_blank" rel="noopener noreferrer" style={{ color: '#443eff', textDecoration: 'underline' }}>talk to a counselor</a> for financial planning.
        </div>
      );
    }
  }

  // Personalized Message (existing logic)
  let personalizedMessage = null;
  // Show backlog warning if disqualified by backlogs (priority)
  if (
    selectedCountryObj &&
    !selectedCountryEligible &&
    backlogs > selectedCountryObj.minBacklogs
  ) {
    // Special case: if user can only invest 15L, and USA is not eligible due to budget, show USA-specific advisory
    const interpretedBudget = typeof budget === 'string' ? budget.trim().toLowerCase() : budget;
    if (
      selectedCountryObj.value == 'usa' &&
      (interpretedBudget === '15l' || interpretedBudget === 'can15' || interpretedBudget === 15 || interpretedBudget === '15' || interpretedBudget === 'can invest min 15 lakhs' || interpretedBudget === 'can-invest-15' || interpretedBudget === 'can invest a minimum of 15 lakhs' || interpretedBudget === 'minimum 15 lakhs' || interpretedBudget === 'cannot15' || interpretedBudget === 'cannot invest min 15 lakhs' || interpretedBudget === 'cannot-invest-15' || interpretedBudget === 'cannot invest a minimum of 15 lakhs')
    ) {
      personalizedMessage = (
        <div style={{ width: '100%', background: '#fef9c3', border: '2px solid #fde68a', borderRadius: 14, padding: '18px 22px', fontWeight: 700, fontSize: 16, color: '#b45309', marginBottom: 10, textAlign: 'center', boxShadow: '0 2px 8px #fde68a33', lineHeight: 1.6 }}>
          <span style={{ fontSize: 22, marginRight: 8 }}>{selectedCountryObj.flag}</span>
          <b>{selectedCountryObj.name}</b> is a fantastic choice, but it's highly competitive for profiles with more than {selectedCountryObj.minBacklogs} backlogs.<br />
          <span style={{ fontWeight: 600, color: '#b45309', fontSize: 15, display: 'block', marginTop: 8 }}>
            You deserve the best chance at success—let's look at countries where your profile will truly shine!
          </span>
        </div>
      );
    }
  }else if (
    selectedCountryObj &&
    !selectedCountryEligible &&
    backlogs <= selectedCountryObj.minBacklogs &&
    (
      budget === 'cannot15' ||
      budget === 'cannot invest min 15 lakhs' ||
      budget === 'cannot-invest-15' ||
      budget === 'cannot invest a minimum of 15 lakhs'
    ) &&
    selectedCountryObj.minBudget >= 15
  ) {
    // Budget disqualification (and not backlog) for any country
    personalizedMessage = (
      <div style={{ width: '100%', background: '#fef9c3', border: '2px solid #fde68a', borderRadius: 14, padding: '18px 22px', fontWeight: 700, fontSize: 16, color: '#b45309', marginBottom: 10, textAlign: 'center', boxShadow: '0 2px 8px #fde68a33' }}>
        <span style={{ fontSize: 22, marginRight: 8 }}>{selectedCountryObj.flag}</span>
        <b>{selectedCountryObj.name}</b> requires a minimum budget of <b>{selectedCountryObj.minBudget} lakhs</b>.<br />
        Please increase your budget to be eligible for {selectedCountryObj.name}, or explore other options below.
      </div>
    );
  } else if (
    selectedCountryObj &&
    !selectedCountryEligible &&
    selectedCountry === initialCountry
  ) {
    // Fallback (shouldn't normally hit this branch)
    personalizedMessage = (
      <div style={{ width: '100%', background: '#fef9c3', border: '2px solid #fde68a', borderRadius: 14, padding: '18px 22px', fontWeight: 700, fontSize: 16, color: '#b45309', marginBottom: 10, textAlign: 'center', boxShadow: '0 2px 8px #fde68a33' }}>
        <span style={{ fontSize: 22, marginRight: 8 }}>{selectedCountryObj.flag}</span>
        <b>{selectedCountryObj.name}</b> requires a minimum budget of <b>{selectedCountryObj.minBudget} lakhs</b>.<br />
        Please increase your budget to be eligible for {selectedCountryObj.name}, or explore other options below.
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 800, width: '100%', padding: '32px 24px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', gap: 32 }}>
      {/* Header and Description */}
      <div style={{ width: '100%', marginBottom: 18 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#443eff', marginBottom: 6, letterSpacing: '-0.01em', textAlign: 'center' }}>Country Eligibility</h2>
        <div style={{ fontSize: 16, color: '#64748b', fontWeight: 500, textAlign: 'center' }}>
          Select your preferred country below.
        </div>
      </div>
      {/* Custom Message for initial country not-sure */}
      {customMessage}
      {/* Personalized Message */}
      {personalizedMessage}
      {/* Selected Country Confirmation Section (always for selected country) */}
      {selectedCountryObj && (
    <div style={{
          width: '100%',
          background: selectedCountryEligible ? '#e0e7ff' : '#fef2f2',
          border: selectedCountryEligible ? '2px solid #051d96' : '2px solid #fca5a5',
          borderRadius: 14,
          padding: '18px 22px',
          fontWeight: 700,
          fontSize: 16,
          color: selectedCountryEligible ? '#051d96' : '#b91c1c',
          marginBottom: 10,
          textAlign: 'center',
          boxShadow: selectedCountryEligible ? '0 2px 8px #6366f122' : '0 2px 8px #fca5a522',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          position: 'relative',
        }}>
          {/* Backlog warning badge if disqualified by backlogs */}
          {!selectedCountryEligible && backlogs > selectedCountryObj.minBacklogs && (
            <div style={{
              width: '100%',
              background: '#fef9c3',
              border: '2px solid #fde68a',
      borderRadius: 10,
              padding: '10px 0',
              color: '#b45309',
              fontWeight: 700,
      fontSize: 15,
              marginBottom: 10,
            }}>
              {selectedCountryObj.name} allows a maximum of {selectedCountryObj.minBacklogs} backlogs only.<br />
              <span style={{ fontSize: 12, color: '#b45309', fontWeight: 500 }}>
                Since it doesn't match your profile, consider other options below.
              </span>
            </div>
          )}
          
          {/* ...rest of confirmation card code... */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, fontWeight: 800 }}>
            <span>{selectedCountryObj.flag}</span>
            <span>{selectedCountryObj.name}</span>
       
            {initialCountry !== 'not-sure' && selectedCountry === initialCountry && !selectedCountryEligible && (
              <span style={{ background: '#fde68a', color: '#b45309', fontWeight: 700, fontSize: 12, borderRadius: 8, padding: '2px 8px', marginLeft: 10 }}>Consider your option</span>
            )}
            



          </div>
          <div style={{ fontWeight: 600, fontSize: 15, color: selectedCountryEligible ? '#051d96' : '#051d96' }}>{selectedCountryReason}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 10 }}>
            {/* For USA, not eligible due to budget, not backlogs: show warning and custom button order */}
            {selectedCountryObj.value === 'usa' && !selectedCountryEligible && backlogs <= selectedCountryObj.minBacklogs && (
              <>
                {/* USA budget warning */}
                {(
                  (typeof budget === 'string' && (
                    budget === '15L' ||
                    budget === 'can15' ||
                    budget === '15' ||
                    budget === 'can invest min 15 lakhs' ||
                    budget === 'can-invest-15' ||
                    budget === 'can invest a minimum of 15 lakhs' ||
                    budget === 'minimum 15 lakhs'
                  )) ||
                  (typeof budget === 'number' && budget < 35)
                ) && (
                  <div style={{ width: '100%', background: '#fef9c3', border: '2px solid #fde68a', borderRadius: 14, padding: '14px 18px', fontWeight: 700, fontSize: 15, color: '#b45309', marginBottom: 8, textAlign: 'center', boxShadow: '0 2px 8px #fde68a33', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <b>USA requires a minimum budget of 35 lakhs</b>
                    Please increase your budget to be eligible for USA, or explore other options below.
                  </div>
                )}
                <button style={{
                  background: selectedCountryEligible ? '#051d96' : '#b91c1c',
                  color: '#fff',
                  border: selectedCountryEligible ? 'none' : '2px solid #b91c1c',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '14px 0',
                  width: '100%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #6366f122',
                }}
                  onClick={() => { onSelectCountry(selectedCountryObj.value); onContinue(); }}>
                  Yes, select USA for 35 lakhs
                </button>
                <button style={{
                  background: '#fff',
                  color: selectedCountryEligible ? '#051d96' : '#b91c1c',
                  border: selectedCountryEligible ? '2px solid #051d96' : '2px solid #b91c1c',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '14px 0',
                  width: '100%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #6366f122',
                }}
                  onClick={() => onSelectCountry && onSelectCountry('usa-fin-help')}>
                  Talk to financial counsellor
                </button>
                <button style={{
                  background: '#fff',
                  color: selectedCountryEligible ? '#051d96' : '#b91c1c',
                  border: selectedCountryEligible ? '2px solid #051d96' : '2px solid #b91c1c',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '14px 0',
                  width: '100%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #6366f122',
                }}
                  onClick={() => setSelectedCountry(null)}>
                  Explore other countries
                </button>
              </>
            )}
            {selectedCountryObj.value !== 'usa' && (
              <>
                <button style={{
                  background: selectedCountryEligible ? '#051d96' : '#b91c1c',
                  color: '#fff',
                  border: selectedCountryEligible ? 'none' : '2px solid #b91c1c',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '14px 0',
                  width: '100%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #6366f122',
                }}
                  onClick={() => { onSelectCountry(selectedCountryObj.value); onContinue(); }}>
                  Yes, select {selectedCountryObj.name}
                </button>
                {selectedCountryObj.value === 'usa' && !selectedCountryEligible && backlogs <= selectedCountryObj.minBacklogs && (
                  <button style={{
                    background: '#fff',
                    color: selectedCountryEligible ? '#051d96' : '#b91c1c',
                    border: selectedCountryEligible ? '2px solid #051d96' : '2px solid #b91c1c',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 16,
                    padding: '14px 0',
                    width: '100%',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #6366f122',
                  }}
                    onClick={() => onSelectCountry && onSelectCountry('usa-fin-help')}>
                    Talk with a counsellor for financial help
                  </button>
                )}
                <button style={{
                  background: '#fff',
                  color: selectedCountryEligible ? '#051d96' : '#b91c1c',
                  border: selectedCountryEligible ? '2px solid #051d96' : '2px solid #b91c1c',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '14px 0',
                  width: '100%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #6366f122',
                }}
                  onClick={() => setSelectedCountry(null)}>
                  Explore other countries
                </button>
              </>
            )}
          </div>
          
        </div>
      )}
      {/* Country Options Grid */}
      <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 16, border: '2px solid #e5e7eb', padding: '24px 18px', marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px #6366f122' }}>
        <div style={{ fontWeight: 700, fontSize: 17, color: '#6366f1', marginBottom: 16, width: '100%', textAlign: 'center' }}>Explore your Options</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, width: '100%', justifyContent: 'center' }}>
          {/* Selected country always first */}
          {selectedCountryObj && (
    <button
              key={selectedCountryObj.value}
      style={{
                background: selectedCountryEligible ? '#e0f9e6' : '#f3f4f6',
                border: selectedCountryEligible ? '2px solid #4ade80' : '2px solid #d1d5db',
                borderRadius: 12,
                padding: '18px 18px',
        minWidth: 120,
                maxWidth: 180,
                fontWeight: 700,
                fontSize: 15,
                color: selectedCountryEligible ? '#059669' : '#6b7280',
                boxShadow: '0 1px 4px #6366f111',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
        position: 'relative',
                cursor: 'pointer',
                marginBottom: 0,
                transition: 'box-shadow 0.2s, border-color 0.2s',
                gap: 4,
              }}
              onClick={() => setSelectedCountry(selectedCountryObj.value)}
            >
              <span style={{ fontSize: 22, marginBottom: 2 }}>{selectedCountryObj.flag}</span>
              <span>{selectedCountryObj.name}</span>
              <span style={{ color: '#64748b', fontSize: 12, fontWeight: 500 }}>ROI: ₹{selectedCountryObj.roi}L</span>
              {initialCountry !== 'not-sure' && selectedCountry === initialCountry && !selectedCountryEligible && (
                <span style={{ background: '#fde68a', color: '#b45309', fontWeight: 700, fontSize: 11, borderRadius: 8, padding: '2px 8px', marginTop: 6 }}>Consider your option</span>
              )}
              {!selectedCountryEligible && !(initialCountry !== 'not-sure' && selectedCountry === initialCountry) && (
                <span style={{ color: '#6b7280', fontSize: 11, marginTop: 6, fontWeight: 600, textAlign: 'center' }}>Not eligible</span>
              )}
              {selectedCountryEligible && (
                <span style={{ color: '#059669', fontSize: 11, marginTop: 6, fontWeight: 600, textAlign: 'center' }}>Eligible</span>
      )}
    </button>
          )}

          {/* Eligible priority country (not selected) at the top with badge */}
          {eligiblePriority.map((c, idx) => (
      <button
    key={c.value}
        style={{
      background: '#fff',
      border: '2px solid #6366f1',
      borderRadius: 12,
      padding: '18px 18px',
      minWidth: 120,
      maxWidth: 180,
      fontWeight: 700,
      fontSize: 15,
      color: '#1e293b',
      boxShadow: '0 1px 4px #6366f111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
          position: 'relative',
      cursor: 'pointer',
      marginBottom: 0,
      transition: 'box-shadow 0.2s, border-color 0.2s',
      gap: 4,
    }}
    onClick={() => setSelectedCountry(c.value)}
  >
    {/* Recommended badge in top-right */}
    {recommendedSet.has(c.value) && (
          <span style={{
            position: 'absolute',
        top: -12,
        right: -12,
        background: '#fff',
        color: '#2563eb',
        border: '1.5px solid #2563eb',
            fontWeight: 700,
        fontSize: 11,
        borderRadius: 8,
        padding: '2px 8px',
        zIndex: 2,
        boxShadow: '0 2px 8px #2563eb22',
        letterSpacing: 0.2,
          }}>Recommended</span>
        )}
    <span style={{ fontSize: 22, marginBottom: 2 }}>{c.flag}</span>
    <span>{c.name}</span>
    <span style={{ color: '#64748b', fontSize: 12, fontWeight: 500 }}>ROI: ₹{c.roi}L</span>
    <span style={{ color: '#9ca3af', fontSize: 11, fontWeight: 500, marginTop: 2 }}>
      {countryShortDescriptions[c.value] || 'Study Abroad'}
    </span>
    {/* Admit message below ROI for recommended countries */}
    {recommendedSet.has(c.value) && (
      <span style={{ color: '#2563eb', fontSize: 12, fontWeight: 600, marginTop: 6, textAlign: 'center', display: 'block' }}>{getEligibleBadge(idx)}</span>
        )}
      </button>
))}

          {/* Priority countries (excluding selected and eligiblePriority) */}
          {filteredPriority.filter(c => !eligiblePriority.includes(c)).map((c, idx) => {
            const eligible = isCountryEligible(c);
            const reason = getCountryReason(c);
            const isBacklogDisqualified = backlogs > c.minBacklogs;
      return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120, maxWidth: 180 }} key={c.value}>
        <button
          style={{
                    background: eligible ? '#fff' : '#f3f4f6',
                    border: eligible ? '2px solid #6366f1' : '2px solid #d1d5db',
                    borderRadius: 12,
                    padding: '18px 18px',
                    minWidth: 120,
                    maxWidth: 180,
                    fontWeight: 700,
                    fontSize: 15,
                    color: eligible ? '#1e293b' : '#6b7280',
                    boxShadow: '0 1px 4px #6366f111',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
            position: 'relative',
                    cursor: 'pointer',
                    marginBottom: 0,
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                    gap: 4,
                  }}
                  onClick={() => setSelectedCountry(c.value)}
                >
                  {/* Not eligible badge, half inside/outside */}
                  {!eligible && (
            <span style={{
              position: 'absolute',
                      top: -12,
                      right: -12,
                      background: '#fef2f2',
                      color: '#b91c1c',
                      border: '1.5px solid #fca5a5',
              fontWeight: 700,
                      fontSize: 11,
                      borderRadius: 8,
                      padding: '2px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      letterSpacing: 0.2,
                      boxShadow: '0 2px 8px #fca5a533',
                      zIndex: 2,
                    }}>
                      <span style={{ fontWeight: 900, fontSize: 13, marginRight: 3 }}>✗</span> NOT ELIGIBLE
                    </span>
                  )}
                  {/* Recommended badge in top-right for eligible recommended countries */}
                  {eligible && recommendedSet.has(c.value) && (
            <span style={{
                      position: 'absolute',
                      top: -12,
                      right: -12,
                      background: '#fff',
                      color: '#2563eb',
                      border: '1.5px solid #2563eb',
                      fontWeight: 700,
              fontSize: 11,
                      borderRadius: 8,
                      padding: '2px 8px',
                      zIndex: 2,
                      boxShadow: '0 2px 8px #2563eb22',
                      letterSpacing: 0.2,
                    }}>Recommended</span>
                  )}
                  <span style={{ fontSize: 22, marginBottom: 2 }}>{c.flag}</span>
                  <span>{c.name}</span>
                  <span style={{ color: '#64748b', fontSize: 12, fontWeight: 500 }}>ROI: ₹{c.roi}L</span>
                  <span style={{ color: '#9ca3af', fontSize: 11, fontWeight: 500, marginTop: 2 }}>
                    {countryShortDescriptions[c.value] || 'Study Abroad'}
                  </span>
                  {/* Reason for ineligibility inside the card */}
                  {!eligible && isBacklogDisqualified && (
                    <span style={{ color: '#b91c1c', background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 7, fontSize: 11, fontWeight: 500, marginTop: 8, padding: '3px 8px', textAlign: 'center', width: '100%' }}>
                      You have {backlogs} backlogs, max allowed is {c.minBacklogs}.
                    </span>
                  )}
                  {/* Admit message below ROI for recommended countries */}
                  {eligible && recommendedSet.has(c.value) && (
                    <span style={{ color: '#2563eb', fontSize: 12, fontWeight: 600, marginTop: 6, textAlign: 'center', display: 'block' }}>{getEligibleBadge(idx)}</span>
                  )}
          </button>
    </div>
  );
          })}
          {/* Expandable other countries */}
          {showMore && filteredOther.map((c, idx) => {
            const eligible = isCountryEligible(c);
            const reason = getCountryReason(c);
            const isBacklogDisqualified = backlogs > c.minBacklogs;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120, maxWidth: 180 }} key={c.value}>
                <button
                  style={{
                    background: eligible ? '#fff' : '#f3f4f6',
                    border: eligible ? '2px solid #6366f1' : '2px solid #d1d5db',
                    borderRadius: 12,
                    padding: '18px 18px',
                    minWidth: 120,
                    maxWidth: 180,
                    fontWeight: 700,
                    fontSize: 15,
                    color: eligible ? '#1e293b' : '#6b7280',
                    boxShadow: '0 1px 4px #6366f111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
                    position: 'relative',
    cursor: 'pointer',
                    marginBottom: 0,
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                    gap: 4,
                  }}
                  onClick={() => setSelectedCountry(c.value)}
                >
                  {/* Not eligible badge, half inside/outside */}
                  {!eligible && (
                    <span style={{
                      position: 'absolute',
                      top: -12,
                      right: -12,
                      background: '#fef2f2',
                      color: '#b91c1c',
                      border: '1.5px solid #fca5a5',
              fontWeight: 700,
                      fontSize: 11,
                      borderRadius: 8,
                      padding: '2px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
              letterSpacing: 0.2,
                      boxShadow: '0 2px 8px #fca5a533',
                      zIndex: 2,
                    }}>
                      <span style={{ fontWeight: 900, fontSize: 13, marginRight: 3 }}>✗</span> NOT ELIGIBLE
                    </span>
                  )}
                  {/* Recommended badge in top-right for eligible recommended countries */}
                  {eligible && recommendedSet.has(c.value) && (
                    <span style={{
                      position: 'absolute',
                      top: -12,
                      right: -12,
                      background: '#fff',
                      color: '#2563eb',
                      border: '1.5px solid #2563eb',
            fontWeight: 700,
                      fontSize: 11,
                      borderRadius: 8,
                      padding: '2px 8px',
                      zIndex: 2,
                      boxShadow: '0 2px 8px #2563eb22',
            letterSpacing: 0.2,
                    }}>Recommended</span>
                  )}
                <span style={{ fontSize: 22, marginBottom: 2 }}>{c.flag}</span>
                <span>{c.name}</span>
                  <span style={{ color: '#64748b', fontSize: 12, fontWeight: 500 }}>ROI: ₹{c.roi}L</span>
                  <span style={{ color: '#9ca3af', fontSize: 11, fontWeight: 500, marginTop: 2 }}>
                    {countryShortDescriptions[c.value] || 'Study Abroad'}
                  </span>
                  {/* Reason for ineligibility inside the card */}
                  {!eligible && isBacklogDisqualified && (
                    <span style={{ color: '#b91c1c', background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 7, fontSize: 11, fontWeight: 500, marginTop: 8, padding: '3px 8px', textAlign: 'center', width: '100%' }}>
                      You have {backlogs} backlogs, max allowed is {c.minBacklogs}.
                    </span>
                  )}
                  {/* Admit message below ROI for recommended countries */}
                  {eligible && recommendedSet.has(c.value) && (
                    <span style={{ color: '#2563eb', fontSize: 12, fontWeight: 600, marginTop: 6, textAlign: 'center', display: 'block' }}>{getEligibleBadge(idx)}</span>
                  )}
              </button>
          </div>
            );
          })}
        </div>
        {otherCountries.length > 0 && (
        <button
            style={{ marginTop: 18, background: '#e0e7ff', color: '#6366f1', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 700, fontSize: 15, cursor: 'pointer', minWidth: 180 }}
            onClick={() => setShowMore(m => !m)}
        >
            {showMore ? 'Hide other countries' : 'Expand to see more countries'}
        </button>
        )}
      </div>
    </div>
  );
}
// --- END NEW CountryEligibilityStep ---

// Add at the top of App component
const LOCAL_STORAGE_KEY = 'studyAbroadAppProgress';

function saveProgressToStorage(progress) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {}
}

function loadProgressFromStorage() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) { return null; }
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

  // On mount, load progress if available
  useEffect(() => {
    const saved = loadProgressFromStorage();
    if (saved) {
      setEducation(saved.education ?? null);
      setProgram(saved.program ?? null);
      setCountry(saved.country ?? null);
      setStep(saved.step ?? 0);
      setIntake(saved.intake ?? null);
      setEnglish(saved.english ?? null);
      setPassport(saved.passport ?? null);
      setCity(saved.city ?? null);
      setPhone(saved.phone ?? '');
      setOtp(saved.otp ?? '');
      setShowOtpPopup(saved.showOtpPopup ?? false);
      setApplicationSaved(saved.applicationSaved ?? false);
      setSaving(saved.saving ?? false);
      setButtonLoading(saved.buttonLoading ?? { download: false, view: false });
      setAcademicDetails(saved.academicDetails ?? {});
      setBudget(saved.budget ?? null);
      setFinanceMode(saved.financeMode ?? null);
      setSelectedUniversities(saved.selectedUniversities ?? []);
      setTimeline(saved.timeline ?? null);
      setEnglishTestDetails(saved.englishTestDetails ?? null);
      setGraduationYear(saved.graduationYear ?? null);
      setGraduationMonth(saved.graduationMonth ?? null);
      setDisqualifiedReason(saved.disqualifiedReason ?? null);
      setContactDetails(saved.contactDetails ?? null);
      setAdvisoryType(saved.advisoryType ?? null);
      setShowPhDAdvisory(saved.showPhDAdvisory ?? false);
      setShowMBBSAdvisory(saved.showMBBSAdvisory ?? false);
      setShowBachelorsAdvisory(saved.showBachelorsAdvisory ?? false);
      setPreferredUniAnswer(saved.preferredUniAnswer ?? 'not-sure');
      setSelectedPreferredUnis(saved.selectedPreferredUnis ?? []);
    }
  }, []);

  // On any relevant state change, save progress
  useEffect(() => {
    saveProgressToStorage({
      education,
      program,
      country,
      step,
      intake,
      english,
      passport,
      city,
      phone,
      otp,
      showOtpPopup,
      applicationSaved,
      saving,
      buttonLoading,
      academicDetails,
      budget,
      financeMode,
      selectedUniversities,
      timeline,
      englishTestDetails,
      graduationYear,
      graduationMonth,
      disqualifiedReason,
      contactDetails,
      advisoryType,
      showPhDAdvisory,
      showMBBSAdvisory,
      showBachelorsAdvisory,
      preferredUniAnswer,
      selectedPreferredUnis,
    });
  }, [education, program, country, step, intake, english, passport, city, phone, otp, showOtpPopup, applicationSaved, saving, buttonLoading, academicDetails, budget, financeMode, selectedUniversities, timeline, englishTestDetails, graduationYear, graduationMonth, disqualifiedReason, contactDetails, advisoryType, showPhDAdvisory, showMBBSAdvisory, showBachelorsAdvisory, preferredUniAnswer, selectedPreferredUnis]);

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

  // Before the return statement in App:
  const backlogsNum = Number(academicDetails.backlogs);
  const gradeNum = Number(academicDetails.gradeValue);
  const hasLowBacklogs = !isNaN(backlogsNum) && backlogsNum < 6;
  const hasLowGrade = academicDetails.gradeType === 'percentage' && !isNaN(gradeNum) && gradeNum < 55;
  const hasInvalidGapDoc = academicDetails.gap === '36' && !academicDetails.gapDoc;
  const showQuickEval = hasLowBacklogs || hasLowGrade || hasInvalidGapDoc;
  console.log('backlogs:', academicDetails.backlogs, 'grade:', academicDetails.gradeValue, 'showQuickEval:', showQuickEval);

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
        position: 'relative',
      }}
    >
      {/* Back Button (show if not on first step and step is a number) */}
      {step > 0 && typeof step === 'number' && (
        <button
          onClick={() => setStep(step - 1)}
          aria-label="Go back"
          style={{
            position: 'absolute',
            top: 24,
            left: 18,
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            zIndex: 10,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = 1)}
          onMouseOut={e => (e.currentTarget.style.opacity = 0.7)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#443eff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      {/* Add sticky header with logo and progress bar */}
      <div style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'transparent',
        margin: 0,
        padding: '32px 0 0 0',
        position: 'relative',
      }}>
        <div className="logo-3d-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div className="logo-3d" style={{ width: 64, height: 64, marginBottom: 4 }}>
            <img src="https://leapassets.s3.ap-south-1.amazonaws.com/ielts-recording/1619511191304-logo@2x_(1)_(1).png" alt="Leap Scholar Logo" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 2px 12px #6366f1aa)' }} />
          </div>
          <div style={{ fontWeight: 900, fontSize: 22, color: '#443eff' }}>LEAP SCHOLAR</div>
        </div>
      </div>
      {step !== 5 && step !== 'advisory-phd' && <ProgressBar step={step} />}
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
          {showQuickEval ? (
            <QuickEvaluationPage onContinue={() => setStep(7)} />
          ) : (
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
          )}
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
              // If user selects 'not-sure' and is not DQ by backlogs, skip country eligibility
              if (budgetValue === 'not-sure') {
                // Find the selected country (normalize to lowercase)
                const normalizedCountry = country ? country.trim().toLowerCase() : '';
                // Country requirements table
                const countryReqs = [
                  { value: 'usa', minBacklogs: 10 },
                  { value: 'canada', minBacklogs: 10 },
                  { value: 'new-zealand', minBacklogs: 8 },
                  { value: 'uk', minBacklogs: 15 },
                  { value: 'ireland', minBacklogs: 7 },
                  { value: 'australia', minBacklogs: 15 },
                  { value: 'france', minBacklogs: 15 },
                  { value: 'germany', minBacklogs: 15 },
                  { value: 'netherlands', minBacklogs: 15 },
                  { value: 'singapore', minBacklogs: 12 },
                  { value: 'sweden', minBacklogs: 12 },
                  { value: 'denmark', minBacklogs: 12 },
                  { value: 'italy', minBacklogs: 15 },
                  { value: 'spain', minBacklogs: 15 },
                ];
                const countryObj = countryReqs.find(c => c.value === normalizedCountry);
                const backlogsNum = academicDetails.backlogs || 0;
                if (countryObj && backlogsNum <= countryObj.minBacklogs) {
                  setBudget(budgetValue);
                  setStep(9); // Go to finance mode step, not directly to application timeline
                  return;
                }
              }
              setBudget(budgetValue);
              setStep(9); // Always advance to finance mode
            }}
            country={country ? country.trim().toLowerCase() : ''}
          />
        </div>
      )}
      {/* Step 9: Finance Mode */}
      {step === 9 && budget && !financeMode && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 500, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <FinanceStep
            onSelect={(mode) => {
              // USA special flow
              if (country === 'usa') {
                const interpretedBudget = interpretBudget(budget);
                const backlogsNum = academicDetails.backlogs || 0;
                if (backlogsNum > 10) {
              setFinanceMode(mode);
                  setStep(10); // Always show eligibility page with backlog message
                  return;
                }
                if (interpretedBudget === 'can35') {
                  setFinanceMode(mode);
                  setStep(11); // Allow USA, skip eligibility page
                  return;
                }
                if (interpretedBudget === 'can15') {
                  setFinanceMode(mode);
                  setStep(10); // Go directly to country eligibility grid
                  return;
                }
                if (interpretedBudget === 'cannot15') {
                  setFinanceMode(mode);
                  setStep('usa-counsellor'); // Show counsellor message, no grid
                  return;
                }
                if (interpretedBudget === 'not-sure') {
                  setFinanceMode(mode);
                  setStep(11); // Skip eligibility page
                  return;
                }
              }
              // --- Custom logic for initial country not-sure ---
              if (country === 'not-sure') {
                const interpretedBudget = interpretBudget(budget);
                if (interpretedBudget === 'not-sure') {
                  setFinanceMode(mode);
                  setStep(11); // Skip country eligibility
                  return;
                }
              }
              // New: For non-USA, skip eligibility if not disqualified by backlogs and budget is enough
              const countryReqs = [
                { value: 'usa', name: 'USA', flag: '🇺🇸', roi: 60, minBacklogs: 10, minBudget: 35 },
                { value: 'canada', name: 'Canada', flag: '🇨🇦', roi: 45, minBacklogs: 10, minBudget: 15 },
                { value: 'new-zealand', name: 'New Zealand', flag: '🇳🇿', roi: 35, minBacklogs: 8, minBudget: 15 },
                { value: 'uk', name: 'UK', flag: '🇬🇧', roi: 45, minBacklogs: 15, minBudget: 15 },
                { value: 'ireland', name: 'Ireland', flag: '🇮🇪', roi: 35, minBacklogs: 7, minBudget: 15 },
                { value: 'australia', name: 'Australia', flag: '🇦🇺', roi: 35, minBacklogs: 15, minBudget: 15 },
                { value: 'france', name: 'France', flag: '🇫🇷', roi: 30, minBacklogs: 15, minBudget: 15 },
                { value: 'germany', name: 'Germany', flag: '🇩🇪', roi: 28, minBacklogs: 15, minBudget: 15 },
                { value: 'netherlands', name: 'Netherlands', flag: '🇳🇱', roi: 32, minBacklogs: 15, minBudget: 15 },
                { value: 'singapore', name: 'Singapore', flag: '🇸🇬', roi: 50, minBacklogs: 12, minBudget: 15 },
                { value: 'sweden', name: 'Sweden', flag: '🇸🇪', roi: 30, minBacklogs: 12, minBudget: 15 },
                { value: 'denmark', name: 'Denmark', flag: '🇩🇰', roi: 30, minBacklogs: 12, minBudget: 15 },
                { value: 'italy', name: 'Italy', flag: '🇮🇹', roi: 25, minBacklogs: 15, minBudget: 15 },
                { value: 'spain', name: 'Spain', flag: '🇪🇸', roi: 25, minBacklogs: 15, minBudget: 15 },
              ];
              const countryObj = countryReqs.find(c => c.value === country);
              const backlogsNum = academicDetails.backlogs || 0;
              const interpretedBudget = interpretBudget(budget);
              if (budget === 'not-sure') {
                setFinanceMode(mode);
                setStep(11); // Go directly to application timeline
                return;
              }
              if (
                countryObj &&
                backlogsNum <= countryObj.minBacklogs &&
                ((interpretedBudget === 'can35' && countryObj.minBudget <= 35) ||
                 (interpretedBudget === 'can15' && countryObj.minBudget <= 15))
              ) {
                setFinanceMode(mode);
                setStep(11); // Go directly to application timeline
                return;
              }
              setFinanceMode(mode);
              setStep(10); // Otherwise, show country eligibility
            }}
            initialValue={financeMode}
          />
        </div>
      )}
      {/* Step: USA 15L budget message */}
      {step === 'usa-15-budget' && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 600, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#b45309', marginBottom: 16, textAlign: 'center' }}>
            If you increase your budget a bit, you can get USA.<br />
            With 15 lakhs, these other countries are eligible for your profile.
          </div>
          <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, padding: '14px 0', width: '100%', maxWidth: 320, cursor: 'pointer', boxShadow: '0 2px 8px #6366f122', margin: '0 auto 18px auto' }}
            onClick={() => setStep(10)}>
            Explore eligible countries
          </button>
        </div>
      )}
      {/* Step: USA counsellor message */}
      {step === 'usa-counsellor' && (
        <div style={{ marginTop: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', maxWidth: 600, width: '100%', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#b91c1c', marginBottom: 16, textAlign: 'center' }}>
            Talk with a counsellor regarding your financial decision or stay with the current country.
          </div>
          <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, padding: '14px 0', width: '100%', maxWidth: 320, cursor: 'pointer', boxShadow: '0 2px 8px #6366f122', margin: '0 auto 18px auto' }}
            onClick={() => window.open('https://calendly.com/leapcounselor', '_blank')}>
            Talk to a counsellor
          </button>
          <button style={{ background: '#fff', color: '#6366f1', border: '2px solid #e0e7ff', borderRadius: 10, fontWeight: 700, fontSize: 16, padding: '14px 0', width: '100%', maxWidth: 320, cursor: 'pointer', boxShadow: '0 2px 8px #6366f122', margin: '0 auto' }}
            onClick={() => setStep(9)}>
            Stay with current country
          </button>
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
            setCountry(newCountry && typeof newCountry === 'string' ? newCountry.toLowerCase() : newCountry);
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
          {((academicDetails.gradeType === 'percentage' && Number(academicDetails.gradeValue) < 55) ||
            (academicDetails.gradeType === 'cgpa' && Number(academicDetails.gradeValue) < 6) ||
            (academicDetails.gap === '36' && !academicDetails.gapDoc)) ? (
            <ProfileNotEligiblePage />
          ) : (
            <FinalCongratulationsPage universityCount={42} passportStatus={passport} />
          )}
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
                  setCountry(pendingCountrySwitch && typeof pendingCountrySwitch === 'string' ? pendingCountrySwitch.toLowerCase() : pendingCountrySwitch);
                  setShowCountrySwitchConfirm(false);
                  setPendingCountrySwitch(null);
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
function interpretBudget(budget) {
  if (!budget) return null;
  const b = typeof budget === 'string' ? budget.trim().toLowerCase() : budget;
  if (b === '35l' || b === 'can35' || b === 35 || b === '35' || b === 'can invest min 35 lakhs' || b === 'can-invest-35' || b === 'can invest a minimum of 35 lakhs' || b === 'minimum 35 lakhs') return 'can35';
  if (b === '15l' || b === 'can15' || b === 15 || b === '15' || b === 'can invest min 15 lakhs' || b === 'can-invest-15' || b === 'can invest a minimum of 15 lakhs' || b === 'minimum 15 lakhs') return 'can15';
  if (b === 'cannot15' || b === 'cannot invest min 15 lakhs' || b === 'cannot-invest-15' || b === 'cannot invest a minimum of 15 lakhs') return 'cannot15';
  if (b === 'not-sure' || b === 'not sure') return 'not-sure';
  return null;
}

// Helper: get a positive, specific badge for eligible countries
const eligibleBadges = [
  'Admit rate: above 70%',
  'Best fit: 3 universities',
  'High admit, strong match',
  'Admit rate: 4 in 5',
  'Optimal: 2 universities found',
  'Great fit, high admit rate',
  'Admit rate: 80%+',
];
function getEligibleBadge(index) {
  return eligibleBadges[index % eligibleBadges.length];
}

// Add a mapping for short descriptions for each country:
const countryShortDescriptions = {
  france: 'Affordable Europe',
  netherlands: 'Tech Gateway',
  singapore: 'STEM Hub',
  sweden: 'Innovation Leader',
  denmark: 'Green Careers',
  italy: 'Design & Arts',
  spain: 'Business Focus',
  germany: 'Engineering Power',
  newzealand: 'Nature & Study',
  // ...add more as needed...
};

// Add a common warning/info box component:
function Min15LakhWarningBox() {
  return (
    <div style={{
      width: '100%',
      background: '#fef9c3',
      border: '2px solid #fde68a',
      borderRadius: 10,
      padding: '12px 0',
      color: '#b45309',
      fontWeight: 700,
      fontSize: 15,
      margin: '10px 0',
      textAlign: 'center',
    }}>
      Can't invest a min of 15 lakhs<br />
      <span style={{ fontWeight: 600, color: '#b91c1c', fontSize: 14, display: 'block', marginTop: 4 }}>
        Not recommended<br />
        We recommend considering financial decision help from our counsellor.
      </span>
    </div>
  );
}