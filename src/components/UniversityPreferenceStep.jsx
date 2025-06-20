import React, { useState, useMemo, useEffect } from 'react';

export default function UniversityPreferenceStep({ country, universitiesList, onSelect, initialSelected = [] }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(initialSelected);

  // Filtered and sorted university list
  const filtered = useMemo(() => {
    if (!search) return universitiesList;
    return universitiesList.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, universitiesList]);

  const handleSelect = (uni) => {
    let newSelected;
    if (selected.find(u => u.id === uni.id)) {
      newSelected = selected.filter(u => u.id !== uni.id);
    } else if (selected.length < 5) {
      newSelected = [...selected, uni];
    } else {
      newSelected = selected;
    }
    setSelected(newSelected);
  };

  // Call onSelect as soon as at least 1 university is selected
  useEffect(() => {
    if (selected.length > 0) {
      onSelect(selected);
    }
  }, [selected, onSelect]);

  return (
    <div style={{ maxWidth: 420, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '40px 32px 32px 32px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Your Preferences</h2>
      <div style={{ color: '#374151', fontSize: 16, marginBottom: 18 }}>Select your preferred universities</div>
      <div style={{ background: '#f8fafc', borderRadius: 16, padding: 18, width: '100%', marginBottom: 18, textAlign: 'left' }}>
        <div style={{ fontWeight: 700, fontSize: 17, color: '#1e293b', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span role="img" aria-label="cap">🎓</span> Preferred Universities
        </div>
        <div style={{ color: '#64748b', fontSize: 14, marginBottom: 10 }}>Select up to 5 preferred universities (in order of preference):</div>
        <input
          type="text"
          placeholder="Search universities..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', marginBottom: 12, fontSize: 15 }}
        />
        <div style={{ maxHeight: 180, overflowY: 'auto', marginBottom: 10 }}>
          {filtered.map((uni, idx) => {
            const selIdx = selected.findIndex(u => u.id === uni.id);
            return (
              <div
                key={uni.id}
                onClick={() => handleSelect(uni)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: selIdx !== -1 ? '#eef2ff' : '#fff',
                  border: selIdx !== -1 ? '2px solid #6366f1' : '1.5px solid #e5e7eb',
                  borderRadius: 10,
                  padding: '12px 14px',
                  marginBottom: 8,
                  cursor: 'pointer',
                  boxShadow: selIdx !== -1 ? '0 2px 8px #6366f122' : 'none',
                  position: 'relative',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: 22 }}>{uni.icon || '🎓'}</span>
                <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 15 }}>{uni.name}</span>
                {uni.rank && <span style={{ color: '#64748b', fontSize: 13, marginLeft: 8 }}>{uni.rank}</span>}
                {selIdx !== -1 && (
                  <span style={{ position: 'absolute', right: 16, top: 12, background: '#6366f1', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{selIdx + 1}</span>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ color: '#64748b', fontSize: 13, marginBottom: 0 }}>Selected: {selected.length}/5</div>
      </div>
    </div>
  );
} 