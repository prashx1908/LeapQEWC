import React, { useState } from 'react';

const initialCountries = [
  { value: 'any', flag: '🤔', name: 'Not sure', hint: 'All Destinations' },
  { value: 'select-country', flag: '🌍', name: 'Select country', hint: '', badge: '' },
  { value: 'usa', flag: '🇺🇸', name: 'USA', hint: 'Top STEM Choice', badge: 'Top destination' },
  { value: 'uk', flag: '🇬🇧', name: 'UK', hint: '1-Year Masters', badge: 'Top destination' },
  { value: 'canada', flag: '🇨🇦', name: 'Canada', hint: 'Work & PR', badge: 'Student favourite' },
  { value: 'australia', flag: '🇦🇺', name: 'Australia', hint: 'PR Friendly', badge: 'PR Path' },
  { value: 'new-zealand', flag: '🇳🇿', name: 'New Zealand', hint: 'Safe & Welcoming', badge: 'Good Work Permit' },
  { value: 'ireland', flag: '🇮🇪', name: 'Ireland', hint: 'Tech Careers', badge: 'Tech Hub' },
  { value: 'germany', flag: '🇩🇪', name: 'Germany', hint: 'Low Tuition', badge: 'Low Tuition' },
];

const extraCountries = [
  { value: 'france', flag: '🇫🇷', name: 'France', hint: 'Business Schools' },
  { value: 'netherlands', flag: '🇳🇱', name: 'Netherlands', hint: 'English Programs' },
  { value: 'singapore', flag: '🇸🇬', name: 'Singapore', hint: 'Asia Innovation' },
  { value: 'sweden', flag: '🇸🇪', name: 'Sweden', hint: 'Tech & Design' },
  { value: 'denmark', flag: '🇩🇰', name: 'Denmark', hint: 'Project Learning' },
  { value: 'italy', flag: '🇮🇹', name: 'Italy', hint: 'Design & Arts' },
  { value: 'spain', flag: '🇪🇸', name: 'Spain', hint: 'Business, Hospitality' },
];

const reorderedInitial = [
  initialCountries[0], // Not sure
  initialCountries[1], // Select country
  initialCountries[2], // USA
  initialCountries[3], // UK
  initialCountries[4], // Canada
  initialCountries[5], // Australia
  initialCountries[6], // New Zealand
  initialCountries[7], // Ireland
  initialCountries[8], // Germany
  ...initialCountries.slice(9)
];
const allCountries = [...reorderedInitial, ...extraCountries];

function CountrySelectionStep({ visible, onSelect, initialValue, eligibleCountries, ineligibleCountries, restrictToEligible, isChangingFromBudget, showUSAWarning }) {
  const [selected, setSelected] = useState(initialValue || null);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState('');

  if (!visible) return null;

  // If restrictToEligible, filter out 'any' and 'not-sure' and use eligible/ineligible lists
  let eligibleList = eligibleCountries || [];
  let ineligibleList = ineligibleCountries || [];

  if (restrictToEligible) {
    eligibleList = eligibleList.filter(c => c.value !== 'any' && c.value !== 'not-sure');
    ineligibleList = ineligibleList.filter(c => c.value !== 'any' && c.value !== 'not-sure');
  }

  // Filter by search
  let countryList = showAll ? allCountries : initialCountries;
  if (showAll) {
    // Move only 'any' to the end, completely remove 'not-sure'
    const main = countryList.filter(c => c.value !== 'not-sure' && c.value !== 'any');
    const special = countryList.filter(c => c.value === 'any');
    countryList = [...main, ...special];
  }
  const filteredEligible = restrictToEligible
    ? eligibleList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : countryList.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) && c.value !== 'not-sure');
  const filteredIneligible = restrictToEligible
    ? ineligibleList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const handleSelect = (value) => {
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  // Card style for both country and button
  const cardStyle = (isSelected = false, disabled = false) => ({
    width: 180,
    height: 120,
    background: disabled ? '#f3f4f6' : '#fff',
    border: isSelected ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    boxShadow: isSelected ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
    padding: 0,
    overflow: 'hidden',
    margin: 0,
    outline: 'none',
    userSelect: 'none',
    opacity: disabled ? 0.6 : 1,
  });

  // Render full-width cards for the first two options
  const fullWidthCardStyle = (isSelected = false) => ({
    width: '100%',
    height: 80,
    background: '#fff',
    border: isSelected ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    position: 'relative',
    boxShadow: isSelected ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
    padding: '0 24px',
    marginBottom: 14,
    outline: 'none',
    userSelect: 'none',
    fontWeight: 600,
    fontSize: 18,
  });

  // For full-width cards, handle select-country as a trigger for showAll, and 'any' as open to any country
  const handleFullWidthSelect = (value) => {
    if (value === 'select-country') {
      setShowAll(true);
    } else if (value === 'any') {
      handleSelect('any');
    } else {
      handleSelect(value);
    }
  };

  // Center align full-width cards
  const fullWidthCardsWrapper = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    marginBottom: 10
  };

  return (
    <div style={{
      width: '100%',
      minHeight: showAll ? '70vh' : '40vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'min-height 0.3s, padding 0.3s',
      padding: showAll ? '48px 0 32px 0' : '24px 0 12px 0',
      background: '#fff',
      borderRadius: 24,
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      margin: '0 auto',
      maxWidth: 520
    }}>
      <h2 className="question-title" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px 0', textAlign: 'center' }}>
      {isChangingFromBudget ? "Update Your Country Preference" : "Where do you want to study?"}
      </h2>
      {/* USA Budget Warning */}
      {showUSAWarning && (
        <div style={{
          background: '#fff7ed',
          color: '#9a3412',
          padding: '12px 16px',
          borderRadius: 12,
          margin: '8px 24px',
          fontSize: 15,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid #fed7aa'
        }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          USA requires a minimum budget of 35 lakhs. If you can provide this, you can proceed with USA or explore other countries.
        </div>
      )}
      <p className="question-subtitle" style={{ fontSize: 16, color: '#374151', margin: '0 0 16px 0', textAlign: 'center' }}>
        {isChangingFromBudget ? (
          <span>
            Based on your budget, let's select the best study destination for you
            <div style={{ 
              background: '#f0f9ff', 
              color: '#0369a1', 
              padding: '12px 16px', 
              borderRadius: 12, 
              margin: '12px 0',
              fontSize: 15,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span style={{ fontSize: 20 }}>💡</span>
              These countries offer excellent education with your planned investment range
            </div>
          </span>
        ) : (
          ""
        )}
      </p>
      {/* Full-width cards for Not sure and select-country */}
      <div style={fullWidthCardsWrapper}>
        {(!isChangingFromBudget && !restrictToEligible) && [initialCountries[0]].map((c) => (
          <div
            key={c.value}
            className={`country-card${selected === c.value ? ' selected' : ''}`}
            style={{
              ...fullWidthCardStyle(selected === c.value),
              justifyContent: 'center',
              position: 'relative',
            }}
            tabIndex={0}
            onClick={() => handleFullWidthSelect(c.value)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleFullWidthSelect(c.value)}
          >
            <span style={{ fontSize: 32, marginRight: 18 }}>{c.flag}</span>
            <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 18 }}>{c.name}</span>
            {c.badge && (
              <span style={{
                position: 'absolute',
                top: 12,
                right: 24,
                background: 'rgba(99,102,241,0.10)',
                color: '#6366f1',
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 8,
                padding: '2px 10px',
                zIndex: 2,
                letterSpacing: 0.2,
                boxShadow: '0 1px 4px rgba(99,102,241,0.07)'
              }}>{c.badge}</span>
            )}
            {selected === c.value && c.value !== 'select-country' && (
              <span style={{
                position: 'absolute',
                right: 24,
                background: '#6366f1',
                color: '#fff',
                borderRadius: '50%',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                fontWeight: 700,
              }}>✓</span>
            )}
          </div>
        ))}
        {/* Always show select-country option */}
        <div
          key={initialCountries[1].value}
          className={`country-card${selected === initialCountries[1].value ? ' selected' : ''}`}
          style={{
            ...fullWidthCardStyle(selected === initialCountries[1].value),
            justifyContent: 'center',
            position: 'relative',
          }}
          tabIndex={0}
          onClick={() => handleFullWidthSelect(initialCountries[1].value)}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleFullWidthSelect(initialCountries[1].value)}
        >
          <span style={{ fontSize: 32, marginRight: 18 }}>{initialCountries[1].flag}</span>
          <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 18 }}>{initialCountries[1].name}</span>
          {selected === initialCountries[1].value && (
            <span style={{
              position: 'absolute',
              right: 24,
              background: '#6366f1',
              color: '#fff',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 700,
            }}>✓</span>
          )}
          {/* Add down arrow for select-country */}
          <span style={{ fontSize: 22, marginLeft: 14, color: '#6366f1', position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)' }}>▼</span>
        </div>
      </div>
      {/* Country grid (show only if showAll is true) */}
      {showAll && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 180px)',
            gap: 18,
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          {/* Show all countries except select-country and not-sure/any if isChangingFromBudget or restrictToEligible */}
          {filteredEligible
            .filter((c) => c.value !== 'select-country' && (!isChangingFromBudget && !restrictToEligible ? true : (c.value !== 'any' && c.value !== 'not-sure')))
            .map((c) => (
              <div
                key={c.value}
                className={`country-card${selected === c.value ? ' selected' : ''}`}
                style={cardStyle(selected === c.value)}
                tabIndex={0}
                onClick={() => handleSelect(c.value)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSelect(c.value)}
                onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
                onMouseOut={e => e.currentTarget.style.borderColor = selected === c.value ? '#6366f1' : '#e5e7eb'}
              >
                {c.badge && (
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 12,
                    background: '#e0f2fe',
                    color: '#0891b2',
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 12,
                    padding: '2px 10px',
                    zIndex: 2,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    letterSpacing: 0.2,
                  }}>{c.badge}</div>
                )}
                <span style={{ fontSize: 32, marginBottom: 4 }}>{c.flag}</span>
                <div style={{ fontWeight: 600, fontSize: 17, color: '#1e293b', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'visible', textOverflow: 'clip' }}>{c.name}</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 2, textAlign: 'center', whiteSpace: 'normal', lineHeight: 1.2 }}>{c.hint}</div>
                {selected === c.value && (
                  <span style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: '#6366f1',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    fontWeight: 700,
                  }}>✓</span>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default CountrySelectionStep; 