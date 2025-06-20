import React, { useState } from 'react';

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

function CitySelectionStep({ visible, selectedCity, onSelect }) {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState('');

  const citiesToShow = (showAll ? allCities : mainCities).filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!visible) return null;
  return (
    <div style={{ minHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 className="question-title" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Which city are you from?</h2>
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
        {citiesToShow.map(city => (
          <div
            key={city.value}
            style={{
              width: 120,
              height: 100,
              background: '#fff',
              border: selectedCity === city.value ? '2.5px solid #6366f1' : '2px solid #e5e7eb',
              borderRadius: 16,
              boxShadow: selectedCity === city.value ? '0 2px 8px rgba(99,102,241,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
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
            onClick={() => onSelect(city.value)}
            tabIndex={0}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(city.value)}
            onMouseOver={e => e.currentTarget.style.borderColor = '#6366f1'}
            onMouseOut={e => e.currentTarget.style.borderColor = selectedCity === city.value ? '#6366f1' : '#e5e7eb'}
          >
            <span style={{ fontSize: 32, marginBottom: 6 }}>{city.emoji}</span>
            <div style={{ color: '#1e293b', fontWeight: 600 }}>{city.name}</div>
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
  );
}

export default CitySelectionStep; 