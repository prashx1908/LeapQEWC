import React, { useState } from 'react';

const initialCountries = [
  { value: 'usa', flag: '🇺🇸', name: 'USA', hint: 'Top for Tech & Business', badge: 'Recommended' },
  { value: 'uk', flag: '🇬🇧', name: 'UK', hint: 'World-Class Universities', badge: 'Recommended' },
  { value: 'canada', flag: '🇨🇦', name: 'Canada', hint: 'Great Immigration Policy', badge: 'Recommended' },
  { value: 'australia', flag: '🇦🇺', name: 'Australia', hint: 'Work & Study Balance' },
  { value: 'germany', flag: '🇩🇪', name: 'Germany', hint: 'Free Education' },
  { value: 'ireland', flag: '🇮🇪', name: 'Ireland', hint: 'Gateway to Europe' },
  { value: 'new-zealand', flag: '🇳🇿', name: 'New Zealand', hint: 'Quality of Life' },
  { value: 'any', flag: '🌎', name: 'Open to Any Country', hint: 'Flexible Destination' },
  { value: 'not-sure', flag: '🌎', name: 'Not Sure', hint: 'Flexible Destination' },
];

const extraCountries = [
  { value: 'france', flag: '🇫🇷', name: 'France', hint: 'Rich Culture' },
  { value: 'netherlands', flag: '🇳🇱', name: 'Netherlands', hint: 'Innovation Hub' },
  { value: 'singapore', flag: '🇸🇬', name: 'Singapore', hint: 'Asian Business Hub' },
  { value: 'sweden', flag: '🇸🇪', name: 'Sweden', hint: 'Innovation & Research' },
  { value: 'denmark', flag: '🇩🇰', name: 'Denmark', hint: 'Quality Education' },
  { value: 'italy', flag: '🇮🇹', name: 'Italy', hint: 'Art & Design' },
  { value: 'spain', flag: '🇪🇸', name: 'Spain', hint: 'Cultural Experience' },
];

const allCountries = [...initialCountries, ...extraCountries];

function CountrySelectionStep({ visible, onSelect, initialValue, eligibleCountries, ineligibleCountries, restrictToEligible }) {
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
    // Move 'not-sure' and 'any' to the end
    const main = countryList.filter(c => c.value !== 'not-sure' && c.value !== 'any');
    const special = countryList.filter(c => c.value === 'not-sure' || c.value === 'any');
    countryList = [...main, ...special];
  }
  const filteredEligible = restrictToEligible
    ? eligibleList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : countryList.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
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

  return (
    <div style={{ width: '100%' }}>
      <h2 className="question-title" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px 0', textAlign: 'center' }}>Where do you want to study?</h2>
      <p className="question-subtitle" style={{ fontSize: 16, color: '#374151', margin: '0 0 16px 0', textAlign: 'center' }}>Choose your preferred destination</p>
      {/* Search bar */}
      <div style={{ width: '100%', marginBottom: 18 }}>
        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 18px',
            border: '2px solid #e5e7eb',
            borderRadius: 14,
            fontSize: 16,
            background: '#f9fafb',
            color: '#222',
            outline: 'none',
            boxSizing: 'border-box',
            margin: 0,
            marginBottom: 0,
            transition: 'border-color 0.2s',
          }}
        />
      </div>
      {/* Country grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 180px)',
          gap: 18,
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        {/* Eligible countries */}
        {filteredEligible.map((c) => (
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
                fontSize: 12,
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
        {/* Ineligible countries with reason */}
        {restrictToEligible && filteredIneligible.map((c) => (
          <div
            key={c.value}
            className="country-card disabled"
            style={cardStyle(false, true)}
            tabIndex={-1}
          >
            <span style={{ fontSize: 32, marginBottom: 4 }}>{c.flag}</span>
            <div style={{ fontWeight: 600, fontSize: 17, color: '#64748b', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'visible', textOverflow: 'clip' }}>{c.name}</div>
            <div style={{ fontSize: 13, color: '#dc2626', marginBottom: 2, textAlign: 'center', whiteSpace: 'normal', lineHeight: 1.2, fontWeight: 700 }}>Ineligible: {c.reason}</div>
          </div>
        ))}
        {/* View All Countries button as a card (only if not restricting) */}
        {!restrictToEligible && !showAll && filteredEligible.length < allCountries.length && (
          <div
            style={{ ...cardStyle(false), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, color: '#6366f1', border: '2px dashed #6366f1', background: '#f3f4f6', cursor: 'pointer' }}
            tabIndex={0}
            onClick={() => setShowAll(true)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setShowAll(true)}
            onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#6366f1'}
          >
            View All Countries
          </div>
        )}
      </div>
    </div>
  );
}

export default CountrySelectionStep; 