import React, { useState, useRef, useEffect } from 'react';

const passportOptions = [
  { value: 'bearer', icon: '🛂', label: 'Yes, I have' },
  { value: 'applied', icon: '✅', label: 'I have applied, will receive soon' },
  { value: 'yet-to-apply', icon: '📄', label: 'No, yet to apply for passport' },
];

const mainCities = [
  { value: 'bangalore', name: 'Bangalore', emoji: '🏙️' },
  { value: 'hyderabad', name: 'Hyderabad', emoji: '🏙️' },
  { value: 'delhi', name: 'Delhi', emoji: '🏛️' },
  { value: 'mumbai', name: 'Mumbai', emoji: '🏙️' },
  { value: 'chennai', name: 'Chennai', emoji: '🌴' },
  { value: 'pune', name: 'Pune', emoji: '🌇' },
  { value: 'kolkata', name: 'Kolkata', emoji: '🌉' },
  { value: 'jaipur', name: 'Jaipur', emoji: '🏰' },
  { value: 'ludhiana', name: 'Ludhiana', emoji: '🏞️' },
];

const allCities = [
  ...mainCities,
  { value: 'ahmedabad', name: 'Ahmedabad', emoji: '🏭' },
  { value: 'lucknow', name: 'Lucknow', emoji: '🍽️' },
  { value: 'kanpur', name: 'Kanpur', emoji: '🏭' },
  { value: 'nagpur', name: 'Nagpur', emoji: '🌳' },
  { value: 'indore', name: 'Indore', emoji: '🏢' },
  { value: 'thane', name: 'Thane', emoji: '🌆' },
  { value: 'bhopal', name: 'Bhopal', emoji: '🏛️' },
  { value: 'visakhapatnam', name: 'Visakhapatnam', emoji: '🌊' },
  { value: 'patna', name: 'Patna', emoji: '🏛️' },
  { value: 'vadodara', name: 'Vadodara', emoji: '🏛️' },
  { value: 'ghaziabad', name: 'Ghaziabad', emoji: '🏢' },
  { value: 'coimbatore', name: 'Coimbatore', emoji: '🏭' },
  { value: 'kochi', name: 'Kochi', emoji: '🌊' },
  { value: 'guwahati', name: 'Guwahati', emoji: '🌿' },
  { value: 'chandigarh', name: 'Chandigarh', emoji: '🏛️' },
  { value: 'amritsar', name: 'Amritsar', emoji: '🕌' },
  { value: 'varanasi', name: 'Varanasi', emoji: '🕍' },
  { value: 'mysore', name: 'Mysore', emoji: '🏰' },
  { value: 'jodhpur', name: 'Jodhpur', emoji: '🏰' },
  { value: 'ranchi', name: 'Ranchi', emoji: '🌳' },
  { value: 'gwalior', name: 'Gwalior', emoji: '🏰' },
];

function EnglishPassportStep({ passport, city, onPassportSelect, onCitySelect, onContinue }) {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState('');
  const citySectionRef = useRef(null);

  // Scroll to city section when passport is selected
  useEffect(() => {
    if (passport && citySectionRef.current) {
      citySectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [passport]);

  const citiesToShow = (showAll ? allCities : mainCities).filter(cityObj =>
    cityObj.name.toLowerCase().includes(search.toLowerCase())
  );

  // Helper: if both passport and city are selected, go to next step
  const handleCityClick = (cityValue) => {
    onCitySelect(cityValue);
    if (passport) {
      onContinue();
    }
  };

  return (
    <div style={{ minHeight: '60vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 className="question-title" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Passport & City</h2>
      {/* Passport Question */}
      <div style={{
        width: '100%',
        maxWidth: 440,
        margin: '0 auto',
        marginBottom: 24,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        padding: '28px 24px 22px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'center' }}>Do you hold a valid passport?</h3>
        <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 14 }}>
            {passportOptions.slice(0, 2).map(opt => (
              <div
                key={opt.value}
                style={{
                  width: 180,
                  height: 120,
                  background: '#fff',
                  border: passport === opt.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
                  borderRadius: 16,
                  boxShadow: passport === opt.value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontWeight: 600,
                  fontSize: 16,
                  userSelect: 'none',
                }}
                onClick={() => onPassportSelect(opt.value)}
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onPassportSelect(opt.value)}
                onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
                onMouseOut={e => e.currentTarget.style.borderColor = passport === opt.value ? '#6366f1' : '#e5e7eb'}
              >
                <span style={{ fontSize: 32, marginBottom: 6 }}>{opt.icon}</span>
                <div style={{ color: '#1e293b', fontWeight: 600 }}>{opt.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              key={passportOptions[2].value}
              style={{
                width: 180,
                height: 120,
                background: '#fff',
                border: passport === passportOptions[2].value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
                borderRadius: 16,
                boxShadow: passport === passportOptions[2].value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                fontWeight: 600,
                fontSize: 16,
                userSelect: 'none',
              }}
              onClick={() => onPassportSelect(passportOptions[2].value)}
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onPassportSelect(passportOptions[2].value)}
              onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
              onMouseOut={e => e.currentTarget.style.borderColor = passport === passportOptions[2].value ? '#6366f1' : '#e5e7eb'}
            >
              <span style={{ fontSize: 32, marginBottom: 6 }}>{passportOptions[2].icon}</span>
              <div style={{ color: '#1e293b', fontWeight: 600 }}>{passportOptions[2].label}</div>
            </div>
          </div>
        </div>
      </div>
      {/* City Selection - only show after passport is selected */}
      {passport && (
        <div ref={citySectionRef} style={{
          width: '100%',
          maxWidth: 440,
          margin: '0 auto',
          marginBottom: 24,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          padding: '28px 24px 22px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h3 className="fold-title" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 18px 0', color: '#1e293b', textAlign: 'center' }}>Which city are you currently living/residing?</h3>
          <div className="question-subtitle" style={{ fontSize: 16, color: '#374151', marginBottom: 18, textAlign: 'center' }}>Select your city or search below</div>
          <div style={{ width: '100%', maxWidth: 400, marginBottom: 18 }}>
            <input
              type="text"
              placeholder="Search city..."
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 120px)',
            gap: 18,
            justifyContent: 'center',
            margin: '0 auto',
            marginBottom: 18,
          }}>
            {citiesToShow.map(cityObj => (
              <div
                key={cityObj.value}
                style={{
                  width: 120,
                  height: 100,
                  background: '#fff',
                  border: city === cityObj.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
                  borderRadius: 16,
                  boxShadow: city === cityObj.value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontWeight: 600,
                  fontSize: 15,
                  userSelect: 'none',
                }}
                onClick={() => handleCityClick(cityObj.value)}
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCityClick(cityObj.value)}
                onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
                onMouseOut={e => e.currentTarget.style.borderColor = city === cityObj.value ? '#6366f1' : '#e5e7eb'}
              >
                <span style={{ fontSize: 32, marginBottom: 6 }}>{cityObj.emoji}</span>
                <div style={{ color: '#1e293b', fontWeight: 600 }}>{cityObj.name}</div>
              </div>
            ))}
            {/* View All Cities button as a card */}
            {!showAll && citiesToShow.length < allCities.length && (
              <div
                style={{
                  width: 120,
                  height: 100,
                  background: '#f3f4f6',
                  border: '2px dashed #6366f1',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#6366f1',
                  cursor: 'pointer',
                  userSelect: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  gridColumn: 'span 3',
                }}
                tabIndex={0}
                onClick={() => setShowAll(true)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setShowAll(true)}
              >
                View All Cities
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EnglishPassportStep; 