import React, { useState, useEffect, forwardRef } from 'react';
import '../style.css';

const ProgramSelectionStep = forwardRef(({ visible, onSelect, initialValue, options = [], question = 'What do you want to study?', asPanel = false, highestEducation }, ref) => {
  const [selected, setSelected] = useState(initialValue || null);

  useEffect(() => {
    if (visible && ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [visible, ref]);

  useEffect(() => {
    setSelected(initialValue || null);
  }, [initialValue]);

  const handleSelect = (value, disabled) => {
    if (disabled) return;
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  if (!visible) return null;

  // Enhanced tag styles based on type
  const getTagStyles = (tagInfo, disabled) => {
    // Uniform badge style for all tags
    let base = {
      position: 'absolute',
      top: -12,
      right: -12,
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 8,
      padding: '2px 8px',
      zIndex: 2,
      letterSpacing: 0.2,
      boxShadow: '0 2px 8px #2563eb22',
      border: '1.5px solid',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    };
    if (disabled) {
      return {
        ...base,
        background: '#fef2f2',
        color: '#b91c1c',
        borderColor: '#fca5a5',
      };
    }
    if (tagInfo.tag === 'Recommended') {
      return {
        ...base,
        background: '#fff',
        color: '#2563eb',
        borderColor: '#2563eb',
      };
    }
    if (tagInfo.tag === 'Low Admit Chances') {
      return {
        ...base,
        background: '#fff7ed',
        color: '#d97706',
        borderColor: '#f59e0b',
      };
    }
    if (tagInfo.tag === 'Low ROI') {
      return {
        ...base,
        background: '#fef9c3',
        color: '#b45309',
        borderColor: '#fde68a',
      };
    }
    return base;
  };

  // Enhanced card styles for uniformity
  const getCardStyles = (opt, selected, tagInfo) => {
    const baseStyle = {
      cursor: opt.disabled ? 'not-allowed' : 'pointer',
      opacity: opt.disabled ? 0.6 : 1,
      position: 'relative',
      width: 180,
      height: 120,
      background: '#fff',
      border: `2px solid ${selected === opt.value ? '#6366f1' : opt.disabled ? '#d1d5db' : '#e5e7eb'}`,
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      fontWeight: 500,
      boxSizing: 'border-box',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'center',
      margin: 0,
      padding: '16px 12px',
      overflow: 'visible',
      boxShadow: selected === opt.value ? '0 8px 32px rgba(99,102,241,0.10)' : '0 1px 4px #6366f111',
    };
    return baseStyle;
  };

  // Add CSS keyframes for animations
  const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-green {
        0%, 100% { 
          box-shadow: 0 3px 12px rgba(16, 185, 129, 0.2), 0 0 0 0 rgba(16, 185, 129, 0.4);
        }
        50% { 
          box-shadow: 0 3px 12px rgba(16, 185, 129, 0.3), 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
      }
      
      .option-card:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1) !important;
      }
      
      .option-card.selected:hover {
        transform: translateY(-2px) scale(1.02) !important;
        box-shadow: 0 10px 40px rgba(139, 92, 246, 0.2) !important;
      }
    `;
    
    if (!document.head.querySelector('#program-selection-animations')) {
      style.id = 'program-selection-animations';
      document.head.appendChild(style);
    }
  };

  useEffect(() => {
    addAnimationStyles();
  }, []);

  // Sort options: recommended, non-recommended (with tag), others, not eligible
  const sortedOptions = [...options].sort((a, b) => {
    const tagA = getProgramTags(highestEducation, a);
    const tagB = getProgramTags(highestEducation, b);
    // Not eligible last
    if (a.disabled && !b.disabled) return 1;
    if (!a.disabled && b.disabled) return -1;
    // Recommended first
    if (tagA && tagA.tag === 'Recommended' && (!tagB || tagB.tag !== 'Recommended')) return -1;
    if ((!tagA || tagA.tag !== 'Recommended') && tagB && tagB.tag === 'Recommended') return 1;
    // Non-recommended (with tag) next
    if (tagA && !a.disabled && (!tagB || b.disabled)) return -1;
    if ((!tagA || a.disabled) && tagB && !b.disabled) return 1;
    // Otherwise, keep original order
    return 0;
  });

  // --- Program-specific reason phrases ---
  const recommendedReasons = {
    bachelors: [
      'Best fit for your background',
      'Smooth transition from school',
      'Popular after 12th',
      'High admit rate',
      'Strong academic match',
      'Opens global careers',
      'In-demand for your field',
      'Great ROI for undergrads',
      'Industry-relevant',
      'Leads to leadership roles',
    ],
    masters: [
      'Best fit for your background',
      'Popular after Bachelors',
      'High admit rate',
      'Strong experience match',
      'Smooth degree transition',
      'Preferred by employers',
      'Opens global careers',
      'In-demand for your field',
      'Aligned with your goals',
      'Great ROI for postgrads',
      'Industry-relevant',
      'Leads to leadership roles',
    ],
    mba: [
      'Preferred by employers',
      'Great for career switch',
      'High admit rate',
      'Opens management roles',
      'Popular after work experience',
      'Strong alumni network',
      'Leads to leadership roles',
    ],
    phd: [
      'Pathway to research',
      'Ideal for academic growth',
      'Best for researchers',
      'Strong scholar match',
      'Leads to expert roles',
    ],
    default: [
      'Best fit for your profile',
      'Popular for your degree',
      'High admit rate',
      'Strong background match',
    ]
  };
  const lowAdmitReasons = {
    bachelors: [
      'Highly competitive',
      'Limited seats, high cutoff',
      'Admit rate: below 20%',
      'Few admits from your background',
      'Low intake, high demand',
    ],
    masters: [
      'Highly competitive',
      'Limited seats, high cutoff',
      'Admit rate: below 20%',
      'Research preferred',
      'Strong academics needed',
      'Few admits from your background',
      'Low intake, high demand',
      'Selective admissions',
    ],
    mba: [
      'Very competitive',
      'Top university preference',
      'Admit rate: below 20%',
      'Strong work experience needed',
      'Selective admissions',
    ],
    phd: [
      'Research required',
      'Priority to published work',
      'Admit rate: below 10%',
      'Selective for research',
      'Top university preference',
    ],
    default: [
      'Highly competitive',
      'Limited seats, high cutoff',
      'Admit rate: below 20%',
      'Few admits from your background',
    ]
  };
  const lowRoiReasons = [
    'Rarely pursued after graduation',
    'Consider higher studies',
    'Not recommended after bachelors',
    'Better: Master\'s or MBA',
  ];
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Panel mode
  if (asPanel) {
    return (
      <div
        ref={ref}
        className={`fold${visible ? ' active' : ''}`}
        style={{
          display: visible ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 0,
          transition: 'opacity 0.3s',
          opacity: visible ? 1 : 0,
          minHeight: '180px',
          position: 'relative',
          zIndex: 10,
          background: 'transparent',
          boxShadow: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        <div className="options-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 200px)', 
          gap: 20, 
          marginTop: 0, 
          marginBottom: 0, 
          justifyContent: 'center', 
          width: '100%' 
        }}>
          {sortedOptions.map(opt => {
            const tagInfo = getProgramTags(highestEducation, opt) || {};
            // Determine program type for reason selection
            let programType = 'default';
            if (opt.value === 'bachelors') programType = 'bachelors';
            if (opt.value === 'masters' || opt.value === 'double-masters') programType = 'masters';
            if (opt.value === 'mba') programType = 'mba';
            if (opt.value === 'phd') programType = 'phd';
            let reason = '';
            if (tagInfo.tag === 'Recommended') reason = getRandom(recommendedReasons[programType] || recommendedReasons.default);
            if (tagInfo.tag === 'Low Admit Chances') {
              if (opt.value === 'phd' && highestEducation !== 'masters' && highestEducation !== 'double-masters') {
                reason = "Preferred after Master's degree";
              } else {
                reason = getRandom(lowAdmitReasons[programType] || lowAdmitReasons.default);
              }
            }
            if (tagInfo.tag === 'Low ROI') reason = getRandom(lowRoiReasons);
            return (
              <div
                key={opt.value}
                className={`option-card${selected === opt.value ? ' selected' : ''}${opt.disabled ? ' disabled' : ''}`}
                data-value={opt.value}
                onClick={() => handleSelect(opt.value, opt.disabled)}
                style={getCardStyles(opt, selected, tagInfo)}
              >
                <span className="option-icon" style={{ 
                  fontSize: 32, 
                  marginBottom: 8,
                  filter: opt.disabled ? 'grayscale(100%)' : 'none',
                  transition: 'filter 0.3s'
                }}>
                  {opt.icon}
                </span>
                <div className="option-text" style={{
                  color: opt.disabled ? '#9ca3af' : '#374151',
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}>
                  {opt.label}
                </div>
                
                {/* Enhanced tag rendering */}
                {(tagInfo.tag || opt.disabled) && (
                  <span style={getTagStyles(tagInfo, opt.disabled)}>
                    {opt.disabled ? <><span style={{ fontWeight: 900, fontSize: 13, marginRight: 3 }}>✗</span> NOT ELIGIBLE</> : tagInfo.tag === 'Recommended' ? 'Recommended' : tagInfo.tag}
                  </span>
                )}
                {/* Reason below badge, uniform muted color */}
                {(tagInfo.tag === 'Recommended' || tagInfo.tag === 'Low Admit Chances' || tagInfo.tag === 'Low ROI') && reason && (
                  <div style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: tagInfo.tag === 'Recommended' ? '#2563eb' : tagInfo.tag === 'Low ROI' ? '#b45309' : '#d97706',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>{reason}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default: card mode
  return (
    <div
      ref={ref}
      className={`fold${visible ? ' active' : ''}`}
      style={{
        display: visible ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 0,
        transition: 'opacity 0.3s',
        opacity: visible ? 1 : 0,
        minHeight: '180px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="question-card" style={{
        maxWidth: 520,
        width: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
        borderRadius: 20,
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        padding: '32px 24px',
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}>
        <h2 className="question-title" style={{ 
          fontSize: 24, 
          marginBottom: 24, 
          textAlign: 'center',
          color: '#1f2937',
          fontWeight: 700,
          letterSpacing: '-0.025em'
        }}>
          {question}
        </h2>
        <div className="options-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginTop: 8,
          justifyItems: 'center',
          width: '100%',
        }}>
          {sortedOptions.map(opt => {
            const tagInfo = getProgramTags(highestEducation, opt) || {};
            // Determine program type for reason selection
            let programType = 'default';
            if (opt.value === 'bachelors') programType = 'bachelors';
            if (opt.value === 'masters' || opt.value === 'double-masters') programType = 'masters';
            if (opt.value === 'mba') programType = 'mba';
            if (opt.value === 'phd') programType = 'phd';
            let reason = '';
            if (tagInfo.tag === 'Recommended') reason = getRandom(recommendedReasons[programType] || recommendedReasons.default);
            if (tagInfo.tag === 'Low Admit Chances') {
              if (opt.value === 'phd' && highestEducation !== 'masters' && highestEducation !== 'double-masters') {
                reason = "Preferred after Master's degree";
              } else {
                reason = getRandom(lowAdmitReasons[programType] || lowAdmitReasons.default);
              }
            }
            if (tagInfo.tag === 'Low ROI') reason = getRandom(lowRoiReasons);
            return (
              <div
                key={opt.value}
                className={`option-card${selected === opt.value ? ' selected' : ''}${opt.disabled ? ' disabled' : ''}`}
                data-value={opt.value}
                onClick={() => handleSelect(opt.value, opt.disabled)}
                style={getCardStyles(opt, selected, tagInfo)}
              >
                <span className="option-icon" style={{ 
                  fontSize: 32, 
                  marginBottom: 8,
                  filter: opt.disabled ? 'grayscale(100%)' : 'none',
                  transition: 'filter 0.3s'
                }}>
                  {opt.icon}
                </span>
                <div className="option-text" style={{
                  color: opt.disabled ? '#9ca3af' : '#374151',
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}>
                  {opt.label}
                </div>
                {/* Enhanced tag rendering */}
                {(tagInfo.tag || opt.disabled) && (
                  <span style={getTagStyles(tagInfo, opt.disabled)}>
                    {opt.disabled ? <><span style={{ fontWeight: 900, fontSize: 13, marginRight: 3 }}>✗</span> NOT ELIGIBLE</> : tagInfo.tag === 'Recommended' ? 'Recommended' : tagInfo.tag}
                  </span>
                )}
                {/* Reason below badge, uniform muted color */}
                {(tagInfo.tag === 'Recommended' || tagInfo.tag === 'Low Admit Chances' || tagInfo.tag === 'Low ROI') && reason && (
                  <div style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: tagInfo.tag === 'Recommended' ? '#2563eb' : tagInfo.tag === 'Low ROI' ? '#b45309' : '#d97706',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>{reason}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const getProgramTags = (highestEducation, option) => {
  if (highestEducation === 'completed-bachelors') {
    if (option.value === 'masters' || option.value === 'mba') {
      return { tag: 'Recommended', tagColor: '#10b981' };
    }
    if (option.value === 'bachelors') {
      return { tag: 'Low ROI', tagColor: '#f59e0b' };
    }
    if (option.value === 'phd') {
      return { tag: 'Low Admit Chances', tagColor: '#f59e0b' };
    }
  }
  if (highestEducation === 'masters') {
    if (option.value === 'masters' || option.value === 'double-masters') {
      return { tag: 'Recommended', tagColor: '#10b981' };
    }
    if (option.value === 'mba') {
      return { tag: 'Recommended', tagColor: '#10b981' };
    }
    if (option.value === 'phd') {
      return { tag: 'Low Admit Chances', tagColor: '#f59e0b' };
    }
  }
  return null;
};
export default ProgramSelectionStep;