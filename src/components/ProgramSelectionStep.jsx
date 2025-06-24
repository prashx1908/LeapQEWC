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
    if (disabled) {
      return {
        position: 'absolute',
        top: -8,
        right: -8,
        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        color: '#dc2626',
        fontSize: 10,
        fontWeight: 700,
        padding: '6px 12px',
        borderRadius: '20px',
        border: '2px solid #fecaca',
        boxShadow: '0 2px 8px rgba(220, 38, 38, 0.15)',
        transform: 'scale(0.9)',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        zIndex: 20,
      };
    }

    const baseStyle = {
      position: 'absolute',
      top: -8,
      right: -8,
      fontSize: 10,
      fontWeight: 700,
      padding: '6px 12px',
      borderRadius: '20px',
      boxShadow: '0 3px 12px rgba(0, 0, 0, 0.15)',
      transform: 'scale(0.95)',
      letterSpacing: '0.3px',
      zIndex: 20,
      border: '2px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)',
    };

    if (tagInfo.tag === 'Recommended') {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: '#ffffff',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        animation: 'pulse-green 2s infinite',
      };
    } else {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: '#ffffff',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      };
    }
  };

  // Enhanced card styles
  const getCardStyles = (opt, selected, tagInfo) => {
    const baseStyle = {
      cursor: opt.disabled ? 'not-allowed' : 'pointer',
      opacity: opt.disabled ? 0.6 : 1,
      position: 'relative',
      width: asPanel ? 200 : 180,
      height: 120,
      background: opt.disabled 
        ? 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
        : selected === opt.value 
          ? 'linear-gradient(135deg, #fef7ff 0%, #faf5ff 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
      border: `2px solid ${selected === opt.value ? '#8b5cf6' : opt.disabled ? '#d1d5db' : '#e5e7eb'}`,
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
    };

    if (!opt.disabled) {
      if (selected === opt.value) {
        baseStyle.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(139, 92, 246, 0.1)';
        baseStyle.transform = 'translateY(-2px) scale(1.02)';
      } else {
        baseStyle.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
      }
      
      // Add hover effect
      baseStyle[':hover'] = {
        transform: 'translateY(-1px)',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1)',
      };
    }

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
      'Popular choice after 12th',
      'High admit rate for your profile',
      'Strong match for your academics',
      'Opens global career paths',
      'In-demand for your field',
      'Great ROI for undergrads',
      'Industry-relevant curriculum',
      'Leads to leadership roles',
    ],
    masters: [
      'Best fit for your background',
      "Popular choice after Bachelor's",
      'High admit rate: 80%+',
      'Strong match for your experience',
      'Smooth transition from your degree',
      'Preferred by top employers',
      'Opens global career paths',
      'In-demand for your field',
      'Aligned with your academic goals',
      'Great ROI for postgraduates',
      'Industry-relevant curriculum',
      'Leads to leadership roles',
    ],
    mba: [
      'Preferred by top employers',
      'Great for career switchers',
      'High admit rate for professionals',
      'Opens management opportunities',
      'Popular after work experience',
      'Strong alumni network',
      'Leads to leadership roles',
    ],
    phd: [
      'Pathway to research careers',
      'Ideal for academic growth',
      'Best fit for researchers',
      'Strong match for scholars',
      'Leads to expert roles',
    ],
    default: [
      'Best fit for your profile',
      'Popular choice for your degree',
      'High admit rate',
      'Strong match for your background',
    ]
  };
  const lowAdmitReasons = {
    bachelors: [
      'Highly competitive program',
      'Limited seats, high cutoff',
      'Admit rate: below 20%',
      'Very competitive for undergrads',
      'Few admits from your background',
      'High bar for international students',
      'Low intake, high demand',
    ],
    masters: [
      'Highly competitive program',
      'Limited seats, high cutoff',
      'Admit rate: below 20%',
      'Research experience preferred',
      'Requires strong academic record',
      'Few admits from your background',
      'Advanced research profile needed',
      'Low intake, high demand',
      'Selective admissions process',
    ],
    mba: [
      'Very competitive for MBA',
      'Preference for top universities',
      'Admit rate: below 20%',
      'Requires strong work experience',
      'Selective admissions process',
    ],
    phd: [
      'Research experience required',
      'Priority to published researchers',
      'Admit rate: below 10%',
      'Selective for research profiles',
      'Preference for top universities',
    ],
    default: [
      'Highly competitive program',
      'Limited seats, high cutoff',
      'Admit rate: below 20%',
      'Very competitive program',
      'Few admits from your background',
    ]
  };
  const lowRoiReasons = [
    'Rarely pursued after graduation',
    'Consider higher studies for better prospects',
    'Not recommended after a bachelor\'s',
    'Better options: Master\'s or MBA',
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
                    {opt.disabled ? '✕ Not Eligible' : tagInfo.tag === 'Recommended' ? '★ Recommended' : tagInfo.tag}
                  </span>
                )}
                {/* Reason below badge */}
                {(tagInfo.tag === 'Recommended' || tagInfo.tag === 'Low Admit Chances' || tagInfo.tag === 'Low ROI') && reason && (
                  <div style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: tagInfo.tag === 'Recommended' ? '#0891b2' : tagInfo.tag === 'Low ROI' ? '#f59e0b' : '#dc2626',
                    fontWeight: 500,
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
                    {opt.disabled ? '✕ Not Eligible' : tagInfo.tag === 'Recommended' ? '★ Recommended' : tagInfo.tag}
                  </span>
                )}
                {/* Reason below badge */}
                {(tagInfo.tag === 'Recommended' || tagInfo.tag === 'Low Admit Chances' || tagInfo.tag === 'Low ROI') && reason && (
                  <div style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: tagInfo.tag === 'Recommended' ? '#0891b2' : tagInfo.tag === 'Low ROI' ? '#f59e0b' : '#dc2626',
                    fontWeight: 500,
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